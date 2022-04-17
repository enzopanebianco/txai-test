import React, { useState } from 'react'
import { Modal, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { authApi } from '../../services/api'

export default function RegisterProductModal({ show, onHide }) {

    const [title,setTitle] = useState("")
    const [price,setPrice] = useState()
    const [quantity,setQuantity] = useState(0)

    const registerProduct = async() =>{
        await authApi.post('/products',{
            name:title,
            price,
            quantity
        })
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title>Cadastrar novo produto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <InputGroup>
                        <FormControl placeholder="Título"
                            className="mb-3 mt-3 col-6"
                            onChange={(e)=>setTitle(e.target.value)}
                            type="text" />
                    </InputGroup>
                    <InputGroup>
                        <FormControl placeholder="Preço em R$"
                            className="mb-3 mt-3 col-6"
                            onChange={(e)=>setPrice(e.target.value)}
                            type="text" />
                    </InputGroup>
                    <InputGroup>
                        <FormControl placeholder="Quantidade"
                            className="mb-3 mt-3 col-6"
                            onChange={(e)=>setQuantity(e.target.value)}
                            type="number" />
                    </InputGroup>

                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={()=>registerProduct()} variant="primary">Salvar</Button>
            </Modal.Footer>

        </Modal>
    )
}