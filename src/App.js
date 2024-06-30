import './App.css';
import { useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
    country: '',
   
  })

  const [formError, setFormError] = useState({})

  const onChangeHandler = (event) => {

    console.log(event)
   
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    
  }

  const validateForm = () => {
    let err = {}

    if (formData.username === '') {
      err.username = 'Username required!'
    }
    if (formData.email === '') {
      err.email = 'Email required!'
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(formData.email)) {
        err.email = 'Email not valid!'
      }
    }

    if (formData.password === '' || formData.cpassword === '') {
      err.password = 'Password and Confirm Password required!'
    } else {
      if (formData.password !== formData.cpassword) {
        err.password = 'Password not matched!'
      } else {
        if (formData.password.length < 6) {
          err.password = 'Password should greater than 6 characters!'
        }
      }
    }

    if (formData.country === '') {
      err.country = 'country required!'
    }
    

    setFormError({ ...err })

    return Object.keys(err).length < 1;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log("Form Data:", formData)
    let isValid = validateForm()

    if (isValid) {
      alert('Submitted')
      //API call to server
    } else {
      alert('In-Valid Form')
    }
    console.log(isValid)
  }
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">User Name</label>
          <input className="form-control" name="username" onChange={onChangeHandler} value={formData.username} />
          <span className='non-valid'>{formError.username}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input className="form-control" name="email" onChange={onChangeHandler} value={formData.email} />
          <span className='non-valid'>{formError.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input className="form-control" name="password" onChange={onChangeHandler} value={formData.password} />
          <span className='non-valid'>{formError.password}</span>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input className="form-control" name="cpassword" onChange={onChangeHandler} value={formData.cpassword} />
        </div>
        <div className="form-group">
          <label htmlFor="country" className="form-label">Country</label>
          <select className="form-select" name="country" onChange={onChangeHandler} value={formData.country}>
            <option value=""></option>
            <option value="student">India</option>
            <option value="employee">Nepal</option>
            <option value="other">Other</option>
          </select>
          <span className='non-valid'>{formError.country}</span>
        </div>
        
        <div className="form-group">
          <button className="btn" type="submit" >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
