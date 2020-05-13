/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  withStyles,
  Typography,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Card,
  Button,
  TablePagination,
  Menu, MenuItem, IconButton, ListItemText
} from '@material-ui/core';
import { styles } from './UserManagement.style';
import { map } from 'lodash'
import { withRouter } from 'react-router-dom';
import { User } from '../../models/user';
import { CreateUser } from '../CreateUser';
import { debounce } from 'lodash';
import { MoreHoriz as MoreHorizIcon, PauseCircleOutlineOutlined, PlayCircleOutlineRounded } from "@material-ui/icons";
import { Alert } from '../Alert';

const security = "success";
const message = "Update status successfully!";

const tableCells = ['Username', 'Is Admin', 'Email', 'Team', 'Contract Number', 'Contract Exp. Date', 'Status', 'Actions'];

export const UserManagement = withRouter(
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
            openModal: false,
            users: { count: null, rows: [] },
            page: 0,
            limit: 5,
            loading: false,
            anchorEl: null,
            open: false,
            updatePayload: {},
          };
          this.fetchUsers = debounce(this.fetchUsers, 500);
          this.fetchUsers();
        }

        fetchUsers = async () => {
          const { limit, page } = this.state;
          const offset = limit * page;
          this.setState({ openModal: false })
          try {
            const users = await User.fetch(limit, offset);
            console.log('xu ly 1: ', users);
            
            this.setState({ users })
          } catch (error) {
            alert("Server error")
            console.log(error)
          }
        }

        onChangePage = (event, page) => {
          this.setState({ page }, () => this.fetchUsers());
        };

        onChangeRowsPerPage = (event) => {
          this.setState({ page: 0, limit: event.target.value }, () => this.fetchUsers());
        };

        toggleModal = () => {
          const { openModal } = this.state;
          this.setState({ openModal: !openModal })
        }

        onClickActionBtn = (event, row) => {
          this.setState({
            anchorEl: event.currentTarget,
            updatePayload: row
          });
        }
        onCloseActionBtn = () => {
          this.setState({ anchorEl: null });
        }
        onCloseAlert = () => {
          this.setState({ open: false });
        }

        updateUser = async () => {
          const { updatePayload } = this.state
          this.setState({ anchorEl: null });
          const statusUpdate = updatePayload.status === 'PAUSE' ? 'ACTIVE' : 'PAUSE';

          try {
            const res = await User.update(updatePayload.id, statusUpdate);
            if (res.status === 200) {
              this.setState({ open: true, loading: false }, () => {
                this.fetchUsers();
              })
            }
          } catch (error) {
            this.setState({ loading: false })
            console.log(error)
          }
        }

        render() {
          const { classes, t } = this.props;
          const { users, openModal, page, limit, open, anchorEl, updatePayload } = this.state
          return (
            <div className={classes.root}>
              <div className={classes.header}>
                <Typography variant="h2">{t('List of users')}</Typography>
                <div className={classes.searchContainer}>
                  <Button
                    variant={'outlined'}
                    className={classes.createBtn}
                    onClick={this.toggleModal}
                  >
                    {t('Create New User')}
                  </Button>
                </div>
              </div>
              {openModal && <CreateUser openModal={openModal} onClose={this.toggleModal} fetchUsers={this.fetchUsers} />}
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
                        {map(users.rows, (row) => (
                          <TableRow className={classes.tableRow}>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{Boolean(row.isAdmin) ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.teamName}</TableCell>
                            <TableCell>{row.contractNumber}</TableCell>
                            <TableCell>{row.contractExpDate}</TableCell>
                            <TableCell>
                              <div className={row.status === 'ACTIVE' ? classes.active : classes.paused}>
                                {row.status}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <IconButton
                                  aria-controls="customized-menu"
                                  aria-haspopup="true"
                                  variant="contained"
                                  color="primary"
                                  onClick={(event) => this.onClickActionBtn(event, row)}
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
                                  <MenuItem onClick={this.updateUser}>
                                    {updatePayload.status === 'PAUSE' ? (
                                      <div className={classes.listItemIcon}>
                                        <PlayCircleOutlineRounded />
                                        <ListItemText style={{ marginLeft: 5 }}>
                                          Active
                                        </ListItemText>
                                      </div>
                                    ) :
                                      (<div className={classes.listItemIcon}>
                                        <PauseCircleOutlineOutlined />
                                        <ListItemText style={{ marginLeft: 5 }}>
                                          Pause
                                        </ListItemText>
                                      </div>
                                      )}
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
                      count={users.count}
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
              <Alert security={security} message={message} open={open} onCloseAlert={this.onCloseAlert} />
            </div >
          );
        }
      }
    )
  )
);
