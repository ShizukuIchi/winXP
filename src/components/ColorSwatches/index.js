import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

function ColorSwatches({ setDesktopState, currentColor }) {

    const [custumColor, setCustomColor] = useState(false)

    const sampleColumn1 = ['#ffffff', '#fa0000', '#00fc00', '#0602fd', '#bddbc3'];
    const sampleColumn2 = ['#000000', '#7c0001', '#027f00', '#040078', '#a3c9ee'];
    const sampleColumn3 = ['#bfbfc1', '#fcfb09', '#00fcfd', '#fd06f5', '#fcf9f0'];
    const sampleColumn4 = ['#818181', '#7f7e09', '#03807a', '#641c5c', '#a2a1a7'];

    const colorsArray = [
        sampleColumn1,
        sampleColumn2,
        sampleColumn3,
        sampleColumn4,
    ];

    useEffect(() => {
       const isCustomColor = checkIfSystemColor(currentColor, colorsArray)
       if(isCustomColor){
           setCustomColor(false)
       }else{
           setCustomColor(currentColor)
       }
    }, [currentColor])

    const checkIfSystemColor = (colorToCheck, systemColors) => {
        let isSystemColor = false
        for (const colorCode of systemColors) {
            if(colorCode.includes(colorToCheck))
                isSystemColor = true
        }
        return isSystemColor;
    }

    const handleColorSelect = selectedColor => {
        setDesktopState(prev => ({ ...prev, color: selectedColor }));
        if(!checkIfSystemColor(selectedColor, colorsArray)){
            setCustomColor(selectedColor)
        }
    };

    return (
        <Swatches>
            <section className="inline-grid">
                {colorsArray.map(column => (
                    <div key={column[0]}>
                        {column.map(color => (
                            <SampleBox
                                onClick={() => handleColorSelect(color)}
                                key={color}
                                sampleColor={color}
                            />))}
                    </div>
                ))}
            </section>
            <hr />
            <section className="inline-grid">
                <Button><input type="color" className="customColorPicker" onChange={e => handleColorSelect(e.target.value)} />Other...</Button>
                <SampleBox hidden={!custumColor} sampleColor={custumColor} />
            </section>
        </Swatches>
    );
}

const Swatches = styled.div`
  position: absolute;
  width: 112px;
  height: 174px;
  padding-left: 1px;
  background-color: rgb(236, 233, 218);
  box-sizing: border-box;
  outline: 1px outset white;
  -webkit-box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);

  & .customColorPicker{
      position: absolute;
      width: 73px;
      height: 21px;
      opacity: 0;
      left: 5px;
      bottom: 4px;
  }

  & .inline-grid {
      display: flex;
  }

  & hr {
      width: 105px;
      margin: 2px 0px 2px 2px;
  }
  & button {
      width: 75px !important;
      margin: 2px 2px 0px 3px;
      padding: 1px 0px;
  }
`;

const SampleBox = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')}
  width: 21px;
  height: 22px;
  background-color: ${props => props.sampleColor}
  -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: inset 2px 2px 2px 0px rgba(0,0,0,0.5);
  inset 2px 2px 2px 0px rgba(0,0,0,0.5);
  margin: 3px 3px 5px 3px
  -webkit-outline-offset: 1px;
  -webkit-outline: 1px solid rgba(255,255,255,0.8);
  border-radius: 1px;
  &:hover{
    outline-offset: -1px;
    outline: 3px double rgba(0,0,0,0.9);
    -webkit-box-shadow: inset 1px 2px 2px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: inset 1px 2px 2px 0px rgba(0,0,0,0.5);
    inset 1px 2px 2px 0px rgba(0,0,0,0.5);
  }
`;

export default ColorSwatches;
