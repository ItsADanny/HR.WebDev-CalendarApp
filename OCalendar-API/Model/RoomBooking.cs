using System;
using System.ComponentModel.DataAnnotations;

public class RoomBooking
{
    [Key]
    public int Id { get; set; }

    public int RoomID { get; set; }
    public int TimeSlotID { get; set; }
    public int BookedByUserID { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}