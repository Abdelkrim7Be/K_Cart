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
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/*So that the elements of the navbar don't stretch all the way to the edges */}
          <NavbarBrand href="/">
            <img src={logo} alt="K-Cart" />
            K-Cart
          </NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
          <NavbarCollapse id="basic-navbar-nav">
            {/* It is in the collapse where we put the actual Nav */}
            <Nav className="ms-auto">
              {/* ms-auto : this is gonna move the nav links to the right , not next to the logo */}
              {/* Link to the Cart  */}
              <Nav.Link href="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
              {/* Link to the login */}
              <Nav.Link href="/login">
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
