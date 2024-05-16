import { Button, Container, Navbar } from "react-bootstrap";
import useAuthContext from "../hook/useAuthContext";

const Navigation = () => {

  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Navbar bg="light" expand="sm">
        <Container>
            <Navbar.Brand>Todo List</Navbar.Brand>
            <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text> 
                        Signed in as: {user.firstName + ' ' + user.lastName}
                    </Navbar.Text>
                    <Button className="mx-2" onClick={handleLogout}>Sign Out</Button>
                </Navbar.Collapse>
        </Container>
    </Navbar>    
  )
}

export default Navigation