const fetch = require('isomorphic-fetch')
const Base64 = require('Base64')
const FormData = require('form-data')

const apiKey = 'api:key-__KEY__' // replace KEY
const url = 'https://api.mailgun.net/v3/__SANDBOX_ID__.mailgun.org/messages' // replace __SANDBOX_ID__

const FORBIDDEN_WORD = 'REST'

module.exports = event => {

  const message = event.data.Message.node.text
  console.log(`Received message: ${message}`)

  if (message.includes(FORBIDDEN_WORD)) {
    console.log(`The message '${message}' contains the forbidden word: ${FORBIDDEN_WORD}!`)
    const receiverEmail = 'nikolas@graph.cool'

    const form = new FormData()
    form.append('from', 'Graphcool <hello@graph.cool>')
    form.append('to', `Anonymous <${receiverEmail}>`)
    form.append('subject', 'LAUNCH THE MISSILES!')
    form.append('text', `The forbidden word (${FORBIDDEN_WORD}) was used: ${message}! \n\nLAUNCH THE MISSILES!`)

    fetch(url, {
      headers: {
        'Authorization': `Basic ${Base64.btoa(apiKey)}`
      },
      method: 'POST',
      body: form
    })
  } else {
    console.log(`This is ok: ${message}`)
  }

}