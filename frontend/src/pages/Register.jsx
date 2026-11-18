import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"
import { asyncRegisterUsers } from "../store/actions/userActions"
import { useDispatch } from "react-redux"

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
    <section className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Join the shop
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          A few details and you&apos;re all set.
        </p>
        <form onSubmit={handleSubmit(RegisterHandler)} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Full name
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              type="text"
              autoComplete="name"
              {...register("username")}
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Password
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              placeholder="Create a password"
            />
          </label>
          <button className="mt-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <NavLink className="font-medium text-indigo-700 hover:text-indigo-900" to="/login">
            Sign in
          </NavLink>
        </p>
      </div>
    </section>
  )
}

export default Register
