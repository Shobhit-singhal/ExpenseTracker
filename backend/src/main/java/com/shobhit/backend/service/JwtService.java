package com.shobhit.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class JwtService {
    private final String secret="2e0c830d78edd43a476375ac2a538fbd76043413a37da9f35808fa31ac9df0ee";
    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    public String generateToken(String username){
        Map<String, Object> claims=new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60))
                .and()
                .signWith(getKey())
                .compact();
    }
}
