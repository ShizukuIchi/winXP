import React from 'react';
import styled from 'styled-components';

function RadioGroup({ groupName, options, cb }) {
  return (
    <StyledRadioGroup>
      <form
        onChange={e => {
          cb(e.target.value, groupName);
        }}
      >
        {options.map(option => (
          <label key={option.id} className="container">
            {option.label}
            <input
              id={option.id}
              value={option.value}
              type="radio"
              name={groupName}
              checked={option.checked}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </form>
    </StyledRadioGroup>
  );
}

const StyledRadioGroup = styled.div`
  font-size: 12px;
  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 17px;
    margin-bottom: 12px;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default radio button */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 13px;
    width: 13px;
    background: linear-gradient(135deg, #dcdcd7, #fff);
    border: 1px solid #1d5281;
    border-radius: 50%;
  }

  /* On hover, add shadow */
  .container:hover input ~ .checkmark {
    box-shadow: inset -2px -2px #f8b636, inset 2px 2px #fedf9c;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    /* position: absolute; */
    top: 3px;
    left: 3px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    /* background: url('public/radioIndicatior.svg'); */
    /* TODO: change to svg */
    background: linear-gradient(90deg, rgb(77 207 67) 0%, rgb(39 129 27) 90%);
  }
`;

export default RadioGroup;
