package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.AddressRepository;
import com.yang2.e_shop_master.dao.UserRepository;
import com.yang2.e_shop_master.entity.Address;
import com.yang2.e_shop_master.entity.User;
import com.yang2.e_shop_master.requestmodels.UserRequest;
import com.yang2.e_shop_master.responsemodels.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;
    private AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressRepository = addressRepository;
    }

    public void postUser(UserRequest userRequest) {
        User user = new User();
        user.setRole(userRequest.getRole());

        // Encrypted password
        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());
        user.setPassword(encodedPassword);

        user.setUserEmail(userRequest.getUserEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());

        if (userRequest.getPhone() != null && !userRequest.getPhone().isEmpty()) {
            user.setPhone(userRequest.getPhone());
        }
        if (userRequest.getAddress() != null) {
            user.setAddressId(userRequest.getAddress().getId());
        }
        if (userRequest.getCreditCardNum() != null && !userRequest.getCreditCardNum().isEmpty()) {
            user.setCreditCardNum(userRequest.getCreditCardNum());
        }

        userRepository.save(user);
    }

    public Long loginAuthenticate(UserRequest userRequest) throws Exception {

        User user = userRepository.findUserByUserEmail(userRequest.getUserEmail());
        Long userId = null;
        if (user == null) {
            throw new Exception("User not found");
        }

        String rawPassword = userRequest.getPassword();
        String encodedPassword = user.getPassword();

        if(passwordEncoder.matches(rawPassword, encodedPassword)){
            userId = user.getId();
        }else {
            throw new Exception("Wrong Password!");
        }
        return userId;

    }

    public void updateUserInfo(Long userId, UserRequest userRequest) throws Exception {

        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new Exception("User not found");
        }

        if (userRequest.getUserEmail() != null && !userRequest.getUserEmail().isEmpty()) {
            user.get().setUserEmail(userRequest.getUserEmail());
        }
        if (userRequest.getFirstName() != null && !userRequest.getFirstName().isEmpty()) {
            user.get().setFirstName(userRequest.getFirstName());
        }
        if (userRequest.getLastName() != null && !userRequest.getLastName().isEmpty()) {
            user.get().setLastName(userRequest.getLastName());
        }

        user.get().setPhone(userRequest.getPhone());
        user.get().setAddressId(userRequest.getAddress().getId());
        user.get().setCreditCardNum(userRequest.getCreditCardNum());

        userRepository.save(user.get());
    }

    public Optional<User> findByUserId(Long userId) {
        return userRepository.findById(userId);
    }

    public UserResponse loadUserInfo(Long userId) throws Exception {

        UserResponse userResponse = new UserResponse();

        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new Exception("User not found");
        }

        userResponse.setRole(user.get().getRole());
        userResponse.setUserEmail(user.get().getUserEmail());
        userResponse.setFirstName(user.get().getFirstName());
        userResponse.setLastName(user.get().getLastName());
        userResponse.setPhone(user.get().getPhone());
        userResponse.setCreditCardNum(user.get().getCreditCardNum());

        if(user.get().getAddressId() != null){
            Optional<Address> address = addressRepository.findById(user.get().getAddressId());
            userResponse.setAddress(address.get());
        }


        return userResponse;

    }


}
