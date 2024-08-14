import { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Modal, Button, Typography, Box } from '@mui/material';
import RegistrationPage from './RegistrationPage';
import { LoginPage } from './LoginPage';
import './HomePage.css';

// eslint-disable-next-line react/prop-types
const Heading = ({ setIsSignedIn, isSignedIn }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('login'); // 'login' or 'registration'

    const handleOpenModal = (type) => {
        setModalType(type);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleSignInSignOut = () => {
        if (isSignedIn) {
            localStorage.removeItem('user');
            setIsSignedIn(false);
        } else {
            handleOpenModal('login');
        }
    };

    const handleFacebookClick = () => {
        window.location.href = 'https://facebook.com'; 
    };

    const handleTwitterClick = () => {
        window.location.href = 'https://twitter.com'; 
    };

    const handleInstagramClick = () => {
        window.location.href = 'https://instagram.com';
    };

    return (
        <div className="headingContainer">
            <div className="headerIcons">
                <FacebookIcon onClick={handleFacebookClick} />
                <XIcon onClick={handleTwitterClick} />
                <InstagramIcon onClick={handleInstagramClick} />
            </div>
            <div className="searchLoginContainer">
                <Button variant="contained" color="primary" onClick={handleSignInSignOut}>
                    {isSignedIn ? 'Sign Out' : 'Sign In'}
                </Button>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={{ ...style, 
                        width: 400,
                        borderRadius: '15px',
                        border: 0
                        }}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {/* {modalType === 'login' ? 'Sign In' : 'Sign Up'} */}
                        </Typography>
                        {modalType === 'login' ? (
                            <LoginPage setIsSignedIn={setIsSignedIn} setIsRegistered={(val) => setModalType(val ? 'registration' : 'login')} />
                        ) : (
                            <RegistrationPage setIsRegistered={(val) => setModalType(val ? 'registration' : 'login')} />
                        )}
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Heading;
