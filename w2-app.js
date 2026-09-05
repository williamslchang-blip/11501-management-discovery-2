/**
 * 第二週 課程導論：物價、通膨與實質購買力
 * 互動教學主程式 (Canva 風格簡報引擎、手繪筆刷、雙語切換、主題圖表與 4 大互動模態窗)
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

  // 1小時活動 (實質購買力計算盤)
  ppState: {
    income: 35000,
    wageGrowth: 3.0,
    foodShare: 40,
    foodInflation: 8.5,
    housingShare: 35,
    housingInflation: 7.0,
    otherShare: 25,
    otherInflation: 4.0
  },

  // 2小時活動 (縮性通膨偵探)
  shrinkState: {
    activeCase: 0,
    customOldWeight: 85,
    customNewWeight: 70,
    customOldPrice: 35,
    customNewPrice: 35
  },

  // 3小時遊戲 (物價與通膨真相大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業
  homeworkData: {
    studentName: '',
    studentId: '',
    cpiAnalysis: '',
    shrinkCase: '',
    fisherExercise: '',
    assetPlan: '',
    conclusionGrade: 'Moderate Risk',
    decisionSummary: ''
  }
};

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initPurchasingPowerActivity();
  initShrinkflationActivity();
  initDetectiveGame();
  initHomeworkForm();
  initKeyboardShortcuts();
  loadSavedHomework();
  renderSlide();
});

// ==========================================
// 1. 簡報投影片主引擎 (Deck Engine)
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

function renderSlide() {
  const slide = W2_SLIDES_DATA[APP_STATE.currentSlideIndex];
  if (!slide) return;

  const isZh = APP_STATE.lang === 'zh';

  // 舞台卡片樣式切換
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
    catBadge.textContent = isZh ? slide.category : slide.categoryEn;
  }

  // 標題與副標題
  const titleEl = document.getElementById('slideTitle');
  if (titleEl) titleEl.textContent = isZh ? slide.title : slide.titleEn;

  const subtitleEl = document.getElementById('slideSubtitle');
  if (subtitleEl) subtitleEl.textContent = isZh ? slide.subtitle : slide.subtitleEn;

  // 渲染視覺圖表
  renderSlideVisual(slide);

  // 渲染核心速記清單 (Takeaways)
  const takeawaysList = document.getElementById('slideTakeawaysList');
  if (takeawaysList) {
    const list = isZh ? slide.quickTakeaways : slide.quickTakeawaysEn;
    takeawaysList.innerHTML = list.map(t => `
      <li>
        <span class="dot">✦</span>
        <span>${t}</span>
      </li>
    `).join('');
  }

  // 渲染課堂提問小卡
  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) {
    guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;
  }

  // 渲染教師講授指引 (Drawer)
  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) {
    notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;
  }

  // 進度條與頁籤
  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) {
    progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W2_SLIDES_DATA.length) * 100}%`;
  }

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) {
    progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W2_SLIDES_DATA.length}`;
  }

  // 更新跳頁選單
  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) {
    quickSelect.value = String(APP_STATE.currentSlideIndex);
  }

  // 前進後退按鈕禁用狀態
  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W2_SLIDES_DATA.length - 1;

  // 切換投影片時清空畫布
  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W2_SLIDES_DATA.length) {
    APP_STATE.currentSlideIndex = index;
    if (APP_STATE.viewMode === 'grid') {
      toggleViewMode();
    }
    renderSlide();
  }
}

function nextSlide() {
  if (APP_STATE.currentSlideIndex < W2_SLIDES_DATA.length - 1) {
    APP_STATE.currentSlideIndex++;
    renderSlide();
  }
}

function prevSlide() {
  if (APP_STATE.currentSlideIndex > 0) {
    APP_STATE.currentSlideIndex--;
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
      console.warn('全螢幕啟用失敗:', err.message);
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

// ==========================================
// 2. 視覺呈現引擎 (Visual Engine)
// ==========================================
function renderSlideVisual(slide) {
  const container = document.getElementById('slideVisualContainer');
  if (!container) return;
  const isZh = APP_STATE.lang === 'zh';

  switch (slide.visualType) {
    case 'image':
      container.innerHTML = `
        <div class="slide-image-card">
          <img src="${slide.imageSrc}" alt="${slide.title}" style="height: 220px; width: 100%; object-fit: cover;">
          <div class="image-card-caption">
            <span>🖼️ <strong>${isZh ? '主題配圖' : 'Topic Artwork'}</strong>：${slide.caption || slide.title}</span>
            <span style="color: #2563eb; font-weight: 700;">#Inflation_Defense</span>
          </div>
        </div>
      `;
      break;

    case 'skill_tree':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🗺️ 3小時核心技能樹 (Core Skills Tree)</h4>
            <span class="sub-tag">循序漸進 ‧ 穿透名目迷霧</span>
          </div>
          <div class="skills-tree-flow">
            <div class="tree-step-card step-h1">
              <div class="step-num">01</div>
              <div class="step-body">
                <h5>第 1 小時：通膨感知與公式</h5>
                <p>外食 10 年走勢 / CPI 拉斯皮爾斯公式 / 頻率偏誤 / 72 法則購買力腰斬 / 工資物價螺旋</p>
                <div class="step-badge">基礎理論與體感量化</div>
              </div>
            </div>
            <div class="tree-step-card step-h2">
              <div class="step-num">02</div>
              <div class="step-body">
                <h5>第 2 小時：隱形吃錢與理論</h5>
                <p>縮性通膨 (Shrinkflation) / 享樂品質調整 / 費雪方程式 (r = i - π) / 通膨稅與財富重分配</p>
                <div class="step-badge">隱形陷阱與經典模型</div>
              </div>
            </div>
            <div class="tree-step-card step-h3">
              <div class="step-num">03</div>
              <div class="step-body">
                <h5>第 3 小時：實證數據與資產</h5>
                <p>DGBAS 原始 CSV / 央行 2% 目標 / 巴菲特訂價權 / 4 大抗通膨資產終身防禦</p>
                <div class="step-badge">審計實證與長城防線</div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'chart_bento_wage':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🍱 外食費 vs 經常性薪資 10年漲幅對照 (2016-2026)</h4>
            <span class="sub-tag">排骨便當漲幅高達薪資調幅的 3.6 倍</span>
          </div>
          <div class="bento-comparison-grid">
            <div class="bento-stat-card">
              <div class="stat-icon">🍱</div>
              <div class="stat-name">排骨便當平均售價</div>
              <div class="stat-trend">75元 ➔ 90元 ➔ 125元</div>
              <div class="stat-rate surge">+66.7%</div>
              <p class="stat-note">具備強烈「向下僵固性」，原物料回落時價格難以降回</p>
            </div>
            <div class="bento-stat-card">
              <div class="stat-icon">💼</div>
              <div class="stat-name">工業與服務業經常性薪資</div>
              <div class="stat-trend">39,238元 ➔ 46,500元</div>
              <div class="stat-rate lagging">+18.5%</div>
              <p class="stat-note">調薪幅度大幅落後外食開銷，實質購買力受損</p>
            </div>
          </div>
          <div class="formula-box" style="margin-top: 10px;">
            <div class="math-eq">實質倍率 = 66.7% ÷ 18.5% ≈ <strong>3.6 倍差距！</strong></div>
          </div>
        </div>
      `;
      break;

    case 'formula_card_cpi':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📐 消費者物價指數 (CPI) 拉斯皮爾斯加權公式</h4>
            <span class="sub-tag">Laspeyres Weighted Composite Index</span>
          </div>
          <div class="formula-box">
            <div class="math-eq" style="font-size: 1.15rem;">
              $$CPI_t = \\frac{\\sum (P_{it} \\times Q_{i0})}{\\sum (P_{i0} \\times Q_{i0})} \\times 100$$
            </div>
            <div style="margin-top: 10px; font-size: 0.8rem; line-height: 1.5; color: #334155; text-align: left;">
              <div>• <strong>P_it</strong>：當期第 i 項商品之市場抽查價格</div>
              <div>• <strong>P_i0</strong>：基期（如 110年=100）商品之基準價格</div>
              <div>• <strong>Q_i0</strong>：基期調查之一籃子固定數量（權數）</div>
            </div>
          </div>
          <div class="info-callout" style="margin-top: 10px;">
            💡 <strong>通膨率 (YoY)</strong>：$$(CPI_t - CPI_{t-1}) / CPI_{t-1} \\times 100\\%$$
          </div>
        </div>
      `;
      break;

    case 'basket_weights_matrix':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🧺 官方 CPI 7 大類消費籃子權數結構 (主計總處)</h4>
            <span class="sub-tag">解密「頻率偏誤 (Frequency Bias)」的統計矛盾</span>
          </div>
          <div class="basket-bars-container">
            <div class="basket-bar-row highlight">
              <span class="bar-label">🍽️ 食物類 (天天買，感受極深)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 25.4%; background: #ef4444;">25.4%</div></div>
            </div>
            <div class="basket-bar-row highlight">
              <span class="bar-label">🏠 居住類 (房租水電，按月支出)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 22.7%; background: #f59e0b;">22.7%</div></div>
            </div>
            <div class="basket-bar-row">
              <span class="bar-label">🚗 交通通訊 (捷運、油價、通訊)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 14.2%; background: #3b82f6;">14.2%</div></div>
            </div>
            <div class="basket-bar-row">
              <span class="bar-label">🩺 醫藥保健 (健保、看診掛號)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 9.8%; background: #10b981;">9.8%</div></div>
            </div>
            <div class="basket-bar-row">
              <span class="bar-label">🎓 教養娛樂 (學費、書籍、旅遊)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 14.5%; background: #8b5cf6;">14.5%</div></div>
            </div>
            <div class="basket-bar-row">
              <span class="bar-label">👕 衣著類 (成衣鞋類)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 4.8%; background: #64748b;">4.8%</div></div>
            </div>
            <div class="basket-bar-row drag">
              <span class="bar-label">💻 3C電子與雜項 (降價拉低總平均)</span>
              <div class="bar-track"><div class="bar-fill" style="width: 8.6%; background: #0284c7;">8.6%</div></div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'headline_vs_core':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⚖️ 總體通膨 (Headline) vs 核心通膨 (Core CPI)</h4>
            <span class="sub-tag">為何全球央行只以 Core CPI 作為升降息唯一羅盤？</span>
          </div>
          <div class="headline-core-grid">
            <div class="h-card headline-box">
              <div class="card-tag">總體通膨 (Headline CPI)</div>
              <div class="metric-icon">🌪️</div>
              <h5>涵蓋全部 368 項商品</h5>
              <p>容易受颱風後蔬菜暴漲 80% 或地緣原油飆漲短暫干擾。波動劇烈，常帶有強烈<strong>短線雜訊</strong>。</p>
              <div class="verdict-bad">央行不以此作為升息依據</div>
            </div>
            <div class="h-card core-box">
              <div class="card-tag">核心通膨 (Core CPI)</div>
              <div class="metric-icon">🎯</div>
              <h5>扣除蔬果及能源波動</h5>
              <p>精準反映工資、房租、醫療與耐久服務等<strong>「黏性物價 (Sticky Prices)」</strong>與深層長期供需。</p>
              <div class="verdict-good">全球央行貨幣政策唯一錨定</div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'rule_72_chart':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⏳ 72 法則：現金購買力減半剩餘時間曲線</h4>
            <span class="sub-tag">$$T_{\\text{half}} = 72 \\div \\text{通膨率 (\\%)}$$ ‧ 複利通膨是現金殺手</span>
          </div>
          <div class="rule-72-grid">
            <div class="rule-pill">
              <span class="rate-badge">通膨率 2.0%</span>
              <div class="years-val">36 年</div>
              <span class="note">購買力腰斬</span>
            </div>
            <div class="rule-pill">
              <span class="rate-badge">通膨率 3.0%</span>
              <div class="years-val">24 年</div>
              <span class="note">購買力腰斬</span>
            </div>
            <div class="rule-pill danger">
              <span class="rate-badge">通膨率 3.6%</span>
              <div class="years-val">20 年</div>
              <span class="note">購買力腰斬</span>
            </div>
            <div class="rule-pill extreme">
              <span class="rate-badge">通膨率 4.0%</span>
              <div class="years-val">18 年</div>
              <span class="note">購買力腰斬</span>
            </div>
          </div>
          <div class="warning-callout" style="margin-top: 10px;">
            ⚠️ <strong>退休金驚悚實算</strong>：現在存 1,000 萬打算 30 年後退休，按 3% 通膨複利折現，未來的實質購買力僅值 <strong>412 萬元</strong>！
          </div>
        </div>
      `;
      break;

    case 'ad_as_curves':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📈 需求拉動 vs 成本推動：總體經濟 AD-AS 模型</h4>
            <span class="sub-tag">剖析惡性「滯脹 (Stagflation)」與 CBAM 碳關稅供給面衝擊</span>
          </div>
          <div class="adas-comparison-grid">
            <div class="adas-card ad-pull">
              <h5>🔥 需求拉動 (Demand-Pull)</h5>
              <div class="desc-badge">太多錢追逐太少商品</div>
              <p>央行印鈔、政府補貼或景氣過熱，驅使<strong>總需求曲線 (AD) 向右上方平移</strong>，產出增加但物價齊揚。</p>
            </div>
            <div class="adas-card as-push">
              <h5>⚡ 成本推動 (Cost-Push)</h5>
              <div class="desc-badge">能源危機 / 碳關稅 / 斷鏈</div>
              <p>石油危機、極端氣候、CBAM 碳費使邊際成本暴漲，<strong>總供給 (AS) 向左上方平移</strong>，引發高通膨與失業並存的「滯脹」！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'spiral_diagram':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🔄 工資—物價螺旋 (Wage-Price Spiral) 惡性循環</h4>
            <span class="sub-tag">自我強化循環一旦形成，央行必須以人為冷卻經濟為代價</span>
          </div>
          <div class="spiral-loop-matrix">
            <div class="spiral-node node-1">
              <span class="num">1</span>
              <h6>物價上漲</h6>
              <p>外食房租升</p>
            </div>
            <div class="spiral-arrow">➔</div>
            <div class="spiral-node node-2">
              <span class="num">2</span>
              <h6>勞工求加薪</h6>
              <p>工資要求增</p>
            </div>
            <div class="spiral-arrow">➔</div>
            <div class="spiral-node node-3">
              <span class="num">3</span>
              <h6>成本暴增</h6>
              <p>毛利率受損</p>
            </div>
            <div class="spiral-arrow">➔</div>
            <div class="spiral-node node-4">
              <span class="num">4</span>
              <h6>售價再漲</h6>
              <p>終端價格升</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'milestone_hour1':
      container.innerHTML = `
        <div class="visual-diagram-card milestone-card">
          <div class="milestone-badge">🎉 第一小時課程里程碑達成</div>
          <h4>實戰演練：檢測你的個人實質購買力！</h4>
          <p>已掌握外食暴漲、CPI 拉斯皮爾斯公式、72 法則與工資物價螺旋。現在，請開啟專屬計算盤，輸入你的加薪與開銷！</p>
          <div class="milestone-actions">
            <button class="btn-launch-lab btn-h1" onclick="openModal('modalPurchasingPower')">
              <span>🎯</span> 開啟「個人實質購買力縮水計算盤」
            </button>
          </div>
        </div>
      `;
      break;

    case 'shrinkflation_cases':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🔍 縮性通膨 (Shrinkflation) 經典手法揭密</h4>
            <span class="sub-tag">視覺欺瞞三部曲：充氣、增距、墊底</span>
          </div>
          <div class="shrink-cases-trio">
            <div class="shrink-mini-card">
              <div class="s-icon">🥔</div>
              <h6>洋芋片充氣戲法</h6>
              <p>外袋尺寸高度維持不變，淨重由 85g 減至 70g，空氣比率提升 18%。</p>
            </div>
            <div class="shrink-mini-card">
              <div class="s-icon">🍫</div>
              <h6>巧克力擴大間隙</h6>
              <p>維持長條紙盒長度，拉大三角形鋸齒間隔，可可含量暗中減少 15%~20%。</p>
            </div>
            <div class="shrink-mini-card">
              <div class="s-icon">🍜</div>
              <h6>餐飲與杯底墊高</h6>
              <p>外帶杯底內凹加厚、內用大碗加厚底座，視覺份量澎湃，內容物縮水 20%。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'hedonic_chart':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📱 享樂品質調整 (Hedonic Quality Adjustment)</h4>
            <span class="sub-tag">官方統計魔法：實體價格上漲，在 CPI 報表上卻被記為「下跌」？</span>
          </div>
          <div class="hedonic-compare-box">
            <div class="hedonic-col reality">
              <h5>🛒 現實世界 (消費者荷包)</h5>
              <div class="big-price-diff">30,000元 ➔ 35,000元</div>
              <div class="pill-hike">現金淨支出增加 5,000 元 (+16.7%)</div>
              <p>消費者無論如何都必須從口袋掏出更多現鈔，生活負擔真實加重。</p>
            </div>
            <div class="hedonic-col stats">
              <h5>📊 統計局 CPI 報表模型</h5>
              <div class="big-price-diff">晶片+相機效能 +30%</div>
              <div class="pill-drop">CPI 記為「實質降價 -10.2%」</div>
              <p>統計局認定：性能提升超越價格漲幅，享樂效用提高，等於產品降價！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'fisher_equation_card':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📉 歐文·費雪方程式 (The Fisher Equation)</h4>
            <span class="sub-tag">$$r = i - \\pi^e$$ ‧ 負實質利率奪魂鋸</span>
          </div>
          <div class="fisher-box">
            <div class="fisher-formula">
              <span class="term-r">實質利率 r</span>
              <span class="op">=</span>
              <span class="term-i">名目利率 i</span>
              <span class="op">-</span>
              <span class="term-pi">預期通膨率 π</span>
            </div>
            <div class="fisher-demo-scale">
              <div class="scale-case negative">
                <div class="case-title">⚠️ 當前台灣存款人現實</div>
                <div class="case-calc">定存名目年息 1.5% - 體感通膨 3.5% = <strong>-2.0% (負實質利率！)</strong></div>
                <div class="case-consequence">存 100 萬滿一年，名目多 15,000 元，實質購買力等同淨蒸發 20,000 元！</div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'wealth_redistribution':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⚖️ 通膨稅 (Inflation Tax) 與社會階級財富大洗牌</h4>
            <span class="sub-tag">不經國會立法表決的隱形財富掠奪</span>
          </div>
          <div class="wealth-sides-grid">
            <div class="w-side winners">
              <h5>🏆 通膨掠奪獲益者 (債務人)</h5>
              <ul>
                <li><strong>發行公債的政府</strong>：實質償債壓力被稀釋</li>
                <li><strong>固定低利房貸借款人</strong>：未來還款貨幣實質貶值</li>
                <li><strong>實體資產與定價權企業</strong>：資產隨物價暴漲</li>
              </ul>
            </div>
            <div class="w-side losers">
              <h5>🩸 通膨隱形受害者 (債權人)</h5>
              <ul>
                <li><strong>死存銀行活存/定存族</strong>：實質購買力單向縮水</li>
                <li><strong>固定薪資受薪階級</strong>：加薪幅度落後物價調幅</li>
                <li><strong>未持有資產之租屋族</strong>：租金負擔持續惡化</li>
              </ul>
            </div>
          </div>
        </div>
      `;
      break;

    case 'costs_friction_card':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⚙️ 微觀社會摩擦成本：菜單成本 vs 鞋皮成本</h4>
            <span class="sub-tag">高通膨如何讓經濟體運作效率嚴重耗損？</span>
          </div>
          <div class="friction-grid">
            <div class="f-card">
              <div class="f-icon">📜</div>
              <h5>菜單成本 (Menu Costs)</h5>
              <p>商家因物價天天變動，必須不斷重新印製菜單、修改 POS 系統與標價所耗費的行政與紙張浪費。</p>
            </div>
            <div class="f-card">
              <div class="f-icon">👟</div>
              <h5>鞋皮成本 (Shoe-leather Costs)</h5>
              <p>大眾為避免紙鈔快速貶值，頻繁奔波於銀行與投資帳戶轉帳提領所耗費的精力與手續費（磨損鞋皮）。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'expectation_loop':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🧠 通膨預期與自我實現預言 (Self-Fulfilling Prophecy)</h4>
            <span class="sub-tag">大眾一旦預期明天會漲，今天就必然會發生暴漲</span>
          </div>
          <div class="expectation-flow">
            <div class="exp-step">
              <span class="tag">心理預期</span>
              <h6>社會普遍預期物價持續飆漲</h6>
            </div>
            <div class="exp-arrow">⬇️ 觸發行動</div>
            <div class="exp-step">
              <span class="tag">提前行動</span>
              <h6>消費者恐慌囤貨搶購 / 廠商提前調漲標價</h6>
            </div>
            <div class="exp-arrow">⬇️ 實體結果</div>
            <div class="exp-step highlight">
              <span class="tag">自我實現</span>
              <h6>總需求暴增與成本推升，通膨真正成真！</h6>
            </div>
          </div>
        </div>
      `;
      break;

    case 'three_shields':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🛡️ 識別與防禦隱形通膨的 3 大實用金鐘罩</h4>
            <span class="sub-tag">日常消費與個人理財的絕對指針</span>
          </div>
          <div class="shields-trio">
            <div class="shield-card">
              <div class="s-badge">防禦盾 1</div>
              <h5>查驗「單位價格」</h5>
              <p>不看包裝總價，算<strong>「元/克」或「元/ml」</strong>，秒破縮水詭計。</p>
            </div>
            <div class="shield-card">
              <div class="s-badge">防禦盾 2</div>
              <h5>自訂「個人 CPI」</h5>
              <p>依自身外食房租佔比自訂預算指標，不被官方平均數誤導。</p>
            </div>
            <div class="shield-card">
              <div class="s-badge">防禦盾 3</div>
              <h5>追蹤「實質利率 r」</h5>
              <p>堅拒負實質利率資產，確保投資年化淨報酬超越真實通膨。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'milestone_hour2':
      container.innerHTML = `
        <div class="visual-diagram-card milestone-card">
          <div class="milestone-badge">🎉 第二小時課程里程碑達成</div>
          <h4>實戰演練：隱形縮性通膨偵探考驗！</h4>
          <p>已掌握廠商包裝充氣縮水、享樂調整爭議與費雪負實質利率殺傷力。現在，請化身價格偵探，拆穿廠商隱藏的調漲率！</p>
          <div class="milestone-actions">
            <button class="btn-launch-lab btn-h2" onclick="openModal('modalShrinkflation')">
              <span>🎯</span> 開啟「隱形縮性通膨偵探考驗」
            </button>
          </div>
        </div>
      `;
      break;

    case 'dgbas_audit_flow':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🏛️ 主計總處 (DGBAS) 物價統計月報 CSV 實查流程</h4>
            <span class="sub-tag">培養以第一手審計數據說話的財務素養</span>
          </div>
          <div class="audit-pipeline">
            <div class="pipe-node">
              <div class="p-num">1</div>
              <h6>登入官方統計入口</h6>
              <p>每月進入主計總處物價統計專區</p>
            </div>
            <div class="pipe-node">
              <div class="p-num">2</div>
              <h6>下載 368 項 CSV</h6>
              <p>取得外食費、房租等歷史數列</p>
            </div>
            <div class="pipe-node">
              <div class="p-num">3</div>
              <h6>拉出對比折線圖</h6>
              <p>實證外食費單向攀升與僵固性真相</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'two_percent_logic':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🎯 為什麼全球央行把 2% 設為聖杯，而不是 0%？</h4>
            <span class="sub-tag">揭密「通縮陷阱 (Deflation Spiral)」的經濟浩劫</span>
          </div>
          <div class="two-pct-grid">
            <div class="pct-card danger-side">
              <h5>❄️ 0% 通膨或通縮 (-2%) 的恐怖後果</h5>
              <ul>
                <li><strong>延遲消費陷阱</strong>：大眾等待降價延後消費</li>
                <li><strong>企業倒閉裁員潮</strong>：營收驟降引發大規模失業</li>
                <li><strong>實質債務螺旋膨脹</strong>：借款人還款更加沉重</li>
              </ul>
            </div>
            <div class="pct-card safe-side">
              <h5>🌟 溫和 2% 通膨的經濟潤滑效益</h5>
              <ul>
                <li><strong>預留央行降息緩衝</strong>：衰退時有足夠調降利率空間</li>
                <li><strong>工資向下僵固潤滑劑</strong>：名目不減薪下微調實質成本</li>
                <li><strong>激勵資本流通投資</strong>：促使資金投入生產性經濟</li>
              </ul>
            </div>
          </div>
        </div>
      `;
      break;

    case 'wage_growth_calc':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>💼 實質薪資成長率算式 (Real Wage Growth)</h4>
            <span class="sub-tag">$$\\text{Real Wage Growth} \\approx \\text{名目調薪率} - \\text{通膨率}$$</span>
          </div>
          <div class="wage-calc-box">
            <div class="calc-row">
              <span>名目薪資調幅 (公司加薪)</span>
              <strong style="color: #10b981; font-size: 1.1rem;">+3.0%</strong>
            </div>
            <div class="calc-row">
              <span>體感外食與居住綜合通膨</span>
              <strong style="color: #ef4444; font-size: 1.1rem;">-4.2%</strong>
            </div>
            <div class="calc-divider"></div>
            <div class="calc-row result">
              <span>個人實質薪資淨變動率</span>
              <strong style="color: #dc2626; font-size: 1.2rem;">-1.2% (實質減薪！)</strong>
            </div>
            <p class="calc-conclusion">
              帳戶每個月名目多了薪水，能買到的排骨便當與生活必需品數量卻實質減少。
            </p>
          </div>
        </div>
      `;
      break;

    case 'shelter_rent_lag':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🏠 居住類通膨 (Shelter) 房租黏性與 6~12 個月滯後性</h4>
            <span class="sub-tag">CPI 權數超過 20% 的終極定海神針</span>
          </div>
          <div class="rent-lag-flow">
            <div class="lag-step">
              <span class="time-tag">T = 0 月</span>
              <h6>房價/利率大漲</h6>
              <p>購屋與持有成本攀升</p>
            </div>
            <div class="lag-arrow">➔ 租約鎖定 ➔</div>
            <div class="lag-step">
              <span class="time-tag">T + 6~12 月</span>
              <h6>租約到期續簽</h6>
              <p>房東正式提出調漲租金</p>
            </div>
            <div class="lag-arrow">➔ 官方抽樣 ➔</div>
            <div class="lag-step sticky">
              <span class="time-tag">T + 12 月後</span>
              <h6>居住 CPI 頑固高檔</h6>
              <p>房租黏性支撐核心通膨</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'greenflation_diagram':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🌱 綠色通膨 (Greenflation) 與結構性碳定價</h4>
            <span class="sub-tag">淨零排放與 CBAM 碳關稅對終端製造成本的長期推升</span>
          </div>
          <div class="green-pillars-grid">
            <div class="g-card">
              <div class="g-icon">⚡</div>
              <h6>能源轉型高電價</h6>
              <p>淘汰便宜燃煤，採購高成本綠電，推高工業用電成本。</p>
            </div>
            <div class="g-card">
              <div class="g-icon">⛏️</div>
              <h6>關鍵綠能金屬短缺</h6>
              <p>電動車電網需要大量鋰銅鎳，供不應求推升終端售價。</p>
            </div>
            <div class="g-card">
              <div class="g-icon">🏷️</div>
              <h6>CBAM 碳邊境關稅</h6>
              <p>2026 全面開徵碳費，高碳排商品成本無損轉嫁消費者。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'four_pillars_temple':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🏛️ 終身抗通膨思維：個人資產防禦 4 大支柱</h4>
            <span class="sub-tag">構築個人一生不被通膨掠奪的財富長城</span>
          </div>
          <div class="temple-pillars-grid">
            <div class="pillar-col">
              <div class="pillar-cap">支柱 1</div>
              <h6>拒絕現金死存</h6>
              <p>僅留 6 個月緊急金，其餘投入生產性資產。</p>
            </div>
            <div class="pillar-col">
              <div class="pillar-cap">支柱 2</div>
              <h6>擁抱定價權資產</h6>
              <p>定期定額全球護城河股票 ETF (如 VT、0050)。</p>
            </div>
            <div class="pillar-col">
              <div class="pillar-cap">支柱 3</div>
              <h6>善用固定房貸</h6>
              <p>在能力內持有自住房，讓通膨稀釋實質房貸。</p>
            </div>
            <div class="pillar-col">
              <div class="pillar-cap">支柱 4</div>
              <h6>投資人力資本</h6>
              <p>提升 AI 時代稀缺技能，確保加薪跑贏 CPI。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'holistic_matrix':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🌐 第二週全景知識體系圖譜 (Holistic Matrix)</h4>
            <span class="sub-tag">貫穿生活體感、數理公式、隱形陷阱到資產防禦</span>
          </div>
          <div class="matrix-overview-grid">
            <div class="matrix-box box-1">
              <h6>第 1 小時：感知與公式</h6>
              <p>外食 10 年暴漲 / 拉斯皮爾斯公式 / 頻率偏誤 / 72 法則 / 需求拉動 vs 成本推動 / 工資物價螺旋</p>
            </div>
            <div class="matrix-box box-2">
              <h6>第 2 小時：隱形吃錢與模型</h6>
              <p>縮性通膨 (元/克) / 享樂品質調整爭議 / 費雪方程式負利率 / 通膨稅重分配 / 菜單成本 / 魏瑪惡性通膨</p>
            </div>
            <div class="matrix-box box-3">
              <h6>第 3 小時：實證與資產長城</h6>
              <p>DGBAS CSV 實查 / 央行 2% 目標 / 巴菲特訂價權 / 4 大抗通膨資產 / 綠色通膨 / 終身防禦四支柱</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'course_wrapup':
      container.innerHTML = `
        <div class="visual-diagram-card milestone-card wrapup-card">
          <div class="milestone-badge">🎓 第二週學習總結與第三週預告</div>
          <h4>恭喜完成【物價、通膨與實質購買力】全單元！</h4>
          <p>請前往完成線上小遊戲與 4 大維度課堂作業。下週我們將進入<strong>【利率、央行貨幣政策與資產價格】</strong>！</p>
          <div class="milestone-actions">
            <button class="btn-launch-lab btn-h3" onclick="openModal('modalDetective')">
              <span>🎮</span> 挑戰第 3 小時偵探遊戲
            </button>
            <button class="btn-launch-lab btn-primary-step" onclick="openModal('modalHomework')">
              <span>📝</span> 填寫課堂作業報告
            </button>
          </div>
        </div>
      `;
      break;

    default:
      container.innerHTML = `
        <div class="visual-diagram-card">
          <h4>${slide.title}</h4>
          <p>${slide.subtitle}</p>
        </div>
      `;
      break;
  }
}

// ==========================================
// 3. 卡片總覽模式 (Grid Overview Mode)
// ==========================================
function initGridOverview() {
  document.getElementById('gridSearchInput')?.addEventListener('input', renderGridCards);
  document.querySelectorAll('.tab-hour-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-hour-filter').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderGridCards();
    });
  });
}

function renderGridCards() {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;

  const isZh = APP_STATE.lang === 'zh';
  const searchTerm = (document.getElementById('gridSearchInput')?.value || '').trim().toLowerCase();
  const activeTab = document.querySelector('.tab-hour-filter.active')?.getAttribute('data-hour') || 'all';

  let filtered = W2_SLIDES_DATA.filter(slide => {
    if (activeTab === '1' && slide.hour !== 1) return false;
    if (activeTab === '2' && slide.hour !== 2) return false;
    if (activeTab === '3' && slide.hour !== 3) return false;

    if (searchTerm) {
      const matchZh = slide.title.toLowerCase().includes(searchTerm) || slide.subtitle.toLowerCase().includes(searchTerm);
      const matchEn = slide.titleEn.toLowerCase().includes(searchTerm) || slide.subtitleEn.toLowerCase().includes(searchTerm);
      return matchZh || matchEn;
    }
    return true;
  });

  container.innerHTML = filtered
    .map(slide => `
      <div class="card-overview hour-${slide.hour}" onclick="selectSlideFromGrid(${slide.id - 1})">
        <div class="card-overview-header">
          <span class="badge-slide-num">Slide ${String(slide.id).padStart(2, '0')}</span>
          <span class="badge-hour">第 ${slide.hour} 小時</span>
        </div>
        <h5 class="card-overview-title">${isZh ? slide.title : slide.titleEn}</h5>
        <p class="card-overview-desc">${isZh ? slide.subtitle : slide.subtitleEn}</p>
        <div class="card-overview-footer">
          <span class="badge-tag">${isZh ? slide.category : slide.categoryEn}</span>
          <span class="action-arrow">進入 ➔</span>
        </div>
      </div>
    `)
    .join('');
}

function selectSlideFromGrid(index) {
  toggleViewMode();
  jumpToSlide(index);
}

// ==========================================
// 4. 手繪畫布與螢光筆引擎 (Drawing Canvas)
// ==========================================
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

    if (toolbar) toolbar.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    if (canvasEl) canvasEl.classList.toggle('active', APP_STATE.isDrawingActive);
    if (btn) btn.classList.toggle('active', APP_STATE.isDrawingActive);
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

  canvas.addEventListener('mouseup', () => { isPainting = false; });
  canvas.addEventListener('mouseleave', () => { isPainting = false; });
}

function clearDrawingCanvas(confirmPrompt = true) {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvasSnapshot() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = `W2_物價通膨與實質購買力_Slide_${APP_STATE.currentSlideIndex + 1}_註記.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ==========================================
// 5. 第 1 小時活動：個人實質購買力縮水計算盤
// ==========================================
function initPurchasingPowerActivity() {
  const btnPresets = document.querySelectorAll('.pp-preset-btn');
  btnPresets.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const presetId = e.currentTarget.getAttribute('data-preset');
      const preset = W2_PURCHASING_POWER_PRESETS.find(p => p.id === presetId);
      if (preset) {
        document.getElementById('ppIncomeInput').value = preset.income;
        document.getElementById('ppWageGrowthInput').value = preset.wageGrowth;
        document.getElementById('ppFoodShareInput').value = preset.foodShare;
        document.getElementById('ppFoodInfInput').value = preset.foodInflation;
        document.getElementById('ppHousingShareInput').value = preset.housingShare;
        document.getElementById('ppHousingInfInput').value = preset.housingInflation;
        document.getElementById('ppOtherShareInput').value = preset.otherShare;
        document.getElementById('ppOtherInfInput').value = preset.otherInflation;
        calculatePurchasingPower();
      }
    });
  });

  const inputs = [
    'ppIncomeInput', 'ppWageGrowthInput',
    'ppFoodShareInput', 'ppFoodInfInput',
    'ppHousingShareInput', 'ppHousingInfInput',
    'ppOtherShareInput', 'ppOtherInfInput'
  ];

  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculatePurchasingPower);
  });

  calculatePurchasingPower();
}

function calculatePurchasingPower() {
  const income = parseFloat(document.getElementById('ppIncomeInput')?.value) || 35000;
  const wageGrowth = parseFloat(document.getElementById('ppWageGrowthInput')?.value) || 0;

  const foodShare = parseFloat(document.getElementById('ppFoodShareInput')?.value) || 40;
  const foodInf = parseFloat(document.getElementById('ppFoodInfInput')?.value) || 0;

  const housingShare = parseFloat(document.getElementById('ppHousingShareInput')?.value) || 35;
  const housingInf = parseFloat(document.getElementById('ppHousingInfInput')?.value) || 0;

  const otherShare = parseFloat(document.getElementById('ppOtherShareInput')?.value) || 25;
  const otherInf = parseFloat(document.getElementById('ppOtherInfInput')?.value) || 0;

  const totalShare = foodShare + housingShare + otherShare;
  const normFood = totalShare > 0 ? foodShare / totalShare : 0.4;
  const normHousing = totalShare > 0 ? housingShare / totalShare : 0.35;
  const normOther = totalShare > 0 ? otherShare / totalShare : 0.25;

  const personalInf = (normFood * foodInf) + (normHousing * housingInf) + (normOther * otherInf);
  const realWageGrowth = ((1 + wageGrowth / 100) / (1 + personalInf / 100) - 1) * 100;
  const monthlyDeficit = income * ((personalInf - wageGrowth) / 100);
  const bentoLoss = Math.round(Math.abs(monthlyDeficit) / 125);
  const halfYears = personalInf > 0 ? (72 / personalInf).toFixed(1) : '∞';

  const elInf = document.getElementById('ppPersonalInfResult');
  const elRealWage = document.getElementById('ppRealWageGrowthResult');
  const elDeficit = document.getElementById('ppMonthlyDeficitResult');
  const elBento = document.getElementById('ppBentoLossResult');
  const elHalfLife = document.getElementById('ppHalfLifeResult');
  const elDiagnosis = document.getElementById('ppDiagnosisText');

  if (elInf) elInf.textContent = `${personalInf.toFixed(1)}%`;
  if (elRealWage) {
    elRealWage.textContent = `${realWageGrowth >= 0 ? '+' : ''}${realWageGrowth.toFixed(2)}%`;
    elRealWage.className = `pp-stat-val ${realWageGrowth >= 0 ? 'good' : 'bad'}`;
  }
  if (elDeficit) {
    elDeficit.textContent = monthlyDeficit > 0 ? `-$${Math.round(monthlyDeficit).toLocaleString()} 元` : `+$${Math.round(-monthlyDeficit).toLocaleString()} 元`;
    elDeficit.className = `pp-stat-val ${monthlyDeficit > 0 ? 'bad' : 'good'}`;
  }
  if (elBento) {
    elBento.textContent = monthlyDeficit > 0 ? `約 ${bentoLoss} 個便當 / 月` : `多賺 ${bentoLoss} 個便當 / 月`;
  }
  if (elHalfLife) elHalfLife.textContent = `${halfYears} 年`;

  if (elDiagnosis) {
    if (realWageGrowth < -3.0) {
      elDiagnosis.innerHTML = `<span class="badge-alert red">嚴重倒退警戒</span> 你的加薪幅度被生活通膨徹底吞噬！實質購買力正在加速縮水，死存現金將導致購買力在 ${halfYears} 年內減半。建議立即配置定價權股票 ETF 並提升個人稀缺專長。`;
    } else if (realWageGrowth < 0) {
      elDiagnosis.innerHTML = `<span class="badge-alert orange">溫和倒退警示</span> 你的加薪幅度勉強追隨大盤，但仍不足以覆蓋外食與租金的調漲，每月實質蒸發約 ${bentoLoss} 個便當，需注意隱形通膨侵蝕。`;
    } else {
      elDiagnosis.innerHTML = `<span class="badge-alert green">實質增值領先</span> 恭喜！你的調薪幅度超過個人體感通膨，實質購買力正處於正向擴張期，具備餘裕進行長線資產配置。`;
    }
  }
}

// ==========================================
// 6. 第 2 小時活動：隱形縮性通膨 (Shrinkflation) 偵探考驗
// ==========================================
function initShrinkflationActivity() {
  const container = document.getElementById('shrinkCasesList');
  if (container) {
    container.innerHTML = W2_SHRINKFLATION_CASES.map((c, idx) => `
      <button class="shrink-case-item ${idx === 0 ? 'active' : ''}" onclick="selectShrinkCase(${idx})">
        <div class="c-title">${c.title}</div>
        <div class="c-meta">${c.oldWeight}${c.unit} ➔ ${c.newWeight}${c.unit} | 售價 ${c.newPrice} 元</div>
      </button>
    `).join('');
  }

  document.getElementById('inputOldWeight')?.addEventListener('input', calculateShrinkflation);
  document.getElementById('inputNewWeight')?.addEventListener('input', calculateShrinkflation);
  document.getElementById('inputOldPrice')?.addEventListener('input', calculateShrinkflation);
  document.getElementById('inputNewPrice')?.addEventListener('input', calculateShrinkflation);

  selectShrinkCase(0);
}

function selectShrinkCase(index) {
  const c = W2_SHRINKFLATION_CASES[index];
  if (!c) return;

  APP_STATE.shrinkState.activeCase = index;

  document.querySelectorAll('.shrink-case-item').forEach((el, idx) => {
    el.classList.toggle('active', idx === index);
  });

  const inOldW = document.getElementById('inputOldWeight');
  const inNewW = document.getElementById('inputNewWeight');
  const inOldP = document.getElementById('inputOldPrice');
  const inNewP = document.getElementById('inputNewPrice');

  if (inOldW) inOldW.value = c.oldWeight;
  if (inNewW) inNewW.value = c.newWeight;
  if (inOldP) inOldP.value = c.oldPrice;
  if (inNewP) inNewP.value = c.newPrice;

  calculateShrinkflation();
}

function calculateShrinkflation() {
  const oldW = parseFloat(document.getElementById('inputOldWeight')?.value) || 85;
  const newW = parseFloat(document.getElementById('inputNewWeight')?.value) || 70;
  const oldP = parseFloat(document.getElementById('inputOldPrice')?.value) || 35;
  const newP = parseFloat(document.getElementById('inputNewPrice')?.value) || 35;

  const oldUnit = oldW > 0 ? oldP / oldW : 0;
  const newUnit = newW > 0 ? newP / newW : 0;
  const realHike = oldUnit > 0 ? ((newUnit - oldUnit) / oldUnit) * 100 : 0;
  const equivalentOldPrice = oldW * newUnit;

  const elOldUnit = document.getElementById('shrinkOldUnitPrice');
  const elNewUnit = document.getElementById('shrinkNewUnitPrice');
  const elHike = document.getElementById('shrinkHikePercent');
  const elEquiv = document.getElementById('shrinkEquivPrice');
  const elTactics = document.getElementById('shrinkTacticsText');

  if (elOldUnit) elOldUnit.textContent = `$${oldUnit.toFixed(4)} / 單位`;
  if (elNewUnit) elNewUnit.textContent = `$${newUnit.toFixed(4)} / 單位`;
  if (elHike) {
    elHike.textContent = `${realHike >= 0 ? '+' : ''}${realHike.toFixed(1)}%`;
    elHike.className = `shrink-stat-val ${realHike > 0 ? 'bad' : 'good'}`;
  }
  if (elEquiv) {
    elEquiv.textContent = `$${equivalentOldPrice.toFixed(1)} 元`;
  }

  const currentCase = W2_SHRINKFLATION_CASES[APP_STATE.shrinkState.activeCase];
  if (elTactics && currentCase) {
    elTactics.innerHTML = `
      <strong>🕵️ 廠商心理戰術：</strong>${currentCase.stealthTactics}<br>
      <strong>💡 專家偵探解析：</strong>${currentCase.expertAnalysis}
    `;
  }
}

// ==========================================
// 7. 第 3 小時小遊戲：物價與通膨真相大挑戰
// ==========================================
function initDetectiveGame() {
  renderDetectiveGameLevel();
}

function renderDetectiveGameLevel() {
  const container = document.getElementById('gameLevelContainer');
  if (!container) return;

  const currentLvl = APP_STATE.gameCurrentLevel;
  const isFinished = currentLvl >= W2_GAME_QUESTIONS.length;

  if (isFinished) {
    renderGameCertificate(container);
    return;
  }

  const q = W2_GAME_QUESTIONS[currentLvl];

  container.innerHTML = `
    <div class="game-header-bar">
      <span class="game-badge">${q.badge}</span>
      <span class="game-score-tag">目前得分：<strong>${APP_STATE.gameScore} / 100</strong></span>
    </div>

    <h4 class="game-question-title">${q.title}</h4>
    <div class="game-scenario-card">${q.scenario}</div>

    <div class="game-options-list">
      ${q.options.map((opt, idx) => `
        <button class="game-option-btn" onclick="submitGameAnswer(${idx})">
          <span class="opt-letter">${['A', 'B', 'C', 'D'][idx]}</span>
          <span class="opt-text">${opt.text}</span>
        </button>
      `).join('')}
    </div>

    <div id="gameFeedbackBox" class="game-feedback-box" style="display: none;"></div>
  `;
}

function submitGameAnswer(optionIdx) {
  const currentLvl = APP_STATE.gameCurrentLevel;
  const q = W2_GAME_QUESTIONS[currentLvl];
  const opt = q.options[optionIdx];

  const feedbackBox = document.getElementById('gameFeedbackBox');
  if (!feedbackBox) return;

  feedbackBox.style.display = 'block';
  feedbackBox.className = `game-feedback-box ${opt.isCorrect ? 'correct' : 'wrong'}`;

  if (opt.isCorrect) {
    if (!APP_STATE.gameAnswered[currentLvl]) {
      APP_STATE.gameScore += 25;
      APP_STATE.gameAnswered[currentLvl] = true;
    }
    feedbackBox.innerHTML = `
      <div class="fb-title">🎉 答對了！+25分</div>
      <p>${opt.feedback}</p>
      <button class="btn-nav-step btn-primary-step" style="margin-top: 10px;" onclick="advanceGameNextLevel()">
        進入下一關 ➔
      </button>
    `;
  } else {
    feedbackBox.innerHTML = `
      <div class="fb-title">❌ 思考一下，尚未完全命中！</div>
      <p>${opt.feedback}</p>
      <p style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">請重新閱讀題目與選項，再次挑戰！</p>
    `;
  }
}

function advanceGameNextLevel() {
  APP_STATE.gameCurrentLevel++;
  renderDetectiveGameLevel();
}

function renderGameCertificate(container) {
  container.innerHTML = `
    <div class="certificate-wrapper">
      <div class="cert-ribbon">🏆 榮譽認證</div>
      <h3>物價與通膨真相大挑戰 ‧ 結業證書</h3>
      <p class="cert-subtitle">Certificate of Financial Inflation Literacy Defense</p>

      <div class="cert-user-row">
        <label>授予學員：</label>
        <input type="text" id="certStudentName" placeholder="請輸入姓名" value="${APP_STATE.homeworkData.studentName || '財務探索先鋒'}" oninput="updateCertName(this.value)">
      </div>

      <div class="cert-body">
        該學員已圓滿通過第二週【物價、通膨與實質購買力】全景考核，精確掌握 CPI 拉斯皮爾斯公式、破解縮性通膨 (Shrinkflation) 包裝陷阱、熟練計算費雪負實質利率，並具備甄別巴菲特企業定價權之卓越批判思維！
      </div>

      <div class="cert-score-seal">
        <div class="seal-score">${APP_STATE.gameScore}</div>
        <div class="seal-label">總評得分 (滿分 100)</div>
      </div>

      <div class="cert-footer-row">
        <div>發證單位：管理探索二 課程教學委員會</div>
        <div>日期：115學年度 第一學期 第二週</div>
      </div>

      <div class="cert-action-row">
        <button class="btn-nav-step btn-primary-step" onclick="window.print()">🖨️ 列印此證書</button>
        <button class="btn-nav-step" onclick="resetGame()">🔄 重新挑戰</button>
      </div>
    </div>
  `;
}

function updateCertName(val) {
  APP_STATE.homeworkData.studentName = val;
}

function resetGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderDetectiveGameLevel();
}

// ==========================================
// 8. 第 3 小時作業：個人 CPI 權數自訂與抗通膨報告
// ==========================================
function initHomeworkForm() {
  const fields = [
    'hwStudentName', 'hwStudentId', 'hwCpiAnalysis',
    'hwShrinkCase', 'hwFisherExercise', 'hwAssetPlan',
    'hwConclusionGrade', 'hwDecisionSummary'
  ];

  fields.forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      syncHomeworkFromUI();
      saveHomeworkToStorage();
    });
  });

  const btnPresets = document.querySelectorAll('.hw-preset-btn');
  btnPresets.forEach((btn, idx) => {
    btn.addEventListener('click', () => applyHomeworkPreset(idx));
  });

  document.getElementById('btnExportJson')?.addEventListener('click', exportHomeworkJson);
  document.getElementById('btnExportMd')?.addEventListener('click', exportHomeworkMarkdown);
  document.getElementById('btnPrintHomework')?.addEventListener('click', () => window.print());
}

function syncHomeworkFromUI() {
  APP_STATE.homeworkData = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    cpiAnalysis: document.getElementById('hwCpiAnalysis')?.value || '',
    shrinkCase: document.getElementById('hwShrinkCase')?.value || '',
    fisherExercise: document.getElementById('hwFisherExercise')?.value || '',
    assetPlan: document.getElementById('hwAssetPlan')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'Moderate Risk',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
}

function applyHomeworkPreset(index) {
  const p = W2_HOMEWORK_PRESETS[index];
  if (!p) return;

  document.getElementById('hwStudentName').value = p.studentName;
  document.getElementById('hwStudentId').value = p.studentId;
  document.getElementById('hwCpiAnalysis').value = p.cpiAnalysis;
  document.getElementById('hwShrinkCase').value = p.shrinkCase;
  document.getElementById('hwFisherExercise').value = p.fisherExercise;
  document.getElementById('hwAssetPlan').value = p.assetPlan;
  document.getElementById('hwConclusionGrade').value = p.conclusionGrade;
  document.getElementById('hwDecisionSummary').value = p.decisionSummary;

  syncHomeworkFromUI();
  saveHomeworkToStorage();

  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = `✓ 已成功套用：${p.name}`;
    setTimeout(() => { status.textContent = ''; }, 3000);
  }
}

function saveHomeworkToStorage() {
  localStorage.setItem('agy_w2_homework', JSON.stringify(APP_STATE.homeworkData));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '✓ 本地自動儲存中...';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  try {
    const saved = localStorage.getItem('agy_w2_homework');
    if (!saved) return;
    const data = JSON.parse(saved);
    APP_STATE.homeworkData = data;

    if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
    if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
    if (document.getElementById('hwCpiAnalysis')) document.getElementById('hwCpiAnalysis').value = data.cpiAnalysis || '';
    if (document.getElementById('hwShrinkCase')) document.getElementById('hwShrinkCase').value = data.shrinkCase || '';
    if (document.getElementById('hwFisherExercise')) document.getElementById('hwFisherExercise').value = data.fisherExercise || '';
    if (document.getElementById('hwAssetPlan')) document.getElementById('hwAssetPlan').value = data.assetPlan || '';
    if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'Moderate Risk';
    if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
  } catch (e) {
    console.warn('載入本地作業失敗:', e);
  }
}

function exportHomeworkMarkdown() {
  syncHomeworkFromUI();
  const d = APP_STATE.homeworkData;

  const md = `# 管理探索二 第二週課堂作業：個人 CPI 權數自訂與抗通膨報告
- **學生姓名**：${d.studentName || '未填寫'}
- **學號**：${d.studentId || '未填寫'}
- **提交日期**：${new Date().toLocaleDateString('zh-TW')}
- **作業評級**：【${d.conclusionGrade}】

---

### 一、 個人 CPI 消費組合權數自訂與官方落差分析 (佔比 25%)
${d.cpiAnalysis || '(無內容)'}

---

### 二、 生活周遭縮性通膨 (Shrinkflation) 案例查核 (佔比 25%)
${d.shrinkCase || '(無內容)'}

---

### 三、 費雪方程式個人實質報酬率演練 (佔比 25%)
${d.fisherExercise || '(無內容)'}

---

### 四、 4 大抗通膨資產終身調配策略與反思 (佔比 25%)
${d.assetPlan || '(無內容)'}

---

### 五、 核心反思總結
${d.decisionSummary || '(無內容)'}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功將報告 Markdown 複製至剪貼簿！');
  }).catch(() => {
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `W2_物價通膨與實質購買力_課堂報告_${d.studentName || '學員'}_${d.studentId || Date.now()}.md`;
    link.click();
  });
}

function exportHomeworkJson() {
  syncHomeworkFromUI();
  const blob = new Blob([JSON.stringify(APP_STATE.homeworkData, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `W2_物價通膨與實質購買力_課堂報告_${Date.now()}.json`;
  link.click();
}

// ==========================================
// 9. 模態視窗管理器 (Modals Manager)
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
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
