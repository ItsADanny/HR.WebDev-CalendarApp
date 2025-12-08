using System.ComponentModel.DataAnnotations;

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
    public User CreatedByUser { get; set; }
    public User? UpdatedByUser { get; set; }
    public DateTime CreateDateTime {get; set;}
    public DateTime? UpdateDateTime {get; set;}
}