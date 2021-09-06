import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { addChat, fetchContacts } from './loungeSlice'
import Peer from 'peerjs'
import ChatPane from './ChatPane'
import { Flex } from '@chakra-ui/react'

export const Lounge = () => {
  // store peer object in state
  const [peer, initPeer] = useState(null)

  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.session.token)
  const url = 'http://localhost:8000/api/lounge'
  const peerId = useSelector(state => state.auth.session.peerId)

  // initialize peer on first render
  useEffect(() => {
    initPeer(new Peer(peerId, {
      host: 'localhost',
      port: '8000',
      path: '/peer',
      debug: 3
    }))
    dispatch(fetchContacts({ url, authToken }))
  }, [authToken, dispatch, peerId])

  useEffect(() => {
    // check if peer is initialized
    if (peer) {
      peer.on('open', id => {
        console.log('Peer connection opened', id)
      })

      // Recieve
      peer.on('connection', (conn) => {
        console.log('Got connection', conn)
        conn.on('open', () => {
          console.log('opened')
          conn.on('data', (data) => {
            console.log('Recieved', data)
            dispatch(addChat(data))
          })
        })
        conn.on('error', (err) => {
          console.error(err)
        })
      })
      peer.on('close', () => {
        console.log('Connection closed')
      })
      peer.on('disconnected', () => {
        console.log('disconnected, trying to reconnect')
        peer.reconnect()
      })
    }
  }, [peer, dispatch])
  // const connectToPeer = ({ peerId, data }) => {
  //   // expected to call after peer gets initailized
  //   const conn = peer.connect(peerId)
  //   console.log('Message', data)
  //   conn.on('open', () => {
  //     console.log('Message', data)
  //     if (data) { conn.send(data) }
  //   })
  //   conn.on('close', () => {
  //     console.log('Connection closed')
  //   })
  // }

  return (
    <Flex w='100%' overflow='hidden' direction='row'>    <ContactList />
      <ChatPane peer={peer} />
    </Flex>
  )
}
