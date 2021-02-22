using Login_WepApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Login_WepApi.BusinessLogic
{
    public class PopulatePersonData
    {
        public static List<Person> PersonList()
        {
            List<Person> people = new List<Person>()
            {
                new Person(){ Id=1,Name="Will",ContactDetails=12345, IsDisable=false },
                new Person(){ Id=2,Name="Smith",ContactDetails=4567, IsDisable=true },
                new Person(){ Id=3,Name="John",ContactDetails=121234345, IsDisable=false },
                new Person(){ Id=4,Name="Rachel",ContactDetails=767890, IsDisable=false },
                new Person(){ Id=5,Name="Lara",ContactDetails=321, IsDisable=false },
                new Person(){ Id=6,Name="Cathy",ContactDetails=1234, IsDisable=true },
            };
            return people;
        }
    }
}