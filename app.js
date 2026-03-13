function escHtml(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
async function fetchRetry(url,timeout,retries){for(let i=0,m=retries||2;i<=m;i++){try{return await fetch(url,{signal:AbortSignal.timeout(timeout||10000)});}catch(e){if(i>=m)throw e;await new Promise(r=>setTimeout(r,1000<<i));}}}
'use strict';

// ── 언어 ──
let lang = localStorage.getItem('lang') || 'ko';
const LABELS = {
  ko: {탐색기:'탐색기', 도구:'도구', 시각화:'시각화', 통계:'통계', 노드:'노드', 지도:'지도', 포트폴리오:'포트폴리오', 전송:'전송', 배우기:'배우기', 앱모음:'앱모음'},
  en: {탐색기:'Explorer', 도구:'Tools', 시각화:'Viz', 통계:'Stats', 노드:'Nodes', 지도:'Map', 포트폴리오:'Portfolio', 전송:'TX', 배우기:'Learn', 앱모음:'Apps'},
  ja: {탐색기:'探索', 도구:'ツール', 시각화:'可視化', 통계:'統計', 노드:'ノード', 지도:'地図', 포트폴리오:'資産', 전송:'送金', 배우기:'学習', 앱모음:'アプリ'},
};

// ── i18n 번역 ──
const T = {
  ko: {
    invalid_addr: '❌ 유효하지 않은 주소 형식',
    valid_addr: '✓ 유효한 주소',
    invalid_hex: '유효한 hex를 입력하세요',
    type: '타입',
    network: '네트워크',
    length: '길이',
    length_chars: '자',
    view_explorer: '→ 탐색기에서 보기',
    data: '데이터',
    op_return_data: 'OP_RETURN (데이터)',
    unknown_script: '알 수 없는 스크립트',
    unknown: '알 수 없음',
    price_load_fail: '가격 로드 실패',
    retry: '재시도',
    bech32_error: 'bc1 또는 tb1로 시작하는 Bech32 주소가 아닙니다',
    base58_error: 'Base58 문자가 아닌 값이 포함돼 있습니다',
    invalid_raw_hex: '유효한 Raw TX hex를 입력하세요',
    confirm_broadcast: '이 트랜잭션을 비트코인 메인넷에 브로드캐스트하시겠습니까?\n\n한 번 전송하면 취소할 수 없습니다.',
    sending: '전송 중…',
    broadcast_ok: '✓ 브로드캐스트 성공!',
    error_prefix: '❌ 오류: ',
    network_error: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    testnet_addr: 'Testnet 주소',
    p2pkh_mainnet: 'P2PKH 주소 (mainnet)',
    p2sh_mainnet: 'P2SH 주소 (mainnet)',
    p2pkh_testnet: 'P2PKH 주소 (testnet)',
    wif_privkey: 'WIF 개인키',
    no_search_result: '검색 결과 없음',
    light_mode: '라이트 모드로 전환',
    dark_mode: '다크 모드로 전환',
  },
  en: {
    invalid_addr: '❌ Invalid address format',
    valid_addr: '✓ Valid address',
    invalid_hex: 'Enter valid hex',
    type: 'Type',
    network: 'Network',
    length: 'Length',
    length_chars: 'chars',
    view_explorer: '→ View in Explorer',
    data: 'Data',
    op_return_data: 'OP_RETURN (Data)',
    unknown_script: 'Unknown Script',
    unknown: 'Unknown',
    price_load_fail: 'Failed to load price',
    retry: 'Retry',
    bech32_error: 'Not a Bech32 address starting with bc1 or tb1',
    base58_error: 'Contains non-Base58 characters',
    invalid_raw_hex: 'Enter valid Raw TX hex',
    confirm_broadcast: 'Broadcast this transaction to Bitcoin mainnet?\n\nOnce sent, it cannot be reversed.',
    sending: 'Sending…',
    broadcast_ok: '✓ Broadcast successful!',
    error_prefix: '❌ Error: ',
    network_error: 'Network error occurred. Please try again later.',
    testnet_addr: 'Testnet address',
    p2pkh_mainnet: 'P2PKH address (mainnet)',
    p2sh_mainnet: 'P2SH address (mainnet)',
    p2pkh_testnet: 'P2PKH address (testnet)',
    wif_privkey: 'WIF private key',
    no_search_result: 'No results found',
    light_mode: 'Switch to light mode',
    dark_mode: 'Switch to dark mode',
  },
  ja: {
    invalid_addr: '❌ 無効なアドレス形式',
    valid_addr: '✓ 有効なアドレス',
    invalid_hex: '有効なhexを入力してください',
    type: 'タイプ',
    network: 'ネットワーク',
    length: '長さ',
    length_chars: '文字',
    view_explorer: '→ エクスプローラーで表示',
    data: 'データ',
    op_return_data: 'OP_RETURN (データ)',
    unknown_script: '不明なスクリプト',
    unknown: '不明',
    price_load_fail: '価格の読み込みに失敗',
    retry: '再試行',
    bech32_error: 'bc1またはtb1で始まるBech32アドレスではありません',
    base58_error: 'Base58以外の文字が含まれています',
    invalid_raw_hex: '有効なRaw TX hexを入力してください',
    confirm_broadcast: 'このトランザクションをビットコインメインネットにブロードキャストしますか？\n\n一度送信すると取り消せません。',
    sending: '送信中…',
    broadcast_ok: '✓ ブロードキャスト成功！',
    error_prefix: '❌ エラー: ',
    network_error: 'ネットワークエラーが発生しました。しばらくしてから再試行してください。',
    testnet_addr: 'Testnetアドレス',
    p2pkh_mainnet: 'P2PKHアドレス (メインネット)',
    p2sh_mainnet: 'P2SHアドレス (メインネット)',
    p2pkh_testnet: 'P2PKHアドレス (テストネット)',
    wif_privkey: 'WIF秘密鍵',
    no_search_result: '検索結果なし',
    light_mode: 'ライトモードに切替',
    dark_mode: 'ダークモードに切替',
  },
};
function t(key){ return (T[lang]&&T[lang][key]) || T.en[key] || key; }

function setLang(l){
  lang=l; localStorage.setItem('lang',lang);
  const btn=document.getElementById('lang-btn');
  if(btn) btn.textContent={ko:'KO',en:'EN',ja:'JA'}[lang]||'KO';
  document.getElementById('lang-menu')?.classList.remove('open');
  document.querySelectorAll('[data-ko]').forEach(el=>{
    const val=el.dataset[lang]||el.dataset.en||el.dataset.ko;
    if(val){
      if(el.placeholder!==undefined) el.placeholder=val;
      else el.textContent=val;
    }
  });
  // re-render opcodes with new lang (OPCODES may not be initialized yet on first call)
  try { if(typeof renderOpcodes==='function') renderOpcodes(OPCODES); } catch(e) {}
}
function toggleLang(){const m=document.getElementById('lang-menu');m?.classList.toggle('open');document.getElementById('lang-btn')?.setAttribute('aria-expanded',m?.classList.contains('open')||false);}
document.addEventListener('click',e=>{const m=document.getElementById('lang-menu');if(m&&!e.target.closest('.lang-dropdown')){m.classList.remove('open');document.getElementById('lang-btn')?.setAttribute('aria-expanded','false');}});
(function(){setLang(lang);})();

const API = 'https://mempool.space/api';

// ── 테마 ──
(function() {
  const th = localStorage.getItem('theme') || 'dark';
  const isDark = th !== 'light';
  document.documentElement.setAttribute('data-theme', th);
  document.getElementById('theme-btn').innerHTML=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';document.getElementById('theme-btn').title=isDark?t('light_mode'):t('dark_mode');
})();
function updateThemeBtn(){
  const btn=document.getElementById('theme-btn');if(!btn)return;
  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  btn.innerHTML=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  btn.title=isDark?t('light_mode'):t('dark_mode');
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
  else if (/^tb1/.test(addr) || /^m[a-km-zA-HJ-NP-Z1-9]/.test(addr) || /^2[a-km-zA-HJ-NP-Z1-9]/.test(addr)) { type = t('testnet_addr'); valid = true; network = 'testnet'; }

  if (!valid) { showResult('addr-result', `<span class="err">${t('invalid_addr')}</span>`, true); return; }

  const html = `<span class="ok">${t('valid_addr')}</span>\n` +
    row(t('type'), `<span class="accent">${type}</span>`) +
    row(t('network'), network) +
    row(t('length'), addr.length + ' ' + t('length_chars')) +
    `<div class="mt-10"><a href="https://txid.uk/#/address/${addr}" class="explorer-link">${t('view_explorer')}</a></div>`;
  showResult('addr-result', html);
}
document.getElementById('addr-input').addEventListener('keydown', e => { if (e.key === 'Enter') analyzeAddress(); });

// ── 스크립트 디코더 ──
function decodeScript() {
  const hex = document.getElementById('script-input').value.trim().replace(/\s/g, '');
  if (!hex || !/^[0-9a-fA-F]+$/.test(hex)) {
    showResult('script-result', `<span class="err">${t('invalid_hex')}</span>`, true); return;
  }
  const bytes = hex.match(/.{2}/g).map(h => parseInt(h, 16));
  let type = 'Unknown Script', decoded = [];

  if (bytes[0]===0x76 && bytes[1]===0xa9 && bytes[2]===0x14 && bytes[bytes.length-2]===0x88 && bytes[bytes.length-1]===0xac) {
    type = 'P2PKH'; const pkh = hex.slice(6, 46); decoded.push(row(t('type'),'P2PKH (Pay-to-Public-Key-Hash)')); decoded.push(row('PubKeyHash', pkh));
  } else if (bytes[0]===0xa9 && bytes[1]===0x14 && bytes[bytes.length-1]===0x87) {
    type = 'P2SH'; const sh = hex.slice(4, 44); decoded.push(row(t('type'),'P2SH (Pay-to-Script-Hash)')); decoded.push(row('ScriptHash', sh));
  } else if (bytes[0]===0x00 && bytes[1]===0x14) {
    type = 'P2WPKH'; const wkh = hex.slice(4, 44); decoded.push(row(t('type'),'P2WPKH (Native SegWit v0)')); decoded.push(row('WitnessKeyHash', wkh));
  } else if (bytes[0]===0x00 && bytes[1]===0x20) {
    type = 'P2WSH'; const wsh = hex.slice(4, 68); decoded.push(row(t('type'),'P2WSH (Native SegWit v0)')); decoded.push(row('WitnessScriptHash', wsh));
  } else if (bytes[0]===0x51 && bytes[1]===0x20) {
    type = 'P2TR'; const tp = hex.slice(4, 68); decoded.push(row(t('type'),'P2TR (Taproot, SegWit v1)')); decoded.push(row('TweakedPubkey', tp));
  } else if (bytes[0]===0x6a) {
    type = 'OP_RETURN'; const data = hex.slice(4); decoded.push(row(t('type'),t('op_return_data'))); decoded.push(row(t('data'), data));
    try { decoded.push(row('UTF-8', new TextDecoder('utf-8',{fatal:false}).decode(new Uint8Array(bytes.slice(2))))); } catch {}
  } else {
    decoded.push(row(t('type'),t('unknown_script'))); decoded.push(row('Raw hex', hex));
  }
  decoded.push(row(t('length'), bytes.length + ' bytes'));
  showResult('script-result', `<span class="accent">[${type}]</span>\n` + decoded.join(''));
}
document.getElementById('script-input').addEventListener('keydown', e => { if (e.key === 'Enter') decodeScript(); });

// ── 단위 변환기 ──
let _btcKrw = null, _btcUsd = null;
async function loadPrices() {
  try {
    const [upbit, binance] = await Promise.all([
      fetchRetry('https://api.upbit.com/v1/ticker?markets=KRW-BTC',8000).then(r=>r.json()),
      fetchRetry('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',8000).then(r=>r.json())
    ]);
    _btcKrw = upbit[0].trade_price;
    _btcUsd = parseFloat(binance.price);
    document.getElementById('conv-price-info').textContent =
      `1 BTC = ${_btcKrw.toLocaleString()}원 / $${_btcUsd.toLocaleString()}`;
  } catch(e) {
    console.error('loadPrices error:', e);
    var info = document.getElementById('conv-price-info');
    info.textContent = '';
    info.appendChild(document.createTextNode(t('price_load_fail') + ' '));
    var retryBtn = document.createElement('button');
    retryBtn.textContent = t('retry');
    retryBtn.className = 'retry-btn';
    retryBtn.addEventListener('click', loadPrices);
    info.appendChild(retryBtn);
  }
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
    showResult('enc-result', `<span class="err">${t('bech32_error')}</span>`, true); return;
  }
  const sep = s.lastIndexOf('1');
  const hrp = s.slice(0, sep);
  const data = s.slice(sep+1).toLowerCase();
  const version = CHARSET.indexOf(data[0]);
  const html = row('HRP (Human-Readable Part)', hrp) +
    row('Witness Version', version) +
    row('Data Part', data.slice(1)) +
    row(t('length'), s.length + ' ' + t('length_chars')) +
    row(t('type'), s.startsWith('bc1p') ? 'P2TR (Taproot)' : s.startsWith('bc1q') && s.length===42 ? 'P2WPKH' : 'P2WSH');
  showResult('enc-result', html);
}

