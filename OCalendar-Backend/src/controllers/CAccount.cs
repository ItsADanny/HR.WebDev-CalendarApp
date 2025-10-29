using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

public static class CAccount
{
    public static JObject Register(HttpRequest request)
    {
        try
        {
            List<string> errors = new List<string>();

            string? Username = request.Query["Username"];
            string? Password = request.Query["Password"];
            string? FirstName = request.Query["Firstname"];
            string? LastName = request.Query["Lastname"];
            string? Email = request.Query["Email"];

            // Username checks
            if (Username is not null)
            {
                if (!GeneralMehtods.IsRequiredLength(Username, 2, 24)) errors.Add("Invalid Username, Username must be between 2 and 24 characters");
            } else errors.Add("Username is empty");

            // Password checks
            if (Password is not null)
            {
                if (!GeneralMehtods.IsRequiredLength(Password, 2, 24)) {
                    errors.Add("Invalid Password, Password must be between 2 and 24 characters");
                }
                else {
                    if (!GeneralMehtods.IsValidPassword(Password)) errors.Add("Invalid Password, Password must contain Letters, Numbers and Symbols");
                }
            } else errors.Add("Password is empty");

            // Firstname checks
            if (FirstName is not null)
            {
                if (!GeneralMehtods.IsRequiredLength(FirstName, 2, 24)) errors.Add("Invalid Firstname, Firstname must be between 2 and 24 characters");
            } else errors.Add("Firstname is empty");

            // Lastname checks
            if (LastName is not null)
            {
                if (!GeneralMehtods.IsRequiredLength(LastName, 2, 24)) errors.Add("Invalid Lastname, Lastname must be between 2 and 24 characters");
            } else errors.Add("Lastname is empty");
            
            // Email checks
            if (Email is not null)
            {
                if (!GeneralMehtods.IsValidEmail(Email)) errors.Add("Invalid E-mail");
            } else errors.Add("E-mail is empty");

            if (errors.Count > 0)
            {
                var obj = new JObject();
                obj["errors"] = JArray.FromObject(errors);
                return obj;
            }
            else
            {
                MAccount newUser = new(Username, Password, FirstName, LastName, Email);
                var db = new AccountContext();

                db.Add(newUser);
                db.SaveChangesAsync();

                var obj = new JObject();
                obj["succes"] = true;
                return obj;
            }
        }
        catch (Exception ex)
        {
            var obj = new JObject();
            obj["error"] = ex.Message;
            return obj;
        }
    }
    
    public static JObject Auth()
    {
        return new JObject();
    }
}