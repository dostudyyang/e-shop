package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.*;
import com.yang2.e_shop_master.entity.*;
import com.yang2.e_shop_master.requestmodels.OrderRequest;
import com.yang2.e_shop_master.responsemodels.OrderItemResponse;
import com.yang2.e_shop_master.responsemodels.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@Transactional
public class OrderService {

    private ItemRepository itemRepository;
    private OrderItemsRepository orderItemsRepository;
    private OrderRepository orderRepository;

    private AddressRepository addressRepository;

    @Autowired
    public OrderService(ItemRepository itemRepository,
                        OrderItemsRepository orderItemsRepository,
                        OrderRepository orderRepository,
                        AddressRepository addressRepository) {
        this.itemRepository = itemRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
    }

    // 只需要调用 set 方法设置 @ManyToOne 的属性后，Spring Data JPA 会自动维护 @OneToMany 的反向关系
    // 但是还是用辅助方法比较好，因为JPA只会再事务提交后才会更新反向关系，如果需要立刻访问双向关系，还是手动更新比较好
    // 在拥有集合的一方，添加add方法，维护双边关系
    public double checkoutOrder(String userEmail, Map<Long, Integer> itemQuantities) throws Exception {

        Order order = new Order();
        order.setUserEmail(userEmail);
        order.setDate(Date.valueOf(LocalDate.now()));

        double orderPrice = 0.00;

        for (Map.Entry<Long, Integer> entry : itemQuantities.entrySet()) {

            Long itemId = entry.getKey();
            Integer quantity = entry.getValue();

            Optional<Item> item = itemRepository.findById(itemId);
            if (!item.isPresent()){
                throw new Exception("Item not found: ID " + itemId);
            }

            if (item.get().getQuantity() < quantity){
                throw new Exception("Insufficient stock for item: " + item.get().getName());
            }

            // Count orderPrice
            double itemTotalPrice = Double.valueOf(item.get().getPrice() * quantity);
            orderPrice += itemTotalPrice;

            // Add orderItems
            OrderItems orderItems = new OrderItems();
            orderItems.setQuantity(quantity);

            order.addOrderItem(orderItems);
            item.get().addOrderItem(orderItems);

            // Reduce item stock quantity
            item.get().setQuantity(item.get().getQuantity() - quantity);
            itemRepository.save(item.get());
        }

        // Update orderPrice
        order.setOrderPrice(orderPrice);

        // Save order, cascading save orderItems
        orderRepository.save(order);

        return orderPrice;

    }


    public boolean payment(String userEmail, double userPayment) throws Exception {

        Order latestOrder = orderRepository.findFirstByUserEmailOrderByDateDesc(userEmail);

        double orderPrice = latestOrder.getOrderPrice();

        if (userPayment < orderPrice) {
            throw new Exception("User Payment is not enough!");
        }

        return true;

    }

    public OrderResponse latestOrderSummary(User user){

        OrderResponse orderResponse = new OrderResponse();

        // Latest order
        Order latestOrder = orderRepository.findFirstByUserEmailOrderByDateDesc(user.getUserEmail());

        orderResponse.setUserEmail(user.getUserEmail());
        orderResponse.setUserFullName(user.getFirstName() + " "+ user.getLastName());
        orderResponse.setPhone(user.getPhone());

        Optional<Address> address = addressRepository.findById(user.getAddressId());
        orderResponse.setAddress(address.get());

        orderResponse.setOrderPrice(latestOrder.getOrderPrice());
        orderResponse.setDate(latestOrder.getDate());

        // Ordered Items
        List<OrderItems> orderItemsList = orderItemsRepository.findByOrder(latestOrder);
        List<OrderItemResponse> orderItemResponseList = new ArrayList<>();

        for (OrderItems orderItems : orderItemsList) {
            Item item = orderItems.getItem();

            OrderItemResponse orderItemResponse = new OrderItemResponse();
            orderItemResponse.setItemId(item.getId());
            orderItemResponse.setItemName(item.getName());
            orderItemResponse.setItemPrice(item.getPrice());

            orderItemResponse.setOrderQuantity(orderItems.getQuantity());

            orderItemResponseList.add(orderItemResponse);
        }

        orderResponse.setOrderItemResponseList(orderItemResponseList);

        return orderResponse;
    }

    Page<Order> findByUserEmail(String userEmail, Pageable pageable){
        return orderRepository.findByUserEmail(userEmail, pageable);
    }
}


















