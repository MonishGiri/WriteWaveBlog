import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () =>{
        authService.logout()
        .then(() =>{
          dispatch(logout());
          navigate("/",{replace: true});
        })
    }
  return (
    <button onClick={logoutHandler} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
  )
}

export default LogoutBtn