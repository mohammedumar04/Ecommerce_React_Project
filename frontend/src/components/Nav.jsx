import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users)

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`

  return (
    <header className="flex flex-col gap-5 border-b border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="w-fit text-xl font-semibold tracking-tight text-slate-900">
        shop<span className="text-indigo-600">.</span>
      </Link>
      <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1">
        <NavLink to="/" end className={linkClass}>
          Shop
        </NavLink>
        {user?.isAdmin && (
          <NavLink to="/admin/create-products" className={linkClass}>
            Create
          </NavLink>
        )}
        {user ? (
          <>
            <NavLink to="/cart" className={linkClass}>
              Cart
            </NavLink>
            <NavLink to="/user-profile" className={linkClass}>
              Account
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>
            Sign in
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Nav