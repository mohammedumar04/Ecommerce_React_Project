import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import {nanoid} from "nanoid"
import { asyncRegisterUsers } from "../store/actions/userActions"
import {useDispatch} from "react-redux"


const Register = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const RegisterHandler = (user) => {
    user.id = nanoid()
    user.isAdmin = false
    user.cart = []
    dispatch(asyncRegisterUsers(user))
    navigate("/login")
    reset()
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-white/10 p-12 rounded">
        <h1 className="text-3xl font-bold uppercase mb-10 text-center">Register</h1>
        <form onSubmit={handleSubmit(RegisterHandler)}  className="flex flex-col">
          <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("username")} placeholder="Full Name" />
          <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("email")} placeholder="ex: jack77@gmail.com" />
          <input className="text-xl border-b outline-0  mb-6 p-1" type="password" {...register("password")} placeholder ="Password" />
          <button className="text-xl px-4 py-2 bg-blue-400 rounded mb-2">Register</button>
          <p>Already have an account? <NavLink className="text-blue-300" to={"/login"}>Login</NavLink></p>
        </form>
      </div>
    </div>
  )
}

export default Register
