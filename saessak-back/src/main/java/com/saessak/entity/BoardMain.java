package com.saessak.entity;

import com.saessak.constant.ShowStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardMain {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="board_main_id")
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "board_id")
  private Board board;


}
