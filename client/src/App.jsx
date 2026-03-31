import React, { useEffect } from "react";
import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import "./App.css";
import { Todos } from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todos").then(async function (res) {
      const json = await res.json();
      setTodos(json.data);
      console.log(json.data);
    });
  }, []);

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });

    setTodos((e) => {
      return e.filter((todo) => todo._id !== id);
    });
  };

  const markAsDone = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isDone: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((e) => {
      return e.map((todo) => {
        if (todo._id === id) {
          return { ...todo, isDone: true };
        }
        return todo;
      });
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e1e7ed",
        display: "flex",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos} markAsDone={markAsDone} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
