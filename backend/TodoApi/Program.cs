using TodoApi.Dtos;
using TodoApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ITodoService, TodoService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AngularClient");

app.MapGet("/api/todos", (ITodoService todoService) =>
{
    return Results.Ok(todoService.GetAll());
});

app.MapGet("/api/todos/{id:guid}", (Guid id, ITodoService todoService) =>
{
    var todo = todoService.GetById(id);

    return todo is null
        ? Results.NotFound(new { message = "Todo item not found." })
        : Results.Ok(todo);
});

app.MapPost("/api/todos", (CreateTodoItem request, ITodoService todoService) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.BadRequest(new
        {
            message = "Todo title is required."
        });
    }

    if (string.IsNullOrWhiteSpace(request.Description))
    {
        return Results.BadRequest(new
        {
            message = "Todo Description is required."
        });
    }

    var todo = todoService.Create(request);
    return Results.Created($"/api/todos/{todo.id}", todo);
});

app.MapPut("/api/todos/{id:guid}", (Guid id, UpdateTodoRequest request, ITodoService todoService) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.BadRequest(new
        {
            message = "Todo title is required."
        });
    }

    var updatedTodo = todoService.Update(id, request);

    return updatedTodo is null
        ? Results.NotFound(new { message = "Todo item not found." })
        : Results.Ok(updatedTodo);
});

app.MapDelete("/api/todos/{id:guid}", (Guid id, ITodoService todoService) =>
{
    var deleted = todoService.Delete(id);

    return deleted
        ? Results.NoContent()
        : Results.NotFound(new { message = "Todo item not found." });
});

app.MapPut("/api/todos/{id:guid}/toggle", (Guid id, ITodoService todoService) =>
{
    var updatedTodo = todoService.Toggle(id);

    return updatedTodo is null
        ? Results.NotFound(new { message = "Todo item not found." })
        : Results.Ok(updatedTodo);
});

app.Run();