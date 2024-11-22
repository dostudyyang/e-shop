package com.yang2.e_shop_master.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "item")
@Data
@EqualsAndHashCode(exclude = "orderItems")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "brand")
    private String brand;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Integer price;

    @Column(name = "img")
    private String img;

    @OneToMany(mappedBy = "item")
    @JsonIgnore
    private Set<OrderItems> orderItems  = new HashSet<>();

    public void addOrderItem(OrderItems orderItem) {
        orderItems.add(orderItem);
        orderItem.setItem(this);
    }
}
