import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";

interface TODOS {
  todo: string;
}

function Todos() {
  /* const [todo, setTodo] = useState("");
  const [getTodos, setGetTodos] = useState<TODOS>();

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
      setGetTodos(response.data);
      //console.log("response;..", response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  */
  const [todo, setTodo] = useState("");
  const AddTodo = async () => {
    try {
      const response = await axiod.post("/api/todos", {
        todo: todo,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <div class="mt-10 w-full">
        <div class="flex items-center gap-4">
          <input
            id="todo"
            name="todo"
            type="text"
            placeholder="Ingrese..."
            class="text-black ring-gray-300 placeholder:text-gray-400"
            onChange={(e: any) => setTodo(e.target.value)}
            value={todo}
          />
          <button
            onClick={AddTodo}
            class="px-4 rounded-lg bg-lime-600 text-white"
          >
            Añadir
          </button>
        </div>
      </div>
      <div class="mt-10">
        <div class="mb-5 h-12">
          <p>Todo aqui</p>
          <div class="flex">
            <button class="px-3 flex h-full justify-center items-center">
              Añadir
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todos;
