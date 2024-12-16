import AuthUIClose from "./AuthUIClose.jsx";
import GoogleAuth from "./GoogleAuth.jsx";
import MicrosoftAuth from "./MicrosoftAuth.jsx";

function AuthUI({ onClickAuthUI, onClickGoogle }) {
  return (
    <div className="auth-ui">
      <header className="auth-ui-header">
        <AuthUIClose onClickAuthUI={onClickAuthUI} />
      </header>
      <div className="signin-ui">
        <ul className="third-party-providers-list">
          <li>
            <GoogleAuth onClickGoogle={onClickGoogle} />
          </li>
          <li>
            <MicrosoftAuth />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AuthUI;
