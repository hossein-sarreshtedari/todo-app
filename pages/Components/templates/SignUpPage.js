import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";

const SignUpPage = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const router  = useRouter();

    const {status} = useSession();

    useEffect(() => {

        if(status === 'authenticated') router.replace("/")

    } , [status])


    const signinupHandler = () => {


        if(email === "" || password === ""){

            toast("ایمیل و پسورد هر دو ضروری هستند")
            return;
        } 

        axios.post("/api/auth/signup" , {email , password})
        .then(res => {

            if(res.data.status){

                router.push("/login")
                toast(res.data.message)
            }
            else{

                console.log(res)
                toast(res.data.message)
            }

        })
        .catch(err =>{

            console.log(err);
            toast("problem in catch in signup")
            
        })

    }

    return (

        <div className="signin-form">

            <h3>Registratin Form</h3>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signinupHandler}>Register</button>


            <div>

                <p>Have an account?</p>
                <Link href={"/login"}>Log in</Link>

            </div>

            
            
        </div>
    );
};

export default SignUpPage;