
export function jsonPost(input: RequestInfo | URL, body: any): Promise<Response>{
    return fetch(input, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
}