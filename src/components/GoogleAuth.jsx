import googleLogo from "../assets/google.png";

function GoogleAuth({ onClickGoogle }) {
  return (
    <button className="google-button" onClick={onClickGoogle}>
      <img src={googleLogo} alt="Google signin logo" />
      <span>Sign in with Google</span>
    </button>
  );
}

export default GoogleAuth;
