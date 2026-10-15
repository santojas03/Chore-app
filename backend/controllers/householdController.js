import HouseHold, { generateInviteCode } from "../models/HouseHoldSchema.js";
import User from "../models/UserSchema.js";

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

// POST /api/households/leave
// If the owner leaves, ownership passes to another member.
// If the last member leaves, the household is deleted.
export const leaveHousehold = async (req, res) => {
  const householdId = req.user.household;
  if (!householdId) {
    return res.status(404).json({ message: "You are not in a household" });
  }

  req.user.household = null;
  await req.user.save();

  const household = await HouseHold.findById(householdId);
  if (household) {
    const nextMember = await User.findOne({ household: householdId }).sort({
      _id: 1,
    });
    if (!nextMember) {
      await household.deleteOne();
    } else if (household.owner.equals(req.user._id)) {
      household.owner = nextMember._id;
      await household.save();
    }
  }

  res.status(204).end();
};

// POST /api/households/invite-code  (owner only)
// Replaces the invite code, e.g. if the old one was shared too widely.
export const regenerateInviteCode = async (req, res) => {
  const household = req.user.household
    ? await HouseHold.findById(req.user.household)
    : null;
  if (!household) {
    return res.status(404).json({ message: "You are not in a household" });
  }
  if (!household.owner.equals(req.user._id)) {
    return res
      .status(403)
      .json({ message: "Only the household owner can change the invite code" });
  }

  for (let attempt = 0; ; attempt++) {
    household.inviteCode = generateInviteCode();
    try {
      await household.save();
      break;
    } catch (err) {
      if (err.code !== 11000 || attempt >= 4) throw err;
    }
  }

  res.json({ inviteCode: household.inviteCode });
};
