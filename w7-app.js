/**
 * 115學年度「管理探索二」第七週互動教學主程式
 * 單元名稱：個人外匯、匯率變動與國際貿易
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#1e3a8a',
  drawingWidth: 3,

  // 1小時活動 (即期 vs. 現金換匯點差計算器)
  exchangeState: {
    twdAmount: 30000,
    currency: 'JPY',
    spotSell: 0.2150,
    cashSell: 0.2200
  },

  // 2小時活動 (大麥克指數 PPP 幣值高低估檢測器)
  pppState: {
    localPrice: 75,
    usPrice: 5.60,
    marketRate: 32.50,
    isReverse: false
  },

  // 3小時遊戲 (外匯金融達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (自選外幣換匯規劃與匯率影響報告)
  homeworkData: {
    studentName: '',
    studentId: '',
    targetCurrency: 'JPY 日圓',
    rateComp: '',
    trendAnalysis: '',
    industryImpact: '',
    fxStrategy: '',
    conclusionGrade: 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initExchangeCalc();
  initPppCalc();
  initForexGame();
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

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) {
    quickSelect.addEventListener('change', (e) => jumpToSlide(parseInt(e.target.value, 10)));
  }
}

function populateQuickSelect() {
  const select = document.getElementById('quickSlideSelect');
  if (!select) return;
  select.innerHTML = '';
  W7_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W7_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W7_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W7_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W7_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W7_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W7_SLIDES_DATA.length - 1) {
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
  const id = slide.id;

  switch (id) {
    case 1:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌐 匯率是連繫一國經濟與世界經濟的神經網路</h4>
          <span class="sub-tag">「短期匯率取決於資本流動，長期則回歸購買力平價」— Paul Samuelson</span>
        </div>
        <div class="rate-board-container" style="margin-top:8px;">
          <div class="rate-ticker-card">
            <span class="rate-badge spot">USD / TWD 即期</span>
            <div class="rate-price-row">
              <span class="rate-price-num">32.50</span>
              <span class="rate-price-unit">NT$ / USD</span>
            </div>
            <p style="font-size:0.75rem; color:#64748b; margin-top:6px;">全球儲備貨幣樞紐、美股與大宗物資定價核心</p>
          </div>
          <div class="rate-ticker-card">
            <span class="rate-badge cash">JPY / TWD 現金</span>
            <div class="rate-price-row">
              <span class="rate-price-num">0.2185</span>
              <span class="rate-price-unit">NT$ / JPY</span>
            </div>
            <p style="font-size:0.75rem; color:#64748b; margin-top:6px;">台灣民眾最愛赴日旅遊觀光與代購幣別</p>
          </div>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第七週 3 小時學習地圖與核心能力樹</h4>
          <span class="sub-tag">從銀行牌告點差、總經傳遞到跨國消費與個人避險護城河</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border-top:4px solid #1e3a8a; border-radius:8px; padding:10px;">
            <strong style="color:#1e3a8a; font-size:0.85rem;">第 1 小時 ‧ 匯率與牌告</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">即期 vs 現金、買入 vs 賣出、牌告點差、雙幣卡扣款、14兆外幣存款。</p>
          </div>
          <div style="background:#f0fdfa; border-top:4px solid #0d9488; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.85rem;">第 2 小時 ‧ 購買力與總經</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">大麥克指數 (PPP)、台美利差 (IRP)、台積電毛利、外匯存底、柳樹理論。</p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #d97706; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">第 3 小時 ‧ 避險與防坑</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">四不原則、賺高息賠匯差、DCC 拒絕術、留學物價、20年均值回歸。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 匯率定價原理：直接標價法與升貶值天秤</h4>
          <span class="sub-tag">台灣採「直接標價法」：用多少新台幣換 1 單位外國貨幣</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:12px; align-items:center;">
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; text-align:center;">
              <span style="font-size:1.4rem;">📈</span>
              <h5 style="margin:4px 0; color:#b91c1c;">匯率數字上升 (30 ➔ 32.5)</h5>
              <div style="font-size:1rem; font-weight:800; color:#dc2626;">新台幣「貶值」</div>
              <p style="font-size:0.72rem; color:#7f1d1d; margin-top:4px;">1 美元要用更多台幣買，美金變貴、進口物價上漲。</p>
            </div>
            <div style="font-size:1.6rem; color:#64748b; font-weight:800;">VS</div>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px; text-align:center;">
              <span style="font-size:1.4rem;">📉</span>
              <h5 style="margin:4px 0; color:#15803d;">匯率數字下降 (32.5 ➔ 30)</h5>
              <div style="font-size:1rem; font-weight:800; color:#16a34a;">新台幣「升值」</div>
              <p style="font-size:0.72rem; color:#14532d; margin-top:4px;">1 美元只需較少台幣買，台幣變強、出國旅遊便宜。</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💵 即期匯率 vs. 現金匯率之成本真相</h4>
          <span class="sub-tag">現鈔具有運送、防偽、保險與金庫成本，點差遠高於電子即期</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:#1d4ed8; font-size:0.85rem;">即期賣出 (Spot Sell)</strong>
              <span class="rate-badge spot">App 換匯首選</span>
            </div>
            <div style="font-size:1.5rem; font-weight:800; color:#1e3a8a; margin:6px 0;">0.2150</div>
            <p style="font-size:0.74rem; color:#475569; margin:0;">外幣帳戶電子記帳清算，無實體紙鈔物流損耗，成本最低！</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:#b45309; font-size:0.85rem;">現金賣出 (Cash Sell)</strong>
              <span class="rate-badge cash">臨櫃最昂貴</span>
            </div>
            <div style="font-size:1.5rem; font-weight:800; color:#b45309; margin:6px 0;">0.2200</div>
            <p style="font-size:0.74rem; color:#475569; margin:0;">包含海外空運保險、金庫保管與行員點鈔成本，貴了 2.3%！</p>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 站在銀行的立場看牌告：買入 vs. 賣出</h4>
          <span class="sub-tag">銀行是低買高賣的金融中介商，永遠看「銀行在做什麼」</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:8px;">
            <div style="background:#ffffff; border-left:4px solid #ef4444; border-radius:6px; padding:8px;">
              <span style="font-size:0.75rem; color:#64748b;">銀行向客戶【買入】</span>
              <div style="font-size:1.1rem; font-weight:800; color:#b91c1c;">買入匯率 (低價)</div>
              <p style="font-size:0.72rem; color:#475569; margin-top:2px;">你拿歐元現鈔給銀行換回台幣時適用此價格。</p>
            </div>
            <div style="background:#ffffff; border-left:4px solid #10b981; border-radius:6px; padding:8px;">
              <span style="font-size:0.75rem; color:#64748b;">銀行把外幣【賣出】</span>
              <div style="font-size:1.1rem; font-weight:800; color:#047857;">賣出匯率 (高價)</div>
              <p style="font-size:0.72rem; color:#475569; margin-top:2px;">你要拿台幣跟銀行買美元/日圓時適用此價格。</p>
            </div>
          </div>
          <div style="background:#e0e7ff; border-radius:6px; padding:6px; text-align:center; font-size:0.75rem; color:#3730a3; font-weight:700;">
            買賣差價 (Bid-Ask Spread) = 銀行的造市手續費收入！
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>✈️ 出國觀光三大換匯管道精打細算</h4>
          <span class="sub-tag">臨櫃紙鈔、網銀即期存外幣、外幣 ATM 提款之優劣抉擇</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:8px;">
            <strong style="color:#b91c1c; font-size:0.8rem;">1. 臨櫃現鈔換匯</strong>
            <p style="font-size:0.72rem; color:#7f1d1d; margin-top:4px;">❌ 匯率最差<br>❌ 需排隊等候<br>❌ 僅限營業時間</p>
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:8px;">
            <strong style="color:#1e40af; font-size:0.8rem;">2. 網銀即期換匯</strong>
            <p style="font-size:0.72rem; color:#1e3a8a; margin-top:4px;">✅ 享受即期優惠<br>✅ 可設價位提醒<br>✅ 分批逢低接單</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:8px;">
            <strong style="color:#166534; font-size:0.8rem;">3. 外幣 ATM 提款</strong>
            <p style="font-size:0.72rem; color:#14532d; margin-top:4px;">✅ 24hr 機場隨領<br>✅ 免臨櫃手續費<br>✅ 享有現鈔折讓</p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💳 雙幣信用卡運作機制：鎖定低點匯率避險</h4>
          <span class="sub-tag">平時網銀即期逢低存外幣，海外刷卡直接扣外幣帳戶</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-around; align-items:center; text-align:center;">
            <div>
              <span style="font-size:1.6rem;">📱</span>
              <div style="font-size:0.8rem; font-weight:700; color:#1e40af;">App 逢低買日幣</div>
              <span style="font-size:0.72rem; color:#64748b;">鎖定 0.2150 即期</span>
            </div>
            <div style="font-size:1.3rem; color:#94a3b8;">➔</div>
            <div>
              <span style="font-size:1.6rem;">🏦</span>
              <div style="font-size:0.8rem; font-weight:700; color:#0f766e;">外幣存款帳戶</div>
              <span style="font-size:0.72rem; color:#64748b;">享受活存利息</span>
            </div>
            <div style="font-size:1.3rem; color:#94a3b8;">➔</div>
            <div>
              <span style="font-size:1.6rem;">🛍️</span>
              <div style="font-size:0.8rem; font-weight:700; color:#16a34a;">日本刷雙幣卡</div>
              <span style="font-size:0.72rem; color:#64748b;">直接扣日圓無匯損</span>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 台灣國人 14 兆外幣存款的狂潮與集體心理</h4>
          <span class="sub-tag">美台利差驅動歷史天量，但「賺利息賠匯差」的陰影始終相隨</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px; text-align:center;">
            <span style="font-size:0.75rem; color:#92400e;">全台外幣存款總規模</span>
            <div style="font-size:1.8rem; font-weight:900; color:#b45309;">14.2 兆 NT$</div>
            <p style="font-size:0.72rem; color:#78350f; margin-top:4px;">佔全體存款比重高達 25% 以上！</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.8rem;">🚨 散戶投資人常見陷阱</strong>
            <ul style="font-size:0.72rem; color:#7f1d1d; margin:4px 0 0 0; padding-left:16px;">
              <li>只看 5.5% 宣傳利率，沒算匯率跌幅</li>
              <li>匯率在 32.5 高點重押，一旦回 30 慘賠</li>
              <li>換匯時被銀行賺走前後兩次點差</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌍 美元指數 (DXY) 權重分布：全球匯市的定海神針</h4>
          <span class="sub-tag">一籃子 6 種主要國際貨幣相對美元的幾何加權綜合指數</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px;">
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
            <div style="background:#eff6ff; padding:8px; border-radius:6px;">
              <div style="font-size:0.75rem; color:#1e40af;">歐元 EUR</div>
              <strong style="font-size:1.1rem; color:#1e3a8a;">57.6%</strong>
            </div>
            <div style="background:#f0fdfa; padding:8px; border-radius:6px;">
              <div style="font-size:0.75rem; color:#0f766e;">日圓 JPY</div>
              <strong style="font-size:1.1rem; color:#0d9488;">13.6%</strong>
            </div>
            <div style="background:#faf5ff; padding:8px; border-radius:6px;">
              <div style="font-size:0.75rem; color:#6b21a8;">英鎊 GBP</div>
              <strong style="font-size:1.1rem; color:#7e22ce;">11.9%</strong>
            </div>
            <div style="background:#fffbeb; padding:8px; border-radius:6px;">
              <div style="font-size:0.75rem; color:#92400e;">加幣 CAD</div>
              <strong style="font-size:1.1rem; color:#b45309;">9.1%</strong>
            </div>
            <div style="background:#fdf2f8; padding:8px; border-radius:6px;">
              <div style="font-size:0.75rem; color:#9d174d;">瑞典克朗 SEK</div>
              <strong style="font-size:1.1rem; color:#be185d;">4.2%</strong>
            </div>
            <div style="background:#f1f5f9; padding:8px; border-radius:6px;">
              <div style="font-size:0.75rem; color:#334155;">瑞士法郎 CHF</div>
              <strong style="font-size:1.1rem; color:#475569;">3.6%</strong>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card" style="text-align:center;">
        <div class="diagram-header">
          <h4>🎯 第一小時里程碑：換匯常識與牌告實務達陣！</h4>
          <span class="sub-tag">你已經掌握買賣雙向視角、即期與現金點差以及雙幣卡配置原則</span>
        </div>
        <div style="padding:16px 8px;">
          <div style="font-size:2.5rem; margin-bottom:8px;">💱</div>
          <p style="font-size:0.85rem; color:#475569; margin-bottom:14px;">立刻啟動課堂互動實驗室，實際試算 3 萬台幣在日本旅遊中能省下多少冤枉錢！</p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalExchangeCalc')" style="padding:10px 22px; font-size:0.95rem; margin:0 auto;">
            <span>🚀</span> 開啟「即期 vs 現金換匯點差省錢計算器」
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🍔 大麥克指數 (Big Mac Index)：購買力平價理論</h4>
          <span class="sub-tag">《經濟學人》單一價格法則：相同商品在不同國家應具備相同價值</span>
        </div>
        <div class="ppp-gauge-box">
          <span class="ppp-gauge-sub">台灣 vs 美國大麥克隱含平價匯率</span>
          <div class="ppp-gauge-val">13.39 NT$ / USD</div>
          <p style="font-size:0.75rem; color:#7c2d12; margin-top:4px;">台灣售價 NT$75 ÷ 美國售價 $5.60 = 隱含匯率 13.39<br>對比市場匯率 32.50 ➔ <strong>新台幣幣值被低估約 58.8%！</strong></p>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚡ 利率平價 (IRP) 與台美利差：巨額資金的重力場</h4>
          <span class="sub-tag">錢往高處流！利差擴大驅動千億美元資金跨海尋求高息收益</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:10px; align-items:center;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px; text-align:center;">
            <span style="font-size:0.75rem; color:#1d4ed8;">美國 Fed 基準利率</span>
            <div style="font-size:1.6rem; font-weight:900; color:#1e40af;">5.25% ~ 5.50%</div>
            <p style="font-size:0.72rem; color:#1e3a8a; margin-top:2px;">全球美元吸引力飆升</p>
          </div>
          <div style="text-align:center;">
            <div style="font-size:1.2rem; font-weight:800; color:#ef4444;">利差 3.25%</div>
            <div style="font-size:1.5rem;">➔➔➔</div>
            <span style="font-size:0.72rem; color:#64748b;">驅動台資換美元購債</span>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px; text-align:center;">
            <span style="font-size:0.75rem; color:#15803d;">台灣央行重貼現率</span>
            <div style="font-size:1.6rem; font-weight:900; color:#166534;">2.00%</div>
            <p style="font-size:0.72rem; color:#14532d; margin-top:2px;">維持低利率穩定融資</p>
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚢 貿易順差 vs. 金融帳外流：台幣供需拔河</h4>
          <span class="sub-tag">台灣匯率由兩股龐大勢力相互對沖與決定</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border-top:4px solid #10b981; border-radius:8px; padding:10px;">
            <strong style="color:#065f46; font-size:0.85rem;">⬆️ 推升升值力量 (經常帳順差)</strong>
            <ul style="font-size:0.72rem; color:#047857; margin:6px 0 0 0; padding-left:16px;">
              <li>台灣科技晶片全球熱銷</li>
              <li>每年賺取 800~1,000 億美元外匯</li>
              <li>廠商回台換台幣發員工獎金</li>
            </ul>
          </div>
          <div style="background:#fef2f2; border-top:4px solid #ef4444; border-radius:8px; padding:10px;">
            <strong style="color:#991b1b; font-size:0.85rem;">⬇️ 推升貶值力量 (金融帳外流)</strong>
            <ul style="font-size:0.72rem; color:#b91c1c; margin:6px 0 0 0; padding-left:16px;">
              <li>國人瘋買海外美股與 ETF</li>
              <li>壽險業數十兆巨額投資海外美債</li>
              <li>連續數十季金融帳呈現淨流出</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏆 新台幣「升值」產業贏家與輸家矩陣</h4>
          <span class="sub-tag">當台幣走強 (例如 32 升至 28)，誰笑誰哭？</span>
        </div>
        <div class="matrix-grid">
          <div class="matrix-card winners">
            <h5>🎉 升值贏家 (Winners)</h5>
            <ul style="margin:0; padding-left:16px;">
              <li>出國觀光旅客、海外留學生</li>
              <li>進口車商、美妝精品代理商</li>
              <li>航空業 (買飛機與美金計價航油成本大降)</li>
              <li>內需餐飲與原物料進口廠商</li>
            </ul>
          </div>
          <div class="matrix-card losers">
            <h5>🌧️ 升值輸家 (Losers)</h5>
            <ul style="margin:0; padding-left:16px;">
              <li>電子出口代工廠 (毛利率被壓縮)</li>
              <li>工具機、紡織等傳統外銷產業</li>
              <li>手握龐大外幣資產的壽險公司</li>
              <li>央行外匯存底折合台幣帳面縮水</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📉 新台幣「貶值」雙面刃：台積電 vs. 輸入型通膨</h4>
          <span class="sub-tag">貶值有助科技出口競爭力，但全民共同承擔高昂生活成本</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.85rem;">💻 台積電等科技大廠</strong>
            <p style="font-size:0.74rem; color:#1e3a8a; margin-top:4px;">收美元、付台幣水電薪資！新台幣每貶值 1 元，台積電營業利益率約<strong>提升 0.4 個百分點</strong>，獲利進補數百億。</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
            <strong style="color:#991b1b; font-size:0.85rem;">⛽ 全體民眾生活開銷</strong>
            <p style="font-size:0.74rem; color:#7f1d1d; margin-top:4px;">台灣 97% 能源、大豆玉米小麥全靠進口！台幣貶值直接推升油價、電價與食物價格，<strong>引發輸入型通膨</strong>。</p>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 台灣 5,750 億美元外匯存底：金融安全護城河</h4>
          <span class="sub-tag">名列全球前五大！在無 IMF 庇護下抵禦國際金融風暴的終極後盾</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; text-align:center;">
          <span style="font-size:0.75rem; color:#64748b;">台灣中央銀行外匯存底總額</span>
          <div style="font-size:2.2rem; font-weight:900; color:#1e3a8a;">$5,750 億美元</div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:10px; font-size:0.72rem;">
            <div style="background:#ffffff; padding:6px; border-radius:6px; border:1px solid #e2e8f0;">
              <strong>防禦外資撤離</strong><br>足以支應台股外資大抽單
            </div>
            <div style="background:#ffffff; padding:6px; border-radius:6px; border:1px solid #e2e8f0;">
              <strong>維持進口支付</strong><br>可供全台進口超過 18 個月
            </div>
            <div style="background:#ffffff; padding:6px; border-radius:6px; border:1px solid #e2e8f0;">
              <strong>穩定匯率信心</strong><br>震懾國際投機炒家索羅斯們
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌾 央行「柳樹理論」：動態穩定的匯率哲學</h4>
          <span class="sub-tag">「匯率如柳樹，隨風擺盪而不折斷；剛硬如大樹，強風一來連根拔起」— 彭淮南</span>
        </div>
        <div style="background:linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border:1px solid #86efac; border-radius:8px; padding:12px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <strong style="color:#166534; font-size:0.85rem;">🌀 平時順應市場趨勢</strong>
              <p style="font-size:0.72rem; color:#14532d; margin-top:4px;">尊重全球美元升降循環，允許台幣在合理區間適度彈性波動。</p>
            </div>
            <div>
              <strong style="color:#166534; font-size:0.85rem;">🛡️ 關鍵時刻逆風干預</strong>
              <p style="font-size:0.72rem; color:#14532d; margin-top:4px;">當熱錢非理性炒作或恐慌外逃時，央行果斷進場拋匯調節，抹平極端尾部風險。</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💥 日圓利差交易 (Carry Trade) 與全球平倉風暴</h4>
          <span class="sub-tag">全球對沖基金借超低利日圓買美股美債，一旦日圓升息引爆全球海嘯</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; text-align:center;">
            <div style="background:#eff6ff; padding:8px; border-radius:6px; flex:1;">
              <strong style="color:#1e40af; font-size:0.78rem;">1. 借入 0% 日圓</strong>
              <p style="font-size:0.7rem; color:#475569; margin:2px 0 0 0;">借貸融資成本幾乎為零</p>
            </div>
            <div style="padding:0 6px; font-weight:800; color:#94a3b8;">➔</div>
            <div style="background:#f0fdf4; padding:8px; border-radius:6px; flex:1;">
              <strong style="color:#166534; font-size:0.78rem;">2. 換美元買資產</strong>
              <p style="font-size:0.7rem; color:#475569; margin:2px 0 0 0;">買 5% 美債或科技美股</p>
            </div>
            <div style="padding:0 6px; font-weight:800; color:#ef4444;">⚡</div>
            <div style="background:#fef2f2; padding:8px; border-radius:6px; flex:1;">
              <strong style="color:#991b1b; font-size:0.78rem;">3. 日銀升息平倉</strong>
              <p style="font-size:0.7rem; color:#7f1d1d; margin:2px 0 0 0;">恐慌拋售美股買回日圓</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔒 出口企業遠期外匯 (Forward) 鎖定匯率機制</h4>
          <span class="sub-tag">不賭匯率波動！以避險合約鎖定產品利潤，專注本業研發</span>
        </div>
        <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:8px; padding:12px;">
          <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:10px; align-items:center;">
            <div>
              <span style="font-size:0.75rem; color:#1e40af;">今天接下 100 萬美元訂單</span>
              <div style="font-size:1.1rem; font-weight:800; color:#1e3a8a;">約定 3 個月後 32.2 賣出</div>
              <p style="font-size:0.72rem; color:#475569; margin-top:2px;">向銀行簽訂「遠期外匯合約」</p>
            </div>
            <div style="font-size:1.5rem; color:#2563eb;">➔</div>
            <div>
              <span style="font-size:0.75rem; color:#166534;">3 個月後交貨收款</span>
              <div style="font-size:1.1rem; font-weight:800; color:#15803d;">即使匯率跌至 30.0</div>
              <p style="font-size:0.72rem; color:#14532d; margin-top:2px;">依然保證換回 3,220 萬台幣！</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card" style="text-align:center;">
        <div class="diagram-header">
          <h4>🎯 第二小時里程碑：購買力平價與總經匯率精通！</h4>
          <span class="sub-tag">你已經掌握了大麥克平價、台美利差引力、產業升貶值矩陣與央行防衛機制</span>
        </div>
        <div style="padding:16px 8px;">
          <div style="font-size:2.5rem; margin-bottom:8px;">🍔</div>
          <p style="font-size:0.85rem; color:#475569; margin-bottom:14px;">立刻啟動第二項課堂工具，檢驗全球不同國家貨幣相對於美元的實質高低估！</p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalPppCalc')" style="padding:10px 22px; font-size:0.95rem; margin:0 auto;">
            <span>🚀</span> 開啟「大麥克指數 (PPP) 幣值高低估檢測器」
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚫 個人換匯實務「四不原則」避坑守則</h4>
          <span class="sub-tag">建立健康的個人跨國理財防護線，避免成為市場被收割的肥羊</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#fef2f2; border-left:4px solid #ef4444; border-radius:6px; padding:8px;">
            <strong style="color:#b91c1c; font-size:0.8rem;">1. 不一次重押</strong>
            <p style="font-size:0.72rem; color:#7f1d1d; margin-top:2px;">拒絕猜測絕對低點，堅持分批分期建立外幣部位。</p>
          </div>
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.8rem;">2. 不存冷門高息幣</strong>
            <p style="font-size:0.72rem; color:#78350f; margin-top:2px;">土耳其里拉、南非幣等雙位數高利，背後往往是巨額貶值深淵。</p>
          </div>
          <div style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:6px; padding:8px;">
            <strong style="color:#1e40af; font-size:0.8rem;">3. 不臨櫃換大量現鈔</strong>
            <p style="font-size:0.72rem; color:#1e3a8a; margin-top:2px;">以網銀即期換匯 + 外幣 ATM 或雙幣卡替代高昂臨櫃紙鈔。</p>
          </div>
          <div style="background:#f0fdf4; border-left:4px solid #10b981; border-radius:6px; padding:8px;">
            <strong style="color:#166534; font-size:0.8rem;">4. 海外刷卡不選 DCC</strong>
            <p style="font-size:0.72rem; color:#14532d; margin-top:2px;">堅決選擇當地貨幣 (當地幣別) 結帳，拒絕 4%~8% 的暴利點差。</p>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🩸 經典痛點試算：賺了 5.5% 利息，賠了 9.2% 匯差！</h4>
          <span class="sub-tag">只盯定存利率而忽略本金匯率風險，是散戶最常繳納的昂貴學費</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; text-align:center;">
            <div style="background:#ecfdf5; padding:8px; border-radius:6px;">
              <span style="font-size:0.72rem; color:#065f46;">美元定存高利</span>
              <div style="font-size:1.3rem; font-weight:900; color:#10b981;">+5.50%</div>
            </div>
            <div style="background:#fef2f2; padding:8px; border-radius:6px;">
              <span style="font-size:0.72rem; color:#991b1b;">台幣升值匯損 (32.5➔29.5)</span>
              <div style="font-size:1.3rem; font-weight:900; color:#ef4444;">-9.23%</div>
            </div>
            <div style="background:#eff6ff; padding:8px; border-radius:6px;">
              <span style="font-size:0.72rem; color:#1e40af;">實質淨報酬率</span>
              <div style="font-size:1.3rem; font-weight:900; color:#dc2626;">-3.73%</div>
            </div>
          </div>
          <p style="font-size:0.74rem; color:#64748b; margin:6px 0 0 0; text-align:center;">換算 100 萬台幣不僅沒賺到 5.5 萬利息，本利換回台幣反而實質淨虧損 3.7 萬元！</p>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎓 生活中的匯率實感：留學學費與 iPhone 售價</h4>
          <span class="sub-tag">匯率不是冰冷的統計數字，而是每分每秒在掏空你荷包的隱形推手</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">🇺🇸 美國留學學費 (5 萬美元)</strong>
            <ul style="font-size:0.72rem; color:#78350f; margin:6px 0 0 0; padding-left:16px;">
              <li>匯率 27.5 時：需付出 <strong>137.5 萬台幣</strong></li>
              <li>匯率 32.5 時：需付出 <strong>162.5 萬台幣</strong></li>
              <li>➔ <strong>一毛不差得多掏出 25 萬新台幣！</strong></li>
            </ul>
          </div>
          <div style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#334155; font-size:0.85rem;">📱 iPhone 與進口筆電售價</strong>
            <ul style="font-size:0.72rem; color:#475569; margin:6px 0 0 0; padding-left:16px;">
              <li>美國定價維持 $999 不變</li>
              <li>台幣貶值時台灣官網開賣直接漲價 3,000~4,000 元</li>
              <li>海外代購與科技產品成本水漲船高</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 官方權威數據庫：臺灣銀行牌告與央行外匯局</h4>
          <span class="sub-tag">不聽信名嘴造謠！學會直接查閱官方第一手國際收支與即期牌告</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#1e3a8a; font-size:0.82rem;">臺灣銀行牌告匯率網</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">提供 19 國幣別即時買入/賣出牌告、歷史走勢圖表與走勢高低點統計。</p>
            <span style="font-size:0.7rem; color:#2563eb;">網址：rate.bot.com.tw</span>
          </div>
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">中央銀行外匯局統計專區</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">每月公布台灣外匯存底、經常帳順差、各國實質有效匯率指數 (REER)。</p>
            <span style="font-size:0.7rem; color:#0d9488;">網址：cbc.gov.tw</span>
          </div>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 個人 10%~15% 美元戰略護城河配置法則</h4>
          <span class="sub-tag">家庭財務安全的戰略蓄水池：以全球第一儲備貨幣對沖地緣政治風險</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px;">
          <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:8px; text-align:center;">
            <div style="background:#eff6ff; padding:8px; border-radius:6px;">
              <strong style="color:#1e40af; font-size:0.8rem;">70%~80% 本幣核心流動池</strong>
              <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">生活費、房貸、高利活存與台股 ETF</p>
            </div>
            <div style="background:#f0fdfa; padding:8px; border-radius:6px;">
              <strong style="color:#0f766e; font-size:0.8rem;">10%~15% 美元防衛桶</strong>
              <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">全球避險、美債或 VT 全球配置</p>
            </div>
            <div style="background:#fffbeb; padding:8px; border-radius:6px;">
              <strong style="color:#b45309; font-size:0.8rem;">5% 觀光娛樂池</strong>
              <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">日圓/歐元分批換匯出國玩</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛒 跨國網購 (Amazon / 淘寶) 三步省錢避坑術</h4>
          <span class="sub-tag">巧妙避開 1.5% 海外手續費與幣別動態轉換陷阱</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#eff6ff; border-top:3px solid #2563eb; border-radius:6px; padding:8px;">
            <strong style="color:#1e40af; font-size:0.78rem;">第 1 步：選當地貨幣</strong>
            <p style="font-size:0.7rem; color:#475569; margin-top:4px;">Amazon 選 USD、淘寶選 RMB，堅決不讓平台以台幣結算。</p>
          </div>
          <div style="background:#f0fdf4; border-top:3px solid #16a34a; border-radius:6px; padding:8px;">
            <strong style="color:#166534; font-size:0.78rem;">第 2 步：卡片回饋 > 1.5%</strong>
            <p style="font-size:0.7rem; color:#475569; margin-top:4px;">使用海外刷卡 3%~5% 現金回饋信用卡，倒賺 1.5%~3.5% 差額！</p>
          </div>
          <div style="background:#fffbeb; border-top:3px solid #d97706; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.78rem;">第 3 步：留意免稅額度</strong>
            <p style="font-size:0.7rem; color:#475569; margin-top:4px;">單筆完稅價格 2,000 元以下免稅，半年享有 6 次免稅額度。</p>
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⏳ 新台幣 20 年歷史常態區間與均值回歸思考</h4>
          <span class="sub-tag">歷史是最好的指南針：理解 27.5 至 35.0 的景氣與匯率輪迴</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; text-align:center;">
            <div style="background:#ecfdf5; padding:8px; border-radius:6px; border:1px solid #a7f3d0;">
              <span style="font-size:0.72rem; color:#065f46;">強勢升值區</span>
              <strong style="font-size:1.1rem; color:#047857;">27.5 ~ 29.5</strong>
              <p style="font-size:0.7rem; color:#065f46; margin-top:2px;">台商大回流、美金分批撿便宜良機</p>
            </div>
            <div style="background:#eff6ff; padding:8px; border-radius:6px; border:1px solid #bfdbfe;">
              <span style="font-size:0.72rem; color:#1e40af;">長期常態中樞</span>
              <strong style="font-size:1.1rem; color:#1e3a8a;">30.0 ~ 31.5</strong>
              <p style="font-size:0.7rem; color:#1e40af; margin-top:2px;">台灣央行合意動態平衡常態區間</p>
            </div>
            <div style="background:#fef2f2; padding:8px; border-radius:6px; border:1px solid #fecaca;">
              <span style="font-size:0.72rem; color:#991b1b;">弱勢貶值區</span>
              <strong style="font-size:1.1rem; color:#b91c1c;">32.5 ~ 34.0</strong>
              <p style="font-size:0.7rem; color:#991b1b; margin-top:2px;">美元高息狂飆、切忌盲目追高恐慌買美金</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📝 第七週課堂作業指引：自選外幣換匯規劃報告</h4>
          <span class="sub-tag">整合牌告點差、購買力平價、產業傳遞與個人避險配置策略</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#1e3a8a; font-size:0.78rem;">1. 牌告解析 (25%)</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">精準比對該幣別即期與現金點差成本，選擇最適換匯管道。</p>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#0f766e; font-size:0.78rem;">2. 產業衝擊 (30%)</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">分析該外幣對台幣升貶值時，對台灣特定產業與個人生活之具體影響。</p>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.78rem;">3. 購買力判斷 (25%)</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">運用大麥克指數或利差概念，評估目前幣值是否合理或存在高低估。</p>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#6b21a8; font-size:0.78rem;">4. 換匯避險計畫 (20%)</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">擬定具體可行的分批建倉與雙幣卡/提款防坑配置策略。</p>
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第七週全景體系架構：個人與全球外匯戰略</h4>
          <span class="sub-tag">完整打通微觀個人消費與宏觀全球金流的認知壁壘</span>
        </div>
        <div style="background:#0f172a; color:#fff; border-radius:8px; padding:12px;">
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; text-align:center;">
            <div style="background:rgba(255,255,255,0.08); padding:8px; border-radius:6px;">
              <div style="color:#60a5fa; font-size:0.72rem; font-weight:700;">第一層：牌告點差</div>
              <p style="font-size:0.68rem; color:#cbd5e1; margin-top:4px;">即期優於現金<br>拒絕 DCC 加價</p>
            </div>
            <div style="background:rgba(255,255,255,0.08); padding:8px; border-radius:6px;">
              <div style="color:#2dd4bf; font-size:0.72rem; font-weight:700;">第二層：總經平價</div>
              <p style="font-size:0.68rem; color:#cbd5e1; margin-top:4px;">大麥克 PPP<br>台美利差 IRP</p>
            </div>
            <div style="background:rgba(255,255,255,0.08); padding:8px; border-radius:6px;">
              <div style="color:#fbbf24; font-size:0.72rem; font-weight:700;">第三層：國家後盾</div>
              <p style="font-size:0.68rem; color:#cbd5e1; margin-top:4px;">5,750億存底<br>央行柳樹動態平衡</p>
            </div>
            <div style="background:rgba(255,255,255,0.08); padding:8px; border-radius:6px;">
              <div style="color:#f472b6; font-size:0.72rem; font-weight:700;">第四層：個人避險</div>
              <p style="font-size:0.68rem; color:#cbd5e1; margin-top:4px;">10% 戰略美元桶<br>均值回歸分批布局</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card" style="text-align:center;">
        <div class="diagram-header">
          <h4>🎓 恭喜完成第七週全單元！進入挑戰與報告驗收</h4>
          <span class="sub-tag">你已經具備國際視野的外匯素養與實戰避險決策力</span>
        </div>
        <div style="padding:16px 8px;">
          <div style="font-size:2.5rem; margin-bottom:8px;">🏆</div>
          <p style="font-size:0.85rem; color:#475569; margin-bottom:14px;">請完成以下兩大任務，驗收本週學習成果並產出個人外匯研究報告：</p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-nav-step btn-primary-step" onclick="openModal('modalForexGame')" style="padding:10px 20px; font-size:0.95rem;">
              <span>🎮</span> 開啟「外匯金融達人大挑戰」
            </button>
            <button class="btn-nav-step" onclick="openModal('modalHomework')" style="padding:10px 20px; font-size:0.95rem; background:#0d9488; color:#fff;">
              <span>📝</span> 開啟「本週課堂作業報告」
            </button>
          </div>
        </div>
      </div>`;
      break;

    default:
      container.innerHTML = `<div class="visual-diagram-card"><p>Slide ${id} 內容準備中...</p></div>`;
  }
}

// ---------------------- 1 HOUR ACTIVITY: EXCHANGE CALC ----------------------
function initExchangeCalc() {
  const inputTwd = document.getElementById('calcTwdAmount');
  const selectCurrency = document.getElementById('calcCurrencySelect');
  const inputSpot = document.getElementById('calcSpotRate');
  const inputCash = document.getElementById('calcCashRate');

  document.querySelectorAll('.fx-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.fx-preset-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const presetKey = e.currentTarget.getAttribute('data-preset');
      const preset = W7_EXCHANGE_PRESETS[presetKey];
      if (preset) {
        if (inputTwd) inputTwd.value = preset.twdAmount;
        if (selectCurrency) selectCurrency.value = preset.currency;
        if (inputSpot) inputSpot.value = preset.spotSell;
        if (inputCash) inputCash.value = preset.cashSell;
        APP_STATE.exchangeState = {
          twdAmount: preset.twdAmount,
          currency: preset.currency,
          spotSell: preset.spotSell,
          cashSell: preset.cashSell
        };
        calculateExchange(preset.advice);
      }
    });
  });

  [inputTwd, selectCurrency, inputSpot, inputCash].forEach(el => {
    el?.addEventListener('input', () => {
      APP_STATE.exchangeState.twdAmount = parseFloat(inputTwd?.value) || 0;
      APP_STATE.exchangeState.currency = selectCurrency?.value || 'JPY';
      APP_STATE.exchangeState.spotSell = parseFloat(inputSpot?.value) || 0.0001;
      APP_STATE.exchangeState.cashSell = parseFloat(inputCash?.value) || 0.0001;
      calculateExchange();
    });
  });

  calculateExchange(W7_EXCHANGE_PRESETS.jpy_travel.advice);
}

function calculateExchange(customAdvice = '') {
  const { twdAmount, currency, spotSell, cashSell } = APP_STATE.exchangeState;
  if (!spotSell || !cashSell || twdAmount <= 0) return;

  const spotFx = twdAmount / spotSell;
  const cashFx = twdAmount / cashSell;
  const extraFx = spotFx - cashFx;
  const savedTwd = extraFx * spotSell;
  const savingPct = ((cashSell - spotSell) / cashSell) * 100;

  const elSpotFx = document.getElementById('outSpotFx');
  const elCashFx = document.getElementById('outCashFx');
  const elExtraFx = document.getElementById('outExtraFx');
  const elSavedTwd = document.getElementById('outSavedTwd');
  const elAdvice = document.getElementById('outExchangeAdvice');

  if (elSpotFx) elSpotFx.textContent = `${Math.round(spotFx).toLocaleString()} ${currency}`;
  if (elCashFx) elCashFx.textContent = `${Math.round(cashFx).toLocaleString()} ${currency}`;
  if (elExtraFx) elExtraFx.textContent = `+${Math.round(extraFx).toLocaleString()} ${currency}`;
  if (elSavedTwd) elSavedTwd.textContent = `約 NT$ ${Math.round(savedTwd).toLocaleString()} 元 (省 ${savingPct.toFixed(2)}%)`;

  if (elAdvice) {
    if (customAdvice) {
      elAdvice.innerHTML = `<strong>💡 換匯策略分析：</strong>${customAdvice}`;
    } else {
      elAdvice.innerHTML = `<strong>💡 換匯策略分析：</strong>透過網銀即期匯率換匯，相較臨櫃現鈔可多拿 <strong>${Math.round(extraFx).toLocaleString()} ${currency}</strong>（省下 ${savingPct.toFixed(2)}% 點差成本，約當 NT$ ${Math.round(savedTwd).toLocaleString()} 元）！建議出國前直接綁定雙幣信用卡扣款，或在外幣 ATM 提領現鈔，是最高效的省錢選擇。`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: BIG MAC PPP CALC ----------------------
function initPppCalc() {
  const inputLocal = document.getElementById('calcPppLocal');
  const inputUs = document.getElementById('calcPppUs');
  const inputMarket = document.getElementById('calcPppMarket');

  document.querySelectorAll('.ppp-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.ppp-preset-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const presetKey = e.currentTarget.getAttribute('data-preset');
      const preset = W7_PPP_PRESETS[presetKey];
      if (preset) {
        if (inputLocal) inputLocal.value = preset.localPrice;
        if (inputUs) inputUs.value = preset.usPrice;
        if (inputMarket) inputMarket.value = preset.marketRate;
        APP_STATE.pppState = {
          localPrice: preset.localPrice,
          usPrice: preset.usPrice,
          marketRate: preset.marketRate,
          isReverse: !!preset.isReverse
        };
        calculatePpp(preset.currencySymbol, preset.diagnosis);
      }
    });
  });

  [inputLocal, inputUs, inputMarket].forEach(el => {
    el?.addEventListener('input', () => {
      APP_STATE.pppState.localPrice = parseFloat(inputLocal?.value) || 0;
      APP_STATE.pppState.usPrice = parseFloat(inputUs?.value) || 1;
      APP_STATE.pppState.marketRate = parseFloat(inputMarket?.value) || 1;
      calculatePpp('NT$');
    });
  });

  calculatePpp('NT$', W7_PPP_PRESETS.taiwan_twd.diagnosis);
}

function calculatePpp(currencySymbol = 'NT$', customDiagnosis = '') {
  const { localPrice, usPrice, marketRate, isReverse } = APP_STATE.pppState;
  if (!usPrice || !marketRate) return;

  const impliedRate = localPrice / usPrice;
  let valuationPct = 0;

  if (isReverse) {
    const localInUsd = localPrice * marketRate;
    valuationPct = ((localInUsd - usPrice) / usPrice) * 100;
  } else {
    const localInUsd = localPrice / marketRate;
    valuationPct = ((localInUsd - usPrice) / usPrice) * 100;
  }

  const elImplied = document.getElementById('outPppImpliedRate');
  const elValuation = document.getElementById('outPppValuation');
  const elStatusTag = document.getElementById('outPppStatusTag');
  const elDiagnosis = document.getElementById('outPppDiagnosis');

  if (elImplied) elImplied.textContent = `${impliedRate.toFixed(2)} ${isReverse ? 'USD/EUR' : currencySymbol + '/USD'}`;
  if (elValuation) {
    const isUndervalued = valuationPct < 0;
    elValuation.textContent = `${valuationPct > 0 ? '+' : ''}${valuationPct.toFixed(1)}% (${isUndervalued ? '被低估' : '被高估'})`;
    elValuation.style.color = isUndervalued ? '#16a34a' : '#dc2626';
  }

  if (elStatusTag) {
    if (valuationPct < -25) {
      elStatusTag.textContent = '出口超強 ‧ 留學偏貴';
      elStatusTag.style.color = '#16a34a';
    } else if (valuationPct > 20) {
      elStatusTag.textContent = '幣值高估 ‧ 物價昂貴';
      elStatusTag.style.color = '#dc2626';
    } else {
      elStatusTag.textContent = '貼近均衡 ‧ 購買力平價';
      elStatusTag.style.color = '#0d9488';
    }
  }

  if (elDiagnosis) {
    if (customDiagnosis) {
      elDiagnosis.innerHTML = `<strong>🔍 總經深度診斷：</strong>${customDiagnosis}`;
    } else {
      elDiagnosis.innerHTML = `<strong>🔍 總經深度診斷：</strong>該國大麥克隱含匯率為 ${impliedRate.toFixed(2)}，與市場匯率相差 ${Math.abs(valuationPct).toFixed(1)}%。這反映了該國在非貿易品、勞動成本與貿易結構上的根本差異。`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: FOREX QUIZ GAME ----------------------
function initForexGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderForexGameLevel();
}

function renderForexGameLevel() {
  const container = document.getElementById('forexGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W7_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 75;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【外匯交易達人 (Forex Master)】最高榮譽！' : '挑戰完成！榮獲【外匯入門探索者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#1e3a8a; font-size:1.3rem;">${APP_STATE.gameScore} / 100 分</strong>
        </p>
        <div style="max-width:500px; margin:0 auto 20px auto; padding:14px; border-radius:10px; background:#f8fafc; border:1px solid #e2e8f0; font-size:0.85rem; line-height:1.6; text-align:left;">
          <strong>🎯 本週避坑考核總結：</strong><br>
          1. 牌告看板永遠以銀行視角看「買入 (低價)」與「賣出 (高價)」。<br>
          2. 優先在網銀用即期匯率換匯，出國搭配雙幣卡扣款最省成本。<br>
          3. 新台幣貶值為台積電帶來毛利，但進口通膨需全民承受。<br>
          4. 海外刷卡結帳堅決拒絕 DCC 動態貨幣轉換，一律選當地貨幣！
        </div>
        <button class="btn-nav-step btn-primary-step" onclick="restartForexGame()">再次挑戰 🔄</button>
      </div>
    `;
    return;
  }

  const q = W7_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const answered = APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel];

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
      <span class="badge-hour">${q.badge} (第 ${q.level} 題 / 共 4 題)</span>
      <span style="font-weight:800; color:#1e3a8a; font-size:0.9rem;">目前累計得分：${APP_STATE.gameScore} 分</span>
    </div>
    <h4 style="font-size:1.05rem; font-weight:800; color:#1e293b; margin:6px 0;">${q.title}</h4>
    <div style="background:#f8fafc; border-left:4px solid #1e3a8a; padding:10px 14px; border-radius:4px; font-size:0.85rem; color:#334155; margin:10px 0;">
      <strong>情境說明：</strong>${q.scenario}
    </div>
    <div class="game-options-list" style="display:flex; flex-direction:column; gap:10px;">
      ${q.options.map((opt, idx) => `
        <button class="btn-quiz-option" onclick="handleForexGameAnswer(${idx})" ${answered ? 'disabled' : ''} style="text-align:left; padding:12px 16px; border:1px solid #cbd5e1; border-radius:8px; background:#fff; cursor:pointer; font-size:0.85rem; line-height:1.5;">
          ${opt.text}
        </button>
      `).join('')}
    </div>
    <div id="forexGameFeedback" style="margin-top:14px; display:none;"></div>
  `;
}

window.handleForexGameAnswer = function(optIdx) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W7_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const chosen = q.options[optIdx];
  const feedbackEl = document.getElementById('forexGameFeedback');

  if (chosen.isCorrect) {
    APP_STATE.gameScore += 25;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="padding:12px; border-radius:8px; background:#f0fdf4; border:1px solid #86efac; color:#166534; font-size:0.88rem;">
          ${chosen.feedback}
          <div style="margin-top:10px;">
            <button class="btn-nav-step btn-primary-step" onclick="nextForexGameLevel()">前進下一關 ➔</button>
          </div>
        </div>
      `;
    }
  } else {
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="padding:12px; border-radius:8px; background:#fef2f2; border:1px solid #fca5a5; color:#991b1b; font-size:0.88rem;">
          ${chosen.feedback}
          <div style="margin-top:10px;">
            <button class="btn-nav-step" onclick="nextForexGameLevel()">跳過此題，繼續挑戰 ➔</button>
          </div>
        </div>
      `;
    }
  }
};

window.nextForexGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderForexGameLevel();
};

window.restartForexGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderForexGameLevel();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetCurrency', 'hwRateComp', 'hwTrendAnalysis', 'hwIndustryImpact', 'hwFxStrategy', 'hwConclusionGrade', 'hwDecisionSummary'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', saveHomeworkToLocal);
    el?.addEventListener('change', saveHomeworkToLocal);
  });
}

function saveHomeworkToLocal() {
  const data = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    targetCurrency: document.getElementById('hwTargetCurrency')?.value || 'JPY 日圓',
    rateComp: document.getElementById('hwRateComp')?.value || '',
    trendAnalysis: document.getElementById('hwTrendAnalysis')?.value || '',
    industryImpact: document.getElementById('hwIndustryImpact')?.value || '',
    fxStrategy: document.getElementById('hwFxStrategy')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('w7_homework_draft', JSON.stringify(data));
    const status = document.getElementById('hwSaveStatus');
    if (status) {
      status.textContent = '已自動儲存草稿';
      setTimeout(() => { status.textContent = ''; }, 2000);
    }
  } catch (e) {
    console.warn(e);
  }
}

function loadSavedHomework() {
  try {
    const saved = localStorage.getItem('w7_homework_draft');
    if (saved) {
      const data = JSON.parse(saved);
      if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
      if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
      if (document.getElementById('hwTargetCurrency')) document.getElementById('hwTargetCurrency').value = data.targetCurrency || 'JPY 日圓';
      if (document.getElementById('hwRateComp')) document.getElementById('hwRateComp').value = data.rateComp || '';
      if (document.getElementById('hwTrendAnalysis')) document.getElementById('hwTrendAnalysis').value = data.trendAnalysis || '';
      if (document.getElementById('hwIndustryImpact')) document.getElementById('hwIndustryImpact').value = data.industryImpact || '';
      if (document.getElementById('hwFxStrategy')) document.getElementById('hwFxStrategy').value = data.fxStrategy || '';
      if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'A+ (全面且具備實戰避險可行性)';
      if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
    }
  } catch (e) {
    console.warn(e);
  }
}

window.loadHomeworkTemplate = function() {
  const t = W7_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = t.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = t.studentId;
  if (document.getElementById('hwTargetCurrency')) document.getElementById('hwTargetCurrency').value = t.targetCurrency;
  if (document.getElementById('hwRateComp')) document.getElementById('hwRateComp').value = t.rateComp;
  if (document.getElementById('hwTrendAnalysis')) document.getElementById('hwTrendAnalysis').value = t.trendAnalysis;
  if (document.getElementById('hwIndustryImpact')) document.getElementById('hwIndustryImpact').value = t.industryImpact;
  if (document.getElementById('hwFxStrategy')) document.getElementById('hwFxStrategy').value = t.fxStrategy;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = t.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = t.decisionSummary;
  saveHomeworkToLocal();
  alert('已成功載入日圓換匯與防坑實戰示範範本！');
};

window.exportHomeworkJson = function() {
  saveHomeworkToLocal();
  const saved = localStorage.getItem('w7_homework_draft') || '{}';
  const data = JSON.parse(saved);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W7_外匯作業報告_${data.studentName || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportHomeworkMd = function() {
  saveHomeworkToLocal();
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const sid = document.getElementById('hwStudentId')?.value || '未填寫';
  const curr = document.getElementById('hwTargetCurrency')?.value || 'JPY 日圓';
  const rateComp = document.getElementById('hwRateComp')?.value || '';
  const trend = document.getElementById('hwTrendAnalysis')?.value || '';
  const industry = document.getElementById('hwIndustryImpact')?.value || '';
  const fxPlan = document.getElementById('hwFxStrategy')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第七週作業報告：自選外幣換匯規劃與匯率變動影響分析
- **學生姓名**：${name}
- **學生學號**：${sid}
- **研究外幣**：${curr}
- **作業評級**：${grade}
- **決策總結**：${summary}

---
### 一、牌告解析：該外幣即期 vs. 現金賣出匯率點差計算與省錢管道選擇 (25%)
${rateComp}

---
### 二、趨勢與平價：近期走勢、美台/台外利差與大麥克指數 (PPP) 評估 (25%)
${trend}

---
### 三、產業與生活衝擊：該外幣若對台幣大幅升貶值，對台灣產業與個人生活之影響 (30%)
${industry}

---
### 四、換匯與避險計畫：個人分批進場原則、雙幣卡搭配與海外消費拒絕 DCC 策略 (20%)
${fxPlan}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製 Markdown 格式作業報告至剪貼簿！');
  }).catch(() => {
    prompt('請複製以下 Markdown 內容：', md);
  });
};

// ---------------------- GRID OVERVIEW ----------------------
function initGridOverview() {
  document.querySelectorAll('.tab-hour-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-hour-filter').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const hour = e.target.getAttribute('data-hour');
      renderGridCards(hour, document.getElementById('gridSearchInput')?.value || '');
    });
  });

  const searchInput = document.getElementById('gridSearchInput');
  searchInput?.addEventListener('input', (e) => {
    const activeHour = document.querySelector('.tab-hour-filter.active')?.getAttribute('data-hour') || 'all';
    renderGridCards(activeHour, e.target.value.trim());
  });
}

function renderGridCards(filterHour = 'all', searchQuery = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;

  const isZh = APP_STATE.lang === 'zh';
  const query = searchQuery.toLowerCase();

  const filtered = W7_SLIDES_DATA.filter(s => {
    const matchHour = filterHour === 'all' || String(s.hour) === filterHour;
    const matchText = !query || s.title.toLowerCase().includes(query) || s.subtitle.toLowerCase().includes(query);
    return matchHour && matchText;
  });

  container.innerHTML = filtered.map(s => `
    <div class="overview-card-item hour-${s.hour}" onclick="jumpToSlide(${s.id - 1})">
      <div class="overview-card-meta">
        <span class="badge-slide-num">#${String(s.id).padStart(2, '0')}</span>
        <span class="badge-hour">${isZh ? `第 ${s.hour} 小時` : `Hour ${s.hour}`}</span>
      </div>
      <h4 class="overview-card-title">${isZh ? s.title : s.titleEn}</h4>
      <p class="overview-card-desc">${isZh ? s.subtitle : s.subtitleEn}</p>
      <div class="overview-card-footer">
        <span>${isZh ? s.category : s.categoryEn}</span>
        <span style="color:#2563eb; font-weight:700;">點擊進入 ➔</span>
      </div>
    </div>
  `).join('');
}

// ---------------------- CANVAS DRAWING ----------------------
let canvasCtx = null;
let isPainting = false;

function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  const btnToggle = document.getElementById('btnToggleDrawing');
  const toolbar = document.getElementById('drawingToolbar');

  if (!canvas) return;
  canvasCtx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  btnToggle?.addEventListener('click', () => {
    APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
    canvas.classList.toggle('active', APP_STATE.isDrawingActive);
    toolbar?.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    btnToggle.classList.toggle('active', APP_STATE.isDrawingActive);
  });

  document.querySelectorAll('.btn-draw-tool').forEach(b => {
    b.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-draw-tool').forEach(btn => btn.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      APP_STATE.drawingTool = target.getAttribute('data-tool');
    });
  });

  document.querySelectorAll('.color-swatch').forEach(s => {
    s.addEventListener('click', (e) => {
      document.querySelectorAll('.color-swatch').forEach(sw => sw.classList.remove('active'));
      e.target.classList.add('active');
      APP_STATE.drawingColor = e.target.getAttribute('data-color');
    });
  });

  document.getElementById('btnClearDrawing')?.addEventListener('click', () => clearDrawingCanvas(true));
  document.getElementById('btnClearCanvas')?.addEventListener('click', () => clearDrawingCanvas(true));

  document.getElementById('btnSaveDrawing')?.addEventListener('click', () => {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `W7_課堂標註_Slide_${APP_STATE.currentSlideIndex + 1}.png`;
    a.href = canvas.toDataURL();
    a.click();
  });

  canvas.addEventListener('mousedown', startPaint);
  canvas.addEventListener('mousemove', drawPaint);
  canvas.addEventListener('mouseup', stopPaint);
  canvas.addEventListener('mouseleave', stopPaint);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startPaint({ clientX: touch.clientX, clientY: touch.clientY });
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    drawPaint({ clientX: touch.clientX, clientY: touch.clientY });
  });
  canvas.addEventListener('touchend', stopPaint);
}

function resizeCanvas() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startPaint(e) {
  if (!APP_STATE.isDrawingActive) return;
  isPainting = true;
  canvasCtx.beginPath();
  canvasCtx.moveTo(e.clientX, e.clientY);
}

function drawPaint(e) {
  if (!isPainting || !APP_STATE.isDrawingActive) return;
  if (APP_STATE.drawingTool === 'eraser') {
    canvasCtx.strokeStyle = '#ffffff';
    canvasCtx.lineWidth = 20;
    canvasCtx.globalAlpha = 1.0;
  } else if (APP_STATE.drawingTool === 'highlighter') {
    canvasCtx.strokeStyle = APP_STATE.drawingColor;
    canvasCtx.lineWidth = 14;
    canvasCtx.globalAlpha = 0.35;
  } else {
    canvasCtx.strokeStyle = APP_STATE.drawingColor;
    canvasCtx.lineWidth = 3;
    canvasCtx.globalAlpha = 1.0;
  }
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';
  canvasCtx.lineTo(e.clientX, e.clientY);
  canvasCtx.stroke();
}

function stopPaint() {
  isPainting = false;
  if (canvasCtx) canvasCtx.beginPath();
}

function clearDrawingCanvas(animate = true) {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas || !canvasCtx) return;
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------------------- KEYBOARD SHORTCUTS ----------------------
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'PageUp':
        prevSlide();
        break;
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'n':
      case 'N':
        toggleTeacherNotes();
        break;
      case 'm':
      case 'M':
        toggleViewMode();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'd':
      case 'D':
        document.getElementById('btnToggleDrawing')?.click();
        break;
      case 'Escape':
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        break;
    }
  });
}

// ---------------------- MODAL UTILITIES ----------------------
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.onclick = (e) => {
      if (e.target === modal) closeModal(modalId);
    };
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};
