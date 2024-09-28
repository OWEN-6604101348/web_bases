import { useState } from 'react';
import { people } from './data.js';
import { getImageUrl } from './utils.js';

// Icon รถเข็นสินค้า
const CartIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2m1.6 0h9l1.6 8H6M9 21a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
    />
  </svg>
);

export default function List() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({}); // State for tracking quantities

  const addToCart = (person) => {
    const quantity = quantities[person.id] || 1; // Default to 1 if no quantity specified
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === person.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === person.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...person, quantity }];
      }
    });
    alert(`คุณได้ทำการซื้อ ${quantity} ${person.name} เรียบร้อยแล้ว!`);
    setQuantities({ ...quantities, [person.id]: 1 }); // Reset quantity input after adding to cart
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) })); // Ensure quantity is at least 1
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      return prevCart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  // Calculate total price with discounts
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const discount = totalPrice > 500 ? 100 : totalPrice > 300 ? 30 : totalPrice > 200 ? 20 : 0;
  const discountedPrice = totalPrice - discount;

  // Add shipping cost
  const shippingCost = 100;
  const finalPrice = discountedPrice + shippingCost;

  const confirmOrder = () => {
    if (cart.length === 0) {
      alert("กรุณาเพิ่มสินค้าก่อนที่จะยืนยันการสั่งซื้อ");
      return;
    }
    alert(`ยืนยันการสั่งซื้อเรียบร้อยแล้ว! ราคารวม: ${totalPrice} บาท (ส่วนลด: ${discount} บาท) ราคารวมหลังส่วนลด: ${discountedPrice} บาท + ค่าส่ง: ${shippingCost} บาท ราคารวมสุดท้าย: ${finalPrice} บาท`);
    setCart([]); // Reset cart after confirming the order
    setShowCart(false); // Optionally close the cart
  };

  return (
    <>
      {/* Navbar section */}
      <nav className="bg-gradient-to-r from-[#8B4513] to-[#B8926A] p-5 flex justify-between items-center shadow-lg transition-transform duration-300">
        <div className="flex items-center">
          <img src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/461658377_419714524493893_5704029166655112648_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Y1XGq_dN5m8Q7kNvgGvAYfZ&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=AHcac1FzdPw7PrNKMGPCcgL&oh=00_AYDesGrXw-wqXiqfE5d70mB_Z-I0eJbAAWxfsKk-iHZ9yQ&oe=66FD832E" alt="Logo" className="h-13 mr-3" />
          <h1 className="text-white text-5xl">เเมลงทอดบ้านหนองมน</h1>
        </div>
        <button 
          onClick={toggleCart} 
          className="bg-[#B8926A] text-white px-4 py-2 rounded flex items-center transition-all duration-300 transform hover:scale-105 hover:bg-[#A77B5E]"
        >
          <CartIcon isOpen={showCart} />
          <span className="ml-2">{showCart ? 'ซ่อนตะกร้า' : 'แสดงตะกร้า'}</span>
        </button>
      </nav>

      {/* Main content */}
      <article className="m-5 bg-custom-brown min-h-screen pt-10">
        <ul className="list-none grid grid-cols-3 gap-5 px-10 py-5 m-0">
          {people.map((person, index) => (
            <li
              key={person.id}
              className={`flex flex-col items-center mb-5 relative p-5 product-card
                ${index % 3 !== 2 ? 'border-r-2 border-white' : ''} 
                ${index < people.length - 3 ? 'border-b-2 border-white' : ''}  
              `}
            >
              <div
                className="relative group"
                onClick={() => addToCart(person)} 
              >
                <img
                  src={getImageUrl(person)}
                  alt={person.name}
                  className="w-52 h-52 rounded-full transition duration-300 ease-in-out transform group-hover:scale-110 group-hover:opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-8xl text-white">+</span>
                </div>
              </div>
              <p className="mt-3">
                <b>{person.name}</b>
              </p>
              <p className="mt-1">{person.rate} ⭐</p>
              <p className="mt-[-5px]">Price {person.price} บาท</p>
              <input
                type="number"
                min="1"
                value={quantities[person.id] || 1}
                onChange={(e) => handleQuantityChange(person.id, parseInt(e.target.value))}
                className="mt-2 w-16 text-center border rounded"
              />
              <button
                onClick={() => addToCart(person)} // เพิ่มสินค้าลงในตะกร้าเมื่อคลิก
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                Buy
              </button>
            </li>
          ))}
        </ul>
      </article>

      {/* Sidenav Cart section */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleCart}></div>
      <div className={`fixed top-0 left-0 h-full w-1/2 bg-gray-800 text-white p-5 transition-transform transform ${showCart ? 'translate-x-0' : '-translate-x-full'}`}>
        <a href="javascript:void(0)" className="closebtn absolute top-5 right-5 text-3xl cursor-pointer" onClick={toggleCart}>&times;</a>
        <h2 className="text-2xl text-center mb-5">ตะกร้าสินค้า:</h2>
        <ul className="list-none m-0">
          {cart.length > 0 ? (
            cart.map((product) => (
              <li key={product.id} className="flex items-center justify-between mb-2">
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="w-20 h-20 rounded-full mr-3 cursor-pointer"
                  onClick={() => removeFromCart(product.id)}
                />
                <p>{product.name} - ราคา: {product.price} บาท - จำนวน: {product.quantity}</p>
              </li>
            ))
          ) : (
            <p className="text-xl text-center">ไม่มีสินค้าภายในตะกร้า</p>
          )}
        </ul>
        <div className="text-xl font-bold p-4 text-center">
          ราคารวม: {totalPrice} บาท
          {discount > 0 && (
            <p className="text-green-500">ส่วนลด: {discount} บาท</p>
          )}
          <p className="font-bold">ค่าส่ง: {shippingCost} บาท</p>
          <p className="font-bold">ราคารวมสุดท้าย: {finalPrice} บาท</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={confirmOrder} // Call confirmOrder function when clicked
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            ยืนยันการสั่งซื้อ
          </button>
        </div>
      </div>
    </>
  );
}
