import { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import './HomePage.css';

const Heading = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        setSearchTerm(''); // Clear the search input when toggling off
    };

    useEffect(() => {
        if (searchTerm) {
            // Perform search logic here with your own data
            console.log("Searching for:", searchTerm);
            // Example: You can filter your data and set results in state
        }
    }, [searchTerm]);

    return (
        <div className="headingContainer">
            <div className="headerIcons">
                <FacebookIcon />
                <XIcon onClick={toggleSearch} />
                <InstagramIcon />
            </div>
            <div className="searchLoginContainer">
                {isSearching && (
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchTerm}
                    />
                )}
                <button onClick={toggleSearch}>
                    <SearchIcon />
                </button>
                <button className="Login">Sign Out</button>
            </div>
            {/* If you have search results, render them here */}
        </div>
    );
};

export default Heading;
