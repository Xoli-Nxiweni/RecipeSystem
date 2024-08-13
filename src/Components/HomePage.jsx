import { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import { fetchRecipes } from './API'; // Import your API functions
import './HomePage.css';

// eslint-disable-next-line react/prop-types
const Heading = ({ setIsSignedIn }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes when component mounts
        const loadRecipes = async () => {
            const fetchedRecipes = await fetchRecipes();
            setRecipes(fetchedRecipes);
            setFilteredRecipes(fetchedRecipes); // Initialize filtered recipes
        };

        loadRecipes();
    }, []);

    useEffect(() => {
        // Filter recipes based on search term
        if (searchTerm) {
            setFilteredRecipes(
                recipes.filter(recipe =>
                    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredRecipes(recipes);
        }
    }, [searchTerm, recipes]);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (isSearching) {
            setSearchTerm(''); // Clear the search input when toggling off
        }
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
                <button className="Login" onClick={handleLogout}>Sign Out</button>
            </div>
            {isSearching && filteredRecipes.length > 0 && (
                <div className="searchResults">
                    {filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="searchResultItem">
                            <img src={recipe.imgSrc} alt={recipe.title} />
                            <p>{recipe.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Heading;
