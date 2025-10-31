
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Note } from '../types';
import { ArrowLeftIcon, CheckIcon, TrashIcon } from './Icons';

interface NoteEditorProps {
  notes: Note[];
  onSave: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ notes, onSave, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const isNewNote = id === 'new';

  useEffect(() => {
    if (isNewNote) {
      setCurrentNote({
        id: crypto.randomUUID(),
        title: '',
        content: '',
        lastModified: Date.now(),
      });
      setTitle('');
      setContent('');
    } else {
      const noteToEdit = notes.find(note => note.id === id);
      if (noteToEdit) {
        setCurrentNote(noteToEdit);
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
      } else {
        navigate('/'); // Note not found, redirect
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, notes, isNewNote]);

  const handleSave = () => {
    if (!currentNote) return;
    if (title.trim() === '' && content.trim() === '') {
      // Don't save empty notes, just go back
      if (!isNewNote) {
          onDelete(currentNote.id);
      }
      navigate('/');
      return;
    }
    onSave({
      ...currentNote,
      title,
      content,
      lastModified: Date.now(),
    });
  };

  const handleDelete = () => {
    if (currentNote && !isNewNote) {
      if(window.confirm('Are you sure you want to delete this note?')) {
          onDelete(currentNote.id);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-amber-50 dark:bg-slate-900">
      <header className="flex-shrink-0 bg-amber-100 dark:bg-slate-800 p-2 border-b border-amber-200 dark:border-slate-700 flex justify-between items-center space-x-2">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-800 transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          {!isNewNote && (
            <button
              onClick={handleDelete}
              className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800 transition-colors"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={handleSave}
            className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-800 transition-colors"
          >
            <CheckIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden relative">
        <div className="p-4 md:p-6 flex-shrink-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full text-2xl font-bold bg-transparent focus:outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex-grow relative px-4 md:px-6 pb-4">
          <div className="absolute inset-0 top-1 px-4 md:px-6 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(to bottom, transparent 31px, #e2e8f0 32px)',
                backgroundSize: '100% 32px',
              }}
            ></div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            className="font-handwriting text-xl leading-8 w-full h-full bg-transparent resize-none focus:outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 relative z-10"
          ></textarea>
        </div>
      </main>
    </div>
  );
};

export default NoteEditor;
