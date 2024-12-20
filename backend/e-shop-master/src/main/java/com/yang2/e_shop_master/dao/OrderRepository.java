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

    Page<Order> findAll(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.userEmail = :userEmail AND DATE(o.date) = :date")
    Page<Order> findByUserEmailAndDate(@Param("userEmail") String userEmail, @Param("date") Date date, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE oi.item.id = :itemId")
    Page<Order> findByItemId(@Param("itemId") Long itemId, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE o.userEmail = :userEmail AND oi.item.id = :itemId")
    Page<Order> findByUserEmailAndItemId(@Param("userEmail") String userEmail, @Param("itemId") Long itemId, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE DATE(o.date) = :date AND oi.item.id = :itemId")
    Page<Order> findByDateAndItemId(@Param("date") Date date, @Param("itemId") Long itemId, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE o.userEmail = :userEmail AND DATE(o.date) = :date AND oi.item.id = :itemId")
    Page<Order> findByUserEmailAndDateAndItemId(@Param("userEmail") String userEmail,
                                    @Param("date") Date date,
                                    @Param("itemId") Long itemId, Pageable pageable);
}
