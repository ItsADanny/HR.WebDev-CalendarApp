public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int RoleID { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime UpdateDateTime { get; set; }

    public override string ToString()
    {
        return $"Id: {Id}" +
               $"Email: {Email}" +
               $"Password: {Password}" +
               $"FirstName: {FirstName}" +
               $"LastName: {LastName}" +
               $"Role: {RoleID}" +
               $"CreateDateTime: {CreateDateTime}" +
               $"UpdateDateTime: {UpdateDateTime}";
    }
}