function decodeBase58() {
  const s = document.getElementById('enc-input').value.trim();
  const ALPHA = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  if (![...s].every(c => ALPHA.includes(c))) {
    showResult('enc-result', `<span class="err">${t('base58_error')}</span>`, true); return;
  }
  let n = BigInt(0);
  for (const c of s) n = n * 58n + BigInt(ALPHA.indexOf(c));
  const hex = n.toString(16).padStart(50, '0').slice(-50);
  const version = hex.slice(0, 2);
  const versionNames = { '00': t('p2pkh_mainnet'), '05': t('p2sh_mainnet'), '6f': t('p2pkh_testnet'), '80': t('wif_privkey'), '0488b21e': 'xpub', '0488ade4': 'xprv' };
  const html = row('Hex', `<span class="word-break-all">${hex}</span>`) +
    row('Version byte', '0x' + version) +
    row(t('type'), versionNames[version] || t('unknown')) +
    row('Payload', hex.slice(2, -8)) +
    row('Checksum', hex.slice(-8));
  showResult('enc-result', html);
}

// ── TX 브로드캐스트 ──
async function broadcastTx() {
  const hex = document.getElementById('tx-hex').value.trim();
  if (!hex) return;
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length < 20) { showResult('broadcast-result', `<span class="err">${t('invalid_raw_hex')}</span>`, true); return; }
  if (!confirm(t('confirm_broadcast'))) return;
  showResult('broadcast-result', t('sending'));
  try {
    const res = await fetch(API + '/tx', { method: 'POST', body: hex, headers: { 'Content-Type': 'text/plain' }, signal: AbortSignal.timeout(15000) });
    const txid = await res.text();
    if (res.ok) {
      const isTxid=/^[0-9a-fA-F]{64}$/.test(txid.trim());
      const txLink=isTxid?`<a href="https://txid.uk/#/tx/${txid.trim()}" class="explorer-link" target="_blank">${txid.trim()}</a>`:escHtml(txid.slice(0,200));
      showResult('broadcast-result', `<span class="ok">${t('broadcast_ok')}</span>\n` + row('TXID', txLink));
    } else {
      showResult('broadcast-result', `<span class="err">${t('error_prefix')}${escHtml(String(txid).slice(0,300))}</span>`, true);
    }
  } catch (e) { console.error('broadcastTx error:', e); showResult('broadcast-result', `<span class="err">${t('network_error')}</span>`, true); }
}

