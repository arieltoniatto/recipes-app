import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <input
        className="profile-icon"
        src={ mealIcon }
        alt="profile icon"
        type="image"
        testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        id="pro"
      />
      <input
        className="profile-icon"
        src={ drinkIcon }
        alt="profile icon"
        type="image"
        testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        id="pro"
      />
    </footer>
  );
}

export default Footer;
