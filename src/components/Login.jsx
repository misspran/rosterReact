import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../store';

const Login = (props) => {
  const { handleSubmit, error } = props;


  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="violet" textAlign="center">
            Login here!
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="envelope outline"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                type="text"
                required
                error={error}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                required
                error={error}
              />
              <Button color="violet" className="button" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          { error ? <Message
            error={error}
            header="Problem with Login"
            content="Invalid email or password. Please create account if you're not yet a user."
          /> : <div />}
          <Message>
            Don't have an account? <Link to="/register"> Sign Up!</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapLogin = (state) => ({
    error: state.user.error,
  });

const mapDispatch = (dispatch) => ({
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(login(email, password)); 
    },
  });

export default connect(mapLogin, mapDispatch)(Login);

