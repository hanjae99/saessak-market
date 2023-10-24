package com.saessak.Detail;

import com.saessak.detail.dto.DetailDTO;
import com.saessak.detail.service.DetailService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
public class DetailTest {

    @Autowired
    DetailService detailService;


    @Test
    public void Test(){
      detailService.listget(1L);


    }
}
