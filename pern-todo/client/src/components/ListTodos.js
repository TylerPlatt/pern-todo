import React, {Fragment, useEffect, useState} from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]) // default value of empty array. set json data into there. setTodos is only way to change STATE

    // delete todo function

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id)); // console.log(deleteTodo); 
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos"); // by default, fetch is get
            const jsonData = await response.json(); //json data. parse for logger. await cuz takes time for parse
                    
            setTodos(jsonData); // change the state // console.log(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    };

    // useEffect - keeps on making requests, once render happens. to make sure only 1 request happens, add that []
    useEffect(() => {
        getTodos();
    }, []);

    // Logging 4 times
    // console.log(todos); // log the STATE. what we're putting in useState ^

        return (
        <Fragment>
            <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {/* {<td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>} */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td>
                                <button 
                                className="btn btn-danger" 
                                onClick={() => deleteTodo(todo.todo_id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}                
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;