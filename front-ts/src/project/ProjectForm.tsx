import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { CURRENT_USER } from '../constant';


class ProjectForm extends React.Component<any> {
  public state = {
    description: '',
    project: ''
  };
  public render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-5 col-mx-auto">
            <div className="form-group">
              <label className="form-label">Add project title</label>
              <input
                className="form-input"
                type="text"
                id="input-example-1"
                placeholder="Add project title"
                onChange={e => this.setState({ project: e.target.value })}
                value={this.state.project}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Add project description</label>
              <textarea
                className="form-input"
                id="input-example-3"
                placeholder="Add project description"
                onChange={e => this.setState({ description: e.target.value })}
                value={this.state.description}
              />
            </div>
                {this.state.description &&
              this.state.project && (
                <button className="btn btn-primary" onClick={this.submit}>
                  Create project
                </button>
              )}
          </div>
        </div>
      </div>
    );
  }

  private submit = async (e: any) => {
    const { project, description } = this.state;
    /* tslint:disable-next-line */
    const data = localStorage.getItem(CURRENT_USER);
    if (data && this.state.description && this.state.project) {
      const { email } = JSON.parse(data);
      await this.props.createProjectMutation({
        variables: { email, project, description }
      });
    } else {
      this.props.history.push('/login');
    }
  };
}

const createProjectByUser = gql`
  mutation createProjectMutation($email: String!, $project: String!, $description: String!) {
    createProject(email: $email, project: $project, description: $description) {
      id
      description
    }
  }
`;

export default graphql(createProjectByUser, {
  name: 'createProjectMutation'
})(ProjectForm);
