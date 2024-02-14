import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = `https://inotebookapi.onrender.com/api`
    const noteInitially = []

    const [notes, setNotes] = useState(noteInitially);

    // Get All notes
    const getNotes = async () => {
        console.log("Getting all notes");
        try {
            const response = await fetch(`${host}/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    // Add note
    const addNote = async (title, description, tag, image) => {
        console.log("Adding a new note");
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tag', tag);
            formData.append('image', image);
            console.log(formData)
            const response = await fetch(`${host}/notes/addnote`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem("token")
                },
                body: formData
            });
            const note = await response.json();
            setNotes([...notes, note]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }

    // Delete note
    const deleteNote = async (id) => {
        console.log("Deleting the note with id", id);
        try {
            await fetch(`${host}/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    // Edit note
    const editNote = async (id, title, description, tag, image) => {
        // API Call
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tag', tag);
        formData.append('image', image);
    
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': localStorage.getItem("token")
            },
            body: formData
        });
    
        const updatedNote = await response.json();
    
        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                newNotes[index].image = updatedNote.image; // Assuming the updatedNote contains the updated image data
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

export default NoteState;
