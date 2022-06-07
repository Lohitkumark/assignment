import Axios from 'axios'

const axios = Axios.create({
    baseURL:'http://23.21.204.21:8080/api/v1'
})

export default axios