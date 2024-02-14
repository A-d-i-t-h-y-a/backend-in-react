import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const deleteOnClick = () => {
        deleteNote(note._id);
    }

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/jpeg;base64,' + window.btoa(binary);
    }

    return (
        <div>
            <div className="card my-2 me-4" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    {/* Check if the note contains an image */}
                    {note.image && (
                        <img src={arrayBufferToBase64(note.image.data.data)} className="card-img-top" alt="Note Image" />
                    )}
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can me-2" style={{ color: "red" }} onClick={deleteOnClick}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}
