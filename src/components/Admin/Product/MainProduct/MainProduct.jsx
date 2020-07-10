import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withStyles, Grid, Card, Table, TableCell, TableRow, TableBody, TableHead, TablePagination, Typography, Menu, MenuItem, IconButton, ListItemText, Button } from '@material-ui/core';
import { styles } from './MainProduct.style'
import { map } from 'lodash'
import { Product } from '../../../../models/product'
import { MoreHoriz as MoreHorizIcon } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { ModalCreateProduct } from '../ModalCreateProduct'
import { Confirm } from '../../../Common/Confirm'
import { Alert } from '../../../Alert'

const tableCells = ['Title', 'Category', 'Price (VND)', 'Price After Discount (VND)', 'Quantity', 'Brand', 'Actions'];

export const MainProduct = withRouter(withTranslation()(withStyles(styles)(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      anchorEl: null,
      productSelected: {},
      limit: 5,
      page: 0,
      openModal: false,
      isOpenConfirm: false,
      notify: {
        open: false,
        message: '',
        security: ''
      },
    };
  }

  listProduct = async () => {
    const { limit, page } = this.state
    const offset = limit * page;
    const result = await Product.list({ limit, offset })
    this.setState({ products: result })
  }

  async componentDidMount() {
    await this.listProduct()
  }

  onClickActionBtn = (event, product) => {
    this.setState({ anchorEl: event.currentTarget, productSelected: product });
  }

  onCloseActionBtn = () => {
    this.setState({ anchorEl: null });
  }

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  onCreateProduct = () => {
    this.setState({ productSelected: {} })
    this.toggleModal()
  }

  editProduct = () => {
    this.setState({ openModal: true, anchorEl: null })
  }

  onChangeRowsPerPage = (event) => {
    this.setState({ page: 0, limit: parseInt(event.target.value) }, () => this.listProduct());
  }

  onChangePage = (event, page) => {
    this.setState({ page }, () => this.listProduct());
  }

  closeConfirm = () => {
    this.setState({ isOpenConfirm: false })
  }

  openConfirm = () => {
    this.setState({ isOpenConfirm: true, anchorEl: null })
  }

  deleteProduct = async () => {
    const result = await Product.delete(this.state.productSelected.id)
    if (result.status === 204) {
      this.setState({
        notify: { open: true, message: 'Delete product is successful!', security: 'success' }
      })
      this.listProduct()
      this.closeConfirm()
    } else {
      this.setState({
        notify: { open: true, message: 'Delete product is fail!', security: 'error' }
      })
    }
  }

  onCloseAlert = () => {
    this.setState({ notify: { open: false, message: '', security: '' } })
  }

  render() {
    const { classes, t } = this.props;
    const { products, anchorEl, limit, page, openModal, productSelected, isOpenConfirm, notify } = this.state

    return (
      <div>
        <ModalCreateProduct openModal={openModal} onClose={this.toggleModal} getListProduct={this.listProduct} product={productSelected} />
        <Confirm open={isOpenConfirm} handleClose={this.closeConfirm} title="Do you want to delete this product?" action={this.deleteProduct} />
        <Alert {...notify} onCloseAlert={this.onCloseAlert} />
        <div className={classes.header}>
          <Typography variant="h2">{t('List of products')}</Typography>
          <div>
            <Button
              variant={'outlined'}
              onClick={this.onCreateProduct}
              startIcon={<AddIcon />}
            >
              {t('Create New Product')}
            </Button>
          </div>
        </div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {map(tableCells, tC => (
                      <TableCell>
                        {tC}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {map(products.rows, (product) => (
                    <TableRow className={classes.tableRow}>
                      <TableCell>{product.titleVN}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.priceAfterDiscount}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>
                        <div>
                          <IconButton
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            onClick={(event) => this.onClickActionBtn(event, product)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={this.onCloseActionBtn}
                          >
                            <MenuItem onClick={() => this.editProduct()}>
                              <div className={classes.listItemIcon}>
                                <EditIcon />
                                <ListItemText style={{ marginLeft: 15 }}>Edit</ListItemText>
                              </div>
                            </MenuItem>
                            <MenuItem onClick={() => this.openConfirm()}>
                              <div className={classes.listItemIcon}>
                                <DeleteIcon />
                                <ListItemText style={{ marginLeft: 15 }}>Delete</ListItemText>
                              </div>
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={products.count}
                rowsPerPage={limit}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page'
                }}
                onChangePage={this.onChangePage}
                onChangeRowsPerPage={this.onChangeRowsPerPage}
                SelectProps={{
                  native: true
                }}
                labelRowsPerPage={t('Rows per page')}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${t('of')} ${count} ${t('rows')}`}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
})))
