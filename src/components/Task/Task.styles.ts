// src/components/Task/Task.styles.ts
import styled from '@emotion/styled';

export const DeleteButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6B778C;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    color: #fc8702;
  }
`;

export const TaskWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;

export const TaskText = styled.div`
  font-size: 14px;
  color: #172B4D;
  word-break: break-word;
  padding-right: 24px; // Место для кнопки удаления
`;

export const TaskInput = styled.input`
  width: 100%;
  border: 1px solid #DFE1E6;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  padding: 4px 8px;
  background: white;
  color: #172B4D;

  &:focus {
    border-color: #fc8702;
    box-shadow: 0 0 0 2px rgba(0,82,204,0.2);
  }
`;