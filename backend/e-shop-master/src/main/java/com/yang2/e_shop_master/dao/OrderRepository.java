package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findFirstByUserEmailOrderByDateDesc(String userEmail);

    Page<Order> findByUserEmail(String userEmail, Pageable pageable);

    Page<Order> findByIdIn(List<Long> ids, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE DATE(o.date) = :date")
    Page<Order> findByDate(@Param("date") Date date, Pageable pageable);
}
