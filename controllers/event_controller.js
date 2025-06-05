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

    // Get the updated data from the request body
    const { title, date, venue, rate, currency, dressCode, type } = req.body; 

    // Prepare the fields to update
        // Only include fields that are present in the request body
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (date !== undefined) updateFields.date = date;
        if (venue !== undefined) updateFields.venue = venue;
        if (rate !== undefined) updateFields.rate = rate;
        if (currency !== undefined) updateFields.currency = currency;
        if (dressCode !== undefined) updateFields.dressCode = dressCode;
        if (type !== undefined) updateFields.type = type;

    // Mongoose findByIdAndUpdate method:
        // First argument: The ID of the document to find
        // Second argument: The updates to apply
        // Third argument (options):
        //  - new: true  => Returns the *updated* document rather than the original one
        //   - runValidators: true => Runs Mongoose validators on the update (e.g., 'required', 'minlength')
    const updatedEvent = await Events.findByIdAndUpdate(
        id,
        updateFields,
        { new: true, runValidators: true }
    );
    res.json(updatedEvent);
}

export const deleteEvents = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const event = await Events.findByIdAndDelete(id);

    res.send(event)
}


