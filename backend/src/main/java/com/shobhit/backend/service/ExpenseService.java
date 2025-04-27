package com.shobhit.backend.service;

import com.shobhit.backend.dto.ExpenseReqDTO;
import com.shobhit.backend.dto.ExpenseResDTO;
import com.shobhit.backend.dto.FilterExpenseResDTO;
import com.shobhit.backend.model.Expense;
import com.shobhit.backend.model.ExpenseType;
import com.shobhit.backend.model.User;
import com.shobhit.backend.repository.ExpenseRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.lang.management.ManagementPermission;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
                .description(expense.getDescription())
                .build();
    }
    public Expense convToExpense(ExpenseReqDTO expenseReqDTO){
        return Expense.builder()
                .expenseType(expenseReqDTO.getExpenseType())
                .category(expenseReqDTO.getCategory())
                .amt(expenseReqDTO.getAmt())
                .description(expenseReqDTO.getDescription())
                .build();
    }
    public FilterExpenseResDTO getALlExpense(String name,
                                             String expenseType,
                                             String category,
                                             LocalDate startDate,
                                             LocalDate endDate) {
        List<ExpenseResDTO> retExpenses=new ArrayList<>();
        ExpenseType type=expenseType==null?null:ExpenseType.valueOf(expenseType.toUpperCase());
        LocalDateTime start=null,end=null;
        if(startDate!=null){
            start=startDate.atStartOfDay();
            end=(endDate==null)
                    ?
                    LocalDate.now().plusDays(1).atStartOfDay()
                    :
                    endDate.plusDays(1).atStartOfDay();
        }
        List<Expense> expenses= expenseRepo.filterExpense(name,type,category,start,end);
        List<ExpenseResDTO> newEx= expenses.stream()
                .map(expense->convExpense(expense))
                .collect(Collectors.toList());
        double total=newEx.stream().mapToDouble(expense->expense.getAmt()).sum();

        Map<String,Double> categoryTotal=new HashMap<>();
        for(ExpenseResDTO expense:newEx){
            categoryTotal.merge(expense.getCategory().toUpperCase(),
                    expense.getAmt(),
                    (oldVal, newVal) -> oldVal + newVal);
        }
        return FilterExpenseResDTO.builder()
                .expenses(newEx)
                .total(total)
                .categoryTotal(categoryTotal)
                .build();
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
        expense=convToExpense(expenseReqDTO);
        Expense saved = expenseRepo.save(expense);
        return convExpense(saved);
    }

    public Map<String, Double> getExpenseMonthly(String name, int year, String expenseType) {
        Map<String,Double> monthly = new LinkedHashMap<>();
        ExpenseType type=ExpenseType.valueOf(expenseType.toUpperCase());
        for(int month=1;month<=12;month++){
            Double total=expenseRepo.getMonthlyTotal(name,year,month,type);
            monthly.put(getMonthName(month),total);
        }
        return monthly;
    }
    private String getMonthName(int month) {
        return switch (month) {
            case 1 -> "Jan";
            case 2 -> "Feb";
            case 3 -> "Mar";
            case 4 -> "Apr";
            case 5 -> "May";
            case 6 -> "Jun";
            case 7 -> "Jul";
            case 8 -> "Aug";
            case 9 -> "Sep";
            case 10 -> "Oct";
            case 11 -> "Nov";
            case 12 -> "Dec";
            default -> "";
        };
    }
}
