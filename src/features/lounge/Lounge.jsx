import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChat } from './loungeSlice'

export const Lounge = () => {
    const dispatch = useDispatch()
    const auth_token = useSelector(state => state.auth.session.token)
    const url = 'http://localhost:8000/api/lounge'
    useEffect(() => {
        dispatch(fetchChat({ url, auth_token }))
    })
    return <h1>Success!
        here's the token
    </h1>
}