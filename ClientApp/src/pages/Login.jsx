import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Card, Typography, message } from "antd";

const { Title } = Typography;

function Login() {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);

            const response = await axios.post(
                "/api/Auth/login",
                values
            );

            message.success(response.data.message);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            message.error(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >
            <Card style={{ width: 400 }}>
                <Title level={2} style={{ textAlign: "center" }}>
                    Employee Management System
                </Title>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username",
                            },
                        ]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default Login;