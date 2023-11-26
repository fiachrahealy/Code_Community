import { Chunk } from "interfaces/chunk.interface";
import { LessonEditRecord } from "./lesson-edit-record.interface";

export interface LessonChunkRemovedRecord extends LessonEditRecord {
  chunkRemoved: Chunk;
}
