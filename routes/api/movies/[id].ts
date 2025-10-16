import { Handlers } from "$fresh/server.ts";
import { readMovies, writeMovies } from "../../../database.ts";

export const handler: Handlers = {
  async PUT(req, ctx) {
    const { id } = ctx.params;
    const { title, genre, correo, whatsap } = await req.json();
     console.log(title, genre, correo, whatsap);
    const movies = await readMovies();
    const index = movies.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return new Response(
        JSON.stringify({ error: "SIN DATOS" }),
        { status: 404 },
      );
    }

    movies[index] = { ...movies[index], title, genre, correo, whatsap };
    await writeMovies(movies);

    return new Response(
      JSON.stringify({ message: "Actualizacion satisfactoria." }),
      { status: 200 },
    );
  },

  async DELETE(_req, ctx) {
    const { id } = ctx.params; 
    let movies = await readMovies();
    const initialLength = movies.length;
    movies = movies.filter((movie) => movie.id !== id);

    if (movies.length === initialLength) {
      return new Response(
        JSON.stringify({ error: "Datos a Eliminar no encontrados." }),
        { status: 404 },
      );
    }
    await writeMovies(movies);
    return new Response(
      JSON.stringify({ message: "Eliminacion satisfactoria." }),
      { status: 200 },
    );
  },
};
