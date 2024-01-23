import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Tasks from "../modules/Tasks";


const HomePage = () => {

    const [todos , setTodos] = useState(null);

    useEffect(() => {

        fetchTodos();

    } , []);

    const fetchTodos = () => {

        axios.get("/api/todos")
        .then(res => {

            if(res.data.status){

               setTodos(res.data.data.todos)
            }
            else{

                console.log(res)
                toast("مشکل در گرفتن تودو ها")
            }
        })
        .catch(err => {

            console.log(err);
            toast("problem in catch")
        })

    }

    return (

        todos !== null &&
        <div className="home-page">

            <div className="home-page--todo">

                <p>Todo</p>
                <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />

            </div>

            <div className="home-page--inProgress">

                <p>In Progress</p>
                <Tasks data={todos.inProgress} fetchTodos={fetchTodos} next="review" back="todo"/>

            </div>

            <div className="home-page--review">

                <p>Review</p>
                <Tasks data={todos.review} fetchTodos={fetchTodos} next="done" back="inProgress"/>

            </div>

            <div className="home-page--done">

                <p>Done</p>
                <Tasks data={todos.done} fetchTodos={fetchTodos} back="review" />

            </div>

        </div>
    );
};

export default HomePage;