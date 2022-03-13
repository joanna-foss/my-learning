using Classes;

Functions fn = new Functions();

Debtor myDebtor = fn.CreateDebtor("test.xml");

fn.printAllDebtorInfo(myDebtor);