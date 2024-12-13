import closeIcon from "../assets/img/close.png";
import googleLogo from "../assets/img/google.png";
import microsoftLogo from "../assets/img/microsoft.png";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "./firebase.js";

const root = document.querySelector("#root");
const authButtons = document.querySelector("[data-auth-buttons]");
const signinButton = document.querySelector("[data-signin-button]");

signinButton.addEventListener("click", handleSignin);

function handleSignin() {
  console.log("signing in");

  displaySigninUI();
}

async function handleSignout() {
  console.log("signing out");

  try {
    await signOut(auth);
    console.log("user signed out");
  } catch (error) {
    console.log(error);
  }
}

function displaySigninUI() {
  root.appendChild(signinUI());
}

function signinUI() {
  const authUIDiv = document.createElement("div");

  authUIDiv.classList.add("auth-ui");
  authUIDiv.setAttribute("data-auth-ui", "");
  authUIDiv.innerHTML = `
    <header class="auth-ui-header">
      <button class="close-popup" data-close-popup>
        <img src=${closeIcon} alt="Close icon" />
      </button>
    </header>

    <!-- Signin UI -->
    <div class="signin-ui">
      <ul class="third-party-providers-list">
        <li>
          <button class="google-button" data-google-signin>
            <img src=${googleLogo} alt="Google signin logo" />
            <span>Sign in with Google</span>
          </button>
        </li>
        <li>
          <button class="microsoft-button" data-microsoft-signin>
            <img
              src=${microsoftLogo}
              alt="Microsoft signin logo"
            />
            <span>Sign in with Microsoft</span>
          </button>
        </li>
      </ul>
    </div>
  `;

  authUIDiv
    .querySelector("[data-close-popup]")
    .addEventListener("click", closeSigninScreen);

  authUIDiv
    .querySelector("[data-google-signin]")
    .addEventListener("click", googleSignin);

  return authUIDiv;
}

function closeSigninScreen(e = null) {
  console.log("closing popup");

  let authUIDiv;

  if (!e) {
    authUIDiv = document.querySelector("[data-auth-ui]");
    if (authUIDiv) authUIDiv.remove();
    return;
  }

  if (e.target.tagName === "BUTTON") {
    authUIDiv = e.target.parentElement.parentElement;
  } else if (e.target.tagName === "IMG") {
    authUIDiv = e.target.parentElement.parentElement.parentElement;
  }

  authUIDiv.remove();
}

// Google signin/login
async function googleSignin() {
  console.log("google signin");

  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
}

function changeAuthButton(user) {
  let authAction;
  const button = document.createElement("button");

  if (user) {
    authAction = "out";
    button.addEventListener("click", handleSignout);
  } else {
    authAction = "in";
    button.addEventListener("click", handleSignin);
  }

  button.classList.add(`sign${authAction}-button`);
  button.setAttribute(`data-sign${authAction}-button`, "");
  button.textContent = `Sign ${authAction}`;

  if (authButtons.firstElementChild) authButtons.firstElementChild.remove();

  authButtons.appendChild(button);
}

const unsubAuth = onAuthStateChanged(auth, (user) => {
  if (user) {
    closeSigninScreen();
    changeAuthButton(user);
  } else {
    changeAuthButton(user);
  }
});
