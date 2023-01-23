import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes , editNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    let history = useNavigate()
    const handleclick = (e) => {
        console.log("Updating the note",note._id)
        editNote(note._id, note.title, note.description, note.tag)
        setNote({title: note.title, description: note.description, tag: note.tag})
        e.preventDefault()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes()
            console.log(notes)
        }
        else{
            history("/login")
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }
    const ref = useRef(null);
    return (
        <div className='ps-2'>
            <AddNote />
            <button type="button" className="btn btn-primary visually-hidden" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.title.length < 5 || note.description.length <5} className="btn btn-primary" onClick={handleclick} data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className='d-flex flex-wrap'>
                {notes.length === 0 && "No Notes to Display"}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })
                }
            </div>
        </div>
    )
}
