const Review = require('../models/review')
const Item = require('../models/item')
const User = require('../models/user')

// router.get('/:id/reviews', reviewController.showUserReviews)
exports.showUserReviews = async(req, res) => {
    try {
        const reviews = await Review.find({ user: req.params.id }).populate('item')
        res.json({ reviews: reviews })
    } catch (error) {
        res.status(400).json({ message: `Nothing here` })
    }
}
// router.get('/:id/reviews', reviewController.showItemReviews)
exports.showItemReviews = async(req, res) => {
    try {
        const reviews = await Review.find({ item: req.params.id })
        res.json({ reviews: reviews })
    } catch (error) {
        res.status(400).json({ message: `Nothing here` })
    }
}
// router.post('/:id/reviews', userController.auth, reviewController.createReview)
// const reviewSchema = new Schema({
//     item: { type: Schema.Types.ObjectId, required: true, ref: 'Item' },
//     user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//     rating: { type: Number, required: true},
//     body: { type: String, required: true}
// })
exports.createReview = async(req, res) => {
    try {
        const user = req.user
        const item = await Item.findOne({ _id: req.params.id })
        // grabs the item from the database from the url
        item.reviews ? await item.populate('reviews') : item.reviews = []
        // checks if there's already reviews or not
        let review = item.reviews.find(review => review.user.equals(user._id))
        // check if the user already wrote a review
            if (review) { 
                review.rating = req.body.rating
                review.body = req.body.body
                // if there is already a review of the item by that user, update the review to the new review
            } else {
                review = new Review({ item: item._id, user: user._id, rating: req.body.rating, body: req.body.body })
                // if the user hasn't written a review, create a new review
                item.reviews.addToSet(review)
                // add the review to the item
                user.reviews.addToSet(review)
            }
        await review.save()
        await user.save()
        await item.save()
        res.json({ review: review })
    } catch (error) {
        res.status(400).json({ message: `You just can't do that`})
    }
}
// router.put('/:id/reviews', userController.auth, reviewController.editReview)
exports.editReview = async (req, res) => {
    try {
        const user = req.user
        const item = await Item.findOne({ _id: req.params.id }).populate('reviews')
        const updates = Object.keys(req.body)
        const review = await Review.findOne({ user: user._id, item: item._id })
        updates.forEach(update => review[update] = req.body[update])
        await review.save()
        res.json({review: review})
    } catch (error) {
        res.status(400).json({ message: `You can't just do that`})
    }
}
// router.delete('/:id/reviews', userController.auth, reviewController.deleteReview)
exports.deleteReview = async (req, res) => {
    try {
        const user = req.user
        const item = await Item.findOne({ _id: req.params.id }).populate('reviews')
        Review.findOneAndDelete({ user: user._id, item: item._id })
        res.json({message: `Poof!`, item: item})
    } catch (error) {
        res.status(400).json({ message: `It didn't do it` })
    }
}