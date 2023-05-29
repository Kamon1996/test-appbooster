export type DiaryEntryType = {
  id: string;
  title: string;
  description: string;
  created_at: number;
  updated_at: number;
  uid: string;
};

export type NewEntryType = Omit<DiaryEntryType, "id">;
export type NewEntryParams = Pick<DiaryEntryType, "title" | "description">;

export type UpdateEntryParams = Pick<DiaryEntryType, "id"> & {
  title?: string;
  description?: string;
};
export type UpdateEntryType = Pick<DiaryEntryType, "updated_at"> & {
  title?: string;
  description?: string;
};

export type UserInfo = {
  email: string | null;
  uid: string;
  isLogged: boolean;
  isFetched: boolean;
};

export type AuthFormState = "sign-in" | "sign-up";
