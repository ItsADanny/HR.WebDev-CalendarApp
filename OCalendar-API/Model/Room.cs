using System.ComponentModel.DataAnnotations;

public class Room
{
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public Location Location {get; set;}
    public bool Active { get; set; }
    public User CreatedByUser { get; set; }
    public User? UpdatedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}