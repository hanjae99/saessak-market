package com.saessak.game.service;

import com.saessak.entity.Image;
import com.saessak.entity.Product;
import com.saessak.game.dto.GameDTO;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {

    private final ProductRepository productRepository;

    private final ImageRepository imageRepository;

    public List<GameDTO> gameList(){
        List<GameDTO> gameDTOList = new ArrayList<>();
        List<Product> list =productRepository.gameRamdomdata();
        
        for (Product product : list) {
            List<Image> imglist = imageRepository.findByProductId(product.getId());
            GameDTO gameDTO=GameDTO.builder().productId(product.getId()).title(product.getTitle()).content(product.getContent()).price(product.getPrice())
                    .imgUrl(imglist.get(0).getImgUrl()).build();

            gameDTOList.add(gameDTO);
        }
        return gameDTOList;
    }

    public List<GameDTO> gameListdls(){
        return productRepository.gameRandomDataWithQueryDSL();
    }

}
