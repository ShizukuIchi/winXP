import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import dropDown from 'src/assets/windowsIcons/dropdown.png';

export default function RunBox({ onClose }) {


  return (
    <Div>
      <div className="run__input">
        Open:<input type="text" className="input__box" />
        <img src={dropDown} alt="error" className="run__img" />
      </div>


    </Div>
  );
}

const Div = styled.div`
      height: 100%;
      background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
      display: flex;
      flex-direction: column;
      align-items: stretch;

     
  
    `;
