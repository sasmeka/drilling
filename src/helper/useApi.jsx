import axios from 'axios'
import { useState } from "react";
import { useSelector } from "react-redux";

function useApi() {
    let { token } = useSelector((s) => s.user)
    token = token != '' ? token : ''
    const [request, setrequest] = useState({
        baseURL: process.env.REACT_APP_API_URL || '',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return axios.create(request)
}

export default useApi