import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles, Grid, Button } from '@material-ui/core';
import { styles } from './ItemCategory.style';
import { withRouter } from 'react-router-dom';
import { Category } from  '../../models/category'
import { map, forEach, filter, flattenDeep } from 'lodash'
import { Card } from '../Card';
import { Product } from '../../models/product'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { productUrl } from '../../constants/imageUrl'

export const ItemCategory = withRouter(withTranslation()(withStyles(styles)(
  class extends Component {
    static propTypes = {
      classes: PropTypes.shape(Classes).isRequired,
      t: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);

      this.state = {
        categories: [],
        products: [],
        query: ''
      };
    }

    listCategory = async () => {
      const result = await Category.list(null, 0)      
      this.setState({ categories: result.rows })
    }

    listProduct = async () => {  
      const { query } = this.state      
      const result = await Product.list({ query })
      this.setState({ products: result.rows })
    }

    async componentDidMount(){
      await this.listCategory()
      await this.listProduct()
    }

    componentWillReceiveProps(nextProps){
      this.setState({ query: nextProps.keySearchProduct }, () => {
        this.listProduct()
      })
    }

    navigateToProductDetail = (product) => {
      console.log('vao navigate: ', product);
      this.props.history.push('/product', { product })
    }

    render() {      
      const { classes, t } = this.props;
      const { categories, products } = this.state
      forEach(categories, category => {
        const productOfCategory = filter(products, { category: category.id })
        category['listProduct'] = productOfCategory
      })
      const productFlatten = flattenDeep(map(categories, 'listProduct'))

      return (
        <div>
          {
            (productFlatten.length > 0) ?
              map(categories, category => {              
                return (
                  (category.listProduct.length > 0) ?
                    <div>
                      <h4 className={classes.titleCate}>{(this.props.i18n.language === 'en') ? category.nameEN : category.nameVN}</h4>
                      <Card>
                        <Grid container spacing={3}>
                          {
                            map(category.listProduct, product => (
                              <Grid item xs={6} sm={3} className={classes.containerItem} spacing={3} onClick={() => this.navigateToProductDetail(product)}>
                                {/* <img src={`https://quan-images.s3.us-east-2.amazonaws.com/upload/product/large/${JSON.parse(product.pictures)[0]}.png`} className={classes.imgProduct}/> */}
                                <img src={productUrl(JSON.parse(product.pictures)[0])} alt="" className={classes.imgProduct}/>
                                <label htmlFor="">{(this.props.i18n.language === 'en') ? product.titleEN : product.titleVN}</label>
                                <div className={classes.mainPrice}>
                                  <span className={classes.originPrice}>{product.priceAfterDiscount} VND</span>
                                  <strike>{product.price} VND</strike>
                                  <span className={classes.percentDiscount}>-{Math.round(100 - (product.priceAfterDiscount/product.price*100))}%</span>
                                </div>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  className={classes.btnAddToCart}
                                  startIcon={<ShoppingCartIcon style={{ height: 20, width: 20 }}/>}
                                >
                                  {t("Add To Cart")}
                                </Button>
                              </Grid>
                            ))
                          }
                        </Grid>
                      </Card>
                    </div>
                  : null
                )
              })
            : <h2 className={classes.notifyNoAd}>Not found!</h2>
          }
        </div>
      );
    }
  }
)));
