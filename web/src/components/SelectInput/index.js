import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from "styled-components";

export const SelectedItem = styled.div`
  display: inline-block;
  padding: 4px 6px;
  margin: 4px 2px 0;
  background-color: #7d40e7;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: red
  }
  &:hover::before {
    content: '×';
    margin-right: 4px;
  }
`

export default function SelectInput({ value, onChange }) {
  const inputRef = useRef()
  const [items, setItems] = useState(value)

  function handleKeyDown(event) {
    const keyName = event.key

    // INFO: http://keycode.info/
    if (["Enter", "Tab", ","].includes(keyName)) {
      event.preventDefault()
      const newItem = event.target.value
      const newItems = [...items, newItem]

      // FIXME: Isso não parece certo
      setItems(newItems)
      onChange(newItems)
      inputRef.current.value = ""
    }
  }

  function removeItem(itemIndex) {
    items.splice(itemIndex, 1)
    setItems(items)
    onChange(items)
  }

  return (
    <>
      <div>
        {items.map((item, index) => (
          <SelectedItem key={index} onClick={() => removeItem(index)}>{item}</SelectedItem>
        ))}
        <input type="text" ref={inputRef} onKeyDown={handleKeyDown} />
      </div>
    </>
  )
}
