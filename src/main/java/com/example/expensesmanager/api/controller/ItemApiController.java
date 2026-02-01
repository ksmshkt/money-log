package com.example.expensesmanager.api.controller;

import com.example.expensesmanager.api.response.ItemBaseResponse;
import org.springframework.web.bind.annotation.*;

import com.example.expensesmanager.api.request.ItemBaseRequest;
import com.example.expensesmanager.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemApiController {

  private final ItemService itemService;

  @PostMapping("/add")
  public ItemBaseResponse addItem(@RequestBody ItemBaseRequest itemBaseRequest) {
    ItemBaseResponse res = itemService.add(itemBaseRequest);

    return res;
  }

  @PutMapping("/{id}")
  public ItemBaseResponse updateItem(@PathVariable Long id, @RequestBody ItemBaseRequest itemBaseRequest) {
    ItemBaseResponse res = itemService.update(itemBaseRequest);

    return res;
  }

}