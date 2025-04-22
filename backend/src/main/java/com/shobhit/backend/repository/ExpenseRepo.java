package com.shobhit.backend.repository;

import com.shobhit.backend.model.Expense;
import com.shobhit.backend.model.ExpenseType;
import com.shobhit.backend.model.User;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Long> {


    @Query("""
            select e from Expense e
            where e.user.username=:username
            AND (:type is NULL or e.expenseType=:type)
            AND (:category is NULL or e.category=:category)
            AND (:start is null or e.dateTime>=:start)
            AND (:end is null or e.dateTime<:end)
    """)

    List<Expense> filterExpense(@Param("username") String username
            , @Param("type") ExpenseType expenseType
            , @Param("category") String category
            , @Param("start")LocalDateTime start
            ,@Param("end") LocalDateTime end);

//    @Query("""
//            select sum(e.amt) from Expense e
//            where e.user.username=:name
//            AND YEAR(e.dateTime)=:year
//            AND MONTH(e.dateTime)=:month
//            AND e.expenseType=:type
//            """)
//    public Double totalByMonth(
//            @Param("name") String name,
//            @Param("year") int year,
//            @Param("month")int month,
//            @Param("type")ExpenseType type);

    @Query ("""
            select COALESCE(SUM(e.amt), 0.0) from Expense e
            where e.user.username=:name
            and YEAR(e.dateTime) = :year
            and Month(e.dateTime) = :month
            and e.expenseType=:type
            
            """)
    public Double getMonthlyTotal(@Param("name") String name
            ,@Param("year") int year
            ,@Param("month") int month
            ,@Param("type") ExpenseType type);
}
