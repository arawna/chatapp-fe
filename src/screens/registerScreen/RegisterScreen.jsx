import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import styles from "./styles.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import AuthReducer from '../../redux/reducers/AuthReducer'

const RegisterScreen = () => {
  const [form, setForm] = useState({ email: "", password: "", name: "" })
  const [error, setError] = useState(undefined)
  const dispatch=useDispatch()
  const navigate = useNavigate()

  const handleRegister = async () => {
    const response=await dispatch(AuthReducer.register(form))
    if (response.stat === true) {
      navigate("/")
    }
    else if (response.stat === false) {
      setError(response.message)
    }

    setForm({ email: "", password: "", name: "" })
  }

  const onChangeInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if(form.email!==""||form.password!==""||form.name!==""){
      setError(undefined)
    }
}, [form])

  return (
    <div className="signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className='40-w p-5 rounded bg-white'>
        <h3 className='text-center'>Kayıt</h3>
        <div>
          <input className='form-control mb-2 mt-3' placeholder='isim' type='text' name="name" value={form.name} onChange={onChangeInput} />
        </div>
        <div>
          <input className='form-control mb-2' placeholder='email' type='email' name="email" value={form.email} onChange={onChangeInput} />
        </div>
        <div>
          <input className='form-control mb-2' placeholder='şifre' type='password' name="password" value={form.password} onChange={onChangeInput} />
        </div>
        <div className='d-grid mb-3'>
          <button className='btn btn-primary mt-3' onClick={handleRegister}>Kayıt Ol</button>
        </div>
        <div className='text-center mb-4'>
          <label>
            Zaten bir hesabın var mı ? <Link to="/">Giriş yap</Link>
          </label>
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </div>
    </div>
  )
}

export default RegisterScreen