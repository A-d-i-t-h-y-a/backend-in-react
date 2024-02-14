import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "", image: null });

  const handleclick = (e) => {
    e.preventDefault();
    console.log(note.title, note.description, note.tag, note.image);
    addNote(note.title, note.description, note.tag, note.image);
    setNote({ title: "", description: "", tag: "", image: null });
  }

  const onChange = (e) => {
    if (e.target.name === 'image') {
      // Handle image file
      setNote({ ...note, image: e.target.files[0] });
    } else {
      setNote({ ...note, [e.target.name]: e.target.value });
    }
  }

  return (
    <div>
      <div className='container my-3'>
        <h1>Add a Note</h1>
        <form encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" className="form-control" id="image" name='image' onChange={onChange} />
          </div>
          <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}
