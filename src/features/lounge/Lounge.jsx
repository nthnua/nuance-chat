import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { fetchChat } from './loungeSlice'
import Peer from 'peerjs'
export const Lounge = () => {
  // store peer object in state
  const [peer, initPeer] = useState(null)

  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.session.token)
  const url = 'http://localhost:8000/api/lounge'
  const peerId = useSelector(state => state.auth.session.peerId)

  //initialize peer on first render
  useEffect(() => {
    initPeer(new Peer(peerId, {
      host: 'localhost',
      port: '8000',
      path: '/peer',
      debug: 2
    }))
    dispatch(fetchChat({ url, authToken }))
  }, [authToken, dispatch, peerId])

  useEffect(() => {
    if (peer) {
      peer.on('open', id => {
        console.log('Peer connection opened', id)
      })
      //When someone connects
      peer.on('connection', (conn) => {
        console.log('Got connection', conn)
        conn.on('open', (test) => {
          console.log(test)
        })
      })
    }
  }, [peer])
  const connectToPeer = ({ peerId }) => {
    //expected to call after peer gets initailized
    const conn = peer.connect(peerId)
  }

  return <ContactList connect={connectToPeer} />
}
