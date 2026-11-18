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

  const { register, handleSubmit } = useForm({
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
    <section className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Your account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Profile settings
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Update your account details and preferences.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-lg font-semibold text-indigo-700">
            {users?.username?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-slate-900">{users?.username}</p>
            <p className="mt-1 text-sm text-slate-500">{users?.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(UserDetailsHandler)} className="space-y-5">
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Full name
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              type="text"
              autoComplete="name"
              {...register("username")}
              placeholder="Your name"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Email
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder="you@example.com"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Password
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              placeholder="Your password"
            />
          </label>
          <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
            <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              Save changes
            </button>
            <button
              type="button"
              onClick={LogoutHandler}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={DeleteHandler}
              className="rounded-full border border-rose-200 px-5 py-3 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50"
            >
              Delete account
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UserProfile

