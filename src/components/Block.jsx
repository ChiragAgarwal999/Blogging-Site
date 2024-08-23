import React from 'react'
import './glitch.css'

function Block() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
         <div className="glitch text-dark" data-text="You were blocked by the Admin!">You were <span className='text-danger'>blocked</span> by the Admin!</div>

         </div>
  )
}

export default Block