package com.scaspb.pp_3_1_4.service;


import com.scaspb.pp_3_1_4.model.Employee;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface EmployeeService extends UserDetailsService {

    public List<Employee> getAllEmployees();

    public void saveEmployee(Employee employee);

    public Employee getEmployee(int id);

    public void deleteEmployee(int id);

    public Employee findByLogin(String name);

}
