/** Per-tool SEO metadata and routing info */
export interface ToolMeta {
  slug: string;
  icon: string; // SVG path content
  title: Record<string, string>;
  description: Record<string, string>;
  keywords: string;
  wide?: boolean;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'address-validator',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    title: {
      ko: 'Bitcoin 주소 검증기 — 비트코인 주소 타입 분석 | txid.uk',
      en: 'Bitcoin Address Validator — Address Type Analysis | txid.uk',
      ja: 'Bitcoinアドレス検証 — アドレスタイプ分析 | txid.uk',
    },
    description: {
      ko: '비트코인 주소를 검증하고 타입(P2PKH, P2SH, P2WPKH, P2TR)을 분석합니다. Legacy, SegWit, Taproot 주소 지원.',
      en: 'Validate Bitcoin addresses and analyze types (P2PKH, P2SH, P2WPKH, P2TR). Supports Legacy, SegWit, and Taproot addresses.',
      ja: 'Bitcoinアドレスを検証し、タイプ(P2PKH, P2SH, P2WPKH, P2TR)を分析。Legacy, SegWit, Taprootアドレス対応。',
    },
    keywords: 'bitcoin address validator, bitcoin address checker, P2PKH, P2SH, P2WPKH, P2TR, taproot, segwit',
  },
  {
    slug: 'script-decoder',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    title: {
      ko: 'Bitcoin 스크립트 디코더 — scriptPubKey 분석 | txid.uk',
      en: 'Bitcoin Script Decoder — scriptPubKey Analysis | txid.uk',
      ja: 'Bitcoinスクリプトデコーダー — scriptPubKey分析 | txid.uk',
    },
    description: {
      ko: 'Bitcoin scriptPubKey hex를 디코딩하여 스크립트 타입과 구조를 분석합니다. P2PKH, P2SH, P2WPKH, P2WSH, P2TR, OP_RETURN 지원.',
      en: 'Decode Bitcoin scriptPubKey hex to analyze script type and structure. Supports P2PKH, P2SH, P2WPKH, P2WSH, P2TR, OP_RETURN.',
      ja: 'Bitcoin scriptPubKey hexをデコードし、スクリプトタイプと構造を分析。P2PKH, P2SH, P2WPKH, P2WSH, P2TR, OP_RETURN対応。',
    },
    keywords: 'bitcoin script decoder, scriptPubKey decoder, P2PKH, P2SH, OP_RETURN, hex decoder',
  },
  {
    slug: 'unit-converter',
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    title: {
      ko: 'BTC 단위 변환기 — 사토시, mBTC, USD, KRW | txid.uk',
      en: 'BTC Unit Converter — Satoshi, mBTC, USD, KRW | txid.uk',
      ja: 'BTC単位変換器 — サトシ, mBTC, USD, KRW | txid.uk',
    },
    description: {
      ko: '비트코인 단위를 실시간 환율로 변환합니다. BTC, Satoshi, mBTC, bits, KRW, USD 상호 변환.',
      en: 'Convert Bitcoin units with live exchange rates. BTC, Satoshi, mBTC, bits, KRW, USD cross-conversion.',
      ja: 'ビットコイン単位をリアルタイムレートで変換。BTC, サトシ, mBTC, bits, KRW, USD相互変換。',
    },
    keywords: 'btc converter, satoshi converter, bitcoin unit converter, btc to usd, btc to krw',
  },
  {
    slug: 'bech32-decoder',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    title: {
      ko: 'Bech32 / Base58 디코더 — 비트코인 주소 인코딩 분석 | txid.uk',
      en: 'Bech32 / Base58 Decoder — Bitcoin Address Encoding | txid.uk',
      ja: 'Bech32 / Base58 デコーダー — Bitcoinアドレスエンコーディング | txid.uk',
    },
    description: {
      ko: 'Bech32(bc1) 및 Base58 비트코인 주소를 디코딩합니다. Witness version, HRP, payload 분석.',
      en: 'Decode Bech32 (bc1) and Base58 Bitcoin addresses. Analyze witness version, HRP, and payload.',
      ja: 'Bech32(bc1)とBase58 Bitcoinアドレスをデコード。Witness version, HRP, payload分析。',
    },
    keywords: 'bech32 decoder, base58 decoder, bitcoin address decoder, segwit address, bc1 address',
  },
  {
    slug: 'tx-broadcast',
    icon: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    title: {
      ko: 'Bitcoin TX 브로드캐스트 — 트랜잭션 전송 | txid.uk',
      en: 'Bitcoin TX Broadcast — Send Transaction | txid.uk',
      ja: 'Bitcoin TXブロードキャスト — トランザクション送信 | txid.uk',
    },
    description: {
      ko: '서명된 비트코인 트랜잭션 hex를 메인넷에 브로드캐스트합니다. Mempool.space API 사용.',
      en: 'Broadcast a signed Bitcoin transaction hex to mainnet. Uses Mempool.space API.',
      ja: '署名済みBitcoinトランザクションhexをメインネットにブロードキャスト。Mempool.space API使用。',
    },
    keywords: 'bitcoin broadcast, send transaction, push tx, bitcoin transaction broadcast',
  },
  {
    slug: 'opcode-ref',
    icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    title: {
      ko: 'Bitcoin OP 코드 사전 — 스크립트 명령어 레퍼런스 | txid.uk',
      en: 'Bitcoin OP Code Dictionary — Script Reference | txid.uk',
      ja: 'Bitcoin OPコード辞典 — スクリプトリファレンス | txid.uk',
    },
    description: {
      ko: '비트코인 스크립트 OP 코드 사전. OP_DUP, OP_HASH160, OP_CHECKSIG 등 주요 명령어 검색 및 설명.',
      en: 'Bitcoin Script OP code dictionary. Search and reference OP_DUP, OP_HASH160, OP_CHECKSIG and more.',
      ja: 'Bitcoinスクリプト OPコード辞典。OP_DUP, OP_HASH160, OP_CHECKSIG等の検索とリファレンス。',
    },
    keywords: 'bitcoin opcode, op code reference, OP_DUP, OP_HASH160, OP_CHECKSIG, bitcoin script opcodes',
  },
  {
    slug: 'script-ide',
    icon: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    title: {
      ko: 'Bitcoin Script IDE — 스크립트 에디터 & 시뮬레이터 | txid.uk',
      en: 'Bitcoin Script IDE — Editor & Simulator | txid.uk',
      ja: 'Bitcoin Script IDE — エディタ & シミュレータ | txid.uk',
    },
    description: {
      ko: '비트코인 스크립트를 작성하고 단계별로 실행하는 IDE. 구문 강조, 스택 시각화, 템플릿 제공.',
      en: 'Write and step-execute Bitcoin scripts. Features syntax highlighting, stack visualization, and templates.',
      ja: 'Bitcoinスクリプトを作成しステップ実行するIDE。構文ハイライト、スタック可視化、テンプレート付き。',
    },
    keywords: 'bitcoin script ide, bitcoin script editor, script simulator, stack visualization, bitcoin script debugger',
    wide: true,
  },
  {
    slug: 'psbt-editor',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/>',
    title: {
      ko: 'PSBT 에디터 — 비트코인 PSBT 디코더 & 분석 | txid.uk',
      en: 'PSBT Editor — Bitcoin PSBT Decoder & Analyzer | txid.uk',
      ja: 'PSBTエディタ — Bitcoin PSBTデコーダー & 分析 | txid.uk',
    },
    description: {
      ko: 'PSBT(Partially Signed Bitcoin Transaction)를 디코딩하고 분석합니다. Base64/hex 입력, 서명 상태 확인.',
      en: 'Decode and analyze PSBT (Partially Signed Bitcoin Transactions). Base64/hex input, signing status check.',
      ja: 'PSBT(部分署名ビットコイントランザクション)をデコード・分析。Base64/hex入力、署名状態確認。',
    },
    keywords: 'psbt decoder, psbt editor, partially signed bitcoin transaction, psbt analyzer',
    wide: true,
  },
  {
    slug: 'lightning-decoder',
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    title: {
      ko: 'Lightning Invoice 디코더 — BOLT11 인보이스 분석 | txid.uk',
      en: 'Lightning Invoice Decoder — BOLT11 Analysis | txid.uk',
      ja: 'Lightningインボイスデコーダー — BOLT11分析 | txid.uk',
    },
    description: {
      ko: 'Lightning Network BOLT11 인보이스를 디코딩합니다. 금액, 만료시간, 경로 힌트, 서명 분석.',
      en: 'Decode Lightning Network BOLT11 invoices. Analyze amount, expiry, route hints, and signature.',
      ja: 'Lightning Network BOLT11インボイスをデコード。金額、有効期限、ルートヒント、署名分析。',
    },
    keywords: 'lightning invoice decoder, bolt11 decoder, lightning network, lnbc decoder',
    wide: true,
  },
];

