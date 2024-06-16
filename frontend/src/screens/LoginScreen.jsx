import React from "react";
import { useState, useEffect } from "react";
/**We'll use useEffect() (Hook)here because , if there is any userInfo in the localStrorage, if yes, that means ur logged in
 * so we want to redirect from this page
 */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../Slices/usersApiSlice";
import { setCredentials } from "../Slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  // Creating our component level state
  const [email, setEmail] = useState(""); //Set as default an empty string
  const [password, setPassword] = useState(""); //Set as default an empty string

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation(); //this is by the way a custom hook

  const { userInfo } = useSelector((state) => state.auth);

  /**Basically here, we're trynna memorize the redirect url part that navigated us to the login page , so that
   * once we're logged in, we can go back to that samee page
   */
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  /**We loggIn by calling the login action in the usersApiSlice and  setCredentials in the authSlice*/
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]); //these are the params to pass in

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Submit");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="'py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
          {/* Why this :  <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>??
         Imagine a user tries to access a protected page (e.g., /dashboard) but needs to log in first.
        Your application might redirect them to the login page with a redirect parameter set to the originally
         requested URL (/dashboard). After successful login, the user clicks the "Register" link (assuming they're 
         a new user).The conditional link logic ensures that the registration URL includes the redirect parameter 
         with the value of /dashboard. Upon successful registration, your application can then redirect the user 
         to the originally intended page (/dashboard) based on the redirect parameter. 
         This maintains the user's intent after login. */}
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
