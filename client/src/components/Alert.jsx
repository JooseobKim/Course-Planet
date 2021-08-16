import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { alertReset } from "../redux/actions/alertAction";

const Alert = ({ auth, alert }) => {
  const dispatch = useDispatch();
  const { loading, msg, successMsg, errMsg } = alert;

  const handleResetMsg = () => {
    dispatch(alertReset());
  };

  return (
    <>
      {loading && (
        <StyledLoading>
          <PropagateLoader color="#ffffff" loading={loading} size={20} />
        </StyledLoading>
      )}
      {auth.token && auth.user?.role === 1 && msg && (
        <StyledMessage>
          <span>{msg}</span>
          <CloseIcon onClick={handleResetMsg} fontSize="small" />
        </StyledMessage>
      )}
      {successMsg && (
        <StyledSuccessMessage>
          <span>{successMsg}</span>
          <CloseIcon onClick={handleResetMsg} fontSize="small" />
        </StyledSuccessMessage>
      )}
      {errMsg && (
        <StyledErrMessage>
          <span>{errMsg}</span>
          <CloseIcon onClick={handleResetMsg} fontSize="small" />
        </StyledErrMessage>
      )}
    </>
  );
};

export default Alert;

const StyledLoading = styled.div`
  z-index: 99999;
  position: fixed;
  background-color: #111;
  opacity: 0.8;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMessage = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  letter-spacing: 1.1px;
  z-index: 10;
  position: fixed;
  top: 70px;
  width: 100%;
  padding: 7px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00529b;
  background-color: #bde5f8;
  opacity: 0.9;

  .MuiSvgIcon-root {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    top: 125px;
  }
`;

const StyledSuccessMessage = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  letter-spacing: 1.1px;
  z-index: 10;
  position: fixed;
  top: 70px;
  width: 100%;
  padding: 7px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dff2bf;
  background-color: #4f8a10;
  opacity: 0.9;

  .MuiSvgIcon-root {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    top: 125px;
  }
`;

const StyledErrMessage = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  letter-spacing: 1.1px;
  z-index: 10;
  position: fixed;
  top: 70px;
  width: 100%;
  padding: 7px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffd2d2;
  background-color: #d8000c;
  opacity: 0.9;

  .MuiSvgIcon-root {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    top: 125px;
  }
`;
