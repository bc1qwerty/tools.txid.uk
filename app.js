'use strict';
const API = 'https://mempool.space/api';

// ── 테마 ──
(function() {
  const t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const isDark = t !== 'light';
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('theme-btn').innerHTML=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';document.getElementById('theme-btn').title=isDark?'라이트 모드로 전환':'다크 모드로 전환';
})();
function updateThemeBtn(){
  const btn=document.getElementById('theme-btn');if(!btn)return;
  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  btn.innerHTML=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  btn.title=isDark?'라이트 모드로 전환':'다크 모드로 전환';
}
function toggleTheme() {
  const h = document.documentElement;
  const next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  h.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeBtn();
}

function showResult(id, html, isError) {
  const el = document.getElementById(id);
  el.innerHTML = html;
  el.className = 'tool-result show' + (isError ? ' err' : '');
}
function row(key, val) {
  return `<div><span class="key">${key}:</span> <span class="val">${val}</span></div>`;
}

// ── 주소 분석 ──
function analyzeAddress() {
  const addr = document.getElementById('addr-input').value.trim();
  if (!addr) return;
  let type = '', valid = false, network = 'mainnet';

  if (/^1[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr)) { type = 'P2PKH (Legacy)'; valid = true; }
  else if (/^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr)) { type = 'P2SH (Script Hash)'; valid = true; }
  else if (/^bc1q[a-z0-9]{38,58}$/.test(addr)) { type = 'P2WPKH (Native SegWit)'; valid = true; }
  else if (/^bc1p[a-z0-9]{58}$/.test(addr)) { type = 'P2TR (Taproot)'; valid = true; }
  else if (/^bc1q[a-z0-9]{58}$/.test(addr)) { type = 'P2WSH (Native SegWit)'; valid = true; }
  else if (/^tb1/.test(addr) || /^m[a-km-zA-HJ-NP-Z1-9]/.test(addr) || /^2[a-km-zA-HJ-NP-Z1-9]/.test(addr)) { type = 'Testnet 주소'; valid = true; network = 'testnet'; }

  if (!valid) { showResult('addr-result', '<span class="err">❌ 유효하지 않은 주소 형식</span>', true); return; }

  const html = `<span class="ok">✓ 유효한 주소</span>\n` +
    row('타입', `<span class="accent">${type}</span>`) +
    row('네트워크', network) +
    row('길이', addr.length + ' 자') +
    `<div style="margin-top:10px"><a href="https://txid.uk/#/address/${addr}" style="color:var(--accent);text-decoration:none">→ 탐색기에서 보기</a></div>`;
  showResult('addr-result', html);
}
document.getElementById('addr-input').addEventListener('keydown', e => { if (e.key === 'Enter') analyzeAddress(); });

// ── 스크립트 디코더 ──
function decodeScript() {
  const hex = document.getElementById('script-input').value.trim().replace(/\s/g, '');
  if (!hex || !/^[0-9a-fA-F]+$/.test(hex)) {
    showResult('script-result', '<span class="err">유효한 hex를 입력하세요</span>', true); return;
  }
  const bytes = hex.match(/.{2}/g).map(h => parseInt(h, 16));
  let type = 'Unknown Script', decoded = [];

  if (bytes[0]===0x76 && bytes[1]===0xa9 && bytes[2]===0x14 && bytes[bytes.length-2]===0x88 && bytes[bytes.length-1]===0xac) {
    type = 'P2PKH'; const pkh = hex.slice(6, 46); decoded.push(row('타입','P2PKH (Pay-to-Public-Key-Hash)')); decoded.push(row('PubKeyHash', pkh));
  } else if (bytes[0]===0xa9 && bytes[1]===0x14 && bytes[bytes.length-1]===0x87) {
    type = 'P2SH'; const sh = hex.slice(4, 44); decoded.push(row('타입','P2SH (Pay-to-Script-Hash)')); decoded.push(row('ScriptHash', sh));
  } else if (bytes[0]===0x00 && bytes[1]===0x14) {
    type = 'P2WPKH'; const wkh = hex.slice(4, 44); decoded.push(row('타입','P2WPKH (Native SegWit v0)')); decoded.push(row('WitnessKeyHash', wkh));
  } else if (bytes[0]===0x00 && bytes[1]===0x20) {
    type = 'P2WSH'; const wsh = hex.slice(4, 68); decoded.push(row('타입','P2WSH (Native SegWit v0)')); decoded.push(row('WitnessScriptHash', wsh));
  } else if (bytes[0]===0x51 && bytes[1]===0x20) {
    type = 'P2TR'; const tp = hex.slice(4, 68); decoded.push(row('타입','P2TR (Taproot, SegWit v1)')); decoded.push(row('TweakedPubkey', tp));
  } else if (bytes[0]===0x6a) {
    type = 'OP_RETURN'; const data = hex.slice(4); decoded.push(row('타입','OP_RETURN (데이터)')); decoded.push(row('데이터', data));
    try { decoded.push(row('UTF-8', new TextDecoder('utf-8',{fatal:false}).decode(new Uint8Array(bytes.slice(2))))); } catch {}
  } else {
    decoded.push(row('타입','알 수 없는 스크립트')); decoded.push(row('Raw hex', hex));
  }
  decoded.push(row('길이', bytes.length + ' bytes'));
  showResult('script-result', `<span class="accent">[${type}]</span>\n` + decoded.join(''));
}
document.getElementById('script-input').addEventListener('keydown', e => { if (e.key === 'Enter') decodeScript(); });

