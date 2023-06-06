import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({note}) => {
 
  return (
    <Link to={'/note/' + note.id}>
      <p>{note.body}</p>
    </Link>
  )
}

export default ListItem
