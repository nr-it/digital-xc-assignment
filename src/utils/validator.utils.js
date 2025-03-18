exports.validateEmployees = (employees) => {
    if (employees.length < 2) throw new Error('⚠️ Need at least 2 employees!');
  
    const emails = new Set();
    employees.forEach((emp) => {
      if (!emp.Employee_Name || !emp.Employee_EmailID) throw new Error('🚨 Invalid employee data!');
      if (emails.has(emp.Employee_EmailID)) throw new Error(`🚨 Duplicate email: ${emp.Employee_EmailID}`);
      emails.add(emp.Employee_EmailID);
    });
  };
  