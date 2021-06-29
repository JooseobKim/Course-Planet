import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const ContactModal = ({ setContactModal }) => {
  return (
    <StyledContactModal>
      <div className="contact-modal">
        <CloseIcon onClick={() => setContactModal(false)} />
        <form className="contact-modal__form">
          <div className="contact-modal__form__fullname">
            <label htmlFor="contact-us__fullname">Fullname</label>
            <input
              type="text"
              id="contact-us__fullname"
              placeholder="Your Name"
            />
          </div>
          <div className="contact-modal__form__email">
            <label htmlFor="contact-us__email">Email</label>
            <input
              type="text"
              id="contact-us__email"
              placeholder="Your Email"
            />
          </div>
          <div className="contact-modal__form__message">
            <label htmlFor="contact-us__message">Message</label>
            <textarea cols="30" rows="6" placeholder="Your Message" />
          </div>
          <Button
            variant="contained"
            color="secondary"
            className="contact-modal__form__submit"
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
    padding: 50px;

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
          padding: 2px 7px;
          border: 1px solid rgba(128, 128, 128, 0.199);
          border-radius: 5px;
          outline: none;
        }

        input {
          height: 25px;
        }

        textarea {
          resize: vertical;
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
