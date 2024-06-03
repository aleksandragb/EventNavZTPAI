package net.javaguides.ems.controller;

import net.javaguides.ems.dto.UpdateEmailDTO;
import net.javaguides.ems.dto.UpdatePasswordDTO;
import net.javaguides.ems.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint do aktualizacji emaila
    @PutMapping("/update-email")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateEmail(@RequestBody UpdateEmailDTO updateEmailDTO, Principal principal) {
        String newToken = userService.updateEmailAndGenerateNewToken(principal.getName(), updateEmailDTO.getNewEmail());
        return ResponseEntity.ok(newToken);
    }

    // Endpoint do aktualizacji hasła
    @PutMapping("/update-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordDTO updatePasswordDTO, Authentication authentication) {
        String userEmail = authentication.getName();
        userService.updatePassword(userEmail, updatePasswordDTO.getNewPassword());
        return ResponseEntity.ok("Password updated successfully.");
    }
}
