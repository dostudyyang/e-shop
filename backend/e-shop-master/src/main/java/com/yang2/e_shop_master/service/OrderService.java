package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.*;
import com.yang2.e_shop_master.entity.*;
import com.yang2.e_shop_master.requestmodels.OrderRequest;
import com.yang2.e_shop_master.responsemodels.OrderItemResponse;
import com.yang2.e_shop_master.responsemodels.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@Transactional
public class OrderService {

    private ItemRepository itemRepository;
    private OrderItemsRepository orderItemsRepository;
    private OrderRepository orderRepository;

    private AddressRepository addressRepository;
    private UserRepository userRepository;

    @Autowired
    public OrderService(ItemRepository itemRepository,
                        OrderItemsRepository orderItemsRepository,
                        OrderRepository orderRepository,
                        AddressRepository addressRepository,
                        UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    // 只需要调用 set 方法设置 @ManyToOne 的属性后，Spring Data JPA 会自动维护 @OneToMany 的反向关系
    // 但是还是用辅助方法比较好，因为JPA只会再事务提交后才会更新反向关系，如果需要立刻访问双向关系，还是手动更新比较好
    // 在拥有集合的一方，添加add方法，维护双边关系
    public double checkoutOrder(String userEmail, Map<Long, Integer> itemQuantities) throws Exception {

        Order order = new Order();
        order.setUserEmail(userEmail);

        order.setDate(new Date());

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
            orderItemResponse.setBrand(item.getBrand());
            orderItemResponse.setItemPrice(item.getPrice());
            orderItemResponse.setImg(item.getImg());

            orderItemResponse.setOrderQuantity(orderItems.getQuantity());

            orderItemResponseList.add(orderItemResponse);
        }

        orderResponse.setOrderItemResponseList(orderItemResponseList);

        return orderResponse;
    }

    public OrderResponse orderDetails(Long orderId){

        OrderResponse orderResponse = new OrderResponse();

        Optional<Order> orderOptional = orderRepository.findById(orderId);
        Order order = orderOptional.get();

        User orderUser = userRepository.findUserByUserEmail(order.getUserEmail());

        orderResponse.setUserEmail(orderUser.getUserEmail());
        orderResponse.setUserFullName(orderUser.getFirstName() + " "+ orderUser.getLastName());
        orderResponse.setPhone(orderUser.getPhone());

        Optional<Address> address = addressRepository.findById(orderUser.getAddressId());
        orderResponse.setAddress(address.get());

        orderResponse.setOrderPrice(order.getOrderPrice());
        orderResponse.setDate(order.getDate());

        // Ordered Items
        List<OrderItems> orderItemsList = orderItemsRepository.findByOrder(order);
        List<OrderItemResponse> orderItemResponseList = new ArrayList<>();

        for (OrderItems orderItems : orderItemsList) {
            Item item = orderItems.getItem();

            OrderItemResponse orderItemResponse = new OrderItemResponse();
            orderItemResponse.setItemId(item.getId());
            orderItemResponse.setItemName(item.getName());
            orderItemResponse.setBrand(item.getBrand());
            orderItemResponse.setItemPrice(item.getPrice());
            orderItemResponse.setImg(item.getImg());

            orderItemResponse.setOrderQuantity(orderItems.getQuantity());

            orderItemResponseList.add(orderItemResponse);
        }

        orderResponse.setOrderItemResponseList(orderItemResponseList);

        return orderResponse;
    }

    public Page<Order> findByUserEmail(String userEmail, Pageable pageable){
        return orderRepository.findByUserEmail(userEmail, pageable);
    }

    public Page<Order> findByItemId(Long itemId, Pageable pageable) throws Exception {
        Optional<Item> item = itemRepository.findById(itemId);

        if (!item.isPresent()){
            throw new Exception("Item is not exist!");
        }

        List<OrderItems> orderItemsList = orderItemsRepository.findByItem(item.get());
        List<Long> orderIds = new ArrayList<>();

        for (OrderItems orderItem : orderItemsList) {
            Long orderId = orderItem.getOrder().getId();
            orderIds.add(orderId);

        }

        return orderRepository.findByIdIn(orderIds, pageable);

    }

    public Page<Order> findByDate(Date date, Pageable pageable){
        return orderRepository.findByDate(date, pageable);
    }


}


















