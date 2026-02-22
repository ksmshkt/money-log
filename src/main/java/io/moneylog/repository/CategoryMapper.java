package io.moneylog.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import io.moneylog.entity.Category;

@Mapper
public interface CategoryMapper {

  @Select("""
              SELECT id, name, color
              FROM categories
              ORDER BY id
          """)
  List<Category> findAll();
}