import { Events } from "../models/event_model.js"


export const getEvents = async (req, res) => {
    const events = await Events.find();
    res.send(events);
}
export const getOneEvent = async (req, res) => {
    const event = await Events.findById(req.params.id);
    res.send(event);
}

export const postEvents = async (req, res) => {
    // create data in database using create method or save method
    const addEvent = await Events.create(req.body);

    res.send(addEvent)
}

export const updateEvents = async (req, res) => {
    // Get the event ID from the URL parameters
    const { id } = req.params;  
    const event = await Events.findByIdAndUpdate(id, req.body)
    if (!event) {
        return res.send("Event Not Found");
    }
    const updatedEvent = await Events.findById(id);
    res.json(updatedEvent);

    
}

export const deleteEvents = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const event = await Events.findByIdAndDelete(id);

    res.send(event)
}


