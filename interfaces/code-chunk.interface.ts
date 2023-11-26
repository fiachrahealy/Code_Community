import { Chunk } from "./chunk.interface";

export interface CodeChunk extends Chunk {
  code: String;
  language: Number;
}
