import React from 'react';
import { PlayersTable } from '../components/PlayersTable'

export const PlayersPage = class extends React.Component {
  render() {
    return <PlayersTable {...this.props}/>
  }
}