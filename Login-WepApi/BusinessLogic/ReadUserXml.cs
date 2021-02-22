using Login_WepApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;

namespace Login_WepApi.BusinessLogic
{
    public class ReadUserXml
    {
        
        public List<User> GetUserList()
        {
            string filePath = ConfigurationManager.AppSettings["filePath"].ToString();
            List<User> xmlDataList = null;
            FileStream fileStream = null;
            
            try
            {
                XmlDocument xmldoc = new XmlDocument();
                XmlNodeList xmlnode;
                fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                xmldoc.Load(fileStream);
                xmlnode = xmldoc.GetElementsByTagName("user");
                xmlDataList = new List<User>();
                User xmlObj = null;

                for (int i = 0; i <= xmlnode.Count - 1; i++)
                {
                    xmlObj = new User();
                    xmlnode[i].ChildNodes.Item(0).InnerText.Trim();
                    xmlObj.UserName = xmlnode[i].ChildNodes.Item(0).InnerText.Trim();
                    xmlObj.Password = xmlnode[i].ChildNodes.Item(1).InnerText.Trim();
                    xmlObj.Email = xmlnode[i].ChildNodes.Item(2).InnerText.Trim();
                    xmlDataList.Add(xmlObj);

                    xmlObj = null;

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                fileStream.Dispose();
                xmlDataList.Clear();
            }
            finally
            {
                fileStream.Dispose();
            }
            return xmlDataList;
        }
    }
}