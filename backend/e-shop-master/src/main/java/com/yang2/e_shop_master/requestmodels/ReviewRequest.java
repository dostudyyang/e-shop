package com.yang2.e_shop_master.requestmodels;

import lombok.Data;

@Data
public class ReviewRequest {

    private double rating;

    private Long itemId;

    private String reviewDescription = "Good!";

}
