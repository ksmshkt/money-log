package com.example.expensesmanager.dto;

import com.example.expensesmanager.entity.Item;

import java.util.List;

public record ItemSummary(
        List<Item> items,
        int totalCost
) {
}