/** Short label for each tool (used in directory listing) */
export const TOOL_LABELS: Record<string, Record<string, string>> = {
  'address-validator': { ko: '주소 검증 / 분석', en: 'Address Validation & Analysis', ja: 'アドレス検証・分析' },
  'script-decoder': { ko: '스크립트 디코더', en: 'Script Decoder', ja: 'スクリプトデコーダー' },
  'unit-converter': { ko: '단위 변환기', en: 'Unit Converter', ja: '単位変換器' },
  'bech32-decoder': { ko: 'Bech32 / Base58 디코더', en: 'Bech32 / Base58 Decoder', ja: 'Bech32 / Base58 デコーダー' },
  'tx-broadcast': { ko: 'TX 브로드캐스트', en: 'TX Broadcast', ja: 'TXブロードキャスト' },
  'opcode-ref': { ko: 'OP 코드 사전', en: 'OP Code Dictionary', ja: 'OPコード辞典' },
  'script-ide': { ko: 'Script IDE', en: 'Script IDE', ja: 'Script IDE' },
  'psbt-editor': { ko: 'PSBT 에디터', en: 'PSBT Editor', ja: 'PSBTエディタ' },
  'lightning-decoder': { ko: 'LN Invoice 디코더', en: 'LN Invoice Decoder', ja: 'LNインボイスデコーダー' },
};

