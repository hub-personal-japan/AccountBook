import {initializeApp} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {getFirestore,doc,onSnapshot,setDoc} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUY6G8afPQrRZF4xH8UOjCXKMQbjk4jEw",
  authDomain: "accountbook-795dc.firebaseapp.com",
  projectId: "accountbook-795dc",
  storageBucket: "accountbook-795dc.firebasestorage.app",
  messagingSenderId: "236237013227",
  appId: "1:236237013227:web:3e2d63935e9d40e4aafeae"
};
const app = initializeApp(firebaseConfig), auth = getAuth(app), db = getFirestore(app);
const btn = document.getElementById('syn'), cid = Math.random().toString(36).slice(2);
let ref = null, unsub = null, timer = null, first = true;
const st = t => { btn.textContent = t; };

async function push() {
  if (!ref) return;
  try {
    await setDoc(ref, { json: JSON.stringify(window.KK.get()), at: +localStorage.getItem('kk2t') || Date.now(), by: cid });
    st('☁ 同期済');
  } catch (e) { console.error(e); st('☁ 同期エラー'); }
}
window.onKKSave = () => { if (!ref) return; st('☁ 保存中…'); clearTimeout(timer); timer = setTimeout(push, 800); };

btn.onclick = async () => {
  if (auth.currentUser) { if (confirm('同期をやめてログアウトしますか?(この端末のデータは残ります)')) signOut(auth); return; }
  const p = new GoogleAuthProvider();
  try { await signInWithPopup(auth, p); }
  catch (e) {
    if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') signInWithRedirect(auth, p);
    else if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') alert('ログインに失敗しました: ' + e.code);
  }
};

onAuthStateChanged(auth, u => {
  if (unsub) { unsub(); unsub = null; }
  ref = null; first = true;
  if (!u) { st('☁ ログイン'); return; }
  ref = doc(db, 'users', u.uid, 'data', 'main');
  st('☁ 接続中…');
  unsub = onSnapshot(ref, snap => {
    const d = snap.exists() ? snap.data() : null, LT = +localStorage.getItem('kk2t') || 0;
    if (!d) push();
    else if (d.by !== cid && d.at > LT) { window.KK.set(JSON.parse(d.json), d.at); st('☁ 同期済'); }
    else if (first && d.at < LT) push();
    else st('☁ 同期済');
    first = false;
  }, e => { console.error(e); st('☁ 同期エラー'); });
});
