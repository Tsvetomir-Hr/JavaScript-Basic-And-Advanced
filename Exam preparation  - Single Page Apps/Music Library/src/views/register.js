import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import * as userService from '../api/users.js';

const registerTemplate = (onSubmit) => html`
        <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}
async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are reqiered!'); 
    }
    if (data.password != data['re-password']) {
        return alert('Passwords don\'t match!');
    }
    await userService.register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/catalog');
}