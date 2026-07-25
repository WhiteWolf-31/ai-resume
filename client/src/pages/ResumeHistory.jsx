import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function ResumeHistory(){

    const [resumes,setResumes] = useState([]);

    const navigate = useNavigate();



    useEffect(()=>{

        fetchHistory();

    },[]);





    const fetchHistory = async()=>{


        try{


            const token = localStorage.getItem("token");


            const response = await api.get(

                "/resume/history",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );


            console.log(
                "History:",
                response.data
            );


            setResumes(
                response.data.resumes
            );


        }

        catch(error){

            console.log(error.response);

        }


    };






    // ✅ DELETE FUNCTION MOVED HERE

    const deleteResume = async(id)=>{


        const confirmDelete = window.confirm(

            "Are you sure you want to delete this resume?"

        );


        if(!confirmDelete) return;



        try{


            const token = localStorage.getItem("token");



            await api.delete(

                `/resume/${id}`,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            setResumes(

                resumes.filter(

                    resume => resume.id !== id

                )

            );



            alert("Resume deleted successfully");


        }

        catch(error){


            console.log(error.response);


            alert("Delete failed");


        }


    };







    return(


        <div className="min-h-screen bg-black text-white p-10">


            <div className="max-w-6xl mx-auto">


                <h1 className="text-4xl font-bold mb-8">

                    Resume History

                </h1>




                {

                resumes.length > 0 ?


                (

                    <div className="space-y-6">


                    {

                    resumes.map((resume)=>(


                        <div

                        key={resume.id}

                        className="bg-gray-900 rounded-2xl p-6 flex justify-between items-center"

                        >



                            <div>


                                <h2 className="text-xl font-semibold">

                                    {resume.file_name}

                                </h2>



                                <p className="text-gray-400 mt-2">

                                    Uploaded:

                                    {" "}

                                    {

                                    new Date(

                                        resume.created_at

                                    ).toLocaleDateString()

                                    }

                                </p>


                            </div>






                            <div className="flex items-center gap-6">



                                <div>


                                    <p className="text-orange-500 text-2xl font-bold">


                                    {

                                    resume.analysis

                                    ?

                                    resume.analysis.ats_score+"%"

                                    :

                                    "N/A"

                                    }


                                    </p>


                                    <p className="text-gray-400">

                                        ATS Score

                                    </p>


                                </div>







                                <button

                                onClick={()=>navigate(

                                    `/dashboard/${resume.id}`

                                )}

                                className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg"

                                >

                                    View Report

                                </button>







                                <button

                                onClick={()=>deleteResume(resume.id)}

                                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"

                                >

                                    Delete

                                </button>

                                <button

onClick={()=>window.open(

    `http://127.0.0.1:8000/storage/${resume.file_path}`,

    "_blank"

)}

className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"

>

Preview PDF

</button>



                            </div>



                        </div>


                    ))

                    }


                    </div>


                )


                :


                (

                    <p className="text-gray-400">

                        No resumes uploaded yet.

                    </p>

                )


                }


            </div>


        </div>


    )


}


export default ResumeHistory;