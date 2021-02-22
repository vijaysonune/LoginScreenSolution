using Login_WepApi.BusinessLogic;
using Login_WepApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Login_WepApi.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PersonController : ApiController
    {
        static List<Person> _personList;
        static PersonController()
        {
            _personList = PopulatePersonData.PersonList();
        }



        // Passing person list to UI
        //   [HttpGet, Route("api/Person/Index")]
        [HttpGet]
        public List<Person> Get()
        {
            return _personList;
        }

        //Updating person details in db

        [HttpPost]
        public bool UpdatePersonalData(Person person)
        {
            if (person.Id == 0)
            {
                return false;
            }
            else
            {
                var customerInDB = _personList.Where(x => x.Id == person.Id).SingleOrDefault();
                customerInDB.Name = person.Name;
                customerInDB.IsDisable = person.IsDisable;
                customerInDB.ContactDetails = person.ContactDetails;
                return true;
            }
        }
    }
}
