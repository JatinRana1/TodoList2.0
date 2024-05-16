import React from 'react'
import { Button } from 'react-bootstrap'
const UpdateBtn = ({setUpdateDate, updateFromToggler, toDos, id, disable, setDisabled}) => {
  
  return (
    <Button variant='secondary' size='sm' 
    onClick={()=>{
      updateFromToggler(true)
      setDisabled(true)
      setUpdateDate(toDos.filter((todo)=>todo.id === id));
    }}
    disabled={disable}
    >Update</Button>
  )
}

export default UpdateBtn