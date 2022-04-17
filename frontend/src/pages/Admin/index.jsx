import jwtDecode from 'jwt-decode'
import React, { Fragment, useEffect, useState } from 'react'
import { Container, ListGroup, ListGroupItem,Button } from 'react-bootstrap'
import Header from '../../components/header'
import EditUserModal from '../../modals/editUser'
import CreateUserModal from '../../modals/createUser'
import { authApi } from '../../services/api'

export default function Admin() {
    const [admin, setAdmin] = useState()
    const [users, setUsers] = useState([])
    const [showEditUser, setShowEditUser] = useState(false)
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [userId,setUserId] = useState()

    const selectedUser = (id) => users.find(user => user.id === id);

    const reloadList = (funcCloseModal) =>{
        funcCloseModal(false)
        getUsers()
    }

    const deleteUser = (id) => {
        authApi.delete(`/users/${id}`)
        getUsers()
    }
    async function getUsers() {
        const { data } = await authApi.get('/users')

        setUsers(data)
    }
    useEffect(() => {
        function decodeUser() {
            const token = localStorage.getItem('user')
            const decoded = jwtDecode(token)
            setAdmin(decoded)
        }
        decodeUser()
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Fragment>
            <Header username={admin?.name} />
            <Container>
                <h1 className="mt-3">Usuários Registrados</h1>
                <Button onClick={()=>setShowCreateUser(true)} >Criar novo usuário</Button>
                <ListGroup className="w-100 mt-3">
                    {
                        users.map(userItem =>
                            <ListGroupItem className="d-flex justify-content-between">
                                {userItem.id === admin.id ?
                                    <strong>{admin.name}</strong> :
                                    <>{userItem.name}</>
                                }
                                <div>
                                    <a onClick={() => {setShowEditUser(true);setUserId(userItem.id)}}
                                        className='text-primary cursor-pointer'>
                                        Editar
                                    </a>
                                    <a onClick={() => deleteUser(userItem.id)} className='ms-3 text-danger'>
                                        Deletar
                                    </a>
                                </div>
                            </ListGroupItem>

                        )}
                </ListGroup>
                {showEditUser && <EditUserModal 
                user={selectedUser(userId)}
                show={showEditUser} onHide={()=>reloadList(setShowEditUser)} />}
                {showCreateUser&&<CreateUserModal show={showCreateUser} onHide={()=>reloadList(setShowCreateUser)} />}
            </Container>
        </Fragment >
    )
}