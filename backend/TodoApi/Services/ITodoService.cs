using TodoApi.Dtos;
using TodoApi.Models;

namespace TodoApi.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();
    TodoItem Create(CreateTodoItem request);
    bool Delete(Guid id);
    TodoItem? Toggle(Guid id);
}