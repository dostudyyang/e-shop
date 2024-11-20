package com.yang2.e_shop_master.requestmodels;
import com.yang2.e_shop_master.entity.Address;
import lombok.Data;


@Data
public class UserRequest {

    // Mandatory info when first creat a user
    private String role;

    private String password;

    private String userEmail;

    private String firstName;

    private String lastName;



    private String phone;

    private Address address;

    private String creditCardNum;
}
