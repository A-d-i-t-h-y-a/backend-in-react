import React from "react";

export default function Alert(props) {
    return (
        <div>
            <div className="alert alert-primary my-2 mx-1" role="alert">
                {props.message}
            </div>
        </div>
    );
}
