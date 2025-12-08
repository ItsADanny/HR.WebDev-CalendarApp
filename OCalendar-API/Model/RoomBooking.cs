using System;
using System.ComponentModel.DataAnnotations;

public class RoomBooking
{
    [Key]
    public int Id { get; set; }

    public Room Room { get; set; }
    public Timeslot Timeslot { get; set; }
    public User BookedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}