import { nanoid } from "@reduxjs/toolkit";
import { Home } from "../pages/home/home";
import { RoutesType } from "./types/types";

export const routes: RoutesType[] = [
    {
        id: nanoid(),
        name: "Dashboard",
        component: Home
    },
]