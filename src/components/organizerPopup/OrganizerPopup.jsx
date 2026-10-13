export default function OrganizerPopup({ o }) {
    return (
        <div className="organizer-popup">
            <p className="organizer-popup-field">Name: ${o.name}</p>
            <p className="organizer-popup-field">Type: ${o.type}</p>
            <p className="organizer-popup-field">Country: ${o.country}</p>
            <p className="organizer-popup-field">City: ${o.city}</p>
            <p className="organizer-popup-field">Address: ${o.address}</p>
            <p className="organizer-popup-field">Websites: ${o.websites}</p>
            <p className="organizer-popup-field">Emails: ${o.emails}</p>
            <p className="organizer-popup-field">Phone Numbers: ${o.phone_numbers}</p>
            <p className="organizer-popup-field">Contact Persons: ${o.contact_persons}</p>
            <p className="organizer-popup-field">Schedule: ${o.schedule}</p>
            <p className="organizer-popup-field">Notes: ${o.notes}</p>
        </div>
    )
}