import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard/Dashboard';
import LoginScreen from './screens/loginScreen/LoginScreen';
import RegisterScreen from './screens/registerScreen/RegisterScreen';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthReducer from "./redux/reducers/AuthReducer"
import NotFoundScreen from './screens/NotFoundScreen';
import LoadingScreen from "./screens/LoadingScreen"

function App() {
  const { isLoggedIn } = useSelector((state) => state.authReducer)
  const [localStoreControl, setLocalStoreControl] = useState(false)
  const dispatch = useDispatch()
  const localStorageControl = async () => {
    const cred = localStorage.getItem("cred")
    if (cred) {
      const credMain = JSON.parse(cred)
      await dispatch(AuthReducer.login(credMain))
    }
    setLocalStoreControl(true)
  }

  useEffect(() => {
    localStorageControl()
  }, [])

  return (
      localStoreControl
      ?
      <Routes>
        <Route path="/" element={isLoggedIn?<Dashboard />:<LoginScreen />} />
        <Route path="/registerscreen" element={isLoggedIn?<Dashboard />:<RegisterScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      :
      <LoadingScreen />
  );
}

export default App;
