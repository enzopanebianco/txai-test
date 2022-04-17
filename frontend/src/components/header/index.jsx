import React from 'react';
import { Navbar,Nav,NavDropdown,Container,Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Header({ username,role }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand >Sistema Txai</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={username}
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={logout} >Sair</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                { role===1&& 
                <Link to="/admin">
                <Button  >Dashboard Admin</Button> 
                </Link>
                }
            </Container>
        </Navbar>
    )
}