// ── 단위 변환기 ──
let _btcKrw = null, _btcUsd = null;
async function loadPrices() {
  try {
    const [upbit, cg] = await Promise.all([
      fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC',{signal:AbortSignal.timeout(8000)}).then(r=>r.json()),
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',{signal:AbortSignal.timeout(8000)}).then(r=>r.json())
    ]);
    _btcKrw = upbit[0].trade_price;
    _btcUsd = cg.bitcoin.usd;
    document.getElementById('conv-price-info').textContent =
      `1 BTC = ${_btcKrw.toLocaleString()}원 / $${_btcUsd.toLocaleString()}`;
  } catch { document.getElementById('conv-price-info').textContent = '가격 로드 실패'; }
}
loadPrices();

function convertUnit(from) {
  const ids = ['btc','sat','mbtc','bits','krw','usd'];
  const vals = { btc: 1, sat: 1e-8, mbtc: 1e-3, bits: 1e-6, krw: _btcKrw ? 1/_btcKrw : null, usd: _btcUsd ? 1/_btcUsd : null };
  const rawVal = parseFloat(document.getElementById('conv-'+from).value);
  if (isNaN(rawVal) || !vals[from]) return;
  const btcVal = rawVal * vals[from];
  ids.forEach(id => {
    if (id === from) return;
    const el = document.getElementById('conv-'+id);
    if (!vals[id]) { el.value = ''; return; }
    const v = btcVal / vals[id];
    el.value = id === 'sat' ? Math.round(v) : v.toFixed(id==='krw'||id==='usd' ? 2 : 8).replace(/\.?0+$/, '');
  });
}

// ── Bech32 디코더 (간략) ──
function decodeBech32() {
  const s = document.getElementById('enc-input').value.trim();
  const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
  if (!s.startsWith('bc1') && !s.startsWith('tb1')) {
    showResult('enc-result', '<span class="err">bc1 또는 tb1로 시작하는 Bech32 주소가 아닙니다</span>', true); return;
  }
  const sep = s.lastIndexOf('1');
  const hrp = s.slice(0, sep);
  const data = s.slice(sep+1).toLowerCase();
  const version = CHARSET.indexOf(data[0]);
  const html = row('HRP (Human-Readable Part)', hrp) +
    row('Witness Version', version) +
    row('Data Part', data.slice(1)) +
    row('길이', s.length + ' 자') +
    row('타입', s.startsWith('bc1p') ? 'P2TR (Taproot)' : s.startsWith('bc1q') && s.length===42 ? 'P2WPKH' : 'P2WSH');
  showResult('enc-result', html);
}

function decodeBase58() {
  const s = document.getElementById('enc-input').value.trim();
  const ALPHA = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  if (![...s].every(c => ALPHA.includes(c))) {
    showResult('enc-result', '<span class="err">Base58 문자가 아닌 값이 포함돼 있습니다</span>', true); return;
  }
  let n = BigInt(0);
  for (const c of s) n = n * 58n + BigInt(ALPHA.indexOf(c));
  const hex = n.toString(16).padStart(50, '0').slice(-50);
  const version = hex.slice(0, 2);
  const versionNames = { '00': 'P2PKH 주소 (mainnet)', '05': 'P2SH 주소 (mainnet)', '6f': 'P2PKH 주소 (testnet)', '80': 'WIF 개인키', '0488b21e': 'xpub', '0488ade4': 'xprv' };
  const html = row('Hex', `<span style="word-break:break-all">${hex}</span>`) +
    row('Version byte', '0x' + version) +
    row('타입', versionNames[version] || '알 수 없음') +
    row('Payload', hex.slice(2, -8)) +
    row('Checksum', hex.slice(-8));
  showResult('enc-result', html);
}

