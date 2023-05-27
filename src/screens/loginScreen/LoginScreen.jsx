import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthReducer from '../../redux/reducers/AuthReducer'
//import styles from "./styles.module.css"


const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState(undefined)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const response = await dispatch(AuthReducer.login(form))
    if (response.stat === true) {
      navigate("/")
    }
    else if (response.stat === false) {
      setError(response.message)
    }
    setForm({ email: "", password: "" })
  }

  const onChangeInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
      if(form.email!==""||form.password!==""){
        setError(undefined)
      }
  }, [form])

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className='40-w p-5 rounded bg-white'>
        <h3 className='text-center'>Giriş</h3>
        <div>
          <input className='form-control mb-2 mt-3' placeholder='email' type='email' name="email" value={form.email} onChange={onChangeInput} />
        </div>
        <div>
          <input className='form-control mb-2' placeholder='şifre' type='password' name="password" value={form.password} onChange={onChangeInput} />
        </div>
        <div className='d-grid mb-3'>
          <button className='btn btn-primary mt-3' onClick={handleLogin}>Giriş Yap</button>
        </div>
        <div className='text-center mb-4'>
          <label>
            Hesabın yok mu ? <Link to="/registerscreen">Kayıt ol</Link>
          </label>
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </div>

    </div>
  )
}

export default LoginScreen