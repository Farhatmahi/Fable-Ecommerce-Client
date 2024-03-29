import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartTotalPayment from "../../Shared/PaymentModal/CartTotalPayment";
import PaymentModal from "../../Shared/PaymentModal/PaymentModal";

const CartCard = ({
  cartItem,
  setTotal,
  setcartPriceWithQuantity,
  total,
  refetch,
}) => {
  const {
    _id,
    product_name,
    product_image,
    product_price,
    product_size,
    product_type,
  } = cartItem;

  const handleDelete = (id) => {
    fetch(`https://fable-server-farhatmahi.vercel.app/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        refetch();
      });
  };

  const [quantity, setQuantity] = useState(1);
  const productPrice = parseInt(product_price);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setTotal(total + productPrice);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotal(total - productPrice);
    }
  };

  useEffect(() => {
    setTotal(productPrice + total); //110, 110+110 =220, 220+110
  }, []);


  return (
    <div className="card card-side bg-base-100 mb-6 rounded-none">
      <figure>
        <img
          src={product_image}
          className="bg-[#F1F1EF] w-36 "
          alt="product_image"
        />
      </figure>
      <div className="card-body flex flex-col justify-between p-0 ml-4">
        <div className="">
          <h2 className="font-semibold">{product_name}</h2>

          <p className="text-xs">Kollection : {product_type}</p>
          <p className="text-xs">Product ID : {_id}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs lg:text-sm">Size : {product_size}</p>
          <p className="text-xs lg:text-sm">
            Quantity :{" "}
            <button
              onClick={handleDecrement}
              className="btn btn-xs rounded-none"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="btn btn-xs rounded-none"
            >
              +
            </button>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold">
            Price : € {product_price * quantity}
          </p>
          <p
            onClick={() => handleDelete(_id)}
            className=" cursor-pointer text-gray-400 hover:text-black hover:underline text-sm font-semibold"
          >
            Delete
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default CartCard;
