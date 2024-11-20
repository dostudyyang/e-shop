package com.yang2.e_shop_master.controller;

import com.yang2.e_shop_master.entity.Address;
import com.yang2.e_shop_master.entity.User;
import com.yang2.e_shop_master.requestmodels.AddressRequest;
import com.yang2.e_shop_master.requestmodels.UserRequest;
import com.yang2.e_shop_master.responsemodels.UserResponse;
import com.yang2.e_shop_master.service.AddressService;
import com.yang2.e_shop_master.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
     * @return userEmail, firstName, LastName, phone, address(street, province, country, zip), creditCardNum
     * @throws Exception
     */
    @GetMapping("/load/userInfo")
    public UserResponse loadUserInfo(@RequestParam Long userId) throws Exception {

        return userService.loadUserInfo(userId);
    }

    /**
     *
     * @param userId
     * @param userRequest (Optional) userEmail, firstName, LastName
     *                    (Mandatory) phone, address(street, province, country, zip), creditCardNum
     * @throws Exception
     */
    @PutMapping("/update/user")
    public void updateUserInfo(
            @RequestParam Long userId, @RequestBody UserRequest userRequest) throws Exception {

        if (userRequest.getAddress() != null) {
            Address resolvedAddress = addressService.resolveAddress(userRequest.getAddress());
            userRequest.setAddress(resolvedAddress);
        }

        userService.updateUserInfo(userId, userRequest);
    }

    /**
     *
     * @param userRequest password, userEmail
     * @return
     */
    @PostMapping("/login")
    public Boolean loginAuthenticate(@RequestBody UserRequest userRequest) throws Exception {
        return userService.loginAuthenticate(userRequest);
    }


    /**
     *
     * @param userRequest (Mandatory) role, password, userEmail, firstName, lastName
     *                    (Optional) phone, address(street, province, country, zip), creditCardNum
     */
    @PostMapping("/add/user")
    public void postUser(@RequestBody UserRequest userRequest){

        if (userRequest.getAddress() != null) {
            Address resolvedAddress = addressService.resolveAddress(userRequest.getAddress());
            userRequest.setAddress(resolvedAddress);
        }

        userService.postUser(userRequest);
    }
}
