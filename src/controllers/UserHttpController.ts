import { Request, Response } from "express";
import { IdParameter, DiscordIdParameter, UsernameParameter } from "./RequestTypes";
import { UserService } from "../services/UserService";

const userService: UserService = new UserService();

// TODO: Develop controller for all service methods