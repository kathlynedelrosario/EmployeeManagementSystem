import {
    Layout,
    Menu,
    Button,
} from "antd";

import {
    HomeOutlined,
    TeamOutlined,
    FileTextOutlined,
    InboxOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";

import {
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";

const { Sider, Content } = Layout;

function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    // Determine which sidebar item is selected
    const getSelectedKey = () => {
        if (location.pathname === "/dashboard") {
            return "dashboard";
        }

        if (location.pathname === "/employees") {
            return "employees";
        }

        if (location.pathname === "/reports") {
            return "reports";
        }

        if (location.pathname === "/archive") {
            return "archive";
        }

        if (location.pathname === "/departments") {
            return "departments";
        }

        return "dashboard";
    };

    // Sidebar navigation
    const handleMenuClick = ({ key }) => {
        if (key === "dashboard") {
            navigate("/dashboard");
        }

        if (key === "employees") {
            navigate("/employees");
        }

        if (key === "reports") {
            navigate("/reports");
        }

        if (key === "archive") {
            navigate("/archive");
        }

        if (key === "departments") {
            navigate("/departments");
        }
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                height: "100vh",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {/* SIDEBAR */}
            <Sider
                width={220}
                style={{
                    height: "100vh",
                    minHeight: "100vh",
                    flex: "0 0 220px",
                    position: "relative",
                }}
            >
                {/* EMS Logo */}
                <div
                    style={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        padding: "24px 16px",
                        textAlign: "center",
                    }}
                >
                    EMS
                </div>

                {/* MENU */}
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    onClick={handleMenuClick}
                    items={[
                        {
                            key: "dashboard",
                            icon: <HomeOutlined />,
                            label: "Home",
                        },
                        {
                            key: "employees",
                            icon: <TeamOutlined />,
                            label: "Employees",
                        },
                        {
                            key: "reports",
                            icon: <FileTextOutlined />,
                            label: "Reports",
                        },
                        {
                            key: "archive",
                            icon: <InboxOutlined />,
                            label: "Archive",
                        },
                        {
                            key: "departments",
                            icon: <AppstoreOutlined />,
                            label: "Departments",
                        },
                    ]}
                />

                {/* BOTTOM BUTTONS */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "24px",
                        left: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    {/* Back / Next */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                        }}
                    >
                        <Button
                            onClick={() => navigate(-1)}
                        >
                            &lt; Back
                        </Button>

                        <Button
                            onClick={() => navigate(1)}
                        >
                            Next &gt;
                        </Button>
                    </div>

                    {/* Logout */}
                    <Button
                        danger
                        onClick={handleLogout}
                        style={{
                            width: "150px",
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </Sider>

            {/* MAIN AREA */}
            <Layout
                style={{
                    minWidth: 0,
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Content
                    style={{
                        width: "100%",
                        height: "100vh",
                        minWidth: 0,
                        overflow: "auto",
                        background: "#f5f5f5",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;