/**
 * 115學年度「管理探索二」第十四週互動教學主程式
 * 單元名稱：生成式 AI 革命、人工智慧產業鏈與未來職場轉型
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#7c3aed',
  drawingWidth: 3,

  // 1小時活動 (企業生成式 AI 導入投資報酬率 ROI 試算器)
  roiPreset: 'marketing_team',

  // 2小時活動 (AI 產業鏈價值分配與成本結構試算器)
  chainPreset: 'vertical_enterprise',

  // 3小時遊戲 (生成式 AI 產業鏈與未來職場達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (個人職涯人機協作轉型報告)
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
  initAiRoiLab();
  initAiChainLab();
  initAiGame();
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
  W14_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W14_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w14-primary, #7c3aed);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W14_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W14_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W14_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W14_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W14_SLIDES_DATA.length - 1) {
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
          <h4>🤖 生成式 AI 革命：從認知工具到未來智慧職場核心</h4>
          <span class="sub-tag">「AI 不會取代你，但懂得使用 AI 的人將取代你！」— 黃仁勳</span>
        </div>
        <div style="background:#f5f3ff; border:2px dashed #7c3aed; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🧠</div>
          <h4 style="color:#7c3aed; font-size:1.15rem; margin-bottom:8px;">第四次工業革命的核心大腦</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:540px; margin:0 auto;">
            生成式 AI (GenAI) 徹底打破了知識檢索與文字代碼產出的邊界。<br>
            <strong>本週核心任務：</strong>掌握 AI 三層產業價值鏈、企業導入 ROI 算術與人機協作競爭力！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第十四週 3 小時學習地圖與核心技能樹</h4>
          <span class="sub-tag">產業鏈與硬體 ➔ 提示工程與 ROI ➔ 個人工作流與轉型</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#f5f3ff; border-top:4px solid #7c3aed; border-radius:8px; padding:10px;">
            <strong style="color:#7c3aed; font-size:0.85rem;">第 1 小時 ‧ 產業鏈與算力</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">Transformer架構、基礎設施/大模型/應用三層結構、NVIDIA CUDA護城河與台灣伺服器代工霸權。</p>
          </div>
          <div style="background:#ede9fe; border-top:4px solid #6d28d9; border-radius:8px; padding:10px;">
            <strong style="color:#6d28d9; font-size:0.85rem;">第 2 小時 ‧ 提示工程與 ROI</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">Prompt 四要素、企業引進 AI 之 ROI 算術、幻覺與版權陷阱、數據隱私防護與歐盟 AI 法案。</p>
          </div>
          <div style="background:#ecfeff; border-top:4px solid #06b6d4; border-radius:8px; padding:10px;">
            <strong style="color:#0891b2; font-size:0.85rem;">第 3 小時 ‧ 工作流與職場轉型</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">個人自動化工作流、三大不可替代能力 (提問/批判/整合)、邊緣AI趨勢、防詐SOP與4大金律。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚡ 什麼是生成式 AI？從「識別世界」跨入「創造世界」</h4>
          <span class="sub-tag">判別式 AI (Discriminative) vs. 生成式 AI (Generative)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#475569;">傳統判別式 AI (1990-2021)</strong>
            <p style="color:#64748b; margin-top:4px; line-height:1.5;">輸入大量圖片或數據，回答『這張照片是貓還是狗？』或『這筆刷卡是否為盜刷？』專注於分類與預測。</p>
          </div>
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:8px; padding:10px;">
            <strong style="color:#7c3aed;">現代生成式 AI (2022 至今)</strong>
            <p style="color:#334155; margin-top:4px; line-height:1.5;">基於 Transformer 注意力機制，『請畫出一隻太空穿梭的貓』或『寫一份市場分析報告』，實現無中生有之內容產出！</p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏗️ AI 產業鏈三層價值金字塔架構</h4>
          <span class="sub-tag">基礎設施層 ➔ 模型算法層 ➔ 垂直應用層</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px; font-size:0.75rem;">
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:4px; padding:8px;">
            <strong style="color:#b45309;">1. 基礎設施層 (Infrastructure)：</strong>
            <span style="color:#475569;">GPU晶片 (NVIDIA/AMD)、代工先進封裝 (台積電)、伺服器代工 (廣達/緯創)、散熱 (奇鋐)。</span>
          </div>
          <div style="background:#f5f3ff; border-left:4px solid #7c3aed; border-radius:4px; padding:8px;">
            <strong style="color:#6d28d9;">2. 基礎模型層 (Foundation Models)：</strong>
            <span style="color:#475569;">大語言模型研發商：OpenAI (GPT-4o)、Anthropic (Claude 3.5)、Google (Gemini)、Meta (Llama 3)。</span>
          </div>
          <div style="background:#ecfeff; border-left:4px solid #06b6d4; border-radius:4px; padding:8px;">
            <strong style="color:#0891b2;">3. 垂直應用層 (Application)：</strong>
            <span style="color:#475569;">微軟 Copilot、Canva Magic、Midjourney、垂直醫療/法律智商 Agent 應用落地。</span>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>👑 NVIDIA 輝達的無敵雙重護城河：硬體 GPU + 軟體 CUDA</h4>
          <span class="sub-tag">硬體晶片算力領先 ‧ 20 年軟體開發者生態系鎖定</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.78rem;">
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px;">
            <strong style="color:#16a34a;">硬體算力怪獸：</strong>
            <p style="color:#475569; margin-top:4px;">Hopper (H100) ➔ Blackwell (B200)，2080 億顆電晶體，藉由 CoWoS 先進封裝提供極致平行浮點運算速度。</p>
          </div>
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:8px; padding:10px;">
            <strong style="color:#7c3aed;">CUDA 軟體壁壘：</strong>
            <p style="color:#475569; margin-top:4px;">全球 500 萬工程師習慣於 CUDA 函式庫開發，競品若想替換需付出極其高昂的代碼重寫與相容性代價！</p>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🖥️ 台灣伺服器代工產業霸權：廣達、緯創、英業達與鴻海</h4>
          <span class="sub-tag">全球 80% 以上 AI 伺服器由台灣電子五哥研發製造出貨</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; font-weight:bold; color:#7c3aed;">> 80% 全球市占率</div>
          <p style="font-size:0.78rem; color:#475569; margin-top:6px; line-height:1.5;">
            雲端四大巨頭 (Microsoft、Google、Amazon AWS、Meta) 的超大規模資料中心 (Hyperscalers)，機櫃與主機板 100% 依賴台灣代工製造！
          </p>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>❄️ 水冷散熱革命：晶片功耗突破 1,000 瓦的解方</h4>
          <span class="sub-tag">氣冷 (Air Cooling) 走向極限 ➔ 水冷液冷 (Liquid Cooling) 成標配</span>
        </div>
        <div style="background:#ecfeff; border:1px solid #a5f3fc; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong style="color:#0891b2;">為什麼散熱成為台灣下一座隱形金礦？</strong><br>
          單張 B200 晶片功耗高達 1,000-1,200W，整個 NVL72 伺服器機櫃功耗高達 120 千瓦！傳統風扇氣冷無法散熱，必須全面升級為水冷板、快接頭 (CDU) 與冷卻液迴路！台灣奇鋐、雙鴻躋身關鍵受惠者。
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 實證數據：Gartner 與 IDC 全球 AI 支出預測</h4>
          <span class="sub-tag">2027 年全球企業 AI 支出預估突破 5,000 億美元大關</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; text-align:center;">
          <div style="background:#f5f3ff; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">企業採用 AI 比例</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#7c3aed; margin-top:2px;">> 80%</div>
          </div>
          <div style="background:#ecfeff; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">年複合成長率 (CAGR)</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#0891b2; margin-top:2px;">38.5%</div>
          </div>
          <div style="background:#fffbeb; border-radius:6px; padding:8px;">
            <div style="font-size:0.72rem; color:#64748b;">主要算力投資來源</div>
            <div style="font-size:1.15rem; font-weight:bold; color:#b45309; margin-top:2px;">四大 CSP 巨頭</div>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧩 大模型開發成本解密：萬卡訓練與千億電費門檻</h4>
          <span class="sub-tag">訓練 GPT-4o 需耗費數萬張 H100 GPU 與數千萬美元電費</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.5;">
          <strong>高昂的門檻造就巨頭寡占：</strong><br>
          單次基礎大模型訓練成本超過 1 億美元！這使得缺乏充沛現金流的初創公司轉向利基型垂直應用，而通用大模型市場則成為微軟、Google 與 Meta 之間的巨頭遊戲。
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏁 第一小時小結與專屬活動預告</h4>
          <span class="sub-tag">回顧 AI 產業鏈與算力結構 ➔ 即刻啟動企業 ROI 試算器</span>
        </div>
        <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:8px; padding:14px; text-align:center;">
          <h4 style="color:#7c3aed; margin-bottom:8px;">📊 專屬活動：企業生成式 AI 導入投資報酬率 (ROI) 試算器</h4>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            輸入團隊員工人數、月訂閱費用與每日節省工時，精算月度淨效益與年化投資報酬率！
          </p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalAiRoiLab')" style="background:#7c3aed;">
            立即開啟第 1 小時 ROI 精算台 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 提示詞工程 (Prompt Engineering) 精準四要素公式</h4>
          <span class="sub-tag">Prompt = 角色設定 (Role) + 背景任務 (Context) + 限制條件 (Constraint) + 輸出格式 (Format)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:6px; padding:8px;">
            <strong style="color:#7c3aed;">1. 角色設定 (Role)</strong><br>「你是一位擁有 10 年經驗的資深外資半導體產業分析師...」
          </div>
          <div style="background:#ede9fe; border:1px solid #c4b5fd; border-radius:6px; padding:8px;">
            <strong style="color:#6d28d9;">2. 背景任務 (Context)</strong><br>「請分析台積電 3nm 製程毛利率與 CapEx 投入效益...」
          </div>
          <div style="background:#ecfeff; border:1px solid #a5f3fc; border-radius:6px; padding:8px;">
            <strong style="color:#0891b2;">3. 限制條件 (Constraint)</strong><br>「嚴禁使用虛構數據，引述官方財報，字數限制 300 字以內...」
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#b45309;">4. 輸出格式 (Format)</strong><br>「請以 Markdown 表格呈現各季度毛利與年增率對比...」
          </div>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💼 AI 工具在大一學習與財務分析實戰</h4>
          <span class="sub-tag">年報 10 秒速讀 ‧ 試算表公式代寫 ‧ 跨國會議簡報自動排版</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.6;">
          <strong>三大效率武器：</strong><br>
          1. <strong>財報 PDF 摘要：</strong>將 100 頁台積電年報上傳，直接提問『請列出本季海外擴廠進度與折舊估計』。<br>
          2. <strong>Excel 複雜函數生成：</strong>輸入『計算 50/30/20 比例並標記超標項目』，AI 直接產出巢狀公式。<br>
          3. <strong>簡報結構大綱：</strong>快速產出 10/20/30 法則投影片架構與數據視覺化建議。
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 企業引進 AI 的 ROI 算術：人力縮減 vs. 算力成本</h4>
          <span class="sub-tag">麥肯錫實證研究：生成式 AI 每年可為全球經濟創造 2.6 至 4.4 兆美元價值</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; font-size:0.78rem;">
          <h5 style="color:#16a34a; margin-bottom:6px;">ROI 核心公式：</h5>
          <p style="color:#334155; line-height:1.6;">
            <code>AI 淨效益 = 每月節省員工工時價值 (時數 &times; 時薪) - (AI 訂閱授權費 + 基礎設施攤提)</code><br>
            只要每位員工每日藉由 AI 提早 1 小時完成任務，創造之邊際產值即遠超每月 30 美元訂閱成本！
          </p>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 幻覺 (Hallucination) 與著作權陷阱：真偽查核必修課</h4>
          <span class="sub-tag">大模型本質是「機率文本補全器」，並非絕對客觀真理庫</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.78rem; color:#7f1d1d; line-height:1.6;">
          <strong>三大使用雷區：</strong><br>
          1. <strong>一本正經胡說八道：</strong>AI 會生成不存在的法條判例或虛假財務數據。<br>
          2. <strong>版權侵權風險：</strong>直接複製 AI 生成圖文作為商業發表可能面臨智財爭議。<br>
          3. <strong>查核 SOP：</strong>關鍵數據一律使用官方公開資訊觀測站 (MOPS) 或權威新聞二次反查！
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔒 數據隱私與資安防禦：企業機密與 Deepfake 防詐</h4>
          <span class="sub-tag">嚴防企業原始碼遭訓練集吸收 ‧ 破解 AI 仿聲換臉詐騙</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.78rem;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#dc2626;">機密外洩教訓：</strong>
            <p style="color:#475569; margin-top:4px;">知名大廠工程師曾將機密晶片代碼貼入免費版 ChatGPT 遭模型吸收。切勿關閉隱私保護開關！</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#d97706;">Deepfake 防詐：</strong>
            <p style="color:#475569; margin-top:4px;">詐騙集團僅需 3 秒音訊即可模仿親友聲音借錢。務必透過原電話回撥或設定通關密語驗證！</p>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ AI 倫理與法規：歐盟 AI 法案 (EU AI Act) 風險三分級</h4>
          <span class="sub-tag">全球首部具備法律強制力的嚴格 AI 監管里程碑</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:6px; font-size:0.75rem;">
          <div style="background:#fef2f2; border-left:4px solid #dc2626; border-radius:4px; padding:6px;">
            <strong style="color:#dc2626;">不可接受風險 (Unacceptable)：</strong>社交評分、即時人臉生物辨識監控（嚴格禁止）。
          </div>
          <div style="background:#fffbeb; border-left:4px solid #d97706; border-radius:4px; padding:6px;">
            <strong style="color:#b45309;">高風險 (High-Risk)：</strong>醫療診斷、信貸審批、自動招聘篩選（需經嚴格審計與人工干預）。
          </div>
          <div style="background:#f0fdf4; border-left:4px solid #16a34a; border-radius:4px; padding:6px;">
            <strong style="color:#16a34a;">通用與低風險 (General AI)：</strong>聊天機器人、內容生成（必須透明標註「AI 生成」）。
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⛏️ 投資 AI 理性策略：淘金熱買「賣鏟人」硬體巨頭</h4>
          <span class="sub-tag">淘金客未必能挖到黃金，但賣鏟子與牛仔褲的商人生意永遠火爆</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6;">
          <strong>為什麼硬體晶片勝率最高？</strong><br>
          不論哪一家 AI 軟體公司勝出，不論是 ChatGPT、Claude 還是 Gemini，全部都要向 <strong>NVIDIA 買 GPU、向台積電買先進製程、向廣達買伺服器</strong>！投資硬體供應鏈具備最強現金流能見度。
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚔️ 全球科技巨頭 AI 霸權大戰：三大陣營競合</h4>
          <span class="sub-tag">微軟+OpenAI ‧ 谷歌 Google ‧ 臉書 Meta</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem; text-align:center;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7;">Microsoft + OpenAI</strong>
            <p style="color:#64748b; margin-top:4px;">Copilot 生態系綁定 Office 365 與 Azure 雲端企業市場。</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fecdd3; border-radius:6px; padding:8px;">
            <strong style="color:#e11d48;">Google (Alphabet)</strong>
            <p style="color:#64748b; margin-top:4px;">Gemini 多模態大模型，整合搜尋引擎、Android 與 Workspace。</p>
          </div>
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:6px; padding:8px;">
            <strong style="color:#7c3aed;">Meta (开源陣營)</strong>
            <p style="color:#64748b; margin-top:4px;">Llama 全面免費開源，打破閉源護城河，構建全球開發者生態。</p>
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇹🇼 台灣科技業在 AI 浪潮中的核心製造力</h4>
          <span class="sub-tag">晶圓代工 (100%) ‧ GPU 基板 (90%) ‧ 散熱 (70%) ‧ 伺服器整機 (80%)</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6; color:#065f46;">
          <strong>全球無可取代的實體製造底氣：</strong><br>
          世界需要智慧大腦，更需要強大肉身來承載算力。台灣擁有全世界最完整、反應最敏捷的硬體製造鏈，全球每一次 AI 模型升級，都直接帶動台灣供應鏈營收與就業！
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏁 第二小時小結與專屬活動預告</h4>
          <span class="sub-tag">Prompt 精準四要素 ➔ 啟動 AI 產業鏈價值分配試算器</span>
        </div>
        <div style="background:#ede9fe; border:1px solid #c4b5fd; border-radius:8px; padding:14px; text-align:center;">
          <h4 style="color:#6d28d9; margin-bottom:8px;">⚖️ 專屬活動：AI 人工智慧產業鏈價值分配試算器</h4>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            調整硬體算力、雲端機房、基礎模型與垂直應用的預算比重，模擬最佳成本配置！
          </p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalAiChainLab')" style="background:#6d28d9;">
            立即開啟第 2 小時價值鏈模擬台 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔄 打造個人 AI 協作多工具工作流 SOP</h4>
          <span class="sub-tag">收集摘要 ➔ 邏輯拆解 ➔ 產出優化 ➔ 批判查核</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#f8fafc; border-left:3px solid #7c3aed; border-radius:4px; padding:8px;">
            <strong>步驟 1：文獻檢索 (Perplexity)</strong><br>快速搜尋具備官方來源引註之第一手產業數據。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #06b6d4; border-radius:4px; padding:8px;">
            <strong>步驟 2：大綱架構 (Claude)</strong><br>長文本理解與邏輯結構梳理，產出報告核心骨架。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #f59e0b; border-radius:4px; padding:8px;">
            <strong>步驟 3：數據代碼 (ChatGPT)</strong><br>生成試算表公式、Python 圖表代碼與精簡摘要。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #10b981; border-radius:4px; padding:8px;">
            <strong>步驟 4：人工驗證 (Human Check)</strong><br>對照 MOPS 重訊與官方統計，確保數據 100% 正確。
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 大一新鮮人面對 AI 時代 3 大拿不走的核心能力</h4>
          <span class="sub-tag">答案越來越廉價，提問與批判能力反而變得無比昂貴</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem; text-align:center;">
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:6px; padding:8px;">
            <div style="font-size:1.6rem;">❓</div>
            <strong style="color:#7c3aed;">精準提問力</strong>
            <p style="color:#64748b; margin-top:4px;">定義真實問題、設定邊界條件與Prompt工程能力。</p>
          </div>
          <div style="background:#ecfeff; border:1px solid #a5f3fc; border-radius:6px; padding:8px;">
            <div style="font-size:1.6rem;">🔍</div>
            <strong style="color:#0891b2;">批判思辨力</strong>
            <p style="color:#64748b; margin-top:4px;">辨別幻覺與假訊息、獨立邏輯驗證與求真精神。</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <div style="font-size:1.6rem;">🌐</div>
            <strong style="color:#b45309;">跨域整合力</strong>
            <p style="color:#64748b; margin-top:4px;">結合商管商業模式、同理心、溝通與技術落地。</p>
          </div>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📱 邊緣 AI (Edge AI) 趨勢：AI PC 與 AI 智慧手機換機潮</h4>
          <span class="sub-tag">算力從雲端機房延伸至筆電與手機端 NPU 晶片</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.6;">
          <strong>三大核心優勢：</strong><br>
          1. <strong>隱私保護：</strong>敏感個人筆記、照片在手機本機端運算，無需上傳雲端。<br>
          2. <strong>零網路延遲：</strong>即時翻譯、手勢識別無縫響應。<br>
          3. <strong>換機週期驅動：</strong>帶動聯發科手機晶片、宏碁/華碩 AI PC 與散熱模組全新商機。
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ AI 個人資安防禦：破解 Deepfake 仿聲換臉詐騙</h4>
          <span class="sub-tag">詐騙集團 3 秒語音複製與 AI 換臉即時視訊騙局</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.78rem; color:#7f1d1d; line-height:1.6;">
          <strong>防詐二不一要金律：</strong><br>
          1. <strong>絕不輕信：</strong>接到視訊或通話自稱親友車禍借錢，切勿立即轉帳！<br>
          2. <strong>先掛斷反查：</strong>掛斷電話，使用手機通訊錄原始號碼回撥核實。<br>
          3. <strong>約定家庭通關密語：</strong>設立僅家人知道的私密問題，識破深偽複製！
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 實證數據調取：NVIDIA 投資人關係 (IR) 財報查閱</h4>
          <span class="sub-tag">查看 Data Center 營收年增率與 Blackwell 晶片客戶能見度</span>
        </div>
        <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; font-size:0.78rem;">
          <h5 style="color:#0284c7; margin-bottom:4px;">NVIDIA IR 查核指引：</h5>
          <ol style="margin-left:16px; line-height:1.6; color:#334155;">
            <li>訪問 <code>investor.nvidia.com</code> 進入官方投資人專區。</li>
            <li>查閱最新季度 10-Q 報表中 <strong>Data Center (資料中心)</strong> 營收占比（已突破 85%）。</li>
            <li>檢視法人說明會中毛利率 (Gross Margin > 75%) 與客戶交期指引。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 大一新鮮人 AI 時代個人競爭力 4 大金律</h4>
          <span class="sub-tag">積極擁抱、批判求真、誠實透明與終身學習</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#f5f3ff; border-left:3px solid #7c3aed; border-radius:4px; padding:8px;">
            <strong>1. 積極擁抱 AI 成為超級個體</strong><br>將 AI 融入日常學習與報告，生產力提升 300%。
          </div>
          <div style="background:#ecfeff; border-left:3px solid #06b6d4; border-radius:4px; padding:8px;">
            <strong>2. 嚴格批判查核防範幻覺</strong><br>對所有 AI 產出數據進行第二手交叉驗證，絕不盲信。
          </div>
          <div style="background:#fffbeb; border-left:3px solid #f59e0b; border-radius:4px; padding:8px;">
            <strong>3. 堅守資安與著作權倫理</strong><br>不將機密數據上傳公共模型，主動標註 AI 協作成分。
          </div>
          <div style="background:#f0fdf4; border-left:3px solid #10b981; border-radius:4px; padding:8px;">
            <strong>4. 培養機器拿不走的軟實力</strong><br>磨練提問力、商業思辨、同理心與跨領域領導力。
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 學習效益實例：運用 AI 工具提升 300% 效率 SOP</h4>
          <span class="sub-tag">大一學生從「耗時 15 小時」縮短為「高效 3 小時」的學習實例</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.78rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>傳統人工閱讀搜尋：15 小時</span>
            <span style="color:#7c3aed; font-weight:bold;">AI 協作產出：3.5 小時</span>
          </div>
          <div style="height:14px; background:#e2e8f0; border-radius:7px; overflow:hidden; display:flex; margin-bottom:8px;">
            <div style="width:23%; background:#7c3aed;"></div>
            <div style="width:77%; background:#94a3b8;"></div>
          </div>
          <p style="color:#475569; line-height:1.5;">
            節省下的 11.5 小時可用於深度思考、實習專案或理財規劃，實現大學生活的高效升級！
          </p>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 擁抱 AI 革命：成為駕馭 AI 的終身探索者與領航者</h4>
          <span class="sub-tag">恐懼源於無知，力量來自實踐。大一新鮮人的時代新使命</span>
        </div>
        <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:8px; padding:12px; font-size:0.78rem; line-height:1.6; color:#5b21b6;">
          <strong>大一學生的時代機遇：</strong><br>
          我們正站在人類智能躍升的歷史起點。不要害怕被 AI 取代，而是主動掌握它。當你學會用管理思維指揮多個 AI Agent 為你工作時，你就是未來的領導者！
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：第十四週生成式 AI 知識全景圖譜</h4>
          <span class="sub-tag">Transformer ➔ 三層產業鏈 ➔ NVIDIA/CUDA ➔ 提示工程 ➔ ROI ➔ 人機協作</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px; font-size:0.75rem;">
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:6px; padding:8px;">
            <strong style="color:#7c3aed;">Hour 1：產業分層與硬體霸權</strong>（生成式原理 + 三層價值鏈 + NVIDIA CUDA壁壘 + 台灣代工80%）
          </div>
          <div style="background:#ede9fe; border:1px solid #c4b5fd; border-radius:6px; padding:8px;">
            <strong style="color:#6d28d9;">Hour 2：提示工程與企業 ROI</strong>（Prompt四要素 + 企業ROI算術 + 幻覺與資安 + 歐盟法案）
          </div>
          <div style="background:#ecfeff; border:1px solid #a5f3fc; border-radius:6px; padding:8px;">
            <strong style="color:#0891b2;">Hour 3：工作流與職場轉型</strong>（個人協作SOP + 3大核心能力 + Edge AI + Deepfake防詐 + 4大金律）
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業提交與第十五週【綠色金融與 ESG】預告</h4>
          <span class="sub-tag">完成第十四週作業 ‧ 打造個人 AI 協作工作流 ‧ 邁向綠色永續投資</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:8px; padding:10px;">
            <strong style="color:#7c3aed; font-size:0.82rem;">📝 第十四週實務作業要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              線上撰寫 AI 產業鏈價值分配分析、企業導入 ROI 評估、商管個人人機協作計畫與防範幻覺 SOP！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem; background:#7c3aed;">
                開啟第十四週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">🌱 第十五週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【綠色金融、ESG 永續投資與碳定價經濟學】：解鎖碳費費率算術、歐盟 CBAM 碳關稅、ESG ETF 與大一綠色職涯藍圖！
            </p>
          </div>
        </div>
      </div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: AI ROI LAB ----------------------
function initAiRoiLab() {
  document.querySelectorAll('.btn-preset-roi').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-roi').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.roiPreset = pKey;
      loadAiRoiPreset(pKey);
    });
  });

  ['roiEmployees', 'roiMonthlyFee', 'roiHoursSaved', 'roiHourlyWage', 'roiUsdFx'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateAiRoi);
  });

  loadAiRoiPreset('marketing_team');
}

function loadAiRoiPreset(pKey) {
  const p = W14_AI_ROI_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('roiEmployees')) document.getElementById('roiEmployees').value = p.employees;
  if (document.getElementById('roiMonthlyFee')) document.getElementById('roiMonthlyFee').value = p.aiCostPerMonth;
  if (document.getElementById('roiHoursSaved')) document.getElementById('roiHoursSaved').value = p.hoursSavedDaily;
  if (document.getElementById('roiHourlyWage')) document.getElementById('roiHourlyWage').value = p.hourlyWage;
  if (document.getElementById('roiUsdFx')) document.getElementById('roiUsdFx').value = p.usdFx;

  calculateAiRoi(p.diagnosis);
}

function calculateAiRoi(customDiagnosis = '') {
  const emp = parseFloat(document.getElementById('roiEmployees')?.value) || 0;
  const fee = parseFloat(document.getElementById('roiMonthlyFee')?.value) || 0; // USD
  const hrs = parseFloat(document.getElementById('roiHoursSaved')?.value) || 0; // hrs/day
  const wage = parseFloat(document.getElementById('roiHourlyWage')?.value) || 0; // TWD/hr
  const fx = parseFloat(document.getElementById('roiUsdFx')?.value) || 32.0;

  const totalMonthlyCost = emp * fee * fx; // NT$
  const monthlyHoursSaved = emp * hrs * 22; // 22 working days
  const laborValueSaved = monthlyHoursSaved * wage; // NT$
  const netMonthlyBenefit = laborValueSaved - totalMonthlyCost;
  const annualRoi = totalMonthlyCost > 0 ? (((netMonthlyBenefit * 12) / (totalMonthlyCost * 12)) * 100).toFixed(0) : 0;

  const elCost = document.getElementById('outRoiTotalCost');
  const elLabor = document.getElementById('outRoiLaborSaved');
  const elNet = document.getElementById('outRoiNetBenefit');
  const elRoi = document.getElementById('outRoiAnnualPercentage');
  const elDiag = document.getElementById('outRoiDiagnosis');

  if (elCost) elCost.textContent = `NT$ ${Math.round(totalMonthlyCost).toLocaleString()} 元/月`;
  if (elLabor) elLabor.textContent = `NT$ ${Math.round(laborValueSaved).toLocaleString()} 元/月`;
  if (elNet) {
    elNet.textContent = `NT$ ${Math.round(netMonthlyBenefit).toLocaleString()} 元/月`;
    elNet.style.color = netMonthlyBenefit >= 0 ? '#059669' : '#dc2626';
  }
  if (elRoi) elRoi.textContent = `${annualRoi}%`;

  if (elDiag) {
    if (customDiagnosis) {
      elDiag.innerHTML = `<strong>💡 導入 ROI 診斷：</strong>${customDiagnosis}`;
    } else {
      elDiag.innerHTML = `<strong>💡 導入 ROI 診斷：</strong>團隊 ${emp} 人每月投入成本 <strong>NT$ ${Math.round(totalMonthlyCost).toLocaleString()} 元</strong>。節省工時價值達 <strong>NT$ ${Math.round(laborValueSaved).toLocaleString()} 元</strong>，每月創造淨效益 <strong>NT$ ${Math.round(netMonthlyBenefit).toLocaleString()} 元</strong>，年化 ROI 估達 <strong>${annualRoi}%</strong>！`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: AI CHAIN LAB ----------------------
function initAiChainLab() {
  document.querySelectorAll('.btn-preset-chain').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-chain').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.chainPreset = pKey;
      loadAiChainPreset(pKey);
    });
  });

  ['chainBudget', 'chainHwRatio', 'chainCloudRatio', 'chainModelRatio', 'chainAppRatio'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateAiChain);
  });

  loadAiChainPreset('vertical_enterprise');
}

function loadAiChainPreset(pKey) {
  const p = W14_AI_CHAIN_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('chainBudget')) document.getElementById('chainBudget').value = p.totalBudget;
  if (document.getElementById('chainHwRatio')) document.getElementById('chainHwRatio').value = p.hardwareRatio;
  if (document.getElementById('chainCloudRatio')) document.getElementById('chainCloudRatio').value = p.cloudRatio;
  if (document.getElementById('chainModelRatio')) document.getElementById('chainModelRatio').value = p.modelRatio;
  if (document.getElementById('chainAppRatio')) document.getElementById('chainAppRatio').value = p.appRatio;

  calculateAiChain(p.advice);
}

function calculateAiChain(customAdvice = '') {
  const budget = parseFloat(document.getElementById('chainBudget')?.value) || 0; // 萬 NT$
  const hw = parseFloat(document.getElementById('chainHwRatio')?.value) || 0;
  const cloud = parseFloat(document.getElementById('chainCloudRatio')?.value) || 0;
  const model = parseFloat(document.getElementById('chainModelRatio')?.value) || 0;
  const app = parseFloat(document.getElementById('chainAppRatio')?.value) || 0;

  const hwCost = (budget * (hw / 100));
  const cloudCost = (budget * (cloud / 100));
  const modelCost = (budget * (model / 100));
  const appCost = (budget * (app / 100));

  const elHw = document.getElementById('outChainHw');
  const elCloud = document.getElementById('outChainCloud');
  const elModel = document.getElementById('outChainModel');
  const elApp = document.getElementById('outChainApp');
  const elAdv = document.getElementById('outChainAdvice');

  if (elHw) elHw.textContent = `NT$ ${hwCost.toFixed(1)} 萬元 (${hw}%)`;
  if (elCloud) elCloud.textContent = `NT$ ${cloudCost.toFixed(1)} 萬元 (${cloud}%)`;
  if (elModel) elModel.textContent = `NT$ ${modelCost.toFixed(1)} 萬元 (${model}%)`;
  if (elApp) elApp.textContent = `NT$ ${appCost.toFixed(1)} 萬元 (${app}%)`;

  if (elAdv) {
    if (customAdvice) {
      elAdv.innerHTML = `<strong>💡 價值鏈配置建言：</strong>${customAdvice}`;
    } else {
      elAdv.innerHTML = `<strong>💡 價值鏈配置建言：</strong>總預算 <strong>NT$ ${budget} 萬元</strong> 中，基礎算力硬體佔 <strong>${hw}%</strong>，雲端與模型佔 <strong>${cloud + model}%</strong>，終端應用落地佔 <strong>${app}%</strong>。符合當前垂直軟體加速變現之黃金趨勢。`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: AI GAME ----------------------
function initAiGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderAiGameLevel();
}

function renderAiGameLevel() {
  const container = document.getElementById('aiGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W14_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 300;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【生成式 AI 與人機協作達人 (AI Master)】最高榮譽！' : '挑戰完成！榮獲【AI 職場探索初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#7c3aed; font-size:1.3rem;">${APP_STATE.gameScore} / 400 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartAiGame()" style="background:#7c3aed;">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W14_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge" style="background:#7c3aed; color:#fff;">${q.badge}</span>
        <span class="quiz-score-badge">累計得分：${APP_STATE.gameScore} / 400</span>
      </div>
      <div class="quiz-scenario">
        <strong>${q.title}</strong><br>${q.scenario}
      </div>
      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="btn-quiz-option" onclick="answerAiGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="aiGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerAiGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W14_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#aiGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('aiGameFeedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (selected.isCorrect) {
      APP_STATE.gameScore += 100;
      feedbackEl.innerHTML = `
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; color:#065f46; font-size:0.88rem;">
          ${selected.feedback}
          <div style="margin-top:8px; text-align:right;">
            <button class="btn-nav-step btn-primary-step" onclick="nextAiGameLevel()" style="background:#7c3aed; padding:4px 14px; font-size:0.8rem;">下一關卡 ➔</button>
          </div>
        </div>
      `;
    } else {
      feedbackEl.innerHTML = `
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; color:#991b1b; font-size:0.88rem;">
          ${selected.feedback}
          <div style="margin-top:8px; text-align:right;">
            <button class="btn-nav-step btn-primary-step" onclick="nextAiGameLevel()" style="background:#7c3aed; padding:4px 14px; font-size:0.8rem;">繼續挑戰 ➔</button>
          </div>
        </div>
      `;
    }
  }
};

window.nextAiGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderAiGameLevel();
};

window.restartAiGame = function() {
  initAiGame();
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
  localStorage.setItem('W14_HOMEWORK_DATA', JSON.stringify(data));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '已自動存檔 ✓';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W14_HOMEWORK_DATA');
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
  const tpl = W14_HOMEWORK_TEMPLATE;
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

  const md = `# 115學年度「管理探索二」第十四週課堂實務作業
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、從底層晶片至頂層應用之 AI 產業鏈價值分配分析 (25%)
${dim1}

### 二、企業導入生成式 AI 之 ROI 成本效益評估 (25%)
${dim2}

### 三、大學四年文組/商管學生人機協作核心競爭力培養方案 (25%)
${dim3}

### 四、AI 幻覺防範、數據資安與著作權倫理規範落地 SOP (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十四週作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 14,
    topic: '生成式AI革命人工智慧產業鏈與未來職場轉型',
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
  a.download = `W14_作業_${data.studentId || '未命名'}.json`;
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

  let filtered = W14_SLIDES_DATA.filter(s => {
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
