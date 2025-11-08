import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { asyncLoginUsers } from "../store/actions/userActions"
import { useDispatch, useSelector } from "react-redux"


const Login = () => {
  const { register, handleSubmit, reset } = useForm()
  const { users } = useSelector((state)=>state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LoginHandler = (user) => {
    dispatch(asyncLoginUsers(user))
    reset()
    navigate("/")

  }


  return(
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-white/8 p-12 rounded">
        <h1 className="text-3xl font-bold uppercase mb-10 text-center">Login</h1>
        <form onSubmit={handleSubmit(LoginHandler)} className="flex flex-col">
          <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("email")} placeholder="username or mail" />
          <input className="text-xl border-b outline-0  mb-6 p-1" type="password" {...register("password")} placeholder="Password" />
          <button className="text-xl px-4 py-2 bg-blue-400 rounded mb-2">Login</button>
          <p>Don't have an account? <NavLink className="text-blue-300" to={"/register"}>Register</NavLink></p>
        </form>
      </div>
    </div>
  )
}

export default Login
