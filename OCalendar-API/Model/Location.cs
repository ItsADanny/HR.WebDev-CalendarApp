using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Location
{
    [Key]
    public int Id {get; set;}
    public string Name {get; set;}
    public int HouseNumber {get; set;}
    public string HouseNumberAdditive {get; set;}
    public string Street {get; set;}
    public string City {get; set;}
    public double Lon {get; set;}
    public double Lat {get; set;}
    public int? CreatedByUserId { get; set; }
    [JsonIgnore]
    public User CreatedByUser { get; set; }
    public int? UpdatedByUserId { get; set; }
    [JsonIgnore]
    public User? UpdatedByUser { get; set; }
    public DateTime CreateDateTime {get; set;}
    public DateTime? UpdateDateTime {get; set;}
}