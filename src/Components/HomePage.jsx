// import { useState, useEffect } from 'react';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import './HomePage.css';

// // eslint-disable-next-line react/prop-types
// const Heading = ({ setIsSignedIn, isSignedIn }) => {
//     const [isSearching, setIsSearching] = useState(false);

//     // Synchronize local state with prop changes
//     useEffect(() => {
//         // No need to manage local state for isLogged here
//     }, [isSignedIn]);

//     const toggleSearch = () => {
//         setIsSearching(!isSearching);
//     };

//     const handleSignInSignOut = () => {
//         if (isSignedIn) {
//             localStorage.removeItem('user');
//             setIsSignedIn(false);
//         } else {
//             // Simulate user sign-in
//             localStorage.setItem('user', 'dummyUser'); // Simulate user sign-in
//             setIsSignedIn(true);
//         }
//     };

//     return (
//         <div className="headingContainer">
//             <div className="headerIcons">
//                 <FacebookIcon />
//                 <XIcon onClick={toggleSearch} />
//                 <InstagramIcon />
//             </div>
//             <div className="searchLoginContainer">
//                 <button className="Login" onClick={handleSignInSignOut}>
//                     {isSignedIn ? 'Sign Out' : 'Sign In'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Heading;


import { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import RegistrationPage from './RegistrationPage';
import { LoginPage } from './LoginPage';
import './HomePage.css';

// eslint-disable-next-line react/prop-types
const Heading = ({ setIsSignedIn, isSignedIn }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    // Synchronize local state with prop changes
    useEffect(() => {
        // No need to manage local state for isLogged here
    }, []);

    const toggleSearch = () => {
        setIsSearching(!isSearching);
    };

    const handleSignInSignOut = () => {
        if (isSignedIn) {
            localStorage.removeItem('user');
            setIsSignedIn(false);
        } else {
            // Simulate user sign-in
            localStorage.setItem('user', 'dummyUser'); // Simulate user sign-in
            setIsSignedIn(true);
        }
    };
    const handleFacebookClick = () => {
        window.location.href = 'https://facebook.com'; // Redirect to the specified URL
      };
    const handleTwitterClick = () => {
        window.location.href = 'https://twitter.com'; // Redirect to the specified URL
      };
    const handleInstagramClick = () => {
        window.location.href = 'https://instagram.com'; // Redirect to the specified URL
      };

    return (
        <div className="headingContainer">
            <div className="headerIcons">
                <FacebookIcon onClick={handleFacebookClick} />
                <XIcon onClick={handleTwitterClick} />
                <InstagramIcon onClick={handleInstagramClick} />
            </div>
            <div className="searchLoginContainer">
                <button className="Login" onClick={handleSignInSignOut}>
                    {isSignedIn ? 'Sign Out' : 'Sign In'}
                </button>
                {!isSignedIn && (
                    !isRegistered ? (
                        <LoginPage setIsSignedIn={setIsSignedIn} setIsRegistered={setIsRegistered} />
                    ) : (
                        <RegistrationPage setIsRegistered={setIsRegistered} />
                    )
                )}
            </div>
        </div>
    );
};

export default Heading;
