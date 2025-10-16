import { useEffect, useState } from "preact/hooks";
import { Movie } from "../database.ts";
import { JSX } from "preact";


type Error = {
 error: boolean;
 message: string;
}

interface Props {
  movieToEdit?: Movie | null;
  setEditingMovie?: (movie: Movie | null) => void;
  onSave: () => void;
}

export default function MovieForm(
  { movieToEdit, setEditingMovie, onSave }: Props,
) {


  // ====== CONFIG ======
  const ADMIN_KEY = "3047"; // cámbiala si quieres

  // ====== FORM ESTADO ======
  //const [error, setError] = useState<Error>({ error: false, message: "" });
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [correo, setCorreo] = useState("");
  const [whatsap, setWhatsap] = useState("");

  // ====== ADMIN ESTADO ======
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<unknown>(null);

  {/*const [error, setError] = useState<Error>({
   error: false,
   message: "",
  });*/}

{/*const checkAge = (value: number) => {
 if(value === 3047){
   setError({
     error: false,
     message:""
});
} else {setError({ 
    error:true,
    message:""
});
}
};*/}

  useEffect(() => {
    if (movieToEdit) {
      setTitle(movieToEdit.title);
      setGenre(movieToEdit.genre);
      setCorreo(movieToEdit.correo);
      setWhatsap(movieToEdit.whatsap);
    } else {
      setTitle("");
      setGenre("");
      setCorreo("");
      setWhatsap("");
    }
  }, [movieToEdit]);

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (!title || !genre || !correo || !whatsap) {
      alert("Los Datos son requeridos.");
      return;
    }

    const method = movieToEdit ? "PUT" : "POST";
    const url = movieToEdit ? `/api/movies/${movieToEdit.id}` : "/api/movies";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, genre, correo, whatsap }),
    });

    if (response.ok) {
      if (setEditingMovie) {
        setEditingMovie(null);
      }
      onSave();
      setTitle("");
      setGenre("");
      setCorreo("");
      setWhatsap("");
    } else {
      alert("Error al querer grabar.");
    }
  };


  // ====== ADMIN HANDLERS ======
  const handleToggleAdmin = () => {
    setAdminOpen((v) => !v);
    // limpia al abrir/cerrar
    setAdminError(null);
    setAdminData(null);
  };

  const handleAdminAccess = async () => {
    if (adminKey.trim() !== ADMIN_KEY) {
      setAdminError("Clave incorrecta.");
      setAdminData(null);
      return;
    }
    setAdminError(null);
    // Trae todo lo que tenga el db.json (a través de /api/movies)
    const resp = await fetch("/api/movies");
    if (!resp.ok) {
      setAdminError("No se pudo leer la base (API).");
      setAdminData(null);
      return;
    }
    const data = await resp.json();
    setAdminData(data);
  };

  const handleAdminClose = () => {
    setAdminOpen(false);
    setAdminKey("");
    setAdminError(null);
    setAdminData(null);
  };


  return (
    <form
      onSubmit={handleSubmit}
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8 transition-colors"
    > {/*Presenta Formulario de Ingreso de Datos*/}
      <h2 class="font-bold mb-4 text-gray-900 dark:text-gray-100">
        {movieToEdit ? "Edit Movie" : "Envie su requerimiento o escribanos al Whatsapp 0984708896."}
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
          value={title}
          onInput={(e) => setTitle(e.currentTarget.value)}
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
          value={whatsap}
          onInput={(e) => setWhatsap(e.currentTarget.value)}
          class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="Su numero Whatsapp."
        />
      </div>
      
      <div class="flex flex-wrap gap-2">
        <button
          type="submit"
          class="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
        >
          {/*Presenta Botones Update Enviar*/}
          {movieToEdit ? "Update" : "Enviar"}
        </button>

        {movieToEdit && (
          <button
            type="button"
            onClick={() => setEditingMovie && setEditingMovie (null)}
            class="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}
         {/*Boton Admin. Para presentar la ventana de Clientes*/}
          <button
            //disabled={error.error}
            type="button"
            //onClick={() => globalThis.open("clientes.tsx", "_self")}
            onClick={handleToggleAdmin}
            class="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Admin
          </button>
      </div>

{/* PANEL ADMIN (desplegable) */}
      {adminOpen && (
        <div class="mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div class="flex items-end gap-2">
            <div class="flex-1">
              <label
                for="adminKey"
                class="block text-gray-700 dark:text-gray-300 mb-2"
              >
              </label>
              <input
                id="adminKey"
                type="password"
                value={adminKey}
                onInput={(e) => setAdminKey(e.currentTarget.value)}
                class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder=""
              />
            </div>

            <button
              type="button"
              onClick={handleAdminAccess}
              class="h-10 px-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              next
            </button>

            <button
              type="button"
              onClick={handleAdminClose}
              class="h-10 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              cerrar
            </button>
          </div>

          {adminError && (
            <p class="text-red-600 mt-2">{adminError}</p>
          )}

          {adminData && (
            <details open class="mt-4">
              <summary class="cursor-pointer font-semibold">
                Contenido de <code>db.json</code> (vía /api/movies)
              </summary>
              <pre class="mt-2 max-h-80 overflow-auto text-sm">
{JSON.stringify(adminData, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      <br></br>
      {/*<div class="mb-4">
           <input 
            type="number"
            id="age"
            name="age"
            onBlur={(e) => checkAge(Number(e.currentTarget.value))}
            class="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder=" "
            autofocus
          />
      </div>
        {error.error && <div class="span-2 error">{error.message}</div>}*/}
    </form>
  );
}
