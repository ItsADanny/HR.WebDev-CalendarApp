public class Timeslot
{
    public int Id { get; set; }
    public int RoomID { get; set; }
    public string Name { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public DateOnly Date { get; set; }
    public int CreatedByUserID { get; set; }
    public int? UpdatedByUserID { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}