import {useEffect,useState} from "react";
import api from "../services/api";


function ResumeComparison(){


const [comparison,setComparison]=useState(null);



useEffect(()=>{


const fetchComparison=async()=>{


const token=localStorage.getItem("token");


const response=await api.get(

"/resume/comparison",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setComparison(
response.data.comparison
);


};


fetchComparison();


},[]);





if(!comparison){

return null;

}




const data=comparison.improvements;



return(


<div className="bg-gray-900 p-8 rounded-3xl mt-8">


<h2 className="text-2xl font-bold">

CV Improvement Report 🚀

</h2>



<div className="mt-5">


<h3 className="text-orange-400">

ATS Score Improvement

</h3>


<p className="text-4xl font-bold">

+

{data.ats_improvement}%

</p>


</div>





<h3 className="mt-6 text-green-400">

New Skills Added

</h3>


{

data.new_skills.map(
(skill,index)=>(


<p key={index}>

✓ {skill}

</p>


))

}






<h3 className="mt-6 text-blue-400">

Removed Weaknesses

</h3>


{

data.removed_weaknesses.map(
(item,index)=>(


<p key={index}>

✓ {item}

</p>


))

}





<h3 className="mt-6 text-purple-400">

AI Improvements

</h3>


{

data.new_recommendations.map(
(item,index)=>(


<p key={index}>

→ {item}

</p>


))

}



</div>


)


}


export default ResumeComparison;