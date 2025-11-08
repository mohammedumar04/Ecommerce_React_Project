import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users)
  
  
  return (
    <nav className="flex justify-center gap-20 items-center text-2xl">
      <NavLink to={"/"}>Home</NavLink>

      {user?.isAdmin ? (
        <>
          <NavLink to={"/admin/create-products"}>Create Products</NavLink>
        </>
      ):
      <></>
      }
      {user ?
          (
            <>
              <NavLink to={"/cart"}>Cart</NavLink>
              <NavLink to={"/user-profile"}>Settings</NavLink>
            </>
          )
        :
          (
            <>
              <NavLink to={"/login"}>Login</NavLink>
            </>
          )
        }
    </nav>
  )
}

export default Nav