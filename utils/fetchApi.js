import axios from 'axios'

export const BASE_URL = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'e692c1b86amsh092043c793b8770p179e09jsn373f0e2a08a8'
        }
    })

    return data
}