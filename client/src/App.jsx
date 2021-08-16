import React, { useEffect, useState } from "react";
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
  const { alert, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [resetTimeoutId, setResetTimeoutId] = useState();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (alert.msg || alert.successMsg || alert.errMsg) {
      if (resetTimeoutId) clearTimeout(resetTimeoutId);
      let timeoutId = setTimeout(() => {
        dispatch(alertReset());
      }, 10000);
      setResetTimeoutId(timeoutId);
    }
    // eslint-disable-next-line
  }, [dispatch, alert.msg, alert.successMsg, alert.errMsg]);

  return (
    <Router>
      <Alert alert={alert} auth={auth} />
      <AppStyle>
        <Header />
        <Pages />
        <Footer />
      </AppStyle>
    </Router>
  );
};

export default App;

const AppStyle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  min-width: 380px;
`;
