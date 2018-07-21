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
  
  }
  componentDidMount = () =>{
    if(this.props.user.success === true){
      localStorage.setItem('Authorization', this.props.user.token )
      let token = this.props.user.token;
      token = 'Bearer '.concat(token);
      axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';
      
      this.props.fetchPlayers()
    }
  }
  
  render () {
    
    const players = this.props.players.players
    return (
      <div style={{padding: '1% 1% 1%'}}>
      {players? <DeletePlayer />: <div>
        <Message
        header='No players loaded.'
        content='Add players to your roster bellow. '
      />
        <Table color="violet" row selectable>
          <Table.Header fullWidth >
            <Table.Row>
              <Table.HeaderCell key="name" fullWidth>Name</Table.HeaderCell>
              <Table.HeaderCell key="rating">Rating</Table.HeaderCell>
              <Table.HeaderCell key="handleness">Handedness</Table.HeaderCell>
            </Table.Row>
          </Table.Header >
            <Table.Body>
            </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <AddPlayer/>
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

const mapState = ({ user, players }) => ({ user, players });

const mapDispatch = { fetchPlayers, addPlayer, deletePlayer  };

export default connect(mapState, mapDispatch)(Roster);
