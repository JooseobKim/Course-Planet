import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { alertReset } from "../redux/actions/alertAction";

const Alert = ({ loading, msg }) => {
  const dispatch = useDispatch();

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
      {msg && (
        <StyledMessage>
          <span>{msg}</span>
          <CloseIcon onClick={handleResetMsg} fontSize="small" />
        </StyledMessage>
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
  z-index: 99999;
  position: fixed;
  top: 80px;
  right: 10px;
  max-width: 200px;
  min-height: 40px;
  max-height: 60px;
  padding: 5px 30px 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ecebf6;
  background-color: #272c48;
  border-radius: 5px;
  opacity: 0.8;

  .MuiSvgIcon-root {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
  }
`;
