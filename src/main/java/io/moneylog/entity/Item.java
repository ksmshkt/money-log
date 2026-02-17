package io.moneylog.entity;

import java.time.LocalDate;

public record Item(
        Long id,

        String name,

        Integer cost,

        LocalDate spentAt,

        Long categoryId,

        String categoryName

) {
}