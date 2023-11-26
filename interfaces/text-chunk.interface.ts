import { Chunk } from "./chunk.interface";

export interface TextChunk extends Chunk {
  text: String;
  fontSize: Number;
}
