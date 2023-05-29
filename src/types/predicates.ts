import { DiaryEntryType } from "./types";

export const instanceOfEntry = function (
  object: any
): object is DiaryEntryType {
  return (
    "title" in object &&
    "description" in object &&
    "created_at" in object &&
    "updated_at" in object
  );
};
