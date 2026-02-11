package com.example.expensesmanager.controller;

import java.time.LocalDate;
import java.util.List;

import com.example.expensesmanager.dto.ItemSummary;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.expensesmanager.entity.Item;
import com.example.expensesmanager.form.ItemForm;
import com.example.expensesmanager.service.ItemService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {

  private final ItemService itemService;

  /**
   * 初期表示：今月分のアイテムを取得
   * 月を指定する場合もこのエンドポイントを利用
   */
  @GetMapping
  public String listItems(
          @RequestParam(value = "year", required = false) Integer year,
          @RequestParam(value = "month", required = false) Integer month,
          Model model) {

    LocalDate now = LocalDate.now();

    // パラメータが無ければ現在の年・月
    int y = (year != null) ? year : now.getYear();
    int m = (month != null) ? month : now.getMonthValue();

    // 指定年月のアイテムを取得
    ItemSummary itemSummary = itemService.findByYearAndMonth(y, m);

    model.addAttribute("items", itemSummary.items());
    model.addAttribute("itemForm", new ItemForm());
    model.addAttribute("totalCost", itemSummary.totalCost());
    model.addAttribute("currentYear", y);
    model.addAttribute("currentMonth", m);

    return "item-list";
  }
}