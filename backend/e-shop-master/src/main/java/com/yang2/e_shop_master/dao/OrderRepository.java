package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findFirstByUserEmailOrderByDateDesc(String userEmail);

    Page<Order> findByUserEmail(String userEmail, Pageable pageable);

    Page<Order> findById(Long Id, Pageable pageable);

    Page<Order> findByDate(Date date, Pageable pageable);
}
