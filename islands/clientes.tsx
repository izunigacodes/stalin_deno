import { useState } from "preact/hooks";
import { Movie } from "../database.ts";
import MovieForm from "./MovieForm.tsx";
// deno-lint-ignore no-unused-vars
import { useEffect} from "preact/hooks";
// deno-lint-ignore no-unused-vars
import { JSX } from "preact";

interface Props {
  initialMovies: Movie[];
  movieToEdit?: Movie | null;
  setEditingMovie?: (movie: Movie | null) => void;
  onSave: () => void;
}

export default function MovieList({ initialMovies }: Props) {
  const [movies, setMovies] = useState(initialMovies);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estas seguro de Eliminar?")) {
      const response = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMovies(movies.filter((movie) => movie.id !== id));
      } else {
        alert("Error al querer eliminar.");
      }
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
  };

  const updateMovieList = async () => {
    const resp = await fetch(`/api/movies`);
    const newMovies = await resp.json();
    setMovies(newMovies);
  };

  return (
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
     <h2 class="max-w-screen-md mx-auto flex flex-col items-center justify-center mb-4 text-neutral-950">
      <br></br>
      <p>Copyright © 2025 Stalin&Maldaz - Todos los derechos reservados.</p>
      <p>Guayaquil - Ecuador</p>
      </h2>
      <MovieForm
              movieToEdit={editingMovie}
              setEditingMovie={setEditingMovie}
              onSave={updateMovieList}
      />
      {/*Bloque Edit Delete*/}
      {movies.length > 0
        ? (
          <ul class="space-y-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex justify-between items-center transition-colors"
              >
                <div>
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {movie.title}
                  </h2>
                  <p class="text-gray-600 dark:text-gray-400">
                    Requerimiento: {movie.genre}
                  </p>
                    <p class="text-gray-600 dark:text-gray-400">
                    Correo: {movie.correo}
                  </p>
                    <p class="text-gray-600 dark:text-gray-400">
                    Whatsap: {movie.whatsap}
                  </p>
                </div>
                
                <div class="space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(movie)}
                    class="bg-slate-400 hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
                  >
                   Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(movie.id)}
                    class="bg-pink-400 hover:bg-pink-500 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
        : (
          <p class="text-gray-600 dark:text-gray-400 text-center py-8">
            There are no movies to show.
          </p>
        )} {/*FIN bloque Edit Delete */}
    </div>
  );
}