function AuthButton({
  isAuthUIShown,
  isUserSignedIn,
  onClickSignout,
  onClickAuthUI,
}) {
  return (
    <button
      className="auth-button"
      onClick={isUserSignedIn ? onClickSignout : onClickAuthUI}
      disabled={isAuthUIShown && !isUserSignedIn}
    >
      {isUserSignedIn ? "Sign out" : "Sign in"}
    </button>
  );
}

export default AuthButton;
