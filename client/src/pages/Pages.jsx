import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./Login";
import Register from "./Register";
import Courses from "./courses/Courses";
import Community from "./community/Community";
import About from "./about/About";
import Admin from "./admin/Admin";
import CourseDetail from "./detailCourse/CourseDetail";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import ActivateEmail from "./auth/ActivateEmail";
import SendMailResetPassword from "./auth/SendMailResetPassword";
import ResetPassword from "./auth/ResetPassword";
import ResignedUser from "./profile/ResignedUser";

const Pages = () => {
  const { auth } = useSelector((state) => state);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/courses" exact component={Courses} />
      <Route path="/courses/:id" exact component={CourseDetail} />
      <Route path="/community" exact component={Community} />
      <Route path="/about" exact component={About} />
      <Route
        path="/admin"
        exact
        component={auth.token && auth.user?.role === 1 && Admin}
      />
      <Route path="/user/resigned_user" exact component={ResignedUser} />
      <Route path="/user/:username" exact component={Profile} />
      <Route
        path="/user/:username/edit"
        exact
        component={auth.token && EditProfile}
      />
      <Route
        path="/auth/activate/:activation_token"
        exact
        component={ActivateEmail}
      />
      <Route path="/forgot_pw" exact component={SendMailResetPassword} />
      <Route path="/reset_pw/:token" exact component={ResetPassword} />
    </Switch>
  );
};

export default Pages;
