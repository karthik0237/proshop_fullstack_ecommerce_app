import React from 'react'
import { Alert } from 'react-bootstrap'

function Message(props) {
    // In React, children is a special prop that allows components to accept and render content passed between their opening and closing tags.
    const {variant,children} = props
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

export default Message
