import React from 'react';
import history from '../history';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
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

  onSignupSubmit = async (evt) => {
    evt.preventDefault();
    console.log(this.state)
    const { signupSubmit, loginSubmit } = this.props;
    const firstName = evt.target.first_name.value;
    const lastName = evt.target.last_name.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const confirmPassword = evt.target.confirm_password.value;
   await signupSubmit(firstName, lastName, email, password, confirmPassword)
   await loginSubmit(email, password)
   history.push('/home');

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
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="violet" textAlign="center">
              Register here!
            </Header>
            <Form size="large" onSubmit={this.onSignupSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First name"
                  name="first_name"
                  type="first_name"
                  onChange={evt=> this.setState({first_name: evt.target.value})}
                  required
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last name"
                  name="last_name"
                  type="last_name"
                  onChange={evt=> this.setState({last_name: evt.target.value})}
                  required
                />
                <Form.Input
                  fluid
                  icon="envelope outline"
                  iconPosition="left" 
                  placeholder="E-mail address"
                  name="email"
                  type="email"
                  onChange={evt=> this.setState({email: evt.target.value})}
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
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
                  placeholder="Confirm password"
                  name="confirm_password"
                  type="password"
                  onKeyUp={this.handleChange}
                  onBlur={this.errorWarning}
                  error={this.state.error.warning}
                  required
                />
                <Button color="violet" className="button" fluid size="large" type="submit" disabled={this.state.error.warning}>
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message
            error={this.state.error.warning}
            header='Cannot Submit'
            content={this.state.error.message}
            />
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
    signupSubmit: (firstName, lastName, email, password, confirmPassword) => {
      let user = {first_name: firstName, last_name: lastName, email: email, password: password, confirm_password: confirmPassword}
      dispatch(createUser(user));
    },
    loginSubmit: (email, password) =>{
      let loginUser = {email: email, password: password}
      dispatch(login(loginUser))
    }

  }
};

export default connect(mapState, mapDispatch)(Register);
