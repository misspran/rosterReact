import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Image, Form, Checkbox } from 'semantic-ui-react';
import { addPlayer } from '../store/players';

const inlineStyle = {
  modal: {
    top: '20%',
  },
};

class AddPlayer extends Component {
  constructor (props){
    super (props);
    this.state = {}

  }
  handlePlayerSubmit = () => {
    
    console.log(this.state)
    this.props.addPlayer(this.state, this.props.user.token)
    

  }
  handleRadioChange = (e, { value }) => this.setState({ handedness: value })

render() {
      return (
        
        <Modal style={inlineStyle.modal} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small'>
          <Icon name='user plus' /> Add Player
          </Button>
        } closeIcon>
    <Modal.Header>Add Player</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://png.icons8.com/color/1600/table-tennis.png' />
      <Form style={{
        left: '10%',
        top: '20%'
      }}>
      <Form.Group widths='equal'>
        <Form.Input stretch="true" label='First name' type='first_name' placeholder='First name' value={this.state.first_name} onChange={evt => this.setState({ first_name: evt.target.value})} required/>
        <Form.Input stretch="true" label='Last name' type='last_name' placeholder='Last name' onChange={evt => this.setState({ last_name: evt.target.value})} required/>
      </Form.Group>
      <Form.Group>
      <Form.Input stretch="true" label='Rating' type='rating' placeholder='Rating' onChange={evt => this.setState({ rating: evt.target.value })}/>
      </Form.Group>
      <Form.Group inline>
        <label>Handedness</label>
        <Form.Field>
          <Checkbox
            radio
            label='Left'
            name='checkboxRadioGroup'
            value='left'
            checked={this.state.handedness === 'left'}
            onChange={this.handleRadioChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Right'
            name='checkboxRadioGroup'
            value='right'
            checked={this.state.handedness === 'right'}
            onChange={this.handleRadioChange}
          />
        </Form.Field>
      </Form.Group>
      
    </Form>
    </Modal.Content>
    <Modal.Actions>
    <Button icon labelPosition='left' primary size='medium' onClick={this.handlePlayerSubmit}>
    <Icon name='user plus' /> Submit Player
    </Button>
    </Modal.Actions>
    
  
  </Modal>
      )
    }
  }
const mapState = ({user, players}) => ({ user, players});

const mapDispatch = { addPlayer }
  
//   return {
//     playerSubmit: (playerDetail, token) => {
//       let player = {first_name: playerDetail.first_name, last_name: playerDetail.last_name, rating: playerDetail.rating, handedness: playerDetail.handedness};
//       dispatch(addPlayer(player, token));
//     }
//   }
// };

  
export default connect(mapState, mapDispatch)(AddPlayer);
