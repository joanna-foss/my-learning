using Classes;

//implement functions
Functions fn = new Functions();

//create debtor object from xml file
Debtor myDebtor = fn.CreateDebtor("test.xml");

//console writeline all fields of the debtor
fn.printAllDebtorInfo(myDebtor);