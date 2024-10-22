const Logout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <>
      <button className="absolute left-0 top-0" type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
