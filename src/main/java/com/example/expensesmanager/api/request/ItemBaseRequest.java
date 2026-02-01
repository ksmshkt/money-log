package com.example.expensesmanager.api.request;

import lombok.Data;

@Data
public class ItemBaseRequest {

  private Long id;

  private String name;

  private Integer cost;

}