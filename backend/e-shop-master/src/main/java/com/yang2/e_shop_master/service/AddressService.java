package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.AddressRepository;
import com.yang2.e_shop_master.entity.Address;
import com.yang2.e_shop_master.requestmodels.AddressRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AddressService {

    private AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }


    public Address addAddress(AddressRequest addressRequest){
        Address address = new Address();
        address.setStreet(addressRequest.getStreet());
        address.setProvince(addressRequest.getProvince());
        address.setCountry(addressRequest.getCountry());
        address.setZip(addressRequest.getZip());
        return addressRepository.save(address);
    }

    public Address findAddressByZip(String zip){
        return addressRepository.findAddressByZip(zip);
    }

    /**
     * Resolves an address by checking if it exists in the database.
     * If it exists, returns the existing address; otherwise, creates and saves a new address.
     *
     * @param address The address to resolve.
     * @return The resolved address.
     */
    public Address resolveAddress (Address address){
        Address existingAddress = this.findAddressByZip(address.getZip());

        if (existingAddress != null) {
            return existingAddress;
        }

        AddressRequest addressRequest = new AddressRequest();
        addressRequest.setStreet(address.getStreet());
        addressRequest.setProvince(address.getProvince());
        addressRequest.setCountry(address.getCountry());
        addressRequest.setZip(address.getZip());

        return this.addAddress(addressRequest);
    }



}
