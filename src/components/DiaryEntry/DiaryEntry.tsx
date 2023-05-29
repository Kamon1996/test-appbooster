import React, { useState } from "react";
import { DiaryEntryType } from "../../types/types";
import { MyButton } from "../common/MyButton/MyButton";
import { entries } from "../../store/entries";
import { MyInput } from "../common/MyInput/MyInput";
import { observer } from "mobx-react-lite";
import { MyText } from "../common/MyText/MyText";
import "./styles.css";

interface IEntryProps {
  entry: DiaryEntryType;
}

export const DiaryEntry = observer(({ entry }: IEntryProps) => {
  const [entryState, setEntryState] = useState({ ...entry });
  const [editModeDisabled, setEditModeStatus] = useState<boolean>(true);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEntryState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleEditMode = () => setEditModeStatus((prev) => !prev);

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    entries.deleteEntry(entry.id).then(() => {
      entries.loadEntriesAsync();
    });
  };

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!entryState.title || !entryState.description) return;
    const updatedEntry = {
      id: entry.id,
      title: entryState.title,
      description: entryState.description,
    };
    entries.updateEntry(updatedEntry).then(() => {
      toggleEditMode();
      entries.loadEntriesAsync();
    });
  };

  const onCancel = () => {
    toggleEditMode();
    setEntryState({ ...entry });
  };

  return (
    <form onSubmit={onUpdate} className="entry-item">
      <MyInput
        required
        name="title"
        disabled={editModeDisabled}
        value={entryState.title}
        onChange={onChange}
        className="entry-item__title"
      />
      <textarea
        className={`text-area ${
          editModeDisabled ? "entry-item--disabled" : ""
        }`}
        required
        name="description"
        disabled={editModeDisabled}
        value={entryState.description}
        onChange={onChange}
      ></textarea>
      {editModeDisabled ? (
        <MyButton onClick={toggleEditMode}>Edit Entry</MyButton>
      ) : (
        <>
          <MyButton type="submit">Update Entry</MyButton>
          <MyButton onClick={onCancel}>Cancel</MyButton>
        </>
      )}
      <MyButton onClick={onDelete}>Delete Entry</MyButton>
      <MyText order="h5" className="entry-date">{`Created at ${new Date(
        entry.created_at
      ).toLocaleString()}`}</MyText>
      <MyText order="h5" className="entry-date">
        {`Updated at ${new Date(entry.updated_at).toLocaleString()}`}
      </MyText>
    </form>
  );
});
