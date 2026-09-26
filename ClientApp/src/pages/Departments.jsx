import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    Typography,
    message,
} from "antd";

const { Title, Text } = Typography;

function Departments() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load active employees only
    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "/api/Employees"
            );

            setEmployees(response.data);
        } catch (error) {
            console.error(error);

            message.error(
                "Failed to load department data"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEmployees();
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
    const departmentData = departments.map(
        (department) => ({
            department,
            employeeCount: employees.filter(
                (employee) =>
                    employee.department === department
            ).length,
        })
    );

    const columns = [
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Number of Employees",
            dataIndex: "employeeCount",
            key: "employeeCount",
        },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                padding: "32px",
                background: "#f5f5f5",
            }}
        >
            <Title
                level={2}
                style={{
                    marginTop: 0,
                    marginBottom: "8px",
                }}
            >
                Departments
            </Title>

            <Text>
                Active employee records grouped by
                department.
            </Text>

            <Table
                style={{
                    marginTop: "24px",
                    background: "#fff",
                }}
                loading={loading}
                columns={columns}
                dataSource={departmentData}
                rowKey="department"
                pagination={false}
            />
        </div>
    );
}

export default Departments;