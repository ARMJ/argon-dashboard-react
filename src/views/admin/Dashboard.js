
import axios from 'axios';
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Table
} from "reactstrap";

// core components
import {
  chartExample2,
  chartOptions,
  parseOptions
} from "variables/charts.js";

import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const AdminDashboard = (props) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({ msg: "", dashboardData: [], isLoaded: false });
  const [spinnerVisiblity, setSpinnerVisiblity] = useState(false);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const fetchDashboardData = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_BASE_URL + "admin/dashboard", axiosConfig);
      setData({ msg: response.data.msg, dashboardData: response.data.dashboardData, total: response.data.Totalstudents, isLoaded: true });
      toast.success(response.data.msg);
      chartExample2.data = {
        labels: ["FET", "FAST", "FBS", "FS", "FHS", "FASS", "FBS", "FVM"],
        datasets: [
          {
            label: "Students",
            data: [response.data.dashboardData[0].count + response.data.dashboardData[1].count + response.data.dashboardData[2].count + response.data.dashboardData[3].count + response.data.dashboardData[4].count + response.data.dashboardData[5].count + response.data.dashboardData[6].count,
            response.data.dashboardData[7].count + response.data.dashboardData[8].count + response.data.dashboardData[9].count + response.data.dashboardData[10].count,
            response.data.dashboardData[11].count + response.data.dashboardData[12].count + response.data.dashboardData[13].count + response.data.dashboardData[14].count,
            response.data.dashboardData[15].count + response.data.dashboardData[16].count + response.data.dashboardData[17].count,
            response.data.dashboardData[18].count + response.data.dashboardData[19].count + response.data.dashboardData[20].count,
            response.data.dashboardData[21].count,
            response.data.dashboardData[22].count + response.data.dashboardData[23].count + response.data.dashboardData[24].count + response.data.dashboardData[25].count,
            response.data.dashboardData[26].count],
            maxBarThickness: 10,
          },
        ],
      };
      setSpinnerVisiblity(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const insertRow = data.dashboardData.map(function (dd) {
    return (
      <tr key={dd.dept}>
        <td scope="row">{dd.dept}</td>
        <td>{dd.count}</td>
      </tr>
    )
  })

  useEffect(() => {
    setSpinnerVisiblity(true);
    fetchDashboardData();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Number of Students
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.isLoaded ? data.total : (<ColorRing
                            visible={spinnerVisiblity}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                          />)}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Department
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.isLoaded ? ("27") : (<ColorRing
                          visible={spinnerVisiblity}
                          height="40"
                          width="40"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Number of Faculty
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.isLoaded ? ("8") : (<ColorRing
                          visible={spinnerVisiblity}
                          height="40"
                          width="40"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Number of Institutes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.isLoaded ? ("1") : (<ColorRing
                          visible={spinnerVisiblity}
                          height="40"
                          width="40"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">At a Glance</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive hover striped>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Department</th>
                    <th scope="col">Number of Students</th>
                  </tr>
                </thead>
                <tbody>
                  {data.isLoaded ? (insertRow) : (<tr><td colSpan={2}><ColorRing
                    visible={spinnerVisiblity}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  /></td></tr>)}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Faculty Summary</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
