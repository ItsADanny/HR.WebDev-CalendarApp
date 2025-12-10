public class Salt
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public User User { get; set; }
    public string SaltString { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}