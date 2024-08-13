import { useState } from 'react';
import './App.css';
import Heading from './Components/HomePage';
import { Head } from './Components/Head';
import { Carousel } from './Components/Carousel/Carousel';
// import { Category } from './Components/Categories/Category';
import { LoginPage } from './Components/LoginPage';
import { Menu } from './Components/Menu/Menu';
import RecipeList from './Components/RecipeList';
import RegistrationPage from './Components/RegistrationPage';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="wrapper">
      {isSignedIn ? (
        <>
          <nav>
            <Heading setIsSignedIn={setIsSignedIn} /> {/* Pass setIsSignedIn here */}
          </nav>
          <section>
            <Head />
          </section>
          <article>
            <Carousel />
            {/* <Category /> */}
            <Menu />
            <RecipeList />
          </article>
        </>
      ) : (
        !isRegistered ? (
          <LoginPage setIsSignedIn={setIsSignedIn} setIsRegistered={setIsRegistered} />
        ) : (
          <RegistrationPage setIsRegistered={setIsRegistered} />
        )
      )}
    </div>
  );
}

export default App;
