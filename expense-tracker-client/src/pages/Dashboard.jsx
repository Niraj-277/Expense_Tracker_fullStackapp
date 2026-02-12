import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  // Calculate total spent
  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
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
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Arial',
        padding: 0,
      }}
    >
      <div
        style={{
          background: "rgba(24,24,27,0.95)",
          borderRadius: "24px",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 8px 0 #000a inset",
          padding: "40px 32px 32px 32px",
          maxWidth: "430px",
          width: "100%",
          border: "1.5px solid #232526",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h1 style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "2.1rem",
            letterSpacing: "-1px",
            textAlign: "center",
            textShadow: "0 2px 16px #000a",
            margin: 0
          }}>💰 My Expenses</h1>
          <button onClick={handleLogout} style={{ background: 'linear-gradient(90deg, #232526 0%, #414345 100%)', color: 'white', padding: '8px 18px', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 2px 8px #0003', marginLeft: 12 }}>Logout</button>
        </div>

        {/* FORM: Now handles both Add and Update */}
        <div style={{ background: editId ? 'rgba(255,243,205,0.12)' : 'rgba(36,36,40,0.7)', padding: '20px', borderRadius: '16px', marginBottom: '24px', transition: '0.3s', border: editId ? '1.5px solid #ffc107' : '1.5px solid #232526' }}>
          <h3 style={{ color: '#fff', fontWeight: 600, margin: 0, marginBottom: 14 }}>{editId ? '✏️ Update Expense' : '➕ Add New Expense'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #333', background: '#232526', color: '#fff', fontSize: '1rem', outline: 'none', boxShadow: '0 1px 4px #0002', transition: 'border 0.2s, box-shadow 0.2s' }} />
            <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #333', background: '#232526', color: '#fff', fontSize: '1rem', outline: 'none', boxShadow: '0 1px 4px #0002', transition: 'border 0.2s, box-shadow 0.2s' }} />
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #333', background: '#232526', color: '#fff', fontSize: '1rem', outline: 'none', boxShadow: '0 1px 4px #0002', transition: 'border 0.2s, box-shadow 0.2s' }}>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="travel">Travel</option>
              <option value="general">General</option>
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ background: editId ? '#ffc107' : 'linear-gradient(90deg, #232526 0%, #414345 100%)', color: editId ? 'black' : '#fff', fontWeight: 600, fontSize: '1.1rem', border: 'none', borderRadius: '10px', padding: '12px 0', boxShadow: '0 2px 8px #0003', cursor: 'pointer', letterSpacing: '0.5px', flex: 1, transition: 'background 0.2s, box-shadow 0.2s' }}>
                {editId ? 'Update' : 'Add'}
              </button>
              {/* NEW: Cancel button to exit edit mode */}
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setTitle(''); setAmount(''); setCategory('food'); }} style={{ background: '#ccc', color: '#232526', fontWeight: 600, fontSize: '1.1rem', border: 'none', borderRadius: '10px', padding: '12px 0', boxShadow: '0 2px 8px #0003', cursor: 'pointer', letterSpacing: '0.5px', flex: 1, transition: 'background 0.2s, box-shadow 0.2s' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TOTAL SPENT */}
        <div style={{
          background: 'rgba(36,36,40,0.7)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '18px',
          boxShadow: '0 1px 4px #0002',
          border: '1.5px solid #232526',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.2em', marginRight: '10px' }}>Total Spent:</span>
          <span style={{ color: '#ffc107', fontWeight: 700, fontSize: '1.4em' }}>${totalSpent.toFixed(2)}</span>
        </div>

        {/* EXPENSE LIST */}
        <div style={{ maxHeight: '340px', overflowY: 'auto', marginBottom: 8 }}>
          {expenses.map(expense => (
            <div key={expense._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(36,36,40,0.7)', padding: '16px', borderRadius: '10px', marginBottom: '12px', boxShadow: '0 1px 4px #0002', border: '1.5px solid #232526' }}>
              <div>
                <h4 style={{ margin: 0, color: '#fff', fontWeight: 600 }}>{expense.title}</h4>
                <small style={{ color: '#bdbdbd' }}>{expense.category} • {new Date(expense.created_at).toLocaleDateString()}</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2em', marginRight: '10px', color: '#ffc107' }}>${expense.amount}</span>
                {/* NEW: Edit Button */}
                <button onClick={() => handleEditClick(expense)} style={{ background: 'transparent', border: '1.5px solid #ffc107', color: '#ffc107', cursor: 'pointer', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '1em', transition: 'border 0.2s, color 0.2s' }}>✏️ Edit</button>
                <button onClick={() => deleteExpense(expense._id)} style={{ background: 'transparent', border: '1.5px solid #e74c3c', color: '#e74c3c', cursor: 'pointer', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '1em', transition: 'border 0.2s, color 0.2s' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;