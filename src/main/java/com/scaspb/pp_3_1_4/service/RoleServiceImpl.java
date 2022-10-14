package com.scaspb.pp_3_1_4.service;

import com.scaspb.pp_3_1_4.model.Role;
import com.scaspb.pp_3_1_4.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Set<Role> getAllRoles() {
        Set<Role> roles = (Set<Role>) roleRepository.findAll();
        return roles;
    }

    @Override
    public Collection<Role> getByName(String name) {
        Collection<Role> roles = new ArrayList<>();
        for (Role role : getAllRoles()) {
            if (name.contains(role.getName()))
                roles.add(role);
        }
        return roles;
    }
}
