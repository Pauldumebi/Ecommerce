import {register} from '../api';
import {getUserInfo, setUserInfo} from '../localStorage'
import {showLoading, hideLoading, showMessage, redirectUser} from '../utils'

const RegisterScreen = {
   after_render: () => {
      document.getElementById('register-form').addEventListener('submit', async (e)=> {
         e.preventDefault();
         showLoading()
         const data = await register({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
         });
         hideLoading()
         if (data.error) {
            showMessage(data.error);
         } else {
            setUserInfo(data)
           redirectUser();
         }
      });
   },
   render: () => {
      if(getUserInfo().name){
         redirectUser()
      }
      return `
      <div class="Sign-in-Screen">
         <div class="sign-in-image">
            <h1>Welcome to</h1>
            <img src="images/Johetty.jpeg">
         </div>
         <div class="separator"></div>
         <div class="form-container">
            <form id="register-form">
               <ul class="form-items">
                  <li>
                     <h1> Create Account</h1>
                  </li>
                  <li>
                     <label for="name">Name</label>
                     <input type="name" name="name" id="name">
                  </li>
                  <li>
                     <label for="email">Email</label>
                     <input type="email" name="email" id="email">
                  </li>
                  <li>
                     <label for="password">Password</label>
                     <input type="password" name="password" id="password">
                  <li>
                     <label for="repassword">Re-Enter Password</label>
                     <input type="password" name="repassword" id="repassword">
                  </li>
                  <li>
                     <button type="submit" class="Sign-in-button">Register</button>
                  </li>
                  <li>
                     <div class="create-account">
                        Already have an account? 
                        <a href="/#/signin">Sign-In</a>
                     </div>
                  </li>
               </ul>
            </form>
         </div>
      </div>
      `
   }
}
export default RegisterScreen