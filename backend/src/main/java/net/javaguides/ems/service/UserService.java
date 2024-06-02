package net.javaguides.ems.service;

import net.javaguides.ems.entity.User;
import net.javaguides.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


    public String updateEmailAndGenerateNewToken(String oldEmail, String newEmail) {
        User user = userRepository.findByEmail(oldEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEmail(newEmail);
        userRepository.save(user);

        // Generowanie nowego tokena JWT
        return jwtService.generateToken(user);
    }

    public void updatePassword(String userEmail, String newPassword) {
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
