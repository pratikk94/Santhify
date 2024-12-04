import React from 'react';
import { Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import './Profile.css';
import Notes from '../Profile/Notes/Notes';

interface Note {
  id: number;
  name: string;
  date_added: string;
  notes: string;
}

const mockNotes: Note[] = [
  {
    id: 1,
    name: "SEASON-1",
    date_added: "2018-08-04",
    notes: "The first few episodes of the show hooked a lot of fans, but it's hard to argue that the show gathers its balance a little after its landing...",
  },
  {
    id: 2,
    name: "SEASON-2",
    date_added: "2019-12-25",
    notes: "One of the most intense seasons of the show, Season 2 was a final goodbye to Elena and Jeremy’s (Steven R. McQueen) guardian...",
  },
  {
    id: 3,
    name: "SEASON-3",
    date_added: "2020-02-29",
    notes: "After the epic finale of Season 2, the third season was like dessert to a well-served meal. Just two words: The Originals...",
  },
];

const Profile: React.FC = () => {
  const handleAddNote = () => {
    alert("Add Note functionality coming soon!");
  };

  return (
    <div className="profile-tab">
      {/* Report Section */}
      <div className="report-section">
        <h3>Client Dynamic Report - Behavioural and Ayurvedic Report</h3>
        <Button type="primary" icon={<MoreOutlined />} className="download-btn">
          Download PDF
        </Button>
        <MoreOutlined className="more-icon" />
      </div>

      {/* Notes Section */}
      <Notes notes={mockNotes} onAddNote={handleAddNote} />
    </div>
  );
};

export default Profile;