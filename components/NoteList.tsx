
import React from 'react';
import { Link } from 'react-router-dom';
import { type Note } from '../types';
import { PlusIcon, BookOpenIcon } from './Icons';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="flex-shrink-0 bg-amber-100 dark:bg-slate-800 p-4 border-b border-amber-200 dark:border-slate-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Modern Notebook</h1>
        </div>
        <Link
          to="/note/new"
          className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-800 transition-colors"
        >
          <PlusIcon className="w-6 h-6" />
        </Link>
      </header>
      <main className="flex-grow overflow-y-auto bg-amber-50 dark:bg-slate-900 p-2">
        {notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map(note => (
              <li key={note.id}>
                <Link
                  to={`/note/${note.id}`}
                  className="block p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-all border border-transparent hover:border-amber-400"
                >
                  <h2 className="font-bold text-slate-800 dark:text-white truncate">{note.title || 'Untitled Note'}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                    {note.content.substring(0, 100) || 'No additional text'}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {new Date(note.lastModified).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400 p-4">
            <BookOpenIcon className="w-16 h-16 mb-4 text-slate-300 dark:text-slate-600" />
            <h2 className="text-lg font-semibold">No notes yet</h2>
            <p>Click the '+' button to create your first note.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NoteList;
