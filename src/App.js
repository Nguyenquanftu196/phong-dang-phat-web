import React, { Component } from 'react';
import withTheme from './withTheme';
import {
  Redirect, BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { SessionUtils } from './utils/session';
import { isEmpty } from 'lodash';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardAdminLayout } from './components/DashboardAdminLayout';
import { PlayersPage } from './pages/Players';
import { TeamsPage } from './pages/Teams'
import { TournamentsPage } from './pages/Tournaments';
import { LoginPage } from './pages/Login';
import { UserManagementPage } from './pages/UserManagement';
import { DashboardPage } from './pages/Dashboard';
import { Dashboard } from './components/Dashboard'

const isAdminWeb = process.env.REACT_APP_IS_ADMIN === 'true'

const renderOnlinePages = () => {
  return (
    <Router>
      <Route path="/logout" component={<div>Logout</div>} />
      <DashboardLayout>
        <Switch>
          <Route exact path="/teams" component={TeamsPage} />
          <Route path="/teams/:teamId" component={PlayersPage} />
          <Route exact path="/players" component={PlayersPage} />
          <Route exact path="/tournaments" component={TournamentsPage} />
          <Route exact path="/tournaments/:tournamentId" component={TeamsPage} />
          <Route path="/squad" component={Dashboard} />
          <Route path="/summary" component={Dashboard} />
          <Route path="/login" component={LoginPage} /> 
          <Route path="/" component={DashboardPage} />
          <Redirect to="/" />
        </Switch>
      </DashboardLayout>
    </Router>
  )
};

const renderOnlineAdminPages = () => {
  return (
    <Router>
      <DashboardAdminLayout>
        <Switch>
          <Route path="/users" component={UserManagementPage} />
          <Redirect to="/users" />
        </Switch>
      </DashboardAdminLayout>
    </Router>
  )
};

const renderOfflinePages = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={() => <div>Signup</div>} />
        <Route path="/forgot_password" component={() => <div>Signup</div>} />
        <Route path="/reset_password/:code" component={() => <div>Signup</div>} />
        <Route path="/login" component={LoginPage} /> 
        <Redirect to="/login" />
      </Switch>
    </Router>
  )
};

export const App = withTheme(class extends Component {
  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize = async () => {
    try {
      const { authenticate } = this.props;
      const session = await SessionUtils.initSession();
      authenticate(session);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { session } = this.props;
    const { user } = session;

    // if (isEmpty(session)) {
    //   return null
    // }

    if (isAdminWeb) {
      if (user && user.isAdmin) {
        return renderOnlineAdminPages();
      }
    }

    return renderOnlinePages()

    // if (user) {
    //   return renderOnlinePages();
    // }

    // return renderOfflinePages();
  }
});
