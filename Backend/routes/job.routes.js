const express = require("express")
const router = express.Router()

const {body, validationResult} = require("express-validator")
const jobController = require("../controllers/job.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/create",authMiddleware.findToken,
    jobController.createJob
)

router.get("/",
    jobController.allJobs
)

module.exports = router