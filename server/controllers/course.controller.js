import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTittle, category } = req.body;
    if (!courseTittle || !category) {
      return res.status(400).json({
        message: "Course title and category are required",
      });
    }

    const course = await Course.create({
      courseTittle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};
