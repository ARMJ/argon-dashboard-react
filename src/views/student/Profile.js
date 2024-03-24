

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { Link } from "react-router-dom";
import StudentHeader from "components/Headers/StudentHeader.js";

const StudentProfile = () => {
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role] = useState(localStorage.getItem("role") || "");
  const [data, setData] = useState({ msg: "", student: {}, isLoaded: false });
  const [pictureSrc, setPictureSrc] = useState("");
  const [signatureSrc, setSignatureSrc] = useState("");

  const fetchStudentDetails = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_BASE_URL + "student/profile", axiosConfig);
      setData({ msg: response.data.msg, student: response.data.student, isLoaded: true });
      toast.success(response.data.msg);
      if (response.data.student.picture) {
        setPictureSrc(response.data.student.picture);
      }
      if (response.data.student.files) {
        if (response.data.student.files.signature !== "") {
          setSignatureSrc(response.data.student.files.signature);
        }
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(err.message);
      }
    }
  }

  useEffect(() => {
    fetchStudentDetails();
  }, []);


  return (
    <>
      <StudentHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    {data.student.picture ? (<img
                      alt="..."
                      className="rounded-circle"
                      src={pictureSrc}
                    />) : (<img
                      alt="..."
                      className="rounded-circle"
                      src={require("../../assets/img/theme/images.png")}
                    />)}
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div className="text-center">
                        <div className="card-profile-image">
                          {data.student.files ? (<img
                            alt="..."
                            className="thumbnail"
                            src={signatureSrc}
                          />) : (<img
                            alt="no signature"
                            className="thumbnail"
                            src={require("../../assets/img/theme/No_signature.png")}
                          />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div className="text-center">
                        <h3>
                          {data.student.name}
                          <span className="font-weight-light">, {data.student.dob}</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Permanent Address: {data.student.perAddress}
                        </div>
                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          Admission Session: {data.student.admissionSession}
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          Department: {data.student.dept}
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          Jashore University of Science and Technology
                        </div>
                        <hr className="my-4" />
                        <p>{data.student.remark}</p>
                      </div>
                    </div>
                  </div>
                </Row>
                
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Student Details</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                      tag={Link}
                      to={"/" + role + "/update-info"}
                    >
                      Add Info
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Student information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.name}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={data.student.email}
                            placeholder="just@example.com"
                            type="email"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-father-name"
                          >
                            Father name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.fName}
                            id="input-father-name"
                            placeholder="Father name"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-mother-name"
                          >
                            Mother name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.mName}
                            id="input-mother-name"
                            placeholder="Mother name"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-roll"
                          >
                            Roll
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.roll}
                            id="input-roll"
                            placeholder="Roll no"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-reg"
                          >
                            Registration
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.reg}
                            id="input-reg"
                            placeholder="Registraton no"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.preAddress}
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Phone No
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.student.mobileNo}
                            id="input-phone"
                            placeholder="Phone"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col> */}
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentProfile;
