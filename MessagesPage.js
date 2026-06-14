import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft, X, Mic, MicOff, VideoOff, PhoneOff, Volume2, ImagePlus, Star, MapPin, CheckCheck, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* ─── CONVERSATIONS ─── */
const conversations = [
  { id:1, name:"Elena Papadopoulos", avatar:"https://i.pravatar.cc/150?img=47", property:"Santorini Cliffside Villa", time:"2m ago", unread:3, online:true,
    system:`You are Elena Papadopoulos, a warm passionate Greek Airbnb host of "Santorini Cliffside Villa". Reply in 1-2 short sentences. Be friendly, use occasional emojis 🌅🥂. You know: check-in 3PM lockbox code 4821, caldera views, sunset terrace, Oia village, Red Beach, Santo Winery, Lotza gyros restaurant. If guest says hi/hello greet them warmly. Always stay in character as the host.` },
  { id:2, name:"Made Wijaya", avatar:"https://i.pravatar.cc/150?img=28", property:"Bali Jungle Treehouse", time:"1h ago", unread:0, online:true,
    system:`You are Made Wijaya, spiritual friendly Balinese host of "Bali Jungle Treehouse". Reply 1-2 sentences. Warm Balinese spirit 🌺🌿. You know: check-in 2PM, jungle breakfast included, rice terrace views, Ubud temples, scooter $10/day, wifi Bali2024. If greeted, say selamat datang and be welcoming.` },
  { id:3, name:"Hans Müller", avatar:"https://i.pravatar.cc/150?img=53", property:"Swiss Alps Chalet", time:"3h ago", unread:1, online:false,
    system:`You are Hans Müller, precise professional German host of "Swiss Alps Chalet". Reply 1-2 sentences efficiently. Use ⛷️🏔️. You know: check-in 4PM, ski equipment included, fondue available, slopes nearby, wifi AlpsChalet/Schnee2024, hot tub on terrace. Reply politely even if offline note.` },
  { id:4, name:"Giulia Ferrara", avatar:"https://i.pravatar.cc/150?img=36", property:"Amalfi Coast Manor", time:"Yesterday", unread:0, online:false,
    system:`You are Giulia Ferrara, charming Italian host of "Amalfi Coast Manor". Reply 1-2 sentences with Italian warmth 🍋🌊. You know: check-in 3PM, sea-view pool, Il Pirata d'Amalfi restaurant 5min walk, limoncello welcome, ferry to Capri. Greet warmly with ciao/buongiorno.` },
  { id:5, name:"Aisha Rasheed", avatar:"https://i.pravatar.cc/150?img=31", property:"Maldives Overwater Villa", time:"2 days ago", unread:0, online:true,
    system:`You are Aisha Rasheed, luxury Maldives resort host of "Maldives Overwater Villa". Reply 1-2 sentences elegantly 🐠🌊. You know: speedboat 2PM Jetty 4, glass floor villa, infinity pool, snorkelling reef, whale sharks, breakfast+dinner included, couple spa $280. Greet guests with warmth and professionalism.` },
];

