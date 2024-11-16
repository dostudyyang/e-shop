package com.yang2.e_shop_master.controller;

import com.yang2.e_shop_master.entity.User;
import com.yang2.e_shop_master.requestmodels.OrderRequest;
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
