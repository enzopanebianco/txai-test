import React, { Fragment, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Moment from 'moment';
import EditProductModal from "../../modals/editProduct";
import { authApi } from "../../services/api";
export default function ProductsList({ products, reloadList }) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [productId, setProductId] = useState();

    const selectedProduct = (id) => products.find(product => product.id === id);

    const formatDate = (dt) => Moment(dt).format("DD/MM/YYYY");

    const deleteProduct = (id) =>{
        authApi.delete(`/products/${id}`)
        reloadList(setShowEditModal)
    }

    return (
        <Fragment>
            <Container className="d-flex justify-content-between">
                {
                    products.map(product =>
                        <Card key={product.id}>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Subtitle>Preço: {product.price}</Card.Subtitle>
                                <Card.Text>Estoque: {product.quantity}</Card.Text>
                                <Card.Text>{formatDate(product.register_dt)}</Card.Text>
                                <Card.Link onClick={() => { setShowEditModal(true); setProductId(product.id) }} className="cursor-pointer">Editar</Card.Link>
                                <Card.Link onClick={()=>deleteProduct(product.id)} 
                                className="text-danger cursor-pointer">Excluir</Card.Link>
                            </Card.Body>
                        </Card>
                    )
                }
                {showEditModal && <EditProductModal
                    show={showEditModal}
                    onHide={()=>reloadList(setShowEditModal)}
                    product={selectedProduct(productId)} />}
            </Container>
        </Fragment>
    )
}