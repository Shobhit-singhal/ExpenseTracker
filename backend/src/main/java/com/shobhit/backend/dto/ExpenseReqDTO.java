package com.shobhit.backend.dto;

import com.shobhit.backend.model.ExpenseType;
import com.shobhit.backend.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseReqDTO {
    @Positive(message = "Amount must be positive")
    private double amt;
    @NotBlank(message = "Category must not be blank")
    private String category;
    @NotNull(message = "Expense type is required")
    private ExpenseType expenseType;
    private String description;
}
