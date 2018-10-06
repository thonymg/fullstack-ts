import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import App from './App';
import { AUTH_TOKEN } from './constant';
import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});


const middlewareLink = new ApolloLink((operation: any, forward: any) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },
  })
  return forward(operation)
})

const httpLinkAuth = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: ApolloLink.from([httpLinkAuth]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
