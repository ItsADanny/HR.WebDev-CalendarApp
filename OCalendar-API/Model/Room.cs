using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Room
{
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public int? LocationId { get; set; }
    [JsonIgnore]
    public Location Location {get; set;}
    public bool Active { get; set; }
    public int? CreatedByUserId { get; set; }
    [JsonIgnore]
    public User CreatedByUser { get; set; }
    public int? UpdatedByUserId { get; set; }
    [JsonIgnore]
    public User? UpdatedByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}