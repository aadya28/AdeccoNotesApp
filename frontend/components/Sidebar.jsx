import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/');
    };

    return (
        <div className="sidebar bg-light vh-100 p-3">
            <h3 className="mb-4">Adecco Notes</h3>
            <hr />
            <Nav className="flex-column">
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        </div>
    );
}

export default Sidebar;