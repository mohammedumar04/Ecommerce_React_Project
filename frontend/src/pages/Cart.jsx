import { useDispatch, useSelector } from "react-redux"
import { asyncUpdateUser } from "../store/actions/userActions"

const Cart = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userReducer.users)

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


  const cartItems = users?.cart.map((c, index) => {
    return (
      <div className="flex justify-between items-center p-5 bg-gray-700/40" key={index}>
        <img className="w-[100px] h-[120px] object-contain" src={c.product.image} alt="Not found!" />
        <p className="text-2xl">{c.product.title}</p>
        <p className="text-2xl text-green-400" >₹ {c.product.price}</p>
        <div className="flex gap-8">
          <button className="text-3xl " onClick={() => DecreamentQuantityHandler(index, c)}>-</button>
          <p className="text-3xl ">{c.quantity}</p>
          <button className="text-3xl " onClick={() => IncreamentQuantityHandler(index, c)}>+</button>
        </div>
      </div>
    )
  })

  return (
    <div className="mt-10 flex flex-col gap-10">
      {cartItems}
    </div>
  )
}

export default Cart
