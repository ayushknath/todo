import microsoftLogo from "../assets/microsoft.png";

function MicrosoftAuth() {
  return (
    <button className="microsoft-button" disabled>
      <img src={microsoftLogo} alt="Microsoft signin logo" />
      <span>Sign in with Microsoft</span>
    </button>
  );
}

export default MicrosoftAuth;
