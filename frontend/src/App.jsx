import { Suspense, useEffect } from "react"
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Nav />
        <main className="py-8 sm:py-12">
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
                Loading your shop...
              </div>
            }
          >
            <Mainroutes />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default App
