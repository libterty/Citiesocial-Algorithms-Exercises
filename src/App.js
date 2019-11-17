import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import uuid from 'uuid/v4'
import fib from './Fib.js';
import "./App.css";

function App() {
  const [number, setNumber]= useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (isSubmit) {
      const num = number.split(" ").map(i => +i);
      const res = fib(num);
      setResult(res);
      setIsSubmit(false);
    }
  }, [isSubmit, number])

  const updateNum = e => {
    const num = e.target.value;
    setNumber(num);
  }

  return (
    <div className="App container">
      <Form>
        <FormGroup>
          <Label for="randomNum">請輸入你像要的數字(小提醒：每個數字間要空格喔！)</Label>
          <Input
            type="text"
            value={number}
            onChange={updateNum}
            id="randomNum"
          />
          <FormFeedback>
            {
              result.map(r => {
                return (
                  <small key={uuid()}>{r} ,</small>
                )
              })
            }
          </FormFeedback>
          <FormText>請輸入數字喔！！ (請注意每個數字間需要空格）</FormText>
        </FormGroup>
        <Button 
          onClick={e => {
            e.preventDefault();
            if (!e.target.checkValidity()) {
              e.stopPropagation();
            } else {
              setIsSubmit(true);
            }
          }}
        >
          Submit
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            setNumber('');
          }}
        >
          RESET
        </Button>
      </Form>
    </div>
  );
}

export default App;
