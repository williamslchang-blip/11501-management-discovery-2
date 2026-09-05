/**
 * 115學年度「管理探索二」第十七週互動教學主程式
 * 單元名稱：期末專案發表實戰、財經簡報與總評量
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

  // 1小時活動 (簡報發表控時計算器)
  pitchPreset: 'standard_10m',

  // 2小時活動 (同儕互評計算器)
  peerPreset: 'balanced_group',

  // 3小時遊戲 (財經表達達人大挑戰)
  gameCurrentIndex: 0,
  gameScore: 0,

  // 3小時作業 (期末個人簡報反思與學習歷程報告)
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
  initPitchRubricLab();
  initPeerReviewLab();
  initPitchGame();
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
  W17_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W17_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w17-primary, #2563eb);">✦</span><span>${t}</span></li>`).join('');
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
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W17_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W17_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W17_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W17_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W17_SLIDES_DATA.length - 1) {
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
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🏆 第十七週核心導論：期末專案發表與總評量</span>
            <span class="pitch-visual-tag">巔峰驗收</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box highlight">
              <h6>1. 跨領域知識總整合</h6>
              <p>融合財務報表、指數複利、房貸決策、半導體供應鏈、AI ROI、ESG 與 Web3 資產。</p>
            </div>
            <div class="pitch-box gold">
              <h6>2. 商業 Pitch 實戰演練</h6>
              <p>依循 10/20/30 法則，8 分鐘精煉發表，以嚴謹數據與生動故事打動評審！</p>
            </div>
            <div class="pitch-box safe">
              <h6>3. 專家與同儕雙重加權</h6>
              <p>專家 60% + 同儕 40%，四維度量化考核，培育建設性批判與同理溝通素養。</p>
            </div>
          </div>
          <div class="pitch-box highlight" style="margin-top:10px;">
            <h6>🎤 今日發表舞台期許</h6>
            <p><strong>自信展現大一探索光芒：</strong>不只展示精密的財務試算，更要傳達改變未來的商業視野與社會責任感！</p>
          </div>
        </div>
      `;
      break;

    case 2:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🗺️ 第十七週 3 小時學習地圖與發表流程</span>
            <span class="pitch-visual-tag">精準配時</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box" style="border-top:3px solid #1d4ed8;">
              <h6>第一小時：法則與組 1-2</h6>
              <p>10/20/30 法則 ‧ 數據視覺化 ‧ 台風控時 ‧ 第一組 (第一桶金) 與第二組 (房貸決策)</p>
              <div style="margin-top:6px;"><span class="pitch-badge badge-blue">Slide 01-10</span></div>
            </div>
            <div class="pitch-box" style="border-top:3px solid #b45309;">
              <h6>第二小時：組 3-6 與同儕互評</h6>
              <p>第三組 (半導體) ‧ 第四組 (AI ROI) ‧ 第五組 (ESG) ‧ 第六組 (Web3) ‧ 專家總講評</p>
              <div style="margin-top:6px;"><span class="pitch-badge badge-gold">Slide 11-20</span></div>
            </div>
            <div class="pitch-box" style="border-top:3px solid #059669;">
              <h6>第三小時：履歷化與 4 大金律</h6>
              <p>轉化個人 Portfolio 履歷 ‧ 表達三大氣場 ‧ 智財保護 ‧ 10分鐘 Pitch SOP</p>
              <div style="margin-top:6px;"><span class="pitch-badge badge-green">Slide 21-30</span></div>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>🎯 <strong>專屬互動活動：</strong>發表控時試算器 ➔ 期末同儕雙重加權精算器 ➔ 簡報達人大挑戰與個人反思報告！</p>
          </div>
        </div>
      `;
      break;

    case 3:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📐 期末專案簡報架構：商業說服四部曲</span>
            <span class="pitch-visual-tag">黃金邏輯鏈</span>
          </div>
          <div class="pitch-grid-4">
            <div class="pitch-box">
              <h6>1. 痛點共鳴</h6>
              <p><strong>Pain Point</strong></p>
              <p>以具體數字揭露目標受眾面臨的實質財務焦慮與困境。</p>
            </div>
            <div class="pitch-box">
              <h6>2. 創新解方</h6>
              <p><strong>Solution</strong></p>
              <p>提出具體可行、具市場差異化之商業方案或配置企劃。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>3. 財務嚴謹模型</h6>
              <p><strong>Financial Rigor</strong></p>
              <p>扎實現金流預測、折現率、ROI 試算與黑天鵝敏感度分析！</p>
            </div>
            <div class="pitch-box safe">
              <h6>4. 價值主張呼籲</h6>
              <p><strong>Call to Action</strong></p>
              <p>提煉最具說服力的量化願景，促成評審與投資人一致認同。</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#eff6ff; border-left:4px solid #1d4ed8;">
            <p>💡 <strong>邏輯閉環：</strong>每一個財務結論都源於前段痛點，每一項成本支出都有明確效益回報，絕無懸空假想！</p>
          </div>
        </div>
      `;
      break;

    case 4:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">⏱️ 專業財經簡報 10/20/30 法則 (Guy Kawasaki)</span>
            <span class="pitch-visual-tag">創投聖經</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box highlight">
              <h5 style="font-size:1.3rem; margin:0 0 4px 0; color:#1d4ed8;">10 頁</h5>
              <h6>投影片黃金上限</h6>
              <p>人類大腦短時間無法消化超過 10 個核心概念。去蕪存菁，只留最關鍵的論點！</p>
            </div>
            <div class="pitch-box gold">
              <h5 style="font-size:1.3rem; margin:0 0 4px 0; color:#b45309;">20 分鐘</h5>
              <h6>發表長度上限</h6>
              <p>投資人注意力極限為 20 分鐘（課堂精準濃縮為 8 分鐘發表 + 2 分鐘 Q&A）。</p>
            </div>
            <div class="pitch-box safe">
              <h5 style="font-size:1.3rem; margin:0 0 4px 0; color:#059669;">30 號字</h5>
              <h6>字體大小下限</h6>
              <p>絕對禁止小於 30pt！逼迫講者提煉 Headline，徹底消滅照著投影片念稿的惡習！</p>
            </div>
          </div>
          <div class="pitch-box danger" style="margin-top:10px;">
            <h6>🚫 簡報三大死穴</h6>
            <p><strong>(1) 投影片塞滿密密麻麻小字；(2) 講者背對評審看著大螢幕朗讀；(3) 時間掌控崩潰嚴重超時！</strong></p>
          </div>
        </div>
      `;
      break;

    case 5:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📊 視覺化數據表達：用圖表與關鍵數字打動評審</span>
            <span class="pitch-visual-tag">數據美學</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box danger">
              <h6>❌ 業餘表達：Excel 試算表大雜燴</h6>
              <p>直接截圖上百列儲存格，數字過小無法辨識，評審根本不知道你想表達什麼重點，只感到疲勞焦躁。</p>
            </div>
            <div class="pitch-box safe">
              <h6>✅ 專業表達：提煉 Headline Numbers</h6>
              <p><strong>1. 單一大數字突顯：</strong>如「首年 ROI 340%」或「省下 3,600 工時」。</p>
              <p><strong>2. 顏色高亮對比：</strong>用鮮明對比色標註累積淨資產轉折點。</p>
              <p><strong>3. 3 秒原則：</strong>評審在 3 秒內一眼看懂核心圖表結論！</p>
            </div>
          </div>
          <div class="pitch-box highlight" style="margin-top:10px;">
            <p>📈 <strong>圖表即語言：</strong>好的圖表自己會說話。刪除所有無關裝飾圖案，讓精煉的財務指標成為全場視覺焦點！</p>
          </div>
        </div>
      `;
      break;

    case 6:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🎤 簡報演練技巧：控時、眼神接觸與台風氣場</span>
            <span class="pitch-visual-tag">舞台實戰</span>
          </div>
          <div class="pitch-grid-4">
            <div class="pitch-box highlight">
              <h6>1. 嚴格控時</h6>
              <p>每頁平均停留 40-50 秒，以手勢或計時器精準把握 8 分鐘節奏。</p>
            </div>
            <div class="pitch-box safe">
              <h6>2. 眼神接觸</h6>
              <p>視線覆蓋評審與全場「左-中-右」三區，誠懇互動交流。</p>
            </div>
            <div class="pitch-box gold">
              <h6>3. 開放肢體</h6>
              <p>站姿挺拔，手勢自然舒展，切勿雙手抱胸或插口袋畏縮。</p>
            </div>
            <div class="pitch-box">
              <h6>4. 雙語專業度</h6>
              <p>準確發音 ROI, ESG, DSR, ETF 等術語，自信穩健流暢。</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#f0fdf4; border-left:4px solid #10b981;">
            <h6>💡 台風心態昇華</h6>
            <p>緊張是正常的生物本能！將緊張轉化為「迫不及待想與大家分享美好商業發現」的熱忱能量！</p>
          </div>
        </div>
      `;
      break;

    case 7:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🛡️ 評審問答 (Q&A) 應對戰術：防守與延伸價值</span>
            <span class="pitch-visual-tag">答辯精髓</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <h6>步驟 1：傾聽與致謝確認</h6>
              <p>「感謝評審的敏銳提問，您問的是在極端高通膨下，我們的折現率是否依然具備安全邊際...」</p>
            </div>
            <div class="pitch-box highlight">
              <h6>步驟 2：數據事實正面防守</h6>
              <p>「在我們的附錄第 12 頁敏感度分析中，已預設通膨率上調 1.5% 情境，淨現金流依然維持正數 12 萬元...」</p>
            </div>
            <div class="pitch-box safe">
              <h6>步驟 3：延伸策略性價值</h6>
              <p>「此外，我們更預備了 10% 彈性流動儲備作為緩衝，這證明團隊在規劃初期已建立嚴密之風控底線。」</p>
            </div>
          </div>
          <div class="pitch-box danger" style="margin-top:10px;">
            <h6>⚠️ 答辯大忌：推諉與爭吵</h6>
            <p>切忌打斷評審、切忌將責任推給「這不是我負責的算式」。全組一體同心，以專業與謙遜贏得全場尊重！</p>
          </div>
        </div>
      `;
      break;

    case 8:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📋 商業簡報評分標準：四大核心構面</span>
            <span class="pitch-visual-tag">量化準則</span>
          </div>
          <div class="pitch-grid-4">
            <div class="pitch-box highlight">
              <h5 style="font-size:1.1rem; margin:0 0 4px 0; color:#1d4ed8;">30% 權重</h5>
              <h6>專案邏輯與創新性</h6>
              <p>痛點是否真實、解方是否切實可行且具備商業亮點。</p>
            </div>
            <div class="pitch-box safe">
              <h5 style="font-size:1.1rem; margin:0 0 4px 0; color:#059669;">30% 權重</h5>
              <h6>財務模型與嚴謹度</h6>
              <p>公式計算精準無誤、現金流合理、敏感度測試充分。</p>
            </div>
            <div class="pitch-box gold">
              <h5 style="font-size:1.1rem; margin:0 0 4px 0; color:#b45309;">20% 權重</h5>
              <h6>台風表達與視覺美學</h6>
              <p>10/20/30 法則、控時精確、眼神互動流暢、投影片精美。</p>
            </div>
            <div class="pitch-box">
              <h5 style="font-size:1.1rem; margin:0 0 4px 0; color:#475569;">20% 權重</h5>
              <h6>Q&A 應對與團隊默契</h6>
              <p>回答精準有理、全體組員協同默契、謙遜有禮。</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>🏆 <strong>加權計算公式：</strong>最終成績 = 專家評審平均分 × 60% + 全班同儕互評平均分 × 40%，確保絕對客觀公正！</p>
          </div>
        </div>
      `;
      break;

    case 9:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🥇 第一組發表：大一新鮮人 30 萬理財第一桶金專案</span>
            <span class="pitch-visual-tag">小組發表 1</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box highlight">
              <h6>資產配置與定期定額模型</h6>
              <p><strong>核心配置：</strong>60% 0050 市值型 + 30% 00878 高股息 + 10% 活存緊急金。</p>
              <p><strong>月儲蓄投入：</strong>兼職家教打工每月定期定額 6,000 元，全數股息滾入再投資。</p>
              <p><strong>畢業成果：</strong>四年累積自提本金 28.8 萬元，複利終值達 <strong>33.8 萬元</strong>，順利破標！</p>
            </div>
            <div class="pitch-box safe">
              <h6>評審講評與亮點點評</h6>
              <p><strong>亮點：</strong>高度貼近大一生活現實，預留 10% 緊急預備金防禦突發意外，紀律嚴明。</p>
              <p><strong>建議：</strong>可補充四年期間若兼職收入中斷時之「暫停扣款與最低維持條款」因應方案。</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#eff6ff; border-left:4px solid #1d4ed8;">
            <p>👏 <strong>總體表現：</strong>台風穩健自然，投影片乾淨利索，Q&A 反應機敏，為全場發表奠定了極佳標竿！</p>
          </div>
        </div>
      `;
      break;

    case 10:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🎯 第一小時小結與專屬活動導引</span>
            <span class="pitch-visual-tag">階段檢核</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box safe">
              <h6>1. 10/20/30 法則</h6>
              <p>掌握 10 頁、20 分鐘、30 號字之創投發表心法，徹底擺脫念稿陋習。</p>
            </div>
            <div class="pitch-box safe">
              <h6>2. 視覺化 Headline</h6>
              <p>學會提煉核心 KPI，讓財務數據圖表在 3 秒內清晰說話。</p>
            </div>
            <div class="pitch-box safe">
              <h6>3. 第一組成功典範</h6>
              <p>第一桶金專案展示了兼職儲蓄與 ETF 複利結合之嚴謹可行性。</p>
            </div>
          </div>
          <div class="pitch-box highlight" style="margin-top:12px;">
            <h6>🚀 點擊下方專屬活動：商業簡報發表控時與評分標準試算器</h6>
            <p>親自試算各階段建議配時（引言/財務/價值/Q&A），精準計算每頁停留秒數，杜絕超時扣分！</p>
          </div>
        </div>
      `;
      break;

    case 11:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🥈 第二組發表：租房 vs. 買房財務決策與房貸負擔率</span>
            <span class="pitch-visual-tag">小組發表 2</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box highlight">
              <h6>30 年動態財務對比模型</h6>
              <p><strong>個案標的：</strong>新北市 1,500 萬青年首購宅 vs 同地段月租 2.5 萬。</p>
              <p><strong>新青安試算：</strong>貸款 1,000 萬 40 年期，寬限期後月供約 3.4 萬，DSR 房貸負擔率控制在 35%。</p>
              <p><strong>結論剖析：</strong>買房具備強制儲蓄與抗通膨資產鎖定；租屋若將差額嚴格投入 0050，總流動資產更高！</p>
            </div>
            <div class="pitch-box safe">
              <h6>評審亮點與盲點反饋</h6>
              <p><strong>亮點：</strong>清晰量化了「房貸負擔率警戒線 (35%)」與持有成本（房屋稅、管理費、修繕準備金）。</p>
              <p><strong>優化：</strong>租屋策略假設同學「能 30 年不間斷將差額投入股市」，人性克服難度極高，需補充心態防護。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 12:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🥉 第三組發表：半導體台積電護城河與 0050 投資組合</span>
            <span class="pitch-visual-tag">小組發表 3</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box highlight">
              <h6>護國神山與指數權重深度剖析</h6>
              <p><strong>技術護城河：</strong>先進製程 2 奈米 GAA 與 CoWoS 先進封裝產能全球獨佔逾 90%。</p>
              <p><strong>資本支出效益：</strong>年化數百億美元 Capex 帶動台灣耗材、廠務設備供應鏈千億產值。</p>
              <p><strong>配置優化：</strong>鑑於 0050 中台積電佔比突破 50%，提出適度搭配美國費半 SOXX 分散地緣政治風險！</p>
            </div>
            <div class="pitch-box gold">
              <h6>評審亮點與盲點反饋</h6>
              <p><strong>亮點：</strong>產業研究深度達到外商研報級別，供應鏈連鎖效應分析極為深刻精闢！</p>
              <p><strong>優化：</strong>投影片文字稍微密集，部分產業術語可改以製程演進圖表呈現，視覺化更佳。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 13:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🤖 第四組發表：生成式 AI 工具輔助企業效率與 ROI 部署</span>
            <span class="pitch-visual-tag">小組發表 4</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box highlight">
              <h6>中小電商 30 人團隊導入模型</h6>
              <p><strong>工具矩陣：</strong>ChatGPT Plus + Midjourney + Notion AI 自動化行銷文案與客服。</p>
              <p><strong>工時價值精算：</strong>每日平均每人釋放 1.8 小時工時，時薪 250 元計，年化工時價值達 291.6 萬元！</p>
              <p><strong>投資報酬率：</strong>扣除年化軟體授權 30 萬元，淨收益 261.6 萬元，<strong>首年 ROI 高達 340%</strong>！</p>
            </div>
            <div class="pitch-box safe">
              <h6>評審亮點與盲點反饋</h6>
              <p><strong>亮點：</strong>數據視覺化極為亮眼，Headline Number 抓人眼球，展現了強大的商業量化說服力！</p>
              <p><strong>優化：</strong>需補充企業機密數據洩漏防範措施，以及員工面對 AI 導入之抗拒心理教育訓練機制。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 14:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🌱 第五組發表：綠色金融 ESG (00878) 永續資產配置</span>
            <span class="pitch-visual-tag">小組發表 5</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box highlight">
              <h6>碳定價經濟學與永續指數抗震力</h6>
              <p><strong>政策衝擊：</strong>台灣碳費每噸 300 元開徵，高排碳企業年繳數千萬碳費，直接侵蝕淨利率 5%-10%。</p>
              <p><strong>永續選股實證：</strong>國泰永續高股息 (00878) 剔除高碳排爭議股，投組碳密集度較大盤降低 22%。</p>
              <p><strong>報酬波動：</strong>近三年歷史回測顯示，ESG 投組在市場回調時下行波動率降低 1.8%，實現綠色抗震。</p>
            </div>
            <div class="pitch-box gold">
              <h6>評審亮點與盲點反饋</h6>
              <p><strong>亮點：</strong>緊密扣合國際歐盟 CBAM 趨勢與台積電 RE100 綠電承諾，兼具社會責任與投資收益。</p>
              <p><strong>優化：</strong>可進一步戳破「漂綠公關」案例，教導投資人如何檢視企業真正之第三方查證溫室氣體盤查清冊。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 15:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🪙 第六組發表：Web3 數位資產 5% 避險配置與冷錢包</span>
            <span class="pitch-visual-tag">小組發表 6</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box highlight">
              <h6>5% 衛星避險配置與資安防禦體系</h6>
              <p><strong>核心與衛星：</strong>95% 傳統大盤 0050 + 5% 主流加密貨幣 (比特幣 70% + 以太幣 30%)。</p>
              <p><strong>非對稱數學：</strong>比特幣飆漲 200% 為投組增厚 10% 報酬；即便黑天鵝暴跌 80%，本金虧損僅 4,000 元！</p>
              <p><strong>資安防禦：</strong>嚴守「Not your keys not your coins」，採硬體冷錢包離線抄寫 12 助記詞，遠離地下 OTC。</p>
            </div>
            <div class="pitch-box safe">
              <h6>評審亮點與盲點反饋</h6>
              <p><strong>亮點：</strong>跳脫盲目幣圈投機，以避險基金非對稱數學與嚴格冷錢包資安詮釋 Web3，極具說服力！</p>
              <p><strong>優化：</strong>可增加台灣金管會 VASP 合規洗錢防制申報名單之查驗演示，強化大一新鮮人防詐防身指引。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 16:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🤝 專家同儕互評 (Peer Review) 機制與建設性回饋</span>
            <span class="pitch-visual-tag">同理反饋</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box safe">
              <h6>1. 先肯定亮點 (Praise)</h6>
              <p>具體指出對方在簡報邏輯、財務試算或台風表達上最打動你的 2-3 個優點，給予正向增強。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>2. 建設性建議 (Specific Suggestion)</h6>
              <p>以同理心出發，明確點出一項「若能補強會讓專案更完美的具體假設或數據漏洞」，絕非惡意攻訐。</p>
            </div>
            <div class="pitch-box">
              <h6>3. 杜絕主觀偏見 (Unbiased)</h6>
              <p>嚴格依循評分指標（30/30/20/20），不因私人交情打人情分數，落實專業客觀評鑑。</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>💡 <strong>評鑑即修煉：</strong>學會客觀評審別人的作品，是磨練自己批判性思考與商業洞察力最有效的高速途徑！</p>
          </div>
        </div>
      `;
      break;

    case 17:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">👨‍🏫 教官與專家評審總講評：亮點、破綻與優化建議</span>
            <span class="pitch-visual-tag">專家觀點</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box safe">
              <h6>🌟 全體六大共通卓越亮點</h6>
              <p><strong>1. 扎實數據底蘊：</strong>每一組皆擺脫空談，以真實 Excel 公式與現金流說話。</p>
              <p><strong>2. 跨領域深度融合：</strong>將 16 週分散的主題融會貫通為自洽的商業企劃。</p>
              <p><strong>3. 團隊分工默契：</strong>全體組員各司其職，台上銜接流暢自然，展現卓越凝聚力。</p>
            </div>
            <div class="pitch-box danger">
              <h6>⚠️ 未來進階需優化之處</h6>
              <p><strong>1. 黑天鵝壓力測試：</strong>對通膨暴增或市場崩盤之極端假設仍可更深化。</p>
              <p><strong>2. 投影片視覺留白：</strong>少數組別文字密度偏高，需持續貫徹 30 號字原則。</p>
              <p><strong>3. 落地執行追蹤：</strong>建議制定清晰的行動甘特圖，避免企劃流於紙上談兵。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 18:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📖 卓越簡報案例拆解：將枯燥財經數字轉化為動人故事</span>
            <span class="pitch-visual-tag">商業敘事</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <h6>設定英雄主角 (Hero)</h6>
              <p>主角是大一初入社會的新鮮人，面臨通膨高漲、低薪焦慮與買房無望的重重財務怪獸。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>賦予魔法寶劍 (Weapon)</h6>
              <p>你們的財務企劃與投資模型（0050+00878、冷錢包、AI 賦能），是幫助英雄披荊斬棘的利刃！</p>
            </div>
            <div class="pitch-box safe">
              <h6>抵達財富彼岸 (Transformation)</h6>
              <p>透過四年自律儲蓄與複利積累，英雄收穫了人生的第一桶金，重奪生命自主權！</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>✨ <strong>數字需要靈魂：</strong>冷冰冰的折現率與報酬率無法打動人心，但與人生命運緊扣的奮鬥故事，將讓評審終生難忘！</p>
          </div>
        </div>
      `;
      break;

    case 19:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📱 簡報道具與現場互動：問答設計與 Executive Summary</span>
            <span class="pitch-visual-tag">商務禮儀</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <h6>1. 動態試算 QR Code</h6>
              <p>簡報開場置入組員開發之線上試算器 QR Code，引導評審拿起手機同步操作，創造沉浸式互動。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>2. 一頁式商業企劃書</h6>
              <p>上台前主動呈遞精裝版 Executive Summary 雙面紙卡，包含核心 KPI 與團隊介紹，展現頂級商務禮貌。</p>
            </div>
            <div class="pitch-box safe">
              <h6>3. 預備 Appendix 附錄</h6>
              <p>將繁複的敏感度矩陣與數據來源放在第 10 頁後之附錄，Q&A 被問到時一秒切換，展現無懈可擊準備！</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#eff6ff; border-left:4px solid #1d4ed8;">
            <p>🎩 <strong>細節決定成敗：</strong>專業的道具與細緻的禮儀，往往能在最後關頭讓評審給出全場最高分的榮譽！</p>
          </div>
        </div>
      `;
      break;

    case 20:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🎯 第二小時小結與專屬活動導引</span>
            <span class="pitch-visual-tag">階段檢核</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box safe">
              <h6>1. 全體六組圓滿登台</h6>
              <p>從第一桶金到 Web3 避險，全班展現了令人驚嘆的商管素養與財務建模水準。</p>
            </div>
            <div class="pitch-box safe">
              <h6>2. 專家總講評啟發</h6>
              <p>吸收評審團關於黑天鵝壓力測試與視覺留白之真知灼見，持續精進昇華。</p>
            </div>
            <div class="pitch-box safe">
              <h6>3. 同儕互評共好</h6>
              <p>以客觀公正量化指標評核各組，實踐建設性回饋與共好學習文化。</p>
            </div>
          </div>
          <div class="pitch-box highlight" style="margin-top:12px;">
            <h6>🚀 點擊下方專屬活動：期末同儕互評與組別總成績精算器</h6>
            <p>親自輸入各組在四維度的得分，精算專家 60% 與同儕 40% 加權總分與等第排名！</p>
          </div>
        </div>
      `;
      break;

    case 21:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">💼 打造個人職場簡報亮點：將期末專案納入履歷 Portfolio</span>
            <span class="pitch-visual-tag">生涯資產</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box highlight">
              <h6>1. 提煉 2 頁 PDF 成果精華</h6>
              <p>去除長篇大論，聚焦「專案背景 ➔ 個人模型貢獻 ➔ 關鍵 KPI 成果 ➔ 評審獲獎評語」。</p>
            </div>
            <div class="pitch-box safe">
              <h6>2. LinkedIn 與求職檔案上傳</h6>
              <p>將企劃書、試算器連結與發表照片上傳至個人數位檔案，展現大一即具備商管實戰之硬實力。</p>
            </div>
            <div class="pitch-box gold">
              <h6>3. 外商實習敲門磚</h6>
              <p>面試時主動拿出這份真實商業專案，你已將 95% 只能泛泛而談「修過課」的競爭者遠遠甩在身後！</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#f0fdf4; border-left:4px solid #10b981;">
            <p>🌟 <strong>觀念昇華：</strong>課堂作業不是交完即忘的廢紙，而是你大學四年自我品牌塑造中最耀眼的基石！</p>
          </div>
        </div>
      `;
      break;

    case 22:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">👑 大一新鮮人簡報表達三大核心能力：邏輯、視覺與氣場</span>
            <span class="pitch-visual-tag">能力三芒星</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box highlight">
              <h6>1. 邏輯力 (Logic)</h6>
              <p>架構層次井然有序，論點與數據環環相扣。經得起評審最嚴厲的財務推敲，毫無邏輯跳躍破綻。</p>
            </div>
            <div class="pitch-box gold">
              <h6>2. 視覺力 (Visual)</h6>
              <p>版面呼吸留白適度，色彩搭配和諧統一，重點指標一目了然，讓評審視覺體驗極致舒適。</p>
            </div>
            <div class="pitch-box safe">
              <h6>3. 氣場力 (Presence)</h6>
              <p>挺拔自信的體態、真誠堅定的眼神與充滿感染力的語調，即使遇到困難提問亦從容不迫。</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#eff6ff; border-left:4px solid #1d4ed8;">
            <p>🏆 <strong>終身受用：</strong>這三大能力將陪伴你穿梭大學商賽、研究所甄試、外商面試到未來的董事會報告，成為你終生受益的核心武器！</p>
          </div>
        </div>
      `;
      break;

    case 23:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🔄 簡報後續追蹤：專案修訂 SOP 與行動方案落地執行</span>
            <span class="pitch-visual-tag">落地執行</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <h6>步驟 1：專案覆盤 (Retrospective)</h6>
              <p>小組課後召開覆盤會議，盤點專家評審與同儕提出的每一條建議，記錄於覆盤清單中。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>步驟 2：財務模型參數優化</h6>
              <p>重新校準折現率、通膨率與黑天鵝回撤假設，產出專案 Final Version 2.0 終極版。</p>
            </div>
            <div class="pitch-box safe">
              <h6>步驟 3：真金白銀自律落地</h6>
              <p>將簡報中的第一桶金或 0050 配置計畫，落實為本月真正在券商開戶扣款的具體行動！</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#f0fdf4; border-left:4px solid #10b981;">
            <p>🎯 <strong>知行合一：</strong>簡報發表的掌聲只是序幕，唯有將知識化為生活的自律實踐，才是財經探索的終極真諦！</p>
          </div>
        </div>
      `;
      break;

    case 24:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">⚖️ 期末發表資安與智財權保護：避免簡報侵犯著作權</span>
            <span class="pitch-visual-tag">學術誠信</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box safe">
              <h6>1. 數據來源明確標註</h6>
              <p>投影片所有統計圖表下方，皆應清晰標註「資料來源：台灣證交所 / 金管會 / CoinGecko」等權威出處。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>2. 商用無版權圖庫</h6>
              <p>避免隨機使用網路未授權圖片，優先選用 Unsplash, Pexels 或開源向量圖示庫，嚴防版權糾紛。</p>
            </div>
            <div class="pitch-box">
              <h6>3. AI 輔助生成透明揭露</h6>
              <p>若圖表或摘要由 ChatGPT, Midjourney 輔助產出，主動於簡報備註聲明，展現嚴謹之學術誠信態度。</p>
            </div>
          </div>
          <div class="pitch-box danger" style="margin-top:10px;">
            <h6>🚨 職場警示</h6>
            <p>在外商職場中，簡報未經授權盜圖可能面臨數百萬侵權訴訟與商譽損害，大一即養成標註出處之嚴格習慣！</p>
          </div>
        </div>
      `;
      break;

    case 25:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📊 實證數據調取：查看全班同儕互評數據與四芒星雷達</span>
            <span class="pitch-visual-tag">客觀指標</span>
          </div>
          <div class="pitch-grid-4">
            <div class="pitch-box highlight">
              <h6>專案邏輯 (30%)</h6>
              <h5 style="font-size:1.2rem; color:#1d4ed8; margin:4px 0;">91.4 分</h5>
              <p>全班痛點挖掘深刻，解方論述自洽嚴密。</p>
            </div>
            <div class="pitch-box safe">
              <h6>財務模型 (30%)</h6>
              <h5 style="font-size:1.2rem; color:#059669; margin:4px 0;">93.2 分</h5>
              <p>公式精算無誤，現金流與敏感度表現亮眼！</p>
            </div>
            <div class="pitch-box gold">
              <h6>台風視覺 (20%)</h6>
              <h5 style="font-size:1.2rem; color:#b45309; margin:4px 0;">88.6 分</h5>
              <p>多數組別遵守 30 號字，控時精準度極高。</p>
            </div>
            <div class="pitch-box">
              <h6>Q&A 應對 (20%)</h6>
              <h5 style="font-size:1.2rem; color:#475569; margin:4px 0;">90.1 分</h5>
              <p>答辯不慌不忙，引用敏感度分析正面迎擊。</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>🌟 <strong>整體總評：</strong>全班綜合加權平均高達 <strong>91.2 分 (A+ 等第)</strong>！每位同學都展現了遠超大一預期的頂尖商管硬核水準！</p>
          </div>
        </div>
      `;
      break;

    case 26:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">📜 大一新鮮人實戰財經簡報四大金律</span>
            <span class="pitch-visual-tag">終身法寶</span>
          </div>
          <div class="pitch-grid-4">
            <div class="pitch-box highlight">
              <h6>第一金律：讓數據說話</h6>
              <p>每一張投影片有且僅有一個核心 Headline Number，不講空話，以事實服人！</p>
            </div>
            <div class="pitch-box gold">
              <h6>第二金律：貫徹少即是多</h6>
              <p>字體絕不小於 30 號字，大量留白，徹底消滅照著螢幕念稿的惡習！</p>
            </div>
            <div class="pitch-box safe">
              <h6>第三金律：誠實正面答辯</h6>
              <p>面對質疑先致謝確認，以敏感度分析與數據事實化解評審難題！</p>
            </div>
            <div class="pitch-box">
              <h6>第四金律：以真實痛點為源</h6>
              <p>一切商業與財務規劃的初衷，是為了解決真實社會痛點與創造大眾福祉！</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>🏆 <strong>終生守護：</strong>牢記這四大金律，任何商業簡報舞台，都將成為你展現專業與魅力的璀璨主場！</p>
          </div>
        </div>
      `;
      break;

    case 27:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">⏱️ 簡報試算實例：8 分鐘精準財經 Pitching 流程 SOP</span>
            <span class="pitch-visual-tag">排練節奏</span>
          </div>
          <div class="pitch-grid-4">
            <div class="pitch-box">
              <h6>00:00 - 01:00</h6>
              <p><strong>震撼痛點引言 (1分)</strong></p>
              <p>引出真實數據，建立目標受眾強烈情感共鳴。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>01:00 - 02:30</h6>
              <p><strong>創新商業解方 (1.5分)</strong></p>
              <p>提出企劃架構、產品定位與市場差異化亮點。</p>
            </div>
            <div class="pitch-box safe">
              <h6>02:30 - 05:30</h6>
              <p><strong>財務模型深水區 (3分)</strong></p>
              <p>現金流預測、折現率、ROI 試算與敏感度測試！</p>
            </div>
            <div class="pitch-box gold">
              <h6>05:30 - 08:00</h6>
              <p><strong>落地呼籲與 Q&A (2.5分)</strong></p>
              <p>總結核心價值主張，自信優雅進入評審答辯！</p>
            </div>
          </div>
          <div class="pitch-box" style="margin-top:10px; background:#eff6ff; border-left:4px solid #1d4ed8;">
            <p>🎯 <strong>秒數控制：</strong>平均每頁停留 45 秒，預留 2 分鐘給評審充分提問，這就是國際級商業 Pitch 的完美黃金比例！</p>
          </div>
        </div>
      `;
      break;

    case 28:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🌟 展現學習成果：邁向卓越財經溝通者的總里程碑</span>
            <span class="pitch-visual-tag">成長蛻變</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <h6>從盲目跟風到獨立思考</h6>
              <p>十六週前大家可能對財經專案感到陌生；今天大家已能親手建構 30 年現金流與敏感度模型。</p>
            </div>
            <div class="pitch-box highlight">
              <h6>從怯場念稿到自信 Pitch</h6>
              <p>徹底克服了舞台恐懼，學會用眼神與評審交流，用 Headline Numbers 簡潔有力傳遞理念。</p>
            </div>
            <div class="pitch-box safe">
              <h6>從學業作業到人生資產</h6>
              <p>將期末發表的結晶轉化為大一學習歷程 Portfolio，提前為大二商賽與大三實習積累無可取代的競爭力！</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>🎓 <strong>愛因斯坦名言：</strong>「如果你不能向大眾解釋清楚，說明你還未真正理解。」恭喜全體同學，你們已真正理解並掌握了財經金融的博大智慧！</p>
          </div>
        </div>
      `;
      break;

    case 29:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🗺️ 第十七週全景知識體系圖與觀念整合</span>
            <span class="pitch-visual-tag">知識網絡</span>
          </div>
          <div class="pitch-grid-3">
            <div class="pitch-box" style="border-left:4px solid #1d4ed8;">
              <h6>第一小時：法則與組 1-2</h6>
              <p>10/20/30 法則 ‧ 30號字杜絕念稿 ‧ Headline 數據視覺化 ‧ 第一桶金 0050/00878 ‧ 租買房 30 年房貸負擔率</p>
            </div>
            <div class="pitch-box" style="border-left:4px solid #b45309;">
              <h6>第二小時：組 3-6 與同儕互評</h6>
              <p>台積電 2nm GAA 護城河 ‧ AI 企業導入 340% ROI ‧ ESG 碳費抗震 ‧ Web3 5% 避險配置 ‧ 專家總評量</p>
            </div>
            <div class="pitch-box" style="border-left:4px solid #059669;">
              <h6>第三小時：履歷化與 4 大金律</h6>
              <p>個人 Portfolio 履歷化 ‧ 邏輯視覺氣場三芒星 ‧ 智財保護標註出處 ‧ 8分鐘 Pitch SOP ‧ 邁向卓越溝通者</p>
            </div>
          </div>
          <div class="pitch-box safe" style="margin-top:10px;">
            <p>🏆 <strong>總評量精華：</strong>專業的商業簡報是理智與情感的完美交響樂。以數據為骨骼，以故事為靈魂，以自律為品格！</p>
          </div>
        </div>
      `;
      break;

    case 30:
      container.innerHTML = `
        <div class="pitch-visual-card">
          <div class="pitch-visual-header">
            <span class="pitch-visual-title">🎓 學習反思與第十八週預告：學期總結與終身宣言</span>
            <span class="pitch-visual-tag">最終盛典</span>
          </div>
          <div class="pitch-grid-2">
            <div class="pitch-box safe">
              <h6>第十七週圓滿落幕</h6>
              <p>熱烈祝賀全體組別順利完成期末大發表！大家在台上的光芒與嚴謹的財務模型，已深深震撼了所有評審與同儕！</p>
            </div>
            <div class="pitch-box gold">
              <h6>下週震撼最終回：第十八週學期大總結</h6>
              <p><strong>主題：</strong>「學期總結、財經探索藍圖與大一新鮮人終身宣言」</p>
              <p>整合 18 週全景核心技能樹，頒發結業榮譽，並由每位同學親筆簽署專屬於自己一生的「財富自由終身宣言」！</p>
            </div>
          </div>
          <div class="pitch-box highlight" style="margin-top:10px;">
            <h6>🎉 課後行動</h6>
            <p>完成第十七週反思作業，整理本組專案修訂版，準備迎接下週最神聖、最感動的 115 學年度結業大典！</p>
          </div>
        </div>
      `;
      break;

    default:
      container.innerHTML = `<div class="pitch-visual-card"><div class="pitch-visual-header"><span class="pitch-visual-title">Slide ${id}: ${slide.title}</span></div><p>${slide.subtitle}</p></div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: PITCH TIMING LAB ----------------------
function initPitchRubricLab() {
  const lab = W17_ACTIVITIES_DATA.hour1Lab;
  if (!lab) return;

  const totalMinInput = document.getElementById('pitchTotalMinutes');
  const slidesCountInput = document.getElementById('pitchSlidesCount');
  const qaMinInput = document.getElementById('pitchQaMinutes');
  const speechRateInput = document.getElementById('pitchSpeechRate');

  function calculatePitchTiming() {
    const totalMin = parseFloat(totalMinInput?.value || '8');
    const slides = parseInt(slidesCountInput?.value || '10', 10);
    const qaMin = parseFloat(qaMinInput?.value || '2');
    const speechRate = parseInt(speechRateInput?.value || '180', 10);

    const pitchTimeMin = Math.max(1, totalMin - qaMin);
    const pitchTimeSec = pitchTimeMin * 60;
    const secPerSlide = Math.round(pitchTimeSec / Math.max(1, slides));
    const totalWordCountEst = Math.round(pitchTimeMin * speechRate);

    // Timing distribution
    const introSec = Math.round(pitchTimeSec * 0.15);
    const solutionSec = Math.round(pitchTimeSec * 0.20);
    const financeSec = Math.round(pitchTimeSec * 0.45);
    const ctaSec = Math.round(pitchTimeSec * 0.20);

    // Overtime risk check
    let riskLevel = "正常 (低風險)";
    let riskColor = "#059669";
    if (secPerSlide < 30) {
      riskLevel = "超快節奏 (有囫圇吞棗風險，建議減頁數)";
      riskColor = "#dc2626";
    } else if (secPerSlide > 70) {
      riskLevel = "過慢拖沓 (有超時或冷場風險，建議充實內容)";
      riskColor = "#d97706";
    }

    // Outputs
    const outSecPerSlide = document.getElementById('outSecPerSlide');
    const outTotalWords = document.getElementById('outTotalWords');
    const outFinanceTime = document.getElementById('outFinanceTime');
    const outTimingRisk = document.getElementById('outTimingRisk');
    const outTimingDiagnosis = document.getElementById('outTimingDiagnosis');

    if (outSecPerSlide) outSecPerSlide.textContent = `${secPerSlide} 秒 / 頁`;
    if (outTotalWords) outTotalWords.textContent = `約 ${totalWordCountEst.toLocaleString()} 字`;
    if (outFinanceTime) outFinanceTime.textContent = `${Math.floor(financeSec / 60)}分${financeSec % 60}秒`;
    if (outTimingRisk) {
      outTimingRisk.textContent = riskLevel;
      outTimingRisk.style.color = riskColor;
    }

    if (outTimingDiagnosis) {
      outTimingDiagnosis.innerHTML = `
        <strong>⏱️ 配時策略建議：</strong>發表時長 ${pitchTimeMin} 分鐘（留 ${qaMin} 分鐘 Q&A）。建議節奏：
        引言痛點約 <strong>${introSec} 秒</strong> ➔ 商業解方約 <strong>${solutionSec} 秒</strong> ➔ 
        財務模型深水區約 <strong>${financeSec} 秒</strong> ➔ 價值呼籲約 <strong>${ctaSec} 秒</strong>。
        每頁投影片停留 <strong>${secPerSlide} 秒</strong> 符合黃金律動！
      `;
    }
  }

  [totalMinInput, slidesCountInput, qaMinInput, speechRateInput].forEach(el => {
    el?.addEventListener('input', calculatePitchTiming);
    el?.addEventListener('change', calculatePitchTiming);
  });

  // Presets
  document.querySelectorAll('.btn-preset-pitch').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-pitch').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pKey = e.target.getAttribute('data-preset');
      const preset = lab.presets[pKey];
      if (!preset) return;

      if (totalMinInput) totalMinInput.value = preset.totalMinutes;
      if (slidesCountInput) slidesCountInput.value = preset.slidesCount;
      if (qaMinInput) qaMinInput.value = preset.qaMinutes;
      if (speechRateInput) speechRateInput.value = preset.speechRateWpm;

      calculatePitchTiming();
    });
  });

  calculatePitchTiming();
}

// ==================== HOUR 2 LAB: 期末同儕互評與組別總成績精算器 ====================

// ---------------------- 2 HOUR ACTIVITY: PEER REVIEW LAB ----------------------
function initPeerReviewLab() {
  const lab = W17_ACTIVITIES_DATA.hour2Lab;
  if (!lab) return;

  const groupSelect = document.getElementById('evalGroupSelect');
  const logicInput = document.getElementById('scoreLogic');
  const financeInput = document.getElementById('scoreFinance');
  const visualInput = document.getElementById('scoreVisual');
  const qaInput = document.getElementById('scoreQa');
  const expertInput = document.getElementById('scoreExpert');

  function calculatePeerScore() {
    const sLogic = parseFloat(logicInput?.value || '90');
    const sFinance = parseFloat(financeInput?.value || '90');
    const sVisual = parseFloat(visualInput?.value || '90');
    const sQa = parseFloat(qaInput?.value || '90');
    const sExpert = parseFloat(expertInput?.value || '90');

    // Peer weighted score (30% logic, 30% finance, 20% visual, 20% qa)
    const peerScore = (sLogic * 0.30) + (sFinance * 0.30) + (sVisual * 0.20) + (sQa * 0.20);
    // Final weighted score (Expert 60% + Peer 40%)
    const finalScore = (sExpert * 0.60) + (peerScore * 0.40);

    let grade = "A+";
    let gradeColor = "#059669";
    if (finalScore >= 90) { grade = "A+ (卓越特優)"; gradeColor = "#059669"; }
    else if (finalScore >= 85) { grade = "A (優等)"; gradeColor = "#1d4ed8"; }
    else if (finalScore >= 80) { grade = "A- (良好)"; gradeColor = "#0284c7"; }
    else if (finalScore >= 75) { grade = "B+ (中上)"; gradeColor = "#b45309"; }
    else { grade = "B (尚可)"; gradeColor = "#dc2626"; }

    // Outputs
    const outPeerWeighted = document.getElementById('outPeerWeighted');
    const outFinalScore = document.getElementById('outFinalScore');
    const outGradeLevel = document.getElementById('outGradeLevel');
    const outPeerFeedback = document.getElementById('outPeerFeedback');

    if (outPeerWeighted) outPeerWeighted.textContent = `${peerScore.toFixed(1)} 分`;
    if (outFinalScore) outFinalScore.textContent = `${finalScore.toFixed(1)} 分`;
    if (outGradeLevel) {
      outGradeLevel.textContent = grade;
      outGradeLevel.style.color = gradeColor;
    }

    if (outPeerFeedback) {
      outPeerFeedback.innerHTML = `
        <strong>📝 綜合客觀評核回饋：</strong>該組財務模型嚴謹度得分 <strong>${sFinance} 分</strong>，台風視覺化 <strong>${sVisual} 分</strong>。
        雙重加權最終總得分為 <strong>${finalScore.toFixed(1)} 分</strong>，榮獲 <strong>${grade}</strong> 等第！
        展現了極高的商管理論轉化實戰水準，值得全班借鑑！
      `;
    }
  }

  [groupSelect, logicInput, financeInput, visualInput, qaInput, expertInput].forEach(el => {
    el?.addEventListener('input', calculatePeerScore);
    el?.addEventListener('change', calculatePeerScore);
  });

  // Presets
  document.querySelectorAll('.btn-preset-eval').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-eval').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pKey = e.target.getAttribute('data-preset');
      const preset = lab.presets[pKey];
      if (!preset) return;

      if (groupSelect) groupSelect.value = String(preset.groupId);
      if (logicInput) logicInput.value = preset.logicScore;
      if (financeInput) financeInput.value = preset.financeScore;
      if (visualInput) visualInput.value = preset.visualScore;
      if (qaInput) qaInput.value = preset.qaScore;
      if (expertInput) expertInput.value = preset.expertScore;

      calculatePeerScore();
    });
  });

  calculatePeerScore();
}

// ---------------------- 3 HOUR ACTIVITY: PITCH GAME ----------------------
// ==================== HOUR 3 GAME: 財經簡報表達達人大挑戰 ====================
let currentQuestionIndex = 0;
let userScore = 0;

function initPitchGame() {
  const container = document.getElementById('pitchGameContainer');
  if (!container) return;
  renderGameQuestion();
}

function renderGameQuestion() {
  const container = document.getElementById('pitchGameContainer');
  if (!container) return;
  const questions = W17_ACTIVITIES_DATA.game;

  if (currentQuestionIndex >= questions.length) {
    const pass = userScore >= 3;
    container.innerHTML = `
      <div style="text-align:center; padding: 24px;">
        <div style="font-size: 3rem; margin-bottom: 8px;">${pass ? '🏆' : '🎤'}</div>
        <h3 style="color:${pass ? '#059669' : '#1d4ed8'}; font-weight:900;">${pass ? '恭喜通關！榮膺卓越財經表達大師' : '挑戰完成！請持續雕琢簡報與答辯台風'}</h3>
        <p style="font-size:1.1rem; margin:12px 0;">你的總得分：<strong style="font-size:1.4rem; color:#1d4ed8;">${userScore} / ${questions.length}</strong> 關</p>
        <p style="color:#64748b; font-size:0.92rem; max-width:540px; margin:0 auto 20px auto;">
          ${pass ? '卓越非凡！你已完全精通 Kawasaki 10/20/30 法則、Headline 數據視覺化、Q&A 敏感度答辯與 Portfolio 履歷化心法！' : '請務必重溫 30 號字原則、每頁 45 秒控時節奏與正面面對評審質疑的答辯 SOP，持續超越自我！'}
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartGame()" style="background:#1d4ed8;">🔄 再次挑戰</button>
      </div>
    `;
    return;
  }

  const q = questions[currentQuestionIndex];
  container.innerHTML = `
    <div style="padding: 12px 18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #bfdbfe; padding-bottom:8px; margin-bottom:12px;">
        <span style="font-weight:800; color:#1e40af;">關卡 ${q.id} / ${questions.length}：${q.title}</span>
        <span style="font-size:0.85rem; font-weight:700; color:#64748b;">目前累積分數: ${userScore}</span>
      </div>
      <h4 style="color:#1e293b; font-size:1.05rem; margin-bottom:14px; line-height:1.5;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:10px;" id="gameOptionsContainer">
        ${q.options.map((opt, idx) => `
          <button class="game-opt-btn" onclick="submitGameAnswer(${idx})" style="
            text-align:left; padding:12px 16px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:0.9rem; cursor:pointer; transition:all 0.2s; color:#334155; line-height:1.4;
          " onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#bfdbfe';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1';">
            <strong>${['A', 'B', 'C', 'D'][idx]}.</strong> ${opt}
          </button>
        `).join('')}
      </div>
      <div id="gameExplanationBox" style="display:none; margin-top:14px; padding:12px; border-radius:8px; font-size:0.88rem; line-height:1.5;"></div>
      <div id="gameNextBtnRow" style="display:none; margin-top:14px; text-align:right;">
        <button class="btn-nav-step btn-primary-step" onclick="nextGameQuestion()" style="background:#1d4ed8;">下一關 ▶</button>
      </div>
    </div>
  `;
}

function submitGameAnswer(selectedIdx) {
  const q = W17_ACTIVITIES_DATA.game[currentQuestionIndex];
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
    localStorage.setItem('W17_HOMEWORK_DATA', JSON.stringify(APP_STATE.homeworkData));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W17_HOMEWORK_DATA');
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
  const tpl = W17_ACTIVITIES_DATA.homeworkTemplate;
  if (!tpl) return;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = '林宥廷';
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = 'B11307116';
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = tpl.title || '期末財經專案發表實戰總反思與跨領域專業溝通躍升計畫';
  if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = tpl.dim1 || '';
  if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = tpl.dim2 || '';
  if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = tpl.dim3 || '';
  if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = tpl.dim4 || '';
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = 'A+ (全面且具備實戰避險可行性)';
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = '以精密結構掌握 10 分鐘控時節奏，結合紮實財務模型與直擊痛點的故事力，從同儕回饋中反思迭代，錘鍊終身商業溝通核心競爭力！';
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

  const md = `# 115學年度「管理探索二」第十七週課堂實務作業
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、期末個人與小組財經簡報發表亮點與架構反思 (25%)
${dim1}

### 二、簡報發表控時技巧與現場 Q&A 應對盲點檢討 (25%)
${dim2}

### 三、同儕互評回饋整合與個人專業表達能力躍升計畫 (25%)
${dim3}

### 四、大學未來三年商業簡報與跨領域溝通落地實踐 SOP (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十七週作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 17,
    topic: '期末專案發表實戰財經簡報與總評量',
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
  a.download = `W17_作業_${data.studentId || '未命名'}.json`;
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

  let filtered = W17_SLIDES_DATA.filter(s => {
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
