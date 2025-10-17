import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { db } from "../../../utils/dbConnections.ts";

const TodosCollection = db.collection("clientes");

export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      //const { todo } = await req.json();
      const { title, genre, correo, whatsap } = await req.json();

      await TodosCollection.insertOne({
        title: title,
        genre: genre,
        correo: correo,
        whatsap: whatsap,
      });
      //console.log("title: ", title);

      return new Response(null, {
        status: STATUS_CODE.Created,
      });
    } catch (error) {
      console.log("sucedio un error");
      return new Response(error);
    }
  },
  async GET(req, ctx) {
    try {
      const todos = await TodosCollection.find().toArray();

      return new Response(JSON.stringify(todos), {
        status: STATUS_CODE.OK,
        statusText: "Retornar todos correctamente",
      });
    } catch (error) {
      console.log("sucedio un error");
      return new Response(error);
    }
  },
};
