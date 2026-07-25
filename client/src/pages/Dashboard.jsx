import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import ResumeComparison from "../components/ResumeComparison";


function Dashboard(){

    const { id } = useParams();


    const [analysis,setAnalysis] = useState(null);
    const [usage,setUsage] = useState(null);
    const [resumeCount,setResumeCount] = useState(0);
    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        const fetchData = async()=>{


            try{


                const token = localStorage.getItem("token");



                let response;



                if(id){


                    response = await api.get(

                        `/resume/analyze/${id}`,

                        {
                            headers:{
                                Authorization:`Bearer ${token}`
                            }
                        }

                    );


                }
                else{


                    response = await api.get(

                        "/dashboard",

                        {
                            headers:{
                                Authorization:`Bearer ${token}`
                            }
                        }

                    );


                }



                setAnalysis(
                    response.data.analysis
                );






                // GET AI USAGE

                const usageResponse = await api.get(

                    "/usage",

                    {

                        headers:{
                            Authorization:`Bearer ${token}`
                        }

                    }

                );



                console.log(
                    "Usage:",
                    usageResponse.data
                );


                setUsage(
                    usageResponse.data
                );







                // GET CV COUNT

                const historyResponse = await api.get(

                    "/resume/history",

                    {

                        headers:{
                            Authorization:`Bearer ${token}`
                        }

                    }

                );



                setResumeCount(

                    historyResponse.data.resumes.length

                );



            }


            catch(error){


                console.log(
                    error.response?.data
                );


            }


            finally{


                setLoading(false);


            }


        };



        fetchData();



    },[id]);







    const downloadReport = ()=>{


        if(!analysis){

            alert("No analysis available");

            return;

        }



        const doc = new jsPDF();


        doc.text(
            "ResumeAI Report",
            20,
            20
        );


        doc.text(

            `ATS Score : ${analysis.ats_score}%`,

            20,

            40

        );



        doc.save(
            "ResumeAI_Report.pdf"
        );


    };







    if(loading){


        return(

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                Loading Dashboard...

            </div>

        );


    }







return(


<div className="min-h-screen bg-black text-white p-10">


<div className="max-w-6xl mx-auto">



<h1 className="text-4xl font-bold">

ResumeAI Dashboard

</h1>



<p className="text-gray-400 mt-2">

AI powered resume analysis dashboard

</p>







{/* DASHBOARD CARDS */}



<div className="grid md:grid-cols-3 gap-6 mt-8">





{/* ATS SCORE */}


<div className="bg-gray-900 p-6 rounded-2xl">


<h2 className="text-gray-400">

Latest ATS Score

</h2>


<p className="text-orange-500 text-5xl font-bold mt-3">

{analysis?.ats_score || 0}%

</p>


</div>








{/* UPLOADED CV */}


<div className="bg-gray-900 p-6 rounded-2xl">


<h2 className="text-gray-400">

Uploaded CVs

</h2>


<p className="text-orange-500 text-5xl font-bold mt-3">

{resumeCount}

</p>


</div>








{/* AI USAGE */}


<div className="bg-gray-900 p-6 rounded-2xl">


<h2 className="text-gray-400">

AI Usage

</h2>



<p className="text-orange-500 text-5xl font-bold mt-3">


{

usage

?

`${usage.analysis_used}/${usage.analysis_limit}`

:

"0/0"

}


</p>



<p className="text-gray-400 mt-2">

Analyses Used

</p>



</div>




</div>









{/* AI USAGE BAR */}



{

usage && (


<div className="bg-gray-900 mt-8 p-6 rounded-2xl">


<h2 className="text-xl font-bold">

AI Analysis Usage

</h2>




<div className="mt-4">


Used:

{" "}

{usage.analysis_used}

/

{usage.analysis_limit}


</div>





<div className="bg-gray-800 h-3 rounded-full mt-5">


<div


className="bg-orange-500 h-3 rounded-full"


style={{


width:

`${

Math.min(

(usage.analysis_used /

usage.analysis_limit)

*100,

100

)

}%`


}}


/>



</div>




</div>


)

}








{

analysis ?


(

<div className="mt-10 space-y-8">



<button

onClick={downloadReport}

className="bg-orange-500 px-6 py-3 rounded-xl"

>

Download AI Report

</button>





<div className="bg-gray-900 p-8 rounded-2xl">


<h2 className="text-2xl font-bold">

Resume Summary

</h2>


<p className="text-gray-300 mt-4">

{analysis.summary}

</p>


</div>








<div className="bg-gray-900 p-8 rounded-2xl">


<h2 className="text-xl font-bold">

Skills

</h2>



{

analysis.skills?.map((skill,index)=>(


<span

key={index}

className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full m-2"

>

{skill}

</span>


))

}


</div>







<div className="bg-gray-900 p-8 rounded-2xl">


<h2 className="text-xl text-green-400 font-bold">

Strengths

</h2>


{

analysis.strengths?.map((item,index)=>(


<p

key={index}

className="text-gray-300 mt-3"

>

✓ {item}

</p>


))

}


</div>







<div className="bg-gray-900 p-8 rounded-2xl">


<h2 className="text-xl text-red-400 font-bold">

Weaknesses

</h2>


{

analysis.weaknesses?.map((item,index)=>(


<p

key={index}

className="text-gray-300 mt-3"

>

• {item}

</p>


))

}


</div>







<div className="bg-gray-900 p-8 rounded-2xl">


<h2 className="text-xl font-bold">

AI Recommendations

</h2>


{

analysis.suggestions?.map((item,index)=>(


<p

key={index}

className="text-gray-300 mt-3"

>

→ {item}

</p>


))

}


</div>






<ResumeComparison />


</div>


)


:

(

<p className="text-gray-400 mt-10">

Upload your resume first.

</p>


)

}





</div>


</div>


);


}


export default Dashboard;