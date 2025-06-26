const Payment = require("../models/paymentModel");

const isPremium = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const paidOrder = await Payment.findOne({
      where: {
        paymentStatus: "PAID",
        customerID: userId,
      },
    });

    req.user.isPremium = !!paidOrder;
    next();
  } catch (error) {
    console.error("Error checking premium status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = isPremium;
