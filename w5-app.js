/**
 * 115學年度「管理探索二」第五週互動教學主程式
 * 單元名稱：ETF 狂熱、主動型 ETF 與被動投資
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

  // 1小時活動 (定期定額與費用侵蝕)
  dcaState: {
    monthly: 3000,
    years: 25,
    annualReturn: 8.5,
    expenseRatio: 0.35
  },

  // 2小時活動 (折溢價與造市套利)
  arbState: {
    price: 9.92,
    nav: 10.00
  },

  // 3小時遊戲
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業
  homeworkData: {
    studentName: '',
    studentId: '',
    etfBasics: '',
    healthCheck: '',
    returnComparison: '',
    portfolioPlan: '',
    conclusionGrade: 'Balanced Core-Satellite',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initDcaActivity();
  initArbitrageActivity();
  initEtfGame();
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
  const selectJump = document.getElementById('slideSelectJump');
  if (selectJump) {
    selectJump.addEventListener('change', (e) => jumpToSlide(parseInt(e.target.value, 10)));
  }
}

function populateQuickSelect() {
  const quickSelect = document.getElementById('quickSlideSelect');
  const selectJump = document.getElementById('slideSelectJump');

  if (quickSelect) {
    quickSelect.innerHTML = '';
    W5_SLIDES_DATA.forEach((s, idx) => {
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
      quickSelect.appendChild(opt);
    });
  }

  if (selectJump) {
    selectJump.innerHTML = '';
    W5_SLIDES_DATA.forEach((s, idx) => {
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
      selectJump.appendChild(opt);
    });
  }
}

function renderSlide() {
  const slide = W5_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W5_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W5_SLIDES_DATA.length}`;

  const counter = document.getElementById('deckCurrentCounter');
  if (counter) counter.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W5_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const selectJump = document.getElementById('slideSelectJump');
  if (selectJump) selectJump.value = String(APP_STATE.currentSlideIndex);

  const prevBtn = document.getElementById('btnPrevSlide');
  const nextBtn = document.getElementById('btnNextSlide');
  if (prevBtn) prevBtn.disabled = APP_STATE.currentSlideIndex === 0;
  if (nextBtn) nextBtn.disabled = APP_STATE.currentSlideIndex === W5_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W5_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W5_SLIDES_DATA.length - 1) {
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
          <h4>🔥 全台 ETF 狂熱浪潮：從 0050 到 00940 的全民熱潮</h4>
          <span class="sub-tag">「不要在乾草堆裡找針，買下整座乾草堆！」— John Bogle</span>
        </div>
        <div class="dca-comparison-grid">
          <div class="dca-stat-card">
            <div class="dca-icon">🇹🇼</div>
            <h5>台股 ETF 總規模</h5>
            <div class="dca-num">突破 5.5 兆</div>
            <p>全台超過 1,000 萬投資人持有一檔以上 ETF</p>
          </div>
          <div class="dca-stat-card">
            <div class="dca-icon">📈</div>
            <h5>被動投資全球佔比</h5>
            <div class="dca-num">超越 50%</div>
            <p>美國與全球指數基金規模歷史性超越主動經理人</p>
          </div>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第五週 3 小時學習地圖與核心技能樹</h4>
          <span class="sub-tag">從指數被動哲學到 70/30 核心衛星終身配置</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border-top:4px solid #2563eb; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.85rem;">第 1 小時 ‧ 指數哲學</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">水果便當比喻、Bogle 乾草堆、微笑曲線、0.03% vs 1.8% 費用吞噬。</p>
          </div>
          <div style="background:#f5f3ff; border-top:4px solid #7c3aed; border-radius:8px; padding:10px;">
            <strong style="color:#6d28d9; font-size:0.85rem;">第 2 小時 ‧ 迷思與新制</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">高殖利率幻覺、收益平準金新規、折溢價套利、吃豆腐現象、主動型解禁。</p>
          </div>
          <div style="background:#f0fdf4; border-top:4px solid #059669; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.85rem;">第 3 小時 ‧ 實證與配置</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:6px;">0050 vs 0056 十年對決、選牌4大金律、70/30核心衛星、全球大挑戰。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🍱 什麼是 ETF？(交易所買賣基金的水果便當比喻)</h4>
          <span class="sub-tag">集合一籃子標的 + 盤中像股票一樣即時撮合</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div style="background:#fff7ed; border:1px solid #fdba74; border-radius:8px; padding:12px; text-align:center;">
            <span style="font-size:2rem;">🍈</span>
            <h5 style="margin:4px 0; color:#c2410c;">單買個股 (哈密瓜)</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#ea580c;">單價高、暴雷風險集中</div>
            <p style="font-size:0.75rem; color:#78350f; margin-top:4px;">單買一顆進口哈密瓜要價 500 元，若買到壞果全盤皆輸。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
            <span style="font-size:2rem;">🍱</span>
            <h5 style="margin:4px 0; color:#15803d;">買進 ETF (水果綜合盒)</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#16a34a;">小額分散、吃遍全品項</div>
            <p style="font-size:0.75rem; color:#14532d; margin-top:4px;">100 元綜合盒含蘋果/葡萄/哈密瓜，極小資金享有 50 家龍頭成長。</p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌾 被動投資之父：約翰·柏格 (John Bogle) 與先鋒革命</h4>
          <span class="sub-tag">1976 年首創全球第一檔指數基金 (First Index Investment Trust)</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <div style="font-size:2.4rem; line-height:1;">🏛️</div>
            <div>
              <strong style="color:#0f172a; font-size:0.95rem;">「柏格的愚蠢」到「華爾街救世主」</strong>
              <div style="font-size:0.78rem; color:#64748b;">華爾街曾嘲笑指數基金甘於平庸，如今 Vanguard 管理逾 9 兆美元資產</div>
            </div>
          </div>
          <div style="background:#eff6ff; border-left:4px solid #3b82f6; padding:8px 12px; border-radius:4px; font-size:0.8rem; color:#1e40af;">
            <strong>巴菲特 2014 致股東信盛讚：</strong>「若要立一座雕像紀念為美國投資人貢獻最多的人，首選絕對是約翰·柏格！」
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚔️ 個股 vs 共同基金 vs ETF 三方對決</h4>
          <span class="sub-tag">交易流動性、持股透明度與內扣費用全方位對照</span>
        </div>
        <table class="jargon-table" style="font-size:0.75rem;">
          <thead>
            <tr><th>比較維度</th><th>個股 (Single Stock)</th><th>共同基金 (Mutual Fund)</th><th>指數型 ETF (ETF)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>交易方式</strong></td><td>盤中即時撮合</td><td>營業日收盤單一淨值</td><td><strong>盤中即時撮合</strong></td></tr>
            <tr><td><strong>經理費用</strong></td><td>無 (0%)</td><td>高昂 (1.5% ~ 2.5%)</td><td><strong>極低 (0.03% ~ 0.4%)</strong></td></tr>
            <tr><td><strong>持股透明度</strong></td><td>即時知曉</td><td>每月/季末落後揭露</td><td><strong>每日完全公開 (100%)</strong></td></tr>
            <tr><td><strong>非系統風險</strong></td><td>極高 (單一暴雷)</td><td>中等 (經理人偏好)</td><td><strong>極低 (數十檔分散)</strong></td></tr>
          </tbody>
        </table>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 實證數據：台灣 ETF 規模突破 5 兆元大關</h4>
          <span class="sub-tag">全民搶購 00940 創下單檔募集 1,752 億元歷史天量</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; text-align:center;">
            <div style="font-size:0.8rem; color:#065f46; font-weight:700;">台股 ETF 掛牌檔數</div>
            <div style="font-size:1.6rem; font-weight:900; color:#059669; margin:4px 0;">超過 250+ 檔</div>
            <div style="font-size:0.75rem; color:#047857;">從市值型、高股息到美債與槓反全覆蓋</div>
          </div>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px; text-align:center;">
            <div style="font-size:0.8rem; color:#1e40af; font-weight:700;">大一新鮮人開戶滲透</div>
            <div style="font-size:1.6rem; font-weight:900; color:#2563eb; margin:4px 0;">30 歲以下佔 42%</div>
            <div style="font-size:0.75rem; color:#1d4ed8;">年輕世代透過零股定期定額全面進入市場</div>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚙️ 追蹤指數機制：成分股如何選出？</h4>
          <span class="sub-tag">市值加權 (Market-Cap) vs 股息殖利率加權 (Dividend-Yield)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border-left:4px solid #2563eb; padding:10px; border-radius:4px;">
            <strong style="color:#1e40af; font-size:0.85rem;">🏢 市值加權 (0050 / SPY / VOO)</strong>
            <p style="font-size:0.76rem; color:#334155; margin-top:4px;">「強者愈強，優勝劣汰」！市值愈大佔比愈高。自然淘汰衰退公司，吸納新興龍頭。</p>
          </div>
          <div style="background:#f8fafc; border-left:4px solid #d97706; padding:10px; border-radius:4px;">
            <strong style="color:#b45309; font-size:0.85rem;">💰 股息加權 (0056 / 00878 / 00919)</strong>
            <p style="font-size:0.76rem; color:#334155; margin-top:4px;">依預估或歷史殖利率高低挑選。偏重成熟現金流產業 (金融、傳產、成熟電子代工)。</p>
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 定期定額 (DCA) 微笑曲線的數學威力</h4>
          <span class="sub-tag">跌市不恐慌 ‧ 下跌段自動買進更多廉價單位數</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; text-align:center;">
          <svg viewBox="0 0 300 90" style="width:100%; height:75px;">
            <path d="M 20,20 Q 150,85 280,20" fill="none" stroke="#059669" stroke-width="4" />
            <circle cx="20" cy="20" r="5" fill="#2563eb" />
            <circle cx="85" cy="52" r="6" fill="#f59e0b" />
            <circle cx="150" cy="70" r="8" fill="#dc2626" />
            <circle cx="215" cy="52" r="6" fill="#f59e0b" />
            <circle cx="280" cy="20" r="5" fill="#059669" />
            <text x="150" y="86" text-anchor="middle" font-size="9" fill="#1e293b" font-weight="700">底部累積巨額低成本籌碼</text>
          </svg>
          <div style="font-size:0.75rem; color:#166534; font-weight:700; margin-top:2px;">
            定額紀律：高檔買少股、低檔買多股，反彈時平均成本遠低於市場高點！
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🩸 總費用率 (Expense Ratio) 對複利的致命吞噬</h4>
          <span class="sub-tag">每月看似微不足道的 1%~2%，30 年後吃掉你數百萬退休金！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#15803d; font-size:0.85rem;">低費率 ETF (0.03% ~ 0.35%)</strong>
            <div style="font-size:1.3rem; font-weight:900; color:#16a34a; margin:4px 0;">保留 95%+ 獲利</div>
            <p style="font-size:0.74rem; color:#14532d;">全額留在帳戶滾動複利雪球</p>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#b91c1c; font-size:0.85rem;">高費率主動基金 (1.8% ~ 2.5%)</strong>
            <div style="font-size:1.3rem; font-weight:900; color:#dc2626; margin:4px 0;">侵蝕 30%~40% 總財富</div>
            <p style="font-size:0.74rem; color:#7f1d1d;">不論賺賠每天無情扣款！</p>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🎉 第一小時課程里程碑達成</div>
        <h4>定期定額與微笑曲線試算盤！</h4>
        <p>已掌握 ETF 水果便當本質、Bogle 乾草堆指數革命與費用率殺傷力。現在，啟動試算盤，親眼見證 25 年複利奇蹟！</p>
        <div class="milestone-actions">
          <button class="btn-launch-lab btn-h1" onclick="openModal('modalDcaCalc')">
            <span>🎯</span> 啟動「定期定額與費用率試算盤」
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🪤 高股息 ETF 狂潮真相：高殖利率 (Yield) ≠ 高報酬率</h4>
          <span class="sub-tag">配息是「左手換右手」：若未填息，本金實質倒貼！</span>
        </div>
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:800; color:#9f1239; margin-bottom:6px;">除息機制運作實例：</div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; background:#fff; padding:8px; border-radius:6px; margin-bottom:6px;">
            <span>除息前股價: <strong>$20.00</strong></span>
            <span>領取股利: <strong style="color:#059669;">+$1.00</strong></span>
            <span>除息開盤價: <strong style="color:#e11d48;">$19.00</strong></span>
          </div>
          <p style="font-size:0.75rem; color:#881337; margin:0;">淨資產總值完全不變 ($19+$1 = $20)！還需申報健保補充保費與個人所得稅！</p>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 收益平準金 (Equalization Fund) 機制與金管會新規</h4>
          <span class="sub-tag">防稀釋工具，但不是投信額外給的「免費利息」！</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="font-size:0.82rem; color:#1e293b; line-height:1.5; margin-bottom:8px;">
            <strong>原理：</strong>舊股東權益不因大量新申購資金湧入而被稀釋，新申購款依比例提撥入平準金帳戶。
          </div>
          <div style="background:#eff6ff; border-left:4px solid #3b82f6; padding:8px 12px; font-size:0.78rem; color:#1e40af;">
            <strong>金管會四大揭露原則：</strong>不得以平準金為主要配息訴求、配息公告必須標明「平準金比率」、訂定配息上限。
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ ETF 雙重價格：市價 (Market Price) vs 淨值 (NAV)</h4>
          <span class="sub-tag">散戶撮合價 vs 投信成分股實質資產真實價值</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#1d4ed8; font-size:0.85rem;">次級市場市價 (Market Price)</strong>
            <p style="font-size:0.75rem; color:#1e3a8a; margin-top:4px;">投資人在集中市場買賣搓合價，受盤中買賣雙方情緒與供需影響。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#15803d; font-size:0.85rem;">初級市場淨值 (NAV)</strong>
            <p style="font-size:0.75rem; color:#14532d; margin-top:4px;">ETF 所持有一籃子股票總市值除以發行總股數，每 15 秒更新 iNAV。</p>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔄 折溢價套利機制 (Arbitrage Mechanism)</h4>
          <span class="sub-tag">流動性提供者 (造市商 PD) 如何無風險抹平價格裂口</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="arbitrage-card premium" style="padding:10px;">
            <h5 style="color:#dc2626; font-size:0.9rem;">溢價 (Premium) 市價 > 淨值</h5>
            <p style="font-size:0.75rem; color:#7f1d1d; margin-top:4px;">散戶追價買貴了！造市商在初級市場申購新份額，於次級市場拋售，拉回市價。</p>
          </div>
          <div class="arbitrage-card discount" style="padding:10px;">
            <h5 style="color:#166534; font-size:0.9rem;">折價 (Discount) 市價 < 淨值</h5>
            <p style="font-size:0.75rem; color:#14532d; margin-top:4px;">打折超便宜！造市商在次級市場低價買進，向投信贖回淨值，推升市價。</p>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🥢 指數替換效應：成分股吃豆腐現象 (Front-Running)</h4>
          <span class="sub-tag">千億級 ETF 定期換股公告，成為主力法人的獵物</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; font-weight:700; color:#92400e; margin-bottom:8px;">
            <span>1. 預測成分股卡位</span> ➔
            <span>2. ETF 被動強制高價敲進</span> ➔
            <span>3. 主力高檔倒貨獲利</span>
          </div>
          <p style="font-size:0.74rem; color:#78350f; margin:0; line-height:1.4;">
            巨型 ETF 換股透明度過高，市場提前抬轎（吃豆腐），等 ETF 基金經理人建倉完畢後股價隨即重挫，散戶淪為最後接盤韭菜！
          </p>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 政策解禁：主動型 ETF (Active ETFs) 正式登台</h4>
          <span class="sub-tag">金管會開放投信發行主動型股票與債券 ETF</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="font-size:0.82rem; color:#1e293b; line-height:1.5; margin-bottom:8px;">
            <strong>突破點：</strong>不再死板複製指數！由基金經理人全權操盤主動選股，追求超越大盤的 Alpha 超額報酬。
          </div>
          <div style="background:#eff6ff; border-left:4px solid #2563eb; padding:8px 12px; font-size:0.78rem; color:#1e40af;">
            <strong>全透明 vs 半透明：</strong>台灣規範每日需全數揭露投資組合持股，杜絕傳統基金盲盒弊病。
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚔️ 主動型 ETF vs 被動型 ETF 核心架構對比</h4>
          <span class="sub-tag">超額報酬夢想 vs 低成本市場 Beta 的終極抉擇</span>
        </div>
        <table class="jargon-table" style="font-size:0.74rem;">
          <thead>
            <tr><th>比較維度</th><th>被動指數型 (0050 / VOO)</th><th>主動型 ETF (Active ETF)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>投資目標</strong></td><td>複製追蹤指數表現 (Beta)</td><td>超越基準指數 (追求 Alpha)</td></tr>
            <tr><td><strong>選股決策</strong></td><td>指數規則委員會自動調整</td><td>明星基金經理人主觀判斷</td></tr>
            <tr><td><strong>總費用率</strong></td><td>極低 (0.03% ~ 0.4%)</td><td>中高 (0.6% ~ 1.2%)</td></tr>
            <tr><td><strong>長期實證</strong></td><td>15 年戰勝 85%+ 主動型</td><td>僅少數經理人能持續超額獲利</td></tr>
          </tbody>
        </table>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 主題式 ETF (Thematic ETFs) 的熱潮與泡沫警訊</h4>
          <span class="sub-tag">AI、半導體、電動車、元宇宙——概念狂熱通常是高點！</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:800; color:#991b1b; margin-bottom:6px;">主題式 ETF 的三階段宿命：</div>
          <div style="font-size:0.76rem; color:#7f1d1d; line-height:1.5;">
            <strong>1. 狂熱發行：</strong>投信在題材最熱門頂點高調募集吸金。<br>
            <strong>2. 集中暴跌：</strong>成分股重疊度極高，風頭一過慘遭腰斬回撤 50%+ (如女股神 ARK)。<br>
            <strong>3. 流動性枯竭：</strong>人氣退散，最終黯然清算下市。
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏦 債券型 ETF (Bond ETFs) 的資產配置角色與送分題迷思</h4>
          <span class="sub-tag">存續期間 (Duration) 槓桿效應與匯率避險成本陷阱</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border-left:4px solid #10b981; padding:10px; border-radius:4px;">
            <strong style="color:#065f46; font-size:0.85rem;">🛡️ 長線配置功能</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px;">股債負相關配置！在經濟衰退股市重挫時提供穩定現金息收與資本利得保護。</p>
          </div>
          <div style="background:#f8fafc; border-left:4px solid #ef4444; padding:10px; border-radius:4px;">
            <strong style="color:#991b1b; font-size:0.85rem;">⚠️ 降息送分題迷思</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px;">20年美債存續期高達 17 年！長天期美債波動堪比股票，若遇台幣升值息收恐被匯損全數抹煞！</p>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🎉 第二小時課程里程碑達成</div>
        <h4>ETF 折溢價與套利檢測器！</h4>
        <p>已識破高股息平準金迷思、折溢價造市商套利與主動型 ETF 運作。現在，開啟套利檢測器，即時診斷市價與淨值偏離！</p>
        <div class="milestone-actions">
          <button class="btn-launch-lab btn-h2" onclick="openModal('modalArbitrage')">
            <span>🎯</span> 啟動「ETF 折溢價檢測器」
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧭 大一 ETF 選牌 4 大指標 (防坑金律)</h4>
          <span class="sub-tag">拒絕跟風網紅！用這四項指標過濾 90% 地雷標的</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border-left:3px solid #2563eb; padding:8px 10px; font-size:0.78rem;">
            <strong>1. 資產規模：</strong>> 100 億元 (規模太小有清算下市風險)
          </div>
          <div style="background:#f8fafc; border-left:3px solid #10b981; padding:8px 10px; font-size:0.78rem;">
            <strong>2. 流動性成交量：</strong>日均量 > 1 萬張 (滑價小、隨買隨賣)
          </div>
          <div style="background:#f8fafc; border-left:3px solid #f59e0b; padding:8px 10px; font-size:0.78rem;">
            <strong>3. 總費用率：</strong>< 0.4% (長期複利不被內扣吃掉)
          </div>
          <div style="background:#f8fafc; border-left:3px solid #8b5cf6; padding:8px 10px; font-size:0.78rem;">
            <strong>4. 追蹤偏離度：</strong>貼合指數 (折溢價長期控制在 ±0.3% 內)
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📉 追蹤偏離度 (Tracking Error) 與追蹤差距</h4>
          <span class="sub-tag">為什麼 ETF 的漲幅永遠比它追蹤的標的指數「少一點」？</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="font-size:0.85rem; font-weight:800; color:#1e293b; margin-bottom:6px;">造成追蹤差距的三大摩擦成本：</div>
          <ul style="font-size:0.78rem; color:#475569; margin:0; padding-left:18px; line-height:1.5;">
            <li><strong>每日經理費與保管費扣除：</strong>直接反映在每日淨值計算中。</li>
            <li><strong>成分股調整轉倉交易成本：</strong>買賣手續費與證券交易稅。</li>
            <li><strong>現金拖累 (Cash Drag)：</strong>帳戶保留少許現金應付申贖，未 100% 參與市場漲幅。</li>
          </ul>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏆 實證比對：市值型 0050 vs 高股息 0056 十年報酬對決</h4>
          <span class="sub-tag">長線複利終極答案：追求資本成長遠勝單純領息！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
            <strong style="color:#15803d; font-size:0.9rem;">0050 市值型 (含息總報酬)</strong>
            <div style="font-size:1.6rem; font-weight:900; color:#16a34a; margin:4px 0;">+285%</div>
            <p style="font-size:0.75rem; color:#14532d;">年化報酬約 11.5%，充分享受台積電爆發成長</p>
          </div>
          <div style="background:#fef3c7; border:1px solid #fde68a; border-radius:8px; padding:12px; text-align:center;">
            <strong style="color:#92400e; font-size:0.9rem;">0056 高股息 (含息總報酬)</strong>
            <div style="font-size:1.6rem; font-weight:900; color:#d97706; margin:4px 0;">+145%</div>
            <p style="font-size:0.75rem; color:#78350f;">年化報酬約 7.2%，高配息犧牲了長線資本增值</p>
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔍 官方第一手資料庫：TWSE 基本市況與投信公會</h4>
          <span class="sub-tag">遠離網紅業配！掌握審計級官方數據查核路徑</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:8px; padding:10px;">
            <strong style="color:#1e40af; font-size:0.82rem;">🏛️ TWSE MIS 基本市況報導</strong>
            <p style="font-size:0.74rem; color:#334155; margin-top:4px;">盤中即時揭露各檔 ETF 之預估即時淨值 (iNAV) 與折溢價率，買進前必查防挨宰。</p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#166534; font-size:0.82rem;">📈 投信投顧公會 (SITCA)</strong>
            <p style="font-size:0.74rem; color:#334155; margin-top:4px;">法定每月公告各檔 ETF 之「真實總費用率」(含所有隱性內扣成本)。</p>
          </div>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 經典 70/30 核心與衛星策略 (Core-Satellite)</h4>
          <span class="sub-tag">兼具大盤穩健複利與戰術靈活性的終生投資組合</span>
        </div>
        <div class="core-satellite-vis">
          <div class="core-circle-box">
            <div class="pct">70%</div>
            <h5>核心資產 (Core)</h5>
            <p>全市場市值型 ETF (如 0050 / VOO / VT)<br>堅持 Buy & Hold，享受經濟長線紅利</p>
          </div>
          <div class="satellite-list">
            <div class="satellite-item"><span>🚀 科技/半導體</span><span>10%</span></div>
            <div class="satellite-item"><span>💰 高股息現金流</span><span>10%</span></div>
            <div class="satellite-item"><span>🛡️ 美債/防禦配置</span><span>10%</span></div>
          </div>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌍 美股 ETF 入門：VOO、QQQ、VT 全球資產配置</h4>
          <span class="sub-tag">以極致低成本參與全球最頂尖企業的生產力</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#0f172a; font-size:0.85rem;">VOO (S&P 500)</strong>
            <div style="font-size:0.78rem; color:#059669; font-weight:800; margin:2px 0;">費率 0.03%</div>
            <p style="font-size:0.72rem; color:#64748b;">美國 500 大巨頭巴菲特終身推薦</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#0f172a; font-size:0.85rem;">QQQ (Nasdaq 100)</strong>
            <div style="font-size:0.78rem; color:#2563eb; font-weight:800; margin:2px 0;">費率 0.20%</div>
            <p style="font-size:0.72rem; color:#64748b;">全球最強科技 AI 創新龍頭引擎</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#0f172a; font-size:0.85rem;">VT (全球全市場)</strong>
            <div style="font-size:0.78rem; color:#7c3aed; font-weight:800; margin:2px 0;">費率 0.07%</div>
            <p style="font-size:0.72rem; color:#64748b;">持有全球 9,000+ 家企業真被動</p>
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🪢 避免假性分散：持有多檔重覆成分股的投資盲點</h4>
          <span class="sub-tag">買了一堆 ETF，以為很分散，其實全都在重押台積電！</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:12px;">
          <div style="font-size:0.82rem; font-weight:800; color:#991b1b; margin-bottom:6px;">重疊陷阱：0050 + 0052 + 006208 + 00922</div>
          <p style="font-size:0.75rem; color:#7f1d1d; margin:0; line-height:1.4;">
            同時持有 4 檔 ETF，台積電聯發科加總權重超過 60%！不僅沒有分散非系統風險，每年還白繳四份管理費與保管費！
          </p>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 大一新鮮人 ETF 理性投資 4 大金律</h4>
          <span class="sub-tag">確立一生的財富紀律，拒絕在金融市場當韭菜</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f0fdf4; border-left:3px solid #10b981; padding:8px 10px; font-size:0.78rem;">
            <strong>1. 專注總報酬：</strong>不被殖利率迷惑，重視資產總值增長
          </div>
          <div style="background:#eff6ff; border-left:3px solid #3b82f6; padding:8px 10px; font-size:0.78rem;">
            <strong>2. 堅持股利再投資：</strong>DRIP 複利飛輪，不要把股息吃掉
          </div>
          <div style="background:#fffbeb; border-left:3px solid #f59e0b; padding:8px 10px; font-size:0.78rem;">
            <strong>3. 絕不碰槓桿反向：</strong>正2反1有致命複利扣損，只適合當日避險
          </div>
          <div style="background:#fdf2f8; border-left:3px solid #ec4899; padding:8px 10px; font-size:0.78rem;">
            <strong>4. 克服 FOMO 盲從：</strong>絕不解定存、不借信貸搶購新募 ETF
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧭 第五週全景知識體系圖與觀念整合</h4>
          <span class="sub-tag">五大核心支柱 ‧ 建立終生堅不可摧的被動投資防線</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; text-align:center;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">🍱</div>
            <strong style="font-size:0.76rem; color:#0f172a;">水果便當</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">一籃子分散</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">📉</div>
            <strong style="font-size:0.76rem; color:#0f172a;">微笑曲線</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">定期定額</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">⚖️</div>
            <strong style="font-size:0.76rem; color:#0f172a;">折溢價</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">造市商套利</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">🩸</div>
            <strong style="font-size:0.76rem; color:#0f172a;">費用侵蝕</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">拒絕高內扣</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <div style="font-size:1.2rem;">🏰</div>
            <strong style="font-size:0.76rem; color:#0f172a;">70/30 配置</strong>
            <div style="font-size:0.68rem; color:#64748b; margin-top:2px;">核心與衛星</div>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card milestone-card">
        <div class="milestone-badge">🏆 第五週課程總結里程碑</div>
        <h4>第三小時：ETF 投資專家大挑戰與實務作業！</h4>
        <p>恭喜完成 30 頁完整課程！現在進行最後的 ETF 投資專家大挑戰小遊戲，並填寫自選 ETF 核心衛星配置報告！</p>
        <div class="milestone-actions" style="display:flex; gap:10px;">
          <button class="btn-launch-lab btn-h3" onclick="openModal('modalEtfGame')">
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

  W5_SLIDES_DATA.forEach((slide, idx) => {
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
  link.download = `W5-Annotation-Slide${APP_STATE.currentSlideIndex + 1}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// 1小時活動：定期定額試算
function initDcaActivity() {
  const monthlyIn = document.getElementById('dcaMonthlyInput');
  const yearsIn = document.getElementById('dcaYearsInput');
  const returnIn = document.getElementById('dcaReturnInput');
  const expenseIn = document.getElementById('dcaExpenseInput');

  function calculateDca() {
    const monthly = parseFloat(monthlyIn?.value || 3000);
    const years = parseFloat(yearsIn?.value || 25);
    const grossR = parseFloat(returnIn?.value || 8.5) / 100;
    const expenseR = parseFloat(expenseIn?.value || 0.35) / 100;

    const netR = Math.max(0, grossR - expenseR);
    const months = years * 12;
    const principal = monthly * months;

    // Gross Future Value (0 expense)
    const monthlyGrossR = grossR / 12;
    let fvGross = 0;
    if (monthlyGrossR > 0) {
      fvGross = monthly * ((Math.pow(1 + monthlyGrossR, months) - 1) / monthlyGrossR) * (1 + monthlyGrossR);
    } else {
      fvGross = principal;
    }

    // Net Future Value
    const monthlyNetR = netR / 12;
    let fvNet = 0;
    if (monthlyNetR > 0) {
      fvNet = monthly * ((Math.pow(1 + monthlyNetR, months) - 1) / monthlyNetR) * (1 + monthlyNetR);
    } else {
      fvNet = principal;
    }

    const profit = Math.max(0, fvNet - principal);
    const feeLoss = Math.max(0, fvGross - fvNet);

    const princEl = document.getElementById('dcaPrincipalResult');
    if (princEl) princEl.textContent = `$${Math.round(principal).toLocaleString()} 元`;

    const profitEl = document.getElementById('dcaProfitResult');
    if (profitEl) profitEl.textContent = `+$${Math.round(profit).toLocaleString()} 元`;

    const finalEl = document.getElementById('dcaFinalResult');
    if (finalEl) finalEl.textContent = `$${Math.round(fvNet).toLocaleString()} 元`;

    const feeLossEl = document.getElementById('dcaFeeLossResult');
    if (feeLossEl) feeLossEl.textContent = `-$${Math.round(feeLoss).toLocaleString()} 元`;
  }

  [monthlyIn, yearsIn, returnIn, expenseIn].forEach(input => {
    input?.addEventListener('input', calculateDca);
  });

  document.querySelectorAll('.dca-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.dca-preset-btn').forEach(b => b.classList.remove('active'));
      const presetKey = e.currentTarget.getAttribute('data-preset');
      e.currentTarget.classList.add('active');

      const preset = W5_DCA_PRESETS.find(p => p.id === presetKey);
      if (preset) {
        if (monthlyIn) monthlyIn.value = preset.monthlyAmount;
        if (yearsIn) yearsIn.value = preset.years;
        if (returnIn) returnIn.value = preset.annualReturn;
        if (expenseIn) expenseIn.value = preset.expenseRatio;
        calculateDca();
      }
    });
  });

  calculateDca();
}

// 2小時活動：折溢價套利檢測
function initArbitrageActivity() {
  const priceIn = document.getElementById('arbPriceInput');
  const navIn = document.getElementById('arbNavInput');

  function calculateArbitrage() {
    const price = parseFloat(priceIn?.value || 9.92);
    const nav = parseFloat(navIn?.value || 10.00);

    if (nav <= 0) return;
    const rate = ((price - nav) / nav) * 100;

    const rateEl = document.getElementById('arbRateResult');
    if (rateEl) {
      rateEl.textContent = `${rate >= 0 ? '+' : ''}${rate.toFixed(2)}%`;
      rateEl.style.color = rate > 0.3 ? '#dc2626' : (rate < -0.3 ? '#16a34a' : '#2563eb');
    }

    const badgeEl = document.getElementById('arbStatusBadge');
    const explainEl = document.getElementById('arbExplainResult');

    if (rate > 1.0) {
      if (badgeEl) badgeEl.innerHTML = `<span class="badge-alert red">嚴重溢價 (Premium Alert)</span>`;
      if (explainEl) explainEl.innerHTML = `<strong>嚴重溢價！</strong>市價高於淨值超過 1%！散戶追價買貴了。造市商將大量在初級市場申購新單位並於次級市場拋售套利，市價必然會向下收斂回歸淨值，切勿盲目追高！`;
    } else if (rate < -1.0) {
      if (badgeEl) badgeEl.innerHTML = `<span class="badge-alert green">折價折扣 (Discount Bargain)</span>`;
      if (explainEl) explainEl.innerHTML = `<strong>折價機會！</strong>市價低於淨值超過 1%！市場出現非理性拋售，次級市場能以低於成分股真實價值的折扣買進，造市商買進市價並向投信申請贖回淨值無風險套利！`;
    } else {
      if (badgeEl) badgeEl.innerHTML = `<span class="badge-alert blue">正常合理區間 (Fair Range)</span>`;
      if (explainEl) explainEl.innerHTML = `<strong>正常造市區間！</strong>折溢價幅度處於 ±0.3%~1.0% 合理範圍內，代表市場流動性健康、造市商積極報價，投資人交易滑價成本低。`;
    }
  }

  [priceIn, navIn].forEach(input => input?.addEventListener('input', calculateArbitrage));

  document.querySelectorAll('.arb-case-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.arb-case-btn').forEach(b => b.classList.remove('active'));
      const caseIdx = parseInt(e.currentTarget.getAttribute('data-case'), 10);
      e.currentTarget.classList.add('active');

      const c = W5_ARBITRAGE_CASES[caseIdx];
      if (c) {
        if (priceIn) priceIn.value = c.marketPrice;
        if (navIn) navIn.value = c.navPrice;
        calculateArbitrage();
      }
    });
  });

  calculateArbitrage();
}

// 3小時活動：ETF 小遊戲
function initEtfGame() {
  renderEtfGameLevel();
}

function renderEtfGameLevel() {
  const container = document.getElementById('etfGameLevelContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W5_GAME_QUESTIONS.length) {
    // Game completed certificate
    container.innerHTML = `
      <div style="text-align:center; padding:30px 20px; background:#f0fdf4; border:2px solid #86efac; border-radius:12px;">
        <div style="font-size:3rem; margin-bottom:10px;">🏆</div>
        <h3 style="color:#166534; font-size:1.4rem; margin-bottom:8px;">恭喜榮獲「ETF 指數被動投資大師」證書！</h3>
        <p style="color:#15803d; font-size:0.95rem; margin-bottom:16px;">
          你在 4 大投資關卡中展現了深厚的被動投資底蘊，識破高股息收益平準金迷思，精通次級市場折溢價套利！
        </p>
        <div style="font-size:1.1rem; font-weight:800; color:#14532d; margin-bottom:20px;">
          最終挑戰得分：${APP_STATE.gameScore} / 100 分
        </div>
        <button class="btn-nav-step btn-primary-step" onclick="restartEtfGame()">重新挑戰</button>
      </div>
    `;
    return;
  }

  const q = W5_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
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
        <button class="btn-quiz-option" onclick="handleEtfGameAnswer(${idx})" style="text-align:left; padding:12px 16px; border:1px solid #cbd5e1; border-radius:8px; background:#fff; cursor:pointer; font-size:0.85rem; line-height:1.5;">
          ${opt.text}
        </button>
      `).join('')}
    </div>
    <div id="etfGameFeedback" style="margin-top:14px; display:none;"></div>
  `;
}

window.handleEtfGameAnswer = function(optIdx) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W5_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const chosen = q.options[optIdx];
  const feedbackEl = document.getElementById('etfGameFeedback');

  if (chosen.isCorrect) {
    APP_STATE.gameScore += 25;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="padding:12px; border-radius:8px; background:#f0fdf4; border:1px solid #86efac; color:#166534; font-size:0.88rem;">
          ${chosen.feedback}
          <div style="margin-top:10px;">
            <button class="btn-nav-step btn-primary-step" onclick="nextEtfGameLevel()">前進下一關 ➔</button>
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
            <button class="btn-nav-step" onclick="nextEtfGameLevel()">跳過此題，繼續挑戰 ➔</button>
          </div>
        </div>
      `;
    }
  }
};

window.nextEtfGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderEtfGameLevel();
};

window.restartEtfGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderEtfGameLevel();
};

// 課堂實務作業系統
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwEtfBasics', 'hwHealthCheck', 'hwReturnComparison', 'hwPortfolioPlan', 'hwConclusionGrade', 'hwDecisionSummary'];

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
    etfBasics: document.getElementById('hwEtfBasics')?.value || '',
    healthCheck: document.getElementById('hwHealthCheck')?.value || '',
    returnComparison: document.getElementById('hwReturnComparison')?.value || '',
    portfolioPlan: document.getElementById('hwPortfolioPlan')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'Balanced Core-Satellite',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  localStorage.setItem('w5_homework_draft', JSON.stringify(data));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '已自動儲存草稿';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  const saved = localStorage.getItem('w5_homework_draft');
  if (!saved) return;
  try {
    const d = JSON.parse(saved);
    if (d.studentName) document.getElementById('hwStudentName').value = d.studentName;
    if (d.studentId) document.getElementById('hwStudentId').value = d.studentId;
    if (d.etfBasics) document.getElementById('hwEtfBasics').value = d.etfBasics;
    if (d.healthCheck) document.getElementById('hwHealthCheck').value = d.healthCheck;
    if (d.returnComparison) document.getElementById('hwReturnComparison').value = d.returnComparison;
    if (d.portfolioPlan) document.getElementById('hwPortfolioPlan').value = d.portfolioPlan;
    if (d.conclusionGrade) document.getElementById('hwConclusionGrade').value = d.conclusionGrade;
    if (d.decisionSummary) document.getElementById('hwDecisionSummary').value = d.decisionSummary;
  } catch (e) {
    console.warn(e);
  }
}

function loadHomeworkTemplate() {
  document.getElementById('hwStudentName').value = '張雅婷';
  document.getElementById('hwStudentId').value = 'B11307099';
  document.getElementById('hwEtfBasics').value = '挑選元大台灣50 (0050) 與國泰永續高股息 (00878)。0050 追蹤台灣50指數，採市值加權，前三大成分股為台積電 (53%)、聯發科 (4.8%)、鴻海 (4.5%)，代表台灣整體競爭力。00878 追蹤MSCI台灣ESG永續高股息精選30指數，採殖利率加權，成分股分散於聯發科、聯詠、大聯大等成熟穩健電子與金融股。';
  document.getElementById('hwHealthCheck').value = '查閱 TWSE 與 SITCA 官方數據：0050 總費用率為 0.43%，折溢價長期維持在 ±0.15% 內，流動性極佳；00878 總費用率為 0.38%，配息來源中股利所得佔 62%、資本利得佔 28%、收益平準金佔 10%，符合金管會規範，折溢價穩定於 +0.2% 正常造市區間。';
  document.getElementById('hwReturnComparison').value = '過去 10 年實證顯示，0050 含息總報酬累積達 +285%，而高股息 0056 含息總報酬為 +145%，年化差距逾 4%！這證明年輕大一族群若將資金過度偏重高股息，每次配息又未確實再投資，將嚴重犧牲資本利得與企業成長複利。含息總報酬才是衡量財富積累的唯一真理。';
  document.getElementById('hwPortfolioPlan').value = '以每月 6,000 元打工預算建立 70/30 核心衛星配置：70% (4,200元) 定期定額投入 0050，徹底享受台灣頂尖龍頭的長期經濟生產力；30% (1,800元) 投入 00878 創造穩定心理防線與被動現金流。嚴格執行 DRIP 股利再投資，絕不解定存或融資追買新募集熱門 ETF！';
  document.getElementById('hwConclusionGrade').value = 'Balanced Core-Satellite';
  document.getElementById('hwDecisionSummary').value = '以 70% 0050 市值型為核心、30% 高股息為衛星，堅持低費用與股利再投資複利飛輪！';
  saveHomeworkToLocal();
}

function exportHomeworkJson() {
  const saved = localStorage.getItem('w5_homework_draft') || '{}';
  const blob = new Blob([saved], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W5_Homework_${document.getElementById('hwStudentId')?.value || 'Draft'}.json`;
  a.click();
}

function exportHomeworkMd() {
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const id = document.getElementById('hwStudentId')?.value || '未填寫';
  const basics = document.getElementById('hwEtfBasics')?.value || '';
  const health = document.getElementById('hwHealthCheck')?.value || '';
  const comparison = document.getElementById('hwReturnComparison')?.value || '';
  const plan = document.getElementById('hwPortfolioPlan')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第五週課堂實務作業：自選 ETF 深度分析與核心衛星配置報告

- **學生姓名**：${name}
- **學號**：${id}
- **評審評級**：${grade}
- **核心決策反思**：${summary}

---

### 1. 自選 ETF 基本盤與指數追蹤規則 (25%)
${basics}

### 2. 費用率、折溢價與平準金體檢 (25%)
${health}

### 3. 市值型 vs 高股息 10年報酬反思 (25%)
${comparison}

### 4. 個人 70/30 核心衛星配置具體計畫 (25%)
${plan}
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
