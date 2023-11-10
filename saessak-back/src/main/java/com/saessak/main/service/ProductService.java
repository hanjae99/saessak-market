package com.saessak.main.service;

import com.saessak.constant.SellStatus;
import com.saessak.entity.*;
import com.saessak.imgfile.FileService;
import com.saessak.imgfile.ProductImgService;
import com.saessak.main.dto.*;
import com.saessak.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final ProductImgService productImgService;
    private final FileService fileService;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final ProductCategoryRepository productCategoryRepository;

    @Value("${imgLocation}")
    private String imgLocation;

    // 메인, 상품 검색 시 상품 목록 페이징 결과 읽어오기
    public Page<ProductDTO> read(ProductDTO productDTO, Pageable pageable){
        return productRepository.getSearchedProductPage(productDTO, pageable);
    }

    // 상품 디테일, 상품 업데이트 시 기존 상품 하나 값 읽어오기
    public ProductFormDTO readOneProduct(ProductFormDTO productFormDTO, String memberId){
        try {
            Product product = productRepository.findById(productFormDTO.getId())
                    .orElseThrow(EntityNotFoundException::new);

            // 해당 상품을 등록한 유저가 아닌 경우
            Optional<Long> savedProductMemberId = Optional.ofNullable(product.getSellMember())
                    .map(sellMember -> sellMember.getId());
            if (savedProductMemberId.isEmpty() || savedProductMemberId.get() != Long.parseLong(memberId)){
                return null;
            }

        }catch (EntityNotFoundException e){
            // 존재하지 않는 상품일 경우
            throw e;
        }

        return productRepository.getSearchedProduct(productFormDTO);
    }

    public List<CategoryDTO> readCate(){
        List<Category> categoryList = categoryRepository.findAll();

        List<CategoryDTO> categoryDTOList = new ArrayList<>();
        for (Category category : categoryList){
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(category.getId());
            categoryDTO.setName(category.getName());
            categoryDTOList.add(categoryDTO);
        }

        return categoryDTOList;

    }

    public Long saveProduct(ProductFormDTO productFormDTO,
                         List<MultipartFile> productImgFileList,
                            String memberId)throws Exception{
        //상품 등록하는 유저 검색
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(EntityNotFoundException::new);

        //초기 등록 -> 판매중
        productFormDTO.setSellStatus(SellStatus.SELL);
        productFormDTO.setSellMember(member);

        //상품 등록 (카테고리 포함)
        Product product = productFormDTO.createProduct();
        productRepository.save(product);
        ProductCategory productCategory = new ProductCategory();
        productCategory.setProduct(product);
        Category category = categoryRepository.findById(productFormDTO.getCategoryId())
                .orElseThrow(EntityNotFoundException::new);
        productCategory.setCategory(category);
        productCategoryRepository.save(productCategory);

        //이미지 등록
        for (int i=0; i<productImgFileList.size(); i++){
            // 비어있는 itemImg 필터링
            if (productImgFileList.get(i).isEmpty()){
                continue;
            }
            Image productImg = new Image();
            productImg.setProduct(product);

            productImgService.saveProductImg(productImg, productImgFileList.get(i));
        }

        return product.getId();
    }

    // 상품 정보만 업데이트
    public Long updateProductOnly(ProductFormDTO productFormDTO){
        Product product = productRepository.findById(productFormDTO.getId())
                .orElseThrow(EntityNotFoundException::new);

        product.setTitle(productFormDTO.getTitle());
        product.setContent(productFormDTO.getContent());
        product.setPrice(productFormDTO.getPrice());
        product.setSellStatus(productFormDTO.getSellStatus());
        product.setMapData(productFormDTO.getMapData());

        // 카테고리 정보 업데이트
        List<ProductCategory> productCategories = productCategoryRepository.findByProductId(product.getId());
        ProductCategory productCategory = productCategories.get(0);
        Category category = categoryRepository.findById(productFormDTO.getCategoryId())
                        .orElseThrow(EntityNotFoundException::new);
        productCategory.setCategory(category);

        return product.getId();
    }

    // 신규 이미지만 업로드
    public Long uploadProductImgOnly(Long productId, List<MultipartFile> productImgList) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(EntityNotFoundException::new);

        //이미지 등록
        for (int i=0; i<productImgList.size(); i++){
            // 비어있는 itemImg 필터링
            if (productImgList.get(i).isEmpty()){
                continue;
            }
            Image productImg = new Image();
            productImg.setProduct(product);

            productImgService.saveProductImg(productImg, productImgList.get(i));
        }

        return productId;
    }

    // 상품 + 이미지 업데이트
    public Long updateProduct(ProductFormDTO productFormDTO) throws Exception {
        // 상품 정보만 업데이트
        Long productId = updateProductOnly(productFormDTO);

        // 상품에 관련된 이미지 업데이트
        List<MultipartFile> savedFileList = new ArrayList<>();
        List<String> savedFileOriNameList = new ArrayList<>();
        List<ProductImageDTO> imgDTOList = productFormDTO.getImageDTOList();

        List<Image> productImgs = imageRepository.findByProductId(productId);

        // 기존 상품 등록정보가 있을 경우 (변경점 찾아서 업데이트)
        if (!imgDTOList.isEmpty()) {
            for (ProductImageDTO imgDTO : imgDTOList) {
                // 원활한 비교를 위해 mulfipart 타입으로 변경
                MultipartFile imgMultiFile = fileService.fileToMultipart(
                        imgLocation + "/images/product/" + imgDTO.getImgName());
                savedFileList.add(imgMultiFile);
                savedFileOriNameList.add(imgDTO.getOriName());
            }

            try {
                // 기존 이미지 파일 확인 및 수정
                // DB에 등록된 전체 imgId 길이만큼 돌면서 만약 받아온 파일리스트에 더이상 없다는건
                // 해당 자리가 삭제되었다는 의미이므로 해당 이미지 파일 자리는 삭제시켜줌
                for (int i = 0; i < productImgs.size(); i++) {
                    if (savedFileList.size() < i + 1){
                        productImgService.deleteProductImg(productImgs.get(i).getId(),productImgs.get(i).getImgName());
                        continue;
                    }
                    productImgService.updateProductImg(productImgs.get(i).getId(), savedFileList.get(i),
                            savedFileOriNameList.get(i));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

        }else {
            // 기존 상품정보가 없을 경우 (이전의 이미지 정보들 삭제 후 새로 추가)
            for (int i = 0; i < productImgs.size(); i++){
                productImgService.deleteProductImg(productImgs.get(i).getId(), productImgs.get(i).getImgName());
            }
        }

        return productId;
    }

    // 메인 상품 처리
    // 캐러셀 부분
    public List<MainProductFormDTO> searchRandomProduct(){
        return productRepository.getRandomProduct();
    }

    // 신규 상품 부분
    public List<MainProductFormDTO> searchNewestProduct(){
        return productRepository.getNewestProduct();
    }

    public void clickCountPlus(Long productId){
        Product product = productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);
        product.setClickCount(product.getClickCount()+1);
    }
}
