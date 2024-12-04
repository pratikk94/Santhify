import React from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './Notes.css';

interface Note {
  id: number;
  name: string;
  date_added: string;
  notes: string;
}

interface NotesProps {
  notes: Note[];
  onAddNote: () => void; // Callback for adding a new note
}

const Notes: React.FC<NotesProps> = ({ notes, onAddNote }) => {
  return (
    <Card
      title="Notes for the Client"
      extra={
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={onAddNote}
          className="add-note-btn"
        >
          Add Note
        </Button>
      }
      className="notes-section"
    >
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <h3>{note.name}</h3>
          <p className="note-date">Added on: {note.date_added}</p>
          <p className="note-content">{note.notes}</p>
        </div>
      ))}
    </Card>
  );
};

export default Notes;