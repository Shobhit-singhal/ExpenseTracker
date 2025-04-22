package com.shobhit.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterExpenseResDTO {
    private List<ExpenseResDTO> expenses;
    private double total;
    private Map<String,Double> categoryTotal;
}
