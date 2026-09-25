import { Layout, Menu, Typography, Card, Row, Col } from "antd";
import {
    TeamOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function Dashboard() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider>
                <div
                    style={{
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                        padding: "20px",
                        textAlign: "center",
                    }}
                >
                    EMS
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["dashboard"]}
                    items={[
                        {
                            key: "dashboard",
                            icon: <TeamOutlined />,
                            label: "Employees",
                        },
                        {
                            key: "report",
                            icon: <FileTextOutlined />,
                            label: "Reports",
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 24px",
                    }}
                >
                    <Title level={3} style={{ margin: "16px 0" }}>
                        Employee Management System
                    </Title>
                </Header>

                <Content style={{ padding: "24px" }}>
                    <Title level={2}>Dashboard</Title>

                    <Text>
                        Welcome to the Employee Management System.
                    </Text>

                    <Row gutter={16} style={{ marginTop: "24px" }}>
                        <Col span={8}>
                            <Card title="Employees">
                                <Title level={2}>0</Title>
                                <Text>Total Employees</Text>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card title="Departments">
                                <Title level={2}>0</Title>
                                <Text>Total Departments</Text>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card title="Reports">
                                <Title level={2}>0</Title>
                                <Text>Available Reports</Text>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;