// ── OP 코드 사전 ──
function getOpcodes() {
  return [
    { name:'OP_0', hex:'0x00', dec:0, descKey:'opcode_desc_0' },
    { name:'OP_RETURN', hex:'0x6a', dec:106, descKey:'opcode_desc_return' },
    { name:'OP_DUP', hex:'0x76', dec:118, descKey:'opcode_desc_dup' },
    { name:'OP_HASH160', hex:'0xa9', dec:169, descKey:'opcode_desc_hash160' },
    { name:'OP_EQUALVERIFY', hex:'0x88', dec:136, descKey:'opcode_desc_equalverify' },
    { name:'OP_CHECKSIG', hex:'0xac', dec:172, descKey:'opcode_desc_checksig' },
    { name:'OP_CHECKMULTISIG', hex:'0xae', dec:174, descKey:'opcode_desc_checkmultisig' },
    { name:'OP_EQUAL', hex:'0x87', dec:135, descKey:'opcode_desc_equal' },
    { name:'OP_VERIFY', hex:'0x69', dec:105, descKey:'opcode_desc_verify' },
    { name:'OP_IF', hex:'0x63', dec:99, descKey:'opcode_desc_if' },
    { name:'OP_ELSE', hex:'0x67', dec:103, descKey:'opcode_desc_else' },
    { name:'OP_ENDIF', hex:'0x68', dec:104, descKey:'opcode_desc_endif' },
    { name:'OP_CHECKLOCKTIMEVERIFY', hex:'0xb1', dec:177, descKey:'opcode_desc_cltv' },
    { name:'OP_CHECKSEQUENCEVERIFY', hex:'0xb2', dec:178, descKey:'opcode_desc_csv' },
    { name:'OP_PUSHDATA1', hex:'0x4c', dec:76, descKey:'opcode_desc_pushdata1' },
    { name:'OP_PUSHDATA2', hex:'0x4d', dec:77, descKey:'opcode_desc_pushdata2' },
    { name:'OP_1 ~ OP_16', hex:'0x51~0x60', dec:'81~96', descKey:'opcode_desc_1to16' },
    { name:'OP_ADD', hex:'0x93', dec:147, descKey:'opcode_desc_add' },
    { name:'OP_SUB', hex:'0x94', dec:148, descKey:'opcode_desc_sub' },
    { name:'OP_SWAP', hex:'0x7c', dec:124, descKey:'opcode_desc_swap' },
    { name:'OP_DROP', hex:'0x75', dec:117, descKey:'opcode_desc_drop' },
    { name:'OP_NOP', hex:'0x61', dec:97, descKey:'opcode_desc_nop' },
    { name:'OP_CODESEPARATOR', hex:'0xab', dec:171, descKey:'opcode_desc_codesep' },
    { name:'OP_CHECKSIGADD', hex:'0xba', dec:186, descKey:'opcode_desc_checksigadd' },
  ];
}
const OPCODES = getOpcodes();

