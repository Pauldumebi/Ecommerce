import axios from 'axios';
import Rating from '../components/Rating';
import {showLoading, hideLoading} from '../utils'

const HomeScreen = {
   render: async () => {
      showLoading()
      const response = await axios({
         url: 'http://localhost:5000/api/products',
         headers: { 'Content-type': 'application.json' },
      });
      hideLoading()
      if (!response || response.statusText !== 'OK') {
         return '<div>Error in getting data</div>';
      }
      const products = response.data;

      return `
      <ul class="products">
      ${products.map(
         (product) => `
         <li>
            <div class="product">
               <a href="/#/product/${product._id}">
                  <img src=${product.image} alt="product-${product._id}">
                  <div class="product-name">
                     <p>
                        ${product.name}
                     </p>
                  </div>
                  <div class="product-rating">
                     ${Rating.render({value: product.rating, text: `${product.numReviews} reviews`, })}
                  </div>
                  <div class="product-price">
                     ‎₦${product.price}
                  </div>
               </a>
                  <div><button id="cart-button" class="add-button">Add to cart</button></div>
            </div>
            
         </li>`,
      ).join('')}
      </ul>
      `;
   },
};

export default HomeScreen;
