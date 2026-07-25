import Navbar from "./Navbar";


function Layout({children}){


    return(

        <div className="min-h-screen bg-black">


            <Navbar/>


            {children}


        </div>

    )

}


export default Layout;