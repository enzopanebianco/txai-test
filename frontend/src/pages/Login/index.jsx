import React, { Fragment, useState } from "react"
import { Button, Container, InputGroup, FormControl, FloatingLabel, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router"
import { api } from "../../services/api"
export default function Login() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin,setErrorLogin] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
        const { data } = await api.post("/login", {
            name,
            password
        })

        const { token } = data
        if (token) {
            localStorage.setItem('user', token)

            navigate('/products')
        }
    }
    catch(error){
        setErrorLogin(true)
    }
       
    }

    return (
        <Fragment>

            <Container className="w-50 p-3 mt-5" >
                <h1>Login</h1>
                {
                    errorLogin&& <strong class="text-danger">Usuário ou senha incorretos</strong>
                }
                <FormGroup>
                    <InputGroup>
                        <FloatingLabel label="Usuário" className="mb-3" controlId="floatingInput" />
                        <FormControl
                            placeholder="Usuário"
                            className="mb-3 mt-3 col-6"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FloatingLabel label="Senha" className="mb-3" controlId="floatingInput" />
                        <FormControl
                            placeholder="Senha"
                            className="mb-3"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    <Button onClick={() => handleLogin()}>Entrar</Button>
                </FormGroup>
            </Container>

        </Fragment>
    )
}