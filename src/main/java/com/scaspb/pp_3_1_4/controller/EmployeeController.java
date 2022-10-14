package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.Employee;
import ru.kata.spring.boot_security.demo.service.EmployeeService;

import java.security.Principal;

@RestController
@PreAuthorize("USER")
@RequestMapping("/api")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @GetMapping("/employee")
    public ResponseEntity<Employee> showEmployee(Principal principal) {
        return new ResponseEntity<>(employeeService.findByLogin(principal.getName()), HttpStatus.OK);
    }


}
