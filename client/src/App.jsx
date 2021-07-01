import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./pages/Header";
import Pages from "./pages/Pages";
import Footer from "./pages/Footer";
import Alert from "./components/Alert";
import { alertReset } from "./redux/actions/alertAction";
import { refreshToken } from "./redux/actions/authAction";

const App = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (alert.msg) {
      setTimeout(() => {
        dispatch(alertReset());
      }, 10000);
    }
  }, [dispatch, alert.msg]);

  return (
    <Router>
      <Alert loading={alert.loading} msg={alert.msg} />
      <TempStyle>
        <Header />
        <Pages />
        <Footer />
      </TempStyle>
    </Router>
  );
};

export default App;

const TempStyle = styled.div`
  /* height: 5000px; */
  margin: auto;
  border-radius: 10px;
`;
