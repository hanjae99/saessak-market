package com.saessak.game.controller;

import com.saessak.game.dto.GameDTO;
import com.saessak.game.dto.ResponseDTO;
import com.saessak.game.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/game")
@RequiredArgsConstructor
public class gameController {

    private final GameService gameService;

//    @GetMapping
//    public ResponseEntity<?> getGameList(){
//      try {
//          List<GameDTO> glist = gameService.gameList();
//          ResponseDTO<GameDTO> response = ResponseDTO.<GameDTO>builder().data(glist).build();
//          return ResponseEntity.ok().body(response);
//      }catch (Exception e){
//          String error = e.getMessage();
//          ResponseDTO<GameDTO> response = ResponseDTO.<GameDTO>builder().error(error).build();
//          return ResponseEntity.badRequest().body(response);
//      }
//    }

    @GetMapping
    public ResponseEntity<?> getGameList(){
        try {
            List<GameDTO> glist = gameService.gameListdls();
            ResponseDTO<GameDTO> response = ResponseDTO.<GameDTO>builder().data(glist).build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<GameDTO> response = ResponseDTO.<GameDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }



}
