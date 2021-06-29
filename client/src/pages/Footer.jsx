import React, { useState } from "react";
import styled from "styled-components";
import ContactModal from "../components/ContactModal";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";

const Footer = () => {
  const [contactModal, setContactModal] = useState(false);

  const handleModalClick = () => {
    setContactModal(true);
  };

  return (
    <StyledFooter>
      <div className="wrapper">
        <div className="footer">
          <div className="footer-contact">
            <Button
              variant="contained"
              color="primary"
              className="footer-contact__button"
              onClick={handleModalClick}
            >
              Contact Me
            </Button>
          </div>
          {contactModal ? (
            <ContactModal setContactModal={setContactModal} />
          ) : (
            ""
          )}
          <div className="footer__sitemap">
            <span className="footer__sitemap__title">Sitemap</span>
            <ul className="footer__sitemap__list">
              <li className="footer__sitemap__list__item">Courses</li>
              <li className="footer__sitemap__list__item">Community</li>
              <li className="footer__sitemap__list__item">About Us</li>
            </ul>
          </div>
          <div className="footer__info">
            <div className="footer__info__mobile">
              <PhoneIcon />
              <span>010 - 0000 - 0000</span>
            </div>
            <div className="footer__info__email">
              <EmailIcon />
              <span>josephkim42@naver.com</span>
            </div>
          </div>
        </div>
        <div className="license">
          <span>&copy; 2021 All Rights Reserved Me</span>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #999;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  font-size: 15px;

  .blind {
    display: none;
  }

  .wrapper {
    max-width: 1500px;
    height: 100px;
    margin: auto;
    padding: 15px 0;

    .footer {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      height: 70px;

      &-contact,
      &__sitemap,
      &__info {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        color: #fff;
      }

      &-contact {
        flex: 4;

        &__button {
          background-color: #272c48;
          opacity: 0.8;

          &:hover {
            background-color: #272c48;
            opacity: 1;
          }
        }
      }

      &__sitemap {
        flex: 4;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        letter-spacing: 1.1px;

        &__title {
          margin-bottom: 5px;
        }

        &__list {
          font-size: 13px;
          line-height: 1.4;
        }
      }

      &__info {
        flex: 4;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        letter-spacing: 1.1px;

        &__mobile,
        &__email {
          span {
            margin-left: 5px;
          }
        }

        &__mobile {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 5px;
        }

        &__email {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .license {
      color: white;
      text-align: end;
      margin-top: 10px;
      padding-right: 10px;
    }
  }
`;
