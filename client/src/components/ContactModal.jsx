import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { contactMeSendMail } from "../redux/actions/userAction";

const ContactModal = ({ setContactModal }) => {
  const dispatch = useDispatch();

  const initialState = {
    fullname: "",
    email: "",
    message: "",
  };
  const [sendData, setSendData] = useState(initialState);
  const { fullname, email, message } = sendData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSendData({ ...sendData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(contactMeSendMail({ fullname, email, message }));
  };

  return (
    <StyledContactModal>
      <div className="contact-modal">
        <CloseIcon onClick={() => setContactModal(false)} />
        <form className="contact-modal__form" onSubmit={handleOnSubmit}>
          <div className="contact-modal__form__fullname">
            <label htmlFor="contact-us__fullname">Fullname</label>
            <input
              type="text"
              id="contact-us__fullname"
              placeholder="Your Name"
              name="fullname"
              value={fullname}
              onChange={handleOnChange}
            />
          </div>
          <div className="contact-modal__form__email">
            <label htmlFor="contact-us__email">Email</label>
            <input
              type="email"
              id="contact-us__email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className="contact-modal__form__message">
            <label htmlFor="contact-us__message">Message</label>
            <textarea
              cols="30"
              rows="6"
              placeholder="Your Message"
              name="message"
              value={message}
              onChange={handleOnChange}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            className="contact-modal__form__submit"
            type="submit"
          >
            제출
          </Button>
        </form>
      </div>
    </StyledContactModal>
  );
};

export default ContactModal;

const StyledContactModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 11;
  min-width: 380px;

  .contact-modal {
    position: fixed;
    width: 300px;
    height: 330px;
    background-color: #fff;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 40px;

    .MuiSvgIcon-root {
      position: absolute;
      top: 15px;
      right: 15px;
      opacity: 0.6;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__fullname,
      &__email,
      &__message {
        display: flex;
        flex-direction: column;
        width: 100%;

        label,
        input,
        textarea {
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 300;
          letter-spacing: 1.1px;
          font-size: 14px;
        }

        label,
        input {
          margin-bottom: 9px;
        }

        input,
        textarea {
          font-size: 13px;
          padding: 2px 7px;
          border: 1px solid rgba(128, 128, 128, 0.199);
          border-radius: 5px;
          outline: none;
        }

        input {
          height: 25px;
        }

        textarea {
          resize: none;
        }
      }

      &__fullname {
      }

      &__email {
      }

      &__message {
      }

      &__submit {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 300;
        margin-top: 20px;
        width: 100%;
      }
    }
  }
`;
