import Peer from 'peerjs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { fetchChat } from './loungeSlice'

export const Lounge = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.session.token)
  const id = useSelector(state => state.auth.session.peerId)
  const url = 'http://localhost:8000/api/lounge'
  const peer = new Peer(id, {
    host: 'localhost',
    port: '8000',
    path: '/peer'
  })
  peer.on('open', id => {
    console.log('My peer ID is: ' + id)
  })
  useEffect(() => {
    dispatch(fetchChat({ url, authToken }))
  }, [url, authToken, dispatch])
  return (<ContactList />)
}
