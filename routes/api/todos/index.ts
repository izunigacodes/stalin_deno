import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { db } from "../../../utils/dbConnections.ts";

const TodosCollection = db.collection("empleados");

export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      const { todo } = await req.json();
      await TodosCollection.insertOne({ todo: todo });
      //console.log("todo: ", todo);

      return new Response(null, {
        status: STATUS_CODE.Created,
      });
    } catch (error) {
      console.log("sucedio un error");
      return new Response(error);
    }
  },
};