const initialMessages = {
  1:[
    {id:1,from:"host",text:"Yia sas! 🌅 Welcome! So excited to have you at the Cliffside Villa!",time:"10:00 AM",status:"read"},
    {id:2,from:"user",text:"Thank you! Can't wait to arrive. What time is check-in?",time:"10:05 AM",status:"read"},
    {id:3,from:"host",text:"Check-in is 3PM — lockbox code is 4821! The sunset from your terrace is absolutely magical 🥂",time:"10:08 AM",status:"read"},
  ],
  2:[
    {id:1,from:"host",text:"Selamat datang! Welcome to our Bali Jungle Treehouse 🌺",time:"9:00 AM",status:"read"},
    {id:2,from:"user",text:"The photos look incredible!",time:"9:30 AM",status:"read"},
    {id:3,from:"host",text:"Thank you! Breakfast with jungle views every morning 🌿 You will love it!",time:"11:00 AM",status:"read"},
  ],
  3:[
    {id:1,from:"host",text:"Guten Tag! Ski equipment arranged and ready on arrival ⛷️",time:"8:00 AM",status:"read"},
    {id:2,from:"user",text:"Perfect! What's the snow forecast?",time:"8:30 AM",status:"read"},
    {id:3,from:"host",text:"40cm fresh powder expected Thursday. Perfect conditions! 🏔️",time:"9:00 AM",status:"read"},
  ],
  4:[
    {id:1,from:"host",text:"Buongiorno! Looking forward to hosting you at the Amalfi Manor 🍋",time:"7:00 AM",status:"read"},
    {id:2,from:"user",text:"Can you recommend a restaurant?",time:"7:30 AM",status:"read"},
    {id:3,from:"host",text:"Il Pirata d'Amalfi — 5 min walk, incredible seafood pasta! 🌊",time:"8:00 AM",status:"read"},
  ],
  5:[
    {id:1,from:"host",text:"Welcome to your Maldives paradise! 🐠 Your villa is ready.",time:"6:00 AM",status:"read"},
    {id:2,from:"user",text:"Is the boat transfer confirmed?",time:"6:30 AM",status:"read"},
    {id:3,from:"host",text:"Speedboat confirmed 2PM, Malé Jetty 4. See you in paradise! 🌊",time:"7:00 AM",status:"read"},
  ],
};

const MSG_KEY = "airbnb_messages";

function loadMessages() {
  try {
    const saved = localStorage.getItem(MSG_KEY);
    return saved ? JSON.parse(saved) : initialMessages;
  } catch { return initialMessages; }
}

function saveMessages(msgs) {
  try { localStorage.setItem(MSG_KEY, JSON.stringify(msgs)); } catch {}
}
async function getAIReply(userMsg, conv, history) {
  try {
    const msgs = history.slice(-8).map(m=>({role:m.from==="user"?"user":"assistant",content:m.text}));
    msgs.push({role:"user",content:userMsg});
    const res = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:100,system:conv.system,messages:msgs})
    });
    const d = await res.json();
    return d.content?.[0]?.text?.trim()||null;
  } catch{return null;}
}

