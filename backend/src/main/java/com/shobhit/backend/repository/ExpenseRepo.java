package com.shobhit.backend.repository;

import com.shobhit.backend.model.Expense;
import com.shobhit.backend.model.ExpenseType;
import com.shobhit.backend.model.User;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Long> {
    Optional<List<Expense>> findByIdAndUser(Long id, User user);
    List<Expense> findByUser_UsernameAndExpenseType(String username, ExpenseType expenseType);
    List<Expense> findByUser_UsernameAndCategory(String username,String category);
    List<Expense> findByUser_UsernameAndCategoryAndExpenseType(String username,String category, ExpenseType expenseType);
    List<Expense> findByUser_UsernameAndDateTimeBetween(String username, LocalDateTime start, LocalDateTime end);
    List<Expense> findByUser_UsernameAndCategoryAndDateTimeBetween(String username,String category,LocalDateTime start,LocalDateTime end);
    List<Expense> findByUser_UsernameAndExpenseTypeAndDateTimeBetween(String username, ExpenseType expenseType, LocalDateTime start, LocalDateTime end);
    List<Expense> findByUser_UsernameAndCategoryAndExpenseTypeAndDateTimeBetween(
            String username, String category, ExpenseType expenseType, LocalDateTime start, LocalDateTime end
    );

}
