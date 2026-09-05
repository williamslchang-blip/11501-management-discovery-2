/**
 * 115學年度「管理探索二」第十五週互動教學主程式
 * 單元名稱：綠色金融、ESG 永續投資與碳定價經濟學
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#059669',
  drawingWidth: 3,

  // 1小時活動 (企業碳費與歐盟 CBAM 碳關稅試算器)
  carbonPreset: 'heavy_exporter',

  // 2小時活動 (ESG 永續指數投資組合與抗波動模擬器)
  esgPreset: 'balanced_growth',

  // 3小時遊戲 (ESG 永續理財達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (個人 carbon 體檢與 ESG 永續投資計畫)
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
  initCarbonFeeLab();
  initEsgPortfolioLab();
  initEsgGame();
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
  W15_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W15_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w15-primary, #059669);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W15_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W15_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W15_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W15_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W15_SLIDES_DATA.length - 1) {
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

  switch (id) {
    case 1:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌱 綠色金融與 ESG：本世紀最大規模的資本重分配</h4>
          <span class="sub-tag">「氣候變遷是終極的市場失靈，但永續金融將是本世紀最大財富轉型契機！」— Mark Carney</span>
        </div>
        <div style="background:#ecfdf5; border:2px dashed #059669; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🌍</div>
          <h4 style="color:#059669; font-size:1.15rem; margin-bottom:8px;">2050 淨零排放：全球資本市場的新遊戲規則</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:540px; margin:0 auto;">
            碳排放不再是免費的外部成本，而是實實在在的財務費用！<br>
            <strong>本週核心任務：</strong>掌握碳定價經濟學、歐盟 CBAM 碳關稅、00878 ESG ETF 與大一綠色投資！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第十五週 3 小時學習地圖與核心技能樹</h4>
          <span class="sub-tag">碳費與三大柱 ➔ 永續 ETF 與碳盤查 ➔ 資產配置與綠金職涯</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border-top:4px solid #059669; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.85rem;">第 1 小時 ‧ 淨零與碳定價</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">2050淨零目標、ESG三大柱 (E/S/G)、碳費定價公式每噸300元、歐盟CBAM碳關稅與漂綠防範。</p>
          </div>
          <div style="background:#f0fdfa; border-top:4px solid #0d9488; border-radius:8px; padding:10px;">
            <strong style="color:#0d9488; font-size:0.85rem;">第 2 小時 ‧ 永續 ETF 與碳盤查</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">00878/00692選股機制、碳權交易所(TCX)、範疇1-3碳盤查SOP、赤道原則與台積電RE100。</p>
          </div>
          <div style="background:#f7fee7; border-top:4px solid #84cc16; border-radius:8px; padding:10px;">
            <strong style="color:#4d7c0f; font-size:0.85rem;">第 3 小時 ‧ 配置與綠色職涯</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">0050+00878大一永續組合、永續管理師/碳盤查員綠金職缺、生活自備環保杯與4大金律。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔥 氣候變遷的經濟學本質：外部性 (Externality) 與市場失靈</h4>
          <span class="sub-tag">企業排碳賺取暴利，全人類承擔極端氣候災難損失</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.78rem;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
            <strong style="color:#dc2626;">過去：負外部性無償排放</strong>
            <p style="color:#475569; margin-top:4px; line-height:1.5;">工廠燃煤煙囪排放二氧化碳，造成全球暖化海平面上升，但企業財報上排碳成本為 0 元。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px;">
            <strong style="color:#16a34a;">現在：污染者付費原則 (PPP)</strong>
            <p style="color:#475569; margin-top:4px; line-height:1.5;">將環境外部成本內部化！透過碳費與碳稅強制企業為每噸碳排買單，迫使資本流向綠能科技。</p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ ESG 三大支柱深度拆解：E ‧ S ‧ G 核心指標</h4>
          <span class="sub-tag">超越單一財報數字，評估企業永續經營與抗風險體質</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem; text-align:center;">
          <div style="background:#ecfdf5; border-top:3px solid #059669; border-radius:6px; padding:8px;">
            <strong style="color:#059669;">E - 環境 (Environment)</strong>
            <p style="color:#64748b; margin-top:4px;">溫室氣體排碳量、再生能源比、水資源循環、生物多樣性。</p>
          </div>
          <div style="background:#f0fdfa; border-top:3px solid #0d9488; border-radius:6px; padding:8px;">
            <strong style="color:#0d9488;">S - 社會 (Social)</strong>
            <p style="color:#64748b; margin-top:4px;">勞工安全、薪酬平等、多元共融 (DEI)、人權供應鏈審核。</p>
          </div>
          <div style="background:#f7fee7; border-top:3px solid #84cc16; border-radius:6px; padding:8px;">
            <strong style="color:#4d7c0f;">G - 治理 (Governance)</strong>
            <p style="color:#64748b; margin-top:4px;">獨立董事席次、高階主管薪酬透明度、反貪腐、股東權益。</p>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 碳定價 (Carbon Pricing) 經濟學：碳費 vs. 碳稅 vs. 排碳權交易 (ETS)</h4>
          <span class="sub-tag">以價格信號驅動企業減碳的最有效經濟手段</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#059669;">台灣碳費 (Fee)</strong>
            <p style="color:#64748b; margin-top:4px;">專款專用。環境部徵收，全額用於補助企業低碳研發與氣候轉型。</p>
          </div>
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7;">碳稅 (Carbon Tax)</strong>
            <p style="color:#64748b; margin-top:4px;">財政部徵收統收統支，納入國家總預算（如北歐各國、新加坡）。</p>
          </div>
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#d97706;">碳交易 (EU ETS)</strong>
            <p style="color:#64748b; margin-top:4px;">總量管制與交易。政府設定排放總上限，企業於市場自由買賣配額。</p>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇹🇼 台灣碳費制度全面解析：排碳大戶基本費率每噸 NT$ 300</h4>
          <span class="sub-tag">首波鎖定年排碳逾 2.5 萬公噸之電力業與大型鋼鐵、水泥、石化廠</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.78rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>一般費率：<strong>NT$ 300 / 公噸 CO2e</strong></span>
            <span style="color:#059669;">自主減量優惠費率：<strong>NT$ 100 / 公噸</strong></span>
          </div>
          <p style="color:#475569; line-height:1.5;">
            企業只要提出科學減碳計畫並達標，即可省下 2/3 的碳費支出！這種經濟誘因直接驅動千億減碳投資。
          </p>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇪🇺 歐盟 CBAM 碳邊境調整機制：全球首部「碳關稅」</h4>
          <span class="sub-tag">2026 年全面正式開徵！防止製造業外移之「碳洩漏 (Carbon Leakage)」</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6; color:#7f1d1d;">
          <strong>首波納管 6 大高碳產品：</strong>鋼鐵、鋁、水泥、肥料、電力與氫氣。<br>
          台灣為全球螺絲、扣件與金屬外銷重鎮，若產品碳足跡偏高，出口歐洲將被強制加徵高昂 CBAM 憑證，逼迫台灣傳統重工業全速綠化！
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 實證數據：環境部與國際碳定價報告 (World Bank)</h4>
          <span class="sub-tag">全球已有超過 75 個國家實施碳定價機制，覆蓋全球 24% 排放量</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
          <div style="background:#ecfdf5; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">台灣首波徵收家數</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#059669; margin-top:2px;">~500 廠</div>
          </div>
          <div style="background:#f0fdfa; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">歐盟 ETS 碳價</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#0d9488; margin-top:2px;">~€65/噸</div>
          </div>
          <div style="background:#f7fee7; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">覆蓋台灣總排放量</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#4d7c0f; margin-top:2px;">> 54%</div>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧼 什麼是漂綠 (Greenwashing)？戳破企業虛假公關廣告</h4>
          <span class="sub-tag">宣傳花費遠大於實際減碳投資 ‧ 誇大未經審計的永續口號</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.6;">
          <strong>漂綠三大常見套路：</strong><br>
          1. <strong>避重就輕：</strong>石化廠大肆宣傳回收辦公室寶特瓶，卻隱瞞每年數百萬噸廢氣。<br>
          2. <strong>缺乏認證：</strong>自創「純天然、極致綠色」標籤，無任何第三方 ISO 確信。<br>
          3. <strong>遠期空頭支票：</strong>宣稱 2050 碳中和，但未來 5 年內完全無實質減量資本開銷。
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏁 第一小時小結與專屬活動預告</h4>
          <span class="sub-tag">回顧 ESG 三大柱與碳費 ➔ 即刻啟動碳關稅試算器</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:14px; text-align:center;">
          <h4 style="color:#059669; margin-bottom:8px;">📊 專屬活動：企業碳費與歐盟 CBAM 碳關稅試算器</h4>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            輸入企業年排碳公噸、台灣碳費與出口歐盟碳含量，精算碳成本對獲利侵蝕與自主減量省下金額！
          </p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalCarbonFeeLab')" style="background:#059669;">
            立即開啟第 1 小時碳成本精算台 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 ESG 篩選 ETF 解析：高股息 + 永續雙重防護 (00878 / 00692)</h4>
          <span class="sub-tag">MSCI ESG 評級篩選 ➔ 剔除爭議性產業 ➔ 穩健配息與資本增值</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px;">
            <strong style="color:#16a34a;">國泰永續高股息 (00878)</strong>
            <p style="color:#475569; margin-top:4px;">追蹤 MSCI 台灣 ESG 永續高股息精選 30 指數。排除 ESG 評級在 BB 級以下企業，深受年輕小資存股族喜愛。</p>
          </div>
          <div style="background:#ecfeff; border:1px solid #a5f3fc; border-radius:8px; padding:10px;">
            <strong style="color:#0891b2;">富邦公司治理 (00692)</strong>
            <p style="color:#475569; margin-top:4px;">評估證交所公司治理評鑑前 20% 優良企業，涵蓋台積電等科技巨頭，低內扣費用，兼具大盤成長與公司治理防禦。</p>
          </div>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏷️ 碳權交易 (Carbon Trading) 與台灣碳權交易所 (TCX) 機制</h4>
          <span class="sub-tag">1 單位碳權 = 1 公噸二氧化碳當量 (tCO2e) 的合規減量額度</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong>碳權如何變現？</strong><br>
          綠能發電或造林專案經國際權威機構 (如 Gold Standard / Verra) 認證後產生碳權。減碳落後的企業可透過台灣碳權交易所 (TCX) 購買碳權抵減自身碳中和承諾，形成「減碳賺錢、排碳虧損」之市場激勵。
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📋 企業碳盤查 (Carbon Footprint) SOP：範疇一、二與範疇三</h4>
          <span class="sub-tag">ISO 14064-1 國際標準：看清企業整條價值鏈的排碳輪廓</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#fff; border-top:3px solid #dc2626; border-radius:6px; padding:8px;">
            <strong style="color:#dc2626;">範疇一 (直接排放)</strong>
            <p style="color:#64748b; margin-top:4px;">工廠製程煙囪、公務車燃油、鍋爐燃料。</p>
          </div>
          <div style="background:#fff; border-top:3px solid #0284c7; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7;">範疇二 (間接電力)</strong>
            <p style="color:#64748b; margin-top:4px;">向台電購買外購電力與蒸汽所產生的碳排放。</p>
          </div>
          <div style="background:#fff; border-top:3px solid #7c3aed; border-radius:6px; padding:8px;">
            <strong style="color:#7c3aed;">範疇三 (價值鏈上下游)</strong>
            <p style="color:#64748b; margin-top:4px;">供應商原料、員工通勤、產品售後使用與廢棄處理。</p>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏷️ 綠色溢價 (Green Premium) 模型：低碳產品與消費者選擇</h4>
          <span class="sub-tag">綠色溢價 = 零碳/低碳解決方案成本 - 傳統高碳解決方案成本</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong>微軟比爾·蓋茲《如何避免氣候災難》核心理論：</strong><br>
          目前綠氫、永續航空燃油 (SAF) 與低碳水泥成本仍高於化石燃料。科技創新與碳定價的目的，就是不斷壓低綠色溢價，直到零碳產品比污染產品更便宜！
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏦 綠色金融與銀行授信：赤道原則 (Equator Principles) 防線</h4>
          <span class="sub-tag">銀行掐斷高污染產業銀根，資金全數湧入再生能源與綠色專案</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.6;">
          <strong>赤道原則的力量：</strong><br>
          全球超過 130 家金融機構簽署赤道原則。凡是重大專案融資 (>1,000萬美元)，必須經過嚴格環境與社會影響評估。煤電廠在國際銀行已完全貸不到款，融資利率更直接與 ESG 績效掛鉤！
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 永續投資 3 大選股戰術：負向排除 vs. 最佳選股 vs. 影響力</h4>
          <span class="sub-tag">全球永續投資聯盟 (GSIA) 主流策略定義</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:8px;">
            <strong style="color:#dc2626;">1. 負向排除</strong><br>剔除菸草、軍火、高污染煤炭等爭議性標的。
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:8px;">
            <strong style="color:#059669;">2. 正向最佳選股</strong><br>挑選同行業中 ESG 評級最頂尖前 20% 企業 (00878)。
          </div>
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:6px; padding:8px;">
            <strong style="color:#0d9488;">3. 影響力投資</strong><br>直接注資綠能電廠、海水淡化，追求可量化環境正面貢獻。
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ ESG 投資風險：漂綠重罰、碳費侵蝕利潤與綠電瓶頸</h4>
          <span class="sub-tag">理性審視永續光環下的企業轉型陣痛與政策法規風險</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.78rem; color:#7f1d1d; line-height:1.6;">
          <strong>三大潛在風險：</strong><br>
          1. <strong>監管重罰風險：</strong>美 SEC 與金管會嚴抓漂綠，造假報告將面臨巨額罰鍰與外資撤出。<br>
          2. <strong>綠電短缺風險：</strong>台灣再生能源發電量供不應求，綠電憑證溢價居高不下。<br>
          3. <strong>轉型資本開支：</strong>更換低碳設備使傳統重工業短期自由現金流收縮。
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚡ 全球綠能巨頭與台灣綠電供應鏈：台積電 RE100 帶動奇蹟</h4>
          <span class="sub-tag">台積電承諾 2040 年 100% 採用再生能源，成為全台最大綠電買家</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong>護國神山的綠色火車頭：</strong><br>
          台積電與丹麥沃旭能源 (Ørsted) 簽署全球最大離岸風電 20 年長期購售電合約 (PPA)！台積電的剛性綠電需求，直接推動了台灣彰化、苗栗外海離岸風場與重電水下基礎供應鏈的蓬勃發展。
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏭 台灣科技業綠色轉型：減碳力就是接單力！</h4>
          <span class="sub-tag">Apple 與微軟要求 2030 年供應鏈碳中和，低碳製造躍升核心競爭力</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong>不能減碳就出局：</strong><br>
          未來的科技代工比的不只是報價與良率，更是誰的晶片與伺服器「碳足跡更低」！台灣電子廠積極導入廢熱回收、智慧能源管理與綠電憑證，鞏固全球供應鏈核心樞紐地位。
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏁 第二小時小結與專屬活動預告</h4>
          <span class="sub-tag">00878/00692 永續篩選 ➔ 啟動 ESG 指數投資組合模擬器</span>
        </div>
        <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:14px; text-align:center;">
          <h4 style="color:#0d9488; margin-bottom:8px;">⚖️ 專屬活動：ESG 永續指數投資組合與抗波動模擬器</h4>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            調整傳統市值 0050 與永續 00878 配置比例，精算碳足跡減量幅度、長期累積資產與抗波動防護盾！
          </p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalEsgPortfolioLab')" style="background:#0d9488;">
            立即開啟第 2 小時永續配置台 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💼 打造大一新鮮人永續理財組合：0050 (70%) + 00878 (30%)</h4>
          <span class="sub-tag">成長與永續高股息兼得的黃金雙軌投資配置</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7;">核心 70%：0050 ETF</strong>
            <p style="color:#475569; margin-top:4px;">全市場龍頭護國神山成長爆發力，享受全球 AI 晶片霸權紅利。</p>
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669;">衛星 30%：00878 ETF</strong>
            <p style="color:#475569; margin-top:4px;">嚴選 ESG 優良高息企業，季度穩健配息平準波動，碳足跡立減 30%！</p>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌱 大一新鮮人綠色職涯探索：淨零時代的「綠金」新職缺</h4>
          <span class="sub-tag">不限理工科系，商管文法跨域考照最吃香的百萬年薪通道</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem; text-align:center;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#059669;">永續管理師 (CSO)</strong>
            <p style="color:#64748b; margin-top:4px;">規劃 RE100 綠電轉型、撰寫 GRI 永續報告書。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#0d9488;">碳盤查查驗員</strong>
            <p style="color:#64748b; margin-top:4px;">ISO 14064 溫室氣體稽核、供應鏈排碳審計。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#84cc16;">ESG 綠色金融分析師</strong>
            <p style="color:#64748b; margin-top:4px;">投信/銀行審查綠色授信評級、碳權衍生品交易。</p>
          </div>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>☕ 綠色生活與消費減碳：自備環保杯年省上千元</h4>
          <span class="sub-tag">日常生活小習慣，兼顧荷包節流與環境永續</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong>大專生減碳省錢算術：</strong><br>
          1. <strong>自備飲料杯折抵 5 元：</strong>每週 5 杯手搖飲，一年立省 1,300 元，減少 260 個塑膠杯！<br>
          2. <strong>TPASS 大眾運輸：</strong>減少機車碳排與油錢，每月再省 500-1,000 元。<br>
          3. <strong>省下的錢定期定額買 00878：</strong>小善聚沙成塔，化為實體綠色複利！
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 綠色投資資安防詐：防範「假冒綠色債券與碳權資金盤」</h4>
          <span class="sub-tag">詐騙集團利用「愛地球保護雨林」情懷吸金詐騙</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.78rem; color:#7f1d1d; line-height:1.6;">
          <strong>防詐核心警訊：</strong><br>
          凡是宣稱「保證年息 18% 投資海外森林碳權」、「Line 私訊合資購買未上市綠能電廠」者，100% 為龐氏詐騙資金盤！正規碳權交易與綠色債券均在金管會核准之交易所與投信平台進行。
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💻 實證數據調取：台灣碳權交易所 (TCX) 查閱指引</h4>
          <span class="sub-tag">查看國際碳權成交行情、專案類型與碳交所官方認證規範</span>
        </div>
        <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px; font-size:0.78rem;">
          <h5 style="color:#0d9488; margin-bottom:4px;">TCX 官方查核步驟：</h5>
          <ol style="margin-left:16px; line-height:1.6; color:#334155;">
            <li>訪問 <code>tcx.com.tw</code> 進入台灣碳權交易所官方網站。</li>
            <li>查閱「國際碳權交易平台」中水資源、沼氣發電與風電專案每噸美金報價。</li>
            <li>下載國內排碳大戶自願減量專案申請流程與審查法規。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 大一新鮮人 ESG 永續理財 4 大金律</h4>
          <span class="sub-tag">責任投資、嚴防漂綠、生活節能與職涯前瞻</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#ecfdf5; border-left:3px solid #059669; border-radius:4px; padding:8px;">
            <strong>1. 優先配置 ESG 篩選 ETF</strong><br>以 00878 / 00692 用資本為減碳好企業投票。
          </div>
          <div style="background:#fef2f2; border-left:3px solid #dc2626; border-radius:4px; padding:8px;">
            <strong>2. 嚴防企業公關漂綠口號</strong><br>用 4D Filter 查核真實永續確信數據，不盲信廣告。
          </div>
          <div style="background:#f0fdfa; border-left:3px solid #0d9488; border-radius:4px; padding:8px;">
            <strong>3. 日常生活減碳節流並行</strong><br>自備環保杯與大眾運輸，省下的錢全數投入綠色資產。
          </div>
          <div style="background:#f7fee7; border-left:3px solid #84cc16; border-radius:4px; padding:8px;">
            <strong>4. 掌握跨領域綠金職涯技能</strong><br>考取 ISO 14064 碳盤查證照，為大學求職打造殺手級優勢。
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 永續投資試算實例：定期定額 ESG ETF 累積綠色第一桶金</h4>
          <span class="sub-tag">每月定期定額 3,000 元買 00878 的四年複利雪球</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>每月投入：NT$ 3,000</span>
            <span>預期年化報酬：6.5% (含息)</span>
          </div>
          <div style="height:14px; background:#e2e8f0; border-radius:7px; overflow:hidden; display:flex; margin-bottom:8px;">
            <div style="width:75%; background:#059669;"></div>
            <div style="width:25%; background:#10b981;"></div>
          </div>
          <p style="color:#475569; line-height:1.5;">
            大學四年累積本金 14.4 萬元，複利增值達 17 萬至 18 萬元！每年領取近萬元股息，為地球與自己雙重累積財富！
          </p>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌍 永續發展與世代正義：現代財經公民的終極修煉</h4>
          <span class="sub-tag">理財不僅是追求個人財富自由，更是守護地球環境的責任實踐</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6; color:#065f46;">
          <strong>大一新鮮人的綠色承諾：</strong><br>
          我們是能夠看見氣候變遷威脅的第一代，也是最後一代有機會逆轉它的人。當你的每一分投資都具備永續意識時，你就在改變未來的商業文明！
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：第十五週綠色金融與 ESG 知識全景圖譜</h4>
          <span class="sub-tag">2050淨零 ➔ ESG三大柱 ➔ 碳費300元 ➔ CBAM ➔ 00878 ➔ 綠金職涯</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px; font-size:0.75rem;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:8px;">
            <strong style="color:#059669;">Hour 1：淨零排放與碳定價機制</strong>（外部性理論 + ESG三大柱 + 台灣碳費公式 + 歐盟CBAM碳關稅）
          </div>
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:6px; padding:8px;">
            <strong style="color:#0d9488;">Hour 2：永續 ETF 與碳盤查 SOP</strong>（00878選股機制 + 碳權交易所TCX + 範疇1-3碳盤查 + 台積電RE100）
          </div>
          <div style="background:#f7fee7; border-top:1px solid #d9f99d; border-radius:6px; padding:8px;">
            <strong style="color:#4d7c0f;">Hour 3：資產配置與綠金職涯</strong>（0050+00878配置 + 永續管理師考照 + 環保杯減碳生活 + 4大金律）
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業提交與第十六週【加密貨幣與 Web3】預告</h4>
          <span class="sub-tag">完成第十五週作業 ‧ 實踐責任永續投資 ‧ 迎向數位加密貨幣浪潮</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">📝 第十五週實務作業要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              線上撰寫 ESG 碳費選股影響、台積電 RE100 剖析、0050+00878 永續配置計畫與個人生活減碳清單！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem; background:#059669;">
                開啟第十五週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">🪙 第十六週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【加密貨幣、區塊鏈基礎、Web3 與數位資產風險】：解鎖比特幣減半經濟學、以太坊智慧合約、冷熱錢包資安鐵律與 5% 避險配置！
            </p>
          </div>
        </div>
      </div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: CARBON FEE LAB ----------------------
function initCarbonFeeLab() {
  document.querySelectorAll('.btn-preset-carbon').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-carbon').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.carbonPreset = pKey;
      loadCarbonPreset(pKey);
    });
  });

  ['carbonEmission', 'carbonBasicFee', 'carbonPreferFee', 'carbonPassedPlan', 'carbonCbamExport', 'carbonCbamEur', 'carbonEurFx'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateCarbonFee);
    document.getElementById(id)?.addEventListener('change', calculateCarbonFee);
  });

  loadCarbonPreset('heavy_exporter');
}

function loadCarbonPreset(pKey) {
  const p = W15_CARBON_FEE_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('carbonEmission')) document.getElementById('carbonEmission').value = p.annualEmission;
  if (document.getElementById('carbonBasicFee')) document.getElementById('carbonBasicFee').value = p.basicFeeRate;
  if (document.getElementById('carbonPreferFee')) document.getElementById('carbonPreferFee').value = p.preferFeeRate;
  if (document.getElementById('carbonPassedPlan')) document.getElementById('carbonPassedPlan').value = p.passedPlan ? 'yes' : 'no';
  if (document.getElementById('carbonCbamExport')) document.getElementById('carbonCbamExport').value = p.cbamExport;
  if (document.getElementById('carbonCbamEur')) document.getElementById('carbonCbamEur').value = p.cbamPriceEur;
  if (document.getElementById('carbonEurFx')) document.getElementById('carbonEurFx').value = p.eurFx;

  calculateCarbonFee(p.diagnosis);
}

function calculateCarbonFee(customDiagnosis = '') {
  const emission = parseFloat(document.getElementById('carbonEmission')?.value) || 0; // 公噸
  const basicFee = parseFloat(document.getElementById('carbonBasicFee')?.value) || 300; // NT/噸
  const preferFee = parseFloat(document.getElementById('carbonPreferFee')?.value) || 100;
  const isPassed = document.getElementById('carbonPassedPlan')?.value === 'yes';
  const cbamExport = parseFloat(document.getElementById('carbonCbamExport')?.value) || 0;
  const cbamEur = parseFloat(document.getElementById('carbonCbamEur')?.value) || 65;
  const eurFx = parseFloat(document.getElementById('carbonEurFx')?.value) || 35.0;

  // 台灣碳費：起徵門檻 2.5 萬公噸
  let taiwanFee = 0;
  let savings = 0;
  if (emission >= 25000) {
    const rate = isPassed ? preferFee : basicFee;
    taiwanFee = emission * rate; // NT$
    if (isPassed) {
      savings = emission * (basicFee - preferFee);
    }
  }

  // 歐盟 CBAM：(出口碳含量 * 歐盟碳價 * 匯率) - 扣抵台灣已繳碳費
  const totalCbamTwd = cbamExport * cbamEur * eurFx;
  const creditedTaiwanFee = cbamExport > 0 && emission > 0 ? (taiwanFee * (cbamExport / emission)) : 0;
  const finalCbamObligation = Math.max(totalCbamTwd - creditedTaiwanFee, 0);
  const totalCarbonImpact = taiwanFee + finalCbamObligation;

  const elTw = document.getElementById('outCarbonTaiwanFee');
  const elSav = document.getElementById('outCarbonSavings');
  const elCbam = document.getElementById('outCarbonCbamFee');
  const elTotal = document.getElementById('outCarbonTotalImpact');
  const elDiag = document.getElementById('outCarbonDiagnosis');

  if (elTw) elTw.textContent = `NT$ ${(taiwanFee / 10000).toFixed(1)} 萬元`;
  if (elSav) elSav.textContent = `NT$ ${(savings / 10000).toFixed(1)} 萬元`;
  if (elCbam) elCbam.textContent = `NT$ ${(finalCbamObligation / 10000).toFixed(1)} 萬元`;
  if (elTotal) elTotal.textContent = `NT$ ${(totalCarbonImpact / 10000).toFixed(1)} 萬元`;

  if (elDiag) {
    if (customDiagnosis) {
      elDiag.innerHTML = `<strong>💡 碳成本衝擊診斷：</strong>${customDiagnosis}`;
    } else {
      elDiag.innerHTML = `<strong>💡 碳成本衝擊診斷：</strong>年排碳 <strong>${emission.toLocaleString()} 公噸</strong>，${emission < 25000 ? '未達 2.5 萬噸起徵門檻，免繳台灣碳費！' : `台灣碳費應納 <strong>NT$ ${(taiwanFee / 10000).toFixed(1)} 萬元</strong>。`} 出口歐盟 CBAM 負擔 <strong>NT$ ${(finalCbamObligation / 10000).toFixed(1)} 萬元</strong>，年化總碳成本衝擊達 <strong>NT$ ${(totalCarbonImpact / 10000).toFixed(1)} 萬元</strong>。`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: ESG PORTFOLIO LAB ----------------------
function initEsgPortfolioLab() {
  document.querySelectorAll('.btn-preset-esg').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-esg').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.esgPreset = pKey;
      loadEsgPreset(pKey);
    });
  });

  ['esgMonthlyBudget', 'esgT50Ratio', 'esg00878Ratio', 'esgYears', 'esgExpectedReturn'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateEsgPortfolio);
  });

  loadEsgPreset('balanced_growth');
}

function loadEsgPreset(pKey) {
  const p = W15_ESG_PORTFOLIO_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('esgMonthlyBudget')) document.getElementById('esgMonthlyBudget').value = p.monthlyBudget;
  if (document.getElementById('esgT50Ratio')) document.getElementById('esgT50Ratio').value = p.t50Ratio;
  if (document.getElementById('esg00878Ratio')) document.getElementById('esg00878Ratio').value = p.esgRatio;
  if (document.getElementById('esgYears')) document.getElementById('esgYears').value = p.years;
  if (document.getElementById('esgExpectedReturn')) document.getElementById('esgExpectedReturn').value = p.expectedReturn;

  calculateEsgPortfolio(p.advice);
}

function calculateEsgPortfolio(customAdvice = '') {
  const budget = parseFloat(document.getElementById('esgMonthlyBudget')?.value) || 0;
  const t50 = parseFloat(document.getElementById('esgT50Ratio')?.value) || 0;
  const esg = parseFloat(document.getElementById('esg00878Ratio')?.value) || 0;
  const years = parseFloat(document.getElementById('esgYears')?.value) || 10;
  const r = (parseFloat(document.getElementById('esgExpectedReturn')?.value) || 7.0) / 100;

  const totalMonths = years * 12;
  const totalPrincipal = budget * totalMonths;
  const monthlyR = r / 12;
  const futureValue = budget * ((Math.pow(1 + monthlyR, totalMonths) - 1) / monthlyR) * (1 + monthlyR);
  const gains = futureValue - totalPrincipal;
  const carbonReduction = ((esg / 100) * 45).toFixed(1); // 00878 較大盤減少 45% 碳密集度

  const elFv = document.getElementById('outEsgFutureValue');
  const elPrin = document.getElementById('outEsgPrincipal');
  const elGains = document.getElementById('outEsgGains');
  const elCarbon = document.getElementById('outEsgCarbonReduction');
  const elAdv = document.getElementById('outEsgAdvice');

  if (elFv) elFv.textContent = `NT$ ${Math.round(futureValue).toLocaleString()} 元`;
  if (elPrin) elPrin.textContent = `NT$ ${Math.round(totalPrincipal).toLocaleString()} 元`;
  if (elGains) elGains.textContent = `NT$ ${Math.round(gains).toLocaleString()} 元`;
  if (elCarbon) elCarbon.textContent = `-${carbonReduction}% 碳足跡`;

  if (elAdv) {
    if (customAdvice) {
      elAdv.innerHTML = `<strong>💡 永續配置效益建言：</strong>${customAdvice}`;
    } else {
      elAdv.innerHTML = `<strong>💡 永續配置效益建言：</strong>每月投資 <strong>NT$ ${budget.toLocaleString()} 元</strong> 持續 <strong>${years} 年</strong>。預期累積資產達 <strong>NT$ ${Math.round(futureValue).toLocaleString()} 元</strong> (本金 NT$ ${Math.round(totalPrincipal).toLocaleString()} 元，複利增值 NT$ ${Math.round(gains).toLocaleString()} 元)。組合碳排強度較大盤降低 <strong>${carbonReduction}%</strong>！`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: ESG GAME ----------------------
function initEsgGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderEsgGameLevel();
}

function renderEsgGameLevel() {
  const container = document.getElementById('esgGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W15_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 300;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【ESG 永續理財領航大師 (ESG Master)】最高榮譽！' : '挑戰完成！榮獲【綠色初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#059669; font-size:1.3rem;">${APP_STATE.gameScore} / 400 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartEsgGame()" style="background:#059669;">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W15_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge" style="background:#059669; color:#fff;">${q.badge}</span>
        <span class="quiz-score-badge">累計得分：${APP_STATE.gameScore} / 400</span>
      </div>
      <div class="quiz-scenario">
        <strong>${q.title}</strong><br>${q.scenario}
      </div>
      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="btn-quiz-option" onclick="answerEsgGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="esgGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerEsgGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W15_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#esgGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('esgGameFeedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (selected.isCorrect) {
      APP_STATE.gameScore += 100;
      feedbackEl.innerHTML = `
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; color:#065f46; font-size:0.88rem;">
          ${selected.feedback}
          <div style="margin-top:8px; text-align:right;">
            <button class="btn-nav-step btn-primary-step" onclick="nextEsgGameLevel()" style="background:#059669; padding:4px 14px; font-size:0.8rem;">下一關卡 ➔</button>
          </div>
        </div>
      `;
    } else {
      feedbackEl.innerHTML = `
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; color:#991b1b; font-size:0.88rem;">
          ${selected.feedback}
          <div style="margin-top:8px; text-align:right;">
            <button class="btn-nav-step btn-primary-step" onclick="nextEsgGameLevel()" style="background:#059669; padding:4px 14px; font-size:0.8rem;">繼續挑戰 ➔</button>
          </div>
        </div>
      `;
    }
  }
};

window.nextEsgGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderEsgGameLevel();
};

window.restartEsgGame = function() {
  initEsgGame();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Inventory', 'hwDim2CashFlow', 'hwDim3ReserveDebt', 'hwDim4FireRoadmap', 'hwConclusionGrade', 'hwDecisionSummary'];

  fields.forEach(fId => {
    document.getElementById(fId)?.addEventListener('input', () => {
      saveHomeworkToLocal();
    });
  });
}

function saveHomeworkToLocal() {
  const data = {
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
  localStorage.setItem('W15_HOMEWORK_DATA', JSON.stringify(data));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '已自動存檔 ✓';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W15_HOMEWORK_DATA');
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
  const tpl = W15_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = tpl.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = tpl.studentId;
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = tpl.targetPlan;
  if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = tpl.dim1Inventory;
  if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = tpl.dim2CashFlow;
  if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = tpl.dim3ReserveDebt;
  if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = tpl.dim4FireRoadmap;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = tpl.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = tpl.decisionSummary;
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

  const md = `# 115學年度「管理探索二」第十五週課堂實務作業
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、ESG 三大柱指標與碳費機制對企業選股之深層影響 (25%)
${dim1}

### 二、歐盟 CBAM 碳關稅衝擊與台積電 RE100 實務剖析 (25%)
${dim2}

### 三、0050 (70%) + 00878 (30%) 永續投資組合構建 (25%)
${dim3}

### 四、個人日常減碳行動清單與防範綠色金融詐騙 SOP (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十五週作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 15,
    topic: '綠色金融ESG永續投資與碳定價經濟學',
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
  a.download = `W15_作業_${data.studentId || '未命名'}.json`;
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

  let filtered = W15_SLIDES_DATA.filter(s => {
    if (filterHour !== 'all' && String(s.hour) !== String(filterHour)) return false;
    if (q) {
      const matchZh = s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.teachingNotes.toLowerCase().includes(q);
      const matchEn = s.titleEn.toLowerCase().includes(q) || s.categoryEn.toLowerCase().includes(q);
      return matchZh || matchEn;
    }
    return true;
  });

  container.innerHTML = filtered.map(s => `
    <div class="slide-grid-card hour-${s.hour}" onclick="jumpToSlide(${s.id - 1})">
      <div class="grid-card-header">
        <span class="badge-num">Slide ${String(s.id).padStart(2, '0')}</span>
        <span class="badge-cat">${isZh ? s.category : s.categoryEn}</span>
      </div>
      <h5 class="grid-card-title">${isZh ? s.title : s.titleEn}</h5>
      <p class="grid-card-snippet">${s.teachingNotes.slice(0, 70)}...</p>
    </div>
  `).join('');
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
