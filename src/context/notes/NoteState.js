import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const noteInitially = [
        {
            "_id": "63c7f7613de8b9d909ecbc54",
            "user": "63c55452ef16dfe37b287db3",
            "title": "SecondNote",
            "description": "Hello World",
            "tag": "personel",
            "date": "2023-01-18T13:42:57.118Z",
            "__v": 0
        },
        {
            "_id": "63c7f76a3de8b9d909ecbc56",
            "user": "63c55452ef16dfe37b287db3",
            "title": "SecondNote",
            "description": "Hello World",
            "tag": "personel",
            "date": "2023-01-18T13:43:06.876Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(noteInitially);
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState