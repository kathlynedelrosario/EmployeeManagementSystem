import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Typography,
    Card,
    message,
    Modal,
    Form,
    Input,
    Select,
    InputNumber,
    DatePicker,
    Popconfirm,
} from "antd";

import { EditOutlined, DeleteOutlined,
}  from "@ant-design/icons";

const { Title } = Typography;

const positionDepartmentMap = {
    "Human Resource Manager Head": "Human Resources",
    "Human Resources": "Human Resources",

    "Finance Management Manager Head": "Finance Management",
    "Finance Management Marketing": "Finance Management",
    "Data Analyst": "Finance Management",

    "Customer Service Representative Manager": "Customer Service",
    "Customer Service Representative": "Customer Service",

    "Graphics Designer - Creatives": "Creatives",

    "I.T. Manager": "Information Technology",
    "I.T. Programmer - Front-End": "Information Technology",
    "I.T. Programmer - Back-End": "Information Technology",
    "I.T Operations": "Information Technology",
    "Software Developer": "Information Technology",
    "Web Developer": "Information Technology",
    "Cyber Security": "Information Technology",
};

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);

                const response = await axios.get("/api/Employees");

                setEmployees(response.data);
            } catch (error) {
                console.error(error);
                message.error("Failed to load employees");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleAddEmployee = () => {
        setEditingEmployee(null);
        form.resetFields();
        setModalOpen(true);
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);

        form.setFieldsValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            salary: employee.salary,
            dateHired: employee.dateHired
                ? dayjs(employee.dateHired)
                : null,
        });

        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/Employees/${id}`);

            message.success("Employee deleted successfully");

            const response = await axios.get("/api/Employees");
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
            message.error("Failed to delete employee");
        }
    };

    const handlePositionChange = (position) => {
        const department = positionDepartmentMap[position];

        form.setFieldsValue({
            department: department,
        });
    };

    const handleSaveEmployee = async (values) => {
        try {
            setSaving(true);

            if (editingEmployee) {
                // Update existing employee
                await axios.put(
                    `/api/Employees/${editingEmployee.id}`,
                    {
                        id: editingEmployee.id,
                        ...values,
                        dateHired: values.dateHired
                            ? values.dateHired.format("YYYY-MM-DD")
                        : null,
                    }
                );

                message.success("Employee updated successfully");
            } else {
                // Add new employee
                await axios.post("/api/Employees", {
                    ...values,
                    dateHired: values.dateHired
                        ? values.dateHired.format("YYYY-MM-DD")
                        : null,
                });

                message.success("Employee added successfully");
            }

            const response = await axios.get("/api/Employees");
            setEmployees(response.data);

            setModalOpen(false);
            setEditingEmployee(null);
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error(
                editingEmployee
                    ? "Failed to update employee"
                    : "Failed to add employee"
            );
        } finally {
            setSaving(false);
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
                salary !== null && salary !== undefined
                    ? `₱${Number(salary).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`
                    : "₱0.00",
        },
        {
            title: "Date Hired",
            dataIndex: "dateHired",
            key: "dateHired",
            render: (date) =>
                date ? new Date(date).toLocaleDateString() : "",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>

                    <Popconfirm
                        title="Delete Employee"
                        description="Are you sure you want to delete this employee?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px" }}>
            <Card>
                <Title level={2}>Employee Management</Title>

                <Button
                    type="primary"
                    style={{ marginBottom: "16px" }}
                    onClick={handleAddEmployee}
                >
                    Add Employee
                </Button>

                <Table
                    columns={columns}
                    dataSource={employees}
                    rowKey="id"
                    loading={loading}
                />
            </Card>

            <Modal
                title={editingEmployee ? "Edit Employee"  : "Add Employee"}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSaveEmployee}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the first name",
                            },
                        ]}
                    >
                        <Input placeholder="Enter first name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the last name",
                            },
                        ]}
                    >
                        <Input placeholder="Enter last name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the email",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                        label="Position"
                        name="position"
                        rules={[
                            {
                                required: true,
                                message: "Please select a position",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a position"
                            showSearch
                            optionFilterProp="label"
                            onChange={handlePositionChange}
                            options={[
                                {
                                    value: "Human Resource Manager Head",
                                    label: "Human Resource Manager Head",
                                },
                                {
                                    value: "Human Resources",
                                    label: "Human Resources",
                                },
                                {
                                    value: "Finance Management Manager Head",
                                    label: "Finance Management Manager Head",
                                },
                                {
                                    value: "Finance Management Marketing",
                                    label: "Finance Management Marketing",
                                },
                                {
                                    value: "Data Analyst",
                                    label: "Data Analyst",
                                },
                                {
                                    value: "Customer Service Representative Manager",
                                    label: "Customer Service Representative Manager",
                                },
                                {
                                    value: "Customer Service Representative",
                                    label: "Customer Service Representative",
                                },
                                {
                                    value: "Graphics Designer - Creatives",
                                    label: "Graphics Designer - Creatives",
                                },
                                {
                                    value: "I.T. Manager",
                                    label: "I.T. Manager",
                                },
                                {
                                    value: "I.T. Programmer - Front-End",
                                    label: "I.T. Programmer - Front-End",
                                },
                                {
                                    value: "I.T. Programmer - Back-End",
                                    label: "I.T. Programmer - Back-End",
                                },
                                {
                                    value: "I.T Operations",
                                    label: "I.T Operations",
                                },
                                {
                                    value: "Software Developer",
                                    label: "Software Developer",
                                },
                                {
                                    value: "Web Developer",
                                    label: "Web Developer",
                                },
                                {
                                    value: "Cyber Security",
                                    label: "Cyber Security",
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Department"
                        name="department"
                        rules={[
                            {
                                required: true,
                                message: "Department will be selected automatically",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Department will be selected automatically"
                            readOnly
                        />
                    </Form.Item>

                    <Form.Item
                        label="Salary"
                        name="salary"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the salary",
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            precision={2}
                            prefix="₱"
                            formatter={(value) => {
                                if (
                                    value === undefined ||
                                    value === null ||
                                    value === ""
                                ) {
                                    return "";
                                }

                                return Number(value).toLocaleString(
                                    "en-PH",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                );
                            }}
                            parser={(value) =>
                                value
                                    ? value.replace(/[₱,\s]/g, "")
                                    : ""
                            }
                            placeholder="0.00"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Date Hired"
                        name="dateHired"
                        rules={[
                            {
                                required: true,
                                message: "Please select the date hired",
                            },
                        ]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "8px",
                        }}
                    >
                        <Button
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={saving}
                        >
                            Save Employee
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default Employees;