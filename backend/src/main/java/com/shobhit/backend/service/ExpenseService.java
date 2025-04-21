package com.shobhit.backend.service;

import com.shobhit.backend.dto.ExpenseReqDTO;
import com.shobhit.backend.dto.ExpenseResDTO;
import com.shobhit.backend.model.Expense;
import com.shobhit.backend.model.ExpenseType;
import com.shobhit.backend.model.User;
import com.shobhit.backend.repository.ExpenseRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private UserService userService;

    public ExpenseResDTO convExpense(Expense expense){
        return ExpenseResDTO.builder()
                .id(expense.getId())
                .category(expense.getCategory())
                .expenseType(expense.getExpenseType())
                .dateTime(expense.getDateTime())
                .amt(expense.getAmt())
                .build();
    }
    public Expense convToExpense(ExpenseReqDTO expenseReqDTO){
        return Expense.builder()
                .expenseType(expenseReqDTO.getExpenseType())
                .category(expenseReqDTO.getCategory())
                .amt(expenseReqDTO.getAmt())
                .build();
    }
    public List<ExpenseResDTO> getALlExpense(String name) {
        User user=userService.getUserByUsername(name);
        List<Expense> expenses=user.getExpenses();
        List<ExpenseResDTO> retExpenses=new ArrayList<>();
        for(Expense expense:expenses){
            retExpenses.add(convExpense(expense));
        }
        return retExpenses;
    }
    public Expense getById(long id){
        return expenseRepo.findById(id).orElseThrow(()->new EntityNotFoundException("Entity Not Found with id: "+id));
    }
    public ExpenseResDTO addExpense(String name, ExpenseReqDTO expenseReqDTO) {
        User user=userService.getUserByUsername(name);
        Expense expense=convToExpense(expenseReqDTO);
        expense.setUser(user);
        Expense saved=expenseRepo.save(expense);
        user.getExpenses().add(saved);
        return convExpense(saved);
    }

    public Expense getExpenseWithProof(String name,long id){
        User user=userService.getUserByUsername(name);
        Expense expense=getById(id);
        if(expense.getUser().getUsername().equals(name)){
            return expense;
        }else {
            throw new AccessDeniedException("You don't have access to view this");
        }
    }
    public ExpenseResDTO getOneExpense(String name, long id) {
        Expense expense=getExpenseWithProof(name,id);
        return convExpense(expense);
    }
    public void delete(String name, long id) {
        Expense expense=getExpenseWithProof(name,id);
        expenseRepo.delete(expense);
    }

    public ExpenseResDTO updateExpense(String name, long id, @Valid ExpenseReqDTO expenseReqDTO) {
        Expense expense=getExpenseWithProof(name,id);
        expense.setAmt(expenseReqDTO.getAmt());
        expense.setCategory(expenseReqDTO.getCategory());
        expense.setExpenseType(expenseReqDTO.getExpenseType());
        Expense saved = expenseRepo.save(expense);
        return convExpense(saved);
    }
}
