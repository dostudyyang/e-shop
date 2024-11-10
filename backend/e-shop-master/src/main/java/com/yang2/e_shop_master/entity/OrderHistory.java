package com.yang2.e_shop_master.entity;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_history")
@Data
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "order_id")
    private Long orderId;
}
