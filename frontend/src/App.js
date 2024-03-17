import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* Adding a padding in the y axe */}
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

/**<Route> component: It is used to define a route and specify what component 
 * should be rendered when the URL matches that route's path.
<Outlet> component: It is used as a placeholder where nested routes can be 
rendered. Nested routes are routes that are children of another route and are 
typically used to create nested layouts or hierarchical UI structures. */

export default App;
