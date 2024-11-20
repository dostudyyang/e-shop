package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUserEmail(String userEmail);
}
