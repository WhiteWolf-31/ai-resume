import { useEffect, useState } from "react";
import api from "../services/api";


function Profile(){

    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        const fetchProfile = async()=>{


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


                setProfile(

                    response.data

                );


            }


            catch(error){


                console.log(error.response);


            }


            finally{


                setLoading(false);


            }


        };


        fetchProfile();


    },[]);





    if(loading){


        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                Loading Profile...

            </div>

        )

    }





    return(

        <div className="min-h-screen bg-black text-white p-10">


            <div className="max-w-5xl mx-auto">



                <h1 className="text-4xl font-bold">

                    My Profile

                </h1>


                <p className="text-gray-400 mt-2">

                    Manage your ResumeAI account

                </p>




                {/* USER CARD */}


                <div className="mt-8 bg-gray-900 rounded-3xl p-8">


                    <h2 className="text-2xl font-bold mb-6">

                        Account Information

                    </h2>



                    <p className="text-gray-300">

                        Name:

                        <span className="ml-2 text-white font-semibold">

                            {profile.user.name}

                        </span>

                    </p>



                    <p className="text-gray-300 mt-3">

                        Email:

                        <span className="ml-2 text-white font-semibold">

                            {profile.user.email}

                        </span>

                    </p>



                    <p className="text-gray-300 mt-3">

                        Joined:

                        <span className="ml-2 text-white font-semibold">

                            {
                            new Date(
                            profile.user.created_at
                            ).toLocaleDateString()
                            }

                        </span>

                    </p>


                </div>







                {/* STATISTICS */}


                <div className="grid md:grid-cols-3 gap-6 mt-8">


                    <div className="bg-gray-900 rounded-3xl p-6">


                        <h3 className="text-gray-400">

                            Total Resumes

                        </h3>


                        <p className="text-4xl font-bold text-orange-500 mt-3">

                            {profile.statistics.total_resumes}

                        </p>


                    </div>





                    <div className="bg-gray-900 rounded-3xl p-6">


                        <h3 className="text-gray-400">

                            AI Used

                        </h3>


                        <p className="text-4xl font-bold text-orange-500 mt-3">

                            {
                            profile.statistics.analysis_used
                            }

                            /
                            
                            {
                            profile.statistics.analysis_limit
                            }

                        </p>


                    </div>





                    <div className="bg-gray-900 rounded-3xl p-6">


                        <h3 className="text-gray-400">

                            Remaining

                        </h3>


                        <p className="text-4xl font-bold text-green-400 mt-3">

                            {
                            profile.statistics.remaining
                            }

                        </p>


                    </div>


                </div>






                {/* PLAN */}


                <div className="mt-8 bg-gray-900 rounded-3xl p-8">


                    <h2 className="text-2xl font-bold">

                        Current Plan

                    </h2>


                    <p className="text-orange-400 text-xl mt-3">

                        Free Plan

                    </p>


                    <p className="text-gray-400 mt-2">

                        10 AI resume analyses per month

                    </p>


                </div>




            </div>


        </div>


    )

}


export default Profile;