export const controller = new AbortController()

type Response = { status: number, message: string, error: string, data: {} }

type Props = (
    url:string,
    method?: 'GET'|'POST'|'PATCH'|'PUT'|'DELETE',
    body?:{},
) => Promise<Response>

export const Fetcher:Props = async (url, method = 'GET', body ) => {

  const { signal } = controller
  const token = localStorage.getItem("token")
    
  const headers:any = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  /** 
   * If there's no token in the cache
   * Remove the auth header 
   * */
  if(token)
  headers.Authorization = `Bearer ${token}`

  const response = await fetch(
    url, 
    {
        headers,
        method,
        signal,
        body:JSON.stringify(body),
    }
  );

  return response.json()
};
