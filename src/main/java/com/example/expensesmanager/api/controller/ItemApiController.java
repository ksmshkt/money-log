package com.example.expensesmanager.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    itemService.add(itemBaseRequest.getName(), itemBaseRequest.getCost());
    
    ItemBaseResponse response = new ItemBaseResponse();
    
    return ItemBaseResponse
  }
}