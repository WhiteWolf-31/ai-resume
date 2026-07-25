import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Navbar(){

    const navigate = useNavigate();

    const [user,setUser] = useState(null);
    const [usage,setUsage] = useState(null);
    const [menuOpen,setMenuOpen] = useState(false);



    useEffect(()=>{


        const fetchData = async()=>{


            try{

                const token = localStorage.getItem("token");


                const response = await api.get(

                    "/profile",

                    {

                        headers:{

                            Authorization:`Bearer ${token}`

                        }

                    }

                );


                setUser(response.data.user);

                setUsage(response.data.statistics);


            }

            catch(error){

                console.log(error.response);

            }


        };


        fetchData();


    },[]);






    const logout = ()=>{


        localStorage.removeItem("token");

        localStorage.removeItem("resume_id");

        navigate("/login");


    };






    return(


        <nav className="bg-gray-950 text-white px-6 py-5 border-b border-gray-800">


            <div className="flex justify-between items-center">



                {/* LOGO */}


                <Link

                to="/dashboard"

                className="text-2xl font-bold text-orange-500"

                >

                    ResumeAI

                </Link>






                {/* DESKTOP MENU */}


                <div className="hidden md:flex items-center gap-8">


                    <Link to="/dashboard">

                        Dashboard

                    </Link>


                    <Link to="/upload">

                        Upload

                    </Link>


                    <Link to="/history">

                        History

                    </Link>


                    <Link to="/profile">

                        Profile

                    </Link>


                </div>







                {/* USER */}


                <div className="hidden md:flex items-center gap-5">


                    {

                    user &&

                    <div className="text-right">


                        <p className="font-semibold">

                            {user.name}

                        </p>


                    </div>

                    }



                    <button

                    onClick={logout}

                    className="bg-red-600 px-5 py-2 rounded-lg"

                    >

                        Logout

                    </button>


                </div>








                {/* MOBILE BUTTON */}


                <button

                onClick={()=>setMenuOpen(!menuOpen)}

                className="md:hidden text-3xl"

                >

                    ☰

                </button>



            </div>









            {/* MOBILE MENU */}


            {

            menuOpen &&


            <div className="md:hidden mt-6 space-y-5">


                <Link

                onClick={()=>setMenuOpen(false)}

                to="/dashboard"

                className="block"

                >

                    Dashboard

                </Link>



                <Link

                onClick={()=>setMenuOpen(false)}

                to="/upload"

                className="block"

                >

                    Upload

                </Link>



                <Link

                onClick={()=>setMenuOpen(false)}

                to="/history"

                className="block"

                >

                    History

                </Link>



                <Link

                onClick={()=>setMenuOpen(false)}

                to="/profile"

                className="block"

                >

                    Profile

                </Link>




                <button

                onClick={logout}

                className="bg-red-600 px-5 py-2 rounded-lg"

                >

                    Logout

                </button>



            </div>


            }


        </nav>


    )

}


export default Navbar;