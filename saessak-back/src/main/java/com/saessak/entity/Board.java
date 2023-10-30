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
public class Board extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="board_id")
  private Long id;

  private String boardName;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  private String title;
  @Column(length = 2000)
  private String content;

  private int clickCount;

  private int recommend;

  @Enumerated(EnumType.STRING)
  @Column(length = 50)
  private ShowStatus showStatus;

}
