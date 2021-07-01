import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./Login";
import Register from "./Register";
import Courses from "./courses/Courses";
import Community from "./community/Community";
import About from "./about/About";
import Admin from "./admin/Admin";
import CourseDetail from "./courses/CourseDetail";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/courses" exact component={Courses} />
      <Route path="/courses/:id" exact component={CourseDetail} />
      <Route path="/community" exact component={Community} />
      <Route path="/about" exact component={About} />
      <Route path="/admin" exact component={Admin} />
    </Switch>
  );
};

export default Pages;
