import React, { useState, useReducer, useRef, useEffect, useContext } from 'react'
import { Spinner, Button, ListGroupItem, Container, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import axios from "../../../../../../Documents/React projekti/loginfull/client/node_modules/axios"
import { AppContext } from './context/AppContext'

function Home() {

    const inputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState<null | string>(null)
    const [isopen, setisopen] = useState(true)

    const { state } = useContext(AppContext)

    const onDismiss = () => setisopen(false)

    const token = localStorage.getItem('token')

    // load all items
    useEffect(() => {
        if (state.user) {
            setIsLoading(true)
            axios
                .get(`/api/items/${state.user._id}`)
                .then(res => {
                    dispatch({ type: 'GET_ITEMS', payload: res.data })
                    setIsLoading(false)
                })
                .catch(err => console.log('err', err))
        }

        if (state.isAuthenticated) setMsg(null)
    }, [state])

    // add new item
    const handleSubmit = (e: any) => {
        e.preventDefault()
        
        const config = { headers: { "x-auth-token": `${token}` } }
        const value = { "name": inputRef.current?.value, 'userId': state.user && state.user._id }
        axios
            .post('/api/items', value, config)
            .then(res => dispatch({ type: 'ADD_ITEM', payload: res.data }))
            .catch(err => (!state.isAuthenticated) && setMsg('You must be logged in'))

        inputRef.current && (inputRef.current.value = '')
    }

    // delete item
    const handleDelete = (id: number) => {
        const config = { headers: { "x-auth-token": `${token}` } }
        axios
            .delete(`/api/items/${id}`, config)
            .then(() => dispatch({ type: 'DELETE_ITEM', id: id }))
            .catch(err => (!state.isAuthenticated) && setMsg('You must be logged in'))
    }

    const [items, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'GET_ITEMS':
                return action.payload
            case 'ADD_ITEM':
                return [action.payload, ...state]
            case 'DELETE_ITEM':
                return state.filter((item: any) => item._id !== action.id)
            default:
                return state
        }
    }, [])

    return (
        <div>
            {isLoading ? <Spinner color='primary' /> :
                <Container id='container'>
                    {msg ? <Alert isOpen={isopen} toggle={onDismiss} color='danger'>{msg}</Alert> : null}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Add item</Label>
                            <input type='text' ref={inputRef} id='inputItem'></input>
                        </FormGroup>
                    </Form>
                    <TransitionGroup>
                        {items.map((item: { name: string, _id: number }) => (
                            <CSSTransition key={item._id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    {item.name}
                                    <Button
                                        className='remove-btn'
                                        size='sm'
                                        color='danger'
                                        onClick={() => handleDelete(item._id)}
                                    >&times;
                                    </Button>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </Container>
            }
        </div>
    )
}

export default Home