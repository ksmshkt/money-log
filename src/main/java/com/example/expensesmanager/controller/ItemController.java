package com.example.expensesmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.expensesmanager.entity.Item;
import com.example.expensesmanager.repository.ItemMapper;

@Controller
@RequestMapping("/items")
public class ItemController {

  @Autowired
  ItemMapper itemMapper;

  @GetMapping
  public String listItems(Model model) {

    List<Item> items = itemMapper.findAll();

    model.addAttribute("items", items);

    return "item-list";
  }
}
