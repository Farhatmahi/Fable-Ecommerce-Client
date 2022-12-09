import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import CartCard from "./CartCard";
import Loader from "../../Shared/Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";

const Cart = () => {
  const { user } = useContext(AuthContext);
  // const [cartPriceWithQuantity, setcartPriceWithQuantity] = useState(0);
  const [total, setTotal] = useState(0);


  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:1000/cartFilteredByUser?email=${user?.email}`
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log(cart);

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-8">
      <h1 className="font-semibold text-xl mb-8">Order Summary</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="">
          <div className="lg:w-1/2">
            {
              cart.map(cartItem => <div className="flex justify-between">
                <p className="text-xs">{cartItem.product_name}</p>
                <p className="text-xs font-semibold">€ {cartItem.product_price}</p>
              </div>)
            }
            <div className="flex justify-between mt-6">
              <p className="text-xs ">Summary</p>
              <p className="text-xs font-semibold">€ {total}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs">Delivery Cost</p>
              <p className="text-xs font-semibold">€ 10</p>
            </div>
            <hr className="border-black my-4"/>
            <div className="flex justify-between">
              <p className="text-xs">Subtotal</p>
              <p className="text-xs font-semibold">€ {total + 10}</p>
            </div>
          </div>
          <button className="btn bg-black text-white rounded-none mt-6">
            Make Payment
          </button>
        </div>

        <div className="">
          {cart.map((cartItem) => (
            <CartCard
              key={cartItem._id}
              cartItem={cartItem}
              // cartPriceWithQuantity={cartPriceWithQuantity}
              // setcartPriceWithQuantity={setcartPriceWithQuantity}
              setTotal={setTotal}
              total={total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
