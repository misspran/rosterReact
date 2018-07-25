import React from 'react';
import history from '../history';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Message, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import store from '../store';
import { createUser } from '../store/newUsers';
import { login } from '../store';



class Register extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        error: {message:"", warning: false}
      }; 
  }

  onSignupSubmit = (evt) => {
    evt.preventDefault();
    const { signupSubmit, loginSubmit } = this.props;
    const firstName = evt.target.first_name.value;
    const lastName = evt.target.last_name.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const confirmPassword = evt.target.confirm_password.value;
   signupSubmit(firstName, lastName, email, password, confirmPassword)
   //loginSubmit(email, password)
   //history.push('/roster');

  }
  errorWarning = () =>{
    if(this.state.password === this.state.confirm_password){
      this.setState({error: {message: "", warning: false}})
    }else{
      this.setState({error: {message: "Confirmed password must match password", warning: true}})

    }

  }
  
  handleChange = (event) => {
  
    this.setState({confirm_password: event.target.value});
   this.errorWarning()
    

    console.log(this.state, event)
  }
  


  render() {
    console.log(this.state)
    return (
      <div >
        <Grid textAlign="center" style={{ height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as="h2" color="violet" textAlign="center">
              Register here!
            </Header>
            <Form size="large" onSubmit={this.onSignupSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  label="First Name"
                  placeholder="First Name"
                  name="first_name"
                  type="text"
                  onChange={evt=> this.setState({first_name: evt.target.value})}
                  required
                />
                
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  onChange={evt=> this.setState({last_name: evt.target.value})}
                  required
                />
                <Form.Input
                  fluid
                  icon="envelope outline"
                  iconPosition="left" 
                  label="Email"
                  placeholder="E-mail Address"
                  name="email"
                  type="email"
                  onChange={evt=> this.setState({email: evt.target.value})}
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={evt=> this.setState({password: evt.target.value})}
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  name="confirm_password"
                  type="password"
                  onChange={this.handleChange}
                  onKeyUp={this.errorWarning}
                  error={this.state.error.warning}
                  required
                />
                <Button color="violet" className="button" fluid size="large" type="submit" disabled={this.state.error.warning}>
                  Submit
                </Button>
              </Segment>
            </Form>
            {this.state.error.warning? <Message
            error={this.state.error.warning}
            header='Cannot Submit'
            content={this.state.error.message}
            />: <div />}
            <Message>
              Already have an account? <Link to="/login"> Login!</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapState = () => ({ message: 'Sign up' });
const mapDispatch = (dispatch) => {
  return {
    signupSubmit: async (firstName, lastName, email, password, confirmPassword) => {
      let user = {first_name: firstName, last_name: lastName, email: email, password: password, confirm_password: confirmPassword}
      await dispatch(createUser(user));
      dispatch(login(email, password));
      history.push('/roster')
    }

  }
};

export default connect(mapState, mapDispatch)(Register);
