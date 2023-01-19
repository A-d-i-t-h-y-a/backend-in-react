import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const noteInitially = []

    const [notes, setNotes] = useState(noteInitially);

    // Get All notes
    const getNotes = async () => {
        console.log("Adding a new note")
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNTU0NTJlZjE2ZGZlMzdiMjg3ZGIzIn0sImlhdCI6MTY3Mzg3ODkyM30.E-7jA7TC1mTHxs_WT_C0moGxKvauxanshX-IVNDCQyE'
            }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json);
    }

    // Add note
    const addNote = async (title, description, tag) => {
        console.log("Adding a new note")
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNTU0NTJlZjE2ZGZlMzdiMjg3ZGIzIn0sImlhdCI6MTY3Mzg3ODkyM30.E-7jA7TC1mTHxs_WT_C0moGxKvauxanshX-IVNDCQyE'
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }
    // Delete note
    const deleteNote = async (id) => {
        console.log("Deleting the note with id", id)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNTU0NTJlZjE2ZGZlMzdiMjg3ZGIzIn0sImlhdCI6MTY3Mzg3ODkyM30.E-7jA7TC1mTHxs_WT_C0moGxKvauxanshX-IVNDCQyE'
            }
        });
        const json = await response.json();
        let newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNTU0NTJlZjE2ZGZlMzdiMjg3ZGIzIn0sImlhdCI6MTY3Mzg3ODkyM30.E-7jA7TC1mTHxs_WT_C0moGxKvauxanshX-IVNDCQyE'
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json();

        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState