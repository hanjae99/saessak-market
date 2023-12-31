package com.saessak.entity;

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
public class Image extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="image_id")
  private Long id;

  private String imgName;
  private String oriName;
  private String imgUrl;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "checked_admin_id")
  private Member adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "board_id")
  private Board board;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  private Product product;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;
}
