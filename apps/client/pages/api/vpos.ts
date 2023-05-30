export default async function handler(req, res) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);

  console.log('body', body);

  if (requestMethod === 'POST') {
    const resp = await fetch('http://localhost:8085/vpos/metodo', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await resp.json();
    console.log('response', response);

    return res.status(200).json({ resp: response });
  }
  return res.status(200).json({ message: 'Welcome to API Routes!' });
}
