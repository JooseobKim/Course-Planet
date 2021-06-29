import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Header from "./pages/Header";
import Pages from "./pages/Pages";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <Router>
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
