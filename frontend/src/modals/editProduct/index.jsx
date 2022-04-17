import React, { useState } from 'react';
import { Modal, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { authApi } from '../../services/api';

export default function EditProductModal({show,onHide,product}) {

    const [title,setTitle] = useState(product.name)
    const [price,setPrice] = useState(product.price)
    const [quantity,setQuantity] = useState(product.quantity)

    const editProduct = async() =>{
        await authApi.put(`/products/${product.id}`,{
            name:title,
            price,
            quantity
        })
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <InputGroup>
                        <FormControl placeholder="Título"
                            className="mb-3 mt-3 col-6"
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" />
                    </InputGroup>
                    <InputGroup>
                        <FormControl placeholder="Preço em R$"
                            className="mb-3 mt-3 col-6"
                            defaultValue={price}

                            onChange={(e) => setPrice(e.target.value)}
                            type="text" />
                    </InputGroup>
                    <InputGroup>
                        <FormControl placeholder="Quantidade"
                            className="mb-3 mt-3 col-6"
                            defaultValue={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number" />
                    </InputGroup>

                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => editProduct()} variant="primary">Salvar</Button>
            </Modal.Footer>

        </Modal>
    )
}