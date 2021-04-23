import React from 'react'

const Notification = (props) => {
    if(props.message === null) {
        return null
    }
    else if (props.type === false) {
        return(
        <div className="error">
            {props.message}
        </div>)
    }
    
    return (
    <div className="FourError"> 
        {props.message} 
    </div>)
}



export default Notification