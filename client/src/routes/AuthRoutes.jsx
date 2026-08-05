import Login from "../components/Login";
import Signup from "../components/Signup";
import OtpVerification from "../components/OtpVerification";

function AuthRoutes({
  loadingAuth,
  isLoggedIn,
  showOTP,
  pendingEmail,
  setIsLoggedIn,
  authPage,
  setAuthPage,
  setPendingEmail,
  setShowOTP,
}) {
  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
        Loading...
      </div>
    );
  }

  if (isLoggedIn) {
    return null;
  }

  if (showOTP) {
    return (
      <OtpVerification
        email={pendingEmail}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return authPage === "login" ? (
    <Login
      setIsLoggedIn={setIsLoggedIn}
      goToSignup={() => setAuthPage("signup")}
    />
  ) : (
    <Signup
      goToLogin={() => setAuthPage("login")}
      setPendingEmail={setPendingEmail}
      setShowOTP={setShowOTP}
    />
  );
}

export default AuthRoutes;