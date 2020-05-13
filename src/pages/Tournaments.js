import React from 'react';
import { TournamentsTable } from '../components/TournamentsTable'

export const TournamentsPage = class extends React.Component {
  render() {
    return <TournamentsTable {...this.props}/>
  }
}