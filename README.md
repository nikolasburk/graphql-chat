# graphql-chat

## Data Model

This is what the data model for the chat looks like (it's defined in [./graphcool/types.graphql](./graphcool/types.graphql)):

```graphql
type Person {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!  
  name: String!
  messages: [Message!]! @relation(name: "UserMessages")
}

type Message {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!  
  text: String!
  sentBy: Person! @relation(name: "UserMessages")
}
```

## Get Started

### 1. Clone the Repository

Clone the repository with the following command, then navigate into the cloned project:

```sh
git clone git@github.com:nikolasburk/graphql-chat.git
cd graphql-chat
```

### 2. Get your GraphQL Endpoint

Next you need to create your own GraphQL server that provides an API with CRUD operations for the above data model. You can do this using the [Graphcool CLI](https://docs-next.graph.cool/reference/basics/cli-zboghez5go):

```sh
npm install -g graphcool@beta
```

> **Note:** The CLI to manage your Graphcool project is currently in beta.

Once the Graphcool CLI is installed, you can use the [`graphcool init`](https://docs-next.graph.cool/reference/basics/cli-zboghez5go#graphcool-init) command to create your GraphQL server. You need to invoke the command from inside the `graphcool` directory. It'll then use the existing [project definition](https://docs-next.graph.cool/reference/basics/project-configuration-opheidaix3#project-definition) (`graphcool.yml` and all related files) to create your project: 

```sh
cd graphcool
graphcool init
```

> **Note:** This command also creates the `.graphcoolrc` file you can use to configure your [environments](https://docs-next.graph.cool/reference/basics/project-configuration-opheidaix3#environments). 

### 3. Connect your App

In `index.js` you need to set the variable `projectId` which is then used in `graphQLEndpoint` and `subscriptionsUrl`. You can access your project ID by using the `graphcool info` command inside the `graphcool` directory. 

### 4. Run the App 🚀

That's it, you can now start the app:

```sh
cd ..
yarn install
yarn start
```

Go to **[http://localhost:3000](http://localhost:3000)** in your browser to start chatting 💬

### 5. [Optional] Use the Server-side Subscription to send Emails with Mailgun

If you want to make use of the server-side subscription `detectWord` that's configured in `graphcool.yml`, you need to create a [Mailgun](https://www.mailgun.com) sandbox and configure the credentials inside [./graphcool/code/detectWord.js](./graphcool/code/detectWord.js).



