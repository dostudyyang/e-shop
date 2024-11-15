package com.yang2.e_shop_master.dao;

import com.yang2.e_shop_master.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

    Address findAddressByZip(String zip);
}
