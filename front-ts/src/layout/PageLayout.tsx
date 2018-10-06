import * as React from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Logout from '../auth/Logout';
import Register from '../auth/Register';
import { AUTH_TOKEN } from '../constant';
import ProjectList from '../project/ProjectList';

class PageLayout extends React.Component {
  private tokenValue = localStorage.getItem(AUTH_TOKEN);
  public render() {
    return (
      <div className="container">
        <header className="navbar App-header">
          <div className="container">
            <div className="columns">
              <div className="column col-5">
                <section className="navbar-section">
                  <BrowserRouter forceRefresh={true}>
                    <NavLink to="/projects">
                      <h2>DoProject</h2>
                    </NavLink>
                  </BrowserRouter>
                </section>
              </div>
              {}
              {this.tokenValue && (
                <div className="column col-5">
                  <section className="navbar-section navbar-center">
                    <h3>List of project</h3>
                  </section>
                </div>
              )}
              {this.tokenValue && (
                <div className="column col-2">
                  <section className="navbar-section">
                    <BrowserRouter forceRefresh={true}>
                      <NavLink to="/logout">LogOut</NavLink>

                    </BrowserRouter>
                  </section>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container">
          <BrowserRouter forceRefresh={true}>
            <Switch>
              <Route
                exact={true}
                path="/"
                render={() => (this.tokenValue ? <Redirect to="/projects" /> : <Login />)}
              />
              <Route path="/projects" component={ProjectList} />
              <Route path="/register" component={Register} />

              <Route
                exact={true}
                path="/login"
                render={() => (this.tokenValue ? <Redirect to="/projects" /> : <Login />)}
              />
              <Route path="/logout" component={Logout} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default PageLayout;
