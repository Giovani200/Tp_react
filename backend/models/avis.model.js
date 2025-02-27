const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
  // Supprimé { timestamps: true } pour enlever les dates
});

module.exports = mongoose.model('Avis', avisSchema);