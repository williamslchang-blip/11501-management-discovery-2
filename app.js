/**
 * 第一週 課程導論：資訊爆炸時代的財經素養
 * 互動教學主程式 (Canva 風格簡報引擎、手繪筆刷、雙語切換、主題圖片與 4 大互動模態窗)
 */

// 全域狀態
const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh', // 'zh' or 'en'
  viewMode: 'deck', // 'deck' or 'grid'
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen', // 'pen', 'highlighter', 'eraser'
  drawingColor: '#ef4444',
  drawingWidth: 3,
  history: [],
  historyStep: -1,
  
  // 1小時活動
  snrSignals: { s1: 20, s2: 15, s3: 15, s4: 10 },
  snrNoises: { n1: 35, n2: 40, n3: 30, n4: 15 },
  
  // 2小時活動
  activeReframingCase: 0,
  
  // 3小時遊戲
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],
  
  // 3小時作業
  homeworkData: {
    studentName: '',
    studentId: '',
    newsTitle: '',
    newsUrl: '',
    newsDate: '',
    newsOutlet: '',
    dataInput: '',
    disclosureInput: '',
    divergenceInput: '',
    durationInput: '',
    conclusion: 'Mixed',
    decisionText: ''
  }
};

// DOM 載入後初始化
document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initSnrActivity();
  initReframingActivity();
  initDetectiveGame();
  initHomeworkForm();
  initKeyboardShortcuts();
  loadSavedHomework();
  renderSlide();
});

// ==========================================
// 1. 簡報核心引擎 (Slide Deck Engine)
// ==========================================
function initSlidePresentation() {
  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  const btnNotesToggle = document.getElementById('btnToggleNotes');
  const btnLangToggle = document.getElementById('btnToggleLang');
  const btnFullscreen = document.getElementById('btnToggleFullscreen');
  const btnViewToggle = document.getElementById('btnToggleView');

  if (btnPrev) btnPrev.addEventListener('click', prevSlide);
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnNotesToggle) btnNotesToggle.addEventListener('click', toggleTeacherNotes);
  if (btnLangToggle) btnLangToggle.addEventListener('click', toggleLanguage);
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);
  if (btnViewToggle) btnViewToggle.addEventListener('click', toggleViewMode);
}

function prevSlide() {
  if (APP_STATE.currentSlideIndex > 0) {
    APP_STATE.currentSlideIndex--;
    renderSlide();
  }
}

function nextSlide() {
  if (APP_STATE.currentSlideIndex < SLIDES_DATA.length - 1) {
    APP_STATE.currentSlideIndex++;
    renderSlide();
  }
}

function jumpToSlide(index) {
  if (index >= 0 && index < SLIDES_DATA.length) {
    APP_STATE.currentSlideIndex = index;
    if (APP_STATE.viewMode === 'grid') {
      toggleViewMode();
    }
    renderSlide();
  }
}

function toggleTeacherNotes() {
  APP_STATE.showTeacherNotes = !APP_STATE.showTeacherNotes;
  const drawer = document.getElementById('teacherNotesDrawer');
  const btn = document.getElementById('btnToggleNotes');
  if (drawer) {
    drawer.classList.toggle('collapsed', !APP_STATE.showTeacherNotes);
  }
  if (btn) {
    btn.classList.toggle('active', APP_STATE.showTeacherNotes);
  }
}

function toggleLanguage() {
  APP_STATE.lang = APP_STATE.lang === 'zh' ? 'en' : 'zh';
  const langText = document.getElementById('langText');
  if (langText) {
    langText.textContent = APP_STATE.lang === 'zh' ? 'EN' : '中文';
  }
  document.querySelectorAll('[data-i18n-zh]').forEach(el => {
    el.textContent = APP_STATE.lang === 'zh' ? el.getAttribute('data-i18n-zh') : el.getAttribute('data-i18n-en');
  });
  renderSlide();
  if (APP_STATE.viewMode === 'grid') {
    renderGridCards();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn('Error attempting to enable fullscreen:', err.message);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
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
    if (btn) btn.classList.add('active');
  } else {
    if (deckView) deckView.style.display = 'flex';
    if (gridView) gridView.style.display = 'none';
    if (btn) btn.classList.remove('active');
    renderSlide();
  }
}

