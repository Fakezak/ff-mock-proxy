from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

proxy_ip = None
proxy_port = None
connected_clients = []

@app.route('/activate', methods=['POST'])
def activate_proxy():
    global proxy_ip, proxy_port
    proxy_ip = f"192.168.{random.randint(0,255)}.{random.randint(0,255)}"
    proxy_port = random.randint(1000, 9999)
    return jsonify({"ip": proxy_ip, "port": proxy_port, "status": "Proxy activated"})

@app.route('/connect', methods=['POST'])
def connect_client():
    global connected_clients
    data = request.json
    ip = data.get("ip")
    port = data.get("port")

    if ip == proxy_ip and port == proxy_port:
        connected_clients.append({"ip": ip, "port": port})
        return jsonify({"status": "Connected to MockeX Proxy"})
    else:
        return jsonify({"error": "Wrong IP or Port"}), 400

@app.route('/status', methods=['GET'])
def status():
    return jsonify({
        "proxy_ip": proxy_ip,
        "proxy_port": proxy_port,
        "clients": connected_clients
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
