package com.example.expensesmanager.api.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ItemBaseRequest {

  private Long id;

  @NotBlank
  @Size(max = 255)
  private String name;

  @NotNull
  @Min(0)
  private Integer cost;

}