import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
// because we can't just replace Navbar.Brand's href, that why we use LinkContainer
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/*Container : So that the elements of the navbar don't stretch all the way to the edges */}
          <LinkContainer to="/">
            <NavbarBrand>
              <img src={logo} alt="K-Cart" />
              K-Cart
            </NavbarBrand>
          </LinkContainer>

          <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
          <NavbarCollapse id="basic-navbar-nav">
            {/* It is in the collapse where we put the actual Nav */}
            <Nav className="ms-auto">
              {/* ms-auto : this is gonna move the nav links to the right , not next to the logo */}
              {/* Link to the Cart  */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              {/* Link to the login */}
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
