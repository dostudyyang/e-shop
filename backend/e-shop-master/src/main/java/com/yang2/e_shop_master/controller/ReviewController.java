package com.yang2.e_shop_master.controller;

import com.yang2.e_shop_master.requestmodels.ReviewRequest;
import com.yang2.e_shop_master.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/check/user/isLeftReview")
    public Boolean userAlreadyReviewed(@RequestParam String userEmail, @RequestParam Long itemId) throws Exception {
        return reviewService.userAlreadyReviewed(userEmail, itemId);
    }

    @GetMapping("/load/totalReviewRate")
    public double getTotalReviewRate(@RequestParam Long itemId){
        return reviewService.getTotalReviewRate(itemId);
    }

    /**
     *
     * @param userEmail
     * @param reviewRequest rating, itemId, (Optional) reviewDescription
     * @throws Exception
     */
    @PostMapping("/add/review")
    public void postReview(@RequestParam String userEmail, @RequestBody ReviewRequest reviewRequest) throws Exception {
        reviewService.postReview(userEmail, reviewRequest);
    }
}
