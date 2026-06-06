import { useState, useEffect, useCallback } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';
import { generateId } from '../utils/formatters';

export function useNotes() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [isLoaded] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      saveNotes(notes);
    }
  }, [notes, isLoaded]);

  const addNote = useCallback((noteData) => {
    const newNote = {
      id: generateId(),
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const deleteNote = useCallback((noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  }, []);

  return {
    notes,
    isLoaded,
    addNote,
    deleteNote,
  };
}
