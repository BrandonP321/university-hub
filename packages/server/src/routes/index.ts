import universityRoutes from "./university.routes";
import { Express } from "express";

export * from "./university.routes";

export const useRoutes = (app: Express) => {
    app.use(universityRoutes)
}