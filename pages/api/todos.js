import connectDB from "@/utils/ConnectDB";
import { getSession } from "next-auth/react";
import User from "@/Models/User";
import { sortTodos } from "@/utils/sortTodos";

async function handler(req, res) {


    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ status: false, message: "Error in connecting to DB" });
    }



    if (req.method === "GET") {

        var session = await getSession({ req });
        if (!session) {
            return res
                .status(401)
                .json({ status: false, message: "You are not logged in!" });
        }


        var user = await User.findOne({ email: session.user.email });
        if (!user) {
            return res
                .status(404)
                .json({ status: false, message: "User doesn't exsit!" });
        }

    }



    if (req.method === "POST") {

        const { title, status, description , email } = req.body;

        if (!title || !status) {
            return res
                .status(422)
                .json({ status: false, message: "Invaild data!" });
        }

        const myuser = await User.findOne({ email: email });

        myuser.todos.push({ title, status, description });
        myuser.save();



        res.status(201).json({ status: true, message: "Todo created!" });
    } else if (req.method === "GET") {

        const sortedTodos = sortTodos(user.todos);
        return res.status(200).json({ status: true, data: { todos: sortedTodos } })

    } else if (req.method === "PATCH") {

        const { id, status } = req.body;


        if (!id || !status) {

            return res.status(422).json({ status: false, message: "invalid Data!" });
        }


        const result = await User.updateOne({ "todos._id": id }, { $set: { "todos.$.status": status } });
        return res.status(200).json({ status: true, message: "" })



    }
}

export default handler;