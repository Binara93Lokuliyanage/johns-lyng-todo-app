using TodoApi.Dtos;
using TodoApi.Models;

namespace TodoApi.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();
    TodoItem? GetById(Guid id);
    TodoItem Create(CreateTodoItem request);
    TodoItem? Update(Guid id, UpdateTodoRequest request);
    bool Delete(Guid id);
    TodoItem? Toggle(Guid id);
}