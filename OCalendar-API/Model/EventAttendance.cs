using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class EventAttendance
{
    [Key]
    public int Id { get; set; }
    public int? UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
    public int? EventId { get; set; }
    [JsonIgnore]
    public Event Event { get; set; }
    public bool Attending { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}