function smartFallback(msg,conv){
  const m=msg.toLowerCase();
  const id=conv.id;
  if(/\bhi\b|hello|hey|hola|ciao|namaste|howdy/.test(m))return[
    "Yia sas! 😊 Great to hear from you! How can I help with your Santorini stay?",
    "Selamat datang! 🌺 So wonderful to hear from you! How can I help?",
    "Hallo! 👋 Great to hear from you! How can I help with your Alpine stay?",
    "Ciao! 🍋 Benvenuto! What can I do for you today?",
    "Hello! 🌊 Welcome! How can I help make your Maldives stay perfect?"
  ][id-1];
  if(/check.?in|arrival|arrive|when.*come/.test(m))return["Check-in from 3PM, lockbox code 4821! 🗝️","Check-in from 2PM, key at reception 🌿","Check-in from 4PM, I'll be there to welcome you ⛷️","Check-in from 3PM, caretaker Marco has the keys 🍋","Immediate check-in upon speedboat arrival 🌊"][id-1];
  if(/wifi|password|internet|network/.test(m))return["WiFi: SantoriniVilla_5G / BlueDome2024 📶","WiFi: BaliTreehouse / Jungle2024 🌿","WiFi: AlpsChalet_Guest / Schnee2024 ⛷️","WiFi: AmalfiManor / Limone2024 🍋","WiFi: MaldivesVilla / Ocean2024 🌊"][id-1];
  if(/food|eat|restaurant|dinner|lunch/.test(m))return["Try Lotza for gyros and Santo Winery for sunset wine! 🥂","Warung Babi Guling for local food, Locavore for fine dining 🌺","Wirtschaft zum Wiesengrund for authentic Swiss fondue! 🧀","Il Pirata d'Amalfi — 5 min walk, incredible seafood! 🍋","Breakfast & dinner included at our overwater restaurant 🦞"][id-1];
  if(/honeymoon|romantic|couple|anniversary/.test(m))return["Santorini is perfect for romance! I'll arrange sunset wine on your terrace 🥂","The treehouse is incredibly romantic and secluded 🌺 Perfect for couples!","Cozy fireplace + hot tub + snow views = very romantic! ❤️","Amalfi at sunset is the most romantic place on earth! 🌊","The Maldives is the #1 honeymoon destination — your glass floor villa is magical! 🐠"][id-1];
  if(/pool|swim|beach|ocean|sea/.test(m))return["Private infinity pool overlooking the caldera! 🏊 Kamari black sand beach is 20 mins away!","Natural jungle swimming pool fed by a stream — completely private! 🌿","Hot spring nearby for a dip! ♨️ Ski slopes are the main attraction here!","Beautiful sea-view pool! 🏊 Amalfi town beach is 10 min walk — lovely!","Private infinity pool merging with the Indian Ocean 🌊 Reef snorkelling at your doorstep!"][id-1];
  if(/thank|thanks|grazie|terima/.test(m))return["My pleasure! Yamas! 🥂 See you very soon!","Sama-sama! 🌺 Bali can't wait to welcome you!","Bitte sehr! The Alps are waiting for you! ⛷️","Prego! We'll make it unforgettable! 🍋","Our absolute pleasure! See you in paradise! 🌊"][id-1];
  if(/cancel|refund|policy/.test(m))return["Free cancellation up to 7 days before check-in — after that 50% refund 😊","Free cancellation up to 5 days before arrival 🌺","14-day free cancellation for peak ski season ⛷️","Free cancellation up to 7 days before check-in 🍋","14-day cancellation policy for our luxury villa 🌊"][id-1];
  const fb=[
    ["Happy to help! 😊 What would you like to know about your Santorini stay?","Of course! The villa is ready for you — what can I help with? 🌅"],
    ["Of course! 🌺 Bali has so much magic to share — tell me more!","Happy to help! The jungle is waiting 🌿"],
    ["Certainly! What can I help you with for your Alpine stay? ⛷️","Of course! The mountains are ready for you 🏔️"],
    ["Certamente! 🍋 What can I help make perfect for your Amalfi stay?","Of course! La dolce vita awaits — how can I help? 🌊"],
    ["Of course! 🌊 Your paradise experience is our priority!","Happy to help! The Maldives is extraordinary 🐠"],
  ];
  const arr=fb[id-1];
  return arr[Math.floor(Math.random()*arr.length)];
}

