import { useState } from "react";
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Typography,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";

import kathImage from "../assets/kath.png";

const { Title, Text } = Typography;

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);

            const response = await axios.post(
                "/api/Auth/login",
                values
            );

            localStorage.setItem("isLoggedIn", "true");

            message.success(response.data.message);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            message.error(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
                padding: "40px 24px 60px",
                position: "relative",
                overflow: "auto",
            }}
        >
            {/* Main Login Area */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "70px",
                }}
            >
                {/* Left Side - Kath */}
                <div
                    style={{
                        flex: 1,
                        maxWidth: "480px",
                        minWidth: "0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        paddingTop: "70px",
                    }}
                >
                    {/* Greeting */}
                    <div
                        style={{
                            marginBottom: "8px",
                        }}
                    >
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                                marginBottom: "6px",
                                fontWeight: 600,
                            }}
                        >
                            Hello, I'm Kath!git
                        </Title>

                        <Text
                            type="secondary"
                            style={{
                                fontSize: "16px",
                            }}
                        >
                            Welcome to my Employee Management System.
                        </Text>
                    </div>

                    {/* Kath Illustration */}
                    <img
                        src={kathImage}
                        alt="Kath waving"
                        style={{
                            display: "block",
                            width: "100%",
                            maxWidth: "400px",
                            height: "auto",
                            maxHeight: "520px",
                            objectFit: "contain",
                            marginTop: "4px",
                        }}
                    />
                </div>

                {/* Right Side - Login Form */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        flexShrink: 0,
                        background: "#ffffff",
                        padding: "40px",
                        borderRadius: "14px",
                        boxShadow:
                            "0 8px 30px rgba(0, 0, 0, 0.08)",
                    }}
                >
                    {/* Login Header */}
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                                marginBottom: "8px",
                            }}
                        >
                            Employee Management System
                        </Title>

                        <Text type="secondary">
                            Sign in to continue
                        </Text>
                    </div>

                    {/* Login Form */}
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        size="large"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter your username",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter username"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter your password",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter password"
                            />
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
                </div>
            </div>

            {/* Footer Watermark */}
            <div
                style={{
                    position: "absolute",
                    bottom: "18px",
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    color: "#b5b5b5",
                    fontSize: "12px",
                    pointerEvents: "none",
                }}
            >
               
            </div>
        </div>
    );
}

export default Login;