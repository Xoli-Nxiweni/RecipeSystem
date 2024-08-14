import { useState, useEffect } from 'react';
import './App.css';
import Heading from './Components/HomePage';
import { Category } from './Components/Categories/Category';
import { Head } from './Components/Head';
import { Carousel } from './Components/Carousel/Carousel';
// import { LoginPage } from './Components/LoginPage';
import { Menu } from './Components/Menu/Menu';
import RecipeList from './Components/RecipeList';
// import RegistrationPage from './Components/RegistrationPage';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Check if user is already signed in when the component mounts
    const user = localStorage.getItem('user');
    if (user) {
      setIsSignedIn(true);
    }
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="wrapper">
      <nav>
        <Heading isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      </nav>
      <section>
        <Head />
      </section>
      <article>
        <Carousel />
        <Category onCategoryChange={handleCategoryChange} />
        <Menu isSignedIn={isSignedIn} selectedCategory={selectedCategory} />
        <RecipeList isSignedIn={isSignedIn} />
      </article>
      {/* {!isSignedIn && (
        !isRegistered ? (
          <LoginPage setIsSignedIn={setIsSignedIn} setIsRegistered={setIsRegistered} />
        ) : (
          <RegistrationPage setIsRegistered={setIsRegistered} />
        )
      )} */}
    </div>
  );
}

export default App;
