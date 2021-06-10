import {useState} from 'react'
export const useField = (type) => {
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const data = {
        type: type,
        value: value,
        onChange: onChange
    }

    const reset = () => {
        setValue('')
    }

    return {
        data,
        reset
    }
}
