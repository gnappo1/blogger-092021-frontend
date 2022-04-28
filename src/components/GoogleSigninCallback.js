import React, {useEffect} from 'react'

const GoogleSigninCallback = () => {
    useEffect(() => {
        const responseGoogle = (response) => {
            debugger
            var token = response.Zi;
            const requestOptions = {
                method: 'POST',
                headers: {
                    // 'Authorization': `Bearer ${response.Zi.accessToken}`,
                    'Content-Type': 'application/json',
                    // 'access_token': `${response.Zi.accessToken}`
                },
                body: JSON.stringify(token)
            }
            debugger
            fetch(`/api/v1/auth/google_oauth2/callback`, requestOptions)
            .then(response => {
                debugger
                    // cookies.set('accesstoken', response.headers.get('access-token'), {
                    //     expires: 7
                    // });
                    // cookies.set('client',response.headers.get('client'), {expires: 7});
                    // cookies.set('tokentype',response.headers.get('token-type'), {expires: 7});
                    // cookies.set('expiry',response.headers.get('expiry'), {expires: 7});
                    // cookies.set('uid', response.headers.get('uid'),{expires: 7});
            })
          }
          responseGoogle()
    }, [])
  return (
    <div>Working on it!</div>
  )
}

export default GoogleSigninCallback