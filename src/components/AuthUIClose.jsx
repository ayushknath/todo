import closeIcon from "../assets/close.png";

function AuthUIClose({ onClickAuthUI }) {
  return (
    <button className="close-popup" onClick={onClickAuthUI}>
      <img src={closeIcon} alt="Close icon" />
    </button>
  );
}

export default AuthUIClose;
