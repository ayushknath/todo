import AuthButton from "./AuthButton.jsx";

function Header({
  isAuthUIShown,
  isUserSignedIn,
  onClickSignout,
  onClickAuthUI,
}) {
  return (
    <header>
      <h1>To Do List</h1>
      <AuthButton
        isAuthUIShown={isAuthUIShown}
        isUserSignedIn={isUserSignedIn}
        onClickSignout={onClickSignout}
        onClickAuthUI={onClickAuthUI}
      />
    </header>
  );
}

export default Header;
