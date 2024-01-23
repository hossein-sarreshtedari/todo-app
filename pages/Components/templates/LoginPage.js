;
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import Link from "next/link";
import {signIn, useSession} from "next-auth/react"



const LoginPage = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const router  = useRouter();

    const {status} = useSession();

    useEffect(() => {

        if(status === "authenticated") router.replace("/")

    } , [status])


    const loginHandler = async () => {


        if(email === "" || password === ""){

            toast("ایمیل و پسورد هر دو ضروری هستند")
            return;
        } 


        const res = await signIn("credentials" , {

            email : email,
            password : password,
            redirect : false
        })

        if(!res.error) router.push("/")
        else toast(res.error)

    }

    return (

        <div className="signin-form">

            <h3>Login Form</h3>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginHandler}>Login</button>


            <div>

                <p>Create account?</p>
                <Link href={"/signup"}>Sign Up</Link>

            </div>

            
            
        </div>
    );
};

export default LoginPage;