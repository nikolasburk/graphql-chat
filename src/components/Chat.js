import React, { Component } from 'react'
import '../styles/Chat.css'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import { graphql, gql, compose } from 'react-apollo'

const newMessageSubscription = gql`
  subscription {
    Message(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        text
        createdAt
        sentBy {
          id
          name
        }
      }
    }
  }
`

class Chat extends Component {

  state = {
    message: '',
  }

  componentDidMount() {
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
      document: newMessageSubscription,
      updateQuery: (previousState, {subscriptionData}) => {
        const newMessage = subscriptionData.data.Message.node
        const messages = previousState.allMessages.concat([newMessage])
        return {
          allMessages: messages
        }
      },
      onError: (err) => console.error(err),
    })
  }

  render() {
    return (
      <div className='Chat'>
        <ChatMessages
          messages={this.props.allMessagesQuery.allMessages || []}
          endRef={this._endRef}
        />
        <ChatInput
          message={this.state.message}
          onTextInput={(message) => this.setState({message})}
          onResetText={() => this.setState({message: ''})}
          onSend={this._onSend}
        />
      </div>
    )
  }

  _onSend = () => {
    console.log(`Send: ${this.state.message}`)
    this.props.createMessageMutation({
      variables: {
        text: this.state.message,
        sentById: this.props.userId
      }
    })
  }


  /*
   * AUTO SCROLLING
   */

  _endRef = (element) => {
    this.endRef = element
  }

  componentDidUpdate(prevProps) {
    // scroll down with every new message
    if (prevProps.allMessagesQuery.allMessages !== this.props.allMessagesQuery.allMessages && this.endRef) {
      this.endRef.scrollIntoView()
    }
  }

}

const allMessages = gql`
  query allMessages {
    allMessages(last: 100) {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`

const createMessage = gql`
  mutation createMessage($text: String!, $sentById: ID!) {
    createMessage(text: $text, sentById: $sentById) {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`

export default compose(
  graphql(createMessage, {name : 'createMessageMutation'}),
  graphql(allMessages, {name: 'allMessagesQuery'})
)(Chat)