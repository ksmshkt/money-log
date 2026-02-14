package com.example.expensesmanager.api.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class ItemBaseRequest {

  private Long id;

  @NotBlank
  @Size(max = 255)
  private String name;

  @NotNull
  @Min(0)
  private Integer cost;

  @NotNull
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate spentAt;

}