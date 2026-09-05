/**
 * 115學年度「管理探索二」第六週互動教學主程式
 * 單元名稱：數位金融、高利活存與銀行業變革
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#2563eb',
  drawingWidth: 3,

  // 1小時活動 (高利活存精算)
  savingsState: {
    depositAmount: 100000,
    promoRate: 3.5,
    promoCap: 100000,
    baseRate: 0.8
  },

  // 2小時活動 (信用卡回饋與海外手續費)
  cardState: {
    spendAmount: 10000,
    rewardRate: 3.5,
    isForeign: true,
    foreignFeeRate: 1.5
  },

  // 3小時遊戲
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業
  homeworkData: {
    studentName: '',
    studentId: '',
    accountComp: '',
    spendingPlan: '',
    securitySop: '',
    creditStrategy: '',
    conclusionGrade: 'Optimal 1+2 Structure',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initSavingsCalc();
  initCardCalc();
  initFintechGame();
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
  W6_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W6_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W6_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W6_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W6_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W6_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W6_SLIDES_DATA.length - 1) {
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
          <h4>📱 銀行服務是必要的，但實體分行不是！</h4>
          <span class="sub-tag">「Banking is necessary, banks are not!」— Bill Gates</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:8px; padding:12px; text-align:center;">
            <span style="font-size:2rem;">🏛️</span>
            <h5 style="margin:4px 0; color:#1e40af;">過去：實體分行排隊</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#2563eb;">抽號碼牌等 60 分鐘</div>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">需帶印章、雙證件，受限 15:30 鐵門拉下時間。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
            <span style="font-size:2rem;">⚡</span>
            <h5 style="margin:4px 0; color:#15803d;">現在：純手機數位開戶</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#16a34a;">5 分鐘隨開隨用</div>
            <p style="font-size:0.75rem; color:#14532d; margin-top:4px;">24 小時無休，拍照上傳雙證件即刻審核開卡。</p>
          </div>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第六週 3 小時學習地圖與核心技能樹</h4>
          <span class="sub-tag">從銀行底層商業架構到個人 1+2 帳戶資安實戰配置</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border-top:4px solid #2563eb; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.85rem;">第 1 小時 ‧ 銀行與利差</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">NIM 淨利差、信用創造乘數、純網銀三雄、高利限額真相、CDIC 300萬存保。</p>
          </div>
          <div style="background:#f5f3ff; border-top:4px solid #7c3aed; border-radius:8px; padding:10px;">
            <strong style="color:#6d28d9; font-size:0.85rem;">第 2 小時 ‧ 支付與利息</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">支付演進、海外 1.5% 手續費、DDC 避坑、點數過期、分期 0% 與 15% 循環黑洞。</p>
          </div>
          <div style="background:#f0fdf4; border-top:4px solid #059669; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.85rem;">第 3 小時 ‧ 資安與實戰</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">2FA 雙重驗證、釣魚防詐、人頭帳戶刑責、1薪轉+2活存配置、JCIC 信用護照。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 商業銀行核心模式：存款、放款與淨利差 (NIM)</h4>
          <span class="sub-tag">銀行本質是「低買高賣資金租金」的金融中介商</span>
        </div>
        <div class="nim-diagram-box">
          <div class="nim-rates-row">
            <div class="nim-rate-chip deposit">
              <span>吸收存款活存利息</span>
              <div style="font-size:1.2rem; font-weight:900;">0.80%</div>
            </div>
            <div style="font-size:1.5rem; color:#64748b; font-weight:800;">➔ 銀行賺差價 ➔</div>
            <div class="nim-rate-chip loan">
              <span>個人信用貸款利息</span>
              <div style="font-size:1.2rem; font-weight:900;">6.00%</div>
            </div>
          </div>
          <div style="background:#f0fdf4; border-radius:6px; padding:8px; text-align:center; border:1px solid #86efac;">
            <strong style="color:#166534; font-size:0.88rem;">淨利差 (NIM) = 6.00% - 0.80% = 5.20%</strong>
            <div style="font-size:0.75rem; color:#14532d; margin-top:2px;">存入 10 萬給存戶 800 元，借給借款人收 6,000 元，銀行淨賺 5,200 元利差！</div>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🪄 信用創造機制：銀行如何「憑空製造貨幣」？</h4>
          <span class="sub-tag">部分準備金制度 (Fractional Reserve Banking) 放大 10 倍 M2 貨幣</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:0.8rem; font-weight:700;">法定準備率 = 10%</span>
            <span style="font-size:0.8rem; font-weight:800; color:#2563eb;">貨幣乘數 = 1 / 10% = 10 倍</span>
          </div>
          <div style="display:flex; justify-content:space-between; text-align:center; font-size:0.75rem; background:#fff; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
            <div><strong>存入現金</strong><br><span style="color:#16a34a; font-weight:900; font-size:1.1rem;">$10,000</span></div>
            <div style="font-size:1.2rem; align-self:center;">➔</div>
            <div><strong>保留準備金</strong><br><span style="color:#dc2626; font-weight:900; font-size:1.1rem;">$1,000</span></div>
            <div style="font-size:1.2rem; align-self:center;">➔</div>
            <div><strong>循環放款創造</strong><br><span style="color:#2563eb; font-weight:900; font-size:1.1rem;">$100,000</span></div>
          </div>
          <p style="font-size:0.72rem; color:#64748b; margin:6px 0 0 0; text-align:center;">現代社會 90% 以上的貨幣不是央行印製的鈔票，而是銀行放款衍生出來的信用數字！</p>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏢 傳統銀行實體分行 vs 數位存款帳戶</h4>
          <span class="sub-tag">營運成本結構的降維打擊：省下租金與人力，回饋高利活存</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
            <strong style="color:#991b1b; font-size:0.85rem;">傳統實體分行 (每年成本千萬)</strong>
            <ul style="font-size:0.74rem; color:#7f1d1d; margin:6px 0 0 0; padding-left:16px; line-height:1.4;">
              <li>黃金地段店面高額租金</li>
              <li>警衛保全、金庫硬體與水電</li>
              <li>櫃員、行員與分行經理薪資</li>
              <li>➔ 僅能給予 <strong>0.8% 活存牌告</strong></li>
            </ul>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.85rem;">純數位/純網銀 (零實體門市)</strong>
            <ul style="font-size:0.74rem; color:#14532d; margin:6px 0 0 0; padding-left:16px; line-height:1.4;">
              <li>完全零實體店面租金成本</li>
              <li>自動化雲端系統降低人事開銷</li>
              <li>大幅節省的行銷營運預算</li>
              <li>➔ 反饋給年輕人 <strong>2%~3.5% 高利活存</strong></li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 實證數據：全台數位存款帳戶突破 2,350 萬戶</h4>
          <span class="sub-tag">平均每位成年人擁有 1 戶以上，數位原生代標準配備</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px; text-align:center;">
            <div style="font-size:0.8rem; color:#1e40af; font-weight:700;">傳統銀行數位副牌</div>
            <div style="font-size:1.6rem; font-weight:900; color:#2563eb; margin:4px 0;">1,950 萬戶</div>
            <div style="font-size:0.75rem; color:#1d4ed8;">台新 Richart、國泰 CUBE、永豐 DAWHO (市佔 > 80%)</div>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; text-align:center;">
            <div style="font-size:0.8rem; color:#166534; font-weight:700;">特許純網路銀行 (Neobanks)</div>
            <div style="font-size:1.6rem; font-weight:900; color:#16a34a; margin:4px 0;">400 萬戶</div>
            <div style="font-size:0.75rem; color:#14532d;">LINE Bank、樂天銀行、將來銀行三雄爭鳴</div>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🦁 純網銀三雄爭鳴：LINE Bank、樂天、將來銀行</h4>
          <span class="sub-tag">金管會核發特許執照，三大生態圈特色全比對</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#166534; font-size:0.85rem;">LINE Bank</strong>
            <div style="font-size:0.74rem; color:#059669; font-weight:700; margin:2px 0;">社群社交王者</div>
            <p style="font-size:0.72rem; color:#475569;">結合 2,100 萬 LINE 用戶，聊天室直接轉帳免帳號，點數即時發。</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#991b1b; font-size:0.85rem;">樂天國際銀行</strong>
            <div style="font-size:0.74rem; color:#dc2626; font-weight:700; margin:2px 0;">日系跨境生態</div>
            <p style="font-size:0.72rem; color:#475569;">日本樂天點數無痛轉換，赴日旅遊免手續費提領與桃猿棒球聯名。</p>
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#1e40af; font-size:0.85rem;">將來商業銀行</strong>
            <div style="font-size:0.74rem; color:#2563eb; font-weight:700; margin:2px 0;">國家隊自由口袋</div>
            <p style="font-size:0.72rem; color:#475569;">中華電信與全聯加持，自創活存多口袋分帳，業界最多免費跨轉。</p>
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🪤 拆解高利活存真相：牌告利率 vs 優惠額度限額算術</h4>
          <span class="sub-tag">廣告宣稱 8% 超誘人？看清背後上限僅「10,000 元」的行銷真相！</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px;">
          <div style="font-size:0.82rem; font-weight:800; color:#92400e; margin-bottom:6px;">實存 10 萬元實證精算表：</div>
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; background:#fff; padding:8px; border-radius:6px; margin-bottom:6px;">
            <span>前 1 萬 (8% 優惠上限): <strong>$66.7 /月</strong></span>
            <span>後 9 萬 (回歸 0.8% 牌告): <strong>$60.0 /月</strong></span>
            <span>全月利息合計: <strong style="color:#059669;">$126.7 元</strong></span>
          </div>
          <div style="text-align:center; font-size:0.82rem; font-weight:900; color:#b45309;">
            實質綜合年化有效利率 = 1.52%（而非廣告宣傳的 8%！）
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 中央存款保險公司 (CDIC) 300 萬元法定保障</h4>
          <span class="sub-tag">純網銀與實體銀行皆受國家法律 100% 同等保障</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div style="font-size:2.2rem;">🏛️</div>
            <div>
              <strong style="color:#166534; font-size:0.92rem;">每人每家銀行新台幣 300 萬元額度</strong>
              <div style="font-size:0.76rem; color:#15803d;">包含本金與應計利息，依法強制優先全額賠付！</div>
            </div>
          </div>
          <div style="background:#fff; border-left:4px solid #10b981; padding:8px 12px; font-size:0.78rem; color:#065f46;">
            <strong>完全免付保費：</strong>存款保險保費依法由各金融機構全額負擔，大一存戶享受 100% 免費之國家級安全保護！
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🎉 第一小時課程里程碑達成</div>
        <h4>數位帳戶高利活存與利息精算盤！</h4>
        <p>已掌握商業銀行存放款利差 (NIM)、信用創造乘數、純網銀架構與 CDIC 300萬存保。現在，開啟精算盤，破除 8% 宣傳噱頭，精算實質有效收益！</p>
        <div class="milestone-actions">
          <button class="btn-launch-lab btn-h1" onclick="openModal('modalSavingsCalc')">
            <span>🎯</span> 啟動「高利活存利息精算盤」
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💳 支付方式大演進：現金 ➔ 塑膠卡片 ➔ 行動支付 (TWQR)</h4>
          <span class="sub-tag">從有形鈔票到無感支付，科技如何改變交易摩擦力</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <div style="font-size:1.4rem;">💵</div>
            <strong style="font-size:0.8rem; color:#0f172a;">實體現金</strong>
            <div style="font-size:0.7rem; color:#64748b; margin-top:2px;">匿名性高/易遺失/無回饋</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <div style="font-size:1.4rem;">💳</div>
            <strong style="font-size:0.8rem; color:#0f172a;">塑膠卡片</strong>
            <div style="font-size:0.7rem; color:#64748b; margin-top:2px;">延後付款/刷卡回饋</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <div style="font-size:1.4rem;">📱</div>
            <strong style="font-size:0.8rem; color:#0f172a;">行動 TWQR</strong>
            <div style="font-size:0.7rem; color:#64748b; margin-top:2px;">NFC/掃碼一碼通用</div>
          </div>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔄 信用卡交易四角架構：商家手續費 2% 的分潤秘密</h4>
          <span class="sub-tag">持卡人的 1%~2% 現金回饋，本質上來自商家的手續費再分配！</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; text-align:center; font-size:0.75rem; margin-bottom:8px;">
            <div style="background:#eff6ff; padding:6px; border-radius:6px; flex:1;"><strong>持卡人</strong><br>刷卡消費享受回饋</div>
            <span style="margin:0 4px;">⇄</span>
            <div style="background:#f0fdf4; padding:6px; border-radius:6px; flex:1;"><strong>發卡銀行</strong><br>承擔信用發放回饋</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; text-align:center; font-size:0.75rem;">
            <div style="background:#fef2f2; padding:6px; border-radius:6px; flex:1;"><strong>特約商家</strong><br>支付 2% 刷卡手續費</div>
            <span style="margin:0 4px;">⇄</span>
            <div style="background:#fffbeb; padding:6px; border-radius:6px; flex:1;"><strong>收單行 / Visa-MC</strong><br>安裝機台與清算網路</div>
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>✈️ 海外刷卡手續費 1.5% 與拒絕 DDC 雙幣陷阱</h4>
          <span class="sub-tag">出國結算千萬別選新台幣，否則慘遭加收 5% 惡劣匯差！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.85rem;">選「當地貨幣 (JPY/USD)」</strong>
            <div style="font-size:1.1rem; font-weight:900; color:#15803d; margin:3px 0;">法定手續費僅 1.5%</div>
            <p style="font-size:0.74rem; color:#14532d;">搭配 3% 海外回饋卡，淨賺 1.5% 現金！</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#991b1b; font-size:0.85rem;">誤選「新台幣 (DDC 陷阱)」</strong>
            <div style="font-size:1.1rem; font-weight:900; color:#dc2626; margin:3px 0;">加收高達 4%~5% 手續費</div>
            <p style="font-size:0.74rem; color:#7f1d1d;">回饋全被吃光，倒賠數百元冤枉錢！</p>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🪙 點數經濟 (Points Economy) 與 180 天過期陷阱</h4>
          <span class="sub-tag">LINE Points / 街口幣不是真現金，放著不花會被無情歸零！</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <div style="font-size:2rem;">⏳</div>
            <div>
              <strong style="font-size:0.88rem; color:#0f172a;">過期收入 (Breakage Revenue) 秘密</strong>
              <div style="font-size:0.76rem; color:#64748b;">銀行發放點數而非現金，賭的就是消費者忘記折抵的機率！</div>
            </div>
          </div>
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; padding:8px 10px; font-size:0.76rem; color:#92400e;">
            <strong>防護秘訣：</strong>優先申辦直接折抵次月帳單之「真現金回饋卡」，或設定點數即時自動全額扣抵！
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛍️ 分期 0% 的心理學陷阱：模糊消費痛感</h4>
          <span class="sub-tag">月付 2,500 很輕鬆？當心多重分期壓垮大一每個月的生活費！</span>
        </div>
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:800; color:#9f1239; margin-bottom:6px;">分期付款三大暗藏代價：</div>
          <ul style="font-size:0.76rem; color:#881337; margin:0; padding-left:18px; line-height:1.5;">
            <li><strong>喪失回饋：</strong>多數銀行明文規定「分期消費不再享有現金回饋」。</li>
            <li><strong>佔用額度：</strong>30,000 元分 12 期，立即佔滿學生卡 20,000 元額度導致刷不過。</li>
            <li><strong>違約重罰：</strong>一期忘記繳納，立即終止 0% 並啟動 <strong>15% 循環利息！</strong></li>
          </ul>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🕳️ 循環信用利息 (Revolving Credit) 的 15% 高利黑洞</h4>
          <span class="sub-tag">只繳最低應繳金額？利息往前回溯自「商家入帳日」天天算！</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:900; color:#991b1b; margin-bottom:6px;">恐怖真相：失去免息期</div>
          <p style="font-size:0.76rem; color:#7f1d1d; margin:0; line-height:1.4;">
            一旦動用循環利息，當月所有新增刷卡全部喪失 30 天免息期，自商家入帳當日起天天按 6%~15% 計息，迅速滾成債務雪球，重創個人聯徵信用評分！
          </p>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌐 開放銀行 (Open Banking) API 與三階段藍圖</h4>
          <span class="sub-tag">金管會推動金融數據自由化，數據所有權回歸消費者</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
          <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:6px; padding:8px;">
            <strong style="font-size:0.8rem; color:#1e40af;">第一階段 (已上線)</strong>
            <div style="font-size:0.72rem; color:#3b82f6; font-weight:700; margin:2px 0;">公開商品查詢</div>
            <p style="font-size:0.68rem; color:#475569;">跨行比對各家房貸利率、信用卡回饋方案。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px;">
            <strong style="font-size:0.8rem; color:#166534;">第二階段 (已上線)</strong>
            <div style="font-size:0.72rem; color:#10b981; font-weight:700; margin:2px 0;">客戶資訊提供</div>
            <p style="font-size:0.68rem; color:#475569;">在麻布記帳等 App 跨行查詢所有銀行存款與帳單。</p>
          </div>
          <div style="background:#f5f3ff; border:1px solid #c4b5fd; border-radius:6px; padding:8px;">
            <strong style="font-size:0.8rem; color:#6d28d9;">第三階段 (試辦中)</strong>
            <div style="font-size:0.72rem; color:#8b5cf6; font-weight:700; margin:2px 0;">交易資訊整合</div>
            <p style="font-size:0.68rem; color:#475569;">直接在第三方 App 授權進行跨行調撥與扣款轉帳。</p>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏦 央行數位貨幣 (CBDC) vs 民間加密貨幣</h4>
          <span class="sub-tag">數位新台幣具備 100% 主權法償效力，零信用風險</span>
        </div>
        <table class="jargon-table" style="font-size:0.74rem;">
          <thead>
            <tr><th>比較維度</th><th>央行數位貨幣 (CBDC)</th><th>去中心化加密貨幣 (BTC/USDT)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>發行機構</strong></td><td>主權國家中央銀行 (CBC)</td><td>區塊鏈開源演算法 / 民間商業公司</td></tr>
            <tr><td><strong>法律地位</strong></td><td><strong>100% 法定貨幣 (強制流通)</strong></td><td>虛擬資產 / 投資商品 (無強制法償)</td></tr>
            <tr><td><strong>價格穩定度</strong></td><td><strong>與實體新台幣 1:1 絕對等值</strong></td><td>價格劇烈波動，風險極高</td></tr>
            <tr><td><strong>倒閉違約風險</strong></td><td><strong>零信用風險 (國家全額背書)</strong></td><td>交易所暴雷、私鑰遺失自負其責</td></tr>
          </tbody>
        </table>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📱 嵌入式金融：先買後付 (BNPL) 的便利與地雷</h4>
          <span class="sub-tag">無卡分期真輕鬆？一旦延遲還款，面臨高達 16% 違約懲罰！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.85rem;">表面優勢 (摩擦力為零)</strong>
            <p style="font-size:0.74rem; color:#334155; margin-top:4px;">手機簡訊確認即可結帳，免財力證明、免年費，享受延後付款。</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#991b1b; font-size:0.85rem;">隱藏地雷 (債台高築)</strong>
            <p style="font-size:0.74rem; color:#7f1d1d; margin-top:4px;">缺乏自制力易重複借貸，逾期遭收最高 16% 利息並委外催收。</p>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🎉 第二小時課程里程碑達成</div>
        <h4>信用卡現金回饋與海外手續費計算器！</h4>
        <p>已掌握信用卡四角生態、海外 1.5% 手續費算術、DDC 雙幣陷阱與 15% 循環利息危害。現在，開啟計算器，精算海外刷卡實質淨收益！</p>
        <div class="milestone-actions">
          <button class="btn-launch-lab btn-h2" onclick="openModal('modalCardCalc')">
            <span>🎯</span> 啟動「刷卡回饋計算器」
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 數位資安第一道防線：2FA 雙重驗證三大要素</h4>
          <span class="sub-tag">結合兩種以上不同維度認證，杜絕 99% 駭客盜帳號</span>
        </div>
        <div class="two-fa-shield-grid">
          <div class="shield-card">
            <div class="icon">🔑</div>
            <h5>1. 知識因素</h5>
            <p>只有你知道的事<br>(網銀密碼、交易 PIN 碼)</p>
          </div>
          <div class="shield-card">
            <div class="icon">📱</div>
            <h5>2. 持有因素</h5>
            <p>只有你擁有的物件<br>(綁定手機、6位數 OTP)</p>
          </div>
          <div class="shield-card">
            <div class="icon">👁️</div>
            <h5>3. 生物特徵</h5>
            <p>你本身的生理特徵<br>(Face ID、指紋辨識)</p>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎣 全面防範假冒銀行「釣魚簡訊 (Phishing SMS)」</h4>
          <span class="sub-tag">「帳戶異常將凍結，請立即驗證」？點進去存款秒蒸發！</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:800; color:#991b1b; margin-bottom:6px;">釣魚簡訊三大識破金律：</div>
          <ul style="font-size:0.76rem; color:#7f1d1d; margin:0; padding-left:18px; line-height:1.5;">
            <li><strong>查驗網址後綴：</strong>合法銀行必為 <code>.com.tw</code>，若為 <code>.xyz</code>、<code>.top</code> 必是詐騙！</li>
            <li><strong>絕不點擊連結：</strong>任何簡訊連結一律不點，所有操作自行開啟官方銀行 App。</li>
            <li><strong>OTP 絕不外洩：</strong>銀行行員與客服絕不會主動索取 6 位數簡訊驗證碼！</li>
          </ul>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 人頭帳戶與洗錢防制法：大一新鮮人絕對不能租借帳戶</h4>
          <span class="sub-tag">「一本月賺 2 萬躺平領」？出租提款卡直接觸犯洗錢刑責！</span>
        </div>
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:900; color:#9f1239; margin-bottom:6px;">出借帳戶毀滅性三大代價：</div>
          <div style="font-size:0.75rem; color:#881337; line-height:1.5;">
            <strong>1. 全台警示帳戶：</strong>名下所有銀行帳戶全數凍結，無法領打工薪水、無法開新戶。<br>
            <strong>2. 刑事徒刑起訴：</strong>觸犯洗錢防制法第 15 條之 2，面臨 3 年以下有期徒刑。<br>
            <strong>3. 連帶民事賠償：</strong>需對全案所有被騙被害人負擔全額連帶侵權賠償責任！
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔍 實證數據調取：金管會銀行局與中央銀行官方門戶</h4>
          <span class="sub-tag">拒絕網路農場文！掌握審計級官方金融數據查核路徑</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.82rem;">🏛️ 金管會銀行局 (bank.gov.tw)</strong>
            <p style="font-size:0.74rem; color:#334155; margin-top:4px;">查詢全台數位帳戶最新統計、銀行合法牌照與重大違規處分紀錄。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.82rem;">📈 中央存款保險公司 (cdic.gov.tw)</strong>
            <p style="font-size:0.74rem; color:#334155; margin-top:4px;">核實要保會員名單，確認特定機構具備法定 300 萬全額存款保險。</p>
          </div>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 大一新鮮人數位帳戶黃金組合：1 薪轉 + 2 高利活存</h4>
          <span class="sub-tag">專款專用、分流儲蓄，兼顧日常週轉與高利利息極大化</span>
        </div>
        <div class="account-trio-grid">
          <div class="acc-trio-card hub">
            <strong style="color:#2563eb; font-size:0.82rem;">帳戶 A：日常樞紐</strong>
            <div style="font-size:0.72rem; color:#64748b; margin:2px 0;">大型實體數位戶 (國泰/中信)</div>
            <p style="font-size:0.7rem; color:#334155;">打工薪轉、繳交學費、扣繳信用卡費</p>
          </div>
          <div class="acc-trio-card savings">
            <strong style="color:#10b981; font-size:0.82rem;">帳戶 B：高利儲蓄</strong>
            <div style="font-size:0.72rem; color:#64748b; margin:2px 0;">高額度活存戶 (Richart/DAWHO)</div>
            <p style="font-size:0.7rem; color:#334155;">存 3~10 萬緊急預備金，享 3.5% 高息</p>
          </div>
          <div class="acc-trio-card social">
            <strong style="color:#8b5cf6; font-size:0.82rem;">帳戶 C：社交消費</strong>
            <div style="font-size:0.72rem; color:#64748b; margin:2px 0;">純網銀 (LINE Bank)</div>
            <p style="font-size:0.7rem; color:#334155;">朋友吃飯快速分帳、每月吃喝玩樂預算</p>
          </div>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 建立個人信用聯徵紀錄 (JCIC)：大一累積百萬信用資產</h4>
          <span class="sub-tag">全額準時繳清是未來購屋低利房貸的最大靠山！</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:800; margin-bottom:6px;">
            <span style="color:#dc2626;">信用地雷 (200~500分)</span>
            <span style="color:#16a34a;">優質信用 (700~800分)</span>
          </div>
          <div style="background:#e2e8f0; height:10px; border-radius:5px; position:relative; margin-bottom:8px;">
            <div style="background:linear-gradient(to right, #ef4444, #f59e0b, #10b981); height:100%; border-radius:5px;"></div>
          </div>
          <p style="font-size:0.74rem; color:#475569; margin:0; line-height:1.4;">
            從大一辦卡開始，每月帳單全額準時繳清、零循環利息、零預借現金，就是打造滿分 JCIC 信用評分的唯一正道！
          </p>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💡 自動扣繳與免費跨轉跨提：一年省下 1,800 元大餐錢！</h4>
          <span class="sub-tag">「收入 - 儲蓄 = 支出」富人紀律，杜絕手續費無情侵蝕</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.82rem;">發薪日自動劃轉儲蓄</strong>
            <p style="font-size:0.74rem; color:#14532d; margin-top:4px;">發薪隔日自動預約轉帳 3,000 元至高利戶，先存再花，一年無痛存下 3.6 萬！</p>
          </div>
          <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.82rem;">善用每月免費跨轉次數</strong>
            <p style="font-size:0.74rem; color:#1d4ed8; margin-top:4px;">數位戶享 10~99 次免手續費，每月轉 10 次一年現省 1,800 元 (15元/次)！</p>
          </div>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 大一新鮮人數位金融理性使用 4 大金律</h4>
          <span class="sub-tag">守護一生個人金融資產與信用價值的定海神針</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f0fdf4; border-left:3px solid #10b981; padding:8px 10px; font-size:0.78rem;">
            <strong>1. 信用卡全額繳清：</strong>不碰最低應繳，徹底封印 15% 循環利息
          </div>
          <div style="background:#eff6ff; border-left:3px solid #3b82f6; padding:8px 10px; font-size:0.78rem;">
            <strong>2. 開啟 2FA 護 OTP：</strong>OTP 等同簽章，絕不透露給任何人或假網站
          </div>
          <div style="background:#fffbeb; border-left:3px solid #f59e0b; padding:8px 10px; font-size:0.78rem;">
            <strong>3. 精算高利活存額度：</strong>看清優惠上限，善用 1 薪轉 + 2 活存分流
          </div>
          <div style="background:#fdf2f8; border-left:3px solid #ec4899; padding:8px 10px; font-size:0.78rem;">
            <strong>4. 絕不出租出借帳戶：</strong>堅守洗錢防制法紅線，守護個人信用資產
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧭 第六週全景知識體系圖與觀念整合</h4>
          <span class="sub-tag">五大核心支柱 ‧ 建立終生堅不可摧的數位金融防線</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; text-align:center;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">🏦</div>
            <strong style="font-size:0.76rem; color:#0f172a;">銀行本質</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">NIM 利差/乘數</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">📈</div>
            <strong style="font-size:0.76rem; color:#0f172a;">高利活存</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">額度上限精算</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">💳</div>
            <strong style="font-size:0.76rem; color:#0f172a;">刷卡支付</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">1.5%手續費/DDC</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">🛡️</div>
            <strong style="font-size:0.76rem; color:#0f172a;">資安防詐</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">2FA/拒當人頭</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">📜</div>
            <strong style="font-size:0.76rem; color:#0f172a;">1+2 配置</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">JCIC 信用累積</div>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🏆 第六週課程總結里程碑</div>
        <h4>第三小時：數位金融達人大挑戰與實務作業！</h4>
        <p>恭喜完成 30 頁完整課程！現在進行最後的數位金融達人大挑戰小遊戲，並填寫數位帳戶權益比較與防詐報告！</p>
        <div class="milestone-actions" style="display:flex; gap:10px;">
          <button class="btn-launch-lab btn-h3" onclick="openModal('modalFintechGame')">
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

  W6_SLIDES_DATA.forEach((slide, idx) => {
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
      <p class="grid-card-desc">${isZh ? slide.subtitle : slide.subtitleEn}</p>
      <div class="grid-card-footer">
        <span>點擊直接開啟</span>
        <span>➔</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// 手繪標註畫布系統
function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let isPainting = false;

  document.getElementById('btnToggleDrawing')?.addEventListener('click', () => {
    APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
    canvas.classList.toggle('active', APP_STATE.isDrawingActive);
    document.getElementById('drawingToolbar')?.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    document.getElementById('btnToggleDrawing')?.classList.toggle('active', APP_STATE.isDrawingActive);
  });

  document.querySelectorAll('.btn-draw-tool').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-draw-tool').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      APP_STATE.drawingTool = target.getAttribute('data-tool');
    });
  });

  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      APP_STATE.drawingColor = target.getAttribute('data-color');
    });
  });

  document.getElementById('btnClearDrawing')?.addEventListener('click', () => clearDrawingCanvas(true));
  document.getElementById('btnSaveDrawing')?.addEventListener('click', saveCanvasSnapshot);

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  function startDrawing(e) {
    if (!APP_STATE.isDrawingActive) return;
    isPainting = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  function draw(e) {
    if (!isPainting || !APP_STATE.isDrawingActive) return;
    if (APP_STATE.drawingTool === 'eraser') {
      ctx.clearRect(e.clientX - 15, e.clientY - 15, 30, 30);
    } else if (APP_STATE.drawingTool === 'highlighter') {
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = APP_STATE.drawingColor;
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    } else {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = APP_STATE.drawingColor;
      ctx.lineWidth = APP_STATE.drawingWidth;
      ctx.lineCap = 'round';
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  }

  function stopDrawing() {
    isPainting = false;
    ctx.closePath();
  }
}

function clearDrawingCanvas(userAction = true) {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvasSnapshot() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `W6-Annotation-Slide${APP_STATE.currentSlideIndex + 1}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// 1小時活動：高利活存精算盤
function initSavingsCalc() {
  const depositIn = document.getElementById('savDepositInput');
  const promoRateIn = document.getElementById('savPromoRateInput');
  const promoCapIn = document.getElementById('savPromoCapInput');
  const baseRateIn = document.getElementById('savBaseRateInput');

  function calculateSavings() {
    const deposit = parseFloat(depositIn?.value || 100000);
    const promoRate = parseFloat(promoRateIn?.value || 3.5) / 100;
    const promoCap = parseFloat(promoCapIn?.value || 100000);
    const baseRate = parseFloat(baseRateIn?.value || 0.8) / 100;

    const promoPortion = Math.min(deposit, promoCap);
    const basePortion = Math.max(0, deposit - promoCap);

    const promoAnnualInterest = promoPortion * promoRate;
    const baseAnnualInterest = basePortion * baseRate;
    const totalAnnualInterest = promoAnnualInterest + baseAnnualInterest;

    const effectiveRate = deposit > 0 ? (totalAnnualInterest / deposit) * 100 : 0;
    const monthlyInterest = totalAnnualInterest / 12;

    const effRateEl = document.getElementById('savEffectiveRateResult');
    if (effRateEl) effRateEl.textContent = `${effectiveRate.toFixed(2)}%`;

    const promoIntEl = document.getElementById('savPromoInterestResult');
    if (promoIntEl) promoIntEl.textContent = `$${Math.round(promoAnnualInterest).toLocaleString()} 元`;

    const baseIntEl = document.getElementById('savBaseInterestResult');
    if (baseIntEl) baseIntEl.textContent = `$${Math.round(baseAnnualInterest).toLocaleString()} 元`;

    const totalIntEl = document.getElementById('savTotalInterestResult');
    if (totalIntEl) totalIntEl.textContent = `$${Math.round(totalAnnualInterest).toLocaleString()} 元 (約 $${Math.round(monthlyInterest).toLocaleString()} /月)`;
  }

  [depositIn, promoRateIn, promoCapIn, baseRateIn].forEach(input => {
    input?.addEventListener('input', calculateSavings);
  });

  document.querySelectorAll('.sav-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sav-preset-btn').forEach(b => b.classList.remove('active'));
      const key = e.currentTarget.getAttribute('data-preset');
      e.currentTarget.classList.add('active');

      const preset = W6_SAVINGS_PRESETS.find(p => p.id === key);
      if (preset) {
        if (depositIn) depositIn.value = preset.depositAmount;
        if (promoRateIn) promoRateIn.value = preset.promoRate;
        if (promoCapIn) promoCapIn.value = preset.promoCap;
        if (baseRateIn) baseRateIn.value = preset.baseRate;
        calculateSavings();
      }
    });
  });

  calculateSavings();
}

// 2小時活動：信用卡現金回饋與海外手續費計算器
function initCardCalc() {
  const spendIn = document.getElementById('cardSpendInput');
  const rewardRateIn = document.getElementById('cardRewardRateInput');
  const isForeignCheck = document.getElementById('cardIsForeignCheckbox');
  const foreignFeeIn = document.getElementById('cardForeignFeeInput');

  function calculateCard() {
    const spend = parseFloat(spendIn?.value || 10000);
    const rewardRate = parseFloat(rewardRateIn?.value || 3.5);
    const isForeign = isForeignCheck?.checked ?? true;
    const feeRate = isForeign ? parseFloat(foreignFeeIn?.value || 1.5) : 0;

    const rewardAmount = spend * (rewardRate / 100);
    const feeAmount = spend * (feeRate / 100);
    const netReward = rewardAmount - feeAmount;
    const netRate = rewardRate - feeRate;

    const netRewardEl = document.getElementById('cardNetRewardResult');
    if (netRewardEl) {
      netRewardEl.textContent = `${netReward >= 0 ? '+' : ''}$${Math.round(netReward).toLocaleString()} 元`;
      netRewardEl.style.color = netReward >= 0 ? '#16a34a' : '#dc2626';
    }

    const netRateEl = document.getElementById('cardNetRateResult');
    if (netRateEl) {
      netRateEl.textContent = `${netRate >= 0 ? '+' : ''}${netRate.toFixed(2)}%`;
      netRateEl.style.color = netRate >= 0 ? '#16a34a' : '#dc2626';
    }

    const feeEl = document.getElementById('cardFeeAmountResult');
    if (feeEl) feeEl.textContent = `-$${Math.round(feeAmount).toLocaleString()} 元 (${feeRate.toFixed(1)}%)`;

    const badgeEl = document.getElementById('cardStatusBadge');
    const explainEl = document.getElementById('cardExplainResult');

    if (netRate > 0) {
      if (badgeEl) badgeEl.innerHTML = `<span class="badge-alert green">正收益划算 (Profitable)</span>`;
      if (explainEl) explainEl.innerHTML = `<strong>高回饋利多！</strong>實質淨回饋率為 +${netRate.toFixed(2)}%！回饋金額足以全額抵銷 ${feeRate.toFixed(1)}% 手續費並倒賺 $${Math.round(netReward).toLocaleString()} 元！`;
    } else if (netRate === 0) {
      if (badgeEl) badgeEl.innerHTML = `<span class="badge-alert blue">打平損益 (Break-even)</span>`;
      if (explainEl) explainEl.innerHTML = `<strong>剛好打平！</strong>回饋金額正好抵銷刷卡手續費，未產生實質現金獲利，但仍享有延後付款便利。`;
    } else {
      if (badgeEl) badgeEl.innerHTML = `<span class="badge-alert red">手續費倒貼 (Fee Drag Hazard)</span>`;
      if (explainEl) explainEl.innerHTML = `<strong>警惕倒貼！</strong>手續費高達 ${feeRate.toFixed(1)}%，高於宣稱回饋率，導致實質倒賠 $${Math.round(Math.abs(netReward)).toLocaleString()} 元！請拒絕 DDC 雙幣結算或換用高回饋海外神卡！`;
    }
  }

  [spendIn, rewardRateIn, foreignFeeIn].forEach(input => input?.addEventListener('input', calculateCard));
  isForeignCheck?.addEventListener('change', calculateCard);

  document.querySelectorAll('.card-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.card-preset-btn').forEach(b => b.classList.remove('active'));
      const key = e.currentTarget.getAttribute('data-preset');
      e.currentTarget.classList.add('active');

      const preset = W6_CARD_PRESETS.find(p => p.id === key);
      if (preset) {
        if (spendIn) spendIn.value = preset.spendAmount;
        if (rewardRateIn) rewardRateIn.value = preset.rewardRate;
        if (isForeignCheck) isForeignCheck.checked = preset.isForeign;
        if (foreignFeeIn) foreignFeeIn.value = preset.foreignFeeRate;
        calculateCard();
      }
    });
  });

  calculateCard();
}

// 3小時活動：數位金融達人大挑戰小遊戲
function initFintechGame() {
  renderFintechGameLevel();
}

function renderFintechGameLevel() {
  const container = document.getElementById('fintechGameLevelContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W6_GAME_QUESTIONS.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 20px; background:#f0fdf4; border:2px solid #86efac; border-radius:12px;">
        <div style="font-size:3rem; margin-bottom:10px;">🏆</div>
        <h3 style="color:#166534; font-size:1.4rem; margin-bottom:8px;">恭喜榮獲「數位金融達人 (Fintech Expert)」證書！</h3>
        <p style="color:#15803d; font-size:0.95rem; margin-bottom:16px;">
          你在 4 大關卡中展現了卓越的數位金融素養，精通純網銀 300 萬存保機制，識破海外 DDC 惡劣匯差與 15% 循環利息起算黑洞！
        </p>
        <div style="font-size:1.1rem; font-weight:800; color:#14532d; margin-bottom:20px;">
          最終挑戰得分：${APP_STATE.gameScore} / 100 分
        </div>
        <button class="btn-nav-step btn-primary-step" onclick="restartFintechGame()">重新挑戰</button>
      </div>
    `;
    return;
  }

  const q = W6_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div style="margin-bottom:16px;">
      <span class="badge-hour" style="margin-bottom:8px; display:inline-block;">${q.badge}</span>
      <h4 style="font-size:1.1rem; font-weight:800; color:#1e293b; margin:6px 0;">${q.title}</h4>
      <div style="background:#f8fafc; border-left:4px solid #3b82f6; padding:10px 14px; border-radius:4px; font-size:0.85rem; color:#334155; margin:10px 0;">
        <strong>情境說明：</strong>${q.scenario}
      </div>
    </div>
    <div class="game-options-list" style="display:flex; flex-direction:column; gap:10px;">
      ${q.options.map((opt, idx) => `
        <button class="btn-quiz-option" onclick="handleFintechGameAnswer(${idx})" style="text-align:left; padding:12px 16px; border:1px solid #cbd5e1; border-radius:8px; background:#fff; cursor:pointer; font-size:0.85rem; line-height:1.5;">
          ${opt.text}
        </button>
      `).join('')}
    </div>
    <div id="fintechGameFeedback" style="margin-top:14px; display:none;"></div>
  `;
}

window.handleFintechGameAnswer = function(optIdx) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W6_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const chosen = q.options[optIdx];
  const feedbackEl = document.getElementById('fintechGameFeedback');

  if (chosen.isCorrect) {
    APP_STATE.gameScore += 25;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="padding:12px; border-radius:8px; background:#f0fdf4; border:1px solid #86efac; color:#166534; font-size:0.88rem;">
          ${chosen.feedback}
          <div style="margin-top:10px;">
            <button class="btn-nav-step btn-primary-step" onclick="nextFintechGameLevel()">前進下一關 ➔</button>
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
            <button class="btn-nav-step" onclick="nextFintechGameLevel()">跳過此題，繼續挑戰 ➔</button>
          </div>
        </div>
      `;
    }
  }
};

window.nextFintechGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderFintechGameLevel();
};

window.restartFintechGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderFintechGameLevel();
};

// 課堂實務作業系統
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwAccountComp', 'hwSpendingPlan', 'hwSecuritySop', 'hwCreditStrategy', 'hwConclusionGrade', 'hwDecisionSummary'];

  fields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    el?.addEventListener('input', () => {
      saveHomeworkToLocal();
    });
  });

  document.querySelector('.hw-preset-btn')?.addEventListener('click', loadHomeworkTemplate);
  document.getElementById('btnPrintHomework')?.addEventListener('click', () => window.print());
  document.getElementById('btnExportJson')?.addEventListener('click', exportHomeworkJson);
  document.getElementById('btnExportMd')?.addEventListener('click', exportHomeworkMd);
}

function saveHomeworkToLocal() {
  const data = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    accountComp: document.getElementById('hwAccountComp')?.value || '',
    spendingPlan: document.getElementById('hwSpendingPlan')?.value || '',
    securitySop: document.getElementById('hwSecuritySop')?.value || '',
    creditStrategy: document.getElementById('hwCreditStrategy')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'Optimal 1+2 Structure',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  localStorage.setItem('w6_homework_draft', JSON.stringify(data));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '已自動儲存草稿';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  const saved = localStorage.getItem('w6_homework_draft');
  if (!saved) return;
  try {
    const d = JSON.parse(saved);
    if (d.studentName) document.getElementById('hwStudentName').value = d.studentName;
    if (d.studentId) document.getElementById('hwStudentId').value = d.studentId;
    if (d.accountComp) document.getElementById('hwAccountComp').value = d.accountComp;
    if (d.spendingPlan) document.getElementById('hwSpendingPlan').value = d.spendingPlan;
    if (d.securitySop) document.getElementById('hwSecuritySop').value = d.securitySop;
    if (d.creditStrategy) document.getElementById('hwCreditStrategy').value = d.creditStrategy;
    if (d.conclusionGrade) document.getElementById('hwConclusionGrade').value = d.conclusionGrade;
    if (d.decisionSummary) document.getElementById('hwDecisionSummary').value = d.decisionSummary;
  } catch (e) {
    console.warn(e);
  }
}

function loadHomeworkTemplate() {
  document.getElementById('hwStudentName').value = '陳冠宇';
  document.getElementById('hwStudentId').value = 'B11307088';
  document.getElementById('hwAccountComp').value = '對比台新 Richart 與 LINE Bank：Richart 提供新戶 10 萬元內 3.5% 高利活存，跨行轉帳提款各 5 次免手續費，介面理財功能完備；LINE Bank 提供口袋帳戶 5 萬元 1.9% 活存，最大優勢在於聊天室直接分帳轉帳免手續費每月 30 次，極度符合大學生聚餐拆帳需求。兩家均為 CDIC 存保會員機構，享 300 萬全額保障。';
  document.getElementById('hwSpendingPlan').value = '每月打工薪水 15,000 元入帳於國泰世華薪轉帳戶 (帳戶A)；發薪隔日自動化預約轉帳 5,000 元至 Richart (帳戶B) 累積緊急預備金並賺取 3.5% 高息；轉帳 4,000 元至 LINE Bank (帳戶C) 作為當月社交聚餐與生活零用；剩餘 6,000 元留在帳戶 A 自動全額扣繳信用卡款與房租。';
  document.getElementById('hwSecuritySop').value = '個人資安防禦 SOP：1. 全面開啟網銀與各電商平台 2FA (Face ID + 手機 OTP)；2. 絕對不向任何人洩漏 6 位數 OTP 驗證碼；3. 收到任何「帳戶異常凍結」簡訊絕不點擊連結，一律自行開啟官方 App 查證；4. 嚴格拒絕任何租借帳戶廣告，杜絕洗錢與人頭帳戶犯罪風險。';
  document.getElementById('hwCreditStrategy').value = '申辦第一張學生信用卡，額度設定 2 萬元。設定綁定銀行帳戶每月自動全額扣繳，確保 100% 按時還款，絕不動用最低應繳與 15% 循環利息。從大一開始建立乾淨無瑕的 JCIC 聯徵信用紀錄，為未來低利購屋房貸累積高信用資產。';
  document.getElementById('hwConclusionGrade').value = 'Optimal 1+2 Structure';
  document.getElementById('hwDecisionSummary').value = '以 1 薪轉 + 2 數位戶分流理財，信用卡堅持全額繳清，守護 2FA 與清白信用！';
  saveHomeworkToLocal();
}

function exportHomeworkJson() {
  const saved = localStorage.getItem('w6_homework_draft') || '{}';
  const blob = new Blob([saved], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W6_Homework_${document.getElementById('hwStudentId')?.value || 'Draft'}.json`;
  a.click();
}

function exportHomeworkMd() {
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const id = document.getElementById('hwStudentId')?.value || '未填寫';
  const comp = document.getElementById('hwAccountComp')?.value || '';
  const plan = document.getElementById('hwSpendingPlan')?.value || '';
  const sop = document.getElementById('hwSecuritySop')?.value || '';
  const credit = document.getElementById('hwCreditStrategy')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第六週課堂實務作業：數位帳戶權益比較與防詐防護報告

- **學生姓名**：${name}
- **學號**：${id}
- **評審評級**：${grade}
- **核心決策反思**：${summary}

---

### 1. 數位存款帳戶綜合權益與限額比對 (25%)
${comp}

### 2. 大一新鮮人 1 薪轉 + 2 數位戶分流具體計畫 (25%)
${plan}

### 3. 個人 2FA 資安防護與 165 防詐防釣魚 SOP (25%)
${sop}

### 4. 信用卡理性使用與 JCIC 聯徵信用維護計畫 (25%)
${credit}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製 Markdown 格式作業報告至剪貼簿！');
  }).catch(() => {
    prompt('請複製以下 Markdown 內容：', md);
  });
}

// 鍵盤快速鍵
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

// Modal 對話框全局函數
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
