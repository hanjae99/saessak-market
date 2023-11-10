package com.saessak.crawling;

import com.saessak.constant.SellStatus;
import com.saessak.entity.*;
import com.saessak.repository.*;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductCrawlService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository imageRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Value("${imgLocation}")
    private String imgLocation;

    // 중고나라 크롤링 메소드
    // 대분류(1~20번 사이 상품)만 긁어옴
    public void insert() {
        for (int i=1; i<=20; i++){
            if (i == 18){
                // 중고나라 카테고리는 18번이 누락되어있음
                continue;
            }
//            try {
            Document doc = null;
            try {
                doc = Jsoup.connect("https://web.joongna.com/search?category=" + i + "&page=1").get();
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("카테고리 가져오는곳에서 오류발생!");
                break;
            }

            Elements link = doc.select("main div.w-full ul.grid a.group");
                // 광고 거르고 가져오기
                for(int j=0; j<link.size(); j++){
                    if (link.get(j).attr("href").contains("product")) {
//                        System.out.println(link.get(j).attr("href"));
                        Document doc_s = null;
                        try {
                            doc_s = Jsoup.connect("https://web.joongna.com" + link.get(j).attr("href")).get();
                        } catch (IOException e) {
                            e.printStackTrace();
                            continue;
                        }
                        System.out.printf("------------상품 번호: %d-------------\n", j+1);
                        // 큰 카테고리 번호 가져오기
                        Element category = doc_s.select("main div.pt-4 div.pb-4 li.text-sm a.capitalize").get(0);
                        System.out.println("카테고리 번호: " + category.attr("href").substring(17));

                        // 상품명 가져오기
                        Element product = doc_s.select("main div.pt-4 div.pb-5 h1.text-heading").get(0);
                        System.out.println("상품명: " + product.text());

                        // 가격 가져오기
                        Element price = doc_s.select("main div.pt-4 div.pb-5 > div.flex > div.text-heading").get(0);
                        System.out.println("상품가격: " + price.text());

                        // 상품 정보 가져오기
                        Elements product_info = doc_s.select("main div[name='product-description'] p.whitespace-pre-line");
                        String info = "";
                        if (!product_info.isEmpty()){
                            info = product_info.get(0).text();
                            System.out.println("상품정보: " + info);
                        }

                        // 조회수 랜덤
                        int clickCount = (int) Math.ceil(Math.random() * 1000);
                        System.out.println("랜덤 조회수: " + clickCount);

                        // 등록 시간 랜덤
                        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
                        LocalDateTime randDate = now.minusWeeks((long) Math.ceil(Math.random() * 10));
                        System.out.println("랜덤 등록시간: " + randDate.toString());

                        // DB에 저장
                        // 랜덤 유저별 저장 (1~5번 유저)
                        int randomMemId = (int) (Math.random() * 5 + 1);
                        System.out.println("랜덤유저: " + randomMemId);
                        Member member = memberRepository.findById((long) randomMemId).orElseThrow(EntityNotFoundException::new);

                        Product newProduct = new Product();
                        newProduct.setSellMember(member);
                        newProduct.setTitle(product.text());
                        newProduct.setContent(info.replaceAll("[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9,. ]", ""));
                        newProduct.setPrice(Integer.parseInt(price.text().replace("원", "").replaceAll(",", "")));
                        newProduct.setClickCount(clickCount);
                        newProduct.setSellStatus(SellStatus.SELL);
                        newProduct.setMapData("서울 관악구 관악로15길 23-12");
                        newProduct.setRegTime(randDate);
                        newProduct.setUpdateTime(randDate);
                        productRepository.save(newProduct);

                        Category cate = categoryRepository.findById((long) i).orElseThrow(EntityNotFoundException::new);
                        ProductCategory productCategory = new ProductCategory();
                        productCategory.setCategory(cate);
                        productCategory.setProduct(newProduct);
                        productCategory.setRegTime(randDate);
                        productCategory.setUpdateTime(randDate);
                        productCategoryRepository.save(productCategory);

                        // 이미지 가져오기
                        Elements img = doc_s.select("main div.swiper-slide img[data-nimg='fill']");
                        for (int k=0; k<img.size(); k++){
                            if (k == 3){
                                // 이미지 3장까지만
                                break;
                            }
                            String img_src = img.get(k).attr("src");
                            System.out.printf("%d번째 이미지: %s\n", k, img_src);
                            String img_name = img.get(k).attr("alt");
                            System.out.printf("%d번째 이미지 이름: %s\n", k, img_name);

                            // 이미지 로컬저장소에 업로드
                            UUID uuid = UUID.randomUUID();
                            String extension = img_src.substring(img_src.lastIndexOf("."));
                            if (extension.indexOf("?") != -1){
                                extension = extension.substring(0, extension.indexOf("?"));
                            }
                            System.out.println("확장자: " + extension);
                            String savedFileName = uuid.toString() + extension;
                            System.out.println("새로운 파일 이름: " + savedFileName);
                            String fileUploadFullUrl = imgLocation + "/images/product/" + savedFileName;

                            String fileSrcText = img_src.substring(img_src.lastIndexOf("text=") + 5);
                            if (fileSrcText.indexOf("&") != -1){
                                fileSrcText = fileSrcText.substring(0, fileSrcText.indexOf("&"));
                            }
                            System.out.println("인코딩할 부분: " + fileSrcText);

                            try {
                                String encText = URLEncoder.encode(fileSrcText, "UTF-8");
                                img_src = img_src.replace(fileSrcText, encText);
                                URL imgUrl = new URL(img_src);
                                System.out.println("URL객체: " + imgUrl);
                                InputStream is = imgUrl.openStream();
                                FileOutputStream fos = new FileOutputStream(fileUploadFullUrl);
                                int b;
                                while ((b = is.read()) != -1) {
                                    fos.write(b);
                                }
                                fos.close();
                            }catch (IOException e){
                                e.printStackTrace();
                                break;
                            }

                            System.out.println(savedFileName + " :: 작업 완료");

                            Image newImg = new Image();
                            newImg.setProduct(newProduct);
                            newImg.setImgName(savedFileName);
                            newImg.setOriName(img_name + extension);
                            newImg.setImgUrl("/images/product/" + savedFileName);
                            newImg.setRegTime(randDate);
                            newImg.setUpdateTime(randDate);
                            imageRepository.save(newImg);
                        }


                    }
                }
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }

        }
    }

    public void changeOriName(){
        List<Image> imageList = imageRepository.findAll();

        for (Image image : imageList){
            String oriName = image.getOriName();
            String extension = image.getImgName().substring(image.getImgName().lastIndexOf("."));
            image.setOriName(oriName + extension);
        }
    }
}
