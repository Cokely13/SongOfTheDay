import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../store/allQuestionsStore';

function CreateQuestion() {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.auth);
  const {admin} = useSelector((state) => state.auth);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const handleCreateQuestion = () => {
    const newQuestion = {
      userId: id, // You'll need to define id somewhere in your component or fetch it from Redux store
      date: date,
      name: name
    };
    dispatch(createQuestion(newQuestion));
    setDate("")
    setName("")
  };

  return (
    <div>
      {admin ?
      <div>
      <h2>Create Question</h2>
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={handleCreateQuestion}>Create Question</button>
      </div> : <div>Not Admin</div>}
    </div>
  );
}

export default CreateQuestion;
