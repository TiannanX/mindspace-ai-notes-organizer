import { useState, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { NoteInput } from './components/NoteInput/NoteInput';
import { ResultCard } from './components/ResultCard/ResultCard';
import { NotesWall } from './components/NotesWall/NotesWall';
import { useNotes } from './hooks/useNotes';
import { useClassifier } from './hooks/useClassifier';
import './styles/global.css';

const DEMO_NOTES = [
  {
    content: "I want to visit Japan next spring. The cherry blossoms and temples look amazing. Maybe plan a two-week trip starting in Tokyo and working my way to Kyoto.",
    category: 'Travel',
    summary: "A wanderlust-filled thought about Japan — your next adventure awaits.",
    tags: ['wanderlust', 'adventure', 'planning'],
    nextAction: 'Start researching flights and accommodations?',
  },
  {
    content: "Just read about compound interest. If I invest $500/month starting now at 7% annual return, I could have over $500k in 30 years. The power of consistent investing is incredible.",
    category: 'Investment Journal',
    summary: "A financial reflection on compound interest. Smart moves start with awareness.",
    tags: ['finance', 'wealth', 'strategy'],
    nextAction: 'Research this topic further?',
  },
  {
    content: "What if instead of a traditional office, we created a network of small co-working spaces in residential neighborhoods? People could walk to work, local shops would thrive, and communities would reconnect.",
    category: 'Inspiration',
    summary: "A creative spark around neighborhood workspaces. Let this idea breathe and grow.",
    tags: ['creativity', 'vision', 'community'],
    nextAction: 'Start a creative project around this?',
  },
  {
    content: "Need to finish the project proposal by Friday, schedule dentist appointment, pick up groceries, and call mom on Sunday. Also want to start that Spanish course this month.",
    category: 'Tasks / Plans',
    summary: "A task to remember: project proposal, dentist, groceries, mom. Small steps lead to big accomplishments.",
    tags: ['action item', 'planning', 'productivity'],
    nextAction: 'Break this into smaller steps?',
  },
  {
    content: "I realized today that I've been avoiding difficult conversations because I'm afraid of conflict. But avoiding them only makes things worse. I want to practice being more direct and compassionate at the same time.",
    category: 'Reflection',
    summary: "A moment of introspection about conflict. Self-awareness is a superpower.",
    tags: ['mindfulness', 'growth', 'relationships'],
    nextAction: 'Journal more about this?',
  },
  {
    content: "Finished the first three chapters of 'Atomic Habits'. The concept of habit stacking is fascinating — link new habits to existing ones. Also want to try the two-minute rule for overcoming procrastination.",
    category: 'Study / Growth',
    summary: "A learning note about Atomic Habits. Growth happens one insight at a time.",
    tags: ['learning', 'books', 'habits'],
    nextAction: 'Find resources to learn more?',
  },
  {
    content: "Remember when we used to have Sunday brunches at grandma's house? The smell of her pancakes, everyone gathered around the big wooden table, my cousins fighting over the last piece of bacon. Those were the days.",
    category: 'Memory',
    summary: "A precious memory surfaced: grandma's Sunday brunches. Treasured moments deserve to be captured.",
    tags: ['nostalgia', 'family', 'moments'],
    nextAction: 'Share this story with someone?',
  },
  {
    content: "The sunset from the rooftop bar was absolutely stunning tonight. Sometimes you just need to stop and appreciate the simple beauty around us. Grateful for this moment of peace.",
    category: 'Reflection',
    summary: "A moment of appreciation for a beautiful sunset. These insights are worth holding onto.",
    tags: ['gratitude', 'mindfulness', 'appreciation'],
    nextAction: 'Journal more about this?',
  },
];

function App() {
  const { notes, isLoaded, addNote, deleteNote } = useNotes();
  const { result, isProcessing, classify, clearResult } = useClassifier();
  const [inputContent, setInputContent] = useState('');
  const [pendingContent, setPendingContent] = useState('');

  const handleSubmit = useCallback((content) => {
    setPendingContent(content);
    classify(content);
  }, [classify]);

  const handleSave = useCallback(() => {
    if (result && pendingContent) {
      addNote({
        content: pendingContent,
        ...result,
      });
      clearResult();
      setPendingContent('');
      setInputContent('');
    }
  }, [result, pendingContent, addNote, clearResult]);

  const handleDiscard = useCallback(() => {
    clearResult();
    setPendingContent('');
  }, [clearResult]);

  const handleAddDemo = useCallback(() => {
    const existingContent = new Set(notes.map((note) => note.content));
    DEMO_NOTES.filter((demoNote) => !existingContent.has(demoNote.content)).forEach((demoNote) => {
      addNote(demoNote);
    });
  }, [addNote, notes]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <NoteInput
          content={inputContent}
          onContentChange={setInputContent}
          onSubmit={handleSubmit}
          isProcessing={isProcessing}
        />
        <NotesWall
          notes={notes}
          onDelete={deleteNote}
          onAddDemo={handleAddDemo}
        />
      </main>
      <footer className="app-footer">
        <div className="container">
          MindSpace — Your thoughts, beautifully organized
        </div>
      </footer>
      {result && (
        <ResultCard
          result={result}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      )}
    </>
  );
}

export default App;
