import React from 'react';
import styled from 'styled-components';
import dropDown from 'src/assets/windowsIcons/dropdown.png';
import run from 'src/assets/windowsIcons/743(32x32).png';

export default function RunBox({ onClose }) {


  return (
    <Div>
      <div className="run__box"><div><img src={run} alt="error" className="run__img" /></div>
        <div className="run__text">Type the name of program,folder, document, or Internet resources, and windows will open it for you.</div>
      </div>
      <div className="run__input">
        <span>Open:</span>
        <div><input type="text" className="input__box" /></div>
        <div className="run__imag"><img src={dropDown} alt="error" className="run__img" height="23px" /></div>
      </div>
      <div className="run__buttonbox">
        <button className="run__button">Ok</button>
        <button className="run__button">Cancel</button>
        <button className="run__button">Browse</button>

      </div>


    </Div >
  );
}

const Div = styled.div`
      height: 100%;
      background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
      display:flex;
      flex-direction:column;
      color:#5f5757;
      

      .run__text{
        width:310px;
        margin-left:5px;
        margin-top:2px;
        letter-spacing:.50px;
        font-size: 11px;
        font-weight:500;
       
        letter-spacing:1px;
      }
      .run__box{
        display: flex;
        flex-direction:row; 
        margin:5px;
      }

      .run__input{
        top:100px;
        display: flex;
        margin-left: 7px;
        flex-direction:row; 
        
      }
      .input__box{
        margin-left: 5px;
        width:280px;
        padding: 3px;
      }
      .run__buttonbox{
        margin-left: 110px;
        margin-top: 20px;
        display: flex;
        flex-direction:row; 
      }

      .run__button{
        width: 75px;
        background-color: white; 
        border: 1px solid #5f5757;
        border-radius: 6px; 
        margin:2px;
        padding:4px;
      }

     
  
    `;
