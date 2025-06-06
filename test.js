// export const postEvents = async (req, res) => {
//     try {
//         // Get the data from the request body
//         const eventData = req.body;

//         // Basic check to ensure there's data in the request body
//         if (!eventData || Object.keys(eventData).length === 0) {
//             return res.status(400).json({
//                 message: "Failed to create event: No data provided in the request body.",
//             });
//         }

//         // Create a new event in the database using the 'Events' model
//         // Replace 'Events' with your actual Mongoose model name if different (e.g., 'Event')
//         const newEvent = await Events.create(eventData);

//         // Send a success response with the newly created event
//         res.status(201).json({
//             message: "Event created successfully!",
//             data: newEvent
//         });

//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error("Error creating event:", error);

//         // Send an error response
//         // Check for Mongoose validation errors specifically
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({
//                 message: "Failed to create event: Validation error.",
//                 errors: error.errors // Provides details about which fields failed validation
//             });
//         }

//         res.status(500).json({
//             message: "Failed to create event.",
//             error: error.message
//         });
//     }
// };





// export const getEvents = async (req, res) => {
//     try {
//         // Find all documents in the 'events' collection
//         // The empty object {} as a query parameter means "find all documents"
//         const events = await Event.find({});

//         // Send a 200 OK status and the retrieved events as a JSON response
//         res.status(200).json(events);

//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error('Error fetching events:', error);

//         // Send a 500 Internal Server Error status with a helpful message
//         res.status(500).json({
//             message: 'Failed to retrieve events. Please try again later.',
//             error: error.message // Optionally include the error message for more details
//         });
//     }
// };


// get event by id
// export const getEventById = async (req, res) => {
//     try {
//         const { id } = req.params; // Get the event ID from the URL parameters (e.g., /api/events/60b8d295f8e2c0a9c8f0b7b1)

//         // Check if the event ID is provided
//         if (!id) {
//             return res.status(400).json({ message: 'Event ID is required.' });
//         }

//         // Mongoose findById method:
//         // Finds a single document by its _id.
//         // It returns the document if found, otherwise null.
//         const event = await Event.findById(id);

//         // If no event was found with the given ID
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found.' });
//         }

//         // Send the found event as a JSON response
//         res.status(200).json(event);

//     } catch (error) {
//         // Handle CastError for invalid IDs (e.g., malformed ObjectId string that doesn't match MongoDB's format)
//         if (error.name === 'CastError') {
//             return res.status(400).json({ message: 'Invalid Event ID format.', error: error.message });
//         }

//         // Log the error for debugging
//         console.error('Error fetching event by ID:', error);

//         // Send a generic 500 Internal Server Error response
//         res.status(500).json({
//             message: 'Server Error: Failed to retrieve event. Please try again later.',
//             error: error.message // Optionally include the error message for more details
//         });
//     }
// };



// export const updateEvent = async (req, res) => {
//     try {
//         const { id } = req.params; // Get the event ID from the URL parameters (e.g., /api/events/12345)
//         const { title, description, date, location } = req.body; // Get the updated data from the request body

//         // Check if the event ID is valid (optional but good practice)
//         if (!id) {
//             return res.status(400).json({ message: 'Event ID is required.' });
//         }

//         // Check if the event exists before attempting to update
//         const eventExists = await Event.findById(id);

//         if (!eventExists) {
//             return res.status(404).json({ message: 'Event not found.' });
//         }

//         // Prepare the fields to update
//         // Only include fields that are present in the request body
//         const updateFields = {};
//         if (title !== undefined) updateFields.title = title;
//         if (description !== undefined) updateFields.description = description;
//         if (date !== undefined) updateFields.date = date;
//         if (location !== undefined) updateFields.location = location;

//         // You can also simplify the above using an approach like this if you want to update all fields sent in body:
//         // const updateFields = req.body;

//         // Mongoose findByIdAndUpdate method:
//         // 1. First argument: The ID of the document to find
//         // 2. Second argument: The updates to apply
//         // 3. Third argument (options):
//         //    - new: true  => Returns the *updated* document rather than the original one
//         //    - runValidators: true => Runs Mongoose validators on the update (e.g., 'required', 'minlength')
//         const updatedEvent = await Event.findByIdAndUpdate(
//             id,
//             updateFields,
//             { new: true, runValidators: true }
//         );

//         // If for some reason updateByIdAndUpdate doesn't return an event (e.g., concurrency issue, though less common with ID lookup)
//         if (!updatedEvent) {
//             return res.status(404).json({ message: 'Event not found after update attempt.' });
//         }

//         // Send the updated event as a JSON response
//         res.status(200).json(updatedEvent);

//     } catch (error) {
//         // Handle CastError for invalid IDs (e.g., malformed ObjectId)
//         if (error.name === 'CastError') {
//             return res.status(400).json({ message: 'Invalid Event ID format.', error: error.message });
//         }

//         // Handle Mongoose validation errors
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(val => val.message);
//             return res.status(400).json({ message: 'Validation error', errors: messages });
//         }

//         // Log the error for debugging
//         console.error('Error updating event:', error);

//         // Send a generic 500 error response
//         res.status(500).json({
//             message: 'Server Error: Failed to update event. Please try again later.',
//             error: error.message // Optionally include the error message
//         });
//     }
// };



// export const deleteEvent = async (req, res) => {
//     try {
//         const { id } = req.params; // Get the event ID from the URL parameters (e.g., /api/events/12345)

//         // Check if the event ID is provided
//         if (!id) {
//             return res.status(400).json({ message: 'Event ID is required.' });
//         }

//         // Mongoose findByIdAndDelete method:
//         // Finds a document by its _id and deletes it.
//         // It returns the deleted document if found, otherwise null.
//         const deletedEvent = await Event.findByIdAndDelete(id);

//         // If no event was found and deleted
//         if (!deletedEvent) {
//             return res.status(404).json({ message: 'Event not found.' });
//         }

//         // Send a success message and the deleted event (optional)
//         res.status(200).json({
//             message: 'Event deleted successfully!',
//             deletedEvent: deletedEvent // You can send the deleted event data back
//         });

//     } catch (error) {
//         // Handle CastError for invalid IDs (e.g., malformed ObjectId string)
//         if (error.name === 'CastError') {
//             return res.status(400).json({ message: 'Invalid Event ID format.', error: error.message });
//         }

//         // Log the error for debugging
//         console.error('Error deleting event:', error);

//         // Send a generic 500 Internal Server Error response
//         res.status(500).json({
//             message: 'Server Error: Failed to delete event. Please try again later.',
//             error: error.message // Optionally include the error message
//         });
//     }
// };




// search filtering implementation
// export const getEvents = async (req, res) => {
//     try {
//         const query = {};
//         let sortOptions = {};

//         // --- 1. Filtering Logic ---

//         // Filter by title (partial, case-insensitive match)
//         if (req.query.title) {
//             query.title = { $regex: req.query.title, $options: 'i' };
//         }

//         // Filter by venue (partial, case-insensitive match)
//         if (req.query.venue) {
//             query.venue = { $regex: req.query.venue, $options: 'i' };
//         }

//         // Filter by rate (exact match, case-insensitive)
//         if (req.query.rate) {
//             // If you only expect "free" or specific rates, consider an exact match
//             query.rate = { $regex: req.query.rate, $options: 'i' };
//         }

//         // Filter by type (exact match, case-insensitive, based on enum values)
//         if (req.query.type) {
//             // For enum types, exact match is usually preferred, but case-insensitive can be added
//             query.type = { $regex: req.query.type, $options: 'i' };
//         }

//         // Date Filtering
//         if (req.query.date) {
//             // Find events on a specific day
//             const specificDate = new Date(req.query.date);
//             if (!isNaN(specificDate.getTime())) { // Validate if date is valid
//                 const startOfDay = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate());
//                 const endOfDay = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate() + 1, 0, 0, 0, -1); // End of the day

//                 query.date = {
//                     $gte: startOfDay,
//                     $lte: endOfDay
//                 };
//             } else {
//                 return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
//             }
//         }
//         // You can add `dateFrom` and `dateTo` for range queries if needed
//         if (req.query.dateFrom) {
//             const dateFrom = new Date(req.query.dateFrom);
//             if (!isNaN(dateFrom.getTime())) {
//                 query.date = { ...query.date, $gte: dateFrom };
//             } else {
//                 return res.status(400).json({ message: 'Invalid dateFrom format. Use YYYY-MM-DD.' });
//             }
//         }
//         if (req.query.dateTo) {
//             const dateTo = new Date(req.query.dateTo);
//             if (!isNaN(dateTo.getTime())) {
//                  query.date = { ...query.date, $lte: dateTo };
//             } else {
//                 return res.status(400).json({ message: 'Invalid dateTo format. Use YYYY-MM-DD.' });
//             }
//         }

//         // --- 2. Sorting Logic ---

//         if (req.query.sort) {
//             // Expects format like "date:asc" or "title:desc"
//             const [field, order] = req.query.sort.split(':');
//             if (['title', 'date', 'venue', 'rate', 'type', 'createdAt'].includes(field)) { // Ensure field is allowed for sorting
//                  sortOptions[field] = order === 'desc' ? -1 : 1;
//             } else {
//                 return res.status(400).json({ message: `Invalid sort field: ${field}` });
//             }
//         } else {
//             // Default sort: by date ascending (upcoming events first)
//             sortOptions.date = 1;
//         }

//         // --- 3. Pagination Logic ---

//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const skip = (page - 1) * limit;

//         // --- 4. Execute Query ---

//         const events = await Events.find(query) // Apply filters
//                                    .sort(sortOptions) // Apply sorting
//                                    .skip(skip)         // Apply pagination skip
//                                    .limit(limit);      // Apply pagination limit

//         const totalEvents = await Events.countDocuments(query); // Get total count matching filters

//         // --- 5. Send Response ---

//         res.status(200).json({
//             success: true,
//             count: events.length,
//             total: totalEvents,
//             page: page,
//             pages: Math.ceil(totalEvents / limit),
//             data: events
//         });

//     } catch (error) {
//         console.error('Error fetching events with filters:', error);
//         res.status(500).json({
//             message: 'Server Error: Failed to retrieve events. Please try again later.',
//             error: error.message
//         });
//     }
// };