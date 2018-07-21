import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Image, Table } from 'semantic-ui-react';
import { deletePlayer } from '../store/players';
import AddPlayer from './AddPlayer'

const inlineStyle = {
  modal: {
    top: '20%',
  },
};

class DeletePlayer extends Component {
  constructor (props){
    super (props);
    this.state = {}

  }
  deletePlayerSubmit = () => {
    const { playerSubmit } = this.props;
    removePlayerSubmit(this.state.id)
    console.log(this.state)

  }
  handleRadioChange = (e, { value }) => this.setState({ handedness: value })

render() {
    const {players} = this.props
      return (
        <div style={{padding: '0% 0% 0%'}}>
        <Table color="violet" row selectable>
        <Table.Header fullWidth >
      <Table.Row>
        <Table.HeaderCell key="name" fullWidth>Name</Table.HeaderCell>
        <Table.HeaderCell key="rating">Rating</Table.HeaderCell>
        <Table.HeaderCell key="handleness">Handedness</Table.HeaderCell>
      </Table.Row>
    </Table.Header >
    <Table.Body>
        
        {players.players.map( player => (
        <Modal style={inlineStyle.modal} trigger={<Table.Row key={player.id} value={player.id} onClick={()=> this.setState({id: player.id})}>

        <Table.Cell  key={player.first_name + player.last_name}>{player.first_name} {player.last_name}</Table.Cell>
        <Table.Cell key={player.rating}>{player.rating}</Table.Cell>
        <Table.Cell key={player.handedness}>{player.handedness}</Table.Cell>
        </Table.Row>}>
    <Modal.Header>Delete Player</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://png.icons8.com/color/1600/table-tennis.png' />
      <Modal.Description>
        <Header>Are you sure you want to delete {player.first_name} {player.last_name}?</Header>
        <h4>{player.first_name} {player.last_name} has a rating of {player.rating} and is {player.handedness} handed.</h4>
        <p>{player.first_name} will be permanently removed from your roster unless re-added.</p>
      </Modal.Description>
      
    </Modal.Content>
    <Modal.Actions>
    <Button icon labelPosition='left' primary size='medium' onClick={this.deletePlayerSubmit}>
    <Icon name='user plus' /> Delete Player
    </Button>
    </Modal.Actions>
  </Modal>
))}
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
      )
    }
  }

const mapState = ({ user, players }) => ({ user, players });

const mapDispatch = (dispatch) => {
  
  return {
    removePlayerSubmit: (id) => {
      dispatch(deletePlayer(id));
    }
  }
};

  
export default connect(mapState, mapDispatch)(DeletePlayer);