function renderOpcodes(list) {
  const el = document.getElementById('op-result');
  if (!list.length) { el.innerHTML = `<div class="no-results">${t('no_search_result')}</div>`; el.className='tool-result show'; return; }
  el.innerHTML = list.map(op => `
    <div class="op-item">
      <div class="op-name">${op.name}</div>
      <div class="op-hex">${op.hex} (${op.dec})</div>
      <div class="op-desc">${t(op.descKey)}</div>
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
    t(op.descKey).toLowerCase().includes(q)
  );
  renderOpcodes(res);
}
// 초기 전체 표시
renderOpcodes(OPCODES);

// ── 이벤트 리스너 바인딩 ──
// Common nav
document.getElementById('lang-btn')?.addEventListener('click', toggleLang);
document.querySelectorAll('#lang-menu button').forEach(function(btn) {
  var lang = btn.textContent === '한국어' ? 'ko' : btn.textContent === 'English' ? 'en' : 'ja';
  btn.addEventListener('click', function() { setLang(lang); });
});
document.getElementById('theme-btn')?.addEventListener('click', toggleTheme);

// Action buttons
document.getElementById('btn-analyze-addr')?.addEventListener('click', analyzeAddress);
document.getElementById('btn-decode-script')?.addEventListener('click', decodeScript);
document.getElementById('btn-decode-bech32')?.addEventListener('click', decodeBech32);
document.getElementById('btn-decode-base58')?.addEventListener('click', decodeBase58);
document.getElementById('btn-broadcast-tx')?.addEventListener('click', broadcastTx);

// Unit converter inputs
['btc','sat','mbtc','bits','krw','usd'].forEach(function(u) {
  document.getElementById('conv-'+u)?.addEventListener('input', function() { convertUnit(u); });
});

// OP code search
document.getElementById('op-search')?.addEventListener('input', function() { searchOpcode(this.value); });
