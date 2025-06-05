import { Router } from "express";
import { getEvents, postEvents, updateEvents, deleteEvents, getOneEvent}  from "../controllers/event_controller.js";

export const eventRouter = Router();

eventRouter.get("/events", getEvents)
eventRouter.get('/events/:id', getOneEvent)
eventRouter.post('/events', postEvents)
eventRouter.put('/events/:id', updateEvents)
eventRouter.delete('/events/:id', deleteEvents)