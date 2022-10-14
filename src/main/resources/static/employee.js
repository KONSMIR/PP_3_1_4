const url = '/api/employee'
const urlHeader = '/api/header'
const header = document.getElementById('header')
const headerRoles = document.getElementById('headerRoles')
const tBody = document.querySelector('tbody')
let result = ''

function getAuthenticationForEmployeePage() {
    fetch(urlHeader)
        .then(response => response.json())
        .then(employee => {
            const text = employee.login
            const text2 = ' with roles: ' + employee.roles.map(r => r.name)
            header.innerHTML = text
            headerRoles.innerHTML = text2
        })
}

getAuthenticationForEmployeePage()

const showTable = (employee) => {
    result += `<tr>
        <td>${employee.id}</td>   
        <td>${employee.name}</td>
        <td>${employee.surname}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.login}</td>
        <td>${employee.roles.map(r => r.name)}</td>
        </tr>`
    tBody.innerHTML = result
}

fetch(url)
    .then(response => response.json())
    .then(data => showTable(data))
    .catch(error => console.log(error))