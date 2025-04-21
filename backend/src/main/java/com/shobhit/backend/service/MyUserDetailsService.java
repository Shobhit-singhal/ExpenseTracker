package com.shobhit.backend.service;

import com.shobhit.backend.model.MyUserDetails;
import com.shobhit.backend.model.User;
import com.shobhit.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepo.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("No user with username: "+username));
        return new MyUserDetails(user);
    }
}
