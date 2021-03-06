import React, { Component } from 'react';
import { Route } from 'react'
import { connect } from 'react-redux';
import { Button, Icon, Modal, Header, Image, Form, Checkbox, Label } from 'semantic-ui-react';
import { addPlayer } from '../store';

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
  handlePlayerSubmit = async () => {
    
    console.log(this.state)
    const playerAdding = {first_name: this.state.first_name, last_name: this.state.last_name, rating: this.state.rating, handedness: this.state.handedness}
    await this.props.addPlayer(playerAdding, this.props.user.token)
    this.setState({modal:false})
    
    
    

  }
  handleOpen = () => this.setState({modal: true})

  handleClose = () => this.setState({modal:false})

  handleRadioChange = (e, { value }) => this.setState({ handedness: value })

render() {
      return (
        
        <Modal style={inlineStyle.modal} open={this.state.modal} onOpen={this.handleOpen} onClose={this.handleClose} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.handleOpen} type="open">
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
        <Form.Input name="first_name" stretch="true" label='First Name' type='text' placeholder='First name' value={this.state.first_name} onChange={evt => this.setState({ first_name: evt.target.value})} required />
        <Form.Input name="last_name" stretch="true" label='Last Name' type='text' placeholder='Last name' onChange={evt => this.setState({ last_name: evt.target.value})} required/>
      </Form.Group>
      <Form.Group>
      <Form.Input name="rating" stretch="true" label='Rating' type='number' placeholder='Rating' onChange={evt => this.setState({ rating: evt.target.value })}/>
      </Form.Group>
      <Form.Group inline>
        <label>Handedness</label>
        <Form.Field >
          <Checkbox
            radio
            label='Left'
            name='checkboxRadioGroup'
            value='left'
            checked={this.state.handedness === 'left'}
            onChange={this.handleRadioChange}
          >
            
          </Checkbox>
        </Form.Field>
        <Form.Field>
        
          <Checkbox
            radio
            label="Right"
            name='checkboxRadioGroup'
            value='right'
            checked={this.state.handedness === 'right'}
            onChange={this.handleRadioChange}
          >
          </Checkbox>
        </Form.Field>
      </Form.Group>
      
    </Form>
    </Modal.Content>
    <Modal.Actions>
    <Button icon labelPosition='left' primary size='medium' onClick={this.handlePlayerSubmit} name="create" >
    <Icon name='user plus' /> Submit Player
    </Button>
    </Modal.Actions>
    
  
  </Modal>
      )
    }
  }
const mapState = ({user, players}) => ({ user, players});

const mapDispatch = { addPlayer }

  
export default connect(mapState, mapDispatch)(AddPlayer);
