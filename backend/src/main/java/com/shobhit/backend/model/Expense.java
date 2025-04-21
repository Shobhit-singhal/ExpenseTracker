package com.shobhit.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private double amt;
    @Column(nullable = false)
    private String category;
    @CreatedDate
    private LocalDateTime dateTime;
    @Enumerated(EnumType.STRING)
    private ExpenseType expenseType;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
