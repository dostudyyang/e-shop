package com.yang2.e_shop_master.requestmodels;

import com.yang2.e_shop_master.entity.Item;
import lombok.Data;

import java.util.List;

@Data
public class ItemRequest {

    private List<Item> items;
}
