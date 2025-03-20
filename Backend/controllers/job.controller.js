const jobModel = require("../models/job.model")
const { body, validationResult } = require("express-validator")

module.exports.createJob = async (req, res) => {
    const { title, description, jobtype, salary, company, location, applicationDeadline } = req.body;

    const job = await jobModel.create({
        title,
        description,
        jobtype,
        salary,
        company,
        location,
        applicationDeadline,
        user: req.user._id
    });

    // Populate user details
    const populatedJob = await job.populate("user", "firstname lastname email company");

    res.status(201).json(populatedJob);
};


module.exports.allJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find().sort({ createdAt: -1 }); // Sort by latest jobs
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
    }
};
