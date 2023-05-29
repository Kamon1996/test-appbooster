import { useEffect, useState } from "react";
import { MyButton } from "../../components/common/MyButton/MyButton";
import { entries } from "../../store/entries";
import { observer } from "mobx-react-lite";
import { DiaryEntry } from "../../components/DiaryEntry/DiaryEntry";
import { MyInput } from "../../components/common/MyInput/MyInput";
import { userInfo } from "../../store/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../main";
import { MyText } from "../../components/common/MyText/MyText";
import "./styles.css";

const INIT_ENTRY_STATE = {
  title: "",
  description: "",
};

export const Dairy = observer(() => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (!currentuser) return (userInfo.info.isFetched = false);
      entries.loadEntriesAsync(currentuser.uid);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [newEntryState, setNewEntryState] = useState(INIT_ENTRY_STATE);
  const [search, setSearch] = useState("");

  const onChangeEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntryState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEntryState.title || !newEntryState.description) return;
    entries.createEntry(newEntryState).then(() => {
      entries.loadEntriesAsync().then(() => setNewEntryState(INIT_ENTRY_STATE));
    });
  };

  return (
    <div className="dairy">
      {userInfo.info.isLogged ? (
        <>
          <form onSubmit={createEntry} className="dairy__new-form">
            <MyInput
              required
              placeholder="title"
              name="title"
              value={newEntryState.title}
              onChange={onChangeEntry}
            />
            <MyInput
              required
              name="description"
              placeholder="description"
              value={newEntryState.description}
              onChange={onChangeEntry}
            />
            <MyButton type="submit">Create New Entry</MyButton>
          </form>
          {entries.data.length > 0 && (
            <div className="entries-wrapper">
              <MyInput
                name="search"
                type="search"
                placeholder="search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {entries.data
                .filter(
                  (entry) =>
                    entry.title
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    entry.description
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                )
                .map((entry) => (
                  <DiaryEntry key={entry.id} entry={entry} />
                ))}
            </div>
          )}
        </>
      ) : userInfo.info.isFetched ? (
        <MyText>Loading</MyText>
      ) : (
        <MyText>You need to login</MyText>
      )}
    </div>
  );
});