// ── TX 브로드캐스트 ──
async function broadcastTx() {
  const hex = document.getElementById('tx-hex').value.trim();
  if (!hex) return;
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length < 20) { showResult('broadcast-result', '<span class="err">유효한 Raw TX hex를 입력하세요</span>', true); return; }
  if (!confirm('이 트랜잭션을 비트코인 메인넷에 브로드캐스트하시겠습니까?\n\n한 번 전송하면 취소할 수 없습니다.')) return;
  showResult('broadcast-result', '전송 중…');
  try {
    const res = await fetch(API + '/tx', { method: 'POST', body: hex, headers: { 'Content-Type': 'text/plain' }, signal: AbortSignal.timeout(15000) });
    const txid = await res.text();
    if (res.ok) {
      const isTxid=/^[0-9a-fA-F]{64}$/.test(txid.trim());
      const txLink=isTxid?`<a href="https://txid.uk/#/tx/${txid.trim()}" style="color:var(--accent)" target="_blank">${txid.trim()}</a>`:txid.slice(0,200);
      showResult('broadcast-result', `<span class="ok">✓ 브로드캐스트 성공!</span>\n` + row('TXID', txLink));
    } else {
      showResult('broadcast-result', `<span class="err">❌ 오류: ${String(txid).replace(/</g,'&lt;').slice(0,300)}</span>`, true);
    }
  } catch (e) { showResult('broadcast-result', `<span class="err">네트워크 오류: ${e.message}</span>`, true); }
}

// ── OP 코드 사전 ──
const OPCODES = [
  { name:'OP_0', hex:'0x00', dec:0, desc:'빈 바이트 배열 push' },
  { name:'OP_RETURN', hex:'0x6a', dec:106, desc:'스크립트 종료, 데이터 삽입 (Ordinals, Runes)' },
  { name:'OP_DUP', hex:'0x76', dec:118, desc:'스택 최상단 복제' },
  { name:'OP_HASH160', hex:'0xa9', dec:169, desc:'SHA256 후 RIPEMD160 해시' },
  { name:'OP_EQUALVERIFY', hex:'0x88', dec:136, desc:'두 값 비교 후 같지 않으면 실패' },
  { name:'OP_CHECKSIG', hex:'0xac', dec:172, desc:'서명과 공개키 검증' },
  { name:'OP_CHECKMULTISIG', hex:'0xae', dec:174, desc:'다중 서명 검증' },
  { name:'OP_EQUAL', hex:'0x87', dec:135, desc:'두 값이 같으면 1 push' },
  { name:'OP_VERIFY', hex:'0x69', dec:105, desc:'최상단 값이 거짓이면 실패' },
  { name:'OP_IF', hex:'0x63', dec:99, desc:'조건부 실행 시작' },
  { name:'OP_ELSE', hex:'0x67', dec:103, desc:'조건 분기' },
  { name:'OP_ENDIF', hex:'0x68', dec:104, desc:'조건부 실행 종료' },
  { name:'OP_CHECKLOCKTIMEVERIFY', hex:'0xb1', dec:177, desc:'절대 시간 잠금 (CLTV)' },
  { name:'OP_CHECKSEQUENCEVERIFY', hex:'0xb2', dec:178, desc:'상대 시간 잠금 (CSV)' },
  { name:'OP_PUSHDATA1', hex:'0x4c', dec:76, desc:'다음 1바이트만큼 데이터 push' },
  { name:'OP_PUSHDATA2', hex:'0x4d', dec:77, desc:'다음 2바이트만큼 데이터 push' },
  { name:'OP_1 ~ OP_16', hex:'0x51~0x60', dec:'81~96', desc:'숫자 1~16 push' },
  { name:'OP_ADD', hex:'0x93', dec:147, desc:'두 수 더하기' },
  { name:'OP_SUB', hex:'0x94', dec:148, desc:'두 수 빼기' },
  { name:'OP_SWAP', hex:'0x7c', dec:124, desc:'스택 상위 두 항목 교환' },
  { name:'OP_DROP', hex:'0x75', dec:117, desc:'스택 최상단 제거' },
  { name:'OP_NOP', hex:'0x61', dec:97, desc:'아무 동작 안 함' },
  { name:'OP_CODESEPARATOR', hex:'0xab', dec:171, desc:'서명 범위 구분자' },
  { name:'OP_CHECKSIGADD', hex:'0xba', dec:186, desc:'Tapscript 다중서명 (SegWit v1)' },
];

function renderOpcodes(list) {
  const el = document.getElementById('op-result');
  if (!list.length) { el.innerHTML = '<div style="color:var(--text3);padding:8px">검색 결과 없음</div>'; el.className='tool-result show'; return; }
  el.innerHTML = list.map(op => `
    <div class="op-item">
      <div class="op-name">${op.name}</div>
      <div class="op-hex">${op.hex} (${op.dec})</div>
      <div class="op-desc">${op.desc}</div>
    </div>`).join('');
  el.className = 'tool-result show op-grid';
}

function searchOpcode(q) {
  if (!q) { document.getElementById('op-result').className='tool-result'; return; }
  q = q.toLowerCase();
  const res = OPCODES.filter(op =>
    op.name.toLowerCase().includes(q) ||
    op.hex.includes(q) ||
    String(op.dec).includes(q) ||
    op.desc.toLowerCase().includes(q)
  );
  renderOpcodes(res);
}
// 초기 전체 표시
renderOpcodes(OPCODES);
