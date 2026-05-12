namespace TodoApi.Models;

public class TodoItem
{
    public Guid id {get; set;} = Guid.NewGuid();
    public string title {get; set;} = string.Empty;
    public string description {get; set;} = string.Empty;
    public bool IsDone {get; set;} = false;
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;

}