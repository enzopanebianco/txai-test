import React,{useState} from 'react'
import { Modal, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { authApi } from '../../services/api'
export default function CreateUserModal({show,onHide}){

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")

    const createUser = async () => {
        await authApi.post('/users', {
            name,
            password
        })
        onHide()
    }


    return(
        <Modal show={show} onHide={onHide}>

        <Modal.Header closeButton>
            <Modal.Title>Criar Usuário</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <FormGroup>
                <InputGroup>
                    <FormControl placeholder="Nome"
                        className="mb-3 mt-3 col-6"
                        onChange={(e) => setName(e.target.value)}
                        type="text" />
                </InputGroup>
                <InputGroup>
                    <FormControl placeholder="Senha"
                        className="mb-3 mt-3 col-6"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" />
                </InputGroup>

            </FormGroup>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={() => createUser()} variant="primary">Salvar</Button>
        </Modal.Footer>

    </Modal>
    )
}