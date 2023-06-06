import React, {useEffect, useState} from 'react' 
import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

 const NotePage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log("id:", id)
  const note1 = notes.find(note => note.id===Number(id))


  let [note, setNote] = useState([])

  useEffect(() => {
     getNote()
  }, [id])

  let getNote = async () => {
    if(id === 'new'){
      return
    }
    let url = 'http://localhost:8000/notes/' + id
    let response = await fetch(url)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    console.log('Create Note')
    let url = 'http://localhost:8000/notes/'
    await fetch(url, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }


  let updataNote = async () => {
    let url = 'http://localhost:8000/notes/' + id
    await fetch(url, {
      method: 'PUT',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let deleteNote = async () => {
    let url = 'http://localhost:8000/notes/' + id
    await fetch(url, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
    navigate('/')
  }


  
  let handleSubmit = () => {

    if(id !== 'new' && !note.body){
      deleteNote()
    }
    else if(id !== 'new'){
      updataNote()
    }
    else if(id === 'new' && note !== null){
      createNote()
    }

    navigate('/')
  }

  
  return (
    <div className='note'>
      <div className='nots-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>

        {id !== 'new' ? ( 
           <button onClick={deleteNote} className='note-header'> Delete </button>
        ): (
          <button onClick={handleSubmit} className='note-header'> Done </button>
        )}

      </div>

      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>

      </textarea>

    </div>
  )
}


export default NotePage