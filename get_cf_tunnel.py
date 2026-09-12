import subprocess, time, re

print("Starting cloudflared...")
proc = subprocess.Popen(
    ["D:\\ooadcraft\\cloudflared.exe", "tunnel", "--url", "http://127.0.0.1:8080"],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1
)

url = None
start_time = time.time()
while time.time() - start_time < 30:
    line = proc.stdout.readline()
    if not line:
        time.sleep(0.5)
        continue
    print("LOG:", line.strip())
    match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
    if match:
        url = match.group(0)
        print("FOUND TUNNEL URL:", url)
        with open("D:\\ooadcraft\\cf_url.txt", "w") as f:
            f.write(url)
        break

if not url:
    print("Failed to get Cloudflare tunnel URL within 30 seconds.")
