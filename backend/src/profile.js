const Profile = require("./models/profile.model");
const _ = require("lodash");
const { fillFollowing } = require("./utils");
const uploadImage = require("./uploadCloudinary");

async function putHeadline(req, res) {
  const headline = req.body.headline;
  await Profile.updateOne({ userId: req.userId }, { headline: headline });
  res.send({ userId: req.userId, headline: headline });
}

async function getEmail(req, res) {
  let targetUser = req.params.userId;
  if (!targetUser) {
    targetUser = req.userId;
  }
  const profile = await Profile.findOne({ userId: targetUser });
  if (!profile) {
    return res.sendStatus(404);
  }
  const email = profile.email;
  res.send({ userId: targetUser, email: email });
}

async function putEmail(req, res) {
  const newEmail = req.body.email;
  await Profile.updateOne({ userId: req.userId }, { email: newEmail });
  res.send({ userId: req.userId, email: newEmail });
}

async function getZipcode(req, res) {
  let targetUser = req.params.userId;
  if (!targetUser) {
    targetUser = req.userId;
  }
  const profile = await Profile.findOne({ userId: targetUser });
  if (!profile) {
    return res.sendStatus(404);
  }
  const zipcode = profile.zipcode;
  res.send({ userId: targetUser, zipcode: zipcode });
}

async function putZipcode(req, res) {
  const newZipcode = req.body.zipcode;
  await Profile.updateOne({ userId: req.userId }, { zipcode: newZipcode });
  res.send({ userId: req.userId, zipcode: newZipcode });
}

async function getDoB(req, res) {
  let targetUser = req.params.userId;
  if (!targetUser) {
    targetUser = req.userId;
  }
  const profile = await Profile.findOne({ userId: targetUser });
  if (!profile) {
    return res.sendStatus(404);
  }
  const dob = profile.dob;
  res.send({ userId: targetUser, dob: dob });
}

function getAvatar(req, res) {
  let targetUser = req.params.userId;
  if (!targetUser) {
    targetUser = req.userId;
  }
  Profile.findOne({ userId: targetUser }).then((profile) => {
    if (!profile) {
      return res.send(404);
    }
    res.send({ userId: targetUser, avatar: profile.avatar });
  });
}

function postAvatar(req, res) {
  const userId = req.userId;
  const avatar = req.fileurl;
  Profile.updateOne({ userId: userId }, { avatar: avatar }).then(() => {
    res.send({ userId: userId, avatar: avatar });
  });
}

async function getProfile(req, res) {
  let userId = req.params.userId;
  if (!userId) {
    userId = req.userId;
  }
  const profile = await Profile.findOne({ userId: userId });
  if (!profile) {
    return res.sendStatus(404);
  }
  const following = await fillFollowing(profile.following);
  res.send({
    userId: userId,
    profile: {
      userId: profile.userId,
      userName: profile.userName,
      email: profile.email,
      photoURL: profile.avatar,
      phone: profile.phone,
      zipcode: profile.zipcode,
      headline: profile.headline,
      dob: profile.dob,
      isLinked: profile.isLinked,
      provider: profile.provider || "livedin",
      following: following,
    },
  });
}

async function putProfile(req, res) {
  const userId = req.userId;
  const fields = req.body.fields;
  await Profile.updateOne({ userId }, fields);
  res.send({ userId, result: "success", fields });
}

module.exports = (app) => {
  app.get("/profile/:userId?", getProfile);
  app.put("/headline", putHeadline);
  app.put("/profile", putProfile);
  // app.get("/email/:userId?", getEmail);
  // app.put("/email", putEmail);
  // app.get("/zipcode/:userId?", getZipcode);
  // app.put("/zipcode", putZipcode);
  // app.get("/dob/:userId?", getDoB);
  // app.get("/avatar/:userId?", getAvatar);
  app.post("/avatar", uploadImage("avatar"), postAvatar);
};
