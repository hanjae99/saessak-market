package com.saessak.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@ToString
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
