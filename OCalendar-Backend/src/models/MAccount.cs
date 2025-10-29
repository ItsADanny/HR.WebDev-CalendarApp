using Microsoft.AspNetCore.Identity;

public class MAccount
{
    public int ID { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? CreateDateTime { get; set; }
    public string? UpdateDateTime { get; set; }

    //Private variables
    private string _password { get; set; }

    public MAccount(string username, string password, string firstname, string lastname, string email)
    {
        Username = username;
        FirstName = firstname;
        LastName = lastname;
        Email = email;
        _password = password;
    }
}