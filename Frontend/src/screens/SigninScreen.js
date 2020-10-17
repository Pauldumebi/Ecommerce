import {signin} from '../api';
import {getUserInfo, setUserInfo} from '../localStorage'
import {showLoading, hideLoading, showMessage, redirectUser} from '../utils'

const SigninScreen = {
   after_render: () => {
      document.getElementById('signin-form').addEventListener('submit', async (e)=> {
         e.preventDefault();
         showLoading()
         const data = await signin({
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
            <form id="signin-form">
               <ul class="form-items">
                  <li>
                     <h1> Sign-in</h1>
                  </li>
                  <li>
                     <label for="email">Email</label>
                     <input type="email" name="email" id="email">
                  </li>
                  <li>
                     <label for="password">Password</label>
                     <input type="password" name="password" id="password"><span class="forgot-password"><a href="/#/recoverpassword">forgot password?</a></span>
                  </li>
                  <li>
                     <button type="submit" class="Sign-in-button">SignIn</button>
                  </li>
                  <li>
                     <div class="create-account">
                        New User ? 
                        <a href="/#/register">Create your account</a>
                     </div>
                  </li>
               </ul>
            </form>
         </div>
      </div>
      `
   }
}
export default SigninScreen