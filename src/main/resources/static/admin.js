const url = '/api/admin'
const urlForHeader = '/api/header'
const urlForRoles = '/api/roles'
const header = document.getElementById('header')
const headerRoles = document.getElementById('headerRoles')
const employeesTable = document.querySelector('#navTab a:first-child')
const newEmployeesTable = bootstrap.Tab.getOrCreateInstance(employeesTable)
const tbody = document.querySelector('tbody')

const newEmployee = document.getElementById('newEmployee')
const name = document.getElementById('addName')
const surname = document.getElementById('addSurname')
const department = document.getElementById('addDepartment')
const salary = document.getElementById('addSalary')
const login = document.getElementById('addLogin')
const password = document.getElementById('addPassword')
const roles = document.getElementById('addRole')

const deleteModal = document.getElementById('deleteModal')
const newDeleteModal = bootstrap.Modal.getOrCreateInstance(deleteModal)
const deleteId = document.getElementById('deleteId')
const deleteName = document.getElementById('deleteName')
const deleteSurname = document.getElementById('deleteSurname')
const deleteDepartment = document.getElementById('deleteDepartment')
const deleteSalary = document.getElementById('deleteSalary')
const deleteLogin = document.getElementById('deleteLogin')
const deleteRole = document.getElementById('deleteRole')

const editModal = document.getElementById('editModal')
const newEditModal = bootstrap.Modal.getOrCreateInstance(editModal)
const editId = document.getElementById('editId')
const editName = document.getElementById('editName')
const editSurname = document.getElementById('editSurname')
const editDepartment = document.getElementById('editDepartment')
const editSalary = document.getElementById('editSalary')
const editLogin = document.getElementById('editLogin')
const editPassword = document.getElementById('editPassword')
const editRole = document.getElementById('editRole')

function getAuthentication() {
    fetch(urlForHeader)
        .then(response => response.json())
        .then(employee => {
            const text = employee.login
            const text2 = ' with roles: ' + employee.roles.map(r => r.name)
            header.innerHTML = text
            headerRoles.innerHTML = text2
        })
}

getAuthentication()


let result = ''
const showEmployeesTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(employees => {
            employees.forEach(employee => {
                result += `<tr>
                            <td>${employee.id}</td>
                            <td>${employee.name}</td>
                            <td>${employee.surname}</td>
                            <td>${employee.department}</td>
                            <td>${employee.salary}</td>
                            <td>${employee.login}</td>
                            <td>${employee.roles.map(r => r.name)}</td>
                            <td><button type="submit" class="btnEdit btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
                            <td><button type="submit" class="btnDel btn btn-danger" 
                                data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button></td>
                        </tr>`
            })
            tbody.innerHTML = result
        })
}

fetch(url)
    .then(response => response.json())
    .then(data => showEmployeesTable(data))
    .catch(error => console.log(error))

function getAllRoles(target) {
    fetch(urlForRoles)
        .then(response => response.json())
        .then(roles => {
            let optionsRoles = ''
            roles.forEach(role => {
                optionsRoles += `<option value='${role.id}'>${role.name}</option>`
            })
            target.innerHTML = optionsRoles
        })
}

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}

const refreshEmployeesTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            result = ''
            showEmployeesTable(data)
        })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


on(document, 'click', '.btnEdit', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    editId.value = target.children[0].innerHTML
    editName.value = target.children[1].innerHTML
    editSurname.value = target.children[2].innerHTML
    editDepartment.value = target.children[3].innerHTML
    editSalary.value = target.children[4].innerHTML
    editLogin.value = target.children[5].innerHTML
    editPassword.value = ''
    editRole.value = getAllRoles(editRole)
})

editModal.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#editRole');
    let setRoles = roleArray(options)
    fetch(url + `/${id}`, {
        method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            id: editId.value,
            name: editName.value,
            surname: editSurname.value,
            department: editDepartment.value,
            salary: editSalary.value,
            login: editLogin.value,
            password: editPassword.value,
            roles: setRoles
        })
    })
        .then(data => showEmployeesTable(data))
        .catch(error => console.log(error))
        .then(refreshEmployeesTable)
    newEditModal.hide()
})


on(document, 'click', '.btnDel', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    deleteId.value = target.children[0].innerHTML
    deleteName.value = target.children[1].innerHTML
    deleteSurname.value = target.children[2].innerHTML
    deleteDepartment.value = target.children[3].innerHTML
    deleteSalary.value = target.children[4].innerHTML
    deleteLogin.value = target.children[5].innerHTML
    deleteRole.value = getAllRoles(deleteRole)
})

deleteModal.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + `/${id}`, {
        method: 'DELETE',
    })
        .then(data => showEmployeesTable(data))
        .catch(error => console.log(error))
        .then(refreshEmployeesTable)
    newDeleteModal.hide()
})


getAllRoles(roles)
newEmployee.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#addRole');
    let setRoles = roleArray(options)
    fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            department: department.value,
            salary: salary.value,
            login: login.value,
            password: password.value,
            roles: setRoles
        })
    })
        .then(data => showEmployeesTable(data))
        .catch(error => console.log(error))
        .then(refreshEmployeesTable)
    newEmployeesTable.show()
    name.value = ''
    surname.value = ''
    department.value = ''
    salary.value = ''
    login.value = ''
    password.value = ''
    roles.value = ''
})