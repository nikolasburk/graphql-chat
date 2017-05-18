import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'

const subscriptionsUrl = 'wss://subscriptions.graph.cool/v1/cj2upmc4249op0149yfjuojf8'
const graphQLEndpoint = 'https://api.graph.cool/simple/v1/cj2upmc4249op0149yfjuojf8'

const subscriptionsClient = new SubscriptionClient(subscriptionsUrl, {
  reconnect: true,
})

const networkInterface = createNetworkInterface({
  uri: graphQLEndpoint
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  subscriptionsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
)
