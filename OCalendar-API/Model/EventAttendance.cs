using System.ComponentModel.DataAnnotations;

public class EventAttendance
{
    [Key]
    public int Id { get; set; }

    public User User { get; set; }
    public Event Event { get; set; }
    public bool Attending { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}