import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ProfileData from "../modules/ProfileData";


const ProfilePage = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const [data, setData] = useState(null)

    useEffect(() => {

        fetchProfile();

    }, [])

    const fetchProfile = () => {

        axios.get("/api/profile")
            .then(res => {

                if (res.data.status) {

                    setData(res.data.data)
                }
                else {

                    console.log(res);
                    toast(res.data.message);
                }
            })
            .catch(err => {

                console.log(err);
                toast("problem in catch");
            })
    }


    const submitHandler = () => {

        axios.post("/api/profile", { name, lastName, password })
            .then(res => {

                if (res.data.status) {

                    console.log(res.data)

                }
                else {

                    console.log(res);
                    toast(res.data.message);
                }
            })
            .catch(err => {

                console.log(err);
                toast("problem in catch");
            })

    }

    return (

        <div className="profile-form">
            <h2><CgProfile />Profile</h2>

            {data ?

                <ProfileData data={data} />

                :

                <ProfileForm name={name} lastName={lastName} password={password} setName={setName} setLastName={setLastName} setPassword={setPassword} submitHandler={submitHandler} />
            }
        </div>
    );
};

export default ProfilePage;