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
import { useRegisterMutation } from "../Slices/usersApiSlice";
import { setCredentials } from "../Slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  // Creating our component level state
  const [name, setName] = useState(""); //Set as default an empty string
  const [email, setEmail] = useState(""); //Set as default an empty string
  const [password, setPassword] = useState(""); //Set as default an empty string
  const [confirmPassword, setConfirmPassword] = useState(""); //Set as default an empty string

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation(); //this is by the way a custom hook

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
  }, [userInfo, redirect, navigate]); //these are the params to pass in

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Submit");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="nme" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="'py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
