import { customAlphabet } from "nanoid";

export function randomId(length = 21) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}
