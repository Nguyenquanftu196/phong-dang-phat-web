import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles, Button, Paper  } from '@material-ui/core';
import { styles } from './ProductDetail.style';
import { isUndefined, map, isEmpty } from 'lodash'
import Swiper from 'swiper'
import { productUrl } from '../../constants/imageUrl'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RestoreIcon from '@material-ui/icons/Restore';
import { Product } from '../../models/product'

export const ProductDetail = withTranslation()(
  withStyles(styles)(
    class extends Component {
      static propTypes = {
        classes: PropTypes.shape(Classes).isRequired,
        t: PropTypes.func.isRequired
      };

      constructor(props) {
        super(props);

        this.state = {
          product: {}
        };
      }

      async componentDidMount() {
        if (!isUndefined(this.props.history.location.state)) {
          const product = await Product.countView(this.props.history.location.state.product.id)
          this.setState({ product: product })
        }
        var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 10,
          slidesPerView: 6,
          loop: false,
          freeMode: true,
          loopedSlides: 1, //looped slides should be the same
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.gallery-top', {
          spaceBetween: 10,
          loop: false,
          loopedSlides: 1, //looped slides should be the same
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          thumbs: {
            swiper: galleryThumbs,
          },
        });
      }

      render() {
        const { classes, t} = this.props;
        const { product } = this.state
        console.log('aaa: ', product);

        return (
          <div>
            {
              (!isEmpty(product)) && (
                <>
                  <Paper className={classes.mainInfoAd}>
                    <div className={classes.mainSlide}>
                      <div className="swiper-container gallery-top">
                        <div className="swiper-wrapper">
                          {
                            map(JSON.parse(product.pictures), picture => (
                              <div className="swiper-slide" style={{ backgroundImage: `url(${productUrl(picture)})` }}></div>
                            ))
                          }
                        </div>
                        <div className="swiper-button-next swiper-button-white"></div>
                        <div className="swiper-button-prev swiper-button-white"></div>
                      </div>
                      <div className="swiper-container gallery-thumbs">
                        <div className="swiper-wrapper">
                          {
                            map(JSON.parse(product.pictures), picture => (
                              <div className="swiper-slide" style={{ backgroundImage: `url(${productUrl(picture)})` }}></div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                    <div className={classes.contentInfo}>
                      <h1 className={classes.title}>{(this.props.i18n.language === 'en') ? product.titleEN : product.titleVN}</h1>
                      <div className={classes.mainPrice}>
                        <span className={classes.originPrice}>{product.priceAfterDiscount} VND</span>
                        <strike>{product.price} VND</strike>
                        <span className={classes.percentDiscount}>-{Math.round(100 - (product.priceAfterDiscount/product.price*100))}%</span>
                      </div>
                      <div className={classes.mainAction}>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<ShoppingCartIcon style={{ height: 20, width: 20 }}/>}
                        >
                          {t("Add To Cart")}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ShopIcon style={{ height: 20, width: 20 }}/>}
                        >
                          {t("Buy Now")}
                        </Button>
                      </div>
                      <div className={classes.contentSlogan}>
                        <div>
                          <QueryBuilderIcon />
                          <span>Đặt online giao tận nhà ĐÚNG GIỜ (nếu trễ đền 20.000đ)</span>
                        </div>
                        <div>
                          <RestoreIcon />
                          <span>Đổi, trả sản phẩm trong 48 giờ</span>
                        </div>
                      </div>
                      <img src={`${process.env.PUBLIC_URL}/banner_1.jpg`} alt="" className={classes.bannerFirst}/>
                    </div>
                  </Paper>
                  <Paper className={classes.mainDetailInfo}>
                    <h4 className={classes.titleCate}>{t("Product information")}</h4>
                    <div className={classes.mainDetail}>
                      <div>
                        <label>{t("Brand")}</label>
                        <span>{product.brand}</span>
                      </div>
                      <div>
                        <label>{t("Unit")}</label>
                        <span>{product.unit}</span>
                      </div>
                      <div>
                        <label>{t("View")}</label>
                        <span>{product.nbViews}</span>
                      </div>
                      <div>
                        <label>{t("Product description")}</label>
                        <span dangerouslySetInnerHTML={{ __html: (this.props.i18n.language === 'en') ? product.descriptionEN : product.descriptionVN }}></span>
                      </div>
                    </div>
                  </Paper>
                </>
              )
            }
            <style>
              {`
                .swiper-container {
                  width: 100%;
                  height: 300px;
                  margin-left: auto;
                  margin-right: auto;
                }
                .swiper-slide {
                  background-size: 100% 100%;
                  background-position: center;
                }
                .gallery-top {
                  height: 500px;
                  width: 100%;
                }
                .gallery-thumbs {
                  height: 100px;
                  box-sizing: border-box;
                  padding: 10px 0;
                }
                .gallery-thumbs .swiper-slide {
                  height: 100%;
                  opacity: 0.4;
                }
                .gallery-thumbs .swiper-slide-thumb-active {
                  opacity: 1;
                }
                .swiper-button-next, .swiper-button-prev {
                  color: #1f8b48
                }
              `}
            </style>
          </div>
        );
      }
    }
  )
);
