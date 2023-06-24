const mongoose = require('mongoose');

const purchasedTokenSchema = new mongoose.Schema({
  meterNumber: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  token: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8,
  },
  tokenStatus: {
    type: String,
    enum: ['USED', 'NEW', 'EXPIRED'],
    default: 'NEW',
  },
  tokenValueDays: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 11,
  },
  purchasedDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 11,
  },
});

const PurchasedToken = mongoose.model('PurchasedToken', purchasedTokenSchema);

module.exports = PurchasedToken;
