const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// ALL routes protected
router.use(authController.protect);

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewsController.setTourUserIds,
    reviewsController.createReview,
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(
    authController.restrictTo('admin', 'user'),
    reviewsController.updateReview,
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewsController.deleteReview,
  );

module.exports = router;
