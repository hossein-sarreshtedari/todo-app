
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow } from "react-icons/bi";
import { BiLeftArrow } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";


const Tasks = ({data , fetchTodos , next , back}) => {


    

    const changeStatus = (id , status) => {

        axios.patch("/api/todos" , {id , status})
        .then(res => {

            if(res.status){

                fetchTodos();
            }
            else{

                console.log(res);
                toast(res.data.message)
            }
        })
        .catch(err => {

            console.log(err);
            toast("problem in catch");
        })
    }


    return (

        <div className="tasks">

            {data?.map(i => {

            return <div key={i._id} className="tasks__card">

                <span className={i.status}></span>
                <RiMastodonLine />
                <h4>{i.title}</h4>
                <h3>{i.description}</h3>

                <div>

                    {back ? <button className="button-back" onClick={() => changeStatus(i._id , back)}><BiLeftArrow/>Back</button> : null}
                    {next ? <button className="button-next" onClick={() => changeStatus(i._id , next)}>Next<BiRightArrow /></button> : null}

                </div>

            </div>


            })}
            
        </div>
    );
};

export default Tasks;