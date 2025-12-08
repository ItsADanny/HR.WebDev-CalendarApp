using System.ComponentModel.DataAnnotations;

public class Room
{
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public int LocationId {get; set;}
    public bool Active { get; set; }
    public int CreatedByUserID { get; set; }
    public int? UpdatedByUserID { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}