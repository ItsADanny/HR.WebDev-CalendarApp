using System.ComponentModel.DataAnnotations;

public class EventComment
{
    [Key]
    public int Id { get; set; }
    public Event Event { get; set; }
    public User User { get; set; }
    public string Comment { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}