// 渲染當前 Slide
function renderSlide() {
  const slide = SLIDES_DATA[APP_STATE.currentSlideIndex];
  if (!slide) return;
  const isZh = APP_STATE.lang === 'zh';

  // 舞台卡片顏色切換
  const card = document.getElementById('slideStageCard');
  if (card) {
    card.className = `slide-stage-card hour-${slide.hour}`;
  }

  // Meta 標籤
  const numBadge = document.getElementById('slideNumBadge');
  if (numBadge) numBadge.textContent = `Slide ${String(slide.id).padStart(2, '0')} / 30`;

  const hourBadge = document.getElementById('slideHourBadge');
  if (hourBadge) {
    hourBadge.textContent = isZh ? `第 ${slide.hour} 小時` : `Hour ${slide.hour}`;
  }

  const catBadge = document.getElementById('slideCategoryBadge');
  if (catBadge) {
    catBadge.textContent = isZh ? `${slide.category.zh} ‧ ${slide.tag.zh}` : `${slide.category.en} ‧ ${slide.tag.en}`;
  }

  // 標題與副標題
  const titleEl = document.getElementById('slideTitle');
  if (titleEl) titleEl.textContent = isZh ? slide.title.zh : slide.title.en;

  const subtitleEl = document.getElementById('slideSubtitle');
  if (subtitleEl) subtitleEl.textContent = isZh ? slide.subtitle.zh : slide.subtitle.en;

  // 渲染視覺化圖表容器 (具備主題圖片與專屬圖表)
  renderSlideVisual(slide);

  // 渲染核心速記清單 (Takeaways)
  const takeawaysList = document.getElementById('slideTakeawaysList');
  if (takeawaysList) {
    takeawaysList.innerHTML = slide.keyTakeaways.map(t => `
      <li>
        <span class="dot">✦</span>
        <span>${isZh ? t.zh : t.en}</span>
      </li>
    `).join('');
  }

  // 渲染課堂提問小卡
  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) {
    guideQuestion.textContent = isZh ? slide.guidingQuestions.zh : slide.guidingQuestions.en;
  }

  // 渲染教師講授指引 (Drawer)
  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) {
    notesCore.textContent = isZh ? slide.teachingCore.zh : slide.teachingCore.en;
  }

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) {
    notesQuestions.textContent = isZh ? slide.guidingQuestions.zh : slide.guidingQuestions.en;
  }

  // 更新底端進度條
  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) {
    const pct = ((APP_STATE.currentSlideIndex + 1) / SLIDES_DATA.length) * 100;
    progressFill.style.width = `${pct}%`;
  }

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) {
    progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / 30`;
  }

  // 更新跳頁選單
  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) {
    quickSelect.value = String(APP_STATE.currentSlideIndex);
  }

  // 控制前進後退按鈕
  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === SLIDES_DATA.length - 1;
}

// ==========================================
// 2. 視覺呈現引擎：針對 30 頁主題量身訂做插圖與圖表
// ==========================================
function renderSlideVisual(slide) {
  const container = document.getElementById('slideVisualContainer');
  if (!container) return;
  const isZh = APP_STATE.lang === 'zh';
  const d = slide.visualData || {};

  switch (slide.visualType) {
    // ----------------------------------------------------
    // Slide 01: 課程導論 (主題插圖 + 數據指標)
    // ----------------------------------------------------
    case 'hero-intro':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div class="slide-image-card">
            <img src="assets/images/hero_overload.jpg" alt="Information Overload" style="height: 180px;">
            <div class="image-card-caption">
              <span>🖼️ <strong>${isZh ? '主題插圖' : 'Topic Artwork'}</strong>：2026 生成式 AI 與社群資訊過載焦慮</span>
              <span style="color: #2563eb; font-weight: 700;">#AI_Noise</span>
            </div>
          </div>
          <div class="metrics-triad">
            <div class="metric-stat-box">
              <div class="metric-stat-num">${d.metric1.num}</div>
              <div class="metric-stat-label">${isZh ? d.metric1.label.zh : d.metric1.label.en}</div>
            </div>
            <div class="metric-stat-box" style="border-top: 3px solid #ef4444;">
              <div class="metric-stat-num" style="color: #ef4444;">${d.metric2.num}</div>
              <div class="metric-stat-label">${isZh ? d.metric2.label.zh : d.metric2.label.en}</div>
            </div>
            <div class="metric-stat-box" style="border-top: 3px solid #f59e0b;">
              <div class="metric-stat-num" style="color: #f59e0b;">${d.metric3.num}</div>
              <div class="metric-stat-label">${isZh ? d.metric3.label.zh : d.metric3.label.en}</div>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 02: 3小時教學藍圖
    // ----------------------------------------------------
    case 'blueprint-map':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b; margin-bottom: 2px;">
            🗺️ ${isZh ? '180 分鐘全景教學地圖與互動配置' : '180-Minute Integrated Course Roadmap'}
          </div>
          ${d.hours.map(h => `
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; width: 100%; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm);">
              <div>
                <span style="font-weight: 800; color: ${h.hour === 1 ? '#2563eb' : h.hour === 2 ? '#7c3aed' : '#059669'}; font-size: 0.9rem;">
                  Hour ${h.hour}
                </span>
                <span style="font-size: 0.78rem; color: #64748b; margin-left: 6px;">(${h.time})</span>
                <div style="font-weight: 700; font-size: 0.88rem; color: #1e293b; margin-top: 2px;">
                  ${isZh ? h.theme.zh : h.theme.en}
                </div>
              </div>
              <span style="font-size: 0.78rem; background: ${h.hour === 1 ? '#eff6ff' : h.hour === 2 ? '#f5f3ff' : '#ecfdf5'}; color: ${h.hour === 1 ? '#1e40af' : h.hour === 2 ? '#5b21b6' : '#047857'}; padding: 4px 10px; border-radius: 999px; font-weight: 700;">
                ${isZh ? h.activity.zh : h.activity.en}
              </span>
            </div>
          `).join('')}
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 03: 媒體演進史一：紙本與廣播 (插圖 + 對照)
    // ----------------------------------------------------
    case 'timeline-compare':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div class="slide-image-card">
            <img src="assets/images/media_history.jpg" alt="Media Evolution" style="height: 175px;">
            <div class="image-card-caption">
              <span>🖼️ <strong>${isZh ? '歷史演進對照' : 'Historical Shift'}</strong>：紙本報紙壟斷 vs 1987 黑色星期一即時電視恐慌</span>
              <span style="color: #2563eb; font-weight: 700;">1920s ~ 1980s</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;">
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: left;">
              <strong style="color: #1e40af; font-size: 0.85rem;">📰 ${isZh ? d.era1.name.zh : d.era1.name.en}</strong>
              <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">時差：${d.era1.latency} ‧ ${isZh ? d.era1.access.zh : d.era1.access.en}</div>
              <div style="font-size: 0.75rem; color: #ef4444; margin-top: 2px;">⚠️ ${isZh ? d.era1.risk.zh : d.era1.risk.en}</div>
            </div>
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: left;">
              <strong style="color: #7c3aed; font-size: 0.85rem;">📺 ${isZh ? d.era2.name.zh : d.era2.name.en}</strong>
              <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">時差：${d.era2.latency} ‧ ${isZh ? d.era2.access.zh : d.era2.access.en}</div>
              <div style="font-size: 0.75rem; color: #ef4444; margin-top: 2px;">⚠️ ${isZh ? d.era2.risk.zh : d.era2.risk.en}</div>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 04: 媒體演進史二：社群與 AI 演播
    // ----------------------------------------------------
    case 'era-progression':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b;">
            ⚡ ${isZh ? '毫秒級論壇到生成式 AI：訊息指數型爆發' : 'Sub-Second Feeds to GenAI News Explosion'}
          </div>
          ${d.steps.map((st, i) => `
            <div style="background: #fff; border-left: 4px solid ${i === 0 ? '#3b82f6' : '#8b5cf6'}; border-radius: 0 8px 8px 0; padding: 14px 16px; width: 100%; text-align: left; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.9rem; color: #1e293b;">${st.year} ‧ ${isZh ? st.title.zh : st.title.en}</strong>
                <span style="font-size: 0.75rem; background: #f1f5f9; padding: 2px 8px; border-radius: 999px; font-weight: 700;">${i === 0 ? 'Web 2.0' : 'GenAI Era'}</span>
              </div>
              <p style="font-size: 0.82rem; color: #64748b; margin-top: 4px; line-height: 1.45;">
                ${isZh ? st.desc.zh : st.desc.en}
              </p>
            </div>
          `).join('')}
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 05: 訊息過載倒 U 曲線 (SVG 圖表)
    // ----------------------------------------------------
    case 'inverted-u-chart':
      container.innerHTML = `
        <div class="chart-container-inner">
          <svg class="svg-curve-chart" viewBox="0 0 500 240">
            <!-- Grid Lines -->
            <line x1="50" y1="200" x2="460" y2="200" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="50" y1="30" x2="50" y2="200" stroke="#cbd5e1" stroke-width="2"/>
            
            <!-- Inverted U Curve -->
            <path d="M 60 180 Q 230 40 440 185" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>
            
            <!-- Optimal Sweet Spot Point -->
            <circle cx="230" cy="75" r="7" fill="#10b981" stroke="#fff" stroke-width="2"/>
            <text x="230" y="55" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">
              ${isZh ? d.optimalPoint.zh : d.optimalPoint.en}
            </text>
            
            <!-- Overload Danger Zone -->
            <path d="M 280 100 Q 360 160 440 185 L 440 200 L 280 200 Z" fill="rgba(239, 68, 68, 0.12)"/>
            <text x="360" y="140" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">
              ${isZh ? d.overloadZone.zh : d.overloadZone.en}
            </text>

            <!-- Axis Labels -->
            <text x="450" y="225" font-size="11" fill="#64748b" text-anchor="end">${isZh ? '接收資訊量 (Volume) ➡️' : 'Data Volume ➡️'}</text>
            <text x="40" y="25" font-size="11" fill="#64748b">${isZh ? '決策精準度 ⬆️' : 'Accuracy ⬆️'}</text>
          </svg>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 06: 認知心理：過度交易績效減損
    // ----------------------------------------------------
    case 'stat-loss':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="background: #fff1f2; border: 2px dashed #f87171; border-radius: 12px; padding: 18px 24px; text-align: center; width: 100%;">
            <div style="font-size: 2.8rem; font-weight: 900; color: #e11d48; line-height: 1;">${d.stat}</div>
            <div style="font-size: 0.88rem; font-weight: 700; color: #9f1239; margin-top: 4px;">
              ${isZh ? d.statDesc.zh : d.statDesc.en}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; text-align: left;">
            ${d.causes.map(c => `
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; font-size: 0.8rem; color: #475569; display: flex; align-items: center; gap: 6px;">
                <span style="color: #ef4444; font-weight: bold;">✕</span>
                <span>${isZh ? c.zh : c.en}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 07: SNR 數學模型
    // ----------------------------------------------------
    case 'formula-snr':
      container.innerHTML = `
        <div class="chart-container-inner">
          <div style="background: #1e293b; color: #f8fafc; padding: 18px 24px; border-radius: 12px; width: 100%; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
            <div style="font-size: 1.15rem; font-family: monospace; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">
              SNR = Power(Signal) / Power(Noise)
            </div>
            <p style="font-size: 0.85rem; color: #94a3b8;">
              ${isZh ? '分子：自由現金流、審計財報、總經長期結構' : 'Numerator: Free cash flows, audited balance sheets'}
              <br>
              ${isZh ? '分母：短線猜測、標題黨、名嘴炒作情緒' : 'Denominator: Pundit hype, sensational headlines, herd buzz'}
            </p>
          </div>
          <div style="display: flex; gap: 14px; margin-top: 14px; width: 100%;">
            <div style="flex: 1; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; font-size: 0.82rem;">
              <strong>${isZh ? '過去常態' : 'Past Ratio'}:</strong> Signal 10 / Noise 20 = <span style="color:#2563eb; font-weight:800;">0.50</span>
            </div>
            <div style="flex: 1; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 10px; font-size: 0.82rem;">
              <strong>${isZh ? '2026 AI 爆炸' : '2026 AI Surge'}:</strong> Signal 20 / Noise 1000 = <span style="color:#e11d48; font-weight:800;">0.02 (純度暴跌 96%)</span>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 08: 標題黨情緒拉扯
    // ----------------------------------------------------
    case 'side-by-side-comparison':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 14px;">
          <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 10px; padding: 14px; text-align: left; width: 100%;">
            <span style="background: #e11d48; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">
              ${isZh ? d.noiseCard.badge.zh : d.noiseCard.badge.en}
            </span>
            <div style="font-weight: 800; font-size: 0.98rem; color: #9f1239; margin: 6px 0;">
              ${isZh ? d.noiseCard.headline.zh : d.noiseCard.headline.en}
            </div>
            <div style="font-size: 0.8rem; color: #be123c;">
              ${isZh ? d.noiseCard.tactic.zh : d.noiseCard.tactic.en}
            </div>
          </div>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px; text-align: left; width: 100%;">
            <span style="background: #16a34a; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">
              ${isZh ? d.signalCard.badge.zh : d.signalCard.badge.en}
            </span>
            <div style="font-weight: 800; font-size: 0.98rem; color: #166534; margin: 6px 0;">
              ${isZh ? d.signalCard.headline.zh : d.signalCard.headline.en}
            </div>
            <div style="font-size: 0.8rem; color: #15803d;">
              ${isZh ? d.signalCard.tactic.zh : d.signalCard.tactic.en}
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 09: 雜訊交易者風險與套利限制 (模型曲線)
    // ----------------------------------------------------
    case 'arbitrage-risk':
      container.innerHTML = `
        <div class="chart-container-inner">
          <div style="font-weight: 800; font-size: 0.9rem; color: #1e293b; margin-bottom: 6px;">
            📉 ${isZh ? '雜訊交易者狂熱與理性套利者斷頭陷阱' : 'Noise Trader Mania vs. Limits to Arbitrage'}
          </div>
          <svg viewBox="0 0 500 210" style="width: 100%; max-width: 480px; height: 190px;">
            <!-- Intrinsic Value Line -->
            <line x1="40" y1="110" x2="460" y2="110" stroke="#10b981" stroke-width="3" stroke-dasharray="6,4"/>
            <text x="465" y="115" font-size="11" font-weight="bold" fill="#059669">${isZh ? '企業內在價值' : 'Intrinsic Value'}</text>
            
            <!-- Noise Trader Bubble & Crash Wave -->
            <path d="M 40 110 Q 140 20 230 40 T 360 180 T 460 110" fill="none" stroke="#ef4444" stroke-width="3.5"/>
            
            <!-- Arbitrage Squeeze Zone -->
            <rect x="130" y="25" width="90" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" stroke-width="1"/>
            <text x="175" y="48" font-size="10" font-weight="bold" fill="#991b1b" text-anchor="middle">
              ${isZh ? '套利者保證金追繳斷頭區' : 'Margin Call Trap'}
            </text>

            <text x="140" y="18" font-size="11" font-weight="bold" fill="#dc2626">${isZh ? '情緒狂熱泡沫 ⬆️' : 'Noise Mania ⬆️'}</text>
            <text x="360" y="195" font-size="11" font-weight="bold" fill="#dc2626">${isZh ? '恐慌踩踏過跌 ⬇️' : 'Panic Overshoot ⬇️'}</text>
          </svg>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">
            ${isZh ? '「市場非理性的時間，往往長於你保持不破產的時間」—— 凱因斯' : '"Markets can stay irrational longer than you can stay solvent." — Keynes'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 10: 商業模式解密 (點閱率 vs 真實價值)
    // ----------------------------------------------------
    case 'business-model-grid':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%;">
            <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 12px; text-align: left;">
              <strong style="color: #be123c; font-size: 0.88rem;">📱 ${isZh ? d.freeModel.name.zh : d.freeModel.name.en}</strong>
              <div style="font-size: 0.78rem; color: #881337; margin-top: 4px;"><strong>營收來源：</strong>${isZh ? d.freeModel.revenue.zh : d.freeModel.revenue.en}</div>
              <div style="font-size: 0.78rem; color: #881337; margin-top: 2px;"><strong>核心誘因：</strong>${isZh ? d.freeModel.incentive.zh : d.freeModel.incentive.en}</div>
              <div style="font-size: 0.75rem; color: #e11d48; margin-top: 4px; font-weight: 700;">➜ ${isZh ? d.freeModel.result.zh : d.freeModel.result.en}</div>
            </div>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; text-align: left;">
              <strong style="color: #15803d; font-size: 0.88rem;">💻 ${isZh ? d.paidModel.name.zh : d.paidModel.name.en}</strong>
              <div style="font-size: 0.78rem; color: #14532d; margin-top: 4px;"><strong>營收來源：</strong>${isZh ? d.paidModel.revenue.zh : d.paidModel.revenue.en}</div>
              <div style="font-size: 0.78rem; color: #14532d; margin-top: 2px;"><strong>核心誘因：</strong>${isZh ? d.paidModel.incentive.zh : d.paidModel.incentive.en}</div>
              <div style="font-size: 0.75rem; color: #16a34a; margin-top: 4px; font-weight: 700;">➜ ${isZh ? d.paidModel.result.zh : d.paidModel.result.en}</div>
            </div>
          </div>
          <p style="font-size: 0.8rem; color: #64748b;">
            ${isZh ? '💡 當資訊完全免費時，你不是讀者，你的焦慮注意力才是被賣給廣告商的商品。' : '💡 When news is free, your anxious attention is the product being sold.'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 11: 認知心理學：框架效應概念
    // ----------------------------------------------------
    case 'framing-concept':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 8px; padding: 10px 16px; width: 100%;">
            <span style="font-size: 0.8rem; color: #64748b; font-weight: 700;">客觀基準事實</span>
            <div style="font-size: 1rem; font-weight: 800; color: #1e293b;">${isZh ? d.core.zh : d.core.en}</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%;">
            <div style="background: #fff1f2; border-left: 4px solid #ef4444; border-radius: 0 8px 8px 0; padding: 12px; text-align: left;">
              <span style="font-size: 0.75rem; font-weight: 800; color: #dc2626;">${isZh ? d.frameA.label.zh : d.frameA.label.en}</span>
              <div style="font-size: 0.9rem; font-weight: 700; color: #991b1b; margin: 4px 0;">${isZh ? d.frameA.text.zh : d.frameA.text.en}</div>
              <div style="font-size: 0.75rem; color: #e11d48;">➜ ${isZh ? d.frameA.reaction.zh : d.frameA.reaction.en}</div>
            </div>
            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; padding: 12px; text-align: left;">
              <span style="font-size: 0.75rem; font-weight: 800; color: #2563eb;">${isZh ? d.frameB.label.zh : d.frameB.label.en}</span>
              <div style="font-size: 0.9rem; font-weight: 700; color: #1e40af; margin: 4px 0;">${isZh ? d.frameB.text.zh : d.frameB.text.en}</div>
              <div style="font-size: 0.75rem; color: #3b82f6;">➜ ${isZh ? d.frameB.reaction.zh : d.frameB.reaction.en}</div>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 12: 新聞對照案例：「美股暴跌」 vs 「健康修正」
    // ----------------------------------------------------
    case 'case-framing-cards':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="background: #f1f5f9; padding: 6px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 700; color: #475569;">
            ${isZh ? d.event.zh : d.event.en}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%;">
            <div style="background: #fff; border: 1px solid #fecdd3; border-radius: 8px; padding: 12px; text-align: left; box-shadow: var(--shadow-sm);">
              <span style="font-size: 0.72rem; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${isZh ? d.sampleA.title.zh : d.sampleA.title.en}</span>
              <div style="font-size: 0.88rem; font-weight: 800; color: #be123c; margin: 6px 0;">${isZh ? d.sampleA.headline.zh : d.sampleA.headline.en}</div>
              <div style="font-size: 0.75rem; color: #64748b;">${isZh ? d.sampleA.focus.zh : d.sampleA.focus.en}</div>
            </div>
            <div style="background: #fff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px; text-align: left; box-shadow: var(--shadow-sm);">
              <span style="font-size: 0.72rem; background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${isZh ? d.sampleB.title.zh : d.sampleB.title.en}</span>
              <div style="font-size: 0.88rem; font-weight: 800; color: #1d4ed8; margin: 6px 0;">${isZh ? d.sampleB.headline.zh : d.sampleB.headline.en}</div>
              <div style="font-size: 0.75rem; color: #64748b;">${isZh ? d.sampleB.focus.zh : d.sampleB.focus.en}</div>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 13: 檸檬市場天秤
    // ----------------------------------------------------
    case 'lemon-market-diagram':
      container.innerHTML = `
        <div class="chart-container-inner">
          <div class="lemons-scale-box">
            <div class="peach-item-card">
              <div style="font-size: 1.4rem;">🍑</div>
              <strong style="color: #c2410c;">${isZh ? d.peach.name.zh : d.peach.name.en}</strong>
              <p style="font-size: 0.8rem; color: #9a3412; margin: 4px 0;">${isZh ? d.peach.cost.zh : d.peach.cost.en}</p>
              <span style="font-size: 0.75rem; color: #ea580c;">⚠️ ${isZh ? d.peach.fate.zh : d.peach.fate.en}</span>
            </div>
            <div class="lemon-item-card">
              <div style="font-size: 1.4rem;">🍋</div>
              <strong style="color: #854d0e;">${isZh ? d.lemon.name.zh : d.lemon.name.en}</strong>
              <p style="font-size: 0.8rem; color: #713f12; margin: 4px 0;">${isZh ? d.lemon.cost.zh : d.lemon.cost.en}</p>
              <span style="font-size: 0.75rem; color: #ca8a04;">📢 ${isZh ? d.lemon.fate.zh : d.lemon.fate.en}</span>
            </div>
          </div>
          <p style="font-size: 0.82rem; color: #64748b; margin-top: 12px;">
            ${isZh ? '劣幣驅逐良幣：免費流量使得客觀查核報導被邊緣化，充斥低成本檸檬雜訊' : 'Gresham\'s Law in Media: Cheap ad clickbait crowds out deep investigative signals'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 14: 社群媒體飆股簡訊與四部曲詐騙 (主題插圖 + 步驟)
    // ----------------------------------------------------
    case 'scam-playbook-steps':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div class="slide-image-card">
            <img src="assets/images/scam_defense.jpg" alt="Scam Defense" style="height: 165px;">
            <div class="image-card-caption">
              <span>🖼️ <strong>${isZh ? '詐騙防禦插圖' : 'Fraud Defense'}</strong>：假飆股社團、保證暴利釣魚與投資人防護盾</span>
              <span style="color: #ef4444; font-weight: 700;">#Anti_Fraud</span>
            </div>
          </div>
          <div class="timeline-steps-flow">
            ${d.steps.map((s, i) => `
              <div class="timeline-step-node" style="border-top: 3px solid #ef4444;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #dc2626;">Step ${s.num}</span>
                <div style="font-weight: 800; font-size: 0.8rem; color: #1e293b;">${isZh ? s.name.zh : s.name.en}</div>
              </div>
              ${i < d.steps.length - 1 ? '<span class="step-arrow-divider">➜</span>' : ''}
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 15: Deepfake 語音複製與 AI 假新聞 (主題插圖 + 案例)
    // ----------------------------------------------------
    case 'deepfake-threats':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div class="slide-image-card">
            <img src="assets/images/deepfake_security.jpg" alt="Deepfake Security" style="height: 165px;">
            <div class="image-card-caption">
              <span>🖼️ <strong>${isZh ? '前沿安全插圖' : 'Deepfake Threat'}</strong>：生物人臉合成、聲紋克隆與金融雙重獨立離線驗證</span>
              <span style="color: #06b6d4; font-weight: 700;">#Deepfake_Shield</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;">
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: left;">
              <strong style="color: #0284c7; font-size: 0.82rem;">🏢 ${isZh ? d.caseA.title.zh : d.caseA.title.en}</strong>
              <div style="font-size: 0.75rem; color: #ef4444; font-weight: 700;">${isZh ? d.caseA.impact.zh : d.caseA.impact.en}</div>
            </div>
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: left;">
              <strong style="color: #0284c7; font-size: 0.82rem;">🎙️ ${isZh ? d.caseB.title.zh : d.caseB.title.en}</strong>
              <div style="font-size: 0.75rem; color: #ef4444; font-weight: 700;">${isZh ? d.caseB.impact.zh : d.caseB.impact.en}</div>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 16: 計量實證：新聞情緒指數與 VIX
    // ----------------------------------------------------
    case 'sentiment-vix-chart':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 14px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; width: 100%;">
            <div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 18px; text-align: center; box-shadow: var(--shadow-sm);">
              <div style="font-size: 2.4rem; font-weight: 900; color: #7c3aed; line-height: 1;">${d.metricA.val}</div>
              <div style="font-size: 0.82rem; font-weight: 700; color: #475569; margin-top: 6px;">
                ${isZh ? d.metricA.label.zh : d.metricA.label.en}
              </div>
              <span style="font-size: 0.72rem; color: #7c3aed; font-weight: 600;">高度正相關 (NLP 文本挖掘)</span>
            </div>
            <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 12px; padding: 18px; text-align: center; box-shadow: var(--shadow-sm);">
              <div style="font-size: 2.4rem; font-weight: 900; color: #059669; line-height: 1;">${d.metricB.val}</div>
              <div style="font-size: 0.82rem; font-weight: 700; color: #065f46; margin-top: 6px;">
                ${isZh ? d.metricB.label.zh : d.metricB.label.en}
              </div>
              <span style="font-size: 0.72rem; color: #059669; font-weight: 600;">5 個交易日內估值修復</span>
            </div>
          </div>
          <p style="font-size: 0.82rem; color: #64748b;">
            ${isZh ? '計量結論：由媒體驚悚詞彙引爆的短線非理性暴跌，多數在 5 日內被均值回歸修復。' : 'Empirical finding: Headline-induced panics predominantly mean-revert within 5 days.'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 17: 恐慌拋售中的均值回歸曲線
    // ----------------------------------------------------
    case 'mean-reversion-curve':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b;">
            📈 ${isZh ? '均值回歸三階段：從過度恐慌到理性修復' : 'Three Phases of Mean Reversion'}
          </div>
          <div style="display: flex; gap: 8px; width: 100%;">
            ${d.phases.map((ph, idx) => `
              <div style="flex: 1; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 10px; text-align: left; box-shadow: var(--shadow-sm); border-top: 3px solid ${idx === 0 ? '#f59e0b' : idx === 1 ? '#ef4444' : '#10b981'};">
                <span style="font-size: 0.75rem; font-weight: 800; color: ${idx === 0 ? '#b45309' : idx === 1 ? '#dc2626' : '#059669'};">
                  ${isZh ? ph.name.zh : ph.name.en}
                </span>
                <p style="font-size: 0.78rem; color: #64748b; margin-top: 4px; line-height: 1.4;">
                  ${isZh ? ph.desc.zh : ph.desc.en}
                </p>
              </div>
            `).join('')}
          </div>
          <p style="font-size: 0.8rem; color: #64748b;">
            ${isZh ? '💡 恐慌時價格常短暫跌破內在價值線，提供長線投資人黃金買點。' : '💡 Emotional panics overshoot intrinsic value, creating long-term entry windows.'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 18: 4D Filter 核心法則 (矩陣)
    // ----------------------------------------------------
    case '4d-matrix':
      container.innerHTML = `
        <div class="chart-container-inner">
          <div class="matrix-4d-grid">
            ${d.pillars.map(p => `
              <div class="matrix-4d-cell">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="cell-code">${p.code} (${p.weight})</span>
                </div>
                <div class="cell-name">${isZh ? p.name : p.en}</div>
                <div class="cell-q">${isZh ? p.question.zh : p.question.en}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 19: 四大權威數據源
    // ----------------------------------------------------
    case 'four-sources-grid':
      container.innerHTML = `
        <div class="chart-container-inner">
          <div class="four-sources-matrix">
            ${d.sources.map(s => `
              <div class="source-item-card">
                <a href="${s.url}" target="_blank" rel="noopener">
                  <span>🏛️</span>
                  <span>${isZh ? s.name : s.en}</span>
                  <span>↗</span>
                </a>
                <p>${isZh ? s.focus.zh : s.focus.en}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 20: 個人資訊飲食 (金字塔架構)
    // ----------------------------------------------------
    case 'diet-audit-triad':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 8px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b; margin-bottom: 4px;">
            🥗 ${isZh ? '健康財經資訊金字塔 (Information Pyramid)' : 'Financial Information Diet Pyramid'}
          </div>
          <div class="diet-pyramid-container">
            <div class="pyramid-tier" style="width: 55%; background: #fee2e2; color: #991b1b; border: 1px solid #fecdd3;">
              <span>⚠️ 頂層：飆股群組 / 標題黨短影音</span>
              <span style="font-size: 0.72rem;">&lt; 10%</span>
            </div>
            <div class="pyramid-tier" style="width: 75%; background: #fef3c7; color: #92400e; border: 1px solid #fde68a;">
              <span>📰 中層：主流嚴謹財經媒體深度調查</span>
              <span style="font-size: 0.72rem;">30%</span>
            </div>
            <div class="pyramid-tier" style="width: 95%; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
              <span>🏛️ 基層：MOPS/SEC 審計財報 ‧ 央行統計 (Raw Data)</span>
              <span style="font-size: 0.72rem;">60%</span>
            </div>
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 8px;">
            ${isZh ? '三大自問：花在短影音的時間多嗎？頻道販賣焦慮嗎？親自下載過 CSV 嗎？' : 'Self-check: Do feeds dominate? Does media sell anxiety? Do you inspect raw CSVs?'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 21: 數據質疑精神：二次交叉驗證 (陷阱拆解)
    // ----------------------------------------------------
    case 'skepticism-framework':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b;">
            🔍 ${isZh ? '權威外電常見解讀盲點與陷阱' : 'Common Traps in Mainstream Financial Press'}
          </div>
          ${d.pitfalls.map(p => `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 12px 14px; width: 100%; text-align: left; box-shadow: var(--shadow-sm);">
              <div style="font-weight: 800; font-size: 0.88rem; color: #b45309;">${isZh ? p.label.zh : p.label.en}</div>
              <p style="font-size: 0.82rem; color: #475569; margin-top: 4px; line-height: 1.45;">
                ${isZh ? p.desc.zh : p.desc.en}
              </p>
            </div>
          `).join('')}
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 22: 法人與散戶時差：利多出盡管線
    // ----------------------------------------------------
    case 'time-lag-pipeline':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="font-weight: 800; font-size: 0.92rem; color: #1e293b;">
            ⏱️ ${isZh ? '經典「利多出盡 (Sell on the News)」資訊傳播時差軸' : 'The "Sell on the News" Institutional Information Pipeline'}
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            ${d.stages.map((st, i) => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; box-shadow: var(--shadow-sm); border-left: 4px solid ${i === 3 ? '#ef4444' : i === 0 ? '#10b981' : '#3b82f6'};">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 800; font-size: 0.82rem; color: #64748b; width: 65px;">${st.t}</span>
                  <span style="font-weight: 700; font-size: 0.85rem; color: #1e293b;">${isZh ? st.actor.zh : st.actor.en}</span>
                </div>
                <span style="font-size: 0.78rem; color: ${i === 3 ? '#dc2626' : '#475569'}; font-weight: ${i === 3 ? 'bold' : 'normal'};">
                  ${isZh ? st.action.zh : st.action.en}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 23: 演算法同溫層 (主題插圖 + 閉環循環)
    // ----------------------------------------------------
    case 'filter-bubble-cycle':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div class="slide-image-card">
            <img src="assets/images/filter_bubble.jpg" alt="Filter Bubble" style="height: 165px;">
            <div class="image-card-caption">
              <span>🖼️ <strong>${isZh ? '演算法同溫層插圖' : 'Echo Chamber'}</strong>：過濾氣泡阻隔了市場預警與客觀風險</span>
              <span style="color: #10b981; font-weight: 700;">#Confirmation_Bias</span>
            </div>
          </div>
          <div class="timeline-steps-flow">
            ${d.cycle.map((c, i) => `
              <div class="timeline-step-node" style="border-top: 3px solid #10b981; padding: 8px 6px;">
                <div style="font-weight: 800; font-size: 0.78rem; color: #047857;">${isZh ? c.step : c.en}</div>
                <div style="font-size: 0.72rem; color: #475569; margin-top: 2px;">${isZh ? c.text.zh : c.text.en}</div>
              </div>
              ${i < d.cycle.length - 1 ? '<span class="step-arrow-divider" style="font-size: 0.85rem;">➜</span>' : ''}
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 24: 事件驅動避險思維 (時間軸分流)
    // ----------------------------------------------------
    case 'event-timeline':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 14px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b;">
            ⏳ ${isZh ? '重大事件公佈後的雜訊與訊號分期' : 'Event Horizon: Noise Turbulence vs. Signal Clarity'}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; width: 100%;">
            <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 14px; text-align: left;">
              <span style="background: #ef4444; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">${d.zoneA.time}</span>
              <div style="font-weight: 800; font-size: 0.9rem; color: #991b1b; margin: 6px 0;">${isZh ? d.zoneA.status.zh : d.zoneA.status.en}</div>
              <div style="font-size: 0.78rem; color: #b91c1c;">🚫 ${isZh ? d.zoneA.action.zh : d.zoneA.action.en}</div>
            </div>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; text-align: left;">
              <span style="background: #10b981; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">${d.zoneB.time}</span>
              <div style="font-weight: 800; font-size: 0.9rem; color: #065f46; margin: 6px 0;">${isZh ? d.zoneB.status.zh : d.zoneB.status.en}</div>
              <div style="font-size: 0.78rem; color: #047857;">✅ ${isZh ? d.zoneB.action.zh : d.zoneB.action.en}</div>
            </div>
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 25: 法說會術語解碼表
    // ----------------------------------------------------
    case 'jargon-decoder-table':
      container.innerHTML = `
        <div class="chart-container-inner" style="overflow-x: auto;">
          <table class="jargon-table">
            <thead>
              <tr>
                <th>${isZh ? '法說會公關修詞 (PR Spin)' : 'Executive Jargon'}</th>
                <th>${isZh ? '財務報表底層真相 (Truth)' : 'Balance Sheet Reality'}</th>
              </tr>
            </thead>
            <tbody>
              ${d.terms.map(t => `
                <tr>
                  <td class="jargon-spin">${isZh ? t.spin.zh : t.spin.en}</td>
                  <td class="jargon-truth">${isZh ? t.truth.zh : t.truth.en}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 26: 數據視覺化迷思：圖表軸線誇大
    // ----------------------------------------------------
    case 'misleading-chart-compare':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div style="font-weight: 800; font-size: 0.92rem; color: #1e293b;">
            📊 ${isZh ? '相同數據、不同刻度：視覺如何欺騙大腦' : 'Visual Distortion: Truncated Y-Axis vs. True Baseline'}
          </div>
          <div class="axis-compare-grid">
            <div class="axis-chart-box" style="border-top: 3px solid #ef4444;">
              <span style="font-size: 0.75rem; font-weight: 800; color: #dc2626;">${isZh ? d.chartA.label.zh : d.chartA.label.en}</span>
              <svg viewBox="0 0 200 100" style="width: 100%; height: 75px; margin-top: 4px;">
                <line x1="20" y1="80" x2="190" y2="80" stroke="#cbd5e1"/>
                <line x1="20" y1="10" x2="20" y2="80" stroke="#cbd5e1"/>
                <path d="M 30 15 L 180 75" stroke="#ef4444" stroke-width="4" fill="none"/>
                <text x="25" y="15" font-size="8" fill="#991b1b">100</text>
                <text x="25" y="75" font-size="8" fill="#991b1b">98</text>
              </svg>
              <div style="font-size: 0.78rem; font-weight: 700; color: #b91c1c;">⚠️ ${isZh ? d.chartA.visual : d.chartA.enVisual}</div>
            </div>
            <div class="axis-chart-box" style="border-top: 3px solid #10b981;">
              <span style="font-size: 0.75rem; font-weight: 800; color: #059669;">${isZh ? d.chartB.label.zh : d.chartB.label.en}</span>
              <svg viewBox="0 0 200 100" style="width: 100%; height: 75px; margin-top: 4px;">
                <line x1="20" y1="80" x2="190" y2="80" stroke="#cbd5e1"/>
                <line x1="20" y1="10" x2="20" y2="80" stroke="#cbd5e1"/>
                <path d="M 30 15 L 180 18" stroke="#10b981" stroke-width="3" fill="none"/>
                <text x="25" y="15" font-size="8" fill="#065f46">100</text>
                <text x="25" y="75" font-size="8" fill="#065f46">0</text>
              </svg>
              <div style="font-size: 0.78rem; font-weight: 700; color: #047857;">✅ ${isZh ? d.chartB.visual : d.chartB.enVisual}</div>
            </div>
          </div>
          <p style="font-size: 0.78rem; color: #64748b;">
            ${isZh ? '防騙守則：看任何圖表先看 Y 軸是否從 0 起跳，親自計算真實跌幅百分比！' : 'Defense: Always inspect if Y-axis originates at 0; compute percentage change manually!'}
          </p>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 27: 綠色洗白辨驗 (主題插圖 + 查核對照)
    // ----------------------------------------------------
    case 'greenwashing-table':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div class="slide-image-card">
            <img src="assets/images/esg_reality.jpg" alt="ESG Greenwashing" style="height: 165px;">
            <div class="image-card-caption">
              <span>🖼️ <strong>${isZh ? 'ESG 辨驗插圖' : 'ESG Audit'}</strong>：公關植樹宣傳假象 vs 工廠碳足跡數據審計清單</span>
              <span style="color: #059669; font-weight: 700;">#IFRS_S1_S2</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;">
            ${d.claims.map((cl, i) => `
              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: left; border-top: 3px solid ${i === 0 ? '#ef4444' : '#10b981'};">
                <strong style="color: ${i === 0 ? '#b91c1c' : '#047857'}; font-size: 0.82rem;">${isZh ? cl.type.zh : cl.type.en}</strong>
                <p style="font-size: 0.75rem; color: #475569; margin-top: 2px;">${isZh ? cl.example.zh : cl.example.en}</p>
                <div style="font-size: 0.72rem; color: #64748b; margin-top: 2px;">實質：${isZh ? cl.reality.zh : cl.reality.en}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 28: 終身財經思維四大支柱
    // ----------------------------------------------------
    case 'four-pillars-grid':
      container.innerHTML = `
        <div class="chart-container-inner">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%;">
            ${d.pillars.map(p => `
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: left; box-shadow: var(--shadow-sm); border-top: 3px solid #2563eb;">
                <strong style="color: #1e40af; font-size: 0.92rem; display: block; margin-bottom: 4px;">${isZh ? p.name.zh : p.name.en}</strong>
                <p style="font-size: 0.8rem; color: #475569; line-height: 1.45;">${isZh ? p.desc.zh : p.desc.en}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 29: 全景總結與知識關聯圖
    // ----------------------------------------------------
    case 'knowledge-mindmap':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 10px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b;">
            🌳 ${isZh ? '第一週全景知識體系整合脈絡' : 'Panoramic Week 1 Knowledge Framework'}
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            ${d.branches.map((b, i) => `
              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; text-align: left; box-shadow: var(--shadow-sm); border-left: 4px solid ${i === 0 ? '#2563eb' : i === 1 ? '#7c3aed' : '#059669'};">
                <strong style="font-size: 0.85rem; color: ${i === 0 ? '#1e40af' : i === 1 ? '#5b21b6' : '#047857'};">${isZh ? b.title.zh : b.title.en}</strong>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                  ${b.items.map(it => `
                    <span style="font-size: 0.72rem; background: #f1f5f9; padding: 2px 8px; border-radius: 999px; color: #334155;">${it}</span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    // ----------------------------------------------------
    // Slide 30: 學習反思與第二週預告
    // ----------------------------------------------------
    case 'preview-card':
      container.innerHTML = `
        <div class="chart-container-inner" style="gap: 12px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); color: #fff; border-radius: 12px; padding: 16px 20px; text-align: left; width: 100%; box-shadow: var(--shadow-md);">
            <span style="font-size: 0.75rem; background: rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 999px; font-weight: 800;">${d.nextWeek.week} 預告</span>
            <div style="font-size: 1.15rem; font-weight: 800; margin: 6px 0;">${isZh ? d.nextWeek.topic.zh : d.nextWeek.topic.en}</div>
            <div style="font-size: 0.82rem; line-height: 1.45; opacity: 0.95;">
              ${d.nextWeek.highlights.map(h => `• ${isZh ? h.zh : h.en}`).join('<br>')}
            </div>
          </div>
          <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; width: 100%; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm);">
            <div style="text-align: left;">
              <strong style="font-size: 0.85rem; color: #1e293b;">📝 課後行動提醒</strong>
              <div style="font-size: 0.78rem; color: #64748b;">${isZh ? d.assignmentPrompt.zh : d.assignmentPrompt.en}</div>
            </div>
            <button class="btn-nav-action btn-hw" onclick="openModal('modalHomework')">
              立即前往作業 ➜
            </button>
          </div>
        </div>
      `;
      break;

    default:
      container.innerHTML = `
        <div class="chart-container-inner">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; width: 100%; box-shadow: var(--shadow-sm);">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">💎</div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
              ${isZh ? slide.title.zh : slide.title.en}
            </h3>
            <p style="font-size: 0.88rem; color: #64748b; line-height: 1.5;">
              ${isZh ? slide.subtitle.zh : slide.subtitle.en}
            </p>
          </div>
        </div>
      `;
      break;
  }
}

// ==========================================
// 3. 總覽卡片視圖 (Grid Overview Mode)
// ==========================================
function initGridOverview() {
  const searchInput = document.getElementById('gridSearchInput');
  const tabs = document.querySelectorAll('.tab-hour-filter');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderGridCards();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGridCards();
    });
  });
}

function renderGridCards() {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;

  const isZh = APP_STATE.lang === 'zh';
  const activeTab = document.querySelector('.tab-hour-filter.active');
  const filterHour = activeTab ? activeTab.getAttribute('data-hour') : 'all';
  const query = (document.getElementById('gridSearchInput')?.value || '').toLowerCase().trim();

  const filtered = SLIDES_DATA.filter(slide => {
    const matchHour = filterHour === 'all' || String(slide.hour) === filterHour;
    const titleText = (isZh ? slide.title.zh : slide.title.en).toLowerCase();
    const coreText = (isZh ? slide.teachingCore.zh : slide.teachingCore.en).toLowerCase();
    const matchQuery = !query || titleText.includes(query) || coreText.includes(query);
    return matchHour && matchQuery;
  });

  container.innerHTML = filtered.map(slide => `
    <div class="overview-card-item hour-${slide.hour}" onclick="jumpToSlide(${slide.id - 1})">
      <div class="overview-card-meta">
        <span class="badge-slide-num">Slide ${String(slide.id).padStart(2, '0')}</span>
        <span class="badge-hour">${isZh ? `第 ${slide.hour} 小時` : `Hour ${slide.hour}`}</span>
      </div>
      <div class="overview-card-title">${isZh ? slide.title.zh : slide.title.en}</div>
      <div class="overview-card-desc">${isZh ? slide.teachingCore.zh : slide.teachingCore.en}</div>
      <div class="overview-card-footer">
        <span>🏷️ ${isZh ? slide.tag.zh : slide.tag.en}</span>
        <span style="font-weight: 700; color: #2563eb;">${isZh ? '點擊進入簡報 ➜' : 'Open Slide ➜'}</span>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 4. 手繪筆刷與螢光筆畫布 (Canvas Annotation)
// ==========================================
function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const toolbar = document.getElementById('drawingToolbar');
  const btnToggleDrawing = document.getElementById('btnToggleDrawing');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let isPainting = false;
  let lastX = 0;
  let lastY = 0;

  function startPosition(e) {
    if (!APP_STATE.isDrawingActive) return;
    isPainting = true;
    const rect = canvas.getBoundingClientRect();
    lastX = (e.clientX || e.touches[0].clientX) - rect.left;
    lastY = (e.clientY || e.touches[0].clientY) - rect.top;
    draw(e);
  }

  function endPosition() {
    if (!isPainting) return;
    isPainting = false;
    ctx.beginPath();
    saveCanvasState();
  }

  function draw(e) {
    if (!isPainting || !APP_STATE.isDrawingActive) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const currentY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineWidth = APP_STATE.drawingWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (APP_STATE.drawingTool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = APP_STATE.drawingColor;
    } else if (APP_STATE.drawingTool === 'highlighter') {
      ctx.globalCompositeOperation = 'multiply';
      ctx.strokeStyle = APP_STATE.drawingColor + '55'; // semi-transparent
      ctx.lineWidth = APP_STATE.drawingWidth * 3.5;
    } else if (APP_STATE.drawingTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = APP_STATE.drawingWidth * 4;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    lastX = currentX;
    lastY = currentY;
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseleave', endPosition);

  canvas.addEventListener('touchstart', startPosition, { passive: false });
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw, { passive: false });

  // 切換畫筆工具列
  if (btnToggleDrawing) {
    btnToggleDrawing.addEventListener('click', () => {
      APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
      btnToggleDrawing.classList.toggle('active', APP_STATE.isDrawingActive);
      canvas.classList.toggle('active-drawing', APP_STATE.isDrawingActive);
      if (toolbar) toolbar.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    });
  }

  // 工具列按鈕事件
  document.querySelectorAll('.btn-draw-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-draw-tool').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      APP_STATE.drawingTool = btn.getAttribute('data-tool');
    });
  });

  // 顏色選擇器
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      APP_STATE.drawingColor = swatch.getAttribute('data-color');
    });
  });

  // 清除全部畫筆
  const btnClear = document.getElementById('btnClearDrawing');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveCanvasState();
    });
  }

  // 儲存畫面截圖
  const btnSnapshot = document.getElementById('btnSaveDrawing');
  if (btnSnapshot) {
    btnSnapshot.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `W1_資訊爆炸時代的財經素養_Slide_${APP_STATE.currentSlideIndex + 1}_註記.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  function saveCanvasState() {
    APP_STATE.historyStep++;
    if (APP_STATE.historyStep < APP_STATE.history.length) {
      APP_STATE.history.length = APP_STATE.historyStep;
    }
    APP_STATE.history.push(canvas.toDataURL());
  }
}

// ==========================================
// 5. 第 1 小時活動：資訊飲食與 SNR 計算盤
// ==========================================
function initSnrActivity() {
  const signalInputs = document.querySelectorAll('.slider-signal');
  const noiseInputs = document.querySelectorAll('.slider-noise');

  function calculateSNR() {
    let totalSignal = 0;
    signalInputs.forEach(input => {
      const val = parseInt(input.value) || 0;
      totalSignal += val;
      const label = document.getElementById(`val-${input.id}`);
      if (label) label.textContent = `${val} min`;
    });

    let totalNoise = 0;
    noiseInputs.forEach(input => {
      const val = parseInt(input.value) || 0;
      totalNoise += val;
      const label = document.getElementById(`val-${input.id}`);
      if (label) label.textContent = `${val} min`;
    });

    const totalSignalEl = document.getElementById('totalSignalMins');
    const totalNoiseEl = document.getElementById('totalNoiseMins');
    if (totalSignalEl) totalSignalEl.textContent = `${totalSignal} min`;
    if (totalNoiseEl) totalNoiseEl.textContent = `${totalNoise} min`;

    const snr = totalNoise === 0 ? 99.9 : (totalSignal / totalNoise);
    const snrScoreEl = document.getElementById('snrScoreNumber');
    if (snrScoreEl) snrScoreEl.textContent = snr >= 10 ? snr.toFixed(1) : snr.toFixed(2);

    // 取得診斷等級
    const isZh = APP_STATE.lang === 'zh';
    const tier = SNR_ACTIVITY_DATA.diagnosticLevels.find(l => snr <= l.max) || SNR_ACTIVITY_DATA.diagnosticLevels[3];

    const badgeEl = document.getElementById('snrDiagnosisBadge');
    const descEl = document.getElementById('snrDiagnosisDesc');
    const rxEl = document.getElementById('snrDiagnosisRx');

    if (badgeEl) {
      badgeEl.textContent = isZh ? tier.badge : tier.badgeEn;
      badgeEl.style.backgroundColor = tier.color + '22';
      badgeEl.style.color = tier.color;
    }
    if (descEl) descEl.textContent = isZh ? tier.desc.zh : tier.desc.en;
    if (rxEl) rxEl.textContent = isZh ? tier.rx.zh : tier.rx.en;
  }

  signalInputs.forEach(input => input.addEventListener('input', calculateSNR));
  noiseInputs.forEach(input => input.addEventListener('input', calculateSNR));

  calculateSNR();
}

// ==========================================
// 6. 第 2 小時活動：新聞標題框架重組大考驗
// ==========================================
function initReframingActivity() {
  const tabs = document.querySelectorAll('.tab-reframing-case');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      APP_STATE.activeReframingCase = index;
      renderReframingCase();
    });
  });

  const btnCompare = document.getElementById('btnCompareExpert');
  if (btnCompare) {
    btnCompare.addEventListener('click', () => {
      const box = document.getElementById('expertComparisonBox');
      if (box) box.classList.toggle('show');
    });
  }

  renderReframingCase();
}

function renderReframingCase() {
  const c = REFRAMING_ACTIVITY_DATA.cases[APP_STATE.activeReframingCase];
  if (!c) return;
  const isZh = APP_STATE.lang === 'zh';

  const quoteEl = document.getElementById('clickbaitQuoteText');
  const triggersEl = document.getElementById('clickbaitTriggersText');
  const factsEl = document.getElementById('factsBodyText');
  const hintEl = document.getElementById('reframingPromptHint');
  const expertEl = document.getElementById('expertModelText');
  const expertBox = document.getElementById('expertComparisonBox');

  if (quoteEl) quoteEl.textContent = isZh ? c.clickbait.zh : c.clickbait.en;
  if (triggersEl) triggersEl.textContent = isZh ? c.emotionalTriggers.zh : c.emotionalTriggers.en;
  if (factsEl) factsEl.textContent = isZh ? c.realFacts.zh : c.realFacts.en;
  if (hintEl) hintEl.textContent = isZh ? c.promptHint.zh : c.promptHint.en;
  if (expertEl) expertEl.textContent = isZh ? c.expertModel.zh : c.expertModel.en;
  if (expertBox) expertBox.classList.remove('show');
}

// ==========================================
// 7. 第 3 小時小遊戲：財經新聞真假與雜訊偵測大挑戰
// ==========================================
function initDetectiveGame() {
  renderGameLevel();
}

function renderGameLevel() {
  const lvl = DETECTIVE_GAME_DATA.levels[APP_STATE.gameCurrentLevel];
  const isZh = APP_STATE.lang === 'zh';

  const stepBadge = document.getElementById('gameStepBadge');
  const scoreBadge = document.getElementById('gameScoreBadge');
  const gameCard = document.getElementById('gameScenarioCard');
  const certCard = document.getElementById('gameCertificateCard');

  if (stepBadge) stepBadge.textContent = `${isZh ? '關卡' : 'Level'} ${APP_STATE.gameCurrentLevel + 1} / 4`;
  if (scoreBadge) scoreBadge.textContent = `${isZh ? '目前積分' : 'Score'}: ${APP_STATE.gameScore} pts`;

  if (APP_STATE.gameCurrentLevel >= 4) {
    if (gameCard) gameCard.style.display = 'none';
    if (certCard) {
      certCard.style.display = 'block';
      renderDetectiveCertificate();
    }
    return;
  }

  if (gameCard) gameCard.style.display = 'block';
  if (certCard) certCard.style.display = 'none';

  const headlineEl = document.getElementById('gameHeadlineAlert');
  const snippetEl = document.getElementById('gameSnippetText');
  const questionEl = document.getElementById('gameQuestionText');
  const optionsContainer = document.getElementById('gameOptionsContainer');
  const feedbackPanel = document.getElementById('gameFeedbackPanel');

  if (headlineEl) headlineEl.textContent = isZh ? lvl.headline.zh : lvl.headline.en;
  if (snippetEl) snippetEl.textContent = isZh ? `📰 ${lvl.sourceSnippet.zh}` : `📰 ${lvl.sourceSnippet.en}`;
  if (questionEl) questionEl.textContent = isZh ? lvl.question.zh : lvl.question.en;
  if (feedbackPanel) {
    feedbackPanel.className = 'game-feedback-panel';
    feedbackPanel.style.display = 'none';
  }

  if (optionsContainer) {
    optionsContainer.innerHTML = lvl.options.map(opt => `
      <button class="btn-game-choice" onclick="selectGameOption('${opt.id}')">
        <span class="choice-option-tag">${opt.id}</span>
        <span>${isZh ? opt.text.zh : opt.text.en}</span>
      </button>
    `).join('');
  }
}

function selectGameOption(optId) {
  const lvl = DETECTIVE_GAME_DATA.levels[APP_STATE.gameCurrentLevel];
  if (!lvl || APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  const isZh = APP_STATE.lang === 'zh';

  const opt = lvl.options.find(o => o.id === optId);
  const feedbackPanel = document.getElementById('gameFeedbackPanel');
  const buttons = document.querySelectorAll('.btn-game-choice');

  buttons.forEach(btn => {
    btn.disabled = true;
    const tag = btn.querySelector('.choice-option-tag')?.textContent;
    const matchOpt = lvl.options.find(o => o.id === tag);
    if (matchOpt && matchOpt.isCorrect) {
      btn.classList.add('correct');
    } else if (tag === optId && !matchOpt.isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  if (opt.isCorrect) {
    APP_STATE.gameScore += 25;
    const scoreBadge = document.getElementById('gameScoreBadge');
    if (scoreBadge) scoreBadge.textContent = `${isZh ? '目前積分' : 'Score'}: ${APP_STATE.gameScore} pts`;
  }

  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  if (feedbackPanel) {
    feedbackPanel.className = `game-feedback-panel show ${opt.isCorrect ? 'correct-bg' : 'incorrect-bg'}`;
    feedbackPanel.innerHTML = `
      <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px;">
        ${opt.isCorrect ? (isZh ? '🎉 恭喜答對！+25 積分' : '🎉 Correct! +25 Points') : (isZh ? '⚠️ 判斷有誤！' : '⚠️ Incorrect Analysis!')}
      </div>
      <div>${isZh ? opt.rationale.zh : opt.rationale.en}</div>
      <button class="btn-nav-step btn-primary-step" style="margin-top: 12px; margin-left: auto;" onclick="nextGameLevel()">
        ${APP_STATE.gameCurrentLevel === 3 ? (isZh ? '查看偵探認證頒獎 🏆' : 'View Award 🏆') : (isZh ? '下一關 ➜' : 'Next Level ➜')}
      </button>
    `;
    feedbackPanel.style.display = 'block';
  }
}

function nextGameLevel() {
  APP_STATE.gameCurrentLevel++;
  renderGameLevel();
}

function renderDetectiveCertificate() {
  const isZh = APP_STATE.lang === 'zh';
  const certDate = document.getElementById('certDate');
  if (certDate) {
    const today = new Date().toISOString().split('T')[0];
    certDate.textContent = today;
  }
  launchConfetti();
}

function launchConfetti() {
  const count = 50;
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-10px';
    confetti.style.width = '8px';
    confetti.style.height = '14px';
    confetti.style.backgroundColor = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)];
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.transition = `all ${2 + Math.random() * 3}s linear`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '105vh';
      confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
    }, 20);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// ==========================================
// 8. 第 3 小時課堂實務作業：4D Filter 檢驗報告
// ==========================================
function initHomeworkForm() {
  const presetSelect = document.getElementById('hwPresetSelect');
  const form = document.getElementById('homeworkForm');
  const btnPrint = document.getElementById('btnPrintHomework');
  const btnExportMd = document.getElementById('btnExportMd');
  const btnExportJson = document.getElementById('btnExportJson');

  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      const presetId = e.target.value;
      if (!presetId) return;
      const p = HOMEWORK_CONFIG.samplePresets.find(s => s.id === presetId);
      if (p) {
        document.getElementById('hwNewsTitle').value = p.newsTitle;
        document.getElementById('hwNewsUrl').value = p.newsUrl;
        document.getElementById('hwNewsDate').value = p.newsDate;
        document.getElementById('hwNewsOutlet').value = p.newsOutlet;
        document.getElementById('hwDataInput').value = p.dataInput;
        document.getElementById('hwDisclosureInput').value = p.disclosureInput;
        document.getElementById('hwDivergenceInput').value = p.divergenceInput;
        document.getElementById('hwDurationInput').value = p.durationInput;
        document.getElementById('hwConclusion').value = p.conclusion;
        document.getElementById('hwDecisionText').value = p.decisionText;
        saveHomeworkToStorage();
      }
    });
  }

  if (form) {
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('input', saveHomeworkToStorage);
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnExportMd) {
    btnExportMd.addEventListener('click', exportHomeworkMarkdown);
  }

  if (btnExportJson) {
    btnExportJson.addEventListener('click', exportHomeworkJson);
  }
}

function saveHomeworkToStorage() {
  const data = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    newsTitle: document.getElementById('hwNewsTitle')?.value || '',
    newsUrl: document.getElementById('hwNewsUrl')?.value || '',
    newsDate: document.getElementById('hwNewsDate')?.value || '',
    newsOutlet: document.getElementById('hwNewsOutlet')?.value || '',
    dataInput: document.getElementById('hwDataInput')?.value || '',
    disclosureInput: document.getElementById('hwDisclosureInput')?.value || '',
    divergenceInput: document.getElementById('hwDivergenceInput')?.value || '',
    durationInput: document.getElementById('hwDurationInput')?.value || '',
    conclusion: document.getElementById('hwConclusion')?.value || 'Mixed',
    decisionText: document.getElementById('hwDecisionText')?.value || ''
  };
  localStorage.setItem('agy_4d_homework', JSON.stringify(data));
  const saveStatus = document.getElementById('hwSaveStatus');
  if (saveStatus) {
    saveStatus.textContent = '✓ 已自動儲存';
    setTimeout(() => { saveStatus.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  const saved = localStorage.getItem('agy_4d_homework');
  if (!saved) return;
  try {
    const d = JSON.parse(saved);
    if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = d.studentName || '';
    if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = d.studentId || '';
    if (document.getElementById('hwNewsTitle')) document.getElementById('hwNewsTitle').value = d.newsTitle || '';
    if (document.getElementById('hwNewsUrl')) document.getElementById('hwNewsUrl').value = d.newsUrl || '';
    if (document.getElementById('hwNewsDate')) document.getElementById('hwNewsDate').value = d.newsDate || '';
    if (document.getElementById('hwNewsOutlet')) document.getElementById('hwNewsOutlet').value = d.newsOutlet || '';
    if (document.getElementById('hwDataInput')) document.getElementById('hwDataInput').value = d.dataInput || '';
    if (document.getElementById('hwDisclosureInput')) document.getElementById('hwDisclosureInput').value = d.disclosureInput || '';
    if (document.getElementById('hwDivergenceInput')) document.getElementById('hwDivergenceInput').value = d.divergenceInput || '';
    if (document.getElementById('hwDurationInput')) document.getElementById('hwDurationInput').value = d.durationInput || '';
    if (document.getElementById('hwConclusion')) document.getElementById('hwConclusion').value = d.conclusion || 'Mixed';
    if (document.getElementById('hwDecisionText')) document.getElementById('hwDecisionText').value = d.decisionText || '';
  } catch (e) {
    console.error('Failed to load homework from storage', e);
  }
}

function exportHomeworkMarkdown() {
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const id = document.getElementById('hwStudentId')?.value || '未填寫';
  const title = document.getElementById('hwNewsTitle')?.value || '';
  const url = document.getElementById('hwNewsUrl')?.value || '';
  const date = document.getElementById('hwNewsDate')?.value || '';
  const outlet = document.getElementById('hwNewsOutlet')?.value || '';
  const data = document.getElementById('hwDataInput')?.value || '';
  const disclosure = document.getElementById('hwDisclosureInput')?.value || '';
  const divergence = document.getElementById('hwDivergenceInput')?.value || '';
  const duration = document.getElementById('hwDurationInput')?.value || '';
  const conclusion = document.getElementById('hwConclusion')?.value || 'Mixed';
  const decision = document.getElementById('hwDecisionText')?.value || '';

  const md = `# 【管理探索二】第一週課堂實務作業：4D Filter 檢驗報告
- **學生姓名**：${name}
- **學號**：${id}
- **查核日期**：${new Date().toISOString().split('T')[0]}

---

### 一、 查核新聞基本資訊
- **新聞標題**：${title}
- **新聞來源 / 媒體**：${outlet}
- **發布日期**：${date}
- **原文連結**：${url}

---

### 二、 4D Filter 四大維度檢驗
#### 1. Data 數據查核 (佔比 30%)
${data}

#### 2. Disclosure 利益揭露 (佔比 20%)
${disclosure}

#### 3. Divergence 多元觀點 (佔比 25%)
${divergence}

#### 4. Duration 時間軸分析 (佔比 25%)
${duration}

---

### 三、 綜合研判與決策建議
- **性質判定**：【${conclusion}】(Signal 真實訊號 / Mixed 混合訊號 / Noise 純情緒雜訊)
- **投資行動與批判反思**：
${decision}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功將 4D Filter 檢驗報告 Markdown 複製至剪貼簿！');
  }).catch(() => {
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `W1_資訊爆炸時代的財經素養_4D檢驗報告_${name}_${id}.md`;
    link.click();
  });
}

function exportHomeworkJson() {
  const saved = localStorage.getItem('agy_4d_homework') || '{}';
  const blob = new Blob([saved], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `W1_資訊爆炸時代的財經素養_4D檢驗報告_${Date.now()}.json`;
  link.click();
}

// ==========================================
// 9. 模態視窗管理 (Modals Controller)
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// ==========================================
// 10. 鍵盤快捷鍵支援
// ==========================================
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key.toLowerCase() === 'd') {
      e.preventDefault();
      document.getElementById('btnToggleDrawing')?.click();
    } else if (e.key.toLowerCase() === 'n') {
      e.preventDefault();
      toggleTeacherNotes();
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleViewMode();
    } else if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}
