import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css'; // Add custom styles here

const Payments = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Add any logout logic here (like clearing tokens)
        navigate('/'); // Redirect to homepage
    };

    // Sample payment data (this would typically come from your state or API)
    const payments = [
        { bookingID: 1, name: 'John Doe', servicePrice: 450, contactNo: '123-456-7890' },
        { bookingID: 2, name: 'Jane Smith', servicePrice: 400, contactNo: '098-765-4321' },
        { bookingID: 3, name: 'Emily Davis', servicePrice: 500, contactNo: '567-890-1234' },
    ];

    const handleDelete = (bookingID) => {
        // Implement delete logic here (e.g., API call to delete payment)
        console.log(`Deleting payment with Booking ID: ${bookingID}`);
        // Remove the payment from the state or make an API call to delete it
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-2 bg-dark sidebar">
                    <div className="text-white text-center py-3">
                        <h4>Emperor's Lounge</h4>
                    </div>
                    <hr className="text-white" />
                    <div className="text-center">
                        <button className="nav-link text-white btn btn-link" onClick={() => navigate('/admin')}>
                            <i className="fas fa-home"></i> Dashboard
                        </button>
                        <button className="nav-link text-white btn btn-link" onClick={() => navigate('/custbook')}>
                            <i className="fas fa-calendar-alt"></i> Customer's Booking
                        </button>
                        <button className="nav-link text-white btn btn-link" onClick={() => navigate('/payments')}>
                            <i className="fas fa-credit-card"></i> Payment
                        </button>
                        <button className="nav-link text-white btn btn-link" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Log out
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-10 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Payment</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Name</th>
                                        <th>Service Price</th>
                                        <th>Contact No</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment.bookingID}>
                                            <td>{payment.bookingID}</td>
                                            <td>{payment.name}</td>
                                            <td>${payment.servicePrice}</td>
                                            <td>{payment.contactNo}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(payment.bookingID)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Payments;