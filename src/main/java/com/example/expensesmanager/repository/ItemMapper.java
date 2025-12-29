package com.example.expensesmanager.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.expensesmanager.entity.Item;

@Mapper
public interface ItemMapper {

  List<Item> findAll();

}
