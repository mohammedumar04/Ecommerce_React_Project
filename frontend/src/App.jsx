import { useEffect } from "react"
import Nav from "./components/Nav"
import Mainroutes from "./routes/Mainroutes"
import { asyncCurrentUsers } from "./store/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { asyncLoadProduct } from "./store/actions/productActions"

const App = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.userReducer)
  const { products } = useSelector((state) => state.productReducer)

  useEffect(() => {
    !users && dispatch(asyncCurrentUsers())
  }, [users])

  useEffect(() => {
    products.length == 0 && dispatch(asyncLoadProduct())
  }, [products])

  return (
    <div className="w-screen h-screen p-10 bg-gray-800 text-white ">
      <Nav />
      <Mainroutes />
    </div>
  )
}

export default App
