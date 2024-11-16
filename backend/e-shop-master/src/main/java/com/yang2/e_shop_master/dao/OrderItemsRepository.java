package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {


}
