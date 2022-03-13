using System.Xml.Linq;

namespace Classes
{
    class Functions
    {
        public Functions(){}

        public Debtor CreateDebtor(String filePath)
        {
            XElement xelement = XElement.Load(filePath);
            Debtor currentDebtor = new Debtor();

            foreach (XElement element in xelement.Descendants("field"))
            {
                try
                {
                    if ((string)element.Attribute("Name") == "Debtor")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Name = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor SSN")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SSN = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor Address 1")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Address1 = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor Address 2")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Address2 = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor Address 3")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Address3 = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor County")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.County = value;
                    }
                    if ((string)element.Attribute("Name") == "DebtorEMail")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Email = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor Date of Birth")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.DOB = value;
                    }
                    if ((string)element.Attribute("Name") == "DebtorCellPhone")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.CellPhone = value;
                    }
                    if ((string)element.Attribute("Name") == "Spouse")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Spouse = value;
                    }
                    if ((string)element.Attribute("Name") == "Spouse SSN")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SpouseSSN = value;
                    }
                    if ((string)element.Attribute("Name") == "Spouse Address 1")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SpouseAddress1 = value;
                    }
                    if ((string)element.Attribute("Name") == "Spouse Address 2")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SpouseAddress2 = value;
                    }
                    if ((string)element.Attribute("Name") == "Debtor County")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.DebtorCounty = value;
                    }
                    if ((string)element.Attribute("Name") == "SpouseEMail")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SpouseEmail = value;
                    }
                    if ((string)element.Attribute("Name") == "Spouse Date of Birth")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SpouseDOB = value;
                    }
                    if ((string)element.Attribute("Name") == "SpouseCellPhone")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.SpouseCellPhone = value;
                    }
                    if ((string)element.Attribute("Name") == "Chapter")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.Chapter = value;
                    }
                    if ((string)element.Attribute("Name") == "Type of Debtor")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.DebtorType = value;
                    }
                    if ((string)element.Attribute("Name") == "Attorney Bar Id")
                    {
                        string value = (string)element.Attribute("Value");
                        currentDebtor.AttorneyBarId = value;
                    }
                    if ((string)element.Attribute("Name") == "IsActive")
                    {
                        string value = (string)element.Attribute("Value");
                        if (value == "true")
                        {
                            currentDebtor.IsActive = true;
                        }
                        else
                        {
                            currentDebtor.IsActive = false;
                        }
                    }
                }
                catch (NullReferenceException e)
                {
                    Console.WriteLine(e);
                }
            }

            return currentDebtor;
        }

        public void printAllDebtorInfo(Debtor debtor)
        {
            Console.WriteLine(debtor.Name);
            Console.WriteLine(debtor.SSN);
            Console.WriteLine(debtor.Address1);
            Console.WriteLine(debtor.Address2);
            Console.WriteLine(debtor.Address3);
            Console.WriteLine(debtor.County);
            Console.WriteLine(debtor.Email);
            Console.WriteLine(debtor.DOB);
            Console.WriteLine(debtor.CellPhone);
            Console.WriteLine(debtor.Spouse);
            Console.WriteLine(debtor.SpouseSSN);
            Console.WriteLine(debtor.SpouseAddress1);
            Console.WriteLine(debtor.SpouseAddress2);
            Console.WriteLine(debtor.SpouseAddress3);
            Console.WriteLine(debtor.DebtorCounty);
            Console.WriteLine(debtor.SpouseEmail);
            Console.WriteLine(debtor.SpouseDOB);
            Console.WriteLine(debtor.SpouseCellPhone);
            Console.WriteLine(debtor.Chapter);
            Console.WriteLine(debtor.DebtorType);
            Console.WriteLine(debtor.AttorneyBarId);
            Console.WriteLine(debtor.IsActive);
        }
    }
}