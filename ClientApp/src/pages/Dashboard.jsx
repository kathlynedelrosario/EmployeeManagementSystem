import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    Col,
    Row,
    Typography,
    message,
} from "antd";

const { Title, Text } = Typography;

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [archivedEmployees, setArchivedEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [
                employeesResponse,
                archivedResponse,
            ] = await Promise.all([
                axios.get("/api/Employees"),
                axios.get("/api/Employees/archived"),
            ]);

            setEmployees(employeesResponse.data);
            setArchivedEmployees(
                archivedResponse.data
            );
        } catch (error) {
            console.error(error);
            message.error(
                "Failed to load dashboard data"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDashboardData();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const allEmployees = [
        ...employees,
        ...archivedEmployees,
    ];

    const departments = [
        ...new Set(
            allEmployees.map(
                (employee) => employee.department
            )
        ),
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "32px",
                background: "#f5f5f5",
            }}
        >
            <Title level={2} style={{ marginTop: 0 }}>
                Dashboard
            </Title>

            <Text>
                Welcome to the Employee Management System.
            </Text>

            <Row
                gutter={16}
                style={{ marginTop: "24px" }}
            >
                <Col span={8}>
                    <Card title="Employees" loading={loading}>
                        <Title level={2}>
                            {employees.length}
                        </Title>

                        <Text>
                            Total Active Employees
                        </Text>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Departments" loading={loading}>
                        <Title level={2}>
                            {departments.length}
                        </Title>

                        <Text>
                            Total Departments
                        </Text>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Reports" loading={loading}>
                        <Title level={2}>
                            {allEmployees.length}
                        </Title>

                        <Text>
                            Total Employee Records
                        </Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;