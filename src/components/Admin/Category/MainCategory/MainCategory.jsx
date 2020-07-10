import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withStyles, Typography, Button, Grid, Card, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Menu, MenuItem, ListItemText } from '@material-ui/core';
import { styles } from './MainCategory.style'
import AddIcon from '@material-ui/icons/Add';
import { map } from 'lodash'
import { Category } from '../../../../models/category'
import { MoreHoriz as MoreHorizIcon } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'

const tableCells = ['Name(EN)', 'Name(VI)', 'Actions'];

export const MainCategory = withRouter(withTranslation()(withStyles(styles)(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {},
      limit: 5,
      page: 0,
      anchorEl: null,
      categorySelected: {}
    }
  }

  listCategory = async () => {
    const { limit, page } = this.state
    const offset = limit * page;
    const result = await Category.list(limit, offset)
    this.setState({ categories: result })
  }

  onChangePage = (event, page) => {
    this.setState({ page }, () => this.listCategory());
  }

  onChangeRowsPerPage = (event) => {
    this.setState({ page: 0, limit: parseInt(event.target.value) }, () => this.listCategory());
  }

  onClickActionBtn = (event, cate) => {
    this.setState({ anchorEl: event.currentTarget, categorySelected: cate });
  }

  onCloseActionBtn = () => {
    this.setState({ anchorEl: null });
  }

  componentDidMount() {
    this.listCategory()
  }

  render() {
    const { classes, t } = this.props;
    const { categories, limit, page, anchorEl } = this.state

    return (
      <div>
        <div className={classes.header}>
          <Typography variant="h2">{t('List of Categories')}</Typography>
          <div>
            <Button
              variant={'outlined'}
              // onClick={this.onCreateProduct}
              startIcon={<AddIcon />}
            >
              {t('Create New Category')}
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
                  {
                    map(categories.rows, cate => (
                      <TableRow className={classes.tableRow}>
                        <TableCell>{cate.nameEN}</TableCell>
                        <TableCell>{cate.nameVN}</TableCell>
                        <TableCell>
                          <div>
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                              color="primary"
                              onClick={(event) => this.onClickActionBtn(event, cate)}
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
                    ))
                  }
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={categories.count}
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
