namespace TodoApi.Dtos;

public class CreateTodoItem
{
    public string Title {get; set;} = string.Empty;

    public string Description {get; set;} = string.Empty;
}