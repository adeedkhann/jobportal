import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./layout/MainLayout.jsx";
import JobSearchSection from "./pages/JobSearchSection";
import StudentProfile from "./student/StudentProfile";
import PostJob from "./company/PostJob";
import StudentDashboard from "./student/StudentDashboard";
import ProtectedRoute from "./layout/ProtectedRoute";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";
import { useSelector } from "react-redux";
import RecruiterProfile from "./company/RecruiterProfile";
import CompanyDashboard from "./company/CompanyDashboard.jsx";
import CompanySetup from "./company/CompanySetup";
import CompanyCreate from "./company/CompanyCreate";
import JobDetails from "./pages/JobDetails";
import Applicants from "./pages/Applicants";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // Home Page
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <JobSearchSection />,
      },
      {
        path: "/job/description/:id",
        element: <JobDetails />,
      },
      {
        path: "/seekerprofile",
        element: (
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/studentdashboard",
        element: (
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postjob",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterprofile",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterdashboard",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <CompanyDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/updatecompany/:id",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/registercompany",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <CompanyCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterdashboard/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <Applicants />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector((store) => store.auth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get(
          "https://jobportal-1-nhtb.onrender.com/api/v1/user/getprofile",
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          dispatch(setUser(res.data.data));
        }
      } catch (error) {
        console.log("No session found");
        dispatch(setUser(null));
      }
    };
    initAuth();
  }, [dispatch]);

  if (isRefreshing) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
