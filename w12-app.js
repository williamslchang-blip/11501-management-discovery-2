/**
 * 115學年度「管理探索二」第十二週互動教學主程式
 * 單元名稱：個人與家庭資產負債表、現金流管理與生涯理財規劃
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

  // 1小時活動 (個人資產負債表與淨值計算器)
  balancePreset: 'student_freshman',

  // 2小時活動 (現金流 50/30/20 與緊急預備金精算器)
  cashflowPreset: 'parttime_student',

  // 3小時遊戲 (個人與家庭理財達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (個人資產負債體檢與生涯理財規劃報告)
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
  initBalanceSheetLab();
  initCashFlowReserveLab();
  initWealthGame();
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
  W12_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W12_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w12-primary, #059669);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W12_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W12_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W12_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W12_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W12_SLIDES_DATA.length - 1) {
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

// ---------------------- 30 CUSTOM SLIDE VISUALS ----------------------
function renderSlideVisual(slide) {
  const container = document.getElementById('slideVisualContainer');
  if (!container) return;
  const id = slide.id;

  switch (id) {
    case 1:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 個人與家庭財務儀表板：從月光焦慮到財富自主</h4>
          <span class="sub-tag">「如果不能衡量它，就無法管理它！」— Peter Drucker</span>
        </div>
        <div style="background:#ecfdf5; border:2px dashed #059669; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🧭</div>
          <h4 style="color:#059669; font-size:1.15rem; margin-bottom:8px;">打破「賺多少就花多少」的消費主義陷阱</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:540px; margin:0 auto;">
            大學與社會新鮮人常因缺乏財務報表而陷入「看似有收入卻始終存不到錢」的困境。<br>
            <strong>生涯理財兩大支柱：</strong>掌握資產負債表盤點身價底氣，落實 50/30/20 現金流管理打造終身資產水庫！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第十二週 3 小時學習地圖：從財務報表到終身自由藍圖</h4>
          <span class="sub-tag">資產負債盤點 ‧ 現金流量分配 ‧ 健全指標檢驗 ‧ F.I.R.E. 水庫建構</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border-top:4px solid #059669; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.85rem;">第 1 小時 ‧ 資產負債與現金流</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">企業vs個人財報、資產=負債+淨值核心等式、三大資產分類、短期vs長期負債、大一淨值計算與現金流公式。</p>
          </div>
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.85rem;">第 2 小時 ‧ 預備金與時間複利</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">先存後花順序、30/50/20分配法則、3-6個月緊急預備金、債務雪球vs雪崩法、學貸低利槓桿與FIRE 4%法則。</p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #d97706; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">第 3 小時 ‧ 健全指標與生涯藍圖</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">四大財務健全指標、多帳戶自動分流、防範資金盤詐騙、大一4大金律、大學四年存30萬SOP與終身自由藍圖。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 為什麼企業與個人都需要財務報表？兩大體檢支柱</h4>
          <span class="sub-tag">資產負債表 (靜態存量體質) vs. 現金流量表 (動態流量血脈)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">1. 資產負債表 (Balance Sheet)：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              衡量特定時間點個人所擁有的「財富存量 (Stock)」。猶如照 X 光片，清楚看出自己到底有多少流動資產、背負多少卡債學貸，以及真實淨值。
            </p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">2. 現金流量表 (Cash Flow Statement)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              記錄一段期間內的「金錢流動 (Flow)」。猶如心電圖，監測每月薪資流入與各項生活開銷流出，確保財務不發生周轉不靈斷流危機。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 個人資產負債表核心等式：資產 = 負債 + 淨值</h4>
          <span class="sub-tag">實質身價等式：淨值 (Net Worth) = 資產總額 (Assets) &minus; 負債總額 (Liabilities)</span>
        </div>
        <div class="bs-pillars-grid">
          <div class="bs-pillar-box liquid">
            <h5 style="color:#059669; font-size:0.85rem;">資產總額 (Assets)</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#059669; margin:3px 0;">個人所擁有一切</div>
            <p style="font-size:0.72rem; color:#64748b;">包括活期存款、零股ETF、自用筆電與通勤機車等客觀資源。</p>
          </div>
          <div class="bs-pillar-box" style="border-top:4px solid #ef4444; background:#fef2f2;">
            <h5 style="color:#dc2626; font-size:0.85rem;">負債總額 (Liabilities)</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#dc2626; margin:3px 0;">個人所積欠一切</div>
            <p style="font-size:0.72rem; color:#64748b;">包括信用卡卡費、分期未繳款、就學貸款與未來房屋貸款。</p>
          </div>
          <div class="bs-pillar-box" style="border-top:4px solid #0284c7; background:#f0f9ff;">
            <h5 style="color:#0284c7; font-size:0.85rem;">實質淨值 (Net Worth)</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#0284c7; margin:3px 0;">扣除負債後真實身價</div>
            <p style="font-size:0.72rem; color:#64748b;">代表清算所有財產還清所有債務後，真正屬於自己的剩餘價值！</p>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💎 三大個人資產分類：流動資產 vs. 投資資產 vs. 使用性資產</h4>
          <span class="sub-tag">資產品質決定抗風險能力與財富成長動能</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:8px;">
            <strong style="color:#059669; font-size:0.8rem;">1. 流動資產 (Liquid)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:4px; line-height:1.4;">
              現金、銀行活存、數位帳戶。變現速度極快、價格無損失，作為緊急救命水庫。
            </p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">2. 投資資產 (Investment)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:4px; line-height:1.4;">
              全市場指數 ETF、優質權值股、債券基金。會產生股息或資本利得的「生息資產」。
            </p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:8px;">
            <strong style="color:#b45309; font-size:0.8rem;">3. 使用性資產 (Use)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:4px; line-height:1.4;">
              自用手機筆電、代步機車、自住房屋。提供生活效用，但多數隨時間折舊貶值。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💳 短期負債 vs. 長期負債：好債與壞債的本質區別</h4>
          <span class="sub-tag">年息 15% 信用卡循環卡債 (惡性壞債) vs. 年息 1.65% 政策就學貸款 (良性好債)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
            <strong style="color:#dc2626; font-size:0.82rem;">壞債（短期消費性負債）：</strong>
            <p style="font-size:0.75rem; color:#7f1d1d; margin-top:4px; line-height:1.5;">
              信用卡循環利息（高達 15%）、無卡分期、高利借貸。為立即享受而借貸，利滾利快速腐蝕個人淨值，屬於必須立刻消滅的財務毒瘤！
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">好債（長期低利槓桿負債）：</strong>
            <p style="font-size:0.75rem; color:#14532d; margin-top:4px; line-height:1.5;">
              政策就學貸款（1.65%）、新青安首購房貸（1.775%）。利率遠低於通膨與市場長期回報，投資於人力資本或具備保值增值潛力資產。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧮 個人淨值算術實戰：大一新鮮人的財務身價案例</h4>
          <span class="sub-tag">資產 NT$ 80,000 元 &minus; 負債 NT$ 3,000 元 = 實質淨值 NT$ 77,000 元！</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; font-weight:900; color:#059669;">個人淨值：+77,000 元（負債比 3.75%）</div>
          <p style="font-size:0.82rem; color:#334155; margin-top:6px; line-height:1.5;">
            活存 4.5 萬 + 零股 1.5 萬 + 筆電機車殘值 2 萬 = 資產總額 80,000 元。<br>
            當期信用卡帳單 3,000 元。扣除後實質身價為 77,000 元，起步底氣健康良好！
          </p>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇹🇼 實證數據：主計總處與央行台灣家戶資產負債統計</h4>
          <span class="sub-tag">平均每戶資產超過 1,300 萬元 ‧ 房產與金融存款為主要財富結構</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; font-weight:900; color:#059669;">1,300+ 萬</div>
            <strong style="font-size:0.8rem; color:#334155;">台灣家戶平均資產總額</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">不動產（自用住宅）佔比約四至五成，儲蓄與有價證券佔比三成。</p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; font-weight:900; color:#0284c7;">約 200 萬</div>
            <strong style="font-size:0.8rem; color:#334155;">台灣家戶平均負債總額</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">主要由長期購屋抵押貸款構成，家戶平均實質淨值超過 1,100 萬元。</p>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌊 個人現金流量表核心公式：收入 &minus; 支出 = 淨現金流</h4>
          <span class="sub-tag">現金流是個人財務的生命線 ‧ 唯有正向淨現金流才能灌溉投資水庫</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-around; align-items:center; text-align:center;">
            <div>
              <div style="color:#059669; font-weight:800; font-size:1rem;">月現金流入 (Inflow)</div>
              <div style="font-size:0.75rem; color:#64748b;">兼職打工、零用金、獎學金</div>
            </div>
            <div style="font-size:1.5rem; color:#64748b;">&minus;</div>
            <div>
              <div style="color:#dc2626; font-weight:800; font-size:1rem;">月現金流出 (Outflow)</div>
              <div style="font-size:0.75rem; color:#64748b;">房租三餐、娛樂、交通</div>
            </div>
            <div style="font-size:1.5rem; color:#64748b;">=</div>
            <div>
              <div style="color:#0284c7; font-weight:800; font-size:1rem;">淨現金流 (Net Flow)</div>
              <div style="font-size:0.75rem; color:#64748b;">轉化為儲蓄與投資資產！</div>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第一小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">淨值等式 ➔ 立即進入【個人資產負債表與淨值計算器】實算實質身價！</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#059669; font-size:0.88rem; margin-bottom:4px;">💡 第一小時三大不可動搖核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>資產 = 負債 + 淨值：實質身價等於扣除所有負債後的淨額。</li>
            <li>三大資產各司其職：流動資產保命、投資資產生息、使用資產提供生活便利。</li>
            <li>現金流為王：維持每月正向淨現金流，是累積一切生息資產的前提。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalBalanceSheetLab')" style="padding:8px 18px; font-size:0.85rem; background:#059669;">
            點擊開啟【個人資產負債表與淨值計算器】實戰演練 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔄 翻轉理財順序：發薪日「先儲蓄、後消費 (Pay Yourself First)」</h4>
          <span class="sub-tag">失敗者公式：收入 &minus; 消費 = 儲蓄 ➔ 成功者公式：收入 &minus; 儲蓄 = 消費！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
            <strong style="color:#dc2626; font-size:0.82rem;">❌ 舊思維：月底剩多少存多少</strong>
            <p style="font-size:0.75rem; color:#7f1d1d; margin-top:4px; line-height:1.5;">
              人性具有「帕金森定律」傾向，只要手上有閒錢就會不知不覺花掉。月底往往所剩無幾，甚至超支淪為卡奴。
            </p>
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">✅ 新思維：發薪日先支付自己</strong>
            <p style="font-size:0.75rem; color:#065f46; margin-top:4px; line-height:1.5;">
              兼職薪水入帳當天，系統自動扣走 20% 轉入投資帳戶！剩下的 80% 放心用於日常開銷，零罪惡感且財富持續增長。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📐 大學生打工資產分配黃金法則：50 / 30 / 20 比例法則</h4>
          <span class="sub-tag">50% 必要需求 (Needs) ‧ 30% 個人想要 (Wants) ‧ 20% 儲蓄投資 (Savings)</span>
        </div>
        <div class="cf-allocation-bar">
          <div class="cf-bar-needs" style="width:50%;">50% 必要 (Needs)</div>
          <div class="cf-bar-wants" style="width:30%;">30% 想要 (Wants)</div>
          <div class="cf-bar-savings" style="width:20%;">20% 儲蓄投資</div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:6px;">
          <div style="font-size:0.72rem; color:#0284c7; text-align:center;">
            <strong>必要開銷 (50%)：</strong><br>房租、水電費、三餐便當、大眾通勤票。
          </div>
          <div style="font-size:0.72rem; color:#d97706; text-align:center;">
            <strong>品質生活 (30%)：</strong><br>手搖杯、朋友聚餐、演唱會、治裝娛樂。
          </div>
          <div style="font-size:0.72rem; color:#059669; text-align:center;">
            <strong>投資未來 (20%)：</strong><br>指數化 ETF 定期定額、高利活存預備金。
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 人生第一道財務防護牆：緊急預備金 (Emergency Fund) 水庫</h4>
          <span class="sub-tag">保留 3 至 6 個月基本生活費 ‧ 杜絕突發失業或生病打亂人生步調</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; font-weight:900; color:#059669;">月開銷 1.5 萬 &times; 6 個月 = 90,000 元水庫！</div>
          <p style="font-size:0.82rem; color:#334155; margin-top:6px; line-height:1.5;">
            <strong>存放工具：</strong>純網銀或高利活儲帳戶（如 1.5%~2.5% 年息），具備高流動性與極高安全性。<br>
            <strong>使用天條：</strong>非突發緊急事件絕不可動用，投資虧損時絕不可拿來補倉！
          </p>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>☕ 辨識「需要 (Needs)」vs.「想要 (Wants)」：揪出拿鐵因子</h4>
          <span class="sub-tag">一杯 150 元星巴克每天喝 ‧ 40 年複利侵蝕高達近 600 萬元財富！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">拿鐵因子 (The Latte Factor)：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              每天看似微不足道的零星消費（手搖茶、盲盒、串流平台重複訂閱），累積起來正是讓年輕人淪為月光族的隱形殺手。
            </p>
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">48 小時延遲購買黃金法則：</strong>
            <p style="font-size:0.75rem; color:#065f46; margin-top:4px; line-height:1.5;">
              看到心動想買的非必要商品時，先將其加入購物車等待 48 小時。多數大腦的多巴胺衝動將在兩天後冷卻，省下八成不必要花費！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚡ 債務清償兩大策略對決：雪崩法 (Avalanche) vs. 雪球法 (Snowball)</h4>
          <span class="sub-tag">雪崩法節省最多利息 (數學最佳) vs. 雪球法累積成就感 (心理最佳)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">1. 雪崩法 (Debt Avalanche)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              <strong>優先清償利率最高者！</strong>如先消滅 15% 卡債，再還 8% 機車信貸，最後還 1.65% 學貸。純理性最優，總利息支出最少。
            </p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">2. 雪球法 (Debt Snowball)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              <strong>優先清償金額最小者！</strong>不論利率先還清 5,000 元帳單，迅速減少債權人數量，透過連續勝利激勵持續清償。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎓 政策就學貸款 (1.65%)：善用低利槓桿與寬限期政策</h4>
          <span class="sub-tag">在學期間免息 ‧ 畢業後 1 年寬限期 ‧ 在職低薪申請緩繳本息</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <h5 style="color:#0284c7; font-size:0.88rem; margin-bottom:4px;">💡 青年學貸三大理性決策指引：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li><strong>勿慌張全額提早償還：</strong>1.65% 利率低於當前通膨率與高利活存利率，提早還款等於放棄低利資金。</li>
            <li><strong>優先穩固 6 個月緊急預備金：</strong>手握足夠現金才能應對畢業求職空窗，避免轉向高利信貸借款。</li>
            <li><strong>月薪低於 4 萬元可申請緩繳：</strong>善用政府青年就業扶助，在寬限期內全神貫注充實職場核心專業。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚩 人生 5 大財務里程碑：階段性目標與資金水庫規劃</h4>
          <span class="sub-tag">畢業積蓄 ➔ 購置代步機車 ➔ 結婚成家 ➔ 購屋頭期款 ➔ 終身安穩退休</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; text-align:center;">
          <div style="background:#f8fafc; border-top:3px solid #059669; border-radius:6px; padding:6px;">
            <strong style="color:#059669; font-size:0.75rem;">1. 畢業基金</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">目標 10-30 萬<br>求職過渡期</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #0284c7; border-radius:6px; padding:6px;">
            <strong style="color:#0284c7; font-size:0.75rem;">2. 通勤工具</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">目標 8-15 萬<br>代步機車全款</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #f59e0b; border-radius:6px; padding:6px;">
            <strong style="color:#d97706; font-size:0.75rem;">3. 結婚成家</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">目標 30-50 萬<br>蜜月宴客預備</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #6366f1; border-radius:6px; padding:6px;">
            <strong style="color:#4f46e5; font-size:0.75rem;">4. 首購頭期</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">目標 200-300萬<br>首付 2-3 成</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #ec4899; border-radius:6px; padding:6px;">
            <strong style="color:#db2777; font-size:0.75rem;">5. FIRE 退休</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">目標 1500-2400萬<br>4% 提領生息</p>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 時間複利槓桿：72 法則與每月 3,000 元的千萬威力</h4>
          <span class="sub-tag">72 法則：資產翻倍所需年數 = 72 &divide; 年化報酬率(%)</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; font-weight:900; color:#059669;">20 歲起每月 3,000 元投入 7% ETF ➔ 60 歲達 756 萬元！</div>
          <p style="font-size:0.82rem; color:#334155; margin-top:6px; line-height:1.5;">
            40 年累計本金僅投入 144 萬元，複利賺得的增值高達 <strong>612 萬元</strong>（佔總資產 81%）！<br>
            <strong>年輕最大的資產不是金錢，而是「時間複利的長度」！</strong>
          </p>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏝️ 財務獨立提早退休 (F.I.R.E.)：經典 4% 法則資產水庫</h4>
          <span class="sub-tag">年開銷 25 倍資產 ‧ 退休後每年提領 4% ‧ 資產本金 30 年不枯竭</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; font-weight:900; color:#15803d;">年支出 &times; 25 倍</div>
            <strong style="font-size:0.8rem; color:#334155;">Trinity Study 4% 法則標準</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">例如年花費 60 萬元，累積 1,500 萬至 2,400 萬全市場股票債券組合即可達成退休。</p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; font-weight:900; color:#0284c7;">提領率 4% &lt; 報酬率 7%</div>
            <strong style="font-size:0.8rem; color:#334155;">資產水庫生生不息原理</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">投資組合長期年化報酬 7%-8%，扣除 3% 通膨後實質提領 4%，本金永遠保留。</p>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第二小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">50/30/20 黃金分配 ➔ 立即進入【現金流與預備金精算器】實算生活水庫！</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#059669; font-size:0.88rem; margin-bottom:4px;">💡 第二小時三大不可動搖核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>發薪日先支付自己：落實 20% 自動儲蓄投資，翻轉月光命運。</li>
            <li>常備 3 至 6 個月生活費：打造抗風險預備金，高利雪崩法滅除壞債。</li>
            <li>複利長度超越本金：年輕啟動定期定額指數 ETF，用時間滾出千萬退休水庫。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalCashFlowLab')" style="padding:8px 18px; font-size:0.85rem; background:#059669;">
            點擊開啟【現金流 50/30/20 與預備金精算器】實戰演練 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🩺 個人財務健全度 4 大比例指標體檢雷達圖</h4>
          <span class="sub-tag">客觀量化財務體質 ‧ 每年定期檢測 ‧ 打造防禦與成長兼具之體系</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border-left:4px solid #059669; border-radius:4px; padding:8px;">
            <strong style="color:#059669; font-size:0.8rem;">1. 儲蓄率 (Savings Rate) &gt; 20%</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">每月儲蓄與投資佔總收入比例，衡量未雨綢繆動能。</p>
          </div>
          <div style="background:#f0f9ff; border-left:4px solid #0284c7; border-radius:4px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">2. 負債比 (Debt Ratio) &lt; 50%</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">負債總額佔總資產比例，過高將大幅壓制個人財務彈性。</p>
          </div>
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:4px; padding:8px;">
            <strong style="color:#b45309; font-size:0.8rem;">3. 流動性比率 (Liquidity) &ge; 3-6 個月</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">流動資產可支應必要開銷月數，危機來臨時的生命線。</p>
          </div>
          <div style="background:#f8fafc; border-left:4px solid #6366f1; border-radius:4px; padding:8px;">
            <strong style="color:#4f46e5; font-size:0.8rem;">4. 投資淨值比 (Invest/Net Worth) &gt; 30%</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">生息投資資產佔淨值比例，青年應隨年齡成長拉高。</p>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚰 打造自動化個人財務水庫：多帳戶分流管理法</h4>
          <span class="sub-tag">薪轉總水庫 ➔ 自動扣款分流 ➔ 儲蓄投資專戶、緊急預備專戶與生活消費專戶</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#059669; font-size:0.82rem;">1. 儲蓄投資專戶 (20%)</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">證券戶自動定期定額扣款 0050 或美股 VT ETF，只進不出。</p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#0284c7; font-size:0.82rem;">2. 緊急預備專戶 (3-6月)</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">存放高利數位活儲，無提款卡或放家裡，嚴防手滑消費。</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px; text-align:center;">
            <strong style="color:#b45309; font-size:0.82rem;">3. 生活消費專戶 (80%)</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">綁定簽帳金融卡與行動支付，額度花完即停止，杜絕透支。</p>
          </div>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💑 婚前與家庭財務管理：雙薪伴侶金錢觀與共同基金</h4>
          <span class="sub-tag">AA 制過度生硬 ‧ 共同基金帳戶 (按薪資比例提撥) 為現代雙薪最佳解方</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">比例提撥共同家庭基金：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              夫妻各自提撥月薪 60% 至共同公費帳戶（支付房貸、水電、育兒、家庭旅遊）；剩餘 40% 保留為個人私房支配，兼顧公平與自主。
            </p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">婚前財務透明對話：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              坦承彼此資產負債狀況（有無學貸、卡債或孝親費負擔），建立統一的理財目標與金錢界線，避免財務隱瞞破壞婚姻信任。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚨 個人財務資安防詐：識別社群飆股、虛擬幣資金盤 (Ponzi)</h4>
          <span class="sub-tag">「你看中他的高利息，他看中你的本金！」— 龐氏騙局千古不變真相</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
          <h5 style="color:#dc2626; font-size:0.88rem; margin-bottom:4px;">⚠️ 投資詐騙三大經典特徵：</h5>
          <ol style="font-size:0.78rem; color:#7f1d1d; padding-left:16px; line-height:1.6;">
            <li><strong>保證獲利、穩賺不賠：</strong>宣稱「日報酬 1%」、「月息 10%」，違反金融市場高風險高報酬基本鐵律。</li>
            <li><strong>名師代操、拉人頭分紅：</strong>要求加入 LINE 飆股群組、下載非官方 APK 或虛擬貨幣山寨交易平台。</li>
            <li><strong>出金困難需補保證金：</strong>獲利看得到領不出，詐團以「需補繳 20% 稅金或保證金」進行二次榨取。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 官方數據調取：主計總處家庭收支調查 (dgbas.gov.tw)</h4>
          <span class="sub-tag">手把手查閱台灣同齡青年與全國家戶可支配所得與消費支出結構</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
          <h5 style="color:#059669; font-size:0.88rem; margin-bottom:4px;">🔍 主計總處關鍵查閱三大步驟：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>造訪行政院主計總處官網 <strong>dgbas.gov.tw</strong>，進入「統計資料庫」之「家庭收支調查」。</li>
            <li>調取 30 歲以下青年家戶「平均可支配所得」與「消費支出中位數」，檢視同齡人收支現況。</li>
            <li>比對個人 50/30/20 比例，客觀校準自身生活費水平是否落入合理中位數區間。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 給大一新鮮人的生涯理財四大終身金律</h4>
          <span class="sub-tag">先存後花支付自己 ‧ 備妥六個月預備金 ‧ 嚴防高利循環卡債 ‧ 指數化投資複利</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border-left:4px solid #059669; border-radius:4px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">金律一：發薪日先支付自己</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">將 20% 自動扣入投資帳戶，打破月光族魔咒。</p>
          </div>
          <div style="background:#f0f9ff; border-left:4px solid #0284c7; border-radius:4px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">金律二：常備半年生活預備金</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">高利數位活儲隨時保命，絕不因突發事件中斷人生。</p>
          </div>
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:4px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">金律三：遠離 15% 循環卡債</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">每月全額繳清信用卡帳單，維護優質個人聯徵信用。</p>
          </div>
          <div style="background:#f8fafc; border-left:4px solid #6366f1; border-radius:4px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">金律四：定期定額全市場指數</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">善用 40 年青春歲月，讓時間複利雪球滾出千萬財富。</p>
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 理財實踐實例：大學四年滾存 30 萬元畢業第一桶金 SOP</h4>
          <span class="sub-tag">每月工讀儲蓄 5,000 元 ‧ 投入全市場指數 ETF (年化 7%) ‧ 畢業穩健擁有 30 萬！</span>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px;">
          <h5 style="color:#059669; font-size:0.9rem; margin-bottom:6px;">畢業第一桶金四年行動藍圖：</h5>
          <p style="font-size:0.78rem; color:#334155; line-height:1.6;">
            1. <strong>每月紀律扣款：</strong>每月兼職薪水提撥 5,000 元，設定定期定額買進 0050 或 VT。<br>
            2. <strong>四年本金累積：</strong>5,000 元 &times; 48 個月 = 240,000 元本金。<br>
            3. <strong>7% 複利收益：</strong>四年利息與資本增值約 3.8 萬至 6 萬元，畢業時手握 <strong>近 30 萬元現金與資產</strong>！求職、租屋、留學充滿底氣！
          </p>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 生涯財務自主與終身財富自由藍圖：人生五階段</h4>
          <span class="sub-tag">從依賴父母 ➔ 經濟自立 ➔ 累積第一桶金 ➔ 產生被動現金流 ➔ 達成 F.I.R.E.</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; text-align:center;">
          <div style="background:#f8fafc; border-top:3px solid #64748b; border-radius:6px; padding:6px;">
            <strong style="color:#475569; font-size:0.75rem;">階段一</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">經濟依賴<br>學習財經素養</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #0284c7; border-radius:6px; padding:6px;">
            <strong style="color:#0284c7; font-size:0.75rem;">階段二</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">經濟自立<br>收入大於支出</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #059669; border-radius:6px; padding:6px;">
            <strong style="color:#059669; font-size:0.75rem;">階段三</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">第一桶金<br>穩固六月預備金</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #d97706; border-radius:6px; padding:6px;">
            <strong style="color:#d97706; font-size:0.75rem;">階段四</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">被動現金流<br>股息支付部分生活</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #10b981; border-radius:6px; padding:6px;">
            <strong style="color:#059669; font-size:0.75rem;">階段五</strong>
            <p style="font-size:0.68rem; color:#64748b; margin-top:2px;">FIRE 自由<br>4% 覆蓋全部開銷</p>
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：第十二週個人與家庭財務全景知識圖譜</h4>
          <span class="sub-tag">資產負債 ➔ 50/30/20 現金流 ➔ 緊急預備金 ➔ 債務雪崩 ➔ 72 複利 ➔ FIRE 4%</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:8px;">
            <strong style="color:#059669; font-size:0.8rem;">第 1 小時 ‧ 資產負債與現金流：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">資產 = 負債 + 淨值 + 三大資產分類 + 壞債卡債vs好債學貸 + 現金流量表動態血脈</span>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">第 2 小時 ‧ 預備金與時間複利：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">先存後花 50/30/20 + 3-6個月緊急水庫 + 債務雪崩法 + 72法則指數複利 + FIRE 4%法則</span>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.8rem;">第 3 小時 ‧ 健全指標與生涯藍圖：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">四大健全比率 + 多帳戶自動分流 + 防範資金盤詐騙 + 大學存30萬SOP + 人生自由五階段</span>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業說明與第十三週【半導體產業與台積電】預告</h4>
          <span class="sub-tag">完成第十二週作業 ‧ 實踐個人資產負債體檢 ‧ 啟動人生第一桶金</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px;">
            <strong style="color:#059669; font-size:0.82rem;">📝 第十二週四維度作業要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              盤點個人目前資產負債計算實質淨值、檢核每月現金流 50/30/20 比例、規劃 3-6 個月預備金與債務策略，描繪大學四年至畢業 5 年複利藍圖！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem; background:#059669;">
                開啟第十二週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">🔬 第十三週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【台灣半導體產業鏈與護國神山台積電 (TSMC)】：探索晶圓代工商業模式、摩爾定律極限、台積電技術護城河與全球地緣政治競爭！
            </p>
          </div>
        </div>
      </div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: BALANCE SHEET LAB ----------------------
function initBalanceSheetLab() {
  document.querySelectorAll('.btn-preset-bs').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-bs').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.balancePreset = pKey;
      loadBalanceSheetPreset(pKey);
    });
  });

  ['bsLiquidAssets', 'bsInvestAssets', 'bsUseAssets', 'bsShortLiab', 'bsLongLiab'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateBalanceSheet);
  });

  loadBalanceSheetPreset('student_freshman');
}

function loadBalanceSheetPreset(pKey) {
  const p = W12_BALANCE_SHEET_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('bsLiquidAssets')) document.getElementById('bsLiquidAssets').value = p.liquidAssets;
  if (document.getElementById('bsInvestAssets')) document.getElementById('bsInvestAssets').value = p.investAssets;
  if (document.getElementById('bsUseAssets')) document.getElementById('bsUseAssets').value = p.useAssets;
  if (document.getElementById('bsShortLiab')) document.getElementById('bsShortLiab').value = p.shortLiabilities;
  if (document.getElementById('bsLongLiab')) document.getElementById('bsLongLiab').value = p.longLiabilities;

  calculateBalanceSheet(p.diagnosis);
}

function calculateBalanceSheet(customDiagnosis = '') {
  const liquid = parseFloat(document.getElementById('bsLiquidAssets')?.value) || 0;
  const invest = parseFloat(document.getElementById('bsInvestAssets')?.value) || 0;
  const use = parseFloat(document.getElementById('bsUseAssets')?.value) || 0;
  const shortLiab = parseFloat(document.getElementById('bsShortLiab')?.value) || 0;
  const longLiab = parseFloat(document.getElementById('bsLongLiab')?.value) || 0;

  const totalAssets = liquid + invest + use;
  const totalLiab = shortLiab + longLiab;
  const netWorth = totalAssets - totalLiab;
  const debtRatio = totalAssets > 0 ? ((totalLiab / totalAssets) * 100).toFixed(1) : 0;

  const elAssets = document.getElementById('outBsTotalAssets');
  const elLiab = document.getElementById('outBsTotalLiab');
  const elNet = document.getElementById('outBsNetWorth');
  const elRatio = document.getElementById('outBsDebtRatio');
  const elDiag = document.getElementById('outBsDiagnosis');

  if (elAssets) elAssets.textContent = `NT$ ${totalAssets.toLocaleString()} 元`;
  if (elLiab) elLiab.textContent = `NT$ ${totalLiab.toLocaleString()} 元`;
  if (elNet) {
    elNet.textContent = `NT$ ${netWorth.toLocaleString()} 元`;
    elNet.style.color = netWorth >= 0 ? '#059669' : '#dc2626';
  }
  if (elRatio) elRatio.textContent = `${debtRatio}%`;

  if (elDiag) {
    if (customDiagnosis) {
      elDiag.innerHTML = `<strong>💡 財務淨值診斷：</strong>${customDiagnosis}`;
    } else {
      elDiag.innerHTML = `<strong>💡 財務淨值診斷：</strong>資產總計 <strong>NT$ ${totalAssets.toLocaleString()} 元</strong>，負債總額 <strong>NT$ ${totalLiab.toLocaleString()} 元</strong>。個人實質淨值為 <strong>NT$ ${netWorth.toLocaleString()} 元</strong>，負債比率 <strong>${debtRatio}%</strong>。${netWorth >= 0 ? '財務底氣穩健，維持儲蓄紀律！' : '目前處於負淨值階段，請優先控制壞債並提升專業能力。'}`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: CASH FLOW & RESERVE LAB ----------------------
function initCashFlowReserveLab() {
  document.querySelectorAll('.btn-preset-cf').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-cf').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.cashflowPreset = pKey;
      loadCashFlowPreset(pKey);
    });
  });

  ['cfIncome', 'cfNeeds', 'cfWants', 'cfSavings', 'cfEmergencyFund'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateCashFlow);
  });

  loadCashFlowPreset('parttime_student');
}

function loadCashFlowPreset(pKey) {
  const p = W12_CASHFLOW_RESERVE_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('cfIncome')) document.getElementById('cfIncome').value = p.monthlyIncome;
  if (document.getElementById('cfNeeds')) document.getElementById('cfNeeds').value = p.needsCost;
  if (document.getElementById('cfWants')) document.getElementById('cfWants').value = p.wantsCost;
  if (document.getElementById('cfSavings')) document.getElementById('cfSavings').value = p.saveInvest;
  if (document.getElementById('cfEmergencyFund')) document.getElementById('cfEmergencyFund').value = p.currentEmergencyFund;

  calculateCashFlow(p.advice);
}

function calculateCashFlow(customAdvice = '') {
  const income = parseFloat(document.getElementById('cfIncome')?.value) || 0;
  const needs = parseFloat(document.getElementById('cfNeeds')?.value) || 0;
  const wants = parseFloat(document.getElementById('cfWants')?.value) || 0;
  const savings = parseFloat(document.getElementById('cfSavings')?.value) || 0;
  const emergencyFund = parseFloat(document.getElementById('cfEmergencyFund')?.value) || 0;

  const totalExpense = needs + wants;
  const netFlow = income - totalExpense;
  const needsPct = income > 0 ? ((needs / income) * 100).toFixed(1) : 0;
  const wantsPct = income > 0 ? ((wants / income) * 100).toFixed(1) : 0;
  const savingsPct = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
  const reserveMonths = needs > 0 ? (emergencyFund / needs).toFixed(1) : 0;

  const elNet = document.getElementById('outCfNetFlow');
  const elNeedsPct = document.getElementById('outCfNeedsPct');
  const elWantsPct = document.getElementById('outCfWantsPct');
  const elSavingsPct = document.getElementById('outCfSavingsPct');
  const elMonths = document.getElementById('outCfReserveMonths');
  const elAdvice = document.getElementById('outCfAdvice');

  if (elNet) {
    elNet.textContent = `NT$ ${netFlow.toLocaleString()} 元`;
    elNet.style.color = netFlow >= 0 ? '#0284c7' : '#dc2626';
  }
  if (elNeedsPct) elNeedsPct.textContent = `${needsPct}% (標準 50%)`;
  if (elWantsPct) elWantsPct.textContent = `${wantsPct}% (標準 30%)`;
  if (elSavingsPct) elSavingsPct.textContent = `${savingsPct}% (標準 20%)`;
  if (elMonths) {
    elMonths.textContent = `${reserveMonths} 個月生活費`;
    elMonths.style.color = reserveMonths >= 3 ? '#059669' : '#d97706';
  }

  if (elAdvice) {
    if (customAdvice) {
      elAdvice.innerHTML = `<strong>💡 現金流與預備金建言：</strong>${customAdvice}`;
    } else {
      elAdvice.innerHTML = `<strong>💡 現金流與預備金建言：</strong>月收入 <strong>NT$ ${income.toLocaleString()} 元</strong>。必要需求佔 <strong>${needsPct}%</strong>，生活品質佔 <strong>${wantsPct}%</strong>，儲蓄投資佔 <strong>${savingsPct}%</strong>。目前預備金可支撐 <strong>${reserveMonths} 個月</strong>生活。${reserveMonths >= 6 ? '防護盾極為堅實！' : '建議優先將預備金累積至 3-6 個月。'}`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: WEALTH GAME ----------------------
function initWealthGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderWealthGameLevel();
}

function renderWealthGameLevel() {
  const container = document.getElementById('wealthGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W12_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 300;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【生涯理財規劃達人 (Wealth Master)】最高榮譽！' : '挑戰完成！榮獲【個人財務探索初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#059669; font-size:1.3rem;">${APP_STATE.gameScore} / 400 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartWealthGame()" style="background:#059669;">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W12_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
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
          <button class="btn-quiz-option" onclick="answerWealthGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="wealthGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerWealthGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W12_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#wealthGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('wealthGameFeedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (selected.isCorrect) {
      APP_STATE.gameScore += 100;
      feedbackEl.style.background = '#ecfdf5';
      feedbackEl.style.border = '1px solid #a7f3d0';
      feedbackEl.style.color = '#065f46';
    } else {
      feedbackEl.style.background = '#fef2f2';
      feedbackEl.style.border = '1px solid #fecaca';
      feedbackEl.style.color = '#991b1b';
    }
    feedbackEl.innerHTML = `
      <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
      <div style="margin-top:10px; text-align:right;">
        <button class="btn-nav-step btn-primary-step" onclick="nextWealthGameLevel()" style="background:#059669;">前進下一關 ➔</button>
      </div>
    `;
  }
};

window.nextWealthGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderWealthGameLevel();
};

window.restartWealthGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderWealthGameLevel();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Inventory', 'hwDim2CashFlow', 'hwDim3ReserveDebt', 'hwDim4FireRoadmap', 'hwConclusionGrade', 'hwDecisionSummary'];
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
    targetPlan: document.getElementById('hwTargetPlan')?.value || '',
    dim1Inventory: document.getElementById('hwDim1Inventory')?.value || '',
    dim2CashFlow: document.getElementById('hwDim2CashFlow')?.value || '',
    dim3ReserveDebt: document.getElementById('hwDim3ReserveDebt')?.value || '',
    dim4FireRoadmap: document.getElementById('hwDim4FireRoadmap')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('w12_homework_draft', JSON.stringify(data));
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
    const saved = localStorage.getItem('w12_homework_draft');
    if (saved) {
      const data = JSON.parse(saved);
      if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
      if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
      if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = data.targetPlan || '';
      if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = data.dim1Inventory || '';
      if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = data.dim2CashFlow || '';
      if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = data.dim3ReserveDebt || '';
      if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = data.dim4FireRoadmap || '';
      if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'A+ (全面且具備實戰避險可行性)';
      if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
    }
  } catch (e) {
    console.warn(e);
  }
}

window.loadHomeworkTemplate = function() {
  const t = W12_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = t.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = t.studentId;
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = t.targetPlan;
  if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = t.dim1Inventory;
  if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = t.dim2CashFlow;
  if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = t.dim3ReserveDebt;
  if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = t.dim4FireRoadmap;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = t.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = t.decisionSummary;
  saveHomeworkToLocal();
  alert('已成功載入第十二週個人財務體檢與生涯規劃示範範本！');
};

window.exportHomeworkJson = function() {
  saveHomeworkToLocal();
  const saved = localStorage.getItem('w12_homework_draft') || '{}';
  const data = JSON.parse(saved);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W12_理財規劃報告_${data.studentName || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportHomeworkMd = function() {
  saveHomeworkToLocal();
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const sid = document.getElementById('hwStudentId')?.value || '未填寫';
  const plan = document.getElementById('hwTargetPlan')?.value || '';
  const d1 = document.getElementById('hwDim1Inventory')?.value || '';
  const d2 = document.getElementById('hwDim2CashFlow')?.value || '';
  const d3 = document.getElementById('hwDim3ReserveDebt')?.value || '';
  const d4 = document.getElementById('hwDim4FireRoadmap')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第十二週作業報告：個人資產負債體檢與生涯理財規劃報告
- **學生姓名**：${name}
- **學生學號**：${sid}
- **規劃方案**：${plan}
- **自評等級**：${grade}
- **決策總結**：${summary}

---
### 一、個人/家庭資產負債盤點與實質淨值體檢 (Net Worth) (25%)
${d1}

---
### 二、每月現金流收支結構與 50/30/20 比率落實度 (Cash Flow) (25%)
${d2}

---
### 三、緊急預備金水庫規劃與債務防禦策略 (Buffer & Debt) (25%)
${d3}

---
### 四、大學四年至畢業 5 年生涯理財里程碑與時間複利藍圖 (FIRE) (25%)
${d4}
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

  document.getElementById('gridSearchInput')?.addEventListener('input', (e) => {
    const activeHour = document.querySelector('.tab-hour-filter.active')?.getAttribute('data-hour') || 'all';
    renderGridCards(activeHour, e.target.value);
  });
}

function renderGridCards(filterHour = 'all', searchQuery = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;
  const isZh = APP_STATE.lang === 'zh';
  const query = searchQuery.trim().toLowerCase();

  const filtered = W12_SLIDES_DATA.filter(s => {
    const matchHour = filterHour === 'all' || String(s.hour) === String(filterHour);
    const title = (isZh ? s.title : s.titleEn).toLowerCase();
    const sub = (isZh ? s.subtitle : s.subtitleEn).toLowerCase();
    const cat = (isZh ? s.category : s.categoryEn).toLowerCase();
    const matchSearch = !query || title.includes(query) || sub.includes(query) || cat.includes(query);
    return matchHour && matchSearch;
  });

  container.innerHTML = filtered.map(s => `
    <div class="grid-slide-card hour-${s.hour}" onclick="jumpToSlide(${s.id - 1})">
      <div class="card-meta">
        <span class="badge badge-num">Slide ${String(s.id).padStart(2, '0')}</span>
        <span class="badge badge-h">Hour ${s.hour}</span>
      </div>
      <h4 class="card-title">${isZh ? s.title : s.titleEn}</h4>
      <p class="card-subtitle">${isZh ? s.subtitle : s.subtitleEn}</p>
      <div class="card-footer">
        <span class="badge-cat">${isZh ? s.category : s.categoryEn}</span>
        <span class="click-hint">點擊跳轉 ➔</span>
      </div>
    </div>
  `).join('');
}

// ---------------------- CANVAS DRAWING ENGINE ----------------------
let canvasEl = null;
let ctx = null;
let isDrawing = false;
let drawHistory = [];

function initCanvasDrawing() {
  canvasEl = document.getElementById('drawingCanvas');
  if (!canvasEl) return;
  ctx = canvasEl.getContext('2d');
  resizeDrawingCanvas();
  window.addEventListener('resize', resizeDrawingCanvas);

  document.getElementById('btnToggleDrawing')?.addEventListener('click', toggleDrawingToolbar);
  document.getElementById('btnToolPen')?.addEventListener('click', () => setDrawingTool('pen'));
  document.getElementById('btnToolHighlighter')?.addEventListener('click', () => setDrawingTool('highlighter'));
  document.getElementById('btnToolClear')?.addEventListener('click', () => clearDrawingCanvas(true));
  document.getElementById('btnToolUndo')?.addEventListener('click', undoDrawing);

  document.querySelectorAll('.btn-color-dot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-color-dot').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      APP_STATE.drawingColor = e.currentTarget.getAttribute('data-color');
    });
  });

  canvasEl.addEventListener('mousedown', startDraw);
  canvasEl.addEventListener('mousemove', drawMove);
  canvasEl.addEventListener('mouseup', endDraw);
  canvasEl.addEventListener('mouseleave', endDraw);

  canvasEl.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY });
    canvasEl.dispatchEvent(mouseEvent);
  }, { passive: false });

  canvasEl.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', { clientX: touch.clientX, clientY: touch.clientY });
    canvasEl.dispatchEvent(mouseEvent);
  }, { passive: false });

  canvasEl.addEventListener('touchend', () => {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvasEl.dispatchEvent(mouseEvent);
  });
}

function resizeDrawingCanvas() {
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  canvasEl.width = rect.width;
  canvasEl.height = rect.height;
}

function toggleDrawingToolbar() {
  APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
  const toolbar = document.getElementById('drawingToolbar');
  const btn = document.getElementById('btnToggleDrawing');
  toolbar?.classList.toggle('active', APP_STATE.isDrawingActive);
  btn?.classList.toggle('active', APP_STATE.isDrawingActive);
  if (canvasEl) canvasEl.style.pointerEvents = APP_STATE.isDrawingActive ? 'auto' : 'none';
}

function setDrawingTool(tool) {
  APP_STATE.drawingTool = tool;
  document.getElementById('btnToolPen')?.classList.toggle('active', tool === 'pen');
  document.getElementById('btnToolHighlighter')?.classList.toggle('active', tool === 'highlighter');
}

function startDraw(e) {
  if (!APP_STATE.isDrawingActive) return;
  isDrawing = true;
  saveCanvasState();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function drawMove(e) {
  if (!isDrawing || !APP_STATE.isDrawingActive) return;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (APP_STATE.drawingTool === 'pen') {
    ctx.strokeStyle = APP_STATE.drawingColor;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1.0;
  } else {
    ctx.strokeStyle = APP_STATE.drawingColor;
    ctx.lineWidth = 14;
    ctx.globalAlpha = 0.35;
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function endDraw() {
  if (isDrawing) {
    ctx.closePath();
    isDrawing = false;
  }
}

function saveCanvasState() {
  if (!canvasEl) return;
  drawHistory.push(ctx.getImageData(0, 0, canvasEl.width, canvasEl.height));
  if (drawHistory.length > 20) drawHistory.shift();
}

function undoDrawing() {
  if (!drawHistory.length) return;
  const prevState = drawHistory.pop();
  ctx.putImageData(prevState, 0, 0);
}

function clearDrawingCanvas(clearHistory = true) {
  if (!ctx || !canvasEl) return;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  if (clearHistory) drawHistory = [];
}

// ---------------------- KEYBOARD SHORTCUTS ----------------------
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (['input', 'textarea', 'select'].includes(e.target.tagName.toLowerCase())) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'n':
      case 'N':
        toggleTeacherNotes();
        break;
      case 'd':
      case 'D':
        toggleDrawingToolbar();
        break;
      case 'g':
      case 'G':
        toggleViewMode();
        break;
      case 'Escape':
        closeAllModals();
        break;
      case '1':
        openModal('modalBalanceSheetLab');
        break;
      case '2':
        openModal('modalCashFlowLab');
        break;
      case '3':
        openModal('modalWealthGame');
        break;
      case '4':
        openModal('modalHomework');
        break;
    }
  });
}

// ---------------------- MODAL MANAGEMENT ----------------------
window.openModal = function(modalId) {
  closeAllModals();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
};
