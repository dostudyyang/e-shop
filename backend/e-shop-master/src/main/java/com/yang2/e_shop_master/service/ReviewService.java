package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.ReviewRepository;
import com.yang2.e_shop_master.entity.Review;
import com.yang2.e_shop_master.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndItemId(userEmail, reviewRequest.getItemId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }

        Review review = new Review();
        review.setUserEmail(userEmail);
        review.setDate(new Date());
        review.setRating(reviewRequest.getRating());
        review.setItemId(reviewRequest.getItemId());
        review.setReviewDescription(reviewRequest.getReviewDescription());

        reviewRepository.save(review);

    }

    public double getTotalReviewRate(Long itemId){

        double totalReviewRate = 0.0;
        List<Review> reviews = reviewRepository.findReviewsByItemId(itemId);

        for (Review review : reviews) {
            totalReviewRate += review.getRating();
        }

        totalReviewRate = totalReviewRate / reviews.size();

        double decimalPart = totalReviewRate - Math.floor(totalReviewRate);
        if (decimalPart == 0.0 || decimalPart == 0.5){
            return totalReviewRate;
        }

        return Math.round(totalReviewRate * 2) / 2;

    }

    public Boolean userAlreadyReviewed(String userEmail, Long itemId){
        Review validateReview = reviewRepository.findByUserEmailAndItemId(userEmail, itemId);
        if (validateReview != null) {
            return true;
        } else {
            return false;
        }
    }
}
