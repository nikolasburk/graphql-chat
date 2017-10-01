import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.css'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'

const projectId = ''
const graphQLEndpoint = `https://api.graph.cool/simple/v1/${projectId}`

const networkInterface = createNetworkInterface({
  uri: graphQLEndpoint
})

const subscriptionsUrl = `wss://subscriptions.graph.cool/v1/${projectId}`

const subscriptionsClient = new SubscriptionClient(subscriptionsUrl, {
  reconnect: true,
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
