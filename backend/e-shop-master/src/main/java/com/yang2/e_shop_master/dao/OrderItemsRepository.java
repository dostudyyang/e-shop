package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Item;
import com.yang2.e_shop_master.entity.Order;
import com.yang2.e_shop_master.entity.OrderItems;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

    List<OrderItems> findByOrder(Order order);

    List<OrderItems> findByItem(Item item);
}
