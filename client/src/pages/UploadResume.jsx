import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadResume(){

    const navigate = useNavigate();


    const [file,setFile] = useState(null);
    const [loading,setLoading] = useState(false);
    const [currentStep,setCurrentStep] = useState(0);
    const [dragActive,setDragActive] = useState(false);



    const steps = [
        "Uploading your resume",
        "Extracting resume information",
        "Checking ATS compatibility",
        "Generating AI recommendations"
    ];



    const handleDrop = (e)=>{

        e.preventDefault();

        setDragActive(false);


        const uploadedFile = e.dataTransfer.files[0];


        if(uploadedFile?.type === "application/pdf"){

            setFile(uploadedFile);

        }
        else{

            alert("Only PDF files are allowed");

        }

    };



    const handleDragOver=(e)=>{

        e.preventDefault();

        setDragActive(true);

    };



    const handleDragLeave=()=>{

        setDragActive(false);

    };




    const handleUpload = async(e)=>{

        e.preventDefault();



        if(!file){

            alert("Please select your resume");

            return;

        }



        const formData = new FormData();


        formData.append(
            "resume",
            file
        );



        let interval = null;



        try{


            setLoading(true);

            setCurrentStep(0);



            interval = setInterval(()=>{


                setCurrentStep(prev=>{


                    if(prev < steps.length-1){

                        return prev+1;

                    }


                    return prev;


                });


            },2500);





            const token = localStorage.getItem("token");



            const response = await api.post(

                "/resume/upload",

                formData,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`,


                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            console.log(
                "Upload Success:",
                response.data
            );



            clearInterval(interval);



            localStorage.setItem(

                "resume_id",

                response.data.resume.id

            );



            alert(
                "Resume uploaded and analyzed successfully"
            );


            navigate("/dashboard");


        }


        catch(error){


            console.log(
                "UPLOAD ERROR:",
                error
            );


            console.log(
                error.response?.data
            );


            alert(

                error.response?.data?.message ||

                "Upload failed"

            );


        }


        finally{


            if(interval){

                clearInterval(interval);

            }


            setLoading(false);


        }


    };





    return(

        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">


            <form

            onSubmit={handleUpload}

            className="bg-gray-900 p-8 rounded-3xl w-full max-w-md"

            >



                <h1 className="text-3xl font-bold text-center mb-6">

                    Upload Resume

                </h1>





                <div

                onDrop={handleDrop}

                onDragOver={handleDragOver}

                onDragLeave={handleDragLeave}


                className={`border-2 border-dashed p-10 rounded-2xl text-center cursor-pointer

                ${
                    dragActive

                    ?

                    "border-orange-500 bg-orange-500/10"

                    :

                    "border-gray-700"

                }

                `}


                >



                    <input

                    type="file"

                    accept=".pdf"

                    id="resume"

                    hidden

                    onChange={(e)=>setFile(e.target.files[0])}

                    />




                    <label htmlFor="resume" className="cursor-pointer">


                        <p className="text-xl">

                            Drag & Drop your Resume

                        </p>


                        <p className="text-gray-400 mt-2">

                            or click to select PDF

                        </p>


                    </label>




                    {

                    file && (

                        <p className="mt-5 text-orange-400">

                            📄 {file.name}

                        </p>

                    )

                    }



                </div>




                {

                loading && (

                    <div className="mt-6 bg-gray-800 p-5 rounded-xl">


                    <h2 className="text-orange-400 font-bold mb-4">

                        ResumeAI Processing

                    </h2>



                    {

                    steps.map((step,index)=>(


                        <div

                        key={index}

                        className={`mb-3 ${
                            
                            index <= currentStep

                            ?

                            "text-green-400"

                            :

                            "text-gray-500"

                        }`}

                        >

                        {
                            index <= currentStep
                            ?
                            "✓"
                            :
                            "○"
                        }


                        {" "}

                        {step}


                        </div>


                    ))

                    }


                    </div>

                )

                }






                <button

                disabled={loading}

                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 p-3 rounded-lg font-semibold disabled:opacity-50"

                >


                {

                    loading

                    ?

                    "AI Analyzing..."

                    :

                    "Upload Resume"

                }


                </button>




            </form>


        </div>

    );


}


export default UploadResume;