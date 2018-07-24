import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Image, Table, Footer } from 'semantic-ui-react';
import { deletePlayer } from '../store';
import AddPlayer from './AddPlayer'

const inlineStyle = {
  modal: {
    top: '20%',
  },
};

// const ModalWarning = () => (
//   <Modal trigger={<Button icon labelPosition='left' primary size='medium'>
//   <Icon name='user plus' /> Delete Player
//   </Button>} closeIcon>
//     <Modal.Header>Delete</Modal.Header>
//     <Modal.Content image>
//       <div className='image'>
//         <Icon name='user delete' />
//       </div>
//       <Modal.Description>
//         <p>This player have been deleted.</p>
//       </Modal.Description>
//     </Modal.Content>
//     <Modal.Actions>
//     <Button icon='check' content='Back to Roster' />
//   </Modal.Actions>
//   </Modal>
// )


class DeletePlayer extends Component {
  constructor (props){
    super (props);
    this.state = {}

  }
  deletePlayerSubmit = () => {
    if(this.props.user.token){
      const { removePlayerSubmit } = this.props;
      console.log(this.props.user.token)
      let token = 'Bearer '.concat(this.props.user.token)
      console.log(token)
      this.props.deletePlayer(this.state.id, token)
      this.setState({modalOpen: false})
      
    }

  }
  handleRadioChange = (e, { value }) => this.setState({ handedness: value })

render() {
  console.log(this.state)
    const {players} = this.props
      return (
        <div style={{padding: '0% 0% 0%'}}>
        <Table color="violet" row="true" selectable>
        <Table.Header fullwidth="true" >
      <Table.Row key="tableHeader">
        <Table.HeaderCell key="name" fullwidth="true">Name</Table.HeaderCell>
        <Table.HeaderCell key="rating">Rating</Table.HeaderCell>
        <Table.HeaderCell key="handleness">Handedness</Table.HeaderCell>
      </Table.Row>
    </Table.Header >
    <Table.Body>
        
        {players.players.map( player => (
        <Modal key={player.id} style={inlineStyle.modal} trigger={<Table.Row key={player.id} value={player.id} onClick={()=> this.setState({id: player.id, modalOpen:true})} closeicon="true" open={this.state.modalOpen}>

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
<Table.Footer fullwidth="true">
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

const mapDispatch = {deletePlayer};

  
export default connect(mapState, mapDispatch)(DeletePlayer);