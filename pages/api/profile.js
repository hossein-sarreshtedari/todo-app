
import connectDB from "@/utils/ConnectDB";
import { verifyPassword } from "@/utils/auth";
import { getSession } from "next-auth/react";
import User from "@/Models/User";

export default async function handler (req , res) {

    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ status: false, message: "Error in connecting to DB" });
    }


    var {name , lastName , password} = req.body;

    const session = await getSession({ req });
    if (!session) {
        return res
            .status(401)
            .json({ status: false, message: "You are not logged in!" });
    }


    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return res
            .status(404)
            .json({ status: false, message: "User doesn't exsit!" });
    }


    if(req.method === "POST"){

        

        const isValid = await verifyPassword(password , user.password);
        if(!isValid){

            return res.status(422).josn({status : false , message : "password is incorrect!"})
        }


        user.name = name;
        user.lastName = lastName;
        user.save();

        res.status(201).json({status : true , data : {name , lastName , email :session.user.email}})


    }else if(req.method === "GET"){

        return res.status(200).json({status : true , data : {name : user.name , lastName : user.lastName , email : user.email}})
    }
}