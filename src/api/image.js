import { handler } from "./class-http-client";

export async function uploadImage(file) {
  return await handler.uploadImage(file);
}
