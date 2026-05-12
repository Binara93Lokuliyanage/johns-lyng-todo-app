using TodoApi.Dtos;
using TodoApi.Models;

namespace TodoApi.Services;

public class TodoService : ITodoService
{
    private readonly List<TodoItem> _todos = new();
    public IEnumerable<TodoItem> GetAll()
    {
        return _todos.OrderByDescending(todo => todo.CreatedAt);
    }
    public TodoItem Create(CreateTodoItem request)
    {
        var todo = new TodoItem
        {
            title = request.Title.Trim(),
            description = request.Description.Trim()
        };

        _todos.Add(todo);
        return todo;
    }

    public bool Delete(Guid id)
    {
        var todo = _todos.FirstOrDefault(item => item.id == id);
        if (todo is null)
        {
            return false;
        }
        _todos.Remove(todo);
        return true;

    }

    public TodoItem? Toggle(Guid id)
    {
        var todo = _todos.FirstOrDefault(item => item.id == id);
            
            if (todo is null)
            {
                return null;
            }

            todo.IsDone = !todo.IsDone;
            return todo;
        
    }

}