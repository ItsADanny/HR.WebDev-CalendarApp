using System.ComponentModel.DataAnnotations;

public class Event
{
    [Key]
    public int Id { get; set; }
    
    public string Title { get; set; } = null;
    public string Description { get; set; } = null;
    public RoomBooking? RoomBooking { get; set; }
    public DateTime fromDateTime { get; set; }
    public DateTime untilDateTime { get; set; }
    public User CreatedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}