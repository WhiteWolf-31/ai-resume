import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeHistory from "./pages/ResumeHistory";
import Profile from "./pages/Profile";


import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";



function App(){


    return (

        <BrowserRouter>


            <Routes>


                {/* Default Route */}

                <Route

                    path="/"

                    element={<Navigate to="/login" />}

                />




                {/* Public Routes */}


                <Route

                    path="/login"

                    element={<Login/>}

                />



                <Route

                    path="/register"

                    element={<Register/>}

                />






                {/* Dashboard */}


                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <>

                                <Navbar/>

                                <Dashboard/>

                            </>

                        </ProtectedRoute>

                    }

                />





                {/* Dashboard Report */}

                <Route

                    path="/dashboard/:id"

                    element={

                        <ProtectedRoute>

                            <>

                                <Navbar/>

                                <Dashboard/>

                            </>

                        </ProtectedRoute>

                    }

                />







                {/* Upload Resume */}


                <Route

                    path="/upload"

                    element={

                        <ProtectedRoute>

                            <>

                                <Navbar/>

                                <UploadResume/>

                            </>

                        </ProtectedRoute>

                    }

                />







                {/* Resume History */}


                <Route

                    path="/history"

                    element={

                        <ProtectedRoute>

                            <>

                                <Navbar/>

                                <ResumeHistory/>

                            </>

                        </ProtectedRoute>

                    }

                />







                {/* Profile */}


                <Route

                    path="/profile"

                    element={

                        <ProtectedRoute>

                            <>

                                <Navbar/>

                                <Profile/>

                            </>

                        </ProtectedRoute>

                    }

                />








                {/* Unknown Routes */}


                <Route

                    path="*"

                    element={<Navigate to="/login" />}

                />



            </Routes>


        </BrowserRouter>

    );


}



export default App;