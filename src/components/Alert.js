import React from "react";

export default function Alert(props) {
    return (
        <div>
            <div className={`alert alert-${(props.alert === null)?"":props.alert.type} my-2 mx-1`} role="alert">
                {(props.alert === null)?"":props.alert.msg}
            </div>
        </div>
    );
}
