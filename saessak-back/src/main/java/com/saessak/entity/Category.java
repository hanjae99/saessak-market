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
public class Category {

  @Id
  @Column(name="category_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "parent_id")
  private Category parentId;

  private String name;

}
