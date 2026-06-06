import { useState, useEffect, useCallback } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';
import { generateId } from '../utils/formatters';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = loadNotes();
    setNotes(stored);
    setIsLoaded(true);
  }, []);

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

  const updateNote = useCallback((noteId, updates) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }, []);

  const clearAllNotes = useCallback(() => {
    setNotes([]);
  }, []);

  const getNotesByCategory = useCallback(() => {
    const grouped = {};
    notes.forEach((note) => {
      if (!grouped[note.category]) {
        grouped[note.category] = [];
      }
      grouped[note.category].push(note);
    });
    return grouped;
  }, [notes]);

  return {
    notes,
    isLoaded,
    addNote,
    deleteNote,
    updateNote,
    clearAllNotes,
    getNotesByCategory,
  };
}