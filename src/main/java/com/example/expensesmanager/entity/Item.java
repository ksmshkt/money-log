package com.example.expensesmanager.entity;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Item {

  int id;

  String name;

  int cost;

  LocalDate time;

}
