import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";
function Todos() {
  const [todo, setTodo] = useState("");

  const AddTodo = async () => {
    try {
      const response = await axiod.post("/", {
        todo: todo,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  const fetchTodos = async () => {
    try {
      const response = await axiod.get("/");
      console.log("response;..", response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div class="mt-10">
        <div class="flex">
          <input
            id="todo"
            name="todo"
          />
        </div>
      </div>
    </>
  );
}
