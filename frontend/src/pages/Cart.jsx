import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { asyncUpdateUser } from "../store/actions/userActions"

const Cart = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userReducer.users)
  const cart = users?.cart ?? []

  const IncreamentQuantityHandler = (index) => {
    const copyuser = { ...users, cart: [...users.cart] }
    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser))
  }

  const DecreamentQuantityHandler = (index) => {
    const copyuser = { ...users, cart: [...users.cart] }

    if (copyuser.cart[index].quantity > 1) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1
      }
    } else {
      copyuser.cart.splice(index, 1)
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[55vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Your cart
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Nothing here just yet.
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Find something you love and it&apos;ll show up here.
        </p>
        <Link
          to="/"
          className="mt-7 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Explore the shop
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Your selection
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Shopping cart
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <article
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
              key={item.product.id}
            >
              <img
                className="h-28 w-full rounded-xl bg-slate-50 object-contain p-3 sm:h-24 sm:w-24"
                src={item.product.image}
                alt={item.product.title}
              />
              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-2 font-medium text-slate-900">
                  {item.product.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  ₹ {item.product.price}
                </p>
              </div>
              <div className="flex items-center gap-4 self-start rounded-full border border-slate-200 px-2 py-1 sm:self-center">
                <button
                  aria-label={`Decrease quantity of ${item.product.title}`}
                  className="h-8 w-8 rounded-full text-slate-600 transition-colors hover:bg-slate-100"
                  onClick={() => DecreamentQuantityHandler(index)}
                >
                  −
                </button>
                <span className="min-w-4 text-center text-sm font-medium text-slate-800">
                  {item.quantity}
                </span>
                <button
                  aria-label={`Increase quantity of ${item.product.title}`}
                  className="h-8 w-8 rounded-full text-slate-600 transition-colors hover:bg-slate-100"
                  onClick={() => IncreamentQuantityHandler(index)}
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-sm text-slate-500">Subtotal</span>
            <span className="text-lg font-semibold text-slate-950">
              ₹ {total.toFixed(2)}
            </span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Shipping and taxes are calculated at checkout.
          </p>
          <Link
            to="/"
            className="mt-6 block w-full rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Cart
