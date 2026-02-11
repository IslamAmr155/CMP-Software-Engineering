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
        
        // Add event listener to delete button
        deleteButton.addEventListener('click', () => {
          deleteEmployee(item.id);
        });
        
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// Add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  createEmployee();
});

// Add event listener to update button
document.getElementById('updateEmployeeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  updateEmployee();
});

function createEmployee() {
  // Get data from input fields
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  
  // Send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Employee created successfully!');
        // Clear form
        document.getElementById('employeeForm').reset();
        // Call fetchEmployees to refresh table
        fetchEmployees();
      } else {
        alert(data.message || 'Error creating employee');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error creating employee');
    });
}

function deleteEmployee(id) {
  // Confirm deletion
  if (!confirm('Are you sure you want to delete this employee?')) {
    return;
  }
  
  // Send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Employee deleted successfully!');
        // Call fetchEmployees to refresh table
        fetchEmployees();
      } else {
        alert(data.message || 'Error deleting employee');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error deleting employee');
    });
}

function updateEmployee() {
  // Get data from input fields
  const id = document.getElementById('updateId').value;
  const name = document.getElementById('updateName').value;
  
  // Send data to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Employee updated successfully!');
        // Clear form
        document.getElementById('updateEmployeeForm').reset();
        // Call fetchEmployees to refresh table
        fetchEmployees();
      } else {
        alert(data.message || 'Error updating employee');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error updating employee');
    });
}

fetchEmployees()