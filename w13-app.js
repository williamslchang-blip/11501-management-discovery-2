/**
 * 115學年度「管理探索二」第十三週互動教學主程式
 * 單元名稱：半導體產業、護國神山台積電與台灣科技供應鏈
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#0284c7',
  drawingWidth: 3,

  // 1小時活動 (台積電先進製程與毛利率估值試算器)
  valuationPreset: 'baseline_consensus',

  // 2小時活動 (半導體資本支出 CapEx 與產能效益試算器)
  capexPreset: 'steady_growth',

  // 3小時遊戲 (半導體產業達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (台積電財務指標與矽島產業鏈分析報告)
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
  initWaferLab();
  initCapexLab();
  initSemiconGame();
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
  W13_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W13_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w13-primary, #0284c7);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W13_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W13_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W13_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W13_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W13_SLIDES_DATA.length - 1) {
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
          <h4>🏛️ 矽島台灣的半導體奇蹟：從沙子到科技運算靈魂</h4>
          <span class="sub-tag">「沒有晶圓代工模式，就沒有今天全球科技與 AI 繁榮！」— 張忠謀</span>
        </div>
        <div style="background:#f0f9ff; border:2px dashed #0284c7; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🔬</div>
          <h4 style="color:#0284c7; font-size:1.15rem; margin-bottom:8px;">全球 90% 最先進 AI 晶片產自台灣</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:540px; margin:0 auto;">
            從日常智慧手機、電動車到 ChatGPT 萬卡 AI 伺服器，底層全靠奈米晶片驅動。<br>
            <strong>本週核心任務：</strong>拆解半導體分工模式、台積電三大護城河與 0050 ETF 投資策略！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第十三週 3 小時學習地圖與核心技能樹</h4>
          <span class="sub-tag">產業分工 ➔ 先進封裝與地緣 ➔ 財務估值與跨域職涯</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.85rem;">第 1 小時 ‧ 產業三大分工</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">摩爾定律極限、IC設計/代工/封測、純晶圓代工模式破壞式創新、台積電三大護城河與千億 GigaFab。</p>
          </div>
          <div style="background:#fff1f2; border-top:4px solid #e11d48; border-radius:8px; padding:10px;">
            <strong style="color:#e11d48; font-size:0.85rem;">第 2 小時 ‧ CoWoS 與地緣</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">CoWoS 先進封裝突破頻寬牆、美日德海外設廠矽盾、毛利率 53% 定價權、3-4 年半導體景氣循環與出口占比 40%。</p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #d97706; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">第 3 小時 ‧ 0050 與科技職涯</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">0050 中台積電權重破 50% 評析、商管文組跨域科技職涯、ASML EUV 機台、營業秘密國安法與 4 大投資金律。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 摩爾定律 (Moore's Law)：指數級成長的物理奇蹟</h4>
          <span class="sub-tag">每 18-24 個月微縮電晶體，晶片運算效能翻倍且成本降低</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:12px; align-items:center;">
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
            <div style="font-size:0.82rem; color:#475569; margin-bottom:6px;">電晶體數量演進（對數尺度）：</div>
            <div style="height:120px; display:flex; align-items:flex-end; gap:10px; padding-bottom:8px; border-bottom:2px solid #64748b;">
              <div style="flex:1; background:#93c5fd; height:20%; border-radius:4px 4px 0 0; text-align:center; font-size:0.7rem;">1971<br>2.3千</div>
              <div style="flex:1; background:#60a5fa; height:45%; border-radius:4px 4px 0 0; text-align:center; font-size:0.7rem;">2000<br>4千萬</div>
              <div style="flex:1; background:#2563eb; height:75%; border-radius:4px 4px 0 0; text-align:center; font-size:0.7rem;">2020<br>150億</div>
              <div style="flex:1; background:#1d4ed8; height:100%; border-radius:4px 4px 0 0; text-align:center; font-size:0.7rem; color:#fff; font-weight:bold;">2024<br>2080億</div>
            </div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.6; color:#334155;">
            <strong>物理極限挑戰：</strong>當線寬縮小至 2nm (約 10 顆矽原子)，量子穿隧效應增加漏電，促使先進封裝與新材料躍升關鍵！
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⛓️ 半導體產業鏈垂直分工三大支柱</h4>
          <span class="sub-tag">IC 設計 (Fabless) ➔ 晶圓代工 (Foundry) ➔ 封裝測試 (OSAT)</span>
        </div>
        <div class="semi-pillars-grid">
          <div class="semi-pillar-box design">
            <div style="font-size:1.8rem;">📐</div>
            <strong style="color:#0284c7; font-size:0.85rem;">上游：IC 設計</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">輕資產、高研發。設計晶片架構與邏輯電路。<br><strong>代表：聯發科、NVIDIA、Apple</strong></p>
          </div>
          <div class="semi-pillar-box foundry">
            <div style="font-size:1.8rem;">🏭</div>
            <strong style="color:#e11d48; font-size:0.85rem;">中游：晶圓製造</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">重資產、高技術。百億光刻機微縮曝光蝕刻。<br><strong>代表：台積電、聯電、世界先進</strong></p>
          </div>
          <div class="semi-pillar-box package">
            <div style="font-size:1.8rem;">📦</div>
            <strong style="color:#d97706; font-size:0.85rem;">下游：封裝測試</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">防護切片、高速散熱與良率電性驗證。<br><strong>代表：日月光投控、京元電</strong></p>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💡 張忠謀的破壞式創新：純晶圓代工 (Pure-play Foundry)</h4>
          <span class="sub-tag">「絕不與客戶競爭」打破 IDM 寡占，催生全球無晶圓廠 (Fabless) 繁榮</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px;">
            <strong style="color:#dc2626; font-size:0.85rem;">傳統 IDM 整合模式 (Intel/三星)</strong>
            <ul style="font-size:0.75rem; color:#475569; margin-top:6px; line-height:1.6; padding-left:16px;">
              <li>自己設計產品，自己蓋廠製造</li>
              <li>客戶擔心機密晶片架構遭抄襲</li>
              <li>晶片設計初創公司無力負擔數十億建廠費</li>
            </ul>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px;">
            <strong style="color:#16a34a; font-size:0.85rem;">台積電純代工創新 (TSMC)</strong>
            <ul style="font-size:0.75rem; color:#475569; margin-top:6px; line-height:1.6; padding-left:16px;">
              <li><strong>專注代工製造：</strong>絕不做自有品牌，贏得客戶絕對信任</li>
              <li>匯聚全球訂單產能，實現極致規模經濟</li>
              <li>催生高通、NVIDIA 等無晶圓巨頭百花齊放</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 台積電 (TSMC) 的三大不可動搖護城河</h4>
          <span class="sub-tag">巴菲特所定義之頂級企業經濟護城河的極致體現</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; margin-bottom:4px;">🥇</div>
            <strong style="color:#0284c7; font-size:0.82rem;">技術領先</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:4px;">3nm/2nm 先進製程獨占90%市占，研發投入年逾千億台幣。</p>
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; margin-bottom:4px;">⚡</div>
            <strong style="color:#e11d48; font-size:0.82rem;">製造卓越</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:4px;">千億級 GigaFab 超高良率、台灣頂尖工程師 24 小時輪班文化。</p>
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; margin-bottom:4px;">🤝</div>
            <strong style="color:#059669; font-size:0.82rem;">客戶信任</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:4px;">嚴守營業秘密，誓不與客戶爭利，巨頭競品皆安心下單。</p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔬 從 12 吋晶圓到奈米晶片：造價 200 億美元的 GigaFab</h4>
          <span class="sub-tag">人類最潔淨的無塵室環境：每立方英尺落塵少於 1 顆</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <h5 style="color:#0284c7; margin-bottom:6px;">製程工藝微縮演進：</h5>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>7nm (2018)</span><span style="color:#64748b;">Apple A12</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>5nm (2020)</span><span style="color:#64748b;">M1 / iPhone 12</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>3nm (2023)</span><span style="color:#0284c7; font-weight:bold;">NVIDIA B200 / A17 Pro</span></div>
            <div style="display:flex; justify-content:space-between;"><span>2nm (2025)</span><span style="color:#e11d48; font-weight:bold;">GAA 奈米片架構量產</span></div>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px; color:#b45309;">
            <strong>重資產沉沒成本：</strong>單座先進晶圓廠投資高達 150-200 億美元，每日折舊費用數億台幣，必須保持超高稼動率！
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 實證數據：台灣證券交易所 (TWSE) 台積電核心指標</h4>
          <span class="sub-tag">台積電 (2330) 市值、毛利率與全球半導體龍頭獲利力</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; text-align:center;">
          <div style="background:#f0f9ff; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">台灣上市公司權重</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#0284c7; margin-top:2px;">~35%</div>
          </div>
          <div style="background:#fff1f2; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">財報毛利率標竿</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#e11d48; margin-top:2px;">53.0%+</div>
          </div>
          <div style="background:#ecfdf5; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">年度研發費用 (R&D)</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#059669; margin-top:2px;">> 1,800億</div>
          </div>
          <div style="background:#fffbeb; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">先進製程營收比</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#d97706; margin-top:2px;">> 65%</div>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏝️ 台灣半導體矽島產業鏈：群星拱月生態系</h4>
          <span class="sub-tag">上游 IC 設計 ‧ 中游代工 ‧ 下游封測 ‧ 材料設備周邊</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7;">核心晶片巨頭：</strong>
            <p style="color:#475569; margin-top:4px;">聯發科 (5G/AI SoC)、聯詠 (驅動IC)、瑞昱 (網通音訊)、台積電 (先進代工)、聯電 (成熟特殊製程)。</p>
          </div>
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#d97706;">封裝與材料供應鏈：</strong>
            <p style="color:#475569; margin-top:4px;">日月光 (全球最大封測)、環球晶 (矽晶圓第三大)、家登 (EUV光罩盒)、辛耘/弘塑 (濕製程設備)。</p>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏁 第一小時小結與專屬活動預告</h4>
          <span class="sub-tag">回顧摩爾定律與純晶圓代工 ➔ 即刻啟動估值試算器</span>
        </div>
        <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:14px; text-align:center;">
          <h4 style="color:#0284c7; margin-bottom:8px;">📊 專屬活動：台積電先進製程與毛利率估值試算器</h4>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            親自設定台積電年度預估營收、先進製程佔比與毛利率，觀察定價權如何支撐每股估值！
          </p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalWaferLab')" style="background:#0284c7;">
            立即開啟第 1 小時估值精算台 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚡ 什麼是 CoWoS 先進封裝？超越摩爾定律 (More than Moore)</h4>
          <span class="sub-tag">AI 算力加速的催化劑：打破傳統晶片物理「記憶體頻寬牆」</span>
        </div>
        <div style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:8px; padding:12px;">
          <div style="text-align:center; margin-bottom:8px;">
            <span style="background:#db2777; color:#fff; padding:3px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold;">CoWoS: Chip-on-Wafer-on-Substrate</span>
          </div>
          <p style="font-size:0.78rem; color:#334155; line-height:1.6;">
            將運算核心 (GPU) 與 8-12 顆高頻寬記憶體 (HBM) 放置於高密度矽中介層 (Silicon Interposer) 上，縮短電氣傳輸距離至微米級，頻寬暴增 10 倍以上！目前全球 AI 晶片供不應求的最大瓶頸就在 CoWoS 產能！
          </p>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌐 地緣政治與矽盾 (Silicon Shield)：台積電海外全球布局</h4>
          <span class="sub-tag">美國亞利桑那 Fab 21 ‧ 日本熊本 JASM ‧ 德國德勒斯登 ESMC</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; text-align:center;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">🇺🇸 美國亞利桑那</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:2px;">因應《晶片法案》補貼，支援 Apple 等美系先進國防安全訂單。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#e11d48; font-size:0.8rem;">🇯🇵 日本熊本 JASM</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:2px;">攜手 Sony 與豐田汽車，專注車用與影像感測特殊製程。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#d97706; font-size:0.8rem;">🇩🇪 德國德勒斯登</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:2px;">與博世、英飛凌合資，強化歐洲汽車工業在地供應鏈韌性。</p>
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 晶圓代工定價權 (Pricing Power) 與毛利率 53% 財報密碼</h4>
          <span class="sub-tag">巴菲特評估超級企業的核心準則：能否在通膨下自由提高售價</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:12px;">
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px; font-size:0.78rem;">
            <h5 style="color:#16a34a; margin-bottom:4px;">先進製程獨家定價權：</h5>
            <p style="color:#334155; line-height:1.5;">
              3nm 單片晶圓售價突破 2 萬美元 (約 65 萬台幣)！即使每年漲價 5%-8%，客戶依然搶排產能，因為良率差 5% 就會造成數十億美元產品報廢。
            </p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; font-size:0.78rem;">
            <h5 style="color:#dc2626; margin-bottom:4px;">高定價權抵禦折舊：</h5>
            <p style="color:#334155; line-height:1.5;">
              每年資本支出高達 300 億美元，折舊負擔極重。唯有維持 53% 以上毛利率，才能在折舊後仍保有充沛淨利與研發動能。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔄 半導體景氣循環 (Semiconductor Cycle)：繁榮與去庫存</h4>
          <span class="sub-tag">3 至 4 年典型週期：終端需求暴增 ➔ 產能緊缺 ➔ 庫存過剩 ➔ 削價出清</span>
        </div>
        <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; text-align:center; font-size:0.75rem;">
            <div style="background:#f0fdf4; padding:6px; border-radius:6px; flex:1; margin:0 3px;">
              <strong style="color:#16a34a;">1. 復甦上升期</strong><br>新科技爆發、搶產能
            </div>
            <div style="background:#f0f9ff; padding:6px; border-radius:6px; flex:1; margin:0 3px;">
              <strong style="color:#0284c7;">2. 繁榮高峰期</strong><br>利用率>100%、代工漲價
            </div>
            <div style="background:#fffbeb; padding:6px; border-radius:6px; flex:1; margin:0 3px;">
              <strong style="color:#d97706;">3. 庫存調整期</strong><br>終端放緩、客戶砍單
            </div>
            <div style="background:#fef2f2; padding:6px; border-radius:6px; flex:1; margin:0 3px;">
              <strong style="color:#dc2626;">4. 循環谷底期</strong><br>利用率下降、毛利收縮
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚢 台灣海關數據：電子零組件出口占比高達 40%~45%</h4>
          <span class="sub-tag">財政部與經濟部統計處：積體電路 (IC) 為台灣貿易順差第一大主力</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; font-weight:800; color:#0284c7;">US$ 1,700 億+</div>
          <div style="font-size:0.8rem; color:#64748b; margin-top:2px;">台灣半導體 IC 單年出口總額</div>
          <p style="font-size:0.78rem; color:#334155; margin-top:8px; line-height:1.5;">
            半導體一個產業就撐起台灣近半外銷！全球對台灣晶片的剛性需求，讓新台幣與台灣總體經濟具備強大經常帳支撐。
          </p>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 大學生看懂半導體財報 3 大指標：CapEx、GM 與利用率</h4>
          <span class="sub-tag">判斷半導體巨頭營運體質與未來訂單動能的關鍵儀表板</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.78rem;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7;">1. 資本支出 (CapEx)</strong>
            <p style="color:#475569; margin-top:4px;">擴充先進 Fab 與機台投資，代表未來 2-3 年訂單能見度與信心。</p>
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:8px;">
            <strong style="color:#e11d48;">2. 毛利率 (GM)</strong>
            <p style="color:#475569; margin-top:4px;">衡量產品定價權與技術壁壘，標竿目標大於 53%。</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#d97706;">3. 產能利用率</strong>
            <p style="color:#475569; margin-top:4px;">機台運轉飽和程度，低於 80% 時折舊攤提將大幅侵蝕營業利益。</p>
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 科技股投資風險：景氣循環谷底、過度 CapEx 與斷鏈</h4>
          <span class="sub-tag">理性投資者必須同時看見科技成長背後的下行風險</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.6; color:#7f1d1d;">
          <strong>三大核心風險：</strong><br>
          1. <strong>宏觀衰退風險：</strong>全球高通膨抑制消費電子買氣，致使先進產能短期閒置。<br>
          2. <strong>高折舊侵蝕風險：</strong>建廠成本隨地緣政治飆升，若利用率未達預期，EPS 波動放大。<br>
          3. <strong>地緣供應斷鏈：</strong>關鍵化學品、氣體或光阻劑因國際紛爭斷供之潛在威脅。
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🤝 全球半導體巨頭競合生態系</h4>
          <span class="sub-tag">TSMC ‧ NVIDIA ‧ ASML ‧ Intel 錯綜複雜的商業競合</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7;">台積電居於生態圈核心：</strong>
            <p style="color:#334155; margin-top:4px;">
              向 ASML 採購 EUV 機台 ➔ 替 NVIDIA、Apple 代工先進晶片 ➔ 提供 Intel 委外代工 ➔ 所有巨頭皆需台積電產能。
            </p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#475569;">競爭動態：</strong>
            <p style="color:#64748b; margin-top:4px;">
              Intel 欲發展 IFS 代工但良率落後；三星面臨客戶信任與發熱難題；台積電技術領先維持 1-2 年代差。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚄 台灣半導體聚落奇蹟：高鐵一小時 S 廊帶</h4>
          <span class="sub-tag">竹科 ➔ 中科 ➔ 南科 ➔ 高雄楠梓：全世界無可複製的實體群聚效應</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; font-size:0.78rem;">
          <strong style="color:#16a34a;">為什麼海外很難完全複製台灣晶圓廠？</strong>
          <p style="color:#334155; margin-top:4px; line-height:1.6;">
            台灣高鐵串聯全島，工程師與設備原廠工程師可在 1 小時內趕赴任何一座 Fab 排除故障！下游封裝、特用化學、氣體管線聚落高度密植，造就超高良率與全球最快量產爬坡速度。
          </p>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏁 第二小時小結與專屬活動預告</h4>
          <span class="sub-tag">回顧 CoWoS 與財報三大指標 ➔ 啟動資本支出試算器</span>
        </div>
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:14px; text-align:center;">
          <h4 style="color:#e11d48; margin-bottom:8px;">🎯 專屬活動：半導體資本支出 (CapEx) 與產能效益試算器</h4>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            輸入每年數百億美元 CapEx 與晶圓廠稼動率，精算折舊與未來帶動營收之倍數效益！
          </p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalCapexLab')" style="background:#e11d48;">
            立即開啟第 2 小時產能精算台 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 從投資者角度看台積電 (2330) 與 0050 ETF 權重成分</h4>
          <span class="sub-tag">元大台灣 50 (0050) 中台積電權重突破 50% 的投資意涵</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.78rem;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7;">優勢：坐享護國神山複利</strong>
            <p style="color:#475569; margin-top:4px; line-height:1.5;">
              買入 0050 即有一半資金投資在台積電，直接參與 AI 算力與先進製程長期成長紅利，無須承擔自行選股擇時壓力。
            </p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309;">提醒：單一持股集中度風險</strong>
            <p style="color:#475569; margin-top:4px; line-height:1.5;">
              0050 與台積電股價相關係數高達 0.9 以上！若追求更徹底的產業風險分散，應搭配全球股票指數 ETF (VT) 或非科技標的。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💼 大一新鮮人科技產業職涯探索：工程師 vs 供應鏈 vs 商管</h4>
          <span class="sub-tag">半導體不僅需要研發人才，更需要國際商管與營運人才</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem; text-align:center;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7;">研發與製程</strong>
            <p style="color:#64748b; margin-top:4px;">物理/化學/電機。於無塵室挑戰物理微縮良率。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#059669;">供應鏈與採購</strong>
            <p style="color:#64748b; margin-top:4px;">工管/商管。全球化學品原物料調度與庫存控管。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
            <strong style="color:#d97706;">財務與法規 (IR/Legal)</strong>
            <p style="color:#64748b; margin-top:4px;">財金/法律。千億 CapEx 籌資、國際反壟斷與智財保護。</p>
          </div>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔭 人類工程皇冠：ASML 極紫外光 (EUV) 光刻機</h4>
          <span class="sub-tag">單台造價 1.8 億至 3.5 億美元，需要 3 架波音 747 貨機運送</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong style="color:#1e293b;">微縮的核心：13.5 奈米極紫外光</strong><br>
          使用每秒 50,000 次高功率雷射連續擊中高速下落之錫滴 (Tin Droplets)，產生極微小電漿紫外光，透過蔡司 (Zeiss) 完美反射鏡聚焦在矽晶圓上。全球只有台積電能將如此極限工藝進行規模化量產！
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 產業資安與智慧財產權 (IP)：國家安全法與營業秘密防線</h4>
          <span class="sub-tag">中華民國《國家安全法》將國家核心關鍵技術營業秘密列為重罪</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.78rem; color:#7f1d1d; line-height:1.6;">
          <strong>嚴守營業秘密是科技業立足之本：</strong><br>
          台積電擁有逾 6 萬件全球專利，實施內部最高層級資訊隔離 (Info-Barrier)。大專學生未來進入科技業，務必建立高度保密與合規意識，絕不觸碰商業間諜紅線！
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💻 實證數據調取：公開資訊觀測站 (MOPS) 查閱營收指南</h4>
          <span class="sub-tag">學會用官方第一手數據驗證市場傳聞，告別散戶聽明牌思維</span>
        </div>
        <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; font-size:0.78rem;">
          <h5 style="color:#0284c7; margin-bottom:4px;">MOPS 查核三步驟：</h5>
          <ol style="margin-left:16px; line-height:1.6; color:#334155;">
            <li>瀏覽 <code>mops.twse.com.tw</code> 進入公開資訊觀測站。</li>
            <li>輸入股票代號 <code>2330</code>，查看每月 10 號發布之「月營業收入資訊」。</li>
            <li>查閱每季法人說明會簡報，檢視先進製程佔比與 CapEx 財測展望。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 大一新鮮人半導體與科技投資 4 大金律</h4>
          <span class="sub-tag">理性參與矽島成長，杜絕短線追高殺跌與期貨投機</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#f0f9ff; border-left:3px solid #0284c7; border-radius:4px; padding:8px;">
            <strong>1. 認清護城河與定價權</strong><br>優先挑選毛利 > 50% 且具備不可替代技術壁壘之龍頭。
          </div>
          <div style="background:#fff1f2; border-left:3px solid #e11d48; border-radius:4px; padding:8px;">
            <strong>2. 善用 0050 ETF 分散</strong><br>以指數化工具享受龍頭複利，同時做好全市場資產配置。
          </div>
          <div style="background:#fffbeb; border-left:3px solid #d97706; border-radius:4px; padding:8px;">
            <strong>3. 景氣循環逆風定心</strong><br>在去庫存利空谷底冷靜定期定額，耐心等待週期復甦。
          </div>
          <div style="background:#ecfdf5; border-left:3px solid #059669; border-radius:4px; padding:8px;">
            <strong>4. 長期時間複利持有</strong><br>伴隨科技典範轉移滾雪球，不被短期市場雜訊與恐慌洗出場。
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 投資試算實例：定期定額參與台灣半導體成長股利複利 SOP</h4>
          <span class="sub-tag">大一學生每月存 2,000 元買台積電零股或 0050 的複利雪球</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>每月定期定額：NT$ 2,000</span>
            <span>年化報酬預估：8.5%</span>
          </div>
          <div style="height:14px; background:#e2e8f0; border-radius:7px; overflow:hidden; display:flex; margin-bottom:8px;">
            <div style="width:60%; background:#0284c7;"></div>
            <div style="width:40%; background:#10b981;"></div>
          </div>
          <p style="color:#475569; line-height:1.5;">
            大學 4 年累積自提本金 9.6 萬元，在複利增值下畢業時市值估計達 12 萬至 14 萬元，成為護國神山實質股東！
          </p>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌏 矽島台灣與國際財經宏觀展望：AI 算力新霸權</h4>
          <span class="sub-tag">世界對 AI 算力渴望無窮無盡，台灣身處全球科技核心樞紐</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6; color:#065f46;">
          <strong>大一學生的宏觀視野：</strong><br>
          立足台灣「全球半導體密度最高」的地理優勢，鍛鍊跨國視野與外語溝通力。無論主修電機工程或商管文法，皆能搭上這艘駛向未來科技前沿的航空母艦！
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：第十三週半導體與台積電知識全景圖譜</h4>
          <span class="sub-tag">摩爾定律 ➔ 純代工創新 ➔ CoWoS ➔ 毛利53% ➔ CapEx ➔ 0050 ➔ 4大金律</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px; font-size:0.75rem;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7;">Hour 1：產業分工與商業模式</strong>（三大垂直分工 + 純代工破壞式創新 + 台積電三大護城河）
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:8px;">
            <strong style="color:#e11d48;">Hour 2：先進技術與三大指標</strong>（CoWoS超越摩爾 + 53%毛利率定價權 + CapEx/利用率 + S廊帶聚落）
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#b45309;">Hour 3：資產配置與跨域職涯</strong>（0050權重剖析 + ASML光刻機 + 跨域商管職涯 + 4大投資金律）
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業提交與第十四週【生成式 AI 革命】預告</h4>
          <span class="sub-tag">完成第十三週作業 ‧ 融會貫通矽島思維 ‧ 迎向 AI 產業鏈浪潮</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">📝 第十三週實務作業要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              線上撰寫台積電三大護城河、CoWoS 算力出貨戰略、0050 集中度配置分析與大一跨域人才成長計畫！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem; background:#0284c7;">
                開啟第十三週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#fdf4ff; border:1px solid #f5d0fe; border-radius:8px; padding:10px;">
            <strong style="color:#9333ea; font-size:0.82rem;">🤖 第十四週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【生成式 AI 革命、人工智慧產業鏈與未來職場轉型】：探討大語言模型、NVIDIA 算力晶片、企業導入 ROI 與大專生人機協作競爭力！
            </p>
          </div>
        </div>
      </div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: WAFER VALUATION LAB ----------------------
function initWaferLab() {
  document.querySelectorAll('.btn-preset-val').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-val').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.valuationPreset = pKey;
      loadWaferPreset(pKey);
    });
  });

  ['valRevenue', 'valAdvRatio', 'valGrossMargin', 'valPeRatio', 'valRdRatio'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateWaferValuation);
  });

  loadWaferPreset('baseline_consensus');
}

function loadWaferPreset(pKey) {
  const p = W13_VALUATION_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('valRevenue')) document.getElementById('valRevenue').value = p.annualRevenue;
  if (document.getElementById('valAdvRatio')) document.getElementById('valAdvRatio').value = p.advProcessRatio;
  if (document.getElementById('valGrossMargin')) document.getElementById('valGrossMargin').value = p.grossMargin;
  if (document.getElementById('valPeRatio')) document.getElementById('valPeRatio').value = p.peRatio;
  if (document.getElementById('valRdRatio')) document.getElementById('valRdRatio').value = p.rdRatio;

  calculateWaferValuation(p.diagnosis);
}

function calculateWaferValuation(customDiagnosis = '') {
  const rev = parseFloat(document.getElementById('valRevenue')?.value) || 0; // 億 NT$
  const advRatio = parseFloat(document.getElementById('valAdvRatio')?.value) || 0;
  const gm = parseFloat(document.getElementById('valGrossMargin')?.value) || 0;
  const pe = parseFloat(document.getElementById('valPeRatio')?.value) || 0;
  const rd = parseFloat(document.getElementById('valRdRatio')?.value) || 0;

  const grossProfit = (rev * (gm / 100)); // 億 NT$
  const netMarginEstimate = Math.max(gm - rd - 6, 25); // 預估淨利率 %
  const netIncome = (rev * (netMarginEstimate / 100)); // 億 NT$
  const eps = (netIncome * 100000000) / 25930000000; // 股本 259.3 億股
  const targetPrice = eps * pe;
  const targetMarketCap = (targetPrice * 25.93); // 億 NT$

  const elGp = document.getElementById('outValGrossProfit');
  const elEps = document.getElementById('outValEps');
  const elPrice = document.getElementById('outValTargetPrice');
  const elCap = document.getElementById('outValMarketCap');
  const elDiag = document.getElementById('outValDiagnosis');

  if (elGp) elGp.textContent = `NT$ ${Math.round(grossProfit).toLocaleString()} 億元`;
  if (elEps) elEps.textContent = `NT$ ${eps.toFixed(2)} 元`;
  if (elPrice) elPrice.textContent = `NT$ ${Math.round(targetPrice).toLocaleString()} 元`;
  if (elCap) elCap.textContent = `NT$ ${(targetMarketCap / 10000).toFixed(2)} 兆元`;

  if (elDiag) {
    if (customDiagnosis) {
      elDiag.innerHTML = `<strong>💡 估值模型診斷：</strong>${customDiagnosis}`;
    } else {
      elDiag.innerHTML = `<strong>💡 估值模型診斷：</strong>在年營收 <strong>NT$ ${rev.toLocaleString()} 億</strong>、毛利率 <strong>${gm}%</strong> 下，推算每股盈餘 (EPS) 約 <strong>NT$ ${eps.toFixed(2)} 元</strong>。以 <strong>${pe} 倍本益比</strong>評價，合理估值約 <strong>NT$ ${Math.round(targetPrice)} 元</strong>，目標市值達 <strong>${(targetMarketCap / 10000).toFixed(2)} 兆元</strong>。`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: CAPEX LAB ----------------------
function initCapexLab() {
  document.querySelectorAll('.btn-preset-capex').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-capex').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.capexPreset = pKey;
      loadCapexPreset(pKey);
    });
  });

  ['capexAnnualUsd', 'capexUsdFx', 'capexUtilRate', 'capexDeprYears', 'capexMultiplier'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateCapexEfficiency);
  });

  loadCapexPreset('steady_growth');
}

function loadCapexPreset(pKey) {
  const p = W13_CAPEX_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('capexAnnualUsd')) document.getElementById('capexAnnualUsd').value = p.annualCapex;
  if (document.getElementById('capexUsdFx')) document.getElementById('capexUsdFx').value = p.usdExchange;
  if (document.getElementById('capexUtilRate')) document.getElementById('capexUtilRate').value = p.fabUtilization;
  if (document.getElementById('capexDeprYears')) document.getElementById('capexDeprYears').value = p.deprYears;
  if (document.getElementById('capexMultiplier')) document.getElementById('capexMultiplier').value = p.multiplier;

  calculateCapexEfficiency(p.advice);
}

function calculateCapexEfficiency(customAdvice = '') {
  const capexUsd = parseFloat(document.getElementById('capexAnnualUsd')?.value) || 0;
  const fx = parseFloat(document.getElementById('capexUsdFx')?.value) || 32.0;
  const util = parseFloat(document.getElementById('capexUtilRate')?.value) || 90;
  const deprYears = parseFloat(document.getElementById('capexDeprYears')?.value) || 5;
  const multiplier = parseFloat(document.getElementById('capexMultiplier')?.value) || 1.25;

  const totalCapexTwd = capexUsd * fx; // 億 NT$
  const annualDeprTwd = totalCapexTwd / deprYears; // 億 NT$
  const generatedRevTwd = totalCapexTwd * multiplier * (util / 100); // 億 NT$
  const efficiency = ((generatedRevTwd / totalCapexTwd) * 100).toFixed(1);

  const elTwd = document.getElementById('outCapexTotalTwd');
  const elDepr = document.getElementById('outCapexAnnualDepr');
  const elRev = document.getElementById('outCapexGenRevenue');
  const elEff = document.getElementById('outCapexEfficiency');
  const elAdv = document.getElementById('outCapexAdvice');

  if (elTwd) elTwd.textContent = `NT$ ${Math.round(totalCapexTwd).toLocaleString()} 億元`;
  if (elDepr) elDepr.textContent = `NT$ ${Math.round(annualDeprTwd).toLocaleString()} 億元/年`;
  if (elRev) elRev.textContent = `NT$ ${Math.round(generatedRevTwd).toLocaleString()} 億元/年`;
  if (elEff) elEff.textContent = `${efficiency}%`;

  if (elAdv) {
    if (customAdvice) {
      elAdv.innerHTML = `<strong>💡 資本支出效益建言：</strong>${customAdvice}`;
    } else {
      elAdv.innerHTML = `<strong>💡 資本支出效益建言：</strong>年資本支出 <strong>US$ ${capexUsd} 億</strong> (約 NT$ ${Math.round(totalCapexTwd).toLocaleString()} 億)。在稼動率 <strong>${util}%</strong> 下，年折舊 <strong>NT$ ${Math.round(annualDeprTwd).toLocaleString()} 億</strong>，預估帶動新增年營收 <strong>NT$ ${Math.round(generatedRevTwd).toLocaleString()} 億</strong>。`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: SEMICON GAME ----------------------
function initSemiconGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderSemiconGameLevel();
}

function renderSemiconGameLevel() {
  const container = document.getElementById('semiconGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W13_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 300;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【矽島半導體產業達人 (Semicon Master)】最高榮譽！' : '挑戰完成！榮獲【半導體初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#0284c7; font-size:1.3rem;">${APP_STATE.gameScore} / 400 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartSemiconGame()" style="background:#0284c7;">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W13_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge" style="background:#0284c7; color:#fff;">${q.badge}</span>
        <span class="quiz-score-badge">累計得分：${APP_STATE.gameScore} / 400</span>
      </div>
      <div class="quiz-scenario">
        <strong>${q.title}</strong><br>${q.scenario}
      </div>
      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="btn-quiz-option" onclick="answerSemiconGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="semiconGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerSemiconGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W13_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#semiconGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('semiconGameFeedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (selected.isCorrect) {
      APP_STATE.gameScore += 100;
      feedbackEl.innerHTML = `
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; color:#065f46; font-size:0.88rem;">
          ${selected.feedback}
          <div style="margin-top:8px; text-align:right;">
            <button class="btn-nav-step btn-primary-step" onclick="nextSemiconGameLevel()" style="background:#0284c7; padding:4px 14px; font-size:0.8rem;">下一關卡 ➔</button>
          </div>
        </div>
      `;
    } else {
      feedbackEl.innerHTML = `
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; color:#991b1b; font-size:0.88rem;">
          ${selected.feedback}
          <div style="margin-top:8px; text-align:right;">
            <button class="btn-nav-step btn-primary-step" onclick="nextSemiconGameLevel()" style="background:#0284c7; padding:4px 14px; font-size:0.8rem;">繼續挑戰 ➔</button>
          </div>
        </div>
      `;
    }
  }
};

window.nextSemiconGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderSemiconGameLevel();
};

window.restartSemiconGame = function() {
  initSemiconGame();
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
  localStorage.setItem('W13_HOMEWORK_DATA', JSON.stringify(data));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '已自動存檔 ✓';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W13_HOMEWORK_DATA');
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
  const tpl = W13_HOMEWORK_TEMPLATE;
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

  const md = `# 115學年度「管理探索二」第十三週課堂實務作業
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、台積電三大護城河與 53% 毛利率定價權分析 (25%)
${dim1}

### 二、CoWoS 先進封裝戰略價值與 AI 晶片出貨分析 (25%)
${dim2}

### 三、0050 權重達 50% 投資意涵與個人資產配置策略 (25%)
${dim3}

### 四、矽島人才優勢與大一商管跨領域職涯發展行動 (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十三週作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 13,
    topic: '半導體產業護國神山台積電與台灣科技供應鏈',
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
  a.download = `W13_作業_${data.studentId || '未命名'}.json`;
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

  let filtered = W13_SLIDES_DATA.filter(s => {
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
