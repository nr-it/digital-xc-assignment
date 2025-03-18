exports.assignSecretSantas = (employees, lastYearAssignments) => {
    const assignments = [];
    const availableChildren = [...employees];

    for (const employee of employees) {
        let possibleChildren = availableChildren.filter(child => 
            child.Employee_EmailID !== employee.Employee_EmailID &&
            !lastYearAssignments.some(lastYear => 
                lastYear.Employee_EmailID === employee.Employee_EmailID &&
                lastYear.Secret_Child_EmailID === child.Employee_EmailID
            )
        );

        if (possibleChildren.length === 0) throw new Error('No valid Secret Santa assignment possible');

        const selectedChild = possibleChildren[Math.floor(Math.random() * possibleChildren.length)];
        assignments.push({
            ...employee,
            Secret_Child_Name: selectedChild.Employee_Name,
            Secret_Child_EmailID: selectedChild.Employee_EmailID
        });
        availableChildren.splice(availableChildren.indexOf(selectedChild), 1);
    }

    return assignments;
};