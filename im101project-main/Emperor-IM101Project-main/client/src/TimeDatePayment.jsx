import React, { useContext, useState, useEffect } from 'react';
import { BookingContext } from './BookingContext';
import CustomCalendar from './CustomCalendar';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/emlogo.png'; // Adjust the path to your logo
import './CreateBook.css';

const TimeDatePayment = () => {
    const { formData, setFormData } = useContext(BookingContext);
    const [availableTimes, setAvailableTimes] = useState([
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
    ]);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    // State for additional fields
    const [customerName, setCustomerName] = useState(formData.name || '');
    const [selectedService, setSelectedService] = useState(formData.service);
    const [selectedDate, setSelectedDate] = useState(formData.date);
    const [selectedTime, setSelectedTime] = useState(formData.time);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(formData.paymentMethod);
    const [customerEmail, setCustomerEmail] = useState(formData.email);
    const [customerContactNo, setCustomerContactNo] = useState(formData.contactNo);

    // Fetch booked times for the selected date
    useEffect(() => {
        const fetchBookedTimes = async () => {
            if (formData.date) {
                try {
                    const response = await axios.post('http://localhost:3030/booked-times', { date: formData.date });
                    setBookedTimes(response.data);
                } catch (error) {
                    console.error('Error fetching booked times:', error);
                }
            }
        };

        fetchBookedTimes();
    }, [formData.date]);

    const handleTimeSelect = (time) => {
        if (!bookedTimes.includes(time)) {
            setFormData({ ...formData, time });
            setSelectedTime(time);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'contactNo') {
            setCustomerContactNo(e.target.value);
        }
    };

    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setCustomerName(nameValue);
        setFormData({ ...formData, name: nameValue }); // Update formData
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bookingData = {
            name: customerName,
            service: formData.service,
            date: selectedDate,
            time: selectedTime,
            paymentMethod: selectedPaymentMethod,
            email: customerEmail,
            contactNo: customerContactNo,
        };

        console.log('Booking Data before submission:', bookingData); // Log booking data

        try {
            const response = await fetch('http://localhost:3030/submit-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Response error:', errorData); // Log the error response
                throw new Error(errorData.Error || 'An error occurred while submitting the booking');
            }

            const data = await response.json();
            console.log('Booking submitted successfully:', data);
        } catch (error) {
            console.error('Error submitting booking:', error.message);
        }
    };

    const handleBack = () => {
        navigate('/customer-details');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Link to="/" style={{ position: 'absolute', top: '45px', left: '73px' }}>
                <img src={logo} alt="Logo" style={{ width: '55px', height: 'auto' }} />
            </Link>

            <div className="hamburger" onClick={toggleMenu}>
                <div className={isMenuOpen ? "bar bar1 open" : "bar bar1"}></div>
                <div className={isMenuOpen ? "bar bar2 open" : "bar bar2"}></div>
                <div className={isMenuOpen ? "bar bar3 open" : "bar bar3"}></div>
            </div>

            {isMenuOpen && (
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                </div>
            )}

            <div className="timeDatePayment-container">
              

                {/* Name input */}
        

                {/* Date selection */}
                <div className="formGroup">
                    <label style={{ color: 'white' }}>Date</label>
                    <CustomCalendar selectedDate={formData.date} onDateChange={(date) => {
                        setFormData({ ...formData, date });
                        setSelectedDate(date);
                    }} />
                </div>

                {/* Time selection */}
                <div className="formGroup">
                    <label style={{ color: 'white' }}>Time</label>
                    <div className="time-grid">
                        {availableTimes.map((time) => (
                            <div
                                key={time}
                                className={`time-slot ${formData.time === time ? 'selected' : ''} ${bookedTimes.includes(time) ? 'disabled' : ''}`}
                                onClick={() => !bookedTimes.includes(time) && handleTimeSelect(time)}
                            >
                                {time}
                                {bookedTimes.includes(time) && <span className="booked-indicator"> (Booked)</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Number */}
                <div className="formGroup">
                    <label style={{ color: 'white' }}>Contact Number</label>
                    <input
                        type="tel"
                        name="contactNo"
                        value={customerContactNo || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your contact number"
                        required
                        className="input-field"
                    />
                </div>

                {/* Payment Method */}
                <div className="formGroup">
                    <label style={{ color: 'white' }}>Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={selectedPaymentMethod || ''}
                        onChange={(e) => {
                            handleInputChange(e);
                            setSelectedPaymentMethod(e.target.value);
                        }}
                        className="dropdown"
                        required
                    >
                        <option value="" disabled>Select Payment Method</option>
                        <option value="pay_in_store">Pay in Store</option>
                    </select>
                </div>

                {/* Back and Submit buttons */}
                <div className="button-container">
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleSubmit} className="submitBooking-button" disabled={!formData.time}>
                            Submit Booking
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TimeDatePayment;