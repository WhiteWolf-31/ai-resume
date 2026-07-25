import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";


function Register(){


const navigate = useNavigate();



const [formData,setFormData] = useState({

    name:"",
    email:"",
    password:"",
    password_confirmation:""

});



const [loading,setLoading] = useState(false);

const [error,setError] = useState("");

const [success,setSuccess] = useState("");






useEffect(()=>{


    const token = localStorage.getItem("token");


    if(token){

        navigate("/dashboard");

    }


},[navigate]);







const handleChange = (e)=>{


    setFormData({

        ...formData,

        [e.target.name]:e.target.value

    });


};







const handleSubmit = async(e)=>{


e.preventDefault();


setError("");

setSuccess("");



try{


    setLoading(true);



    await api.post(

        "/register",

        formData

    );



    setSuccess(

        "Registration successful! Redirecting to login..."

    );



    setTimeout(()=>{


        navigate("/login");


    },1500);



}



catch(error){


    console.log(error.response);



    setError(

        error.response?.data?.message ||

        "Registration failed"

    );


}



finally{


    setLoading(false);


}



};








return(


<div className="min-h-screen bg-black text-white flex items-center justify-center">



<form

onSubmit={handleSubmit}

className="bg-gray-900 p-8 rounded-2xl w-96 shadow-xl"

>



<h1 className="text-3xl font-bold text-center mb-6">

Create Account

</h1>







{

error &&

<p className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-center">

{error}

</p>

}







{

success &&

<p className="bg-green-500/20 text-green-400 p-3 rounded mb-4 text-center">

{success}

</p>

}







<input

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none"

/>







<input

name="email"

type="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none"

/>







<input

name="password"

type="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none"

/>







<input

name="password_confirmation"

type="password"

placeholder="Confirm Password"

value={formData.password_confirmation}

onChange={handleChange}

className="w-full p-3 mb-5 bg-gray-800 rounded-lg outline-none"

/>







<button

disabled={loading}

className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-lg font-semibold"

>


{

loading

?

"Creating Account..."

:

"Register"

}


</button>







<div className="text-center mt-5 text-gray-400">


Already have an account?


<Link

to="/login"

className="text-orange-500 ml-2 hover:underline"

>

Login

</Link>


</div>






</form>



</div>


)


}



export default Register;