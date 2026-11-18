import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { asyncLoginUsers } from "../store/actions/userActions"
import { useDispatch } from "react-redux"

const Login = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LoginHandler = (user) => {
    dispatch(asyncLoginUsers(user))
    reset()
    navigate("/")
  }

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Pick up right where you left off.
        </p>
        <form onSubmit={handleSubmit(LoginHandler)} className="mt-8 flex flex-col gap-5">
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
              autoComplete="current-password"
              {...register("password")}
              placeholder="Your password"
            />
          </label>
          <button className="mt-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <NavLink className="font-medium text-indigo-700 hover:text-indigo-900" to="/register">
            Create an account
          </NavLink>
        </p>
      </div>
    </section>
  )
}

export default Login
