function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

// TODO
// add event listener to update button

// TODO
// add event listener to delete button

// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
}

// TODO
function deleteEmployee (){
  // get id
  // send id to BE
  // call fetchEmployees
}

// TODO
function updateEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
}

fetchEmployees()
