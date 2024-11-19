package com.yang2.e_shop_master.responsemodels;

import lombok.Data;

@Data
public class OrderItemResponse {

    private Long itemId;
    private String itemName;
    private Integer itemPrice;

    private Integer orderQuantity;
}
