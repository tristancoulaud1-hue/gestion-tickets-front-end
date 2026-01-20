import { useState } from "react";
import { createTicket } from "../services/api";

function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Low");
  const [tags, setTags] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTicket = {
      title,
      description,
      status,
      priority,
      tags: tags.split(",").map((t) => t.trim()),
      createdAt,
    };

    await createTicket(newTicket);

    setTitle("");
    setDescription("");
    setStatus("Open");
    setPriority("Low");
    setTags("");
    setCreatedAt("");

    onTicketCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un ticket</h2>

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="text"
        placeholder="Tags (séparés par des virgules)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <input
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
        required
      />

      <button type="submit">Créer</button>
    </form>
  );
}

export default TicketForm;