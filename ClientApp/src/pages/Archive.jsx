import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Typography,
    message,
    Popconfirm,
} from "antd";
import {
    UndoOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function Archive() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load archived employees
    const fetchArchivedEmployees = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "/api/Employees/archived"
            );

            setEmployees(response.data);
        } catch (error) {
            console.error(error);
            message.error("Failed to load archived employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArchivedEmployees();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    // Restore employee
    const handleRestore = async (id) => {
        try {
            await axios.put(
                `/api/Employees/${id}/restore`
            );

            message.success(
                "Employee restored successfully"
            );

            fetchArchivedEmployees();
        } catch (error) {
            console.error(error);
            message.error(
                "Failed to restore employee"
            );
        }
    };

    // Permanently delete employee
    const handleDeleteForever = async (id) => {
        try {
            await axios.delete(
                `/api/Employees/${id}/permanent`
            );

            message.success(
                "Employee permanently deleted"
            );

            fetchArchivedEmployees();
        } catch (error) {
            console.error(error);
            message.error(
                "Failed to permanently delete employee"
            );
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            render: (salary) =>
                salary !== null &&
                    salary !== undefined
                    ? `\u20B1${Number(salary).toLocaleString(
                        "en-PH",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}`
                    : "\u20B10.00",
        },
        {
            title: "Date Hired",
            dataIndex: "dateHired",
            key: "dateHired",
            render: (date) =>
                date
                    ? new Date(
                        date
                    ).toLocaleDateString()
                    : "",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    {/* Restore */}
                    <Button
                        type="link"
                        icon={<UndoOutlined />}
                        onClick={() =>
                            handleRestore(record.id)
                        }
                    >
                        Restore
                    </Button>

                    {/* Delete Forever */}
                    <Popconfirm
                        title="Delete Employee Permanently"
                        description="Are you sure you want to permanently delete this employee? This action cannot be undone."
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{
                            danger: true,
                        }}
                        onConfirm={() =>
                            handleDeleteForever(
                                record.id
                            )
                        }
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Delete Forever
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
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
                Archived Employees
            </Title>

            <Table
                columns={columns}
                dataSource={employees}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                }}
                style={{
                    background: "#fff",
                }}
            />
        </div>
    );
   
}

export default Archive;