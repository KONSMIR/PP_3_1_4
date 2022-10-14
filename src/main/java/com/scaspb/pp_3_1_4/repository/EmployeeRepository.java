package com.scaspb.pp_3_1_4.repository;


import com.scaspb.pp_3_1_4.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    public Employee findByLogin(String login);

    public  Employee getEmployeeById(int id);
}
