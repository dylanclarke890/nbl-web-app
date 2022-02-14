import React, { useState } from "react";
import {format} from "date-fns";
import './appointment-picker.css';

export default function AppointmentPicker({setShowModal, availableTimes, date }) {
  const times = [];
  for (let i = 0; i < availableTimes.length; i++) {
    const element = availableTimes[i];
    times.push(
      <div className="time-slot" key={i}>
        {element}
      </div>
    );
  }

  const [inputValidation, setInputValidation] = useState({
    general: "",
    name: "",
    email: "",
    number: ""
  })
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [nameActive, setNameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [numberActive, setNumberActive] = useState(false);

  const updateName = (n) => {
    setNameActive(n);
    setName(n);
  }

  const isNumber = (n) => {
    const nums = [0,1,2,3,4,5,6,7,8,9];
    console.log(nums.includes(n))
    return nums.includes(parseInt(n));
  }

  const handleNumberKeyPress = (e) => {
    if (e.key !== '+' && !isNumber(e.key)) {
      e.preventDefault();
    }
  }

  const updateNumber = (n) => {
    setNumberActive(n);
    setNumber(n);
  }
  const updateEmail = (n) => {
    setEmailActive(n);
    setEmail(n);
  }

  const validateEmail = (email) => {
   if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      return (false)
  }
  const validateNumber = (num) => {
    const allNums = (val) => /^\d+$/.test(val);

    if (!(num[0] === '0' && allNums(num)) || (num[0] === '+' && allNums(num.substring(1, num.length)))) {
      return false;
    }

    // 07946792581
    // +447946792581
    if (num[0] === '0' && num.length !== 11) {
      return false;
    }

    if (num[0] === '+' && num.length !== 13) {
      return false;
    }

    return true;
  }

  const validate = () => {
    let error = false;
    if (!name) {
      setInputValidation(inputValidation => ({...inputValidation, name:"Must provide a name. (3 - 30 characters)."}));
      error = true;
    } else if (name < 3) {
      setInputValidation(inputValidation => ({...inputValidation, name:"Name must be between 3 and 30 characters."}));
    }
    else {
      setInputValidation(inputValidation => ({...inputValidation, name:""}));
    }

    if (email && !validateEmail(email)) {
      setInputValidation(inputValidation => ({...inputValidation, email:"Must provide a valid email address."}));
      error = true
    } else {
      setInputValidation(inputValidation => ({...inputValidation, email:""}));
    }

    if (number && !validateNumber(number)) {
      setInputValidation(inputValidation => ({...inputValidation, number:"Must provide a valid number."}));
      error = true
    } else {
      setInputValidation(inputValidation => ({...inputValidation, number:""}));
    }

    if (!email) {
      setInputValidation(inputValidation => ({...inputValidation, email:"Must provide an email address."}));
      error = true
    }

    if (!number){
      setInputValidation(inputValidation => ({...inputValidation, number:"Must provide a phone number."}));
      error = true
    }
    if (error) {
      return false;
    }
    return true;
  }

  const submit = () => {
    if (!validate()) {
      return;
    }
  };
  const dateFormat = "eee dd MMM yyyy";

  return (
    <div className="w-100">
      <header className="booker-header">
        <p className="text-center title">{format(date, dateFormat)}</p>
        <br/>
        <p className="text-left-padded title">Select a time:</p>
      </header>
      <div className="appointment-booker">
        <div className="available-times">{times}</div>
        <div className="appointment-form">
        <div className="custom-field">
          <input id="name-field" type="text" placeholder="&nbsp;" onChange={e => updateName(e.currentTarget.value)}/> 
          <label htmlFor="name-field" className={nameActive ? 'placeholder has-content' : 'placeholder'}>Enter Name</label>
          <span className="error-message" aria-live="polite">{inputValidation.name}</span>
        </div>
        <div className="custom-field">
          <input id="phone-field" type="text" placeholder="&nbsp;" onKeyPress={handleNumberKeyPress} onChange={e => updateNumber(e.currentTarget.value)}/> 
          <label htmlFor="phone-field" className={numberActive ? 'placeholder has-content' : 'placeholder'}>Enter Number</label>
          <span className="error-message" aria-live="polite">{inputValidation.number}</span>
        </div>
        <div className="custom-field">
          <input id="email-field" type="text" placeholder="&nbsp;" onChange={e => updateEmail(e.currentTarget.value)}/> 
          <label htmlFor="email-field" className={emailActive ? 'placeholder has-content' : 'placeholder'}>Enter Email</label>
          <span className="error-message" aria-live="polite">{inputValidation.email}</span>
        </div>
          <br/>
          <button className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn float-right" onClick={() => submit()}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
