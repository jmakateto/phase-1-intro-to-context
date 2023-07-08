// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  