import { Head } from "$fresh/runtime.ts";
import MovieList from "../islands/MovieList.tsx";
import { Handlers, PageProps, STATUS_CODE } from "$fresh/server.ts";
import { Movie } from "../database.ts";
import { db } from "../utils/dbConnections.ts";

const TodosCollection = db.collection("mi");

interface Data {
  movies: Movie[];
}

export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      const { todo } = await req.json();
      await TodosCollection.insertOne({ todo: todo });
      return new Response(null, {
        status: STATUS_CODE.Created,
      });
    } catch (error) {
    }
  },
};
/*export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const resp = await fetch(`http://localhost:8000/api/movies`);
    if (!resp.ok) {
      return new Response("Error al consultar registro.", { status: 500 });
    }
    const movies: Movie[] = await resp.json();
    return ctx.render({ movies });
  },
};
*/

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>
          Stalin&Maldaz. Cia. Desarrollamos Aplicaciones Multiplataformas Web y
          Moviles. Migramos ERP C# y Java a Sistemas Web Multiplataformas.
        </title>
        <meta name="description" content="Stalin&Maldaz" />
      </Head>

      {/*Division verde con Limon e imagen superior*/}
      <div class="px-8 py-4 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-1"
            src="/logo.svg"
            width="68"
            height="68"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <MovieList initialMovies={data.movies} />
          {/*<script src="clientes.tsx"></script>*/}
        </div>
      </div>
    </>
  );
}
