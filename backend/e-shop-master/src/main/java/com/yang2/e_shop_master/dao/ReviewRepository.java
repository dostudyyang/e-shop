package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByItemId(@RequestParam("item_id") Long itemId, Pageable pageable);

    List<Review> findReviewsByItemId(Long itemId);

    Review findByUserEmailAndItemId(String userEmail, Long itemId);
}
