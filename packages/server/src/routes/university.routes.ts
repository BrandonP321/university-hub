import express from "express"
import { UniversityApiRoutes } from "@university-hub/shared/api/routes"
import { GetUniversityShallowController } from "src/controllers/university.controllers";

const router = express.Router();

router.get(UniversityApiRoutes.getUniversityShallow(), GetUniversityShallowController);

export default router;