/* ─── CALL MODAL ─── */
function CallModal({conv,mode,onEnd,darkMode}){
  const[state,setState]=useState("ringing");
  const[muted,setMuted]=useState(false);
  const[camOff,setCamOff]=useState(false);
  const[secs,setSecs]=useState(0);
  const timerRef=useRef(null);

  useEffect(()=>{
    const t=setTimeout(()=>setState("active"),2800);
    return()=>clearTimeout(t);
  },[]);

  useEffect(()=>{
    if(state==="active"){timerRef.current=setInterval(()=>setSecs(s=>s+1),1000);}
    return()=>clearInterval(timerRef.current);
  },[state]);

  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const end=()=>{setState("ended");setTimeout(onEnd,1000);};

  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:340,borderRadius:28,overflow:"hidden",background:mode==="video"?"#0d1520":"#0f0f1a",position:"relative"}}>

        {/* Video background */}
        {mode==="video"&&state==="active"&&!camOff&&(
          <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
            <img src={conv.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.15,transform:"scale(1.5)",filter:"blur(8px)"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.7) 100%)"}}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-65%)",textAlign:"center"}}>
              <img src={conv.avatar} alt={conv.name} style={{width:100,height:100,borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,0.3)"}}/>
            </div>
            {/* Self cam */}
            <div style={{position:"absolute",bottom:96,right:16,width:80,height:108,borderRadius:14,overflow:"hidden",border:"2px solid rgba(255,255,255,0.3)",background:"#1a2a1a"}}>
              <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>🙂</div>
            </div>
          </div>
        )}

        <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 24px 32px",minHeight:380}}>
          <div style={{position:"relative",marginBottom:16}}>
            <img src={conv.avatar} alt={conv.name} style={{width:88,height:88,borderRadius:"50%",objectFit:"cover",border:`3px solid ${state==="active"?"#22c55e":"rgba(255,255,255,0.2)"}`,boxShadow:state==="active"?"0 0 0 6px rgba(34,197,94,0.15)":"none"}}/>
            {state==="ringing"&&<div style={{position:"absolute",inset:-8,borderRadius:"50%",border:"2px solid rgba(34,197,94,0.4)",animation:"ping 1.2s ease-out infinite"}}/>}
          </div>

          <p style={{color:"#fff",fontSize:20,fontWeight:500,margin:"0 0 4px",fontFamily:"serif"}}>{conv.name}</p>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:"0 0 12px"}}>{conv.property}</p>

          {state==="ringing"&&<p style={{color:"#22c55e",fontSize:13,margin:"0 0 4px"}}>
            {mode==="video"?"📹 Connecting video call...":"📞 Calling..."}
          </p>}
          {state==="active"&&<p style={{color:"#22c55e",fontSize:14,fontFamily:"monospace",letterSpacing:2}}>{fmt(secs)}</p>}
          {state==="ended"&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>Call ended</p>}

          {state!=="ended"&&(
            <div style={{display:"flex",alignItems:"center",gap:16,marginTop:"auto",paddingTop:32}}>
              <button onClick={()=>setMuted(!muted)} style={{width:52,height:52,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:muted?"rgba(239,68,68,0.3)":"rgba(255,255,255,0.1)",fontSize:20}}>
                {muted?"🔇":"🎤"}
              </button>
              {mode==="video"&&(
                <button onClick={()=>setCamOff(!camOff)} style={{width:52,height:52,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:camOff?"rgba(239,68,68,0.3)":"rgba(255,255,255,0.1)",fontSize:20}}>
                  {camOff?"📷":"📹"}
                </button>
              )}
              <button onClick={end} style={{width:60,height:60,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"#ef4444",fontSize:22}}>
                📵
              </button>
              <button style={{width:52,height:52,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.1)",fontSize:20}}>
                🔊
              </button>
            </div>
          )}
        </div>
        <style>{`@keyframes ping{0%{transform:scale(1);opacity:1}100%{transform:scale(1.6);opacity:0}}`}</style>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function MessagesPage({darkMode}){
  const{user}=useAuth();
  const[allMsgs,setAllMsgs]=useState(()=>loadMessages());
  const[active,setActive]=useState(conversations[0]);
  const[input,setInput]=useState("");
  const[search,setSearch]=useState("");
  const[mobile,setMobile]=useState(false);
  const[typing,setTyping]=useState(false);
  const[call,setCall]=useState(null);
  const[showInfo,setShowInfo]=useState(false);
  const endRef=useRef(null);
  const inputRef=useRef(null);

  const msgs=allMsgs[active.id]||[];

  useEffect(()=>{ saveMessages(allMsgs); },[allMsgs]);
  useEffect(()=>{setTimeout(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),60);},[msgs,typing]);

  const pick=conv=>{setActive(conv);setMobile(true);setShowInfo(false);inputRef.current?.focus();};

  const send=useCallback(async()=>{
    if(!input.trim())return;
    const text=input.trim();
    setInput("");
    const ts=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
    const nm={id:Date.now(),from:"user",text,time:ts,status:"sent"};
    setAllMsgs(p=>({...p,[active.id]:[...(p[active.id]||[]),nm]}));
    setTyping(true);
    const hist=allMsgs[active.id]||[];
    const delay=600+Math.random()*800;
    let reply=await getAIReply(text,active,[...hist,nm]);
    if(!reply)reply=smartFallback(text,active);
    setTimeout(()=>{
      setTyping(false);
      const rm={id:Date.now()+1,from:"host",text:reply,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),status:"read"};
      setAllMsgs(p=>({...p,[active.id]:[...(p[active.id]||[]),rm]}));
    },delay);
  },[input,active,allMsgs]);

  const filtered=conversations.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.property.toLowerCase().includes(search.toLowerCase()));

  const bg=darkMode?"#141414":"#f5f4f0";
  const card=darkMode?"#1c1c1c":"#ffffff";
  const border=darkMode?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)";
  const txt=darkMode?"#f5f0e8":"#1a1a1a";
  const sub=darkMode?"rgba(245,240,232,0.5)":"rgba(26,26,26,0.5)";
  const bubbleBg=darkMode?"rgba(255,255,255,0.09)":"#f0eeeb";

  // Titanic pose cartoon avatar for Jiya
  const jiyaAvatar = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="40" fill="#FFE4C4"/>
  <!-- Wind effect hair left -->
  <ellipse cx="18" cy="20" rx="10" ry="6" fill="#2C1A0E" transform="rotate(-30 18 20)"/>
  <ellipse cx="22" cy="15" rx="8" ry="5" fill="#2C1A0E" transform="rotate(-20 22 15)"/>
  <!-- Hair main flowing right (titanic wind) -->
  <ellipse cx="40" cy="16" rx="18" ry="14" fill="#2C1A0E"/>
  <ellipse cx="55" cy="22" rx="14" ry="8" fill="#2C1A0E" transform="rotate(15 55 22)"/>
  <ellipse cx="62" cy="30" rx="10" ry="6" fill="#2C1A0E" transform="rotate(25 62 30)"/>
  <ellipse cx="65" cy="38" rx="8" ry="5" fill="#2C1A0E" transform="rotate(30 65 38)"/>
  <!-- Face -->
  <ellipse cx="40" cy="34" rx="14" ry="16" fill="#FFD0A0"/>
  <!-- Eyes happy -->
  <ellipse cx="34" cy="30" rx="2.5" ry="3" fill="#2C1A0E"/>
  <ellipse cx="46" cy="30" rx="2.5" ry="3" fill="#2C1A0E"/>
  <circle cx="35" cy="29" r="1" fill="white"/>
  <circle cx="47" cy="29" r="1" fill="white"/>
  <!-- Blush -->
  <ellipse cx="30" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.5"/>
  <ellipse cx="50" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.5"/>
  <!-- Smile -->
  <path d="M34 40 Q40 45 46 40" stroke="#CC6666" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <ellipse cx="40" cy="36" rx="1.5" ry="1" fill="#CC9966"/>
  <!-- Body / red outfit -->
  <path d="M26 50 Q40 46 54 50 L58 80 L22 80 Z" fill="#CC2244"/>
  <!-- Arms outstretched (titanic) -->
  <line x1="22" y1="54" x2="4" y2="46" stroke="#FFD0A0" stroke-width="5" stroke-linecap="round"/>
  <line x1="58" y1="54" x2="76" y2="46" stroke="#FFD0A0" stroke-width="5" stroke-linecap="round"/>
  <!-- Wind lines -->
  <line x1="5" y1="15" x2="20" y2="12" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="3" y1="22" x2="16" y2="20" stroke="rgba(255,255,255,0.3)" stroke-width="1" stroke-linecap="round"/>
