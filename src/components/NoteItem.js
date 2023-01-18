import React from 'react'

export default function NoteItem(props) {
    const {note} = props;
    return (
        <div>
            {note.title}
            {note.description}
        </div>
    )
}
