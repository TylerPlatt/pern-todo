const express = require("express");
const app = express(); // takes express library and runs it
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json())

// ROUTES //

// create a todo
app.post("/todos", async (req, res) => {
    try {
        // console.log(req.body);
        const {description} = req.body // destructured\
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description]
        ); // $1 = var that specs description. [] arg defines
        
        res.json(newTodo.rows[0]); // this is the actual response. res.json(newTodo) returns all the insert data from pg
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        // console.log(req.params)

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
        );
        // console.log(req.params)

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo
// get a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        // console.log(req.params)

        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
})


