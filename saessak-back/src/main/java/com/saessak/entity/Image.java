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
public class Image extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="image_id")
  private Long id;

  private String imgName;
  private String oriName;
  private String imgUrl;

}
