import React from 'react'
import note from '../assets/data'

import notes from '../assets/data'
import { useParams } from 'react-router-dom';

 const NotePage = () => {
    const {id} = useParams();
    const note = notes.find(note => note.id===Number(id))

  return (
    <div>
        <p>{note.body}</p>
    </div>
  )
}
export default NotePage