import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableBody, { Table, Button, Icon, Message } from 'semantic-ui-react';
import { fetchPlayers, addPlayer, deletePlayer } from '../store';
import AddPlayer from './AddPlayer'
import DeletePlayer from './DeletePlayer'

class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.players = this.props.players
  
  }

  componentDidMount = () =>{
    if(this.props.user.token){
      localStorage.setItem('Authorization', this.props.user.token )
      let token = this.props.user.token;
      token = 'Bearer '.concat(token);
      
      this.props.fetchPlayers(token)
    }
  }
  
  render () {
    console.log
    
    const players = this.props.players.players
    return (
      <div style={{padding: '1% 1% 1%'}}>
      {players? <DeletePlayer />: <div>
        <Message
        header='No players loaded.'
        content='Add players to your roster bellow. '
      />
        <Table color="violet" row="true" selectable>
          <Table.Header fullwidth="true" >
            <Table.Row>
              <Table.HeaderCell key="name" fullwidth="true">Name</Table.HeaderCell>
              <Table.HeaderCell key="rating">Rating</Table.HeaderCell>
              <Table.HeaderCell key="handleness">Handedness</Table.HeaderCell>
            </Table.Row>
          </Table.Header >
            <Table.Body>
            </Table.Body>
          <Table.Footer fullwidth="true">
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <AddPlayer {...this.props}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer> 
        </Table>
      </div>
      } 
      </div>
    )
  }
};

const mapState = (state) => {
  return {
    user: state.user,
    players: state.players
  }
};

const mapDispatch = { fetchPlayers, addPlayer, deletePlayer  };

export default connect(mapState, mapDispatch)(Roster);
