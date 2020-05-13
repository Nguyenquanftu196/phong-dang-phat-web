import React from 'react';
import { TeamsTable } from '../components/TeamsTable'

export const TeamsPage = class extends React.Component {
  render() {
    return <TeamsTable {...this.props}/>
  }
}