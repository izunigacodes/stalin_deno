import { useState } from "preact/hooks";
import { Movie } from "../database.ts";
import MovieForm from "./MovieForm.tsx";

interface Props {
  initialMovies: Movie[];
}
export default function MovieList({ initialMovies }: Props) {
  // deno-lint-ignore no-unused-vars
  const [movies, setMovies] = useState(initialMovies);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);



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
      <MovieForm
        movieToEdit={editingMovie}
        setEditingMovie={setEditingMovie}
        onSave={updateMovieList}
      />
      
      <h2 class="max-w-screen-md mx-auto flex flex-col items-center justify-center mb-4 text-neutral-950">
      <br></br>
      <p>Copyright © 2025 Stalin&Maldaz - Todos los derechos reservados.</p>
      <p>Guayaquil - Ecuador</p>
      </h2>
      
    </div>
  );
}
