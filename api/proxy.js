export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send("URL parameter is missing");

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer': url,
                'Origin': new URL(url).origin
            }
        });

        const data = await response.arrayBuffer();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/vnd.apple.mpegurl');
        
        res.send(Buffer.from(data));
    } catch (error) {
        res.status(500).send("Proxy error: " + error.message);
    }
}
