

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
  Col,
  } from "reactstrap";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role] = useState(localStorage.getItem("role") || "");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let c_password = e.target[3].value;


    if (name.length > 0 && email.length > 0 && password.length > 0 && c_password.length > 0) {
      if (password === c_password) {
        const authData = {
          username: name,
          email: email,
          password: password
        };
        try {
          const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL + "register", authData);
          toast.success(response.data.msg);
          navigate("/auth/login");
        } catch (err) {
          if(err.response){
            toast.error(err.response.data.msg);
          }else{
            toast.error(err.message);
          }
        }

      } else {
        toast.error("Password and confirm password don't match");
      }
    } else {
      toast.error("Please fill in all the fields");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      if (role === "admin") navigate("/admin");
      else navigate("/user/index");
    }
  }, []);


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center">
              <big>Sign up</big>
            </div>
            {/* <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
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
              <small>Or sign up with credentials</small>
            </div> */}
            <Form role="form" onSubmit={(e) => handleRegisterSubmit(e)}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" name="name" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
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
                    name="password"
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
                    </InputGroupText>
                  </InputGroupAddon>
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
                    placeholder="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    name="c_password"
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              {/* <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> */}

              <div className="text-center">
                <Button className="mt-4 text-center" color="primary" type="submit" >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
