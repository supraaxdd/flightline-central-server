import { Request, Response, NextFunction } from "express";
import { IStudent } from "../models/student";

export const getStudentById = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const id = req.params.id ? Number(req.params.id) : res.status(400).json({ message: "Bad parameter" });

        // Fetch Student from DB

        let student = {
            id: id,
            username: "Test"
        } as IStudent;

        res.status(200).json(student);
    } catch (e) {
        console.error(e);
    };
};