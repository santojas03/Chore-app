import HouseHold, { generateInviteCode } from "../models/HouseHoldSchema.js";

const MEMBER_FIELDS = "name email";

const alreadyInHousehold = (res) =>
  res
    .status(409)
    .json({ message: "You are already in a household. Leave it first." });

const loadHousehold = (id) =>
  HouseHold.findById(id).populate("members", MEMBER_FIELDS);

// POST /api/households  { name }
export const createHousehold = async (req, res) => {
  if (req.user.household) return alreadyInHousehold(res);

  const { name } = req.body ?? {};

  // Invite codes are random; retry in the rare case one is already taken.
  let household;
  for (let attempt = 0; !household; attempt++) {
    try {
      household = await HouseHold.create({
        name,
        owner: req.user._id,
        inviteCode: generateInviteCode(),
      });
    } catch (err) {
      const codeTaken = err.code === 11000 && err.keyValue?.inviteCode;
      if (!codeTaken || attempt >= 4) throw err;
    }
  }

  req.user.household = household._id;
  await req.user.save();

  res.status(201).json({ household: await loadHousehold(household._id) });
};

// GET /api/households/me
export const getMyHousehold = async (req, res) => {
  const household = req.user.household
    ? await loadHousehold(req.user.household)
    : null;
  if (!household) {
    return res.status(404).json({ message: "You are not in a household" });
  }
  res.json({ household });
};

// POST /api/households/join  { inviteCode }
export const joinHousehold = async (req, res) => {
  if (req.user.household) return alreadyInHousehold(res);

  const { inviteCode } = req.body ?? {};
  if (typeof inviteCode !== "string") {
    return res.status(400).json({ message: "inviteCode is required" });
  }

  // Accept "abc-123" or "ABC 123" as well as "ABC123".
  const code = inviteCode.toUpperCase().replace(/[\s-]/g, "");
  const household = await HouseHold.findOne({ inviteCode: code });
  if (!household) {
    return res.status(404).json({ message: "No household with that invite code" });
  }

  req.user.household = household._id;
  await req.user.save();

  res.json({ household: await loadHousehold(household._id) });
};
