package io.moneylog.service;

import java.util.List;

import io.moneylog.api.request.ItemBaseRequest;
import io.moneylog.api.response.ItemBaseResponse;
import io.moneylog.dto.ItemSummary;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.moneylog.entity.Item;
import io.moneylog.repository.ItemMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

  private final ItemMapper itemMapper;

  @Transactional(readOnly = true)
  public ItemSummary findByYearAndMonth(int year, int month) {
    List<Item> items = itemMapper.findByYearAndMonth(year, month);

    int totalCost = items.stream()
            .map(Item::cost)
            .filter(cost -> cost != null)
            .mapToInt(Integer::intValue)
            .sum();

    return new ItemSummary(items, totalCost);
  }

  @Transactional
  public ItemBaseResponse add(ItemBaseRequest request) {

    Long id = itemMapper.insert(request.getName(), request.getCost(), request.getSpentAt(), request.getCategoryId());
    
    ItemBaseResponse res = new ItemBaseResponse();
    BeanUtils.copyProperties(itemMapper.selectById(id), res);

    return res;
  }

  @Transactional
  public ItemBaseResponse update(ItemBaseRequest request) {
    itemMapper.update(request.getId(), request.getName(), request.getCost(), request.getSpentAt(), request.getCategoryId());
    Item item = itemMapper.selectById(request.getId());

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
