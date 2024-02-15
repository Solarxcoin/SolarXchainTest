import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    // <Navbar fixed="top" bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand tag={Link} href="/">SOL X</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link tag={Link} href="/">S</Nav.Link>
    //         <Nav.Link tag={Link} href="/homePage">Home</Nav.Link>
    //         <Nav.Link tag={Link} href="/createToken">Create Token</Nav.Link>
    //         <Nav.Link tag={Link} href="/explorer">Explorer</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    // <Navbar fixed="top" bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand tag={Link} href="/">SOL X</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link tag={Link} href="/">Home</Nav.Link>
    //         <Nav.Link tag={Link} href="/createToken">Create Token</Nav.Link>
    //         <Nav.Link tag={Link} href="/explorer">Explorer</Nav.Link>
    //         <Nav.Link tag={Link} href="/wallet">Wallet</Nav.Link>

    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand tag={Link} href="/">SOL X</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link tag={Link} href="/homePage">Home</Nav.Link> */}
            <Nav.Link tag={Link} href="/createToken">Create Token</Nav.Link>
            <Nav.Link tag={Link} href="/">Explorer</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link tag={Link} href="/connectWallet">Connect Wallet</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavigationBar;