/**
 * 115學年度「管理探索二」第十六週互動教學主程式
 * 單元名稱：加密貨幣、區塊鏈基礎、Web3 與數位資產風險
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#d97706',
  drawingWidth: 3,

  // 1小時活動 (比特幣減半產量試算器)
  btcPreset: '2024_halving',

  // 2小時活動 (DeFi 年化與 5% 避險配置)
  allocPreset: 'standard_5pct',

  // 3小時遊戲 (Web3 數位資產防詐大挑戰)
  gameCurrentIndex: 0,
  gameScore: 0,

  // 3小時作業 (個人數位資產風險評估與 Web3 報告)
  homeworkData: {
    studentName: '',
    studentId: '',
    targetPlan: '',
    dim1Inventory: '',
    dim2CashFlow: '',
    dim3ReserveDebt: '',
    dim4FireRoadmap: '',
    conclusionGrade: 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initBtcHalvingLab();
  initCryptoAllocLab();
  initWeb3Game();
  initHomeworkForm();
  initKeyboardShortcuts();
  loadSavedHomework();
  populateQuickSelect();
  renderSlide();
});

// ---------------------- SLIDE PRESENTATION ENGINE ----------------------
function initSlidePresentation() {
  document.getElementById('btnPrevSlide')?.addEventListener('click', prevSlide);
  document.getElementById('btnNextSlide')?.addEventListener('click', nextSlide);
  document.getElementById('btnToggleNotes')?.addEventListener('click', toggleTeacherNotes);
  document.getElementById('btnToggleLang')?.addEventListener('click', toggleLanguage);
  document.getElementById('btnToggleFullscreen')?.addEventListener('click', toggleFullscreen);
  document.getElementById('btnToggleView')?.addEventListener('click', toggleViewMode);

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) {
    quickSelect.addEventListener('change', (e) => jumpToSlide(parseInt(e.target.value, 10)));
  }
}

function populateQuickSelect() {
  const select = document.getElementById('quickSlideSelect');
  if (!select) return;
  select.innerHTML = '';
  W16_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W16_SLIDES_DATA[APP_STATE.currentSlideIndex];
  if (!slide) return;
  const isZh = APP_STATE.lang === 'zh';

  const card = document.getElementById('slideStageCard');
  if (card) card.className = `slide-stage-card hour-${slide.hour}`;

  const numBadge = document.getElementById('slideNumBadge');
  if (numBadge) numBadge.textContent = `Slide ${String(slide.id).padStart(2, '0')} / 30`;

  const hourBadge = document.getElementById('slideHourBadge');
  if (hourBadge) hourBadge.textContent = isZh ? `第 ${slide.hour} 小時` : `Hour ${slide.hour}`;

  const catBadge = document.getElementById('slideCategoryBadge');
  if (catBadge) catBadge.textContent = isZh ? slide.category : (slide.categoryEn || slide.category);

  const titleEl = document.getElementById('slideTitle');
  if (titleEl) titleEl.textContent = isZh ? slide.title : (slide.titleEn || slide.title);

  const subtitleEl = document.getElementById('slideSubtitle');
  if (subtitleEl) subtitleEl.textContent = isZh ? slide.subtitle : (slide.subtitleEn || slide.subtitle);

  renderSlideVisual(slide);

  const takeawaysList = document.getElementById('slideTakeawaysList');
  if (takeawaysList) {
    const list = isZh ? slide.quickTakeaways : (slide.quickTakeawaysEn || slide.quickTakeaways);
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w16-primary, #d97706);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) {
    guideQuestion.textContent = slide.discussionPrompt || slide.discussionQuestion || '';
  }

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) {
    notesCore.textContent = slide.teachingNotes || slide.teacherNotes || '';
  }

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) {
    notesQuestions.textContent = slide.discussionPrompt || slide.discussionQuestion || '';
  }

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W16_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W16_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W16_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W16_SLIDES_DATA.length) {
    APP_STATE.currentSlideIndex = index;
    if (APP_STATE.viewMode === 'grid') toggleViewMode();
    renderSlide();
  }
}

function prevSlide() {
  if (APP_STATE.currentSlideIndex > 0) {
    APP_STATE.currentSlideIndex--;
    renderSlide();
  }
}

function nextSlide() {
  if (APP_STATE.currentSlideIndex < W16_SLIDES_DATA.length - 1) {
    APP_STATE.currentSlideIndex++;
    renderSlide();
  }
}

function toggleTeacherNotes() {
  APP_STATE.showTeacherNotes = !APP_STATE.showTeacherNotes;
  const drawer = document.getElementById('teacherNotesDrawer');
  const btn = document.getElementById('btnToggleNotes');
  drawer?.classList.toggle('collapsed', !APP_STATE.showTeacherNotes);
  btn?.classList.toggle('active', APP_STATE.showTeacherNotes);
}

function toggleLanguage() {
  APP_STATE.lang = APP_STATE.lang === 'zh' ? 'en' : 'zh';
  const langText = document.getElementById('langText');
  if (langText) langText.textContent = APP_STATE.lang === 'zh' ? 'EN' : '中文';
  document.querySelectorAll('[data-i18n-zh]').forEach(el => {
    el.textContent = APP_STATE.lang === 'zh' ? el.getAttribute('data-i18n-zh') : el.getAttribute('data-i18n-en');
  });
  renderSlide();
  if (APP_STATE.viewMode === 'grid') renderGridCards();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => console.warn(err));
  } else {
    document.exitFullscreen?.();
  }
}

function toggleViewMode() {
  APP_STATE.viewMode = APP_STATE.viewMode === 'deck' ? 'grid' : 'deck';
  const deckView = document.getElementById('deckViewport');
  const gridView = document.getElementById('gridViewport');
  const btn = document.getElementById('btnToggleView');

  if (APP_STATE.viewMode === 'grid') {
    if (deckView) deckView.style.display = 'none';
    if (gridView) {
      gridView.style.display = 'block';
      renderGridCards();
    }
    btn?.classList.add('active');
  } else {
    if (deckView) deckView.style.display = 'block';
    if (gridView) gridView.style.display = 'none';
    btn?.classList.remove('active');
  }
}

// ---------------------- VISUAL COMPONENT FACTORY ----------------------
function renderSlideVisual(slide) {
  const container = document.getElementById('slideVisualContainer');
  if (!container) return;
  const id = slide.id;

  switch(id) {
    case 1:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🪙 第十六週核心導論：Web3 與數位資產版圖</span>
            <span class="crypto-visual-tag">去中心化革命</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box highlight">
              <h6>1. 密碼學去中心化帳本</h6>
              <p>消弭對單一金融中介機構依賴，以分散式節點共識維護不可竄改的信任協議。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>2. 2,100萬枚稀缺黃金</h6>
              <p>中本聰數學抗通膨設計，區塊獎勵週期性減半，建立原生數位價值儲存載體。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>3. 智慧合約與資產所有權</h6>
              <p>從 Web2 巨頭數據壟斷邁向 Web3 個人主權，兼顧高爆發潛力與嚴格資安防禦。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>🛡️ 大一新鮮人核心學習承諾</h6>
            <p><strong>以科學理性看待金融科技變革：</strong>遠離盲目跟風投機與合約槓桿，深耕底層技術原理，嚴格落實「私鑰自主」與「5% 衛星避險配置」。</p>
          </div>
        </div>
      `;
      break;

    case 2:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🗺️ 第十六週 3 小時學習地圖與技能樹</span>
            <span class="crypto-visual-tag">漸進式學習</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box" style="border-top:3px solid #d97706;">
              <h6>第一小時：底層科技與稀缺基石</h6>
              <p>區塊鏈雜湊帳本 ‧ 比特幣減半經濟學 ‧ 以太坊智慧合約 ‧ 冷熱錢包私鑰管理</p>
              <div style="margin-top:6px;"><span class="crypto-badge badge-amber">Slide 01-10</span></div>
            </div>
            <div class="crypto-box" style="border-top:3px solid #0284c7;">
              <h6>第二小時：DeFi 生態與合規監管</h6>
              <p>AMM 做市無常損失 ‧ 穩定幣儲備 ‧ FTX 破產啟示 ‧ 台灣金管會 VASP 法遵</p>
              <div style="margin-top:6px;"><span class="crypto-badge badge-blue">Slide 11-20</span></div>
            </div>
            <div class="crypto-box" style="border-top:3px solid #8b5cf6;">
              <h6>第三小時：防詐防禦與資產配置</h6>
              <p>Telegram 防詐 SOP ‧ 5% 衛星避險試算 ‧ 合法牌照出入金 ‧ 4 大防身金律</p>
              <div style="margin-top:6px;"><span class="crypto-badge badge-purple">Slide 21-30</span></div>
            </div>
          </div>
          <div class="crypto-box highlight" style="margin-top:10px;">
            <p>🎯 <strong>貫穿全週三階段專屬實作：</strong>比特幣減半產量試算器 ➔ 5% 衛星配置壓力測試 ➔ Web3 防詐大挑戰與四維度實務報告！</p>
          </div>
        </div>
      `;
      break;

    case 3:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">⛓️ 什麼是區塊鏈？去中心化分散式帳本架構</span>
            <span class="crypto-visual-tag">技術核心</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box">
              <h6>區塊鏈核心三大要素</h6>
              <p><strong>1. 區塊結構：</strong>包含交易數據、時間戳記與前一區塊雜湊值（Previous Hash）。</p>
              <p><strong>2. 密碼學雜湊（SHA-256）：</strong>單向雪崩效應，任何微小竄改即導致整條鏈失效。</p>
              <p><strong>3. 分散式節點：</strong>全球成千上萬節點獨立維護完整帳本，無單點故障崩潰之虞。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>中心化 vs. 去中心化比較</h6>
              <table style="width:100%; font-size:0.75rem; border-collapse:collapse; margin-top:4px;">
                <tr style="border-bottom:1px solid #cbd5e1;"><th>維度</th><th>傳統銀行 (中心化)</th><th>公有區塊鏈 (去中心化)</th></tr>
                <tr><td><strong>記帳權</strong></td><td>單一銀行伺服器</td><td>全網節點共識驗證</td></tr>
                <tr><td><strong>審查機制</strong></td><td>可凍結、可人工竄改</td><td>代碼即法律 (Code is Law)</td></tr>
                <tr><td><strong>清算速度</strong></td><td>跨國需 2-5 個工作天</td><td>數秒至 10 分鐘全天候</td></tr>
              </table>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>💡 關鍵洞察</h6>
            <p>區塊鏈不是單純的虛擬幣，而是解決人類「跨主體互信成本」的底層數學工程！</p>
          </div>
        </div>
      `;
      break;

    case 4:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🪙 比特幣 (BTC) 的誕生：2,100 萬枚數位黃金</span>
            <span class="crypto-visual-tag">中本聰白皮書</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box">
              <h6>誕生背景與哲學初衷 (2008)</h6>
              <p>2008 年雷曼兄弟倒閉引發全球金融海嘯，各國央行實施無底線 QE 貨幣放水，嚴重稀釋民眾實質購買力。</p>
              <p>中本聰在創世區塊刻下：<em>「The Times 03/Jan/2009 Chancellor on brink of second bailout for banks」</em>，抗議法幣通膨。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>比特幣三大絕對稀缺屬性</h6>
              <p><strong>1. 總量恆定鎖死：</strong>代碼硬性規範最大上限 2,100 萬枚，任何人無法增發。</p>
              <p><strong>2. 產量週期減半：</strong>每 21 萬個區塊（約 4 年）產出減半，通膨率逐步收斂歸零。</p>
              <p><strong>3. 數位攜帶性：</strong>無需物理金庫，僅憑 12 組助記詞即可攜帶無上限價值跨越國界。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>📊 <strong>黃金 vs 比特幣：</strong>黃金年增產約 1.5%-2.0%；2024 年減半後，比特幣年化通膨率降至約 0.83%，已正式超越黃金之稀缺硬度！</p>
          </div>
        </div>
      `;
      break;

    case 5:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">⏳ 比特幣減半機制 (Halving) 與產量減半經濟學</span>
            <span class="crypto-visual-tag">4 年週期</span>
          </div>
          <div class="crypto-grid-4">
            <div class="crypto-box">
              <h6>第 1 次 (2012)</h6>
              <p>50 ➔ <strong>25 BTC</strong></p>
              <p style="font-size:0.72rem; color:#64748b;">日產 3,600 枚</p>
            </div>
            <div class="crypto-box">
              <h6>第 2 次 (2016)</h6>
              <p>25 ➔ <strong>12.5 BTC</strong></p>
              <p style="font-size:0.72rem; color:#64748b;">日產 1,800 枚</p>
            </div>
            <div class="crypto-box">
              <h6>第 3 次 (2020)</h6>
              <p>12.5 ➔ <strong>6.25 BTC</strong></p>
              <p style="font-size:0.72rem; color:#64748b;">日產 900 枚</p>
            </div>
            <div class="crypto-box highlight">
              <h6>第 4 次 (2024.4)</h6>
              <p>6.25 ➔ <strong>3.125 BTC</strong></p>
              <p style="font-size:0.72rem; color:#b45309;"><strong>日產僅 450 枚！</strong></p>
            </div>
          </div>
          <div class="crypto-grid-2" style="margin-top:10px;">
            <div class="crypto-box">
              <h6>供給端震撼 (Supply Shock)</h6>
              <p>礦工每日可拋售的全新比特幣由 900 枚腰斬至 450 枚，大幅減輕全球二級市場的結構性拋售壓力。</p>
            </div>
            <div class="crypto-box safe">
              <h6>通膨率指標對照</h6>
              <p>全球美元平均通膨：約 2.5% - 3.5%<br>黃金年開採膨脹：約 1.6%<br><strong>比特幣 2024 減半後：僅約 0.83%！</strong></p>
            </div>
          </div>
        </div>
      `;
      break;

    case 6:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🌐 以太坊 (Ethereum) 與智慧合約生態系</span>
            <span class="crypto-visual-tag">全球超級電腦</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box">
              <h6>比特幣 vs. 以太坊定位差異</h6>
              <p><strong>比特幣 (BTC)：</strong>聚焦於「分散式記帳與價值儲存」，如同數位黃金，腳本語言功能極簡保證安全。</p>
              <p><strong>以太坊 (ETH)：</strong>圖靈完備的全球分散式虛擬機（EVM），可部署運行各類「智慧合約（Smart Contracts）」。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>智慧合約 (Smart Contracts) 特性</h6>
              <p><strong>1. 自動履約：</strong>條件一旦滿足（If-Then），代碼自動執行轉帳或邏輯，無人可毀約。</p>
              <p><strong>2. 去中心化應用 (DApps)：</strong>借貸、去中心化交易所、鏈上遊戲與治理投票完全透明。</p>
              <p><strong>3. Gas Fee 機制：</strong>調用合約需消耗 ETH 作為網路運算礦工費，防止惡意無限迴圈攻擊。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>🚀 應用範疇</h6>
            <p>以太坊開創了 DeFi、NFT 與 DAO 的浩瀚宇宙，使區塊鏈從「傳送代幣」躍升為「可程式化金融（Programmable Finance）」。</p>
          </div>
        </div>
      `;
      break;

    case 7:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🔄 Web1 ➔ Web2 ➔ Web3 典範演進史</span>
            <span class="crypto-visual-tag">產權革命</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box">
              <h6>Web 1.0 (1990-2004)</h6>
              <p><strong>唯讀模式 (Read)</strong></p>
              <p>用戶被動瀏覽靜態網站（Yahoo, 網頁論壇），資訊單向流動，內容由少數站長產出。</p>
            </div>
            <div class="crypto-box">
              <h6>Web 2.0 (2004-現在)</h6>
              <p><strong>讀寫互動 (Read & Write)</strong></p>
              <p>社交平台盛行（FB, IG, YouTube），用戶自創內容，但數據所有權與廣告分潤被巨頭完全壟斷。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>Web 3.0 (未來現在進行式)</h6>
              <p><strong>讀寫擁有 (Read, Write & Own)</strong></p>
              <p>基於區塊鏈與代幣經濟，用戶掌握個人數位身分（DID）、數據所有權與創作真實價值分潤！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>✨ 關鍵轉移：從中心化平台轉移至用戶自主</h6>
            <p>在 Web2，你的帳號可能隨時被巨頭封禁銷毀；在 Web3，只要你擁有私鑰，鏈上數位資產永不被剝奪！</p>
          </div>
        </div>
      `;
      break;

    case 8:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">📊 實證數據：CoinMarketCap 與台灣金管會 VASP</span>
            <span class="crypto-visual-tag">數據調取</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box">
              <h6>CoinMarketCap / CoinGecko 觀測指標</h6>
              <p><strong>1. 全網總市值：</strong>衡量加密市場宏觀體量（目前約 2.5 兆美元級別）。</p>
              <p><strong>2. 比特幣市佔率 (BTC.D)：</strong>超過 50% 代表市場偏向避險，資金回流數位黃金。</p>
              <p><strong>3. 24小時流動性深度：</strong>過濾低流動性易被莊家操縱拉高倒貨之空氣幣。</p>
            </div>
            <div class="crypto-box safe">
              <h6>台灣金管會 VASP 法遵登記專區</h6>
              <p><strong>法源依據：</strong>洗錢防制法與虛擬資產平台業者指導原則。</p>
              <p><strong>合法名單查核：</strong>僅使用完成金管會洗錢防制聲明之本土業者（如 MAX, BitoPro）。</p>
              <p><strong>資產信託保護：</strong>用戶存入之新台幣法幣 100% 委託遠東商銀、凱基銀行等第三方信託保管。</p>
            </div>
          </div>
          <div class="crypto-box danger" style="margin-top:10px;">
            <h6>⚠️ 風險警示</h6>
            <p>非金管會登記之境外不知名平臺，發生捲款暴雷時台灣司法無法跨國求償，切莫因貪圖高息將資金置於險境！</p>
          </div>
        </div>
      `;
      break;

    case 9:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🔐 冷錢包 vs. 熱錢包：幣圈私鑰鐵律</span>
            <span class="crypto-visual-tag">資安防禦</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box highlight">
              <h6>熱錢包 (Hot Wallet) - 聯網便捷</h6>
              <p><strong>代表工具：</strong>MetaMask (小狐狸), Phantom, 交易所 APP。</p>
              <p><strong>特點優勢：</strong>隨時連網，適合日常小額 DApp 互動、NFT 鑄造與合約交互。</p>
              <p><strong>潛在風險：</strong>電腦中毒、木馬側錄、惡意釣魚授權可能導致帳戶瞬間被洗劫。</p>
            </div>
            <div class="crypto-box safe">
              <h6>冷錢包 (Cold Wallet) - 離線絕對安全</h6>
              <p><strong>代表工具：</strong>Ledger, Trezor, CoolWallet 硬體裝置。</p>
              <p><strong>特點優勢：</strong>私鑰在專用安全晶片離線生成，交易時需實體按鍵確認，徹底免疫網路黑客。</p>
              <p><strong>保管鐵律：</strong>純手工抄寫 12/24 助記詞於防潮防爆卡上，鎖入保險箱，絕不聯網。</p>
            </div>
          </div>
          <div class="crypto-box danger" style="margin-top:10px;">
            <h6>☠️ 助記詞大忌禁令</h6>
            <p><strong>切勿：</strong>手機截圖、存 Google Keep / 微信收藏、Email 寄給自己、向任何人透露！私鑰外洩 = 資產 100% 歸零！</p>
          </div>
        </div>
      `;
      break;

    case 10:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🎯 第一小時小結與專屬活動導引</span>
            <span class="crypto-visual-tag">階段檢核</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box safe">
              <h6>1. 區塊鏈與稀缺性</h6>
              <p>掌握去中心化分散記帳、SHA-256 雜湊與中本聰 2,100 萬枚數位黃金模型。</p>
            </div>
            <div class="crypto-box safe">
              <h6>2. 智慧合約與 Web3</h6>
              <p>理解以太坊 EVM 運作，從 Web2 數據壟斷走向 Web3 個人產權擁有權。</p>
            </div>
            <div class="crypto-box safe">
              <h6>3. 私鑰防身鐵律</h6>
              <p>深植「Not your keys, not your coins」，嚴格落實冷熱錢包分流與離線助記詞保管。</p>
            </div>
          </div>
          <div class="crypto-box highlight" style="margin-top:12px;">
            <h6>🚀 點擊下方專屬活動：比特幣減半產量與冷熱錢包資安評估計算器</h6>
            <p>親自操作 2024 第四次減半產量變化，精算全網日產出與年化通膨率，並檢視個人錢包資安評分！</p>
          </div>
        </div>
      `;
      break;

    case 11:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">📈 去中心化金融 (DeFi) 與 AMM 做市原理</span>
            <span class="crypto-visual-tag">金融創新</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box">
              <h6>自動化做市商：Uniswap 公式 $x \times y = k$</h6>
              <p>無需傳統訂單簿造市商，用戶將等值雙幣（如 ETH + USDC）存入流動性池提供流動性。</p>
              <p>常數乘積公式保證資產總量動態平衡，每筆交易自動扣除 0.3% 手續費回饋給流動性提供者（LP）。</p>
            </div>
            <div class="crypto-box danger">
              <h6>流動性挖礦的雙面刃：無常損失 (Impermanent Loss)</h6>
              <p>當雙幣市場價格劇烈脫鉤時，流動性池內的資產比例會被套利者動態調整。</p>
              <p>若計算退回法幣價值，提供流動性之淨收益往往低於單純 Buy & Hold 單幣！若收益無法彌補無常損失則實質虧損。</p>
            </div>
          </div>
          <div class="crypto-box highlight" style="margin-top:10px;">
            <p>⚠️ <strong>合約安全漏洞：</strong>DeFi 協議屢遭黑客透過「閃電貸（Flash Loan）」操縱價格預言機攻擊，投資需慎選通過正規審計之藍籌協議（如 Aave, Uniswap）。</p>
          </div>
        </div>
      `;
      break;

    case 12:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🎨 非同質化代幣 (NFT) 與數位資產產權</span>
            <span class="crypto-visual-tag">數位憑證</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box">
              <h6>同質化 vs. 非同質化</h6>
              <p><strong>FT (如 1 BTC)：</strong>彼此等值可互換，可任意分割為 0.001 顆。</p>
              <p><strong>NFT (如 ERC-721)：</strong>每個代幣均具備獨一無二 Token ID，不可被等價替代。</p>
            </div>
            <div class="crypto-box">
              <h6>真實賦能應用場景</h6>
              <p><strong>1. 數位藝術版權：</strong>鏈上記錄創作者原創證明，二手交易自動分潤。</p>
              <p><strong>2. 實體票券防偽：</strong>演唱會票券上鏈，杜絕黃牛偽造轉售。</p>
              <p><strong>3. 遊戲道具所有權：</strong>虛擬寶物跨平臺自由流通交易。</p>
            </div>
            <div class="crypto-box danger">
              <h6>炒作泡沫之警示</h6>
              <p>迷因頭像熱潮中，許多項目無實質應用，淪為「龐氏接盤遊戲」。投機退潮後流動性歸零，不可盲目追高！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>💡 <strong>核心價值：</strong>NFT 的革命性不在於昂貴的 JPG 圖片，而在於為數位世界創造了「不可偽造的物權憑證」！</p>
          </div>
        </div>
      `;
      break;

    case 13:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">💵 穩定幣 (Stablecoins) 經濟學：USDT/USDC vs. 演算法</span>
            <span class="crypto-visual-tag">法幣橋樑</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box safe">
              <h6>法定貨幣抵押型 (USDT / USDC)</h6>
              <p><strong>發行機制：</strong>用戶每存入 1 美元，發行商即在鏈上鑄造 1 顆穩定幣。</p>
              <p><strong>儲備資產：</strong>主要由美國短期國債、現金及回購協議支撐，流動性充足。</p>
              <p><strong>監管考驗：</strong>Tether (USDT) 審計透明度持續受質疑；Circle (USDC) 則積極迎合合規監管。</p>
            </div>
            <div class="crypto-box danger">
              <h6>演算法穩定幣 (Terra UST / Luna 死亡螺旋)</h6>
              <p><strong>運作機制：</strong>無實體資產抵押，僅靠 UST 與 Luna 雙幣套利與代碼供需動態平衡。</p>
              <p><strong>暴雷崩盤 (2022.5)：</strong>遭遇巨額擠兌脫鉤，引發惡性超發，數千億市值數日內歸零！</p>
              <p><strong>歷史警鐘：</strong>金融市場不存在憑空創造高收益且無抵押的永動機！</p>
            </div>
          </div>
          <div class="crypto-box highlight" style="margin-top:10px;">
            <p>🛡️ <strong>小資族避險指南：</strong>日常加密貨幣儲備首選受監管審計之合規法幣抵押型穩定幣，遠離任何高年化利息的複雜演算法代幣。</p>
          </div>
        </div>
      `;
      break;

    case 14:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">💥 重大歷史教訓：FTX 交易所倒閉事件 (2022)</span>
            <span class="crypto-visual-tag">黑天鵝警世</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box danger">
              <h6>FTX 帝國崩塌核心真相</h6>
              <p><strong>挪用客戶存款：</strong>創辦人 SBF 私自將數十億美元用戶託管資產轉移至旗下避險基金 Alameda Research 進行高槓桿投機。</p>
              <p><strong>虛偽資產負債表：</strong>以自家印製之空氣幣 FTT 作為高估值抵押品借貸，形成巨大資產黑洞。</p>
              <p><strong>連鎖擠兌清算：</strong>市場恐慌引發提款擠兌，短短 72 小時資金鏈斷裂，申請破產保護。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>全球加密金融產業之重大催化改變</h6>
              <p><strong>1. 儲備證明 (Proof of Reserves, PoR)：</strong>催生各大交易所必須提供默克爾樹鏈上資產公開證明。</p>
              <p><strong>2. 嚴格法幣信託隔離：</strong>主管機關明令禁止交易所挪用客戶資金，必須由第三方獨立銀行信託託管。</p>
              <p><strong>3. 去中心化錢包意識抬頭：</strong>投資人深刻認知到交易所非保險箱，大額資金應轉移至冷錢包自我保管。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>🔑 <strong>結論：</strong>中心化機構若缺乏監管與獨立審計，人性貪婪必將導致災難。資產自託管與合規監管是不可妥協的雙軌基石。</p>
          </div>
        </div>
      `;
      break;

    case 15:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">⚖️ 台灣 VASP 虛擬資產監管框架與洗錢防制</span>
            <span class="crypto-visual-tag">法遵合規</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box safe">
              <h6>1. 洗錢防制法規規範</h6>
              <p>依據「虛擬通貨平台及交易業務事業防制洗錢及打擊資恐辦法」，業者必須向金管會申報洗錢防制法遵聲明。</p>
            </div>
            <div class="crypto-box safe">
              <h6>2. 嚴格實名認證 (KYC)</h6>
              <p>開戶需經過雙證件審查、臉部活體辨識，並綁定本人同名之實體銀行帳戶，切斷非法金流洗錢管道。</p>
            </div>
            <div class="crypto-box safe">
              <h6>3. 業者自律與專法公會</h6>
              <p>2024 年台灣虛擬資產公會（VASP 公會）正式成立，推動資產上下架審查標準、用戶法幣隔離與專法立法。</p>
            </div>
          </div>
          <div class="crypto-box danger" style="margin-top:10px;">
            <h6>🚨 學生防範警示帳戶陷阱</h6>
            <p>切莫因賺取數千元蠅頭小利將個人交易所帳號借給他人使用！一旦涉入洗錢詐騙金流，本人將面臨刑事詐欺共犯起訴，全台銀行帳戶全數凍結！</p>
          </div>
        </div>
      `;
      break;

    case 16:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">⚠️ 加密貨幣投資四大核心風險解析</span>
            <span class="crypto-visual-tag">風險教育</span>
          </div>
          <div class="crypto-grid-4">
            <div class="crypto-box danger">
              <h6>1. 市場劇烈波動</h6>
              <p>無漲跌幅限制，熊市回撤常達 70%-90%，心理承受力考驗極大。</p>
            </div>
            <div class="crypto-box danger">
              <h6>2. 項目方跑路 (Rug Pull)</h6>
              <p>匿名團隊發行空氣迷因幣，吸納資金後抽乾流動性池捲款人間蒸發。</p>
            </div>
            <div class="crypto-box danger">
              <h6>3. 智慧合約漏洞</h6>
              <p>協議代碼未經嚴密審計遭黑客利用閃電貸搬空資金池。</p>
            </div>
            <div class="crypto-box danger">
              <h6>4. 私鑰遺失不可逆</h6>
              <p>忘記助記詞或硬體遺失，全球無任何客服或銀行能協助找回資產！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>🛡️ 大一新鮮人的防禦策略</h6>
            <p>「用虧得起的錢投資，絕不借貸開合約槓桿！」將高風險資產曝險壓低在 5% 以內，才是長期生存之道。</p>
          </div>
        </div>
      `;
      break;

    case 17:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🛡️ 合理配置數位資產：小資族 5%-10% 衛星避險戰術</span>
            <span class="crypto-visual-tag">核心與衛星</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box safe">
              <h6>核心資產 (Core) - 90% 至 95%</h6>
              <p><strong>標的：</strong>台灣 0050 ETF、全球指數 VT、高評級債券與緊急預備金。</p>
              <p><strong>目標：</strong>獲取人類經濟長期成長之複利報酬，確保本金穩健安全、生活無虞。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>衛星資產 (Satellite) - 5% 至 10%</h6>
              <p><strong>標的：</strong>僅限市值最大之流動性藍籌：比特幣 (BTC 70%) + 以太幣 (ETH 30%)。</p>
              <p><strong>目標：</strong>以極小比例博取新興科技非對稱爆發收益，即使遭遇黑天鵝亦絕不傷及財務根本！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>📊 <strong>非對稱收益魅力：</strong>5% 的比特幣若上漲 200%，整體報酬增厚 10%；若不幸歸零，95% 的核心資產只要一年 5.3% 報酬即可完全回本！</p>
          </div>
        </div>
      `;
      break;

    case 18:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🏛️ 全球現貨 ETF 里程碑：華爾街傳統資金全面進場</span>
            <span class="crypto-visual-tag">合規大爆發</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box highlight">
              <h6>美國 SEC 批准現貨 ETF (2024)</h6>
              <p>貝萊德（BlackRock IBIT）、富達（Fidelity FBTC）等發行之比特幣現貨 ETF 正式掛牌交易。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>降低傳統投資人門檻</h6>
              <p>普通股民無需自行管理複雜的冷錢包私鑰，即可透過既有證券帳戶合規買賣比特幣部位。</p>
            </div>
            <div class="crypto-box safe">
              <h6>機構級長線資金灌注</h6>
              <p>退休養老基金、保險機構與主權財富基金獲准將加密資產納入資產配置池，注入數千億美元深層流動性。</p>
            </div>
          </div>
          <div class="crypto-box" style="margin-top:10px; background:#f8fafc; border-left:4px solid #0284c7;">
            <p>🌟 <strong>歷史定調：</strong>現貨 ETF 的獲批代表比特幣正式從「邊陲極客玩具」蛻變為全球公認的「另類主流資產類別（Alternative Asset Class）」！</p>
          </div>
        </div>
      `;
      break;

    case 19:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🏛️ 央行數位貨幣 (CBDC) vs. 去中心化加密貨幣</span>
            <span class="crypto-visual-tag">主權與自由</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box">
              <h6>央行數位貨幣 (CBDC，如數位新台幣)</h6>
              <p><strong>發行主體：</strong>中央銀行直接背書發行，具備法定強制償付效力。</p>
              <p><strong>架構特點：</strong>高度中心化清算、結算速度極快、支援普惠金融與精準貨幣政策。</p>
              <p><strong>隱私議題：</strong>每一筆交易皆由政府央行完整追蹤掌握，無匿名性。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>去中心化加密貨幣 (BTC, ETH)</h6>
              <p><strong>發行主體：</strong>底層數學協議與分散式社群共識，無任何主權國家干預。</p>
              <p><strong>架構特點：</strong>去中心化、抗審查（Censorship Resistance）、跨境流通無障礙。</p>
              <p><strong>核心優勢：</strong>防範政府超發貨幣貶值之避險庇護所。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>🔄 <strong>未來格局：</strong>CBDC 將主導國家日常零售與批發清算支付；而比特幣等去中心化資產則扮演無國界數位黃金之儲值載體，互補共存。</p>
          </div>
        </div>
      `;
      break;

    case 20:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🎯 第二小時小結與專屬活動導引</span>
            <span class="crypto-visual-tag">階段檢核</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box safe">
              <h6>1. DeFi 與穩定幣機制</h6>
              <p>掌握 AMM 無常損失公式、USDC 儲備與演算法穩定幣暴雷之深刻教訓。</p>
            </div>
            <div class="crypto-box safe">
              <h6>2. 監管法遵與 ETF 里程碑</h6>
              <p>剖析 FTX 挪用資金危機、台灣金管會 VASP 法遵審查與美國現貨 ETF 合規浪潮。</p>
            </div>
            <div class="crypto-box safe">
              <h6>3. 5% 衛星避險心法</h6>
              <p>堅守 95% 大盤核心穩健防守，以 5% 藍籌衛星捕捉非對稱科技紅利。</p>
            </div>
          </div>
          <div class="crypto-box highlight" style="margin-top:12px;">
            <h6>🚀 點擊下方專屬活動：DeFi 年化收益風險與數位資產 5% 避險配置試算器</h6>
            <p>親自調整大盤與加密資產比率，模擬極端黑天鵝暴跌 80% 時之投組衝擊，驗證衛星配置之抗震力！</p>
          </div>
        </div>
      `;
      break;

    case 21:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🚨 大一新鮮人資安防禦：Telegram 與常見幣圈詐騙</span>
            <span class="crypto-visual-tag">防詐免疫力</span>
          </div>
          <div class="crypto-grid-4">
            <div class="crypto-box danger">
              <h6>1. 假冒官方客服私訊</h6>
              <p>宣稱帳戶被凍結或有異常，傳送假表單誘騙輸入 12 組助記詞。</p>
            </div>
            <div class="crypto-box danger">
              <h6>2. 假交易所殺豬盤</h6>
              <p>社交軟體帥哥美女熱心介紹高收益量化平臺，初期給出金，大額後凍結跑路。</p>
            </div>
            <div class="crypto-box danger">
              <h6>3. 釣魚惡意空投授權</h6>
              <p>免費發送不明 NFT 或代幣，誘導用戶點擊網頁並對智慧合約「無上限授權」。</p>
            </div>
            <div class="crypto-box danger">
              <h6>4. 私下場外現金 OTC</h6>
              <p>誘騙高價收幣或低價賣幣，給付詐騙贓款導致學生帳戶淪為洗錢警示戶！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>🛡️ 絕對防詐三大鐵則</h6>
            <p><strong>(1) 絕不洩漏助記詞；(2) 關閉 Telegram 陌生人私訊；(3) 堅持只在金管會合規本土平臺出入金！</strong></p>
          </div>
        </div>
      `;
      break;

    case 22:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🎓 大一新鮮人面對 Web3 時代三大核心素養</span>
            <span class="crypto-visual-tag">必備軟實力</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box highlight">
              <h6>1. 密碼學技術素養</h6>
              <p>理解非對稱加密、雜湊演算法與智慧合約邏輯。看懂項目白皮書與代幣模型，不被空洞口號蒙蔽。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>2. 資安操作防禦素養</h6>
              <p>養成冷熱錢包分流、開啟 2FA 硬體金鑰（如 YubiKey）、定期使用 Revoke.cash 撤銷合約授權之衛生習慣。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>3. 財務紀律與風控素養</h6>
              <p>深知金融沒有免費午餐，自律杜絕高倍期貨合約與情緒追高，具備長期主義資產配置思維。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>🌟 <strong>大學生格局：</strong>金融科技的勝負不在於短期暴賺，而在於「活得夠久」。建立這三大素養，你已超越市場 90% 的盲目投機客！</p>
          </div>
        </div>
      `;
      break;

    case 23:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🏢 區塊鏈在傳統金融的應用：現實世界資產代幣化 (RWA)</span>
            <span class="crypto-visual-tag">產業前沿</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box">
              <h6>什麼是 RWA (Real World Assets)？</h6>
              <p>將現實世界實體資產（如美國國債、房地產租金收益權、企業債券、碳權）轉化為區塊鏈上數位代幣憑證。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>RWA 核心優勢與效益</h6>
              <p><strong>1. 碎化投資門檻：</strong>上億元商業大樓可拆分為 10 美元代幣供全球投資。</p>
              <p><strong>2. 24/7 全天候即時結算：</strong>消弭傳統金融 3-5 日清算摩擦與跨國換匯成本。</p>
            </div>
            <div class="crypto-box safe">
              <h6>貝萊德 BUIDL 基金領航</h6>
              <p>華爾街巨頭 BlackRock 推出代幣化美債基金 BUIDL，市值迅速突破 5 億美元，宣告傳統金融與區塊鏈正式全面接軌！</p>
            </div>
          </div>
          <div class="crypto-box" style="margin-top:10px; background:#f0fdf4; border-left:4px solid #10b981;">
            <p>🚀 <strong>職涯啟發：</strong>掌握區塊鏈智能合約與傳統金融法律之複合型人才，將是外商投行與科技金融爭搶的頂級新星！</p>
          </div>
        </div>
      `;
      break;

    case 24:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">💳 幣圈出金/入金法幣 SOP：台灣合法交易所 KYC 驗證</span>
            <span class="crypto-visual-tag">合規實務</span>
          </div>
          <div class="crypto-grid-4">
            <div class="crypto-box">
              <h6>步驟 1：合規業者註冊</h6>
              <p>選定通過金管會洗錢防制聲明之本土交易所（如 BitoPro, MAX）。</p>
            </div>
            <div class="crypto-box">
              <h6>步驟 2：Lv.2 身分驗證</h6>
              <p>上傳雙證件、手持證件自拍與地址證明，確保本人真實開戶。</p>
            </div>
            <div class="crypto-box">
              <h6>步驟 3：綁定實體銀行</h6>
              <p>必須綁定「本人同名」之銀行實體帳戶，完成 1 元驗證轉帳。</p>
            </div>
            <div class="crypto-box highlight">
              <h6>步驟 4：網銀安全轉帳</h6>
              <p>僅透過綁定網銀入金；獲利出金直接返還本人實體帳戶，資金乾淨透明！</p>
            </div>
          </div>
          <div class="crypto-box danger" style="margin-top:10px;">
            <h6>⚠️ 絕對禁止：地下場外交易 (OTC)</h6>
            <p>切勿與陌生網友現金私下買賣虛擬幣！一旦收到詐團洗錢贓款，名下所有銀行帳戶立即列為「警示帳戶」凍結數年，後果不堪設想！</p>
          </div>
        </div>
      `;
      break;

    case 25:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🔍 實證數據調取：CoinGecko 專業指標實務查閱</span>
            <span class="crypto-visual-tag">數據洞察</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box">
              <h6>1. 全稀釋估值 (FDV) 陷阱</h6>
              <p><strong>市值 vs. FDV：</strong>若目前市值 1 億美元但 FDV 高達 20 億美元，代表未來有 95% 代幣即將解鎖釋放，早期創投必將瘋狂倒貨拋售！</p>
            </div>
            <div class="crypto-box">
              <h6>2. 流通量比率 (Circulating Ratio)</h6>
              <p>流通比例若低於 20%，籌碼高度集中在少數主力與項目方手中，極易被拉高出貨割韭菜。</p>
            </div>
            <div class="crypto-box">
              <h6>3. 交易量與深度 (Volume/Depth)</h6>
              <p>觀察主流交易所之委託單買賣掛單深度，缺乏足夠深度的次級幣種，賣出時將面臨巨大滑點折價。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>📈 <strong>大學生數據紀律：</strong>買入任何代幣前，花 10 分鐘在 CoinGecko 查閱其解鎖日程表（Vesting Schedule），即可避開 90% 籌碼割韭菜陷阱！</p>
          </div>
        </div>
      `;
      break;

    case 26:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">📜 大一新鮮人 Web3 與數位資產四大金律</span>
            <span class="crypto-visual-tag">終身守則</span>
          </div>
          <div class="crypto-grid-4">
            <div class="crypto-box highlight">
              <h6>第一金律：私鑰助記詞即身家</h6>
              <p>Not your keys, not your coins！助記詞純手工離線抄寫，永不上傳雲端，絕不透露給任何人！</p>
            </div>
            <div class="crypto-box highlight">
              <h6>第二金律：5% 衛星資產上限</h6>
              <p>數位資產曝險以 5%-10% 為絕對天花板，絕不開合約槓桿借貸，堅守本金安全！</p>
            </div>
            <div class="crypto-box highlight">
              <h6>第三金律：嚴選台灣合規牌照</h6>
              <p>只在金管會洗錢防制合規交易所出入金，堅決拒絕 Telegram 陌生人私下場外 OTC！</p>
            </div>
            <div class="crypto-box highlight">
              <h6>第四金律：弄懂白皮書再進場</h6>
              <p>投資源於對底層技術與數據模型之深刻理解，拒絕跟風追高任何無應用之空氣迷因幣！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>🏆 <strong>心態昇華：</strong>紀律是牛熊市中最堅固的鎧甲。遵守四大金律，讓科技創新成為你財富人生的助力而非滅頂之災！</p>
          </div>
        </div>
      `;
      break;

    case 27:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🧮 數位資產配置試算實例：5% 避險配置抗震模型</span>
            <span class="crypto-visual-tag">精算實證</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box safe">
              <h6>模擬設定：本金 100,000 元小資資產配置</h6>
              <p><strong>核心大盤 (95%)：</strong>95,000 元配置 0050 ETF（預期年化報酬率 8%）</p>
              <p><strong>衛星加密 (5%)：</strong>5,000 元配置主流比特幣 BTC</p>
            </div>
            <div class="crypto-box">
              <h6>情境一：牛市大爆發 (BTC 單年大漲 200%)</h6>
              <p>0050 獲利：95,000 × 8% = +7,600 元<br>BTC 獲利：5,000 × 200% = +10,000 元<br><strong>整體年度總報酬：+17,600 元 (總投組收益率達 17.6%)！</strong></p>
            </div>
          </div>
          <div class="crypto-grid-2" style="margin-top:8px;">
            <div class="crypto-box danger">
              <h6>情境二：熊市黑天鵝 (BTC 極端崩跌 80%)</h6>
              <p>0050 獲利：95,000 × 8% = +7,600 元<br>BTC 虧損：5,000 × -80% = -4,000 元<br><strong>整體年度總報酬：+3,600 元 (依然穩健獲利 3.6%)！</strong></p>
            </div>
            <div class="crypto-box highlight">
              <h6>非對稱數學真理</h6>
              <p>5% 衛星配置創造了「上行獲利無上限，下行虧損有限且被核心完全覆蓋」的非對稱優勢，這正是頂級避險基金的精髓！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 28:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🚀 Web3 數位資產與未來金融技術總整合</span>
            <span class="crypto-visual-tag">前瞻願景</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box">
              <h6>CeFi + DeFi 雙輪驅動</h6>
              <p>合規中心化金融提供高流動性出入金與託管保護；底層去中心化協議提供 24/7 透明清算與無國界結算。</p>
            </div>
            <div class="crypto-box">
              <h6>RWA 驅動百兆實體上鏈</h6>
              <p>傳統國債、黃金、私人信貸代幣化，打破全球資產流動性壁壘，重塑全球資本市場運作架構。</p>
            </div>
            <div class="crypto-box">
              <h6>主權監管與自由創新平衡</h6>
              <p>從洗錢防制、ETF 合規到央行 CBDC，加密金融正式告別野蠻生長，邁入成熟的體制化新紀元。</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>💡 時代召喚</h6>
            <p>身處歷史交匯點的大一同學，掌握跨越「傳統財會金融」與「密碼學區塊鏈」的雙雙技能，必將成為引領未來的核心棟樑！</p>
          </div>
        </div>
      `;
      break;

    case 29:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🗺️ 第十六週全景知識體系圖與觀念整合</span>
            <span class="crypto-visual-tag">知識網絡</span>
          </div>
          <div class="crypto-grid-3">
            <div class="crypto-box" style="border-left:4px solid #d97706;">
              <h6>第一小時：底層基石</h6>
              <p>SHA-256 雜湊帳本 ‧ BTC 2100萬枚 ‧ 4年減半經濟學 ‧ 以太坊 EVM ‧ Web3 產權 ‧ 離線冷錢包助記詞</p>
            </div>
            <div class="crypto-box" style="border-left:4px solid #0284c7;">
              <h6>第二小時：生態與法遵</h6>
              <p>Uniswap x*y=k ‧ 無常損失 ‧ 穩定幣儲備 ‧ FTX 破產警鐘 ‧ 台灣金管會 VASP ‧ 美國現貨 ETF</p>
            </div>
            <div class="crypto-box" style="border-left:4px solid #8b5cf6;">
              <h6>第三小時：防身與配置</h6>
              <p>Telegram 防詐 SOP ‧ 4 大防身金律 ‧ 5% 衛星避險試算 ‧ 合規牌照出入金 ‧ RWA 實體資產代幣化</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <p>🎓 <strong>通識精華昇華：</strong>從科技底層看懂其價值，從風險自律守護住財富。兼備科技前瞻與清醒理智，方為真正之財經探索者！</p>
          </div>
        </div>
      `;
      break;

    case 30:
      container.innerHTML = `
        <div class="crypto-visual-card">
          <div class="crypto-visual-header">
            <span class="crypto-visual-title">🏁 學習反思與第十七週預告：期末專案發表實戰</span>
            <span class="crypto-visual-tag">榮譽巔峰</span>
          </div>
          <div class="crypto-grid-2">
            <div class="crypto-box safe">
              <h6>第十六週學習成果驗收</h6>
              <p>恭喜同學們完整解鎖加密貨幣與 Web3 的浩瀚版圖！大家已具備辨識幣圈陷阱、操作合規平臺與精算 5% 衛星配置的扎實硬功！</p>
            </div>
            <div class="crypto-box highlight">
              <h6>下週震撼登場：第十七週期末專案發表</h6>
              <p><strong>題目：</strong>「期末專案發表實戰：財經簡報、商業企劃與總評量」</p>
              <p>各小組將登台進行 8 分鐘商業發表，接受業界標準審查，融合 17 週全方位商業探索之終極結晶！</p>
            </div>
          </div>
          <div class="crypto-box safe" style="margin-top:10px;">
            <h6>🏆 行動指南</h6>
            <p>請各組課後立即召開組務會議，整合簡報投影片與財務模型，準備在第十七週舞台上綻放屬於大一的耀眼光芒！</p>
          </div>
        </div>
      `;
      break;

    default:
      container.innerHTML = `<div class="crypto-visual-card"><div class="crypto-visual-header"><span class="crypto-visual-title">Slide ${id}: ${slide.title}</span></div><p>${slide.subtitle}</p></div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: BITCOIN HALVING LAB ----------------------

// ---------------------- 1 HOUR ACTIVITY: BITCOIN HALVING LAB ----------------------
function initBtcHalvingLab() {
  const lab = W16_ACTIVITIES_DATA.hour1Lab;
  if (!lab) return;

  const cycleSelect = document.getElementById('btcCycleSelect');
  const btcPriceInput = document.getElementById('btcPriceUsd');
  const coldRatioInput = document.getElementById('btcColdRatio');
  const use2FaInput = document.getElementById('btcUse2Fa');

  function calculateHalving() {
    const cycle = parseInt(cycleSelect?.value || '4', 10);
    const priceUsd = parseFloat(btcPriceInput?.value || '65000');
    const coldRatio = parseFloat(coldRatioInput?.value || '80');
    const use2Fa = use2FaInput?.value === 'yes';

    // Block reward based on cycle
    // cycle 1: 50 -> 25; cycle 2: 25 -> 12.5; cycle 3: 12.5 -> 6.25; cycle 4: 6.25 -> 3.125; cycle 5: 3.125 -> 1.5625
    let blockReward = 3.125;
    let cycleYear = "2024";
    if (cycle === 1) { blockReward = 25.0; cycleYear = "2012"; }
    else if (cycle === 2) { blockReward = 12.5; cycleYear = "2016"; }
    else if (cycle === 3) { blockReward = 6.25; cycleYear = "2020"; }
    else if (cycle === 4) { blockReward = 3.125; cycleYear = "2024"; }
    else if (cycle === 5) { blockReward = 1.5625; cycleYear = "2028 (預估)"; }

    const dailyBlocks = 144;
    const dailyMinedBtc = dailyBlocks * blockReward;
    const dailyValueUsd = dailyMinedBtc * priceUsd;
    const annualMinedBtc = dailyMinedBtc * 365;
    // rough circulating supply around cycle
    let circulating = 19700000;
    if (cycle === 1) circulating = 10500000;
    if (cycle === 2) circulating = 15750000;
    if (cycle === 3) circulating = 18375000;
    if (cycle === 4) circulating = 19700000;
    if (cycle === 5) circulating = 20350000;

    const inflationRate = (annualMinedBtc / circulating) * 100;

    // Security Score (0 - 100)
    let score = coldRatio * 0.7; // 70% from cold wallet ratio
    if (use2Fa) score += 30; // 30% from 2FA hardware

    // Outputs
    const outDailyBtc = document.getElementById('outDailyBtc');
    const outDailyValue = document.getElementById('outDailyValue');
    const outInflation = document.getElementById('outInflation');
    const outSecurityScore = document.getElementById('outSecurityScore');
    const outSecurityDiagnosis = document.getElementById('outSecurityDiagnosis');

    if (outDailyBtc) outDailyBtc.textContent = `${dailyMinedBtc.toLocaleString()} BTC / 日`;
    if (outDailyValue) outDailyValue.textContent = `$${(dailyValueUsd / 1000000).toFixed(1)} 百萬美元`;
    if (outInflation) outInflation.textContent = `${inflationRate.toFixed(2)}% / 年`;
    if (outSecurityScore) {
      outSecurityScore.textContent = `${Math.round(score)} 分 / 100`;
      outSecurityScore.style.color = score >= 80 ? '#059669' : (score >= 50 ? '#d97706' : '#dc2626');
    }

    if (outSecurityDiagnosis) {
      let advice = "";
      if (score >= 80) {
        advice = `<strong>🏆 頂級資安防禦 (得分: ${Math.round(score)}分)：</strong>你已將大部分資產離線置於冷錢包，並啟用硬體 2FA 驗證，徹底杜絕了黑客遠端木馬竊取的可能性。請確保護照與實體助記詞卡妥善存放於防潮保險箱。`;
      } else if (score >= 50) {
        advice = `<strong>⚠️ 中度資安警示 (得分: ${Math.round(score)}分)：</strong>你的資產有較大比例留存於熱錢包或交易所內。若遭遇交易所擠兌倒閉（如 FTX）或釣魚惡意授權，資產將面臨實質損失，建議將長期持倉轉移至冷錢包！`;
      } else {
        advice = `<strong>🚨 極高危險警報 (得分: ${Math.round(score)}分)：</strong>你幾乎全數依賴熱錢包且未啟用硬體保護！在幣圈如同「赤身漫步於森林」，極易因點擊釣魚連結或交易所暴雷而遭受毀滅性清空，請立即整改！`;
      }
      outSecurityDiagnosis.innerHTML = advice;
    }
  }

  [cycleSelect, btcPriceInput, coldRatioInput, use2FaInput].forEach(el => {
    el?.addEventListener('input', calculateHalving);
    el?.addEventListener('change', calculateHalving);
  });

  // Presets
  document.querySelectorAll('.btn-preset-btc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-btc').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pKey = e.target.getAttribute('data-preset');
      const preset = lab.presets[pKey];
      if (!preset) return;

      if (cycleSelect) cycleSelect.value = preset.cycle;
      if (btcPriceInput) btcPriceInput.value = preset.btcPriceUsd;
      if (coldRatioInput) coldRatioInput.value = preset.coldRatio;
      if (use2FaInput) use2FaInput.value = preset.use2FaHardware ? 'yes' : 'no';

      calculateHalving();
    });
  });

  calculateHalving();
}

// ==================== HOUR 2 LAB: DeFi 年化收益風險與 5% 避險配置試算器 ====================

// ---------------------- 2 HOUR ACTIVITY: CRYPTO ALLOCATION LAB ----------------------

// ---------------------- 2 HOUR ACTIVITY: CRYPTO ALLOCATION LAB ----------------------
function initCryptoAllocLab() {
  const lab = W16_ACTIVITIES_DATA.hour2Lab;
  if (!lab) return;

  const capitalInput = document.getElementById('allocCapital');
  const coreRatioInput = document.getElementById('allocCoreRatio');
  const coreReturnInput = document.getElementById('allocCoreReturn');
  const cryptoRatioInput = document.getElementById('allocCryptoRatio');
  const cryptoYieldInput = document.getElementById('allocCryptoYield');
  const scenarioSelect = document.getElementById('allocScenario');

  function calculateAlloc() {
    const capital = parseFloat(capitalInput?.value || '100000');
    let coreRatio = parseFloat(coreRatioInput?.value || '95');
    let cryptoRatio = parseFloat(cryptoRatioInput?.value || '5');
    const coreReturn = parseFloat(coreReturnInput?.value || '8.0');
    const cryptoYield = parseFloat(cryptoYieldInput?.value || '5.0');
    const scenario = scenarioSelect?.value || '-50%';

    // Auto balance
    const totalRatio = coreRatio + cryptoRatio;
    if (totalRatio !== 100 && totalRatio > 0) {
      // keep crypto, adjust core
      coreRatio = 100 - cryptoRatio;
      if (coreRatioInput) coreRatioInput.value = coreRatio;
    }

    const coreAmount = capital * (coreRatio / 100);
    const cryptoAmount = capital * (cryptoRatio / 100);

    // Core 1-year profit
    const coreProfit = coreAmount * (coreReturn / 100);

    // Crypto outcome based on scenario
    let scenarioPct = 0;
    if (scenario === '-80%') scenarioPct = -0.80;
    else if (scenario === '-50%') scenarioPct = -0.50;
    else if (scenario === '0%') scenarioPct = 0.0;
    else if (scenario === '+50%') scenarioPct = 0.50;
    else if (scenario === '+200%') scenarioPct = 2.00;

    const cryptoPriceProfit = cryptoAmount * scenarioPct;
    const cryptoYieldProfit = cryptoAmount * (cryptoYield / 100);
    const totalCryptoProfit = cryptoPriceProfit + cryptoYieldProfit;

    const totalNetProfit = coreProfit + totalCryptoProfit;
    const endPortfolioValue = capital + totalNetProfit;
    const netReturnPct = (totalNetProfit / capital) * 100;

    // Outputs
    const outTotalValue = document.getElementById('outAllocTotalValue');
    const outCoreGain = document.getElementById('outAllocCoreGain');
    const outCryptoGain = document.getElementById('outAllocCryptoGain');
    const outNetReturn = document.getElementById('outAllocNetReturn');
    const outAllocDiagnosis = document.getElementById('outAllocDiagnosis');

    if (outTotalValue) outTotalValue.textContent = `NT$ ${Math.round(endPortfolioValue).toLocaleString()} 元`;
    if (outCoreGain) outCoreGain.textContent = `+NT$ ${Math.round(coreProfit).toLocaleString()} 元`;
    if (outCryptoGain) {
      const sign = totalCryptoProfit >= 0 ? '+' : '';
      outCryptoGain.textContent = `${sign}NT$ ${Math.round(totalCryptoProfit).toLocaleString()} 元`;
      outCryptoGain.style.color = totalCryptoProfit >= 0 ? '#059669' : '#dc2626';
    }
    if (outNetReturn) {
      const sign = netReturnPct >= 0 ? '+' : '';
      outNetReturn.textContent = `${sign}${netReturnPct.toFixed(1)}%`;
      outNetReturn.style.color = netReturnPct >= 0 ? '#059669' : '#dc2626';
    }

    if (outAllocDiagnosis) {
      let advice = "";
      if (cryptoRatio <= 10) {
        if (netReturnPct >= 0) {
          advice = `<strong>🛡️ 穩健防禦成功 (加密曝險 ${cryptoRatio}%)：</strong>即便在選定情境下，由於核心大盤資產佔據 90% 以上防線，其穩健收益能充分覆蓋或大幅超越加密市場波動，體現了頂級「非對稱配置」之美！`;
        } else {
          advice = `<strong>⚠️ 輕微回撤：</strong>整體組合僅小幅波動，未對本金造成實質破壞，符合大一新鮮人耐受程度。`;
        }
      } else {
        advice = `<strong>🚨 高曝險警報 (加密曝險 ${cryptoRatio}%)：</strong>加密資產比例已超出理性小資族 10% 上限！當遭遇市場大跌時，核心收益將無法挽救總資本虧損，極易引發追高殺跌與本金永久損失，強烈建議調降至 5%！`;
      }
      outAllocDiagnosis.innerHTML = advice;
    }
  }

  [capitalInput, coreRatioInput, coreReturnInput, cryptoRatioInput, cryptoYieldInput, scenarioSelect].forEach(el => {
    el?.addEventListener('input', calculateAlloc);
    el?.addEventListener('change', calculateAlloc);
  });

  // Presets
  document.querySelectorAll('.btn-preset-alloc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-alloc').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pKey = e.target.getAttribute('data-preset');
      const preset = lab.presets[pKey];
      if (!preset) return;

      if (capitalInput) capitalInput.value = preset.totalCapital;
      if (coreRatioInput) coreRatioInput.value = preset.coreRatio;
      if (coreReturnInput) coreReturnInput.value = preset.coreReturn;
      if (cryptoRatioInput) cryptoRatioInput.value = preset.cryptoRatio;
      if (cryptoYieldInput) cryptoYieldInput.value = preset.cryptoDefiYield;
      if (scenarioSelect) scenarioSelect.value = preset.extremeScenario;

      calculateAlloc();
    });
  });

  calculateAlloc();
}

// ==================== HOUR 3 GAME: Web3 數位資產防詐大挑戰 ====================
let currentQuestionIndex = 0;
let userScore = 0;

function initWeb3Game() {
  const container = document.getElementById('web3GameContainer');
  if (!container) return;
  renderGameQuestion();
}

function renderGameQuestion() {
  const container = document.getElementById('web3GameContainer');
  if (!container) return;
  const questions = W16_ACTIVITIES_DATA.game;

  if (currentQuestionIndex >= questions.length) {
    // Game completed
    const pass = userScore >= 3;
    container.innerHTML = `
      <div style="text-align:center; padding: 24px;">
        <div style="font-size: 3rem; margin-bottom: 8px;">${pass ? '🏆' : '🛡️'}</div>
        <h3 style="color:${pass ? '#059669' : '#d97706'}; font-weight:900;">${pass ? '恭喜通關！榮獲 Web3 防詐榮譽達人' : '挑戰完成！請持續強化資安意識'}</h3>
        <p style="font-size:1.1rem; margin:12px 0;">你的總得分：<strong style="font-size:1.4rem; color:#d97706;">${userScore} / ${questions.length}</strong> 關</p>
        <p style="color:#64748b; font-size:0.92rem; max-width:540px; margin:0 auto 20px auto;">
          ${pass ? '太優秀了！你已徹底精通中本聰比特幣稀缺機制、冷熱錢包私鑰防禦、DeFi 無常損失風險與台灣金管會 VASP 出入金法遵！' : '請務必複習 Telegram 釣魚手法、助記詞離線手抄鐵則與 5% 避險配置，守護好你的每一分財富！'}
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartGame()" style="background:#d97706;">🔄 再次挑戰</button>
      </div>
    `;
    return;
  }

  const q = questions[currentQuestionIndex];
  container.innerHTML = `
    <div style="padding: 12px 18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #fed7aa; padding-bottom:8px; margin-bottom:12px;">
        <span style="font-weight:800; color:#b45309;">關卡 ${q.id} / ${questions.length}：${q.title}</span>
        <span style="font-size:0.85rem; font-weight:700; color:#64748b;">目前累積分數: ${userScore}</span>
      </div>
      <h4 style="color:#1e293b; font-size:1.05rem; margin-bottom:14px; line-height:1.5;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:10px;" id="gameOptionsContainer">
        ${q.options.map((opt, idx) => `
          <button class="game-opt-btn" onclick="submitGameAnswer(${idx})" style="
            text-align:left; padding:12px 16px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:0.9rem; cursor:pointer; transition:all 0.2s; color:#334155; line-height:1.4;
          " onmouseover="this.style.background='#fffbeb'; this.style.borderColor='#fde68a';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1';">
            <strong>${['A', 'B', 'C', 'D'][idx]}.</strong> ${opt}
          </button>
        `).join('')}
      </div>
      <div id="gameExplanationBox" style="display:none; margin-top:14px; padding:12px; border-radius:8px; font-size:0.88rem; line-height:1.5;"></div>
      <div id="gameNextBtnRow" style="display:none; margin-top:14px; text-align:right;">
        <button class="btn-nav-step btn-primary-step" onclick="nextGameQuestion()" style="background:#d97706;">下一關 ▶</button>
      </div>
    </div>
  `;
}

function submitGameAnswer(selectedIdx) {
  const q = W16_ACTIVITIES_DATA.game[currentQuestionIndex];
  const isCorrect = selectedIdx === q.correct;
  if (isCorrect) userScore++;

  const optButtons = document.querySelectorAll('#gameOptionsContainer button');
  optButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.style.background = '#dcfce7';
      btn.style.borderColor = '#86efac';
      btn.style.color = '#166534';
      btn.innerHTML += ' <strong>✓ 正確解答</strong>';
    } else if (idx === selectedIdx) {
      btn.style.background = '#fee2e2';
      btn.style.borderColor = '#fca5a5';
      btn.style.color = '#991b1b';
      btn.innerHTML += ' <strong>✗ 選擇此項</strong>';
    }
  });

  const expBox = document.getElementById('gameExplanationBox');
  if (expBox) {
    expBox.style.display = 'block';
    expBox.style.background = isCorrect ? '#ecfdf5' : '#fff1f2';
    expBox.style.border = `1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}`;
    expBox.style.color = isCorrect ? '#065f46' : '#9f1239';
    expBox.innerHTML = `<strong>${isCorrect ? '🎯 答對了！' : '💡 觀念解析：'}</strong> ${q.explanation}`;
  }

  const nextBtnRow = document.getElementById('gameNextBtnRow');
  if (nextBtnRow) nextBtnRow.style.display = 'block';
}

function nextGameQuestion() {
  currentQuestionIndex++;
  renderGameQuestion();
}

function restartGame() {
  currentQuestionIndex = 0;
  userScore = 0;
  renderGameQuestion();
}

// ---------------------- 3 HOUR HOMEWORK SYSTEM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Inventory', 'hwDim2CashFlow', 'hwDim3ReserveDebt', 'hwDim4FireRoadmap', 'hwConclusionGrade', 'hwDecisionSummary'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', saveHomeworkToLocal);
      el.addEventListener('change', saveHomeworkToLocal);
    }
  });
}

function saveHomeworkToLocal() {
  APP_STATE.homeworkData = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    targetPlan: document.getElementById('hwTargetPlan')?.value || '',
    dim1Inventory: document.getElementById('hwDim1Inventory')?.value || '',
    dim2CashFlow: document.getElementById('hwDim2CashFlow')?.value || '',
    dim3ReserveDebt: document.getElementById('hwDim3ReserveDebt')?.value || '',
    dim4FireRoadmap: document.getElementById('hwDim4FireRoadmap')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('W16_HOMEWORK_DATA', JSON.stringify(APP_STATE.homeworkData));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W16_HOMEWORK_DATA');
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = d.studentName || '';
    if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = d.studentId || '';
    if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = d.targetPlan || '';
    if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = d.dim1Inventory || '';
    if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = d.dim2CashFlow || '';
    if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = d.dim3ReserveDebt || '';
    if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = d.dim4FireRoadmap || '';
    if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = d.conclusionGrade || 'A+';
    if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = d.decisionSummary || '';
  } catch (e) {
    console.warn('Failed to load homework data', e);
  }
}

window.loadHomeworkTemplate = function() {
  const tpl = W16_ACTIVITIES_DATA.homeworkTemplate;
  if (!tpl) return;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = '林宥廷';
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = 'B11307116';
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = tpl.title || '大一小資族 5% 數位資產衛星配置與冷錢包資安實踐計畫';
  if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = tpl.dim1 || '';
  if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = tpl.dim2 || '';
  if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = tpl.dim3 || '';
  if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = tpl.dim4 || '';
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = 'A+ (全面且具備實戰避險可行性)';
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = '堅守 Not your keys not your coins 鐵律，以 5% 衛星非對稱配置捕捉 Web3 創新紅利，拒絕場外黑產，合規落實大專生財富安全！';
  saveHomeworkToLocal();
};

window.exportHomeworkMd = function() {
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const id = document.getElementById('hwStudentId')?.value || '未填寫';
  const plan = document.getElementById('hwTargetPlan')?.value || '未填寫';
  const dim1 = document.getElementById('hwDim1Inventory')?.value || '';
  const dim2 = document.getElementById('hwDim2CashFlow')?.value || '';
  const dim3 = document.getElementById('hwDim3ReserveDebt')?.value || '';
  const dim4 = document.getElementById('hwDim4FireRoadmap')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 115學年度「管理探索二」第十六週課堂實務作業
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、區塊鏈去中心化底層特質與比特幣減半機制深度剖析 (25%)
${dim1}

### 二、冷熱錢包私鑰管理準則與 2022 FTX 倒閉事件風控反思 (25%)
${dim2}

### 三、5% 數位資產衛星配置模型試算與極端行情壓力測試 (25%)
${dim3}

### 四、台灣合法交易所出入金 SOP 與個人 Web3 4 大防詐金律實踐 (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十六週作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 16,
    topic: '加密貨幣區塊鏈基礎Web3與數位資產風險',
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    targetPlan: document.getElementById('hwTargetPlan')?.value || '',
    dim1Inventory: document.getElementById('hwDim1Inventory')?.value || '',
    dim2CashFlow: document.getElementById('hwDim2CashFlow')?.value || '',
    dim3ReserveDebt: document.getElementById('hwDim3ReserveDebt')?.value || '',
    dim4FireRoadmap: document.getElementById('hwDim4FireRoadmap')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || '',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W16_作業_${data.studentId || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------------------- GRID VIEWPORT ----------------------
function initGridOverview() {
  document.querySelectorAll('.tab-hour-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-hour-filter').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const h = e.currentTarget.getAttribute('data-hour');
      renderGridCards(h, document.getElementById('gridSearchInput')?.value || '');
    });
  });

  document.getElementById('gridSearchInput')?.addEventListener('input', (e) => {
    const activeTab = document.querySelector('.tab-hour-filter.active');
    const h = activeTab ? activeTab.getAttribute('data-hour') : 'all';
    renderGridCards(h, e.target.value);
  });
}

function renderGridCards(filterHour = 'all', query = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;
  const isZh = APP_STATE.lang === 'zh';
  const q = query.trim().toLowerCase();

  let filtered = W16_SLIDES_DATA.filter(s => {
    if (filterHour !== 'all' && String(s.hour) !== String(filterHour)) return false;
    if (q) {
      const notes = s.teachingNotes || s.teacherNotes || '';
      const matchZh = s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || notes.toLowerCase().includes(q);
      const matchEn = (s.titleEn || '').toLowerCase().includes(q) || (s.categoryEn || '').toLowerCase().includes(q);
      return matchZh || matchEn;
    }
    return true;
  });

  container.innerHTML = filtered.map(s => {
    const notes = s.teachingNotes || s.teacherNotes || '';
    return `
    <div class="slide-grid-card hour-${s.hour}" onclick="jumpToSlide(${s.id - 1})">
      <div class="grid-card-header">
        <span class="badge-num">Slide ${String(s.id).padStart(2, '0')}</span>
        <span class="badge-cat">${isZh ? s.category : (s.categoryEn || s.category)}</span>
      </div>
      <h5 class="grid-card-title">${isZh ? s.title : (s.titleEn || s.title)}</h5>
      <p class="grid-card-snippet">${notes.slice(0, 70)}...</p>
    </div>
  `;
  }).join('');
}

// ---------------------- DRAWING CANVAS ----------------------
function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  const btnToggle = document.getElementById('btnToggleDrawing');
  const toolbar = document.getElementById('drawingToolbar');
  if (!canvas || !toolbar) return;

  btnToggle?.addEventListener('click', () => {
    APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
    canvas.classList.toggle('active', APP_STATE.isDrawingActive);
    toolbar.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    btnToggle.classList.toggle('active', APP_STATE.isDrawingActive);
    if (APP_STATE.isDrawingActive) resizeCanvas();
  });

  window.addEventListener('resize', resizeCanvas);

  let isDrawing = false;
  let ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  document.getElementById('btnToolPen')?.addEventListener('click', () => {
    APP_STATE.drawingTool = 'pen';
    APP_STATE.drawingWidth = 3;
    setActiveDrawBtn('btnToolPen');
  });

  document.getElementById('btnToolHighlighter')?.addEventListener('click', () => {
    APP_STATE.drawingTool = 'highlighter';
    APP_STATE.drawingWidth = 16;
    setActiveDrawBtn('btnToolHighlighter');
  });

  document.querySelectorAll('.btn-color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-color-dot').forEach(d => d.classList.remove('active'));
      e.currentTarget.classList.add('active');
      APP_STATE.drawingColor = e.currentTarget.getAttribute('data-color');
    });
  });

  document.getElementById('btnToolClear')?.addEventListener('click', () => {
    clearDrawingCanvas(true);
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineWidth = APP_STATE.drawingWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (APP_STATE.drawingTool === 'highlighter') {
      ctx.strokeStyle = APP_STATE.drawingColor + '55';
    } else {
      ctx.strokeStyle = APP_STATE.drawingColor;
    }
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });
}

function setActiveDrawBtn(btnId) {
  ['btnToolPen', 'btnToolHighlighter'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  document.getElementById(btnId)?.classList.add('active');
}

function clearDrawingCanvas(force = true) {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------------------- KEYBOARD SHORTCUTS ----------------------
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      toggleTeacherNotes();
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleViewMode();
    } else if (e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      document.getElementById('btnToggleDrawing')?.click();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

// ---------------------- MODAL HELPERS ----------------------
window.openModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
};

// ---------------------- 3 HOUR HOMEWORK SYSTEM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Inventory', 'hwDim2CashFlow', 'hwDim3ReserveDebt', 'hwDim4FireRoadmap', 'hwConclusionGrade', 'hwDecisionSummary'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', saveHomeworkToLocal);
      el.addEventListener('change', saveHomeworkToLocal);
    }
  });
}

function saveHomeworkToLocal() {
  APP_STATE.homeworkData = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    targetPlan: document.getElementById('hwTargetPlan')?.value || '',
    dim1Inventory: document.getElementById('hwDim1Inventory')?.value || '',
    dim2CashFlow: document.getElementById('hwDim2CashFlow')?.value || '',
    dim3ReserveDebt: document.getElementById('hwDim3ReserveDebt')?.value || '',
    dim4FireRoadmap: document.getElementById('hwDim4FireRoadmap')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('W16_HOMEWORK_DATA', JSON.stringify(APP_STATE.homeworkData));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W16_HOMEWORK_DATA');
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = d.studentName || '';
    if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = d.studentId || '';
    if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = d.targetPlan || '';
    if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = d.dim1Inventory || '';
    if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = d.dim2CashFlow || '';
    if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = d.dim3ReserveDebt || '';
    if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = d.dim4FireRoadmap || '';
    if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = d.conclusionGrade || 'A+';
    if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = d.decisionSummary || '';
  } catch (e) {
    console.warn('Failed to load homework data', e);
  }
}

window.loadHomeworkTemplate = function() {
  const tpl = W16_ACTIVITIES_DATA.homeworkTemplate;
  if (!tpl) return;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = '林宥廷';
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = 'B11307116';
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = tpl.title || '大一小資族 5% 數位資產衛星配置與冷錢包資安實踐計畫';
  if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = tpl.dim1 || '';
  if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = tpl.dim2 || '';
  if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = tpl.dim3 || '';
  if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = tpl.dim4 || '';
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = 'A+ (全面且具備實戰避險可行性)';
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = '堅守 Not your keys not your coins 鐵律，以 5% 衛星非對稱配置捕捉 Web3 創新紅利，拒絕場外黑產，合規落實大專生財富安全！';
  saveHomeworkToLocal();
};

window.exportHomeworkMd = function() {
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const id = document.getElementById('hwStudentId')?.value || '未填寫';
  const plan = document.getElementById('hwTargetPlan')?.value || '未填寫';
  const dim1 = document.getElementById('hwDim1Inventory')?.value || '';
  const dim2 = document.getElementById('hwDim2CashFlow')?.value || '';
  const dim3 = document.getElementById('hwDim3ReserveDebt')?.value || '';
  const dim4 = document.getElementById('hwDim4FireRoadmap')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 115學年度「管理探索二」第十六週課堂實務作業
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、區塊鏈去中心化底層特質與比特幣減半機制深度剖析 (25%)
${dim1}

### 二、冷熱錢包私鑰管理準則與 2022 FTX 倒閉事件風控反思 (25%)
${dim2}

### 三、5% 數位資產衛星配置模型試算與極端行情壓力測試 (25%)
${dim3}

### 四、台灣合法交易所出入金 SOP 與個人 Web3 4 大防詐金律實踐 (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十六週作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 16,
    topic: '加密貨幣區塊鏈基礎Web3與數位資產風險',
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    targetPlan: document.getElementById('hwTargetPlan')?.value || '',
    dim1Inventory: document.getElementById('hwDim1Inventory')?.value || '',
    dim2CashFlow: document.getElementById('hwDim2CashFlow')?.value || '',
    dim3ReserveDebt: document.getElementById('hwDim3ReserveDebt')?.value || '',
    dim4FireRoadmap: document.getElementById('hwDim4FireRoadmap')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || '',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W16_作業_${data.studentId || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------------------- GRID VIEWPORT ----------------------
function initGridOverview() {
  document.querySelectorAll('.tab-hour-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-hour-filter').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const h = e.currentTarget.getAttribute('data-hour');
      renderGridCards(h, document.getElementById('gridSearchInput')?.value || '');
    });
  });

  document.getElementById('gridSearchInput')?.addEventListener('input', (e) => {
    const activeTab = document.querySelector('.tab-hour-filter.active');
    const h = activeTab ? activeTab.getAttribute('data-hour') : 'all';
    renderGridCards(h, e.target.value);
  });
}

function renderGridCards(filterHour = 'all', query = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;
  const isZh = APP_STATE.lang === 'zh';
  const q = query.trim().toLowerCase();

  let filtered = W16_SLIDES_DATA.filter(s => {
    if (filterHour !== 'all' && String(s.hour) !== String(filterHour)) return false;
    if (q) {
      const notes = s.teachingNotes || s.teacherNotes || '';
      const matchZh = s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || notes.toLowerCase().includes(q);
      const matchEn = (s.titleEn || '').toLowerCase().includes(q) || (s.categoryEn || '').toLowerCase().includes(q);
      return matchZh || matchEn;
    }
    return true;
  });

  container.innerHTML = filtered.map(s => {
    const notes = s.teachingNotes || s.teacherNotes || '';
    return `
    <div class="slide-grid-card hour-${s.hour}" onclick="jumpToSlide(${s.id - 1})">
      <div class="grid-card-header">
        <span class="badge-num">Slide ${String(s.id).padStart(2, '0')}</span>
        <span class="badge-cat">${isZh ? s.category : (s.categoryEn || s.category)}</span>
      </div>
      <h5 class="grid-card-title">${isZh ? s.title : (s.titleEn || s.title)}</h5>
      <p class="grid-card-snippet">${notes.slice(0, 70)}...</p>
    </div>
  `;
  }).join('');
}

// ---------------------- DRAWING CANVAS ----------------------
function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  const btnToggle = document.getElementById('btnToggleDrawing');
  const toolbar = document.getElementById('drawingToolbar');
  if (!canvas || !toolbar) return;

  btnToggle?.addEventListener('click', () => {
    APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
    canvas.classList.toggle('active', APP_STATE.isDrawingActive);
    toolbar.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    btnToggle.classList.toggle('active', APP_STATE.isDrawingActive);
    if (APP_STATE.isDrawingActive) resizeCanvas();
  });

  window.addEventListener('resize', resizeCanvas);

  let isDrawing = false;
  let ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  document.getElementById('btnToolPen')?.addEventListener('click', () => {
    APP_STATE.drawingTool = 'pen';
    APP_STATE.drawingWidth = 3;
    setActiveDrawBtn('btnToolPen');
  });

  document.getElementById('btnToolHighlighter')?.addEventListener('click', () => {
    APP_STATE.drawingTool = 'highlighter';
    APP_STATE.drawingWidth = 16;
    setActiveDrawBtn('btnToolHighlighter');
  });

  document.querySelectorAll('.btn-color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-color-dot').forEach(d => d.classList.remove('active'));
      e.currentTarget.classList.add('active');
      APP_STATE.drawingColor = e.currentTarget.getAttribute('data-color');
    });
  });

  document.getElementById('btnToolClear')?.addEventListener('click', () => {
    clearDrawingCanvas(true);
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineWidth = APP_STATE.drawingWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (APP_STATE.drawingTool === 'highlighter') {
      ctx.strokeStyle = APP_STATE.drawingColor + '55';
    } else {
      ctx.strokeStyle = APP_STATE.drawingColor;
    }
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });
}

function setActiveDrawBtn(btnId) {
  ['btnToolPen', 'btnToolHighlighter'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  document.getElementById(btnId)?.classList.add('active');
}

function clearDrawingCanvas(force = true) {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------------------- KEYBOARD SHORTCUTS ----------------------
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      toggleTeacherNotes();
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleViewMode();
    } else if (e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      document.getElementById('btnToggleDrawing')?.click();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

// ---------------------- MODAL HELPERS ----------------------
window.openModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
};
