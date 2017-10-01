import React, { Component } from 'react'
import '../styles/App.css'
import generateStupidName from 'sillyname'
import Chat from './Chat'
import { graphql, gql } from 'react-apollo'

const CHAT_USER_NAME_KEY = 'CHAT_USER_NAME'
const CHAT_USER_ID_KEY = 'CHAT_USER_ID'

class App extends Component {

  async componentDidMount() {
    let name = localStorage.getItem(CHAT_USER_NAME_KEY)
    if (!name) {
      name = generateStupidName()
      const result = await this.props.createPersonMutation({
        variables: { name }
      })
      localStorage.setItem(CHAT_USER_NAME_KEY, result.data.createPerson.name)
      localStorage.setItem(CHAT_USER_ID_KEY, result.data.createPerson.id)
    }
    console.log(`User: ${name}`)
  }

  render() {
    const name = localStorage.getItem(CHAT_USER_NAME_KEY)
    const userId = localStorage.getItem(CHAT_USER_ID_KEY)
    return (
      <Chat name={name} userId={userId} />
    )
  }
}

const createPerson = gql`
  mutation createPerson($name: String!) {
    createPerson(name: $name) {
      id
      name
    }
  }
`


export default graphql(createPerson, {name: 'createPersonMutation'})(App)
