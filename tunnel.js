const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
  try {
    fs.writeFileSync('D:/ooadcraft/tunnel_out.txt', 'Connecting to localtunnel...\n');
    console.log('Connecting localtunnel...');
    const tunnel = await localtunnel({ port: 8080, subdomain: 'ooadcraft-api' });
    const msg = `Tunnel online at: ${tunnel.url}\n`;
    console.log(msg);
    fs.appendFileSync('D:/ooadcraft/tunnel_out.txt', msg);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
      fs.appendFileSync('D:/ooadcraft/tunnel_out.txt', 'Tunnel closed\n');
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
      fs.appendFileSync('D:/ooadcraft/tunnel_out.txt', `Tunnel error: ${err.message}\n`);
    });
  } catch (e) {
    console.error('Failed to create tunnel:', e);
    fs.writeFileSync('D:/ooadcraft/tunnel_out.txt', `Failed: ${e.message}\n`);
  }
})();
