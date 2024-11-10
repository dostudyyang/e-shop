package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.UserRepository;
import com.yang2.e_shop_master.entity.Address;
import com.yang2.e_shop_master.entity.User;
import com.yang2.e_shop_master.requestmodels.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

        userRepository.save(user);
    }

    public Boolean loginAuthenticate(UserRequest userRequest) throws Exception {

        User user = userRepository.findUserByUserEmail(userRequest.getUserEmail());
        if (user == null) {
            throw new Exception("User not found");
        }

        String rawPassword = userRequest.getPassword();
        String encodedPassword = user.getPassword();

        return passwordEncoder.matches(rawPassword, encodedPassword);

    }

    public void updateUserInfoWithPhoneAddressCreditCard(Long userId, UserRequest userRequest) throws Exception {

        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new Exception("User not found");
        }

        user.get().setPhone(userRequest.getPhone());
        user.get().setAddressId(userRequest.getAddress().getId());
        user.get().setCreditCardNum(userRequest.getCreditCardNum());

        userRepository.save(user.get());
    }




}
