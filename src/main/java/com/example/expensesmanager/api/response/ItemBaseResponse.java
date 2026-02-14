package com.example.expensesmanager.api.response;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ItemBaseResponse {

  Long id;

  private String name;

  private Integer cost;

  LocalDate spentAt;

}