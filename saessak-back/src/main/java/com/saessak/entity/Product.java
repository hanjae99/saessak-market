package com.saessak.entity;

import com.saessak.constant.SellStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@ToString
public class Product extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="product_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  private String title;

  @Column(length = 3000)
  private String content;

  private int price;
  private int clickCount;

  @Enumerated(EnumType.STRING)
  private SellStatus sellStatus;

  private String mapData;

}
