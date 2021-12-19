const putData = async (url, payload) => {
  let baseUrl = "";
  if (window.location.hostname === "localhost") {
    baseUrl = "http://localhost:5000";
  }
  let res = await fetch(baseUrl + url, {
    method: "PUT",
    headers: {
    //   Authorization: "Bearer " + cognitoUser.signInUserSession.idToken.jwtToken,
      "Permissions-Policy": "interest-cohort=()",
      "Content-Type": "application/json",
    },
    body: payload,
  });
  const json = await res.json();
  if (res.status >= 200 && res.status <= 299) {
    return json;
  } else {
    console.log(res.status, json);
    throw json;
  }
};

export default putData;
