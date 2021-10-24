const postData = async (url, payload) => {
  let res = await fetch(url, {
    method: "POST",
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

export default postData;
