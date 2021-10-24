const fetchData = async (url) => {
    let res = await fetch(url, {
      method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + cognitoUser.signInUserSession.idToken.jwtToken,
    //   },
    });
    const json = await res.json();
    if (res.status >= 200 && res.status <= 299) {
      return json;
    } else {
      console.log(res.status, json);
      throw json;
    }
  };
  
export default fetchData;