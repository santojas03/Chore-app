import { Router } from "express";
import {
  createHousehold,
  getMyHousehold,
  joinHousehold,
} from "../controllers/householdController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.post("/", createHousehold);
router.get("/me", getMyHousehold);
router.post("/join", joinHousehold);

export default router;
