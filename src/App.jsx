import { Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import { LoginProvider } from "./context/LoginContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AdminLayout from "./components/AdminLayout"
import AllCourses from "./pages/AllCourses"
import CourseForm from "./pages/CourseForm"
import AllVideos from "./pages/AllVideos"
import VideoForm from "./pages/VideoForm"
import AllStudents from "./pages/AllStudents"
import CourseDetails from "./Pages/CourseDetails"
import { CourseRegistration } from "./pages/CourseRegistration"
import StudentDashboard from './pages/StudentDashboard';
import { MyCourse } from "./pages/MyCourse"
import CourseVideos from "./pages/CourseVideos"
import ChangePassword from "./components/ChangePassword"
import About from "./pages/About"


function App() {
  return (
    <LoginProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:id" element={<CourseRegistration />} />
         <Route path="/about" element={<About />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/my-courses" element={<MyCourse />} />
        <Route path="/student/course-videos/:id" element={<CourseVideos />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Home />} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="add-course" element={<CourseForm />} />
          <Route path="course/update/:id" element={<CourseForm />} />
          <Route path="videos" element={<AllVideos />} />
          <Route path="add-video" element={<VideoForm />} />
          <Route path="video/update/:id" element={<VideoForm />} />
          <Route path="students" element={<AllStudents />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </LoginProvider>

  )
}

export default App