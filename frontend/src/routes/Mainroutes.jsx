import { lazy } from "react"
import {Routes,Route} from "react-router-dom"

const Home = lazy(()=> import("../pages/Home"))
const Login = lazy(()=> import("../pages/Login"))
const Register = lazy(()=> import("../pages/Register"))
const CreateProduct = lazy(()=> import("../pages/admin/CreateProduct"))
const ProductDetails = lazy(()=> import("../pages/admin/ProductDetails"))
const UserProfile = lazy(()=> import("../pages/user/UserProfile"))
const PageNotFound = lazy(()=> import("../pages/PageNotFound"))
const Cart = lazy(()=> import("../pages/Cart"))
const AuthWrapper = lazy(()=> import("./AuthWrapper"))
const UnauthWrapper = lazy(()=> import("./UnauthWrapper"))

const Mainroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<UnauthWrapper><Login/></UnauthWrapper>}/>
        <Route path="/register" element={<UnauthWrapper><Register/></UnauthWrapper>}/>
        <Route path="/user-profile" element={<AuthWrapper><UserProfile/></AuthWrapper>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin/create-products" element={<AuthWrapper><CreateProduct/></AuthWrapper>}/>
        <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
  )
}

export default Mainroutes
