using System.Text.Json.Serialization;

public class UserSession
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
    public string Token { get; set; }
    public DateTime CreateDateTime { get; set; }
}