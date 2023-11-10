package com.saessak.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminResponseDTO<T> {

  private String msg;
  private List<T> list;
  private int totalPageSize;
  private int pageSize;

}