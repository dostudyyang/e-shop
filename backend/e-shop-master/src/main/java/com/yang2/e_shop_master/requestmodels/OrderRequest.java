package com.yang2.e_shop_master.requestmodels;

import lombok.Data;

import java.util.Map;

@Data
public class OrderRequest {

    private Map<Long, Integer> itemQuantities;

}
