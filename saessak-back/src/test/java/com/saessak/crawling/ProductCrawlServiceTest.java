package com.saessak.crawling;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Transactional
class ProductCrawlServiceTest {

    @Autowired
    ProductCrawlService productCrawlService;

    @Test
    @DisplayName("상품 크롤링 테스트")
    public void crawlTest(){
        productCrawlService.insert();
    }

    @Test
    @DisplayName("oriName 바꾸기")
    public void changeOriName(){
        productCrawlService.changeOriName();
    }
}