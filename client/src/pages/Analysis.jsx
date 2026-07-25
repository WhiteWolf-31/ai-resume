import React, { useEffect, useState } from "react";
import axios from "axios";

function Analysis() {

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchAnalysis = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/resume/analyze/1",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );


                setAnalysis(response.data.analysis);

            } catch(error){

                console.log(error);

            } finally {

                setLoading(false);

            }

        };


        fetchAnalysis();

    }, []);



    if(loading){

        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        );

    }



    return (

        <div className="min-h-screen bg-gray-100 p-10">


            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">


                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Resume Analysis
                </h1>



                {/* ATS Score */}

                <div className="bg-orange-100 p-5 rounded-lg mb-6">

                    <h2 className="text-xl font-semibold">
                        ATS Score
                    </h2>

                    <p className="text-4xl font-bold text-orange-600 mt-2">
                        {analysis?.ats_score}%
                    </p>

                </div>



                {/* Summary */}

                <div className="mb-6">

                    <h2 className="text-xl font-semibold mb-2">
                        Summary
                    </h2>

                    <p className="text-gray-700">
                        {analysis?.summary}
                    </p>

                </div>




                {/* Skills */}

                <div className="mb-6">

                    <h2 className="text-xl font-semibold mb-3">
                        Skills
                    </h2>


                    <div className="flex flex-wrap gap-3">

                    {
                        analysis?.skills?.map((skill,index)=>(

                            <span
                            key={index}
                            className="bg-black text-white px-4 py-2 rounded-full"
                            >
                                {skill}
                            </span>

                        ))
                    }

                    </div>

                </div>





                {/* Strengths */}

                <div className="mb-6">

                    <h2 className="text-xl font-semibold">
                        Strengths
                    </h2>


                    <ul className="list-disc ml-6 mt-2">

                    {
                        analysis?.strengths?.map((item,index)=>(

                            <li key={index}>
                                {item}
                            </li>

                        ))
                    }

                    </ul>


                </div>





                {/* Weaknesses */}

                <div className="mb-6">

                    <h2 className="text-xl font-semibold">
                        Weaknesses
                    </h2>


                    <ul className="list-disc ml-6 mt-2">

                    {
                        analysis?.weaknesses?.map((item,index)=>(

                            <li key={index}>
                                {item}
                            </li>

                        ))
                    }

                    </ul>

                </div>






                {/* Suggestions */}

                <div>

                    <h2 className="text-xl font-semibold">
                        Suggestions
                    </h2>


                    <ul className="list-disc ml-6 mt-2">

                    {
                        analysis?.suggestions?.map((item,index)=>(

                            <li key={index}>
                                {item}
                            </li>

                        ))
                    }

                    </ul>

                </div>



            </div>


        </div>

    );


}


export default Analysis;