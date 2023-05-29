import { makeAutoObservable } from "mobx";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  DiaryEntryType,
  NewEntryType,
  NewEntryParams,
  UpdateEntryParams,
  UpdateEntryType,
} from "../types/types";
import { db } from "../main";
import { instanceOfEntry } from "../types/predicates";
import { FirebaseError } from "firebase/app";
import { userInfo } from "./auth";

class Entries {
  data: DiaryEntryType[] = [];
  filter = {
    search: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadEntriesAsync = async (uid = "") => {
    const shouldFilter = this.filter.search.length > 0;
    const q = query(
      collection(db, "entries"),
      where("uid", "==", uid || userInfo.info.uid)
    );
    const docsSnap = await getDocs(q);
    const requestedEntries: DiaryEntryType[] = [];
    docsSnap.forEach((res) => {
      const entry = res.data();
      if (!instanceOfEntry(entry)) return;
      if (!shouldFilter) {
        requestedEntries.push({
          ...entry,
          id: res.id,
        });
      } else if (
        entry.title.includes(this.filter.search) ||
        entry.description.includes(this.filter.search)
      ) {
        requestedEntries.push({
          ...entry,
          id: res.id,
        });
      }
    });
    this.data = requestedEntries;
  };

  createEntry = (newEntryParams: NewEntryParams) => {
    const dateNow = Date.now();
    const newEntry: NewEntryType = {
      ...newEntryParams,
      created_at: dateNow,
      updated_at: dateNow,
      uid: userInfo.info.uid,
    };

    return addDoc(collection(db, "entries"), newEntry)
      .then((res) => res)
      .catch((err: FirebaseError) => err.message);
  };

  deleteEntry = (id: string) => {
    const docRef = doc(db, "entries", id);
    return deleteDoc(docRef)
      .then((res) => res)
      .catch((err: FirebaseError) => err.message);
  };

  updateEntry = ({ id, ...params }: UpdateEntryParams) => {
    const docRef = doc(db, "entries", id);
    const dateNow = Date.now();
    const updatedEntry: UpdateEntryType = {
      ...params,
      updated_at: dateNow,
    };
    return updateDoc(docRef, updatedEntry)
      .then((res) => res)
      .catch((err: FirebaseError) => err.message);
  };
}

export const entries = new Entries();
