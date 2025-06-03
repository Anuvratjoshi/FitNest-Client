import axios from 'axios'
import { api } from '../config'

// default
axios.defaults.baseURL = api.BACKEND_URL
// content type
axios.defaults.headers.post['Content-Type'] = 'application/json'

// #### ADDED: Request interceptor to dynamically attach latest token ####
axios.interceptors.request.use(
    function (config) {
        const authUser = getLoggedinUser()
        let token = authUser?.data?.token

        if (token?.startsWith('Bearer ')) {
            token = token.replace('Bearer ', '')
        }
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

// intercepting to capture errors
axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message
        switch (error.status) {
            case 500:
                message = 'Internal Server Error'
                break
            case 401:
                message = 'Invalid credentials'
                const authUser = getLoggedinUser()
                const role = authUser?.data?.role
                let token = authUser?.data?.token

                if (token && role) {
                    // #### Clear storage if we get 401 & Redirect to login ####
                    localStorage.removeItem('authUser')
                    sessionStorage.removeItem('authUser')

                    window.location.href =
                        role === 'admin' ? '/login' : 'superadmin-login'
                }

                break
            case 404:
                message =
                    'Sorry! the data you are looking for could not be found'
                break
            default:
                message =
                    error?.response?.data?.message || error.message || error
        }
        return Promise.reject(message)
    },
)
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = token => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

class APIClient {
    /**
     * Fetches data from given url
     */

    //  get = (url, params) => {
    //   return axios.get(url, params);
    // };
    get = (url, params) => {
        let response

        let paramKeys = []

        if (params) {
            Object.keys(params).map(key => {
                paramKeys.push(key + '=' + params[key])
                return paramKeys
            })

            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join('&') : ''
            response = axios.get(`${url}?${queryString}`, params)
        } else {
            response = axios.get(`${url}`, params)
        }
        return response
    }
    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data)
    }
    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.patch(url, data)
    }

    put = (url, data) => {
        return axios.put(url, data)
    }
    /**
     * Delete
     */
    delete = (url, config) => {
        return axios.delete(url, { ...config })
    }
}
const getLoggedinUser = () => {
    const sessionData = sessionStorage.getItem('authUser')
    const localData = localStorage.getItem('authUser')
    const user = sessionData || localData
    if (!user) {
        return null
    } else {
        return JSON.parse(user)
    }
}

export { APIClient, setAuthorization, getLoggedinUser }
