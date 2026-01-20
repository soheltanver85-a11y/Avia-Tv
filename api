export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send("URL parameter is missing");

    try {
        const response = await fetch(url);
        const data = await response.arrayBuffer();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
        
        res.send(Buffer.from(data));
    } catch (error) {
        res.status(500).send("Proxy error: " + error.message);
    }
}

