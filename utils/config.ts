import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { MONGODB_URL } = config();
const { MONGO_DATABASE } = config();

export { MONGODB_URL };
export { MONGO_DATABASE };
