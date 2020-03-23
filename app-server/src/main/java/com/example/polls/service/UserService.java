package com.example.polls.service;

import com.example.polls.exception.AppException;
import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import com.example.polls.model.User;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

public class UserService {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;


}
