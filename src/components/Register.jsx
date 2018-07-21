import React from 'react';
import history from '../history';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import store from '../store';
import { createUser } from '../store/newUsers';
import { login } from '../store/user';



class Register extends React.Component {

  constructor(props) {
    super(props);
      this.state = {}; 
  }

  onSignupSubmit = (evt) => {
    event.preventDefault();
    console.log(this.state)
    const { signupSubmit } = this.props;
    const firstName = evt.target.first_name.value;
    const lastName = evt.target.last_name.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const confirmPassword = evt.target.confirm_password.value;
   signupSubmit(firstName, lastName, email, password, confirmPassword)

  }

  render() {
    
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
                  onChange={evt=> this.setState()}
                  required
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last name"
                  name="last_name"
                  type="last_name"
                  required
                />
                <Form.Input
                  fluid
                  icon="envelope outline"
                  iconPosition="left" 
                  placeholder="E-mail address"
                  name="email"
                  type="email"
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  name="confirm_password"
                  type="password"
                  required
                />
                <Button color="violet" className="button" fluid size="large" type="submit">
                  Submit
                </Button>
              </Segment>
            </Form>
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
    }
  }
};

export default connect(mapState, mapDispatch)(Register);