</svg>`)}`;

  if(!user)return(
    <div style={{background:bg,minHeight:"100vh",paddingTop:96,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <p style={{color:txt,fontSize:24,marginBottom:16}}>Sign in to view messages</p>
        <Link to="/login" style={{background:"#FF385C",color:"white",padding:"10px 24px",borderRadius:24,textDecoration:"none",fontWeight:600}}>Sign In</Link>
      </div>
    </div>
  );

  return(
    <div style={{background:bg,minHeight:"100vh",paddingTop:80}}>
      {call&&<CallModal conv={active} mode={call} onEnd={()=>setCall(null)} darkMode={darkMode}/>}

      <div style={{maxWidth:1080,margin:"0 auto",padding:"16px",height:"calc(100vh - 80px)"}}>
        <div style={{display:"flex",height:"100%",borderRadius:20,overflow:"hidden",border:`1px solid ${border}`,background:card,boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>

          {/* ── SIDEBAR ── */}
          <div style={{width:300,flexShrink:0,display:mobile?"none":"flex",flexDirection:"column",borderRight:`1px solid ${border}`}}>
            {/* Sidebar header */}
            <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${border}`}}>
              <p style={{color:txt,fontSize:18,fontWeight:600,margin:"0 0 12px"}}>Messages</p>
              <div style={{position:"relative"}}>
                <Search size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:sub}}/>
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{width:"100%",paddingLeft:32,paddingRight:12,paddingTop:8,paddingBottom:8,borderRadius:12,border:`1px solid ${border}`,background:darkMode?"rgba(255,255,255,0.05)":"#f5f4f0",color:txt,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>

            {/* Conversation list */}
            <div style={{flex:1,overflowY:"auto"}}>
              {filtered.map(conv=>(
                <button key={conv.id} onClick={()=>pick(conv)}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"12px 16px",border:"none",borderBottom:`1px solid ${border}`,cursor:"pointer",textAlign:"left",
                    background:active.id===conv.id?(darkMode?"rgba(201,168,76,0.12)":"#fff9ef"):"transparent",
                    transition:"background 0.15s"}}>
                  <div style={{position:"relative",flexShrink:0}}>
                    <img src={conv.avatar} alt={conv.name} style={{width:46,height:46,borderRadius:"50%",objectFit:"cover"}}/>
                    {conv.online&&<span style={{position:"absolute",bottom:1,right:1,width:11,height:11,borderRadius:"50%",background:"#22c55e",border:"2px solid white"}}/>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                      <p style={{color:txt,fontSize:13,fontWeight:600,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.name}</p>
                      <span style={{color:sub,fontSize:11,flexShrink:0,marginLeft:4}}>{conv.time}</span>
                    </div>
                    <p style={{color:"#c9a84c",fontSize:12,margin:"0 0 2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.property}</p>
                    <p style={{color:sub,fontSize:12,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {(allMsgs[conv.id]||[]).slice(-1)[0]?.text?.slice(0,40)||""}
                    </p>
                  </div>
                  {conv.unread>0&&<span style={{background:"#FF385C",color:"white",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{conv.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* ── CHAT AREA ── */}
          <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,background:darkMode?"#181818":"white"}}>

            {/* Chat header */}
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:`1px solid ${border}`,flexShrink:0}}>
              {mobile&&(
                <button onClick={()=>setMobile(false)} style={{background:"none",border:"none",cursor:"pointer",padding:4,color:sub}}>
                  <ArrowLeft size={18}/>
                </button>
              )}
              <img src={active.avatar} alt={active.name} style={{width:38,height:38,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:txt,fontSize:14,fontWeight:600,margin:0,lineHeight:1.3}}>{active.name}</p>
                <p style={{color:"#c9a84c",fontSize:11,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{active.property}</p>
                <p style={{fontSize:10,margin:0,color:active.online?"#22c55e":sub}}>
                  {active.online?"● Online now":"● Offline"}
                </p>
              </div>

              {/* Call buttons */}
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <button onClick={()=>active.online&&setCall("audio")}
                  title={active.online?"Voice call":"Host is offline"}
                  style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${active.online?"rgba(34,197,94,0.3)":border}`,background:active.online?"rgba(34,197,94,0.08)":"transparent",cursor:active.online?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",color:active.online?"#22c55e":sub,transition:"all 0.15s"}}>
                  <Phone size={15}/>
                </button>
                <button onClick={()=>active.online&&setCall("video")}
                  title={active.online?"Video call":"Host is offline"}
                  style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${active.online?"rgba(59,130,246,0.3)":border}`,background:active.online?"rgba(59,130,246,0.08)":"transparent",cursor:active.online?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",color:active.online?"#3b82f6":sub,transition:"all 0.15s"}}>
                  <Video size={15}/>
                </button>
                <button onClick={()=>setShowInfo(!showInfo)}
                  style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${border}`,background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:sub}}>
                  <MoreVertical size={15}/>
                </button>
              </div>
            </div>

            {/* Info panel (slide-in) */}
            {showInfo&&(
              <div style={{background:darkMode?"#1e1e1e":"#fafaf8",borderBottom:`1px solid ${border}`,padding:"16px 20px",display:"flex",gap:20,alignItems:"center"}}>
                <img src={active.avatar} style={{width:56,height:56,borderRadius:14,objectFit:"cover"}}/>
                <div>
                  <p style={{color:txt,fontWeight:600,fontSize:15,margin:"0 0 4px"}}>{active.name}</p>
                  <p style={{color:"#c9a84c",fontSize:12,margin:"0 0 8px"}}>{active.property}</p>
                  <div style={{display:"flex",gap:8}}>
                    <span style={{background:"rgba(201,168,76,0.15)",color:"#c9a84c",fontSize:11,padding:"2px 10px",borderRadius:20}}>⭐ 4.97 rating</span>
                    <span style={{background:"rgba(34,197,94,0.1)",color:"#22c55e",fontSize:11,padding:"2px 10px",borderRadius:20}}>{active.online?"Online":"Offline"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:10}}>
              {msgs.map(msg=>(
                <div key={msg.id} style={{display:"flex",alignItems:"flex-end",gap:8,justifyContent:msg.from==="user"?"flex-end":"flex-start"}}>
                  {msg.from==="host"&&(
                    <img src={active.avatar} alt="" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover",flexShrink:0,marginBottom:4}}/>
                  )}
                  <div style={{maxWidth:"62%",display:"flex",flexDirection:"column",alignItems:msg.from==="user"?"flex-end":"flex-start"}}>
                    <div style={{padding:"10px 14px",borderRadius:msg.from==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",
                      background:msg.from==="user"?"#FF385C":bubbleBg,
                      color:msg.from==="user"?"white":txt,fontSize:14,lineHeight:1.5,wordBreak:"break-word"}}>
                      {msg.text}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:4,marginTop:3,padding:"0 2px"}}>
                      <span style={{color:sub,fontSize:10}}>{msg.time}</span>
                      {msg.from==="user"&&<CheckCheck size={12} style={{color:msg.status==="read"?"#3b82f6":sub}}/>}
                    </div>
                  </div>
                  {msg.from==="user"&&(
                    <img src={jiyaAvatar} alt="You" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover",flexShrink:0,marginBottom:4,border:"1.5px solid rgba(255,56,92,0.3)"}}/>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing&&(
                <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
                  <img src={active.avatar} alt="" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
                  <div style={{padding:"12px 16px",borderRadius:"18px 18px 18px 4px",background:bubbleBg}}>
                    <div style={{display:"flex",gap:4,alignItems:"center",height:16}}>
                      {[0,150,300].map(d=>(
                        <div key={d} style={{width:6,height:6,borderRadius:"50%",background:"#c9a84c",animation:"bounce 1.2s ease-in-out infinite",animationDelay:`${d}ms`}}/>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef}/>
            </div>

            {/* Quick reply suggestions */}
            <div style={{padding:"8px 16px 0",display:"flex",gap:6,overflowX:"auto",flexShrink:0}}>
              {["👋 Hello!","What's the check-in time?","WiFi password?","Any restaurant nearby?","Thanks! 😊"].map(s=>(
                <button key={s} onClick={()=>{setInput(s);inputRef.current?.focus();}}
                  style={{flexShrink:0,padding:"5px 12px",borderRadius:20,border:`1px solid ${border}`,background:"transparent",color:sub,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}>
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{padding:"10px 16px 14px",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:24,border:`1.5px solid ${active.online?"rgba(201,168,76,0.3)":border}`,background:darkMode?"rgba(255,255,255,0.04)":"rgba(245,244,240,0.9)",transition:"border-color 0.2s"}}>
                <button style={{background:"none",border:"none",cursor:"pointer",padding:4,color:sub,flexShrink:0,display:"flex"}}>
                  <Smile size={18}/>
                </button>
                <button style={{background:"none",border:"none",cursor:"pointer",padding:4,color:sub,flexShrink:0,display:"flex"}}>
                  <ImagePlus size={18}/>
                </button>
                <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                  placeholder={active.online?"Type a message...":"Host is currently offline..."}
                  style={{flex:1,background:"transparent",border:"none",outline:"none",color:txt,fontSize:14,minWidth:0}}/>
                <button onClick={send} disabled={!input.trim()}
                  style={{width:34,height:34,borderRadius:"50%",border:"none",cursor:input.trim()?"pointer":"not-allowed",
                    background:input.trim()?"#FF385C":"rgba(255,56,92,0.2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s",transform:input.trim()?"scale(1)":"scale(0.9)"}}>
                  <Send size={14}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        button:hover{opacity:0.88}
      `}</style>
    </div>
  );
}
