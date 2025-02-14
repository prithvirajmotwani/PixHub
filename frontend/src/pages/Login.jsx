import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../redux/auth/login-slice";

const Login = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.userLogin
  );
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("successfully login");
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error.msg || error);
    }
  }, [dispatch, error, isAuthenticated]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(credentials);
    dispatch(loginUser({ email: "test@test.com", password: "1111" }));
    // console.log(credentials);
  };
  return (
    <Container>
      <Row>
        <Col lg="8" className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    id="email"
                    onChange={handleChange}
                    value="test@test.com"
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handleChange}
                    value="1111"
                  />
                </FormGroup>
                <Button className="btn secondary__btn auth__btn" type="submit">
                  Login
                </Button>
                {/* <p>
                  Don't have an account? <Link to="/register">Create </Link>
                </p> */}
                <p>This account is only to view</p>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
