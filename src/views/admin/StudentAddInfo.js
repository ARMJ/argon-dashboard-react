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
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Link } from "react-router-dom";

const StudentAddInfo = () => {
  const { id } = useParams();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role] = useState(localStorage.getItem("role") || "");
  const [data, setData] = useState({ msg: "", student: {}, isLoaded: false });
  const [pictureSrc, setPictureSrc] = useState("../../assets/img/theme/images.png");
  const [uploadMessage, setUploadMessage] = useState("");
  const [fingerprints, setFingerprints] = useState([]);
  const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);
  const [isFingerUploaded, setIsFingerUploaded] = useState(false);
  const [username, serUsername] = useState(localStorage.getItem("username") || "");
  const navigate = useNavigate();


  let axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'stdid': id,
      'Content-Type': 'multipart/form-data'
    },
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_BASE_URL + "admin/studentById?id=" + id, axiosConfig);
      setData({ msg: response.data.msg, student: response.data.student, isLoaded: true });
      if (response.data.student.files) {
        if (response.data.student.files.signature != "") setIsSignatureUploaded(true);
        if (response.data.student.files.thumbFinger != "") setIsFingerUploaded(true);
      }
      if (response.data.student.picture) {
        setPictureSrc(response.data.student.picture);
      }
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleFingerprintsUpload = async (e) => {
    e.preventDefault();
    if (e.target[0].files.length === 2) {
      const formData = new FormData();
      formData.append('fingerprints', e.target[0].files[0]);
      formData.append('fingerprints', e.target[0].files[1]);
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL + "admin/upload-fingerprints-fs", formData, axiosConfig);
        setUploadMessage(response.data.msg);
        toast.success(response.data.msg);
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please select both the fingerprints to upload.");
    }
  }


  const handleSignatureUpload = async (e) => {
    e.preventDefault();
    if (e.target[0].files.length === 1) {
      const formData = new FormData();
      formData.append('signature', e.target[0].files[0]);
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL + "admin/upload-signature-fs", formData, axiosConfig);
        setUploadMessage(response.data.msg);
        toast.success(response.data.msg);
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please signature to upload.");
    }
  }

  const handlePictureUpload = async (e) => {
    e.preventDefault();
    if (e.target[0].files.length === 1) {
      const formData = new FormData();
      formData.append('picture', e.target[0].files[0]);
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL + "admin/upload-picture-fs", formData, axiosConfig);
        setUploadMessage(response.data.msg);
        toast.success(response.data.msg);
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please select picture to upload.");
    }
  }

  useEffect(() => {
    if (!data.isLoaded) {
      fetchStudentDetails(id);
    }
  });

  return (
    <>
      <Header />
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
                      onError={(e) => {
                        e.target.src = require("../../assets/img/theme/images.png")
                      }}
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
                        <h3>
                          Name: {data.student.name}

                        </h3>
                        <h3>
                          Roll: {data.student.roll}
                        </h3>
                        <h3>
                          Registration: {data.student.reg}
                        </h3>
                        <h3>
                          Department: {data.student.dept}
                        </h3>
                        <h3>
                          Session: {data.student.admissionSession}
                        </h3>
                        <div>
                          <i className="ni education_hat mr-2" />
                          <span className="font-weight-light">{data.student.email}</span>
                        </div>
                        <hr className="my-4" />
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
                    <h3 className="mb-0">Student Information Upload Panel</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                      tag={Link}
                      to={"/" + role + "/studentDetails/" + data.student._id}
                    >
                      Details
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form" onSubmit={(e) => handleFingerprintsUpload(e)}>
                  <h3 className="heading-small text-muted mb-4">
                    Student Fingerprints Upload
                  </h3>
                  <div className="pl-lg-4">
                    {isFingerUploaded ? (<Row>
                      <Col lg="6">
                        <h4 className="text-success"><i className="ni ni-check-bold" />Fingerprints Already Uploaded.</h4>
                      </Col>
                    </Row>) : (<Row>
                      <Col lg="6">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-cloud-upload-96" />
                                Select Both Fingerprints
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              className="form-control-alternative"
                              id="input-fingers"
                              name="fingerprints"
                              type="file"
                              encType="multipart/form-data"
                              accept=".tpl"
                              multiple
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <InputGroup>
                            <div className="text-center">
                              <Button className="my-4" color="primary" type="submit">
                                <i className="ni ni-cloud-upload-96" />
                                Upload Fingerprints
                              </Button>
                            </div>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>)}
                  </div>
                </Form>
                <Form role="form" onSubmit={(e) => handleSignatureUpload(e)}>
                  <h3 className="heading-small text-muted mb-4">
                    Student Signature Upload
                  </h3>
                  <div className="pl-lg-4">
                    {isSignatureUploaded ? (
                      <Row>
                        <Col lg="6">
                          <h4 className="text-success"><i className="ni ni-check-bold" />Signature Already Uploaded.</h4>
                        </Col>
                      </Row>
                    ) : (<Row>
                      <Col lg="6">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-cloud-upload-96" />
                                Select Signature
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              className="form-control-alternative"
                              id="input-signature"
                              name="signature"
                              type="file"
                              accept="images/*"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <InputGroup>
                            <div className="text-center">
                              <Button className="my-4" color="primary" type="submit">
                                <i className="ni ni-cloud-upload-96" />
                                Upload Signature
                              </Button>
                            </div>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>)}
                  </div>
                </Form>
                <Form role="form" onSubmit={(e) => handlePictureUpload(e)}>
                  <h3 className="heading-small text-muted mb-4">
                    Student Picture Upload
                  </h3>
                  <div className="pl-lg-4">
                    {data.student.picture ? (
                      <Row>
                        <Col lg="6">
                          <h4 className="text-success"><i className="ni ni-check-bold" />Picture Already Uploaded.</h4>
                        </Col>
                      </Row>
                    ) : (<Row>
                      <Col lg="6">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-cloud-upload-96" />
                                Select Picture
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              className="form-control-alternative"
                              id="input-picture"
                              name="picture"
                              type="file"
                              accept="images/*"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <InputGroup>
                            <div className="text-center">
                              <Button className="my-4" color="primary" type="submit">
                                <i className="ni ni-cloud-upload-96" />
                                Upload Picture
                              </Button>
                            </div>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>)}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentAddInfo;
