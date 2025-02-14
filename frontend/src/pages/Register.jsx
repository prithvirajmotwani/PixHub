import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import registerJmg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/auth/register-slice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(
    (state) => state.userRegister
  );
  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    password: undefined,
  });

  useEffect(() => {
    if (success) {
      toast.success("Successfully registered");
      window.location.href = "/login";
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch.error, success]);

  useEffect(() => {
    if (loading) {
      toast.loading("registerting..");
    }
  }, [loading]);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(registerUser(credentials));
  };
  return (
    <Container>
      <Row>
        <Col lg="10" className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerJmg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    id="email"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    id="username"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handleChange}
                  />
                </FormGroup>

                <Button className="btn secondary__btn auth__btn" type="submit">
                  Register
                </Button>
                <p>
                  Already have an account? <Link to="/login">Login </Link>
                </p>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
