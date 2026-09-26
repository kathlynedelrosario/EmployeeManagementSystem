import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Card,
    Col,
    Row,
    Table,
    Typography,
    message,
} from "antd";

const { Title, Text } = Typography;

function Reports() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [archivedEmployees, setArchivedEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReportData = async () => {
        try {
            setLoading(true);

            const [employeesResponse, archivedResponse] =
                await Promise.all([
                    axios.get("/api/Employees"),
                    axios.get("/api/Employees/archived"),
                ]);

            setEmployees(employeesResponse.data);
            setArchivedEmployees(archivedResponse.data);
        } catch (error) {
            console.error(error);
            message.error("Failed to load report data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchReportData();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    // Get unique departments from active employees only
    const departments = [
        ...new Set(
            employees.map(
                (employee) => employee.department
            )
        ),
    ];

    // Count active employees per department
    const departmentData = departments.map((department) => ({
        department,
        count: employees.filter(
            (employee) => employee.department === department
        ).length,
    }));

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "32px",
                background: "#f5f5f5",
            }}
        >
            <Title level={2} style={{ marginTop: 0 }}>
                Employee Reports
            </Title>

            <Text>
                Summary of employee information and statistics.
            </Text>

            <Row
                gutter={16}
                style={{ marginTop: "24px" }}
            >
                {/* Active Employees */}
                <Col span={8}>
                    <Card
                        title="Active Employees"
                        hoverable
                        onClick={() => navigate("/employees")}
                    >
                        <Title level={2}>
                            {employees.length}
                        </Title>

                        <Text>
                            Total Active Employees
                        </Text>
                    </Card>
                </Col>

                {/* Archived Employees */}
                <Col span={8}>
                    <Card
                        title="Archived Employees"
                        hoverable
                        onClick={() => navigate("/archive")}
                    >
                        <Title level={2}>
                            {archivedEmployees.length}
                        </Title>

                        <Text>
                            Total Archived Employees
                        </Text>
                    </Card>
                </Col>

                {/* Departments */}
                <Col span={8}>
                    <Card
                        title="Departments"
                        hoverable
                        onClick={() => navigate("/departments")}
                    >
                        <Title level={2}>
                            {departments.length}
                        </Title>

                        <Text>
                            Total Departments
                        </Text>
                    </Card>
                </Col>
            </Row>

            {/* Employees by Department */}
            <Card
                title="Employees by Department"
                style={{
                    marginTop: "24px",
                    width: "100%",
                }}
            >
                <Table
                    loading={loading}
                    columns={[
                        {
                            title: "Department",
                            dataIndex: "department",
                            key: "department",
                        },
                        {
                            title: "Number of Employees",
                            dataIndex: "count",
                            key: "count",
                        },
                    ]}
                    dataSource={departmentData}
                    rowKey="department"
                    pagination={false}
                />
            </Card>
        </div>
    );
}

export default Reports;