import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const LoginGg = () => {
  const [cookies, setCookie] = useCookies(["user_token"]);
  const navigate = useNavigate();

  const clientId =
    "757038478487-vk3ht3iqv5hplosjkse866rs8nhbfgjh.apps.googleusercontent.com";

  const onSuccess = (response) => {
    const token = response.credential;

    // Decode JWT token để lấy thông tin payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const profile = JSON.parse(jsonPayload);

    const email = profile.email;

    setCookie("user_token", token, {
      path: "/",
      exp: moment()
        .add(1, "months")
        .toDate(),
    });

    setCookie("email_token", email, {
      path: "/",
      exp: moment()
        .add(1, "months")
        .toDate(),
    });

    navigate("/");
  };

  useEffect(() => {
    if (cookies.user_token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const onFailure = (error) => {};

  return (
    <div style={{ width: "12rem", overflow: "hidden" }}>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="google-oauth-provider">
          <div className="google-login-button">
            <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginGg;
