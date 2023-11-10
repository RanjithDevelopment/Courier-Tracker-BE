const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
    packageName: { type: String, required: true, trim: true },
    image: {type: String, required: true, trim: true },
    sender: { type: String, required: true, trim: true },
    reciver: { type: String, required: true, trim: true },
    shipmentDetails: { type: String, required: true, trim: true },
    tracking: [{
      location: { type: String, required: true, trim: true },
      status: { type: String, required: true, trim: true },
      time:{type: Date, default:Date.now}
    }],
  });

const packageDetails = mongoose.model("Packages",courierSchema);
module.exports = packageDetails;