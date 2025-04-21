package com.shobhit.backend.controller;

import com.shobhit.backend.dto.UserReqDTO;
import com.shobhit.backend.dto.UserResDTO;
import com.shobhit.backend.model.User;
import com.shobhit.backend.repository.UserRepo;
import com.shobhit.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public UserResDTO register(@Valid @RequestBody UserReqDTO user){
        return userService.register(user);
    }
    @PostMapping("/login")
    public String login(@Valid  @RequestBody UserReqDTO user){
        return userService.login(user);
    }

}
