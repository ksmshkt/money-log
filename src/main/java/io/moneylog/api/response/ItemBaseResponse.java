package io.moneylog.api.response;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ItemBaseResponse {

  Long id;

  private String name;

  private Integer cost;

  private LocalDate spentAt;

  private Long categoryId;

  private String categoryName;

  private String categoryColor;

}