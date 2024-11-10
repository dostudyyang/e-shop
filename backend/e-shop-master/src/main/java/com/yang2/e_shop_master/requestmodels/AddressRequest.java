package com.yang2.e_shop_master.requestmodels;
import lombok.Data;



@Data
public class AddressRequest {

    private String street;

    private String province;

    private String country;

    private String zip;
}
