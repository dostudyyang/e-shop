package com.yang2.e_shop_master.responsemodels;

import com.yang2.e_shop_master.entity.Address;
import lombok.Data;

@Data
public class UserResponse {

    private String userEmail;

    private String firstName;

    private String lastName;


    private String phone;

    private Address address;

    private String creditCardNum;
}
