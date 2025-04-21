package com.shobhit.backend.service;

import com.shobhit.backend.dto.UserReqDTO;
import com.shobhit.backend.dto.UserResDTO;
import com.shobhit.backend.model.User;
import com.shobhit.backend.repository.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtService jwtService;
    public User getUserByUsername(String username){
        return userRepo.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("No user with username: "+username));
    }

    public UserResDTO register( UserReqDTO user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User reqUser= User.builder().username(user.getUsername()).password(user.getPassword()).build();
        User saved=userRepo.save(reqUser);
        return UserResDTO.builder().username(saved.getUsername()).build();
    }

    public String login( UserReqDTO user) {
        Authentication authentication=manager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword())
        );
        return jwtService.generateToken(user.getUsername());
    }
}
