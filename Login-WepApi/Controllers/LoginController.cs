using Login_WepApi.BusinessLogic;
using Login_WepApi.Models;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Login_WepApi.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private List<User> _userAccessList;
        private static List<User> LoggedInUsers = new List<User>();
       

        [HttpPost]
        public bool ValidateUsers(User user)
        {
            ReadUserXml readxml = new ReadUserXml();
            try
            {
                _userAccessList = readxml.GetUserList();
                var loggedInUser = _userAccessList.Where(x => x.UserName == user.UserName && x.Password == user.Password).Single();
                if (loggedInUser.UserName != null)
                {
                    LoggedInUsers.Add(loggedInUser);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return true;
        }

        [HttpGet]
        public List<User> GetLoggedInUsers()
        {
            if (LoggedInUsers!=null )
            {
                return LoggedInUsers;
            }
            else
            {
                return null;
            }
        }
    }
}
