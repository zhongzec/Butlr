import React, { useContext } from 'react';
import './Avatar.css';
import { AppContext } from 'contexts/App';

const Avatar = (props) => {
  const { User } = useContext(AppContext);
  const { username } = User;
  const { size = 109, showGreeting = true } = props;
  const styles = {
    'width': `${size}px`,
    'height': `${size}px`,
    'fontSize': `${Math.max(18, size * 0.4)}px`
  }

  return (
    <div>
      <div className="Avatar" style={styles}>
        <span>{username && username.charAt && username.charAt(0).toUpperCase()}</span>
      </div>

      {showGreeting && (
        <div className="Greeting">
          Hello <br/>
          {username}
        </div>
      )}
    </div>
  );
}

export {
  Avatar
}