import React, { useState } from 'react';
import './App.css';

const initialUsers = [
  {
    Anand: { name: 'Anand', meetings: [] },
    Nitin: { name: 'Nitin', meetings: [] },
    John: { name: 'John', meetings: [] },
  },
];

const initialMeetings = [
  {
    name: 'Coding Discussion',
    day: 'Friday',
    start: 2,
    end: 4,
    users: ['Anand', 'Nitin'],
  },
];

const App = () => {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [showForm, setShowForm] = useState(false);
  const [errorUser, setErroUser] = useState(initialUsers);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fields, setFields] = useState({
    name: 'Name',
    day: 'Day',
    start: 'Start Time',
    end: 'End Time',
    users: [],
  });

  const getMeetings = (user) => {
    return meetings.filter((item) => {
      return item.users.includes(user);
    });
  };

  const checkValidTiming = (currentStart, currentEnd, meeting) => {
    console.log('meetings', currentStart, currentEnd, meeting);
    if (currentStart <= meeting.end && currentEnd >= meeting.start) {
      return false;
    }
    return true;
  };

  const check = () => {
    let isValid = true;
    fields.users.forEach((user) => {
      const meetings = getMeetings(user);
      console.log('meetings', meetings);
      meetings.forEach((item) => {
        if (!checkValidTiming(fields.start, fields.end, item)) {
          isValid = false;
          setErroUser(user);
        }
      });
    });
    if (!isValid) {
      setSuccess('');
      setError(
        `${errorUser} does have another meeting at this time. Please schedule meeting at new time`
      );
    }
    return isValid;
  };

  return (
    <div className='App'>
      <button class='create' onClick={() => setShowForm((val) => !val)}>
        Create New Meeting
      </button>
      <div class='meetings'>
        My Current Meetings
        {meetings
          .filter((item) => item.users.includes('Anand'))
          .map((item, index) => (
            <>
              <div class='meeting'>
                Meeting{' '}
                {`${index + 1}: ${item.name} (${item.start} PM - ${
                  item.end
                } PM)`}
              </div>
              <div class='meeting'></div>
            </>
          ))}
      </div>
      {showForm && (
        <div class='form'>
          <input
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
          />
          <input
            value={fields.day}
            onChange={(e) => setFields({ ...fields, day: e.target.value })}
          />
          <input
            value={fields.start}
            onChange={(e) => setFields({ ...fields, start: e.target.value })}
          />
          <input
            value={fields.end}
            onChange={(e) => setFields({ ...fields, end: e.target.value })}
          />
          <input
            value={fields.users}
            onChange={(e) =>
              setFields({ ...fields, users: e.target.value.split(',') })
            }
          />
          <button
            class='create'
            onClick={() => {
              if (check()) {
                setMeetings([...meetings, fields]);
                setFields({
                  name: 'Name',
                  day: 'Day',
                  start: 'Start Time',
                  end: 'End Time',
                  users: [],
                });
                setSuccess('Success!..Meeting is scheduled');
                setError('');
              }
            }}
          >
            Submit
          </button>
        </div>
      )}
      {error && <div class='error'>{error}</div>}
      {success && <div class='success'>{success}</div>}
    </div>
  );
};

export default App;
