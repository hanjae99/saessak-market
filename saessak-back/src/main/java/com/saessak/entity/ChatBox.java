package com.saessak.entity;

import com.querydsl.core.annotations.QueryProjection;
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
public class ChatBox extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="chat_box_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sell_member_id")
  private Member sellMember;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_member_id")
  private Member orderMember;

  private int chatCount;




}
