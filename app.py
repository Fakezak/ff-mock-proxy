from flask import Flask, request, jsonify
from flask_cors import CORS
import random, threading

app = Flask(__name__)
CORS(app)

proxy_active = False
proxy_ip = ""
proxy_port = 0
uid_status = {}  # { uid : "locked" / "unlocked" }

def deactivate_proxy():
    global proxy_active
    proxy_active = False

@app.route('/activate', methods=['POST'])
def activate_proxy():
    global proxy_active, proxy_ip, proxy_port
    proxy_active = True
    proxy_ip = f"192.168.{random.randint(0,255)}.{random.randint(0,255)}"
    proxy_port = random.randint(1000,9999)
    
    # deactivate after 1 hour
    timer = threading.Timer(3600, deactivate_proxy)
    timer.start()
    
    return jsonify({
        "ip": proxy_ip,
        "port": proxy_port,
        "status": "Proxy activated for 1 hour"
    })

@app.route('/save-uid', methods=['POST'])
def save_uid():
    uid = request.json.get("uid")
    if not uid:
        return jsonify({"error": "UID required"}), 400
    uid_status[uid] = "unlocked"
    return jsonify({"status": f"UID {uid} unlocked"})

@app.route('/login', methods=['POST'])
def login():
    uid = request.json.get("uid")
    if not proxy_active:
        return jsonify({"error": "Proxy not active"})
    status = uid_status.get(uid, "locked")
    if status == "unlocked":
        return jsonify({"status": "Login successful"})
    return jsonify({"error": "UID locked"})

@app.route('/status', methods=['GET'])
def status():
    return jsonify({
        "proxy_active": proxy_active,
        "ip": proxy_ip,
        "port": proxy_port,
        "uids": uid_status
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
