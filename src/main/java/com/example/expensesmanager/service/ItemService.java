package com.example.expensesmanager.service;

import java.util.List;

import com.example.expensesmanager.api.request.ItemBaseRequest;
import com.example.expensesmanager.api.response.ItemBaseResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.expensesmanager.entity.Item;
import com.example.expensesmanager.repository.ItemMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

  private final ItemMapper itemMapper;

  @Transactional(readOnly = true)
  public List<Item> findAll() {
    return itemMapper.findAll();
  }

  @Transactional
  public ItemBaseResponse add(ItemBaseRequest itemBaseRequest) {
    Item item = itemMapper.insert(itemBaseRequest.getName(), itemBaseRequest.getCost());

    ItemBaseResponse res = new ItemBaseResponse();
    BeanUtils.copyProperties(item, res);

    return res;
  }

  @Transactional
  public ItemBaseResponse update(ItemBaseRequest itemBaseRequest) {
    itemMapper.update(itemBaseRequest.getId(), itemBaseRequest.getName(), itemBaseRequest.getCost());
    Item item = itemMapper.selectById(itemBaseRequest.getId());

    ItemBaseResponse res = new ItemBaseResponse();
    BeanUtils.copyProperties(item, res);

    return res;
  }

}
