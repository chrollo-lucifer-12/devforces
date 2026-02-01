import { toNextJsHandler } from "@repo/auth/handler";
import { auth } from "../../../../lib/auth";

export const { POST, GET } = toNextJsHandler(auth);
