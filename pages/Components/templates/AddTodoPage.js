import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { useState } from "react";
import RadioComponet from "../elements/RadioComponet";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";


const AddTodoPage = () => {

    const [status , setStatus] = useState("todo");
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");

    const {data} = useSession();

    const addHandler = () => {

        axios.post("/api/todos" , {title : title , status : status , description : description , email : data.user.email })
        .then(res => {

            if(res.status){

                setTitle("");
                setStatus("todo");
                setDescription("")

                toast.success(res.data.message);
            }
            else{

                toast(res.data.message);
                console.log(res);
            }

        })
        .catch(err => {

            console.log(err);
            toast("problem in catch")
        })
    }

  
    return (

        <div className="add-form">

            <h2>
                <GrAddCircle />
                Add new Todo
            </h2>

            <div className="add-form__input">

                <div className="add-form__input--first">

                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />


                </div>

                <div className="add-form__input--first">

                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />


                </div>

                <div className="add-form__input--second">

                    <RadioComponet status={status} setStatus={setStatus} value="todo" title="Todo"> <BsAlignStart /> </RadioComponet>
                    <RadioComponet status={status} setStatus={setStatus} value="inProgress" title="In Progress"> <FiSettings /> </RadioComponet>

                    <RadioComponet status={status} setStatus={setStatus} value="review" title="Review"> <AiOutlineFileSearch /> </RadioComponet>
                    <RadioComponet status={status} setStatus={setStatus} value="done" title="Done"> <IoMdDoneAll /> </RadioComponet>


                   
                </div>
                

                <button onClick={addHandler}>Add</button>

            </div>

        </div>
    );
};

export default AddTodoPage;