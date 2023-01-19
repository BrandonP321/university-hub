import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { EnvUtils } from "../utils/EnvUtils";

/** Configures default middleware */
export const configureApp = (app: Express) => {
	app.use(helmet());

	app.use(cors({
		origin: EnvUtils.Vars.CORS_ORIGINS.split(","),
		credentials: true,
	}));

	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Credentials', "true")
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		)
		next()
	})

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());
}