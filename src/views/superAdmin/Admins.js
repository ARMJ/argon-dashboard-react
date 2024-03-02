// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Input,
    Button,
    CardBody,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Dropdown,
} from "reactstrap";

import { useState, useEffect } from 'react';

import axios from "axios";

import Header from "components/Headers/Header.js";

import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate, Link } from "react-router-dom";

const Admins = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [data, setData] = useState({ msg: "", admins: [], isLoaded: false });
    const [spinnerVisiblity, setSpinnerVisiblity] = useState(false);
    const [filterText, setFilterText] = useState({ name: "", roll: null, dept: null, session: null });
    const navigate = useNavigate();
    let axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const fetchAdmins = async () => {

        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_BASE_URL+"admin/getAdmins", axiosConfig);
            setData({ msg: response.data.msg, admins: response.data.admins, isLoaded: true });
            toast.success(response.data.msg);
            if (spinnerVisiblity) {
                setSpinnerVisiblity(!spinnerVisiblity);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteAdmin = async (e) => {
        console.log(e);
        let deleteData = {
            id: e
        }
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_BASE_URL+"admin/deleteAdmin", deleteData, axiosConfig);
            setData({ msg: response.data.msg, admins: response.data.admins, isLoaded: true });
            toast.success(response.data.msg);
            if (spinnerVisiblity) {
                setSpinnerVisiblity(!spinnerVisiblity);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const filteredRow = data.admins.filter((dt) => dt.name.toLowerCase().includes(filterText.name.toLowerCase())).map(function (admin) {
        return (
            <tr key={admin._id}>
                <td>
                    {admin.name}
                </td>
                <td>{admin.email}</td>
                <td className="text-right">
                    <Button onClick={(e) => deleteAdmin(admin._id)}>
                        <i className="ni ni-fat-delete" />
                    </Button>
                </td>
            </tr>
        );
    });

    useEffect(() => {
        fetchAdmins();
    }, []);


    return (
        <>
            <Header />

            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">All Admins</h3>
                                <Button
                                    className="float-right"
                                    color="success"
                                    tag={Link}
                                    to={"/superAdmin/addAdmin"}
                                    size="md"
                                ><i className="ni ni-fat-add" /> Add
                                </Button>
                            </CardHeader>
                            <CardBody className="px-lg-1 py-lg-1">
                                <Table className="align-items-center table-flush" responsive striped hover id="studentTable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Name <Input type="text" placeholder="Search name" onChange={(e) => setFilterText({ name: e.target.value })} /></th>
                                            <th scope="col">Email</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data.isLoaded ? (filteredRow) : (<tr><td colSpan={3}><ColorRing
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
                            </CardBody>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    {data.isLoaded ? (<span className="text-small text-success text-center mb-0">There are <b>{data.admins.length}</b> admins in the system.</span>) : (<p>No admin fetched.</p>)}
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Admins;