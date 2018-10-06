import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Login from '../auth/Login';
import { AUTH_TOKEN } from '../constant';
import ProjectForm from './ProjectForm';
import ProjectItem from './ProjectItem';

const tokenValue = localStorage.getItem(AUTH_TOKEN);
const ProjectList = ({ data }: any): any => {
  if (data.loading) {
    return null;
  }
  if (!tokenValue) {
    return (
      <BrowserRouter forceRefresh={true}>
        <Route
          exact={true}
          path="/projects"
          render={() => (tokenValue ? <Redirect to="/projects" /> : <Login />)}
        />
      </BrowserRouter>
    );
  }
  return (
    <div>
      {/* tslint:disable-next-line */}
      <ProjectForm/>
      <div className="divider text-center" data-content="PROJECTS" />
      <button onClick={() => data.refetch()}>Refetch!</button>
      <ul>
        {data.allProjects.map((project: any) => (
          <li key={project.id}>
            <ProjectItem project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const allProjectQuery = gql`
  {
    allProjects {
      id
      project
      description
    }
  }
`;

export default graphql(allProjectQuery)(ProjectList);
