import React, { useContext, Suspense } from "react";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ErrorPage from "./pages/errorpage/ErrorPage";
import { AuthContext } from "./context/AuthContext";
// import Skeleton from "./components/skeleton/Skeleton";

const LazyMessnger = React.lazy(() => import("./pages/messenger/Messenger"));
const LazyProfile = React.lazy(() => import("./pages/profile/Profile"));

export default function App() {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="messenger"
        element={
          currentUser ? (
            <Suspense fallback={<h2>Loading...</h2>}>
              <LazyMessnger />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="profile/:username"
        element={
          currentUser ? (
            <Suspense fallback={<h2>Loading...</h2>}>
              <LazyProfile />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="register"
        element={!currentUser ? <Register /> : <Navigate to="/" />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
