export async function AuthUser(cookies){

    const auth = await fetch(process.env.AUTH_ROUTE,{
                method: 'GET',
                credentials: 'include',
                headers: {cookies}
                
            });
    const resp = await auth.json();

    return resp
}
