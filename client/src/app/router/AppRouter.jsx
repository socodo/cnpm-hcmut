import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import MainLayout from "../../components/layout/MainLayout";
import LoginPage from "@/features/login/LoginPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import ProgramPage from "../../features/program/ProgramPage";
import ProtectedRoute from "./ProtectedRouter";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ExplorePage from "../../features/explore/ExplorePage.jsx";
import TutorListPage from "../../features/explore/TutorListPage.jsx";
import TutorProfilePage from "../../features/explore/TutorProfilePage.jsx";
import AdminDashboard from "../../features/admin/AdminDashboard";
import AdminLayout from "../../features/admin/AdminLayout";
import SemesterCoursesPage from "../../features/admin/SemesterCoursesPage";
import CourseTeachersPage from "../../features/admin/CourseTeachersPage";
import MySchedulePage from "../../features/tutor/pages/MySchedulePage";
import ManageSchedulePage from "../../features/tutor/pages/ManageSchedulePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="programs" element={
          <ProtectedRoute>
            <ProgramPage />
          </ProtectedRoute>
        } />
        <Route
          path="explore"
          element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="explore/:subjectId"
          element={
            <ProtectedRoute>
              <TutorListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tutor-profile/:tutorId"
          element={
            <ProtectedRoute>
              <TutorProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-schedule"
          element={
            <ProtectedRoute>
              <MySchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-schedule"
          element={
            <ProtectedRoute>
              <ManageSchedulePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes using MainLayout header/footer */}
        <Route
          path="admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="semester/:id/courses"
            element={<SemesterCoursesPage />}
          />
          <Route
            path="semester/:id/course/:courseId/teachers"
            element={<CourseTeachersPage />}
          />
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;
