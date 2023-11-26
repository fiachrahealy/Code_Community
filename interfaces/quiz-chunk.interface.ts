import { Chunk } from "./chunk.interface";

export interface QuizChunk extends Chunk {
  question: String;
  answers: String[];
  correctAnswer: String;
}
