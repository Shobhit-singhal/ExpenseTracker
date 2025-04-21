package com.shobhit.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class UserReqDTO {
    @NotBlank(message = "Username cant be blank")
    @Length(min = 3)
    private String username;
    @NotBlank(message = "password cant be blank")
    @Length(min = 3)
    private String password;
}
