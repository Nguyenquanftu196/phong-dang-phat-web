import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { styles } from './SlideImage.style';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'swiper'

export const SlideImage = withRouter(
  withTranslation()(
    withStyles(styles)(
      class extends Component {
        static propTypes = {
          classes: PropTypes.shape(Classes).isRequired,
          t: PropTypes.func.isRequired,
          location: PropTypes.object.isRequired
        };

        constructor(props) {
          super(props);

          this.state = {
            open: false,
          };
        }

        componentDidMount() {
          new Swiper('.swiper-container', {
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            autoplay: true
          })
        }

        render() {
          const { classes, t } = this.props;

          return (
            <div className={classes.containerSlide}>
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/slide_1.jpg`} alt="" className={classes.imgSlide} />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/slide_2.jpg`} alt="" className={classes.imgSlide} />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/slide_3.jpg`} alt="" className={classes.imgSlide} />
                  </div>
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
              <style>
                {`
                  .swiper-container {
                    height: 100%;
                    width: 100%
                  }
                  .swiper-slide {
                    background: red;
                    text-align: center;
                    font-size: 18px;
                    background: #fff;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    -webkit-justify-content: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    -webkit-align-items: center;
                    align-items: center;
                  }
                  .swiper-button-next, .swiper-button-prev {
                    color: #1f8b48
                  }
                  .swiper-pagination-bullet-active {
                    background: #1f8b48
                  }
                `}
              </style>
            </div>
          );
        }
      }
    )
  )
);
