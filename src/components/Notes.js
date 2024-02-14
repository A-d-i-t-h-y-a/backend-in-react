import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "", image: null });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const history = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            history("/login");
        }
        // eslint-disable-next-line
    }, []);

    const handleEditNote = (currentNote) => {
        setEditingNoteId(currentNote._id);
        setNote({
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag,
            image: currentNote.image
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            setNote({ ...note, image: e.target.files[0] });
        } else {
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    };

    const handleUpdateNote = (e) => {
        e.preventDefault();
        console.log(editingNoteId, note.title, note.description, note.tag, note.image);
        editNote(editingNoteId, note.title, note.description, note.tag, note.image);
        setIsModalOpen(false);
        setEditingNoteId(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNote({ title: "", description: "", tag: "", image: null });
        setEditingNoteId(null);
    };

    return (
        <div className="ps-2">
            <AddNote />
            <h1>Your Notes</h1>
            <div className="d-flex flex-wrap">
                {notes.length === 0 && "No Notes to Display"}
                {notes.map((note) => (
                    <NoteItem key={note._id} updateNote={handleEditNote} note={note} />
                ))}
            </div>
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <form onSubmit={handleUpdateNote}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleInputChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleInputChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="image" name="image" ref={fileInputRef} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="submit" className="btn btn-primary" disabled={note.title.length < 5 || note.description.length < 5}>Update Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
