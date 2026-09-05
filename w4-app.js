/**
 * 115學年度「管理探索二」第四週互動教學主程式
 * 單元名稱：股市入門與企業價值估算
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#ef4444',
  drawingWidth: 3,

  equityState: {
    selectedPreset: 'tsmc',
    shares: 100,
    price: 1000,
    quarterlyDiv: 4.0
  },

  valState: {
    activeCase: 0,
    marketCap: 1000,
    netIncome: 100,
    growthRate: 20
  },

  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  homeworkData: {
    studentName: '',
    studentId: '',
    companySummary: '',
    peAnalysis: '',
    roeAnalysis: '',
    actionPlan: '',
    conclusionGrade: 'Highly Undervalued',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initEquityActivity();
  initValuationActivity();
  initStockGame();
  initHomeworkForm();
  initKeyboardShortcuts();
  loadSavedHomework();
  populateQuickSelect();
  renderSlide();
});

function initSlidePresentation() {
  document.getElementById('btnPrevSlide')?.addEventListener('click', prevSlide);
  document.getElementById('btnNextSlide')?.addEventListener('click', nextSlide);
  document.getElementById('btnToggleNotes')?.addEventListener('click', toggleTeacherNotes);
  document.getElementById('btnToggleLang')?.addEventListener('click', toggleLanguage);
  document.getElementById('btnToggleFullscreen')?.addEventListener('click', toggleFullscreen);
  document.getElementById('btnToggleView')?.addEventListener('click', toggleViewMode);
}

function populateQuickSelect() {
  const select = document.getElementById('quickSlideSelect');
  if (!select) return;
  select.innerHTML = '';
  W4_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W4_SLIDES_DATA[APP_STATE.currentSlideIndex];
  if (!slide) return;
  const isZh = APP_STATE.lang === 'zh';

  const card = document.getElementById('slideStageCard');
  if (card) card.className = `slide-stage-card hour-${slide.hour}`;

  const numBadge = document.getElementById('slideNumBadge');
  if (numBadge) numBadge.textContent = `Slide ${String(slide.id).padStart(2, '0')} / 30`;

  const hourBadge = document.getElementById('slideHourBadge');
  if (hourBadge) hourBadge.textContent = isZh ? `第 ${slide.hour} 小時` : `Hour ${slide.hour}`;

  const catBadge = document.getElementById('slideCategoryBadge');
  if (catBadge) catBadge.textContent = isZh ? slide.category : slide.categoryEn;

  const titleEl = document.getElementById('slideTitle');
  if (titleEl) titleEl.textContent = isZh ? slide.title : slide.titleEn;

  const subtitleEl = document.getElementById('slideSubtitle');
  if (subtitleEl) subtitleEl.textContent = isZh ? slide.subtitle : slide.subtitleEn;

  renderSlideVisual(slide);

  const takeawaysList = document.getElementById('slideTakeawaysList');
  if (takeawaysList) {
    const list = isZh ? slide.quickTakeaways : (slide.quickTakeawaysEn || slide.quickTakeaways);
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W4_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W4_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W4_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W4_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W4_SLIDES_DATA.length - 1) {
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
    if (deckView) deckView.style.display = 'flex';
    if (gridView) gridView.style.display = 'none';
    btn?.classList.remove('active');
    renderSlide();
  }
}

function renderSlideVisual(slide) {
  const container = document.getElementById('slideVisualContainer');
  if (!container) return;
  const isZh = APP_STATE.lang === 'zh';
  const id = slide.id;

  switch (id) {
    case 1:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 股票本質：買股票到底是在買什麼？</h4>
          <span class="sub-tag">「價格是你付出的，價值是你獲得的」— 巴菲特</span>
        </div>
        <div class="equity-comparison-grid">
          <div class="equity-stat-card">
            <div class="e-icon">🏢</div>
            <h5>實質企業微型股權</h5>
            <div class="e-num">1 股 = 1 份權利</div>
            <p>享有公司獲利分紅、淨資產索償權與股東大會表決權</p>
          </div>
          <div class="equity-stat-card">
            <div class="e-icon">📊</div>
            <h5>TWSE 開戶人數</h5>
            <div class="e-num">突破 1,300 萬人</div>
            <p>年輕大一族群零股交易佔比成長超過 300%</p>
          </div>
        </div>
      </div>`;
      break;
    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔄 一級市場 IPO vs 二級市場撮合交易</h4>
          <span class="sub-tag">你的投資本金究竟流向何處？</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:8px; padding:12px;">
            <strong style="color:#1e40af;">🏛️ 一級市場 (Primary Market)</strong>
            <p style="font-size:0.78rem; color:#334155; margin-top:4px;">公司初次公開發行 (IPO) 或現金增資 (SPO)。資金直接流入公司帳戶，用於建廠研發擴產。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px;">
            <strong style="color:#166534;">📈 二級市場 (Secondary Market)</strong>
            <p style="font-size:0.78rem; color:#334155; margin-top:4px;">投資人之間的二手換手市場 (TWSE)。買進支付的款項流入前一位賣家，公司本體分文未得！</p>
          </div>
        </div>
      </div>`;
      break;
    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 股東四大法定基本權利</h4>
          <span class="sub-tag">公司法保障的股東身分神聖權益</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border-left:4px solid #2563eb; padding:8px 10px; font-size:0.8rem;">
            <strong>🗳️ 表決權 (Voting)</strong><br>股東會改選董監事、重大決策投票
          </div>
          <div style="background:#f8fafc; border-left:4px solid #10b981; padding:8px 10px; font-size:0.8rem;">
            <strong>💰 盈餘分紅權 (Dividends)</strong><br>分享公司稅後獲利之現金或股票股利
          </div>
          <div style="background:#f8fafc; border-left:4px solid #f59e0b; padding:8px 10px; font-size:0.8rem;">
            <strong>🛡️ 剩餘財產索償權</strong><br>清算破產時受償順位劣於銀行與債權人
          </div>
          <div style="background:#f8fafc; border-left:4px solid #8b5cf6; padding:8px 10px; font-size:0.8rem;">
            <strong>📑 查核財報權 (Inspection)</strong><br>依法審閱簽證財報與營業報告書
          </div>
        </div>
      </div>`;
      break;
    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 普通股 (Common) vs 特別股 (Preferred)</h4>
          <span class="sub-tag">獲利分紅與表決權利的取捨天秤</span>
        </div>
        <table class="jargon-table" style="font-size:0.75rem;">
          <thead>
            <tr><th>維度</th><th>普通股 (Common Stock)</th><th>特別股 (Preferred Stock)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>股息配發</strong></td><td>浮動，視董事會盈餘而定</td><td>固定約定殖利率 (如 4%)</td></tr>
            <tr><td><strong>清算順位</strong></td><td>最後順位 (承擔最高殘餘風險)</td><td>優先於普通股股東</td></tr>
            <tr><td><strong>表決權利</strong></td><td>享有完整一股一票表決權</td><td>通常無表決權 (純領息工具)</td></tr>
          </tbody>
        </table>
      </div>`;
      break;
    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⏱️ 臺灣證券交易所 (TWSE) 逐筆交易機制</h4>
          <span class="sub-tag">委託撮合原則：價格優先 ‧ 時間優先</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.8rem; line-height:1.6;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span style="color:#dc2626; font-weight:700;">🔴 市價單 (Market Order)</span>
            <span>不指定價格，保證立即成交，可能滑價</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span style="color:#2563eb; font-weight:700;">🔵 限價單 (Limit Order)</span>
            <span>指定最高買價或最低賣價，保護交易價格</span>
          </div>
          <div style="border-top:1px dashed #cbd5e1; padding-top:6px; font-size:0.75rem; color:#64748b;">
            委託有效度：ROD (當日有效)、IOC (立即成交否則取消)、FOK (全部成交否則取消)
          </div>
        </div>
      </div>`;
      break;
    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 台積電 (2330 / TSM) 全球股權結構拆解</h4>
          <span class="sub-tag">總發行股數 259.3 億股 ‧ 總市值突破 25 兆元</span>
        </div>
        <div class="equity-comparison-grid">
          <div class="equity-stat-card" style="border-left: 4px solid #2563eb;">
            <h5>🌐 外資法人持股</h5>
            <div class="e-num" style="color: #2563eb;">73.2%</div>
            <p>挪威主權基金、花旗託管、貝萊德、先鋒</p>
          </div>
          <div class="equity-stat-card" style="border-left: 4px solid #10b981;">
            <h5>🇹🇼 國發基金與散戶</h5>
            <div class="e-num" style="color: #10b981;">15.4%</div>
            <p>國發基金 6.38% + 本國 140 萬自然人散戶 9.0%</p>
          </div>
        </div>
      </div>`;
      break;
    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📱 盤中零股交易新制：大學生小資族首選</h4>
          <span class="sub-tag">最低門檻 1 股起跳，打破整張 1,000 股高牆</span>
        </div>
        <div style="display:flex; justify-content:space-around; background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
          <div>
            <div style="font-size:0.75rem; color:#64748b;">交易時段</div>
            <div style="font-size:1.1rem; font-weight:800; color:#166534;">09:10 - 13:30</div>
            <div style="font-size:0.7rem; color:#475569;">盤中即時撮合</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:#64748b;">撮合頻率</div>
            <div style="font-size:1.1rem; font-weight:800; color:#059669;">每 1 分鐘</div>
            <div style="font-size:0.7rem; color:#475569;">集合競價撮合</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:#64748b;">買台積電 1 股</div>
            <div style="font-size:1.1rem; font-weight:800; color:#2563eb;">僅需 1,000 元</div>
            <div style="font-size:0.7rem; color:#475569;">整張需 100 萬元</div>
          </div>
        </div>
      </div>`;
      break;
    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💵 現金股利 vs 📜 股票股利 財務本質</h4>
          <span class="sub-tag">真金白銀入袋 vs 企業保留盈餘擴充股本</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px;">
            <h5 style="color:#1e40af; font-size:0.85rem; margin-bottom:4px;">💵 現金股利 (配息)</h5>
            <p style="font-size:0.75rem; color:#475569;">公司直接撥付現金至戶頭。適合進入成熟穩健期、無大量資本支出之公用事業。</p>
          </div>
          <div style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:8px; padding:10px;">
            <h5 style="color:#9d174d; font-size:0.85rem; margin-bottom:4px;">📜 股票股利 (配股)</h5>
            <p style="font-size:0.75rem; color:#475569;">增發新股無償配發。公司保留現金用於高速擴產，但會使總股本膨脹稀釋 EPS。</p>
          </div>
        </div>
      </div>`;
      break;
    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 破解「填息」迷思：左手換右手的除權息真相</h4>
          <span class="sub-tag">除息參考價 = 前一日收盤價 - 每股現金股利</span>
        </div>
        <div style="background:#fff5f5; border:1px solid #fecaca; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:0.85rem; color:#991b1b; font-weight:700;">除息當天開盤，股價自動扣除配息金額！</div>
          <p style="font-size:0.75rem; color:#475569; margin-top:4px;">
            若股價沒有漲回除息前價位（未填息），投資人領到的股息本質上就是自己的本金！還要繳納所得稅與二代健保補充保費！
          </p>
        </div>
      </div>`;
      break;
    case 10:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🎉 第一小時課程里程碑達成</div>
        <h4>實戰演練：台積電 / 蘋果零股股利計算盤！</h4>
        <p>已掌握股票本質、一級與二級市場、台積電股權結構與零股新制。現在，請開啟計算盤，輸入持有股數！</p>
        <div class="milestone-actions">
          <button class="btn-launch-lab btn-h1" onclick="openModal('modalStockEquity')">
            <span>🎯</span> 開啟「零股股利與股權計算盤」
          </button>
        </div>
      </div>`;
      break;
    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 價格 (Price) vs 價值 (Value) 天秤模型</h4>
          <span class="sub-tag">巴菲特核心智慧：遠離市場短期狂躁，堅守內在價值</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; text-align:center;">
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:12px;">
            <div style="font-size:1.5rem;">🏷️</div>
            <h5 style="color:#b91c1c;">價格 (Price)</h5>
            <div style="font-size:0.75rem; color:#64748b;">你付出的一疊鈔票</div>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">由市場先生每日情緒與成交撮合決定</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px;">
            <div style="font-size:1.5rem;">💎</div>
            <h5 style="color:#15803d;">價值 (Value)</h5>
            <div style="font-size:0.75rem; color:#64748b;">你實質獲得的資產</div>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">由企業未來自由現金流折現決定</p>
          </div>
        </div>
      </div>`;
      break;
    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔍 本益比 (P/E Ratio) 的雙向解讀</h4>
          <span class="sub-tag">P/E = 每股市價 ÷ 每股盈餘 (EPS) ＝ 回本年限</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="background:#f8fafc; border-left:4px solid #2563eb; padding:8px 10px; font-size:0.78rem;">
            <strong>低本益比 (如 P/E < 10)</strong>：可能是市場低估超值貨，也可能是產業瀕臨淘汰的「價值陷阱 (Value Trap)」。
          </div>
          <div style="background:#f8fafc; border-left:4px solid #dc2626; padding:8px 10px; font-size:0.78rem;">
            <strong>高本益比 (如 P/E > 35)</strong>：可能是市場給予極高未來成長預期，也可能是情緒過熱的投機泡沫。
          </div>
        </div>
      </div>`;
      break;
    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧋 珍奶店 A vs. B 本益比 (P/E) 估值對照</h4>
          <span class="sub-tag">破解「絕對股價高低」的標籤價格偏誤</span>
        </div>
        <div class="boba-compare-matrix">
          <div class="boba-card boba-cheap">
            <h5>珍奶店 A (排隊老店)</h5>
            <div class="boba-pe">P/E = 10x</div>
            <span class="peg-badge">PEG = 0.50 (超值便宜)</span>
            <p>市值 1,000 萬 / 年賺 100 萬 / 年成長 20%</p>
          </div>
          <div class="boba-card boba-expensive">
            <h5>珍奶店 B (裝潢網美店)</h5>
            <div class="boba-pe">P/E = 30x</div>
            <span class="peg-badge">PEG = 3.00 (嚴重昂貴)</span>
            <p>市值 3,000 萬 / 年賺 100 萬 / 年成長 10%</p>
          </div>
        </div>
      </div>`;
      break;
    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 彼得林區 PEG 指標：平衡成長與估值</h4>
          <span class="sub-tag">PEG = (P/E) ÷ 預估獲利成長率 (G)</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px;">
            <strong style="color:#166534; font-size:0.8rem;">PEG < 0.75</strong>
            <div style="font-size:0.75rem; color:#059669; font-weight:700;">顯著低估便宜</div>
            <p style="font-size:0.68rem; color:#64748b;">成長動能遠超估值倍數</p>
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:8px;">
            <strong style="color:#1e40af; font-size:0.8rem;">0.75 ~ 1.25</strong>
            <div style="font-size:0.75rem; color:#2563eb; font-weight:700;">合理公允定價</div>
            <p style="font-size:0.68rem; color:#64748b;">估值如實反映市場成長預期</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:8px;">
            <strong style="color:#991b1b; font-size:0.8rem;">PEG > 1.25</strong>
            <div style="font-size:0.75rem; color:#dc2626; font-weight:700;">過度昂貴溢價</div>
            <p style="font-size:0.68rem; color:#64748b;">缺乏安全邊際，風險偏高</p>
          </div>
        </div>
      </div>`;
      break;
    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏢 股價淨值比 (P/B Ratio) 與適用邊界</h4>
          <span class="sub-tag">P/B = 每股市價 ÷ 每股淨值 (BVPS)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.82rem;">✅ 適用產業 (重資產型)</strong>
            <p style="font-size:0.74rem; color:#475569; margin-top:4px;">銀行金控、鋼鐵水泥、航運航太。其資產大部分為現金、放款、船舶或廠房，淨值具備清算參考價值。</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#991b1b; font-size:0.82rem;">❌ 失真產業 (輕資產型)</strong>
            <p style="font-size:0.74rem; color:#475569; margin-top:4px;">軟體生技、AI 演算法、IP 矽智財。核心價值為專利與研發人才，帳面淨值極低，P/B 參考性不足。</p>
          </div>
        </div>
      </div>`;
      break;
    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎣 高殖利率陷阱：賺了股息，賠了價差</h4>
          <span class="sub-tag">殖利率 = 股利 ÷ 股價 ➔ 股價暴跌會造成殖利率表面飆高的假象</span>
        </div>
        <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.3rem; font-weight:900; color:#c2410c;">表面領息 +8% ➔ 資本虧損 -25% ＝ 實質虧損 -17%！</div>
          <p style="font-size:0.76rem; color:#7c2d12; margin-top:4px;">
            景氣循環股（如航運、原物料）在獲利高峰大發股利，散戶衝進去搶息，隨後景氣反轉股價腰斬，多年無法回本。
          </p>
        </div>
      </div>`;
      break;
    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📑 三大財務報表連動架構</h4>
          <span class="sub-tag">損益表 ➔ 資產負債表 ➔ 現金流量表</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:8px;">
            <strong style="color:#1e40af; font-size:0.8rem;">1. 損益表</strong>
            <p style="font-size:0.7rem; color:#475569; margin-top:2px;">營收扣除營業成本，算出稅後淨利 (賺多少錢)</p>
          </div>
          <div style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:6px; padding:8px;">
            <strong style="color:#9d174d; font-size:0.8rem;">2. 資產負債表</strong>
            <p style="font-size:0.7rem; color:#475569; margin-top:2px;">淨利轉為保留盈餘，資產 ＝ 負債 ＋ 股東權益</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px;">
            <strong style="color:#166534; font-size:0.8rem;">3. 現金流量表</strong>
            <p style="font-size:0.7rem; color:#475569; margin-top:2px;">還原應收帳款，確認真金白銀流入 (生命線)</p>
          </div>
        </div>
      </div>`;
      break;
    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💎 巴菲特最愛指標：ROE 杜邦分析拆解</h4>
          <span class="sub-tag">ROE = 純益率 × 資產週轉率 × 權益乘數</span>
        </div>
        <div class="dupont-grid">
          <div class="dupont-col">
            <div class="d-title">淨利率 (Margin)</div>
            <div class="d-val">40.5%</div>
            <p>反映產品高毛利護城河</p>
          </div>
          <div class="dupont-col">
            <div class="d-title">資產週轉 (Turnover)</div>
            <div class="d-val">0.65次</div>
            <p>反映資產營運效率</p>
          </div>
          <div class="dupont-col">
            <div class="d-title">權益乘數 (Leverage)</div>
            <div class="d-val">1.42倍</div>
            <p>健康低負債槓桿</p>
          </div>
        </div>
      </div>`;
      break;
    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🩸 自由現金流 (FCF)：企業生死存亡的真血脈</h4>
          <span class="sub-tag">FCF = 營業活動現金流 - 資本支出 (CAPEX)</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.1rem; font-weight:800; color:#166534;">只有放進口袋的自由現金，才能發股利、買庫藏股、度過寒冬</div>
          <p style="font-size:0.75rem; color:#475569; margin-top:4px;">
            假帳公司可以用應收帳款做出虛假淨利，但唯有真金白銀的自由現金流騙不了人！
          </p>
        </div>
      </div>`;
      break;
    case 20:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🎉 第二小時課程里程碑達成</div>
        <h4>實戰演練：珍奶店 A vs. B 估值比較器！</h4>
        <p>已掌握本益比雙向解讀、彼得林區 PEG 與巴菲特 ROE 杜邦分析。現在開啟比較器，動手輸入數據！</p>
        <div class="milestone-actions">
          <button class="btn-launch-lab btn-h2" onclick="openModal('modalValuation')">
            <span>🎯</span> 開啟「珍奶店估值比較器」
          </button>
        </div>
      </div>`;
      break;
    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 巴菲特五大經濟護城河 (Economic Moats)</h4>
          <span class="sub-tag">抵禦對手瘋狂競爭、保護長期超額利潤的深水壕溝</span>
        </div>
        <div class="moats-grid">
          <div class="moat-box"><h5>🏷️ 無形資產</h5><p>可口可樂商標 / 輝達 CUDA / 專利</p></div>
          <div class="moat-box"><h5>🔄 轉換成本</h5><p>台積電先進製程代工 / 蘋果 iOS 生態</p></div>
          <div class="moat-box"><h5>🌐 網絡效應</h5><p>Visa 信用卡 / 微信 / 臉書社群</p></div>
          <div class="moat-box"><h5>🏭 成本優勢</h5><p>台積電極大化良率 / 沃爾瑪規模採購</p></div>
        </div>
      </div>`;
      break;
    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 葛拉漢安全邊際 (Margin of Safety)</h4>
          <span class="sub-tag">「建造能承受 30,000 磅卡車通過的橋樑，即使平時只有 10,000 磅卡車開過」</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:14px; text-align:center;">
          <div style="display:flex; justify-content:space-around; align-items:center;">
            <div style="background:#dbeafe; padding:8px 14px; border-radius:6px; font-weight:800; color:#1e40af;">內在真實價值 $100</div>
            <span style="font-size:1.5rem;">➔</span>
            <div style="background:#fee2e2; padding:8px 14px; border-radius:6px; font-weight:800; color:#dc2626;">打七折買進 $70</div>
          </div>
          <div style="font-size:0.8rem; color:#059669; font-weight:700; margin-top:8px;">
            這 30 元的差距就是「安全邊際」！能吸收未來的分析誤差、壞運氣與突發黑天鵝！
          </div>
        </div>
      </div>`;
      break;
    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🤡 認識「市場先生 (Mr. Market)」寓言</h4>
          <span class="sub-tag">每天敲你家大門報價的躁鬱症夥伴</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.82rem;">狂喜暴躁期 (極度樂觀)</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">報出荒謬昂貴價格想買你的股票。此時是理性投資人高價賣給他的良機！</p>
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.82rem;">憂鬱恐慌期 (極度悲觀)</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">報出不可思議的低價要賤賣股票給你。此時是理性投資人撿便宜的大好機會！</p>
          </div>
        </div>
      </div>`;
      break;
    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏭 資本支出 (CAPEX) 與折舊循環</h4>
          <span class="sub-tag">台積電每年資本支出 300 億美元的戰略防禦線</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.8rem; line-height:1.6;">
          <div style="font-weight:700; color:#1e293b; margin-bottom:4px;">先進晶圓製造 = 重資本高折舊賽局：</div>
          <p style="font-size:0.75rem; color:#475569;">
            買一台 EUV 極紫外光微影機需 50 億台幣，分 5 年直線折舊，每年吞食 10 億獲利。只有維持超高產能利用率與領先良率，才能將折舊化為輾壓對手的護城河！
          </p>
        </div>
      </div>`;
      break;
    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 投資能力圈 (Circle of Competence)</h4>
          <span class="sub-tag">「界定你的能力圈邊界，並永遠留在圈內」— 查理·蒙格</span>
        </div>
        <div style="background:#f0fdf4; border:2px dashed #059669; border-radius:8px; padding:14px; text-align:center;">
          <div style="font-size:1.1rem; font-weight:800; color:#166534;">能力圈內部 (真正徹底理解的產業)</div>
          <p style="font-size:0.76rem; color:#475569; margin:4px 0 8px 0;">生活接觸、產品邏輯明晰、看得懂商業模式與競爭護城河</p>
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; padding:6px; font-size:0.75rem; color:#dc2626; font-weight:700;">
            能力圈外部 (生技複雜新藥、加密幣投機、看不懂的複雜衍生品) ➔ 堅決不碰！
          </div>
        </div>
      </div>`;
      break;
    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧠 散戶常見 5 大估值心理偏誤</h4>
          <span class="sub-tag">行為財務學：克服人性弱點，才能在股市存活</span>
        </div>
        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:4px; font-size:0.75rem;">
          <li style="background:#f8fafc; border-left:3px solid #ef4444; padding:4px 8px;">1. <strong>定錨效應</strong>：執著於歷史最高價或自己買進的成本價。</li>
          <li style="background:#f8fafc; border-left:3px solid #ef4444; padding:4px 8px;">2. <strong>處置效應</strong>：急於賣掉獲利好股票，卻死抱嚴重虧損爛股票。</li>
          <li style="background:#f8fafc; border-left:3px solid #ef4444; padding:4px 8px;">3. <strong>沉沒成本</strong>：因為已經賠很多，就繼續盲目攤平凹單。</li>
          <li style="background:#f8fafc; border-left:3px solid #ef4444; padding:4px 8px;">4. <strong>過度自信</strong>：把牛市運氣當成自己卓越選股實力。</li>
          <li style="background:#f8fafc; border-left:3px solid #ef4444; padding:4px 8px;">5. <strong>確認偏誤</strong>：只閱讀吹捧自己持股的新聞，忽視衰退警訊。</li>
        </ul>
      </div>`;
      break;
    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔎 MOPS 公開資訊觀測站 4 步查核法</h4>
          <span class="sub-tag">不聽信網路名牌，直接看第一手法定審計資料</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.76rem;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:6px 8px;">
            <strong>Step 1. 會計師查核意見</strong><br>必須為「無保留意見」
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:6px 8px;">
            <strong>Step 2. 檢視四大財務報表</strong><br>營收、EPS 與自由現金流
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:6px 8px;">
            <strong>Step 3. 重大訊息專區</strong><br>查證建廠、訴訟、轉投資真實性
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:6px 8px;">
            <strong>Step 4. 董監事持股異動</strong><br>高層是否持續申報轉讓持股
          </div>
        </div>
      </div>`;
      break;
    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 大一新鮮人股市投資 4 大金律</h4>
          <span class="sub-tag">建立長線思維 ‧ 拒當股市當沖韭菜</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px; text-align:center;">
            <div style="font-weight:800; color:#166534; font-size:0.85rem;">1. 定期定額零股</div>
            <p style="font-size:0.72rem; color:#475569;">每月 3,000 元紀律投入優質龍頭</p>
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:8px; text-align:center;">
            <div style="font-weight:800; color:#1e40af; font-size:0.85rem;">2. 堅持長線思維</div>
            <p style="font-size:0.72rem; color:#475569;">以 5 至 10 年伴隨企業成長複利</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px; text-align:center;">
            <div style="font-weight:800; color:#92400e; font-size:0.85rem;">3. 恪守安全邊際</div>
            <p style="font-size:0.72rem; color:#475569;">絕不盲目追逐炒作高估之熱門股</p>
          </div>
          <div style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:6px; padding:8px; text-align:center;">
            <div style="font-weight:800; color:#9d174d; font-size:0.85rem;">4. 絕不開槓桿借錢</div>
            <p style="font-size:0.72rem; color:#475569;">禁止融資當沖，閒錢投資睡眠安穩</p>
          </div>
        </div>
      </div>`;
      break;
    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📋 價值投資自我審查 5 步健檢表</h4>
          <span class="sub-tag">下單買進前必備的 5 個審計自省問題</span>
        </div>
        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:5px; font-size:0.75rem;">
          <li style="background:#f8fafc; border-left:4px solid #059669; padding:5px 8px;">1. 這家公司賣什麼？我能否用一句話跟阿嬤解釋清楚？</li>
          <li style="background:#f8fafc; border-left:4px solid #059669; padding:5px 8px;">2. 近三年 ROE 是否穩定維持在 15% 以上？</li>
          <li style="background:#f8fafc; border-left:4px solid #059669; padding:5px 8px;">3. 本益比 P/E 與 PEG 是否處於歷史合理區間？</li>
          <li style="background:#f8fafc; border-left:4px solid #059669; padding:5px 8px;">4. 自由現金流是否充沛、負債比率是否低於 50%？</li>
          <li style="background:#f8fafc; border-left:4px solid #059669; padding:5px 8px;">5. 若股市明天關閉 5 年，我是否依然安心持有？</li>
        </ul>
      </div>`;
      break;
    case 30:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🏆 第四週課程總結里程碑</div>
        <h4>第三小時：估值大挑戰小遊戲與實務作業！</h4>
        <p>恭喜完成 30 頁扎實課程！現在進行最後的估值大挑戰小遊戲，並填寫標的企業估值分析作業！</p>
        <div class="milestone-actions" style="display:flex; gap:10px;">
          <button class="btn-launch-lab btn-h3" onclick="openModal('modalStockGame')">
            <span>🎮</span> 啟動小遊戲
          </button>
          <button class="btn-launch-lab btn-hw" onclick="openModal('modalHomework')">
            <span>📝</span> 填寫課堂作業
          </button>
        </div>
      </div>`;
      break;
    default:
      container.innerHTML = `<div style="padding:20px; color:#64748b;">Slide ${id}</div>`;
  }
}

// 卡片總覽模式 (Grid Overview Mode)
function initGridOverview() {
  document.querySelectorAll('.tab-hour-filter').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-hour-filter').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const hour = e.target.getAttribute('data-hour');
      renderGridCards(hour);
    });
  });

  const searchInput = document.getElementById('gridSearchInput');
  searchInput?.addEventListener('input', (e) => {
    renderGridCards('all', e.target.value.trim().toLowerCase());
  });
}

function renderGridCards(hourFilter = 'all', keyword = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;
  container.innerHTML = '';
  const isZh = APP_STATE.lang === 'zh';

  W4_SLIDES_DATA.forEach((slide, idx) => {
    if (hourFilter !== 'all' && String(slide.hour) !== String(hourFilter)) return;
    if (keyword) {
      const textPool = (slide.title + slide.titleEn + slide.subtitle + slide.subtitleEn + slide.quickTakeaways.join(' ') + slide.teachingNotes).toLowerCase();
      if (!textPool.includes(keyword)) return;
    }

    const card = document.createElement('div');
    card.className = `grid-card-item hour-${slide.hour}`;
    card.onclick = () => jumpToSlide(idx);

    card.innerHTML = `
      <div class="grid-card-header">
        <span class="badge-slide-num">#${String(slide.id).padStart(2, '0')}</span>
        <span class="badge-hour">${isZh ? `第 ${slide.hour} 小時` : `Hour ${slide.hour}`}</span>
      </div>
      <h4 class="grid-card-title">${isZh ? slide.title : slide.titleEn}</h4>
      <p class="grid-card-subtitle">${isZh ? slide.subtitle : slide.subtitleEn}</p>
      <div class="grid-card-points">
        ${(isZh ? slide.quickTakeaways : (slide.quickTakeawaysEn || slide.quickTakeaways)).slice(0, 2).map(p => `<div>• ${p}</div>`).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

// Canvas Drawing Engine
function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let isPainting = false;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  document.getElementById('btnToggleDrawing')?.addEventListener('click', () => {
    APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
    const toolbar = document.getElementById('drawingToolbar');
    const canvasEl = document.getElementById('drawingCanvas');
    const btn = document.getElementById('btnToggleDrawing');
    toolbar?.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    if (canvasEl) {
      canvasEl.classList.toggle('active', APP_STATE.isDrawingActive);
      canvasEl.classList.toggle('active-drawing', APP_STATE.isDrawingActive);
    }
    btn?.classList.toggle('active', APP_STATE.isDrawingActive);
  });

  document.querySelectorAll('.btn-draw-tool[data-tool]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-draw-tool[data-tool]').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      APP_STATE.drawingTool = e.currentTarget.getAttribute('data-tool');
    });
  });

  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      e.currentTarget.classList.add('active');
      APP_STATE.drawingColor = e.currentTarget.getAttribute('data-color');
    });
  });

  document.getElementById('btnClearDrawing')?.addEventListener('click', () => clearDrawingCanvas(true));
  document.getElementById('btnSaveDrawing')?.addEventListener('click', saveCanvasSnapshot);

  canvas.addEventListener('mousedown', (e) => {
    if (!APP_STATE.isDrawingActive) return;
    isPainting = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isPainting || !APP_STATE.isDrawingActive) return;
    if (APP_STATE.drawingTool === 'eraser') {
      ctx.clearRect(e.offsetX - 15, e.offsetY - 15, 30, 30);
    } else if (APP_STATE.drawingTool === 'highlighter') {
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = APP_STATE.drawingColor;
      ctx.lineWidth = 18;
      ctx.lineCap = 'square';
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    } else {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = APP_STATE.drawingColor;
      ctx.lineWidth = APP_STATE.drawingWidth || 3;
      ctx.lineCap = 'round';
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => isPainting = false);
  canvas.addEventListener('mouseleave', () => isPainting = false);
}

function clearDrawingCanvas(confirmPrompt = true) {
  const canvas = document.getElementById('drawingCanvas');
  canvas?.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvasSnapshot() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `W4_股市入門與企業價值估算_Slide_${APP_STATE.currentSlideIndex + 1}_註記.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// 第 1 小時活動：股權試算
function initEquityActivity() {
  document.querySelectorAll('.eq-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.eq-preset-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const id = e.currentTarget.getAttribute('data-preset');
      const p = W4_EQUITY_PRESETS.find(x => x.id === id);
      if (p) {
        document.getElementById('eqPriceInput').value = p.price;
        document.getElementById('eqSharesInput').value = p.shares;
        document.getElementById('eqDivInput').value = p.quarterlyDividend;
        calculateEquity();
      }
    });
  });

  ['eqPriceInput', 'eqSharesInput', 'eqDivInput'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateEquity);
  });
  calculateEquity();
}

function calculateEquity() {
  const price = parseFloat(document.getElementById('eqPriceInput')?.value) || 1000;
  const shares = parseFloat(document.getElementById('eqSharesInput')?.value) || 100;
  const qDiv = parseFloat(document.getElementById('eqDivInput')?.value) || 4.0;

  const cost = price * shares;
  const annualDiv = qDiv * 4 * shares;
  const yieldPct = price > 0 ? ((qDiv * 4) / price) * 100 : 0;
  const tsmcIssued = 25930000000;
  const ownership = ((shares / tsmcIssued) * 100).toFixed(8);

  const elCost = document.getElementById('eqCostResult');
  const elDiv = document.getElementById('eqDivResult');
  const elYield = document.getElementById('eqYieldResult');
  const elOwner = document.getElementById('eqOwnerResult');

  if (elCost) elCost.textContent = `$${Math.round(cost).toLocaleString()} 元`;
  if (elDiv) elDiv.textContent = `+$${Math.round(annualDiv).toLocaleString()} 元 / 年`;
  if (elYield) elYield.textContent = `${yieldPct.toFixed(2)}%`;
  if (elOwner) elOwner.textContent = `${ownership}%`;
}

// 第 2 小時活動：估值比較器
function initValuationActivity() {
  document.querySelectorAll('.val-case-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.val-case-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const idx = parseInt(e.currentTarget.getAttribute('data-case'), 10);
      const c = W4_VALUATION_CASES[idx];
      if (c) {
        document.getElementById('valCapInput').value = c.marketCap;
        document.getElementById('valIncomeInput').value = c.netIncome;
        document.getElementById('valGrowthInput').value = c.growthRate;
        calculateValuation();
      }
    });
  });

  ['valCapInput', 'valIncomeInput', 'valGrowthInput'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateValuation);
  });
  calculateValuation();
}

function calculateValuation() {
  const cap = parseFloat(document.getElementById('valCapInput')?.value) || 1000;
  const inc = parseFloat(document.getElementById('valIncomeInput')?.value) || 100;
  const g = parseFloat(document.getElementById('valGrowthInput')?.value) || 20;

  const pe = inc > 0 ? (cap / inc) : 0;
  const peg = g > 0 ? (pe / g) : 0;

  const elPe = document.getElementById('valPeResult');
  const elPeg = document.getElementById('valPegResult');
  const elDiag = document.getElementById('valDiagResult');

  if (elPe) elPe.textContent = `${pe.toFixed(1)} 倍`;
  if (elPeg) elPeg.textContent = `${peg.toFixed(2)}`;

  if (elDiag) {
    if (peg <= 0.75) {
      elDiag.innerHTML = `<span class="badge-alert green">顯著低估便宜</span> PEG 低於 0.75，獲利成長動能遠超估值倍數，具備優異投資吸引力！`;
    } else if (peg <= 1.25) {
      elDiag.innerHTML = `<span class="badge-alert orange">合理定價區間</span> PEG 落在 0.75 ~ 1.25 之間，估值公允反映市場成長預期。`;
    } else {
      elDiag.innerHTML = `<span class="badge-alert red">嚴重高估泡沫</span> PEG 高於 1.25，股價已被炒作溢價，缺乏足夠安全邊際。`;
    }
  }
}

// 第 3 小時小遊戲
function initStockGame() {
  renderStockGame();
}

function renderStockGame() {
  const container = document.getElementById('stockGameLevelContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W4_GAME_QUESTIONS.length) {
    container.innerHTML = `
      <div class="certificate-wrapper">
        <div class="cert-ribbon">🏆 榮譽認證</div>
        <h3>股市入門與企業價值估值 ‧ 結業證書</h3>
        <p class="cert-subtitle">Certificate of Corporate Equity & Valuation Mastery</p>
        <div class="cert-user-row">
          <label>授予學員：</label>
          <input type="text" value="${APP_STATE.homeworkData.studentName || '價值投資先鋒'}" oninput="APP_STATE.homeworkData.studentName = this.value">
        </div>
        <div class="cert-body">
          圓滿通過第四週考核！深刻掌握股票微型股權本質、破解除權息填息迷思、精算 P/E 與 PEG 成長比，並具備甄別巴菲特 ROE 護城河之卓越財務智慧！
        </div>
        <div class="cert-score-seal">
          <div class="seal-score">${APP_STATE.gameScore}</div>
          <div class="seal-label">總評得分 (滿分 100)</div>
        </div>
        <div class="cert-footer-row">
          <div>發證單位：管理探索二 課程教學委員會</div>
          <div>日期：115學年度 第一學期 第四週</div>
        </div>
        <div class="cert-action-row">
          <button class="btn-nav-step btn-primary-step" onclick="window.print()">🖨️ 列印此證書</button>
          <button class="btn-nav-step" onclick="APP_STATE.gameCurrentLevel=0;APP_STATE.gameScore=0;renderStockGame();">🔄 重新挑戰</button>
        </div>
      </div>
    `;
    return;
  }

  const q = W4_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="game-header-bar">
      <span class="game-badge">${q.badge}</span>
      <span class="game-score-tag">目前得分：<strong>${APP_STATE.gameScore} / 100</strong></span>
    </div>
    <h4 class="game-question-title">${q.title}</h4>
    <div class="game-scenario-card">${q.scenario}</div>
    <div class="game-options-list">
      ${q.options.map((opt, idx) => `
        <button class="game-option-btn" onclick="submitStockAnswer(${idx})">
          <span class="opt-letter">${['A','B','C','D'][idx]}</span>
          <span class="opt-text">${opt.text}</span>
        </button>
      `).join('')}
    </div>
    <div id="stockGameFeedback" class="game-feedback-box" style="display: none;"></div>
  `;
}

function submitStockAnswer(idx) {
  const q = W4_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const opt = q.options[idx];
  const fb = document.getElementById('stockGameFeedback');
  if (!fb) return;

  fb.style.display = 'block';
  fb.className = `game-feedback-box ${opt.isCorrect ? 'correct' : 'wrong'}`;

  if (opt.isCorrect) {
    if (!APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) {
      APP_STATE.gameScore += 25;
      APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;
    }
    fb.innerHTML = `
      <div class="fb-title">🎉 答對了！+25分</div>
      <p>${opt.feedback}</p>
      <button class="btn-nav-step btn-primary-step" style="margin-top: 10px;" onclick="APP_STATE.gameCurrentLevel++; renderStockGame();">
        進入下一關 ➔
      </button>
    `;
  } else {
    fb.innerHTML = `<div class="fb-title">❌ 思考一下，尚未完全命中！</div><p>${opt.feedback}</p>`;
  }
}

// 第 3 小時作業
function initHomeworkForm() {
  ['hwStudentName', 'hwStudentId', 'hwCompanySummary', 'hwPeAnalysis', 'hwRoeAnalysis', 'hwActionPlan', 'hwConclusionGrade', 'hwDecisionSummary'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      syncHomework();
      saveHomework();
    });
  });

  document.querySelectorAll('.hw-preset-btn').forEach(b => {
    b.addEventListener('click', applyHomeworkPreset);
  });

  document.getElementById('btnExportJson')?.addEventListener('click', exportJson);
  document.getElementById('btnExportMd')?.addEventListener('click', exportMarkdown);
  document.getElementById('btnPrintHomework')?.addEventListener('click', () => window.print());
}

function syncHomework() {
  APP_STATE.homeworkData = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    companySummary: document.getElementById('hwCompanySummary')?.value || '',
    peAnalysis: document.getElementById('hwPeAnalysis')?.value || '',
    roeAnalysis: document.getElementById('hwRoeAnalysis')?.value || '',
    actionPlan: document.getElementById('hwActionPlan')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'Highly Undervalued',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
}

function applyHomeworkPreset() {
  const p = W4_HOMEWORK_PRESETS[0];
  if (!p) return;
  document.getElementById('hwStudentName').value = p.studentName;
  document.getElementById('hwStudentId').value = p.studentId;
  document.getElementById('hwCompanySummary').value = p.companySummary;
  document.getElementById('hwPeAnalysis').value = p.peAnalysis;
  document.getElementById('hwRoeAnalysis').value = p.roeAnalysis;
  document.getElementById('hwActionPlan').value = p.actionPlan;
  document.getElementById('hwConclusionGrade').value = p.conclusionGrade;
  document.getElementById('hwDecisionSummary').value = p.decisionSummary;
  syncHomework();
  saveHomework();
}

function saveHomework() {
  localStorage.setItem('agy_w4_homework', JSON.stringify(APP_STATE.homeworkData));
  const s = document.getElementById('hwSaveStatus');
  if (s) { s.textContent = '✓ 本地自動儲存中...'; setTimeout(() => s.textContent = '', 2000); }
}

function loadSavedHomework() {
  try {
    const saved = localStorage.getItem('agy_w4_homework');
    if (!saved) return;
    const d = JSON.parse(saved);
    APP_STATE.homeworkData = d;
    if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = d.studentName || '';
    if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = d.studentId || '';
    if (document.getElementById('hwCompanySummary')) document.getElementById('hwCompanySummary').value = d.companySummary || '';
    if (document.getElementById('hwPeAnalysis')) document.getElementById('hwPeAnalysis').value = d.peAnalysis || '';
    if (document.getElementById('hwRoeAnalysis')) document.getElementById('hwRoeAnalysis').value = d.roeAnalysis || '';
    if (document.getElementById('hwActionPlan')) document.getElementById('hwActionPlan').value = d.actionPlan || '';
    if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = d.conclusionGrade || 'Highly Undervalued';
    if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = d.decisionSummary || '';
  } catch (e) { console.warn(e); }
}

function exportMarkdown() {
  syncHomework();
  const d = APP_STATE.homeworkData;
  const md = `# 管理探索二 第四週課堂作業：標的企業本益比與 ROE 估值分析報告
- **學生姓名**：${d.studentName || '未填寫'}
- **學號**：${d.studentId || '未填寫'}
- **估值評級**：【${d.conclusionGrade}】

---

### 一、 標的企業與商業模式概述 (25%)
${d.companySummary}

---

### 二、 本益比 P/E 與 PEG 估值分析 (25%)
${d.peAnalysis}

---

### 三、 ROE 股東權益報酬率與獲利品質 (25%)
${d.roeAnalysis}

---

### 四、 估值結論與青年投資紀律行動方案 (25%)
${d.actionPlan}

---

### 五、 核心反思總結
${d.decisionSummary}
`;

  navigator.clipboard.writeText(md).then(() => alert('已成功複製 Markdown 報告！')).catch(() => {
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `W4_股市入門與企業價值估算_課堂報告_${d.studentName || '學員'}_${d.studentId || Date.now()}.md`;
    link.click();
  });
}

function exportJson() {
  syncHomework();
  const blob = new Blob([JSON.stringify(APP_STATE.homeworkData, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `W4_股市入門與企業價值估算_課堂報告_${Date.now()}.json`;
  link.click();
}

function openModal(id) { document.getElementById(id)?.classList.add('active'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }
function closeAllModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active')); }

function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); nextSlide(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prevSlide(); }
    else if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); }
    else if (e.key.toLowerCase() === 'd') { e.preventDefault(); document.getElementById('btnToggleDrawing')?.click(); }
    else if (e.key.toLowerCase() === 'n') { e.preventDefault(); toggleTeacherNotes(); }
    else if (e.key.toLowerCase() === 'm') { e.preventDefault(); toggleViewMode(); }
    else if (e.key === 'Escape') { closeAllModals(); }
  });
}
