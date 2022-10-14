package com.scaspb.pp_3_1_4.service;


import com.scaspb.pp_3_1_4.model.Role;

import java.util.Collection;
import java.util.Set;

public interface RoleService {

    public Set<Role> getAllRoles();

    public Collection<Role> getByName(String name);
}
