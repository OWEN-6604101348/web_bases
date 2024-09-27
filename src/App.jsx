
import { useState } from 'react';
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  // สร้างตะกร้า
  const [cart, setCart] = useState([]);

  function addToCart(prd) {
    // เพิ่มรายการสินค้าในตะกร้า
    setCart([...cart, prd]); 
  }
  
  return (
    <article>
      <h1>เเมลงทอดบ้านหนองมน</h1>
      {cart.map((product) => (
      <p key={product.id}>{product.name}</p>
    ))}
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
              onClick={() => addToCart(person)}
            />
            <p>
              <b>{person.name}</b>
              {' ' + person.rate + ' '}
              Price {person.price}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}