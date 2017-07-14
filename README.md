# graphql-chat


## Schema

This is what the data model for the chat looks like:

```graphql
type Person {
  name: String!
  messages: [Message!]! @relation(name: "UserMessages")
}

type Message {
  text: String!
  sentBy: Person! @relation(name: "UserMessages")
}
```

## Get your GraphQL Endpoint

You first have to get your GraphQL endpoint for the above schema using the [Graphcool CLI](https://www.npmjs.com/package/graphcool):

```
# Install Graphcool CLI
npm install -g graphcool

# Get your GraphQL Endpoint (create project in Graphcool Console)
# This will open a browser and require you to log in
graphcool init --schema https://graphqlbin.com/chat.graphql --name Chat
```

Copy the endpoint for the `Simple API` and use it in the next step. You can always retrieve your endpoints by using `graphcool endpoints` in the directory where `project.graphcool` is located (usually where you created the project).

## Connect your App

In `index.js` you need to set the variables `graphQLEndpoint` and `subscriptionsUrl`. You can retrieve your endpoints by calling `graphcool endpoints` in the same directory where you created the project (i.e. where you called `graphcool init`).

- `graphQLEndpoint ` is the endpoint for the **Simple API**
- `subscriptionsUrl` is the endpoint for the **Subscriptions API**

## Run the app 🚀

That's it, you can now start the app:

```
yarn install
yarn start
```

Go to **http://localhost:3000** in your browser to start chatting 💬

