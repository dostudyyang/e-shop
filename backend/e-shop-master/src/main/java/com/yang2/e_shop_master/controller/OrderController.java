package com.yang2.e_shop_master.controller;

import com.yang2.e_shop_master.entity.Order;
import com.yang2.e_shop_master.entity.User;
import com.yang2.e_shop_master.requestmodels.OrderRequest;
import com.yang2.e_shop_master.responsemodels.OrderResponse;
import com.yang2.e_shop_master.service.OrderService;
import com.yang2.e_shop_master.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private OrderService orderService;
    private UserService userService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    /**
     *
     * @param userId
     * @param userPayment
     * @return
     * @throws Exception
     */
    @GetMapping("/payment")
    public boolean payment(@RequestParam("userId") Long userId, @RequestParam("userPayment") double userPayment) throws Exception {

        Optional<User> user = userService.findByUserId(userId);
        if (!user.isPresent()){
            throw new Exception("User is not exist!");
        }
        return orderService.payment(user.get().getUserEmail(), userPayment);
    }

    @GetMapping("/latestOrderSummary")
    public OrderResponse latestOrderSummary(@RequestParam Long userId) throws Exception {

        Optional<User> user = userService.findByUserId(userId);
        if (!user.isPresent()){
            throw new Exception("User is not exist!");
        }

        return orderService.latestOrderSummary(user.get());
    }


    /**
     *
     * @param userId
     * @param orderRequest Map<Long, Integer> itemQuantities - <itemId, itemQuantity>
     * @return
     * @throws Exception
     */
    @PostMapping("/checkout")
    public double checkoutOrder(@RequestParam Long userId, @RequestBody OrderRequest orderRequest) throws Exception {

        Optional<User> user = userService.findByUserId(userId);
        if (!user.isPresent()) {
            throw new Exception("User is not exist!");
        }

        String userEmail = user.get().getUserEmail();

        return orderService.checkoutOrder(userEmail, orderRequest.getItemQuantities());

    }
}
