package com.shobhit.backend.repository;

import com.shobhit.backend.model.Expense;
import com.shobhit.backend.model.User;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Long> {
    Optional<List<Expense>> findByIdAndUser(Long id, User user);

}
