import React from 'react'


const PersonsForm = (props) => {
    return(
        <div>
            <form onSubmit={props.addInformation}>
            <div> name: <input value={props.newName} onChange={props.handleNameChange}/></div>
            <div> number: <input value={props.newNumber} onChange={props.handleNumberChange}/> </div>
            <button type="submit">add</button>
            </form>
        </div>
    )
}



export default PersonsForm