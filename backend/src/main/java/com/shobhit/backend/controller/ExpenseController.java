package com.shobhit.backend.controller;

import com.shobhit.backend.dto.ExpenseReqDTO;
import com.shobhit.backend.dto.ExpenseResDTO;
import com.shobhit.backend.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;
    @GetMapping
    public List<ExpenseResDTO> getAllExpense(Authentication authentication
            , @RequestParam(required = false) String expenseType
            , @RequestParam(required = false) String category
            , @RequestParam(required = false) LocalDate startDate
            , @RequestParam(required = false) LocalDate endDate){
        return expenseService.getALlExpense(authentication.getName(),expenseType,category,startDate,endDate);
    }
    @PostMapping
    public ExpenseResDTO addExpense(Authentication authentication, @Valid @RequestBody ExpenseReqDTO expenseReqDTO){
        return expenseService.addExpense(authentication.getName(),expenseReqDTO);
    }
    @GetMapping("/{id}")
    public ExpenseResDTO getOneExpense(Authentication authentication,@PathVariable long id){
        return expenseService.getOneExpense(authentication.getName(),id);
    }
    @DeleteMapping("/{id}")
    public void deleteExpense(Authentication authentication,@PathVariable long id){
        expenseService.delete(authentication.getName(),id);
    }

    @PutMapping("/{id}")
    public ExpenseResDTO updateExpense(Authentication authentication, @PathVariable long id, @Valid @RequestBody ExpenseReqDTO expenseReqDTO){
        return expenseService.updateExpense(authentication.getName(),id,expenseReqDTO);
    }



}
