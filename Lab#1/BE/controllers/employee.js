const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  
  const index = employee.findIndex(emp => emp.id === id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Employee not found' 
    });
  }
  
  employee.splice(index, 1);
  
  res.status(200).json({ 
    success: true, 
    message: 'Employee deleted successfully',
    data: employee 
  });
};

exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  
  if (!id || !name) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide both id and name' 
    });
  }
  
  // Check if employee with same ID already exists
  const exists = employee.find(emp => emp.id === id);
  
  if (exists) {
    return res.status(400).json({ 
      success: false, 
      message: 'Employee with this ID already exists' 
    });
  }
  
  const newEmployee = { id: id.toString(), name };
  employee.push(newEmployee);
  
  res.status(201).json({ 
    success: true, 
    message: 'Employee created successfully',
    data: employee 
  });
};

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a name' 
    });
  }
  
  const employeeIndex = employee.findIndex(emp => emp.id === id);
  
  if (employeeIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Employee not found' 
    });
  }
  
  employee[employeeIndex].name = name;
  
  res.status(200).json({ 
    success: true, 
    message: 'Employee updated successfully',
    data: employee 
  });
};