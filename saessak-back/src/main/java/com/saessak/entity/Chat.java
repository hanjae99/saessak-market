package com.saessak.entity;

import com.saessak.webSocket.dto.ChatDTO;
import lombok.*;
import org.modelmapper.ModelMapper;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Chat extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="chat_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "chat_box_id")
  private ChatBox chatBox;

  @Column(length = 600)
  private String content;

//  private static ModelMapper modelMapper = new ModelMapper();
//
//  public ChatDTO createChatDTO(){
//    return modelMapper.map(this, ChatDTO.class);
//  }

}
