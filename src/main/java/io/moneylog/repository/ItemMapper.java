package io.moneylog.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import io.moneylog.entity.Item;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ItemMapper {

  List<Item> findByYearAndMonth(@Param("year") int year, @Param("month") int month);

  Long insert(@Param("name") String name, @Param("cost") Integer cost, @Param("spentAt") LocalDate spentAt, @Param("categoryId") Long categoryId);

  Item selectById(@Param("id") Long id);

  int update(@Param("id") Long id, @Param("name") String name, @Param("cost") Integer cost, @Param("spentAt") LocalDate spentAt, @Param("categoryId") Long categoryId);

  int delete(@Param("id") Long id);
}
