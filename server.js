const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let db = JSON.parse(fs.readFileSync('./db.json','utf8'));

// Activate UID and start 2-hour session
app.post('/activate', (req,res)=>{
    const { uid } = req.body;
    if(!uid) return res.status(400).json({error:'UID required'});

    let user = db.users.find(u=>u.uid===uid);
    if(!user){
        user = { uid, activeUntil:null, vip:false };
        db.users.push(user);
    }

    const now = Date.now();
    user.activeUntil = now + 2*60*60*1000; // 2 hours
    fs.writeFileSync('./db.json',JSON.stringify(db,null,2));
    res.json({message:'Dashboard activated', activeUntil:user.activeUntil, proxyIP:'192.168.1.100', proxyPort:8080});
});

// Get dashboard info
app.get('/dashboard/:uid',(req,res)=>{
    const user = db.users.find(u=>u.uid===req.params.uid);
    if(!user) return res.status(404).json({error:'UID not found'});

    const now = Date.now();
    const active = user.activeUntil && user.activeUntil>now;

    res.json({
        uid: user.uid,
        vip: user.vip,
        active,
        items:{
            diamonds:9999,
            bundles:['Dragon Set','Cyber Ninja'],
            emotes:['Dance 1','Victory Pose'],
            skins:['AK-47 Fire','UMP Shadow']
        },
        proxyIP:'192.168.1.100',
        proxyPort:8080
    });
});

// Simulate IP/Port usage without UID
app.get('/use-proxy/:uid?',(req,res)=>{
    const uid = req.params.uid;
    if(!uid) return res.json({error:'UID [UNKNOWN] is locked'});

    const user = db.users.find(u=>u.uid===uid);
    if(!user) return res.json({error:`UID [${uid}] is locked`});

    res.json({message:`Proxy active for UID [${uid}]`});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Backend running on port ${PORT}`));