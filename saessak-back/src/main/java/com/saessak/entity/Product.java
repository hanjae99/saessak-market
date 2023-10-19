package com.saessak.entity;

import com.saessak.constant.SellStatus;
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
public class Product extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="product_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sell_member_id")
  private Member sellMember;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_member_id")
  private Member orderMember;

  private String title;

  @Column(length = 3000)
  private String content;

  private int price;

  private int clickCount;

  @Enumerated(EnumType.STRING)
  private SellStatus sellStatus;

  private String mapData;

}
