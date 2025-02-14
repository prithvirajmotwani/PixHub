import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useMenuContext } from "../contexts/MenuContext";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import PhotoDisplay from "../components/PhotoDisplay/PhotoDisplay";
import "../styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/logout-slice";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { getUserData } from "../redux/query/user-slice";
const Dashboard = () => {
  const { success, message, error } = useSelector((state) => state.userLogout);
  const { user } = useSelector((state) => state.userLogin);
  const { data } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const { authUser, setIsLoggedIn, setAuthUser } = useAuth();
  const { activeMenu } = useMenuContext();
  const [mainContentWidth, setMainContentWidth] = useState("calc(100%-288px)"); // Initial width calculation
  // const navigate = useNavigate();
  const userId = user?._id;
  // console.log(userId);

  // useEffect(() => {
  //   console.log("object");
  // }, []);

  useEffect(() => {
    dispatch(getUserData(userId));
    // console.log("object");
    setIsLoggedIn(true);
    setAuthUser(user?.username);
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (activeMenu) {
        const calculatedWidth = `calc(${windowWidth}px - 288px)`;
        setMainContentWidth(calculatedWidth);
      } else {
        const calculatedWidth = `calc(${windowWidth}px)`;
        setMainContentWidth(calculatedWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("successfully logout");
      setAuthUser(null);
      setIsLoggedIn(false);
      window.location.href = "/home";
    }
    if (error) {
      toast.error(error.msg || error);
    }
  }, [dispatch, error, success]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // console.log(data);
  return (
    <>
      {data.images && (
        <div className="dashboard">
          {/* Sidebar */}
          <div className="sidebar">
            <Sidebar
              storageUsage={data.storageRemaining}
              networkUsage={data.usageRemaining}
            />
          </div>
          {/* Rightbar*/}
          <div
            className={activeMenu ? "main" : "main main-expanded"}
            style={{ width: mainContentWidth }}
          >
            {/* Navbar */}
            <div className="navbar">
              <Navbar username={authUser} handleLogout={handleLogout} />
            </div>
            <div className="photo__display">
              <PhotoDisplay images={data.images} userId={user?._id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
