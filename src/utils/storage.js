const STORAGE_KEY = 'ai-notes-organizer';

export function loadNotes() {
  try {
    if (typeof localStorage === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to load notes from localStorage:', error);
    return [];
  }
}

export function saveNotes(notes) {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.warn('Failed to save notes to localStorage:', error);
    return false;
  }
}
