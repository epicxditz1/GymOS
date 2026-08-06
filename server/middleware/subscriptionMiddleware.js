module.exports = async function (req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const now = new Date();

  // Trial expired
  if (
  user.subscription.plan === "trial" &&
  user.subscription.trialEndsAt < now &&
  user.subscription.status !== "expired"
) {
  user.subscription.status = "expired";
  await user.save();
}

  // Paid plan expired
  if (
  user.subscription.plan !== "trial" &&
  user.subscription.subscriptionEndsAt &&
  user.subscription.subscriptionEndsAt < now &&
  user.subscription.status !== "expired"
) {
  user.subscription.status = "expired";
  await user.save();
}

  if (user.subscription.status !== "active") {
    return res.status(403).json({
      message: "Subscription expired",
      subscriptionExpired: true,
    });
  }

  next();
};