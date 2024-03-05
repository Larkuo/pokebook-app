import { ReactNode } from "react";
import { 
    HomePage, 
    ListPage, 
} from "../pages";

export interface AppRoutesInterface{
    key: number;
    path: string;
    element: ReactNode;
}

export const APP_ROUTES: AppRoutesInterface[] = [
    {
        key: 0,
        path: "/*",
        element: <HomePage />
    },
    {
        key: 1,
        path: "/",
        element: <HomePage />
    },
    {
        key: 2,
        path: "/list",
        element: <ListPage />
    },
    {
        key: 3,
        path: "/list/:pokemonName",
        element: <ListPage />
    },
];