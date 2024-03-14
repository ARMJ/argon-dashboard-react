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
    Row,
    Container
} from "reactstrap";

import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import Header from "components/Headers/Header.js";

const AddAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
    let axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const handleAddAdminSubmit = async (e) => {
        e.preventDefault();
        let name = e.target[0].value;
        let email = e.target[1].value;
        let password = e.target[2].value;
        let c_password = e.target[3].value;


        if (name.length > 0 && email.length > 0 && password.length > 0 && c_password.length > 0) {
            if (password === c_password) {
                const adminData = {
                    username: name,
                    email: email,
                    password: password
                };

                try {
                    const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL+"admin/addAdmin", adminData, axiosConfig);
                    toast.success(response.data.msg);
                    navigate("/superAdmin/admins");
                } catch (err) {
                    toast.error(err.response.data.msg);
                }

            } else {
                toast.error("Password and confirm password don't match");
            }
        } else {
            toast.error("Please fill in all the fields");
        }
    };


    return (
        <>
            <Header />
            <Container className="mt--7" fluid>

                <Row>
                    <Col className="order-xl-2 text-center" xl="4">
                    </Col>
                    <Col className="order-xl-2 mb-5 mb-xl-0 text-center" xl="4">
                        <Card className="shadow m-5">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Add Admins</h3>
                            </CardHeader>
                            <CardBody className="px-lg-1 py-lg-1">
                                <Form role="form" onSubmit={(e) => handleAddAdminSubmit(e)}>
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

                                    <div className="text-center">
                                        <Button className="mt-4 text-center" color="primary" type="submit" >
                                            Create Admin
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-2 text-center" xl="4"></Col>
                </Row>
            </Container>
        </>
    );
};

export default AddAdmin;
