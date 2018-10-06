import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { AUTH_TOKEN, CURRENT_USER } from '../constant';

class Register extends React.Component<any> {
  public state = {
    email: '',
    error: '',
    password: '',
    username: ''
  };

  public render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-5 col-mx-auto">
            <h3>Register</h3>
            {this.state.error && <span className="text-error">{this.state.error}</span>}
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="username"
                placeholder="username"
                onChange={e => {
                  this.handleUsername(e.target.value);
                }}
                value={this.state.username}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="email"
                onChange={e => {
                  this.handleEmail(e.target.value);
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                placeholder="password"
                type="password"
                onChange={email => this.setState({ password: email.target.value })}
                value={this.state.password}
              />
            </div>

            {this.state.email &&
              this.state.password && (
                <button className="btn btn-primary" onClick={this.submit}>
                  Log in
                </button>
              )}
          </div>
        </div>
      </div>
    );
  }

  private submit = async (e: any) => {
    const { email, password, username } = this.state;
    await this.props
      .registerMutation({
        variables: { email, password, username }
      })
      .then((res: any) => {
        const { token, ...otherData } = res.data.register;
        localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
        localStorage.setItem(CURRENT_USER, JSON.stringify(otherData));
        return token;
      })
      .then(() => this.props.history.push('/projects'))
      .catch((err: any) => this.setState({ error: err.message }));
  };

  private handleEmail = (value: string) => {
    let error = '';
    const email = { a: 0, p: 0 };
    email.a = value.indexOf('@');
    email.p = value.indexOf('.', email.a);
    console.log(email);
    if (
      value.length > 3 &&
      email.a > 1 &&
      email.p > email.a + 2 &&
      value.length > email.p + 2 &&
      value.indexOf('yopmail') === -1
    ) {
      this.setState({ ...this.state, email: value });
    } else {
      error = 'must be an email';
    }
    this.setState({ ...this.state, email: value, error });
  };

  private handleUsername = (value: string) => {
    if (value.length < 4) {
      this.setState({ ...this.state, username: value, error: 'username too short' });
    }
    this.setState({ ...this.state, username: value });
  };
}

const registerUserMutation = gql`
  mutation registerMutation($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      token
      email
      username
    }
  }
`;

export default graphql(registerUserMutation, {
  name: 'registerMutation'
})(Register);
