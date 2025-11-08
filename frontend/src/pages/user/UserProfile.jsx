import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { asyncDeleteUser, asyncLogOutUser, asyncUpdateUser } from "../../store/actions/userActions"
import { useForm } from "react-hook-form"

const UserProfile = () => {
    const users = useSelector((state)=>state.userReducer.users)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogoutHandler = () => {
    dispatch(asyncLogOutUser())
    navigate("/login")
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      "username": users?.username,
      "email": users?.email,
      "password": users?.password,
    }
  })

  const UserDetailsHandler = (user) => {
    dispatch(asyncUpdateUser(users.id, user))
  }

  const DeleteHandler = () => {
    dispatch(asyncDeleteUser(users.id))
    navigate("/login")

  }

  return (
    <div>
      <div className="w-[35%] h-full flex flex-col justify-col ">
        <div className="bg-white/10 p-8 rounded mb-10 mt-10">
          <h1 className="text-3xl font-bold uppercase mb-6 text-center w-[50%]">Update Product</h1>
          <form onSubmit={handleSubmit(UserDetailsHandler)} className="flex flex-col">
            <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("username")} placeholder="username" />
            <input className="text-xl border-b outline-0  mb-6 p-1" type="email" {...register("email")} placeholder="name@gmail.com" />
            <input className="text-xl border-b outline-0  mb-6 p-1" type="password" {...register("password")} placeholder="password)" />
            <button className="text-xl px-4 py-2 bg-blue-400 rounded mb-5">Update User</button>
          </form>
          <button onClick={LogoutHandler} className="text-xl px-4 py-2 bg-red-400 rounded">Logout</button>
        </div>
          <button onClick={DeleteHandler} className="text-xl px-4 py-2 bg-red-400 rounded mr-8">Delete User</button>
      </div>
    </div>
  )
}

export default UserProfile

