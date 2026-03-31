import { useState } from "react";

export function CreateTodo({ setTodos }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="form-card">
      <input
        type="text"
        placeholder="Enter Title"
        onChange={(e) => {
          const value = e.target.value;
          setTitle(value);
          //   console.log(title);
        }}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Enter Content"
        onChange={(e) => {
          const value = e.target.value;
          setContent(value);
        }}
      />{" "}
      <br />
      <button
        style={{ background: "pink" }}
        onClick={() => {
          fetch("http://localhost:5000/todos", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              content: content,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async function (res) {
            const json = await res.json();
            console.log(json.data);
            console.log(typeof setTodos);
            setTodos((prev) => [...prev, json.data]);
            // alert("Todo Added");
          });
        }}
      >
        Add a Todo
      </button>
    </div>
  );
}
