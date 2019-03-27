import React, { useState } from 'react';
import Login from './Login';
import { genID } from 'src/lib';

const genOptionId = genID();
const initOptions = [
  { id: genOptionId(), text: 'Ubuntu', selected: true },
  { id: genOptionId(), text: 'Ubuntu with communitheme snap', selected: false },
  { id: genOptionId(), text: 'Ubuntu on Wayland', selected: false },
  { id: genOptionId(), text: 'Ubuntu on Xorg', selected: false },
  { id: genOptionId(), text: 'Unity', selected: false },
];

function LoginContainer(props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [options, setOptions] = useState(() => initOptions);
  function onOptionClick(id) {
    if (options.find(option => option.selected).id === id) return;
    setOptions(options => {
      return options.map(option =>
        option.id === id
          ? { ...option, selected: true }
          : { ...option, selected: false },
      );
    });
  }
  return (
    <Login
      options={options}
      {...props}
      showPopup={popupOpen}
      onOptionClick={onOptionClick}
      openPopup={() => setPopupOpen(true)}
      closePopup={() => setPopupOpen(false)}
    />
  );
}

export default LoginContainer;
