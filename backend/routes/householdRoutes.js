import { Router } from "express";
import {
  createHousehold,
  getMyHousehold,
  joinHousehold,
  leaveHousehold,
  regenerateInviteCode,
} from "../controllers/householdController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.post("/", createHousehold);
router.get("/me", getMyHousehold);
router.post("/join", joinHousehold);
router.post("/leave", leaveHousehold);
router.post("/invite-code", regenerateInviteCode);

export default router;
