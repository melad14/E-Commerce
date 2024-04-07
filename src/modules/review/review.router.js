import express from "express"
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js"
import { createReviewSchema, getReviewSchema, updateReviewSchema } from "./review.validatiojn.js";
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";
import { validation } from "../../middleware/validation.js";

const reviewRouter = express.Router()

reviewRouter
.route('/')
.post(protectedRoutes,allowTo( 'user'),validation(createReviewSchema),createReview)
.get(getAllReviews)
reviewRouter
.route('/:id')
.get(validation(getReviewSchema),getReview)
.put(protectedRoutes,allowTo('user'),validation(updateReviewSchema),updateReview)
.delete(protectedRoutes,allowTo('user'),validation(getReviewSchema),deleteReview)


export default reviewRouter