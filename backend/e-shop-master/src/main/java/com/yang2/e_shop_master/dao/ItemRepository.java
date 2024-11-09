package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
