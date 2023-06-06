import React, {useEffect, useState} from 'react' 
import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import NotesListPage from './NotesListPage';

 const NotePage = () => {
  const {id} = useParams();
  console.log("id:", id)
  const note = notes.find(note => note.id===Number(id))


  let [noteNew, setNote] = useState(null)

  useEffect(() => {
     getNote()
  }, [id])

  let getNote = async () => {
    let response = await fetch('http://localhost:8000/notes/${id}')
    let data = await response.json()
    setNote()
  }

  
  return (
    <div className='note'>
      <div className='nots-header'>
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>

      <textarea value={note?.body}>

      </textarea>

    </div>
  )
}


export default NotePage