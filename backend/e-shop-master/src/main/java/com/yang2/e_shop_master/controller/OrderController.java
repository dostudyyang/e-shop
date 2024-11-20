package com.yang2.e_shop_master.controller;

import com.yang2.e_shop_master.entity.Order;
import com.yang2.e_shop_master.entity.User;
import com.yang2.e_shop_master.requestmodels.OrderRequest;
import com.yang2.e_shop_master.responsemodels.OrderResponse;
import com.yang2.e_shop_master.service.OrderService;
import com.yang2.e_shop_master.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @GetMapping("/orderDetails")
    public OrderResponse orderDetails(@RequestParam Long orderId){

        return orderService.orderDetails(orderId);
    }

    @GetMapping("/search/findByUserEmail")
    public Page<Order> findByUserEmail(@RequestParam(value = "userEmail") String userEmail,
                                       @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                       @RequestParam(value = "size", required = false, defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderService.findByUserEmail(userEmail, pageable);
    }

    /**
     *  e.g. --> ?date=2024-11-15
     * @param stringDate
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/search/findByDate")
    public Page<Order> findByDate(@RequestParam(value = "date") String stringDate,
                                  @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                  @RequestParam(value = "size", required = false, defaultValue = "5") int size) throws ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(stringDate);
        Pageable pageable = PageRequest.of(page, size);
        return orderService.findByDate(date, pageable);
    }

    @GetMapping("/search/findByItemId")
    public Page<Order> findByItemId(@RequestParam(value = "itemId") Long itemId,
                                    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                    @RequestParam(value = "size", required = false, defaultValue = "5") int size) throws Exception {
        Pageable pageable = PageRequest.of(page, size);
        return orderService.findByItemId(itemId, pageable);
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