/** Short description for each tool (used in directory listing) */
export const TOOL_SHORT_DESC: Record<string, Record<string, string>> = {
  'address-validator': {
    ko: 'P2PKH, P2SH, P2WPKH, P2TR 주소 타입 분석',
    en: 'Analyze P2PKH, P2SH, P2WPKH, P2TR address types',
    ja: 'P2PKH, P2SH, P2WPKH, P2TRアドレスタイプ分析',
  },
  'script-decoder': {
    ko: 'scriptPubKey hex를 사람이 읽을 수 있게 디코드',
    en: 'Decode scriptPubKey hex to human-readable format',
    ja: 'scriptPubKey hexを読みやすく変換',
  },
  'unit-converter': {
    ko: 'BTC, Satoshi, mBTC, KRW, USD 실시간 변환',
    en: 'Live conversion between BTC, Satoshi, mBTC, KRW, USD',
    ja: 'BTC, サトシ, mBTC, KRW, USDリアルタイム変換',
  },
  'bech32-decoder': {
    ko: 'Bech32 / Base58 인코딩 주소를 분해하여 분석',
    en: 'Decompose and analyze Bech32 / Base58 encoded addresses',
    ja: 'Bech32 / Base58エンコーディングアドレスを分解・分析',
  },
  'tx-broadcast': {
    ko: '서명된 TX hex를 비트코인 네트워크에 전송',
    en: 'Broadcast signed TX hex to the Bitcoin network',
    ja: '署名済みTX hexをBitcoinネットワークに送信',
  },
  'opcode-ref': {
    ko: 'OP_DUP, OP_HASH160 등 스크립트 명령어 검색',
    en: 'Search OP_DUP, OP_HASH160 and other script opcodes',
    ja: 'OP_DUP, OP_HASH160等のスクリプト命令を検索',
  },
  'script-ide': {
    ko: '스크립트 작성, 단계별 실행, 스택 시각화',
    en: 'Write scripts, step-execute, visualize stack',
    ja: 'スクリプト作成、ステップ実行、スタック可視化',
  },
  'psbt-editor': {
    ko: 'PSBT를 디코딩하고 서명 상태를 확인',
    en: 'Decode PSBT and check signing status',
    ja: 'PSBTをデコードし署名状態を確認',
  },
  'lightning-decoder': {
    ko: 'BOLT11 인보이스의 금액, 만료, 경로 분석',
    en: 'Analyze BOLT11 invoice amount, expiry, routes',
    ja: 'BOLT11インボイスの金額、有効期限、ルート分析',
  },
};
