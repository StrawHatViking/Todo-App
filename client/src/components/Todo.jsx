export function Todos({ todos, markAsDone, deleteTodo }) {
  return (
    <div>
      {todos.map(function (todo) {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <h2>{todo.content}</h2>
            <button onClick={() => markAsDone(todo._id)}>
              {todo.isDone === true ? "Done" : "Mark as Done"}
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
