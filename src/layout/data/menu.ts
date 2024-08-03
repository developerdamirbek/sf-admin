import { AppstoreAddOutlined, ProductOutlined, ApartmentOutlined, ContainerOutlined, PieChartOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";

export const menu = [
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/',
        icon: PieChartOutlined
    },
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/',
        icon: ApartmentOutlined 
    },
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/',
        icon: AppstoreAddOutlined
    },
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/',
        icon: ContainerOutlined
    },
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/',
        icon: ProductOutlined
    },
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/',
        icon: ProductOutlined
    }
]