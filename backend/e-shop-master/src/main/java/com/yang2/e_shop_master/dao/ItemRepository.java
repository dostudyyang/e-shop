package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {




}
