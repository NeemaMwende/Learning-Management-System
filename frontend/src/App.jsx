import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { CartContext, ProfileContext } from "./views/plugin/Context";
import apiInstance from "./utils/axios";
import CartId from "./views/plugin/CartId";
import useAxios from "./utils/useAxios";
import UserData from "./views/plugin/UserData";

import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";

// Lazy-loaded components for code splitting
const Register = lazy(() => import("../src/views/auth/Register"));
const Login = lazy(() => import("../src/views/auth/Login"));
const Logout = lazy(() => import("./views/auth/Logout"));
const ForgotPassword = lazy(() => import("./views/auth/ForgotPassword"));
const CreateNewPassword = lazy(() => import("./views/auth/CreateNewPassword"));
const Index = lazy(() => import("./views/base/Index"));
const CourseDetail = lazy(() => import("./views/base/CourseDetail"));
const Cart = lazy(() => import("./views/base/Cart"));
const Checkout = lazy(() => import("./views/base/Checkout"));
const Success = lazy(() => import("./views/base/Success"));
const Search = lazy(() => import("./views/base/Search"));

const StudentDashboard = lazy(() => import("./views/student/Dashboard"));
const StudentCourses = lazy(() => import("./views/student/Courses"));
const StudentCourseDetail = lazy(() => import("./views/student/CourseDetail"));
const Wishlist = lazy(() => import("./views/student/Wishlist"));
const StudentProfile = lazy(() => import("./views/student/Profile"));
const StudentChangePassword = lazy(() => import("./views/student/ChangePassword"));

const Dashboard = lazy(() => import("./views/instructor/Dashboard"));
const Courses = lazy(() => import("./views/instructor/Courses"));
const Review = lazy(() => import("./views/instructor/Review"));
const Students = lazy(() => import("./views/instructor/Students"));
const Earning = lazy(() => import("./views/instructor/Earning"));
const Orders = lazy(() => import("./views/instructor/Orders"));
const Coupon = lazy(() => import("./views/instructor/Coupon"));
const TeacherNotification = lazy(() => import("./views/instructor/TeacherNotification"));
const QA = lazy(() => import("./views/instructor/QA"));
const ChangePassword = lazy(() => import("./views/instructor/ChangePassword"));
const Profile = lazy(() => import("./views/instructor/Profile"));
const CourseCreate = lazy(() => import("./views/instructor/CourseCreate"));
const CourseEdit = lazy(() => import("./views/instructor/CourseEdit"));

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await apiInstance.get(`course/cart-list/${CartId()}/`);
        setCartCount(res.data?.length || 0);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const user_id = UserData()?.user_id;
        if (user_id) {
          const res = await useAxios().get(`user/profile/${user_id}/`);
          setProfile(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    Promise.all([fetchCartCount(), fetchUserProfile()])
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <ProfileContext.Provider value={[profile, setProfile]}>
        <BrowserRouter>
          <MainWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/register/" element={<Register />} />
                <Route path="/login/" element={<Login />} />
                <Route path="/logout/" element={<Logout />} />
                <Route path="/forgot-password/" element={<ForgotPassword />} />
                <Route path="/create-new-password/" element={<CreateNewPassword />} />

                {/* Base Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/course-detail/:slug/" element={<CourseDetail />} />
                <Route path="/cart/" element={<Cart />} />
                <Route path="/checkout/:order_oid/" element={<Checkout />} />
                <Route path="/payment-success/:order_oid/" element={<Success />} />
                <Route path="/search/" element={<Search />} />

                {/* Student Routes */}
                <Route
                  path="/student/dashboard/"
                  element={
                    <PrivateRoute>
                      <StudentDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/student/courses/"
                  element={
                    <PrivateRoute>
                      <StudentCourses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/student/courses/:enrollment_id/"
                  element={
                    <PrivateRoute>
                      <StudentCourseDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/student/wishlist/"
                  element={
                    <PrivateRoute>
                      <Wishlist />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/student/profile/"
                  element={
                    <PrivateRoute>
                      <StudentProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/student/change-password/"
                  element={
                    <PrivateRoute>
                      <StudentChangePassword />
                    </PrivateRoute>
                  }
                />

                {/* Teacher Routes */}
                <Route path="/instructor/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/instructor/courses/" element={<PrivateRoute><Courses /></PrivateRoute>} />
                <Route path="/instructor/reviews/" element={<PrivateRoute><Review /></PrivateRoute>} />
                <Route path="/instructor/students/" element={<PrivateRoute><Students /></PrivateRoute>} />
                <Route path="/instructor/earning/" element={<PrivateRoute><Earning /></PrivateRoute>} />
                <Route path="/instructor/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/instructor/coupon/" element={<PrivateRoute><Coupon /></PrivateRoute>} />
                <Route path="/instructor/notifications/" element={<PrivateRoute><TeacherNotification /></PrivateRoute>} />
                <Route path="/instructor/question-answer/" element={<PrivateRoute><QA /></PrivateRoute>} />
                <Route path="/instructor/change-password/" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
                <Route path="/instructor/profile/" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/instructor/create-course/" element={<PrivateRoute><CourseCreate /></PrivateRoute>} />
                <Route path="/instructor/edit-course/:course_id/" element={<PrivateRoute><CourseEdit /></PrivateRoute>} />
              </Routes>
            </Suspense>
          </MainWrapper>
        </BrowserRouter>
      </ProfileContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
