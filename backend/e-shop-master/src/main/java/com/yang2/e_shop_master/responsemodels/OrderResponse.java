package com.yang2.e_shop_master.responsemodels;

import com.yang2.e_shop_master.entity.Address;
import com.yang2.e_shop_master.entity.Item;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
public class OrderResponse {

    private String userEmail;

    private String userFullName;

    private String phone;

    private Address address;

    private double orderPrice;

    private Date date;

    private List<OrderItemResponse> orderItemResponseList;
}
