package com.yang2.e_shop_master.controller;

import com.yang2.e_shop_master.entity.Address;
import com.yang2.e_shop_master.requestmodels.AddressRequest;
import com.yang2.e_shop_master.requestmodels.UserRequest;
import com.yang2.e_shop_master.service.AddressService;
import com.yang2.e_shop_master.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private AddressService addressService;

    @Autowired
    public UserController(UserService userService, AddressService addressService) {
        this.userService = userService;
        this.addressService = addressService;
    }

    /**
     *
     * @param userId
     * @param userRequest phone, address(street, province, country, zip), creditCardNum
     * @throws Exception
     */
    @PutMapping("/update/user")
    public void updateUserInfoWithPhoneAddressCreditCard(
            @RequestParam Long userId, @RequestBody UserRequest userRequest) throws Exception {

        Address addressWithoutId = userRequest.getAddress();

        AddressRequest addressRequest = new AddressRequest();
        addressRequest.setStreet(addressWithoutId.getStreet());
        addressRequest.setProvince(addressWithoutId.getProvince());
        addressRequest.setCountry(addressWithoutId.getCountry());
        addressRequest.setZip(addressWithoutId.getZip());

        Address addressWithId = addressService.addAddress(addressRequest);
        userRequest.setAddress(addressWithId);

        userService.updateUserInfoWithPhoneAddressCreditCard(userId, userRequest);
    }

    /**
     *
     * @param userRequest userEmail, password
     * @return
     */
    @PostMapping("/login")
    public Boolean loginAuthenticate(@RequestBody UserRequest userRequest) throws Exception {
        return userService.loginAuthenticate(userRequest);
    }


    /**
     *
     * @param userRequest role, password, userEmail, firstName, lastName
     */
    @PostMapping("/add/user")
    public void postUser(@RequestBody UserRequest userRequest){
        userService.postUser(userRequest);
    }
}
