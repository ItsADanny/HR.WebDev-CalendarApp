using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Event
{
    [Key]
    public int Id { get; set; }
    
    public string Title { get; set; } = null;
    public string Description { get; set; } = null;
    public int? RoomBookingId { get; set; }
    [JsonIgnore]
    public RoomBooking? RoomBooking { get; set; }
    public DateTime fromDateTime { get; set; }
    public DateTime untilDateTime { get; set; }
    public int? CreatedByUserId { get; set; }
    [JsonIgnore]
    public User CreatedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}