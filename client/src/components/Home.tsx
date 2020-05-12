import React, { useState, useReducer, useRef, useEffect } from 'react'
import { Spinner, Button, ListGroupItem, Container, Form, FormGroup, Label, Input } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import axios from "../../../../../../Documents/React projekti/loginfull/client/node_modules/axios"

function Home() {

    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // load all items
    useEffect(() => {
        setIsLoading(true)
        axios
            .get('/api/items')
            .then(res => {
                dispatch({ type: 'GET_ITEMS', payload: res.data })
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // add new item
    const handleSubmit = (e: any) => {
        e.preventDefault()
        let name = { "name": input }
        axios
            .post('/api/items', name)
            .then(res => dispatch({ type: 'ADD_ITEM', payload: res.data }))
    }

    // delete item
    const handleDelete = (id: number) => {
        axios
            .delete(`/api/items/${id}`)
            .then(() => dispatch({ type: 'DELETE_ITEM', id: id }))
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
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Add item</Label>
                            <Input type='text' onChange={(e: any) => setInput(e.target.value)}></Input>
                        </FormGroup>
                    </Form>
                    <TransitionGroup>
                        {items.map((item: { name: string, _id: number }) => (
                            <CSSTransition key={item._id} timeout={200} classNames='fade'>
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