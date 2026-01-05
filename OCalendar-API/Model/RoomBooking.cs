using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class RoomBooking
{
    [Key]
    public int Id { get; set; }

    public int? RoomId { get; set; }
    // [JsonIgnore]
    public Room Room { get; set; }
    public int? TimeslotId { get; set; }
    // [JsonIgnore]
    public Timeslot Timeslot { get; set; }
    public int? BookedByUserId { get; set; }
    [JsonIgnore]
    public User BookedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}