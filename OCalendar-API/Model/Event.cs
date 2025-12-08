using System.ComponentModel.DataAnnotations;

public class Event
{
    [Key]
    public int Id { get; set; }
    
    public string Title { get; set; } = null;
    public string Description { get; set; } = null;
    public int? RoomBookingID { get; set; }
    public DateTime fromDateTime { get; set; }
    public DateTime untilDateTime { get; set; }
    public int CreatedByUserID { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}