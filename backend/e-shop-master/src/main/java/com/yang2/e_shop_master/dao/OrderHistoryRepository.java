package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {
}
