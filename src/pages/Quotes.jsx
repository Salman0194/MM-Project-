import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import "./AdminQuotes.css";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get("/quotes");
      setQuotes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/quotes", { text, author });
      setText("");
      setAuthor("");
      fetchQuotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/quotes/${id}`);
      fetchQuotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <h1>Manage Quotes</h1>

        <form className="admin-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Quote Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <button type="submit">Add Quote</button>
        </form>

        <div className="admin-list">
          {quotes.map((quote) => (
            <div key={quote.id} className="admin-item">
              <div>
                <h3>"{quote.text}"</h3>
                <p>- {quote.author}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(quote.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
