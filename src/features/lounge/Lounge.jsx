import { useSelector } from 'react-redux'

export const Lounge = () => {
    const auth_token = useSelector(state => state.auth.session.token)
    return <h1>Success!
        here's the token {auth_token}
    </h1>
}