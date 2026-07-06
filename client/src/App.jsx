import { useState } from 'react';

function App() {
  const [form, setForm] = useState({ systolic: '', diastolic: '', timestamp: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting:', form);
  }

  return (
    <div>
      <h1>Blood Pressure Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Systolic
          <input type="number" name="systolic" value={form.systolic} onChange={handleChange} />
        </label>
        <label>
          Diastolic
          <input type="number" name="diastolic" value={form.diastolic} onChange={handleChange} />
        </label>
        <label>
          Date & time
          <input type="datetime-local" name="timestamp" value={form.timestamp} onChange={handleChange} />
        </label>
        <button type="submit">Add reading</button>
      </form>
    </div>
  );
}

export default App;
