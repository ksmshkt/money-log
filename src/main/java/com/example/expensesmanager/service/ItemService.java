package com.example.expensesmanager.service;

import java.util.List;

import com.example.expensesmanager.api.request.ItemBaseRequest;
import com.example.expensesmanager.api.response.ItemBaseResponse;
import com.example.expensesmanager.dto.ItemSummary;
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
  public ItemSummary findByYearAndMonth(int year, int month) {
    List<Item> items = itemMapper.findByYearAndMonth(year, month);

    int totalCost = items.stream()
            .map(Item::getCost)
            .filter(cost -> cost != null)
            .mapToInt(Integer::intValue)
            .sum();

    return new ItemSummary(items, totalCost);
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

  @Transactional
  public void delete(Long id) {
    int affected = itemMapper.delete(id);

    if (affected == 0) {
      throw new IllegalArgumentException("Item not found. id=" + id);
    }
  }

}
