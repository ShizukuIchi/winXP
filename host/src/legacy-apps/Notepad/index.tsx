import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

interface NotepadProps {
  onClose?: () => void;
}

const Notepad: React.FC<NotepadProps> = ({ onClose }) => {
  const [docText, setDocText] = useState('');
  const [wordWrap, setWordWrap] = useState(false);

  const handleOptionClick = useCallback(
    (item: string) => {
      switch (item) {
        case 'Exit':
          onClose?.();
          break;
        case 'Word Wrap':
          setWordWrap((previous) => !previous);
          break;
        case 'Time/Date': {
          const date = new Date();
          setDocText((previous) =>
            `${previous}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
          );
          break;
        }
        default:
          break;
      }
    },
    [onClose]
  );

  const handleTextAreaKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        event.persist();

        const textarea = event.currentTarget;
        const { selectionStart, selectionEnd } = textarea;

        setDocText((previous) =>
          `${previous.substring(0, selectionStart)}\t${previous.substring(selectionEnd)}`
        );

        requestAnimationFrame(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionStart + 1;
        });
      }
    },
    []
  );

  return (
    <Container>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={handleOptionClick} />
      </section>
      <StyledTextarea
        wordWrap={wordWrap}
        value={docText}
        onChange={(event) => setDocText(event.target.value)}
        onKeyDown={handleTextAreaKeyDown}
        spellCheck={false}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

const StyledTextarea = styled.textarea<{ wordWrap: boolean }>`
  flex: auto;
  outline: none;
  font-family: 'Lucida Console', monospace;
  font-size: 13px;
  line-height: 14px;
  resize: none;
  padding: 2px;
  ${({ wordWrap }) => (wordWrap ? '' : 'white-space: nowrap; overflow-x: scroll;')}
  overflow-y: scroll;
  border: 1px solid #96abff;
`;

export default Notepad;
