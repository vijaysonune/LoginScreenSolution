using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Login_WepApi.Models
{
    public class Person
    {
        

            public int Id { get; set; }
            public string Name { get; set; }
            public int ContactDetails { get; set; }
            public bool? IsDisable { get; set; }

        
    }
}