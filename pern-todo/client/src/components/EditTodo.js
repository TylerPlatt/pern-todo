import React, {Fragment, useEffect, useState} from "react";

const EditTodo = ({ todo }) => { // prop now shows up in dom for each item, accessible now
    // console.log(todo);
    const [description, setDescription] = useState(todo.description);

    // edit description function (in modal - "submit changes/update")

    const updateDescription = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, { // by default, fetch is get. change
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/";
            // console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }



    return (
    <Fragment>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
        </button>
        <div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"></h4>
                        <button type="button" class="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick= {e => updateDescription(e)}>Edit</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    );
};

export default EditTodo // called in ListTodos, not App