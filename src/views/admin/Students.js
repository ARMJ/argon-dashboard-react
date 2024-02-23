// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Table,
    UncontrolledDropdown
} from "reactstrap";

import { useEffect, useState } from 'react';

import axios from "axios";

import Header from "components/Headers/Header.js";

import { ColorRing } from 'react-loader-spinner';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Students = () => {
    const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
    const [role] = useState(localStorage.getItem("role") || "");
    const [data, setData] = useState({ msg: "", students: [], len: -1 });
    const [spinnerVisiblity, setSpinnerVisiblity] = useState(false);
    const [filterText, setFilterText] = useState({ name: "", roll: null, dept: null, session: null });
    const [isOpen, setIsOpen] = useState(false);
    const [isSessionOpen, setIsSessionOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSession, setselectedSession] = useState("");
    const departments = [
        { full: "Biomedical Engineering", short: "BME" },
        { full: "Chemical Engineering", short: "ChE" },
        { full: "Computer Science and Engineering", short: "CSE" },
        { full: "Electrical and Electronic Engineering", short: "EEE" },
        { full: "Industrial and Production Engineering", short: "IPE" },
        { full: "Petroleum and Mining Engineering", short: "PME" },
        { full: "Textile Engineering", short: "TE" },
        { full: "Agro Product Processing Technology", short: "APPT" },
        { full: "Climate and Disaster Management", short: "CDM" },
        { full: "Environmental Science and Technology", short: "EST" },
        { full: "Nutrition and Food Technology", short: "NFT" },
        { full: "Fisheries and Marine Bioscience", short: "FMB" },
        { full: "Genetic Engineering and Biotechnology", short: "GEBT" },
        { full: "Microbiology", short: "MB" },
        { full: "Pharmacy", short: "PHAR" },
        { full: "Chemistry", short: "CHEM" },
        { full: "Mathematics", short: "MATH" },
        { full: "Physics", short: "PHY" },
        { full: "Nursing and Health Science", short: "NHS" },
        { full: "Physical Education and Sports Science", short: "PESS" },
        { full: "Physiotherapy and Rehabilitation", short: "PTR" },
        { full: "English", short: "ENGL" },
        { full: "Acshorting and Information Systems", short: "AIS" },
        { full: "Finance and Banking", short: "FB" },
        { full: "Management", short: "MGT" },
        { full: "Marketing", short: "MKT" },
        { full: "Faculty of Veterinary Medicine", short: "DVM" }
    ];
    const sessions = ["2014-15", "2015-16", "2016-17", "2017-18", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23"];

    const handleSearchStudents = async (e) => {
        e.preventDefault();
        if (selectedDepartment.length > 0 && selectedSession.length > 0) {
            let axiosConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            try {
                const response = await axios.get(process.env.REACT_APP_SERVER_BASE_URL + "admin/searchStudents?dept=" + selectedDepartment + "&session=" + selectedSession, axiosConfig);
                setData({ msg: response.data.msg, students: response.data.students, len: response.data.students.length });

                // setPages(Math.ceil(response.data.students.length/itemsPerPage));
                toast.success(response.data.msg);
                if (spinnerVisiblity) {
                    setSpinnerVisiblity(!spinnerVisiblity);
                }
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Please fill in all the fields");
        }
    };


    const filteredRow = data.students.filter((dt) => dt.name.toLowerCase().includes(filterText.name.toLowerCase())).map(function (student) {
        return (
            <tr key={student._id}>
                <td>
                    {student.name}
                </td>
                <td>{student.roll}</td>
                <td>{student.reg}</td>
                <td>{student.dept}</td>
                <td>{student.admissionSession}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="bg"
                            color="green"
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="ni ni-settings" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem to={"/" + role + "/studentDetails/" + student._id} tag={Link}
                            >
                                <i className="ni ni-single-02" />
                                <span>Details</span>
                            </DropdownItem>
                            <DropdownItem to={"/" + role + "/studentAddInfo/" + student._id} tag={Link}>
                                <i className="ni ni-cloud-upload-96" />
                                <span>Add Info</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    });

    useEffect(() => {

    });


    return (
        <>
            <Header />

            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">All Students</h3>
                            </CardHeader>
                            <CardBody className="px-lg-1 py-lg-1">
                                <Form role="form" onSubmit={(e) => handleSearchStudents(e)}>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-building" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="select"
                                                name="selectDepartment"
                                                id="department"
                                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                                value={selectedDepartment}
                                                required
                                            >
                                                <option value={null}>Select department </option>
                                                {departments.map((department) => (
                                                    <option key={department.short} value={department.short} onClick={(e) => setSelectedDepartment(e.target.value)}>{department.full}</option>
                                                ))}
                                            </Input>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-calendar-grid-58" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="select"
                                                name="selectSession"
                                                id="exampleSelect"
                                                onChange={(e) => setselectedSession(e.target.value)}
                                                value={selectedSession}
                                                required
                                            >
                                                <option value={null}>Select Session</option>
                                                {sessions.map((session) => (
                                                    <option key={session} value={session} onClick={(e) => setselectedSession(e.target.value)} className="form">{session}</option>
                                                ))}
                                            </Input>
                                            <div className="col-md-4 text-center">
                                                <Button size="small" color="primary" type="submit">
                                                    Search
                                                </Button>
                                            </div>

                                        </InputGroup>

                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <Table className="align-items-center table-flush" responsive striped hover id="studentTable">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name <Input type="text" placeholder="Search name" onChange={(e) => setFilterText({ name: e.target.value })} /></th>
                                        <th scope="col">Roll</th>
                                        <th scope="col">Registration</th>
                                        <th scope="col">Department</th>
                                        <th scope="col">Session</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.len > 0 ? (filteredRow) : (<tr><td colSpan={6} className="text-center"><ColorRing
                                        visible={spinnerVisiblity}
                                        height="80"
                                        width="80"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                    /></td></tr>)}

                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    {data.len > 0 ? (<span className="text-small text-success text-center mb-0">There are <b>{data.len}</b> students in the <b>{selectedDepartment}</b> department from <b>{selectedSession}</b> session.</span>) : (<p>No student fetched.</p>)}
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Students;