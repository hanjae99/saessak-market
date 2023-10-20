package com.saessak.game;

import com.saessak.game.dto.GameDTO;
import com.saessak.game.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
public class gameTest {

    @Autowired
    GameService gameService;


    @Test
    public void getList(){
        List<GameDTO> list=gameService.gameList();

        log.info(list.getClass().toString());
    }
}
