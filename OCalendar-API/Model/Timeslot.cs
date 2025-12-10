using System.Text.Json.Serialization;

public class Timeslot
{
    public int Id { get; set; }
    public Room Room { get; set; }
    public string Name { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public DateOnly Date { get; set; }
    public int? CreatedByUserId { get; set; }
    [JsonIgnore]
    public User CreatedByUser { get; set; }
    public int? UpdatedByUserId { get; set; }
    [JsonIgnore]
    public User? UpdatedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}