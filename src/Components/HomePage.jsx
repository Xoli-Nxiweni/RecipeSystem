import { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import './HomePage.css';

// eslint-disable-next-line react/prop-types
const Heading = ({ setIsSignedIn }) => {
    const [isSearching, setIsSearching] = useState(false);

    const toggleSearch = () => {
        setIsSearching(!isSearching);
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        setIsSignedIn(false); 
    };

    return (
        <div className="headingContainer">
            <div className="headerIcons">
                <FacebookIcon />
                <XIcon onClick={toggleSearch} />
                <InstagramIcon />
            </div>
            <div className="searchLoginContainer">
                <button className="Login" onClick={handleLogout}>Sign Out</button>
            </div>
        </div>
    );
};

export default Heading;
