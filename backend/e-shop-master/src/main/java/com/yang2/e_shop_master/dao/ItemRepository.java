package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {


    Page<Item> findByNameContainingIgnoreCase(@RequestParam("name") String name, Pageable pageable);

    Page<Item> findByCategory(@RequestParam("category") String category, Pageable pageable);

    Page<Item> findByBrand(@RequestParam("brand") String brand, Pageable pageable);

    Page<Item> findByCategoryAndBrand(@RequestParam("category") String category,
                                      @RequestParam("brand") String brand,
                                      Pageable pageable);

    Page<Item> findAll(Pageable pageable);
}
