using System.ComponentModel.DataAnnotations;

public class Role
{
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public int AllowedManageRooms { get; set; } = 0;
    public int AllowedManageTimeslots { get; set; } = 0;
    public int AllowedManageUsers { get; set; } = 0;
    public int AllowedManageEvents { get; set; } = 0;
    public int? CreateByUserId { get; set; }
    public User? CreateByUser { get; set; }
    public int? UpdateByUserId { get; set; }
    public User? UpdateByUser { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? UpdateDateTime { get; set; }
}