package com.example.expensesmanager.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Item {

  Long id;

  String name;

  Integer cost;

  LocalDate createdAt;

}
