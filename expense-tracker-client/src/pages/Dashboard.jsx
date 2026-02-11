import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000/api/v1";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  
  // NEW: State to track if we are updating an existing expense
  const [editId, setEditId] = useState(null); 

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchExpenses();
    }
  }, [token, navigate]);

  const fetchExpenses = async () => {
    const res = await fetch(`${API_URL}/getexpense`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setExpenses(data.data || []);
  };

  // NEW: This single function now handles BOTH Adding and Updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If we have an editId, we are updating (PUT). Otherwise, creating (POST).
    const url = editId ? `${API_URL}/updateexpense/${editId}` : `${API_URL}/expense`;
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ title, amount, category })
    });
    
    const data = await res.json();
    
    if (data.success) {
      // Clear the form and reset edit state
      setTitle(''); 
      setAmount(''); 
      setCategory('food');
      setEditId(null); 
      fetchExpenses();
    } else {
      alert(data.error || data.message || "Something went wrong!");
    }
  };

  const deleteExpense = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/deleteexpense/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        fetchExpenses();
      }
    }
  };

  // NEW: Function to populate the form when "Edit" is clicked
  const handleEditClick = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setEditId(expense._id);
    
    // Scroll to top so the user sees the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>💰 My Expenses</h1>
        <button onClick={handleLogout} style={{ background: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* FORM: Now handles both Add and Update */}
      <div style={{ background: editId ? '#fff3cd' : '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', transition: '0.3s' }}>
        <h3>{editId ? '✏️ Update Expense' : '➕ Add New Expense'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required style={{ width: '100px', padding: '8px' }} />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '8px' }}>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="travel">Travel</option>
            <option value="general">General</option>
          </select>
          <button type="submit" style={{ background: editId ? '#ffc107' : 'green', color: editId ? 'black' : 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
            {editId ? 'Update' : 'Add'}
          </button>
          
          {/* NEW: Cancel button to exit edit mode */}
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setTitle(''); setAmount(''); setCategory('food'); }} style={{ background: '#ccc', padding: '10px', border: 'none', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* EXPENSE LIST */}
      <div>
        {expenses.map(expense => (
          <div key={expense._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{expense.title}</h4>
              <small style={{ color: '#666' }}>{expense.category} • {new Date(expense.created_at).toLocaleDateString()}</small>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em', marginRight: '10px' }}>${expense.amount}</span>
              
              {/* NEW: Edit Button */}
              <button onClick={() => handleEditClick(expense)} style={{ background: 'transparent', border: '1px solid blue', color: 'blue', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px' }}>✏️ Edit</button>
              
              <button onClick={() => deleteExpense(expense._id)} style={{ background: 'transparent', border: '1px solid red', color: 'red', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px' }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;