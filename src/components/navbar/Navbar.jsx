import * as React from 'react';
import { ProjectOutlined, UserOutlined, FormOutlined, SettingOutlined, UnorderedListOutlined, ApartmentOutlined, ApiOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(
        <Link to={"employees"}> Employees </Link>,
        '1',
        <UserOutlined />
    ),
    getItem(
        <Link to={"clients"}> Clients </Link>,
        '2',
        <ProjectOutlined />
    ),
    getItem(
        <Link to={"actions"}> Actions </Link>,
        '3',
        <FormOutlined />
    ),
    getItem(
        <Link to={"policies"}> Policies </Link>,
        '4',
        <SettingOutlined />
    ),
    getItem(
        <Link to={"modules"}> Modules </Link>,
        '5',
        <UnorderedListOutlined />
    ),
    getItem(
        <Link to={"permissions"}> Permissions </Link>,
        '6',
        <ApartmentOutlined />
    ),
    getItem(
        <Link to={"roles"}> Roles </Link>,
        '7',
        <ApiOutlined />
    ),
];

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: "white" }}>
                    <Menu
                        items={items}
                    />
                </Sider>
            </Layout>
        </>
    );
}
