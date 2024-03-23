

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";


const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role] = useState(localStorage.getItem("role") || "");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;

    if (email.length > 0 && password.length > 0) {
      const authData = {
        email: email,
        password: password,
        remember: remember
      };
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL+"adminLogin", authData);
        toast.success(response.data.msg);
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('username', response.data.name);
        navigate(response.data.navigate);
      } catch (err) {
        if(err.response){
          toast.error(err.response.data.msg);
        }else{
          toast.error(err.message);
        }
      }
    } else {
      toast.error("Please fill in all the fields");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      if (role === "superAdmin" || role === "admin") navigate("/admin");
      else if (role === "student") navigate("/student");
    }
  }, []);

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center">
              <big>Sign in</big>
            </div>
            {/* <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form" onSubmit={(e) => handleLoginSubmit(e)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                      onClick={() => { setRemember(!remember) }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          {/* <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="/auth/register"
            >
              <small>Create new account</small>
            </a>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default AdminLogin;
