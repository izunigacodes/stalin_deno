import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";

interface TODOS {
  title: string;
  genre: string;
  correo: string;
  whatsap: string;
}

function Todos() {
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [correo, setCorreo] = useState("");
  const [whatsap, setWhatsap] = useState("");

  const [getTodos, setGetTodos] = useState<TODOS>();
  const AddTodo = async () => {
    try {
      const response = await axiod.post("/api/todos", {
        title: title,
        genre: genre,
        correo: correo,
        whatsap: whatsap,
      });
      /*if (response.status === 201) {
        await fetchTodos();
        setTodo("");
      }*/
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  const fetchTodos = async () => {
    try {
      const response = await axiod.get("/api/todos");
      setGetTodos(response.data);
      console.log("response:..", response);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div class="px-8 mx-auto max-w-screen-md">
        <h1 class="text-3xl font-bold mb-4 text-neutral-950">
          Stalin&Maldaz. Cia.
        </h1>
        <h2 class="font-bold mb-4 text-neutral-950">
          <p>Desarrollamos Aplicaciones Web y Moviles Multiplataforma.</p>
          <p>Migramos ERP C# y Java, a Sistemas Web Multiplataforma.</p>
          <p>Soluciones Empresariales y Personales.</p>
          <p>Con las mejores Tecnologias de vanguardia.</p>
          <p>Sistemas con IA, Machine Learning.</p>
        </h2>
        {/*Imagen de Logos*/}
        <img
          class="my-1"
          src="/Logo1.png"
          width="628"
          height="628"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8 transition-colors">
          {/*Presenta Formulario de Ingreso de Datos*/}
          <h2 class="font-bold mb-4 text-gray-900 dark:text-gray-100">
            {
              /*movieToEdit
          ? "Edit Movie"
          : "Envie su requerimiento o escribanos al Whatsapp 0984708896."*/
            }
          </h2>
          <div class="mb-4">
            <label
              for="title"
              class="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Empresa/Representante
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Razon Social/Representante"
            />
          </div>

          <div class="mb-6">
            <label
              for="genre"
              class="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Requerimiento
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              onInput={(e) => setGenre(e.currentTarget.value)}
              class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Su requerimiento"
            />
          </div>

          <div class="mb-6">
            <label
              for="correo"
              class="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Correo
            </label>
            <input
              type="text"
              id="correo"
              name="correo"
              value={correo}
              onInput={(e) => setCorreo(e.currentTarget.value)}
              class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Su correo electronico."
            />
          </div>

          <div class="mb-6">
            <label
              for="whatsap"
              class="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Whatsapp
            </label>
            <input
              type="text"
              id="whatsap"
              name="correo"
              value={whatsap}
              onInput={(e) => setWhatsap(e.currentTarget.value)}
              class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Su numero Whatsapp."
            />
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              onClick={AddTodo}
              class="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              {/*Presenta Botones Update Enviar*/}
              {/*movieToEdit ? "Update" : "Enviar"*/}
              ENVIAR
            </button>
          </div>
        </div>
        <h2 class="max-w-screen-md mx-auto flex flex-col items-center justify-center mb-4 text-neutral-950">
          <br></br>
          <p>Copyright © 2025 Stalin&Maldaz - Todos los derechos reservados.</p>
          <p>Guayaquil - Ecuador</p>
        </h2>
      </div>
    </>
  );
}

export default Todos;
