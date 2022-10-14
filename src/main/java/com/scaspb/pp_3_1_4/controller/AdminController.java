package com.scaspb.pp_3_1_4.controller;

import com.scaspb.pp_3_1_4.exception_handling.NoSuchEmployeeException;
import com.scaspb.pp_3_1_4.model.Employee;
import com.scaspb.pp_3_1_4.model.Role;
import com.scaspb.pp_3_1_4.service.EmployeeService;
import com.scaspb.pp_3_1_4.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@PreAuthorize("ADMIN")
@RequestMapping("/api")
public class AdminController {

    private final EmployeeService employeeService;
    private final RoleService roleService;

    public AdminController(EmployeeService employeeService, RoleService roleService) {
        this.employeeService = employeeService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Employee>> showAdminPage() {
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<Void> createEmployee(@Valid @RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/admin")
    public ResponseEntity<Void> updateEmployee(@Valid @RequestBody Employee employee, @PathVariable int id) {
        employeeService.saveEmployee(employee);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
        if (employeeService.getEmployee(id) == null) {
            throw new NoSuchEmployeeException("There is no employee with ID = " +
                    id + " int Database");
        }
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<Set<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }


    @GetMapping("/header")
    public ResponseEntity<Employee> getAuthentication(Principal principal) {
        Employee employee = employeeService.findByLogin(principal.getName());
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
}
