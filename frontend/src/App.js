import { Container } from "react-bootstrap";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* Adding a padding in the y axe */}
        <Container>
          <h1>Welcome to K-Cart</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
