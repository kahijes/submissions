import axios from 'axios'
const baseUrl = 'api/persons'


const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObject);
    return request.then(response => response.data)
}


const phonebookEntries = {  getAll, create, deleteEntry, update}
export default phonebookEntries