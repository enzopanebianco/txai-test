import React, { useState } from 'react';
import { Modal, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { authApi } from '../../services/api';

export default function EditUserModal({show,onHide,user}){
    const [username,setUsername] = useState(user.name);
    const editUser = async() =>{
        await authApi.put(`/users/${user.id}`,{name:username});
        onHide()
    }
    return(
        <Modal show={show} onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title>Editar Usuário</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <InputGroup>
                        <FormControl placeholder="Nome"
                            className="mb-3 mt-3 col-6"
                            defaultValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" />
                    </InputGroup>
                 
                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={editUser} variant="primary">Salvar</Button>
            </Modal.Footer>

        </Modal>
    )
}