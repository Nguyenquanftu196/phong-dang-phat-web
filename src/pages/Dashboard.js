import React from 'react';
import { Dashboard } from '../components/Dashboard'

export const DashboardPage = class extends React.Component {
  render() {
    return (
      <>
        <Dashboard {...this.props}/>
      </>
    )
  }
}