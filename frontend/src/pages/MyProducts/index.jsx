import React, { Fragment, useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import Header from "../../components/header";
import { authApi } from "../../services/api";
import { Button } from "react-bootstrap";
import ProductsList from "../../components/productsList";
import RegisterProductModal from "../../modals/registerProduct";

export default function MyProducts() {

    const [user, setUser] = useState();
    const [products, setProducts] = useState([]);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    async function getMyProducts() {
        const { data } = await authApi.get("/products/user");
        setProducts(data)
    }
    const reloadList = (funcCloseModal) => {
        funcCloseModal(false)
        getMyProducts()
    }

    useEffect(() => {
        function decodeUser() {
            const token = localStorage.getItem('user');
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
        decodeUser();
    }, [])

    useEffect(() => {
        getMyProducts();
    }, [])

    return (
        <Fragment>
            <Header username={user?.name} role={user?.role} />
            <Button
                onClick={() => setShowRegisterModal(true)}
                className="mt-3 mb-3 ms-5 btn-info d-flex">
                Registrar Novo Produto
            </Button>
            <ProductsList products={products} reloadList={reloadList} />
            <RegisterProductModal show={showRegisterModal}
                onHide={()=>reloadList(setShowRegisterModal)}
            />
        </Fragment>
    )
}