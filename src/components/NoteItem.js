import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';
export default function NoteItem(props) {
    const { note, updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const deleteOnClick = ()=>{
        deleteNote(note._id)
    }
    return (
        <div>
            {/* {note.title}
            {note.description}*/}
            <div className="card my-2 me-4" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can me-2" style={{ color: "red" }} onClick={deleteOnClick}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}
