namespace TodoApi.Dtos;

public class UpdateTodoRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}