/**
 * 115學年度「管理探索二」第十週互動教學主程式
 * 單元名稱：不動產、房地產與租買決策財務學
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#b45309',
  drawingWidth: 3,

  // 1小時活動 (房屋權狀公設比與主建物扣除計算器)
  publicRatioPreset: 'standard_3bed',

  // 2小時活動 (房貸本息均等 vs 本金均等月繳額試算器)
  mortgagePreset: 'first_home_30y',

  // 3小時遊戲 (不動產租買達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (個人大學租屋體檢與未來租買試算報告)
  homeworkData: {
    studentName: '',
    studentId: '',
    targetPlan: '',
    dim1Check: '',
    dim2Dti: '',
    dim3RentVsBuy: '',
    dim4SavingPlan: '',
    conclusionGrade: 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initPublicRatioLab();
  initMortgageLab();
  initRealEstateGame();
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
  W10_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W10_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w10-primary, #b45309);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W10_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W10_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W10_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W10_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W10_SLIDES_DATA.length - 1) {
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
          <h4>🏠 不動產財務學真相：資產還是負債的本質思辨</h4>
          <span class="sub-tag">「除非房子能為你帶來淨現金流，否則自住房是你最大的負債！」— Robert Kiyosaki</span>
        </div>
        <div style="background:#fffbeb; border:2px dashed #b45309; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🏙️</div>
          <h4 style="color:#b45309; font-size:1.15rem; margin-bottom:8px;">打破「買房穩賺不賠」的傳統造神迷思</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:540px; margin:0 auto;">
            許多年輕人背負 30-40 年沉重房貸，將人生最精華的 30 年現金流徹底鎖死。<br>
            <strong>真正的財務智慧：</strong>精算權狀實坪、嚴守租賃法規，並以「機會成本」理性評估租買最優解！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第十週 3 小時學習地圖：從租屋自保守則到租買機會成本</h4>
          <span class="sub-tag">建構理性居住思維 ‧ 掌握房貸攤還算術 ‧ 拒當盲目房奴</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border-top:4px solid #b45309; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">第 1 小時 ‧ 房產特性與租屋</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">不動產 4 特性、權狀主建物與公設比、實價登錄 2.0、租賃專法押金 2 個月與電費上限、頭期款 20%。</p>
          </div>
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.85rem;">第 2 小時 ‧ 房貸攤還與新青安</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">本息均等 vs 本金均等、寬限期暴增陷阱、新青安 1000 萬 40 年期、央行第 7 波限貸令與 DTI 33% 警戒線。</p>
          </div>
          <div style="background:#f0fdf4; border-top:4px solid #10b981; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.85rem;">第 3 小時 ‧ 租買對決與部署</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">租買機會成本算術、200 萬頭期款投 0050 複利 20 年 932 萬真相、房地合一 2.0 閉鎖期與 10 年買房部署。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧱 不動產 (Real Estate) 的四大本質物理與經濟特性</h4>
          <span class="sub-tag">異質性 ‧ 不可移動性 ‧ 高總價高槓桿 ‧ 長壽命低流動性</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.82rem;">1. 異質性 (Heterogeneity)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">世上沒有兩間完全相同的房屋！樓層、坐向、採光、屋況差異導致定價高度非標準化。</p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.82rem;">2. 不可移動性 (Immobility)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">位置永久固定，無法搬運套利。「Location, Location, Location」決定了地段與未來增值命運。</p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#ef4444; font-size:0.82rem;">3. 高總價與高槓桿 (High Leverage)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">動輒數百萬至數千萬，絕大多數買方必須借貸 7-8 成銀行房貸，財務槓桿倍數極高。</p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong style="color:#10b981; font-size:0.82rem;">4. 長壽命與低流動性 (Low Liquidity)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">建築壽命 50 年以上，但變現交易過程繁瑣（看屋、簽約、過戶、貸款），耗時數月。</p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📐 看懂房屋權狀坪數：主建物、附屬建物與「公設比」</h4>
          <span class="sub-tag">公設比 = 共用部分坪數 / 權狀總坪數 &times; 100% ‧ 拒花大錢買走廊樓梯！</span>
        </div>
        <div class="deed-grid">
          <div class="deed-box primary">
            <h5 style="color:#b45309; font-size:0.85rem;">室內主建物 (約 55-65%)</h5>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">客廳、臥室、廚房、衛浴等室內專屬實質生活空間。<strong>這才是真正實住的坪數！</strong></p>
          </div>
          <div class="deed-box balcony">
            <h5 style="color:#0284c7; font-size:0.85rem;">附屬建物 (約 5-10%)</h5>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">專屬露台、工作陽台、花台與雨遮。提供晾曬與採光通風機能。</p>
          </div>
          <div class="deed-box public">
            <h5 style="color:#ef4444; font-size:0.85rem;">共用部分 (公設比 30-40%)</h5>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">大樓門廳、電梯間、逃生梯、地下機房與管理室。公設比高達 35% 代表買 30 坪實住僅 19.5 坪！</p>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔍 實價登錄 2.0 與《平均地權條例》改革透明化</h4>
          <span class="sub-tag">門牌完整揭露至具體門牌號碼 ‧ 預售屋簽約 30 天申報 ‧ 全面禁止紅單轉售</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">✅ 實價登錄 2.0 三大核心變革：</strong>
            <ul style="font-size:0.75rem; color:#334155; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li><strong>門牌完全揭露：</strong>破除過去「1-30號」模糊區間，直接看清各樓層實成交價。</li>
              <li><strong>預售屋即時登錄：</strong>簽約 30 天內必須逐筆申報，房價資訊更即時。</li>
              <li><strong>重罰違法申報：</strong>價格不實申報最高可處罰鍰 15 萬元並限期改正。</li>
            </ul>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.82rem;">🚫 嚴打預售屋換約炒作：</strong>
            <p style="font-size:0.75rem; color:#7f1d1d; margin-top:4px; line-height:1.5;">
              《平均地權條例》明定除配偶、直系或二親等旁系血親外，<strong>全面禁止預售屋合約轉售</strong>！重罰炒房團體最高 <strong>5,000 萬元</strong>，杜絕紅單暴利炒作。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 大一外宿租屋法律自保 (一)：租賃專法與押金上限</h4>
          <span class="sub-tag">內政部《住宅租賃契約應約定及不得約定事項》：押金最高不得超過 2 個月！</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px; margin-bottom:8px;">
          <strong style="color:#b45309; font-size:0.85rem;">⚠️ 法定租屋合約三大不可違背鐵律：</strong>
          <p style="font-size:0.75rem; color:#78350f; margin-top:2px;">
            房東要求收取超過 2 個月租金之押金（例如月租 8,000 收 24,000），該超收約定<strong>依法無效</strong>！房客得於租賃期間要求將超收之 1 個月押金直接抵扣次月房租。
          </p>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border-left:4px solid #10b981; padding:6px 10px; border-radius:4px;">
            <strong style="color:#15803d; font-size:0.78rem;">使用官方定型化契約</strong>
            <p style="font-size:0.72rem; color:#475569;">堅持簽署內政部公告之定型化契約範本，拒絕房東私印之不利霸王條款。</p>
          </div>
          <div style="background:#f8fafc; border-left:4px solid #ef4444; padding:6px 10px; border-radius:4px;">
            <strong style="color:#dc2626; font-size:0.78rem;">不得約定禁止報稅與遷戶籍</strong>
            <p style="font-size:0.72rem; color:#475569;">房東合約若載明「不得申報租金扣除額或租屋補貼」，該條款依法自始無效！</p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚡ 大一外宿租屋法律自保 (二)：電費計價上限與點交存證</h4>
          <span class="sub-tag">嚴格杜絕房東一度電超收 7-8 元暴利 ‧ 入住當日拍照錄影留存最強法律證據</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">💡 電費計價新法規上限：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              分租套房電費每度<strong>不得超過台電當月用電最高級距電價</strong>（夏月約 7.69 元/度、非夏月約 6.03 元/度），或按台電帳單平均電費分攤。房東巧立名目加收電費屬違法行為！
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">📷 入住第一天點交存證 SOP：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              搬進去第 1 天將全室牆面瑕疵、地板刮痕、冷氣遙控器、衛浴水龍頭現況以手機拍照錄影，寄 Email 給房東存證。退租時作為原貌返還依據，防止押金被苛扣！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇹🇼 官方實證：全台主要縣市「房價所得比」與沉重負擔</h4>
          <span class="sub-tag">全國平均 10.2 倍 ‧ 台北市高達 16.0 倍 ‧ 房貸負擔率突破 67%！</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-top:8px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#991b1b; font-size:0.8rem;">台北市</strong>
            <div style="font-size:1.3rem; font-weight:800; color:#dc2626; margin:2px 0;">16.0 倍</div>
            <span style="font-size:0.7rem; color:#64748b;">房貸負擔率 67.1%</span>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#92400e; font-size:0.8rem;">新北市</strong>
            <div style="font-size:1.3rem; font-weight:800; color:#d97706; margin:2px 0;">12.5 倍</div>
            <span style="font-size:0.7rem; color:#64748b;">房貸負擔率 52.3%</span>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#92400e; font-size:0.8rem;">台中市</strong>
            <div style="font-size:1.3rem; font-weight:800; color:#d97706; margin:2px 0;">11.8 倍</div>
            <span style="font-size:0.7rem; color:#64748b;">房貸負擔率 49.2%</span>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#166534; font-size:0.8rem;">全國平均</strong>
            <div style="font-size:1.3rem; font-weight:800; color:#10b981; margin:2px 0;">10.2 倍</div>
            <span style="font-size:0.7rem; color:#64748b;">房貸負擔率 42.8%</span>
          </div>
        </div>
        <p style="font-size:0.75rem; color:#64748b; margin-top:8px; text-align:center;">
          數據意義：代表台北市民平均必須「不吃不喝 16 年」才能買得起一間平均總價住宅！
        </p>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 買房資金結構：自備頭期款 20% 與貸款成數 LTV (80%)</h4>
          <span class="sub-tag">千萬宅需自備 200 萬現金 ‧ 額外準備 50 萬交易雜費與裝修款</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">1. 銀行貸款成數 (LTV 80%)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              一般自住首購宅銀行核貸成數最高約 <strong>8 成 (80%)</strong>。購買總價 1,000 萬房屋，銀行貸款最高 800 萬元，分 30-40 年本息攤還。
            </p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">2. 自備頭期款與交易雜費 (25%)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              買方必須準備 <strong>20% (200 萬)</strong> 現金頭期款。此外切記預留約 <strong>5% (50 萬)</strong> 現金支付仲介費 (2%)、契稅、代書費與基礎家電裝修！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第一小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">權狀實坪認知 ➔ 立即進入【權狀公設比計算器】實算室內實用主建物！</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#b45309; font-size:0.88rem; margin-bottom:4px;">💡 第一小時三大不可動搖核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>看懂建物權狀：真正能住的是「室內主建物」，切莫花大錢買 35% 虛坪公設。</li>
            <li>租賃專法維權：押金上限嚴格為 2 個月，電費不得超收，入住當天拍照存證。</li>
            <li>頭期款基本門檻：買房需備足 20% 現金頭期款外加 5% 交易稅費，切忌全額透支。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalPublicRatioLab')" style="padding:8px 18px; font-size:0.85rem; background:#b45309;">
            點擊開啟【房屋權狀公設比計算器】實戰演練 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 房貸兩大還款方式：本息平均攤還 vs. 本金平均攤還</h4>
          <span class="sub-tag">每月固定繳款好規劃 (本息均等) vs 前期重壓但省總利息 (本金均等)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">1. 本息平均攤還 (Equal Total) — 90% 首選</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              每月償還金額完全固定（如每月固定扣 30,390 元）。前期利息多本金少，後期本金比利息多。現金流明確好預算，最適合受薪薪資族。
            </p>
          </div>
          <div style="background:#f0fdf4; border-top:4px solid #10b981; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">2. 本金平均攤還 (Equal Principal) — 省息首選</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              每月償還固定本金 + 剩餘本金產生的利息。首月月繳最高（如首月 36,800 元），隨後每月逐月遞減。30 年總利息比起本息均等法省下約 30-40 萬元！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 房貸「寬限期 (Grace Period)」甜蜜陷阱：期滿後月繳額暴增！</h4>
          <span class="sub-tag">前 3-5 年只繳利息爽一時 ‧ 期滿後剩餘本金被迫在 25 年內還清！</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; margin-bottom:8px;">
          <strong style="color:#991b1b; font-size:0.85rem;">🚨 30 年期 800 萬房貸 (利率 2.2%) 實算震撼對比：</strong>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:6px; font-size:0.78rem;">
            <div style="background:#fff; padding:6px; border-radius:4px;">
              <strong style="color:#0284c7;">前 3 年寬限期內：</strong><br>
              每月只需繳利息：<span style="color:#10b981; font-weight:800; font-size:1.05rem;">NT$ 14,667 元</span>
            </div>
            <div style="background:#fff; padding:6px; border-radius:4px;">
              <strong style="color:#ef4444;">第 4 年起寬限期滿：</strong><br>
              每月本息暴增至：<span style="color:#dc2626; font-weight:800; font-size:1.05rem;">NT$ 34,800 元 (翻 2.4 倍!)</span>
            </div>
          </div>
        </div>
        <p style="font-size:0.75rem; color:#64748b; line-height:1.5;">
          警示：若購屋者依照寬限期的低月繳來評估買房負擔，寬限期一過極易面臨無力負擔斷供法拍！
        </p>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 財政部「新青年安心成家貸款 (新青安)」四大優惠解析</h4>
          <span class="sub-tag">無自有住宅首購青年專屬優惠 ‧ 最長 40 年期與政府補貼利率</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px;">
          <div style="background:#fffbeb; border-top:3px solid #b45309; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#b45309; font-size:0.78rem;">最高貸款額度</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#d97706; margin:3px 0;">1,000 萬</div>
            <span style="font-size:0.7rem; color:#64748b;">大幅提高額度上限</span>
          </div>
          <div style="background:#f0f9ff; border-top:3px solid #0284c7; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#0284c7; font-size:0.78rem;">最長貸款年限</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#0284c7; margin:3px 0;">40 年期</div>
            <span style="font-size:0.7rem; color:#64748b;">有效降低每月月繳</span>
          </div>
          <div style="background:#f0fdf4; border-top:3px solid #10b981; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#15803d; font-size:0.78rem;">最長寬限期</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#10b981; margin:3px 0;">5 年</div>
            <span style="font-size:0.7rem; color:#64748b;">彈性還本籌備期</span>
          </div>
          <div style="background:#fef2f2; border-top:3px solid #ef4444; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#991b1b; font-size:0.78rem;">利息補貼後</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#ef4444; margin:3px 0;">約 1.775%</div>
            <span style="font-size:0.7rem; color:#64748b;">政府補貼 1.5 碼</span>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛑 中央銀行第七波選擇性信用管制 (限貸令)</h4>
          <span class="sub-tag">名下有房者取消寬限期 ‧ 第 2 戶房貸成數降至 5 成 ‧ 斬斷投機槓桿</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:10px;">
            <strong style="color:#be123c; font-size:0.82rem;">1. 自然人名下有房 (第 1 戶購屋)：</strong>
            <p style="font-size:0.75rem; color:#4c0519; margin-top:4px; line-height:1.5;">
              只要個人名下已有房屋（即使無房貸，如繼承持分老屋），申請新購屋貸款時<strong>全面取消寬限期</strong>！從第 1 個月起必須直接本息攤還，防範假首購炒作。
            </p>
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:10px;">
            <strong style="color:#be123c; font-size:0.82rem;">2. 自然人第 2 戶購屋貸款：</strong>
            <p style="font-size:0.75rem; color:#4c0519; margin-top:4px; line-height:1.5;">
              全國不分區域，貸款成數上限由原本 6 成<strong>嚴格降至 5 成 (50%)</strong>，且一律<strong>無寬限期</strong>！買千萬宅必須自備整整 500 萬元現金！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 拒當房奴！房貸負擔率 (DTI) <= 33% 黃金安全警戒線</h4>
          <span class="sub-tag">每月房貸扣款 &le; 總收入 1/3 ‧ 超過 50% 陷入高風險房奴地獄</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f0fdf4; border-top:3px solid #10b981; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#15803d; font-size:0.78rem;">DTI &le; 33% (健康安全)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">房貸僅佔 1/3，留下 2/3 現金流應對伙食、醫療、生活娛樂與投資，財務體質強健。</p>
          </div>
          <div style="background:#fffbeb; border-top:3px solid #f59e0b; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#b45309; font-size:0.78rem;">34% - 50% (沉重緊繃)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">每個月超過 4 成薪水被房貸抽走，幾乎無法額外儲蓄投資，生活品質受到顯著壓抑。</p>
          </div>
          <div style="background:#fef2f2; border-top:3px solid #ef4444; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#dc2626; font-size:0.78rem;">&gt; 50% (高危房奴)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">薪水一半以上繳房貸，一旦遭遇失業、無薪假或央行升息 1-2 碼，立刻面臨斷供斷炊！</p>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔢 房貸利率算術：指標利率 (Index) + 個人加碼碼數 (Spread)</h4>
          <span class="sub-tag">一段式浮動透明 ‧ 警惕銀行「前兩年 1.8%」分段式低利誘餌</span>
        </div>
        <div style="display:grid; grid-template-columns:1.1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">房貸合約定價公式：</strong>
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:4px; padding:6px; font-weight:800; color:#1e293b; margin:4px 0; font-size:0.85rem;">
              房貸利率 = 指標利率 (定儲均率) + 加碼利率
            </div>
            <p style="font-size:0.72rem; color:#475569;">指標利率由六大公股行庫 1 年期定存利率平均計算，隨央行升降息同步浮動調整。</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">一段式 vs 分段式陷阱：</strong>
            <p style="font-size:0.75rem; color:#78350f; margin-top:4px; line-height:1.5;">
              分段式前 2 年利率僅 1.85%，但第 3 年起加碼暴增至 2.45%！精算 30 年總利息成本往往遠高於一段式 2.18% 方案。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💸 購屋隱形交易成本：千萬宅需額外準備 50 萬現金！</h4>
          <span class="sub-tag">買方仲介費 1-2% ‧ 契稅印花稅代書規費 ‧ 基礎家電與老屋翻新</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:6px;">
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:6px; text-align:center;">
            <strong style="color:#0284c7; font-size:0.75rem;">買方仲介費</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">成交總價 1%-2%<br>千萬宅約 <strong>10-20 萬</strong></p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:6px; text-align:center;">
            <strong style="color:#b45309; font-size:0.75rem;">契稅與印花稅</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">房屋現值 6%<br>約 <strong>3-6 萬元</strong></p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:6px; text-align:center;">
            <strong style="color:#15803d; font-size:0.75rem;">代書費與規費</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">過戶抵押設定<br>約 <strong>2-3 萬元</strong></p>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:6px; text-align:center;">
            <strong style="color:#dc2626; font-size:0.75rem;">基本裝修家電</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">冷氣洗衣機老屋翻新<br>約 <strong>30-80 萬元</strong></p>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 房地合一稅 2.0 閉鎖期：短期轉手重稅防炒作</h4>
          <span class="sub-tag">持有 2 年內轉售課徵 45% 重稅 ‧ 5 年內課 35% ‧ 自住 6 年享 400 萬免稅</span>
        </div>
        <div class="tax-lockup-bar">
          <div class="tax-period-item high">
            <strong>持有 &le; 2 年</strong>
            <div style="font-size:1.2rem; font-weight:800; margin:2px 0;">45% 重稅</div>
            <span style="font-size:0.7rem;">賺 200 萬課 90 萬稅</span>
          </div>
          <div class="tax-period-item mid">
            <strong>持有 2 ~ 5 年</strong>
            <div style="font-size:1.2rem; font-weight:800; margin:2px 0;">35% 重稅</div>
            <span style="font-size:0.7rem;">打擊中期轉賣投機</span>
          </div>
          <div class="tax-period-item low">
            <strong>自住滿 6 年</strong>
            <div style="font-size:1.2rem; font-weight:800; margin:2px 0;">400 萬免稅</div>
            <span style="font-size:0.7rem;">超出部分僅課 10% 優惠</span>
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏗️ 預售屋 (Pre-sale) vs. 中古屋 (Existing Home) 付款節奏比對</h4>
          <span class="sub-tag">工程期分期攤派頭期款 vs 1-2 個月內繳清整筆 20% 現金</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">1. 預售屋付款節奏：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              頭期款 20% 分為訂簽開 (10%) + 2-3 年施工期間工程款分期繳納 (10%)。前期現金壓力小，但需承擔建商延期交屋或施工品質落差之風險。
            </p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">2. 中古屋付款節奏：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              簽約至交屋 1-2 個月內，必須一次性拿出完整 20% 現金頭期款！好處是房屋實體、採光、鄰居與管委會運作品質均眼見為實。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第二小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">房貸精算思維 ➔ 立即進入【房貸月繳額試算器】實算本息vs本金均等！</span>
        </div>
        <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#0284c7; font-size:0.88rem; margin-bottom:4px;">💡 第二小時三大房貸核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>本息攤還每月固定利於規劃，本金攤還前期負擔大但 30 年總利息大幅節省。</li>
            <li>寬限期是毒藥也是補藥，期滿後月繳翻倍暴增，切莫拿寬限期硬買超標房屋。</li>
            <li>嚴守 DTI <= 33% 房貸負擔率警戒線，善用新青安 40 年期降低每月收支壓力。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalMortgageLab')" style="padding:8px 18px; font-size:0.85rem; background:#0284c7;">
            點擊開啟【房貸月繳額與還款試算器】實戰試算 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 租房 vs. 買房 (Rent vs. Buy) 財務決策機會成本模型</h4>
          <span class="sub-tag">買房是強迫儲蓄還是鎖死資金？租房是幫房東養房還是保留資本彈性？</span>
        </div>
        <div class="rent-buy-grid">
          <div class="opportunity-box buy">
            <h5 style="color:#b45309; font-size:0.85rem;">買房持有真實成本</h5>
            <ul style="font-size:0.75rem; color:#475569; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li>30 年高額房貸利息支出 (約 300 萬+)</li>
              <li>每年房屋稅、地價稅、火險地震險</li>
              <li>每個月社區管理費、房屋老舊折舊維修</li>
              <li><strong>最大機會成本：</strong>200 萬頭期款被鎖死無法投資！</li>
            </ul>
          </div>
          <div class="opportunity-box rent">
            <h5 style="color:#15803d; font-size:0.85rem;">理性租房真實優勢</h5>
            <ul style="font-size:0.75rem; color:#475569; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li>每月租金是純沉沒支出，但無修繕與折舊負擔</li>
              <li>隨職場發展自由搬遷，無交易稅費套牢</li>
              <li><strong>最大財務亮點：</strong>完整保留 200 萬頭期款現金！</li>
              <li>投入全球市值 ETF 獲取年化 8% 複利！</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 「200 萬頭期款投入 0050 ETF 複利 20 年」的 932 萬數學真相</h4>
          <span class="sub-tag">年化 8% 複利的力量 ‧ 買房年化增值若低於 3.5%，租房投資全面勝出！</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; color:#15803d; font-weight:900;">200 萬 &times; (1 + 8%)<sup>20</sup> = 932 萬元！</div>
          <p style="font-size:0.82rem; color:#334155; margin-top:6px; line-height:1.5;">
            如果不買 1,000 萬房子，將 200 萬頭期款投入 0050 ETF，20 年後資產暴增至 <strong>932 萬元</strong>！<br>
            買房者在扣除 300 萬房貸利息、稅金修繕後，房子必須在 20 年後漲破 <strong>1,600 萬以上</strong>才能打平！
          </p>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📉 淨租金收益率 (Net Rental Yield) 算術：為什麼台灣租金回報僅 1.5%？</h4>
          <span class="sub-tag">全年淨租金 / 房屋總價 = 1.5% ‧ 低於銀行定存！房東全靠賭房價上漲</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">1,500 萬住宅收租試算：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              月租 25,000 元，全年租金 30 萬元。扣除地價稅、房屋稅、招租空置期與維修費後，淨收入僅約 22 萬元。淨租金收益率僅 <strong>1.46%</strong>！
            </p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">租金收益率全球倒數：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              美歐主要城市租金收益率高達 4%~6%，台灣僅 1.5% 居全球末段班。這證明台灣房東並非靠租金現金流致富，而是極度依賴「資本利得 (房價暴漲)」的投機狂潮。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏡 房地合一稅 2.0 自住房「滿 6 年 400 萬免稅額」實戰</h4>
          <span class="sub-tag">自住設籍滿 6 年 ‧ 房價增值 400 萬內免稅 ‧ 超出部分僅課 10% 優惠稅率</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px;">
          <h5 style="color:#15803d; font-size:0.9rem; margin-bottom:4px;">自住免稅三大嚴格法定要件：</h5>
          <ul style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.6;">
            <li>個人或配偶、未成年子女辦竣戶籍登記，持有並實際居住連續滿 6 年。</li>
            <li>交易前 6 年內無出租、供營業或執行業務使用。</li>
            <li>同一人、配偶及未成年子女 6 年內以享受 1 次為限。</li>
          </ul>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 實務查驗：內政部實價登錄 2.0 官方網站 (lvr.land.moi.gov.tw)</h4>
          <span class="sub-tag">手把手教導：扣除車位價格與車位坪數 ‧ 計算真實每坪單價</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <strong style="color:#b45309; font-size:0.82rem;">💡 破解房仲話術：車位拆算公式</strong>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:4px; padding:8px; margin:6px 0; font-size:0.78rem; line-height:1.5;">
            若總價 1,500 萬 (含車位 200 萬)，權狀 40 坪 (含車位 10 坪)：<br>
            <strong>未拆車位假單價：</strong>1500 / 40 = <strong>37.5 萬/坪</strong><br>
            <strong>拆除車位真單價：</strong>(1500 - 200) / (40 - 10) = <strong>43.3 萬/坪 (高出近 6 萬!)</strong>
          </div>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 大一新鮮人 10 年買房超前部署計畫 (18 至 28 歲積累 200 萬)</h4>
          <span class="sub-tag">大學四年積累 26 萬種子 ➔ 養好 JCIC 信用評分 ➔ 出社會 6 年衝刺達標</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#fff; border-top:3px solid #b45309; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.78rem;">階段一：大一至大四 (18-22歲)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">兼職打工每月存 4,500 元定期定額 0050 ETF，4 年積累約 26 萬元第一筆資本種子。</p>
          </div>
          <div style="background:#fff; border-top:3px solid #0284c7; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.78rem;">階段二：JCIC 聯徵信用培養</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">辦第一張薪轉信用卡，每月全額繳清絕不使用循環利息，培養 5 年優良信用紀錄爭取 8 成房貸。</p>
          </div>
          <div style="background:#fff; border-top:3px solid #10b981; border-radius:6px; padding:8px;">
            <strong style="color:#15803d; font-size:0.78rem;">階段三：職場前 6 年 (22-28歲)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">提升本業收入，拉高月儲蓄投資率至 40%，配合 8% 複利於 28 歲達成 200 萬頭期款水庫！</p>
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 看房避坑指南：海砂輻射、凶宅揭露與驗屋實戰清單</h4>
          <span class="sub-tag">索取「不動產現況說明書」‧ 交屋前落實浴室積水排水與窗框滲漏測試</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#fff; border-left:4px solid #ef4444; border-radius:4px; padding:8px;">
            <strong style="color:#dc2626; font-size:0.78rem;">重大瑕疵法定揭露</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">依內政部定型化規範，屋主與房仲必須據實揭露是否曾發生凶殺非自然死亡、輻射鋼筋或海砂屋瑕疵。</p>
          </div>
          <div style="background:#fff; border-left:4px solid #0284c7; border-radius:4px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.78rem;">交屋現場驗屋四大檢查</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:2px;">浴室放水積水測試防水層、陽台水管注水防堵塞、連續暴雨後檢查窗角滲水痕跡、所有插座接地電壓檢測。</p>
          </div>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 給年輕人的不動產理性租買四大終身金律</h4>
          <span class="sub-tag">租屋嚴守權益 ‧ 房貸 DTI 不超標 ‧ 租買算機會成本 ‧ 自住善用 6 年免稅</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border-left:4px solid #b45309; border-radius:4px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">金律一：租屋簽約嚴守專法保護</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">押金上限 2 個月，電費不得超收，入住拍照錄影存證，拒絕不平等霸王條款。</p>
          </div>
          <div style="background:#f0f9ff; border-left:4px solid #0284c7; border-radius:4px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">金律二：房貸負擔率嚴控 DTI &le; 33%</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">每月房貸控制在月收入 1/3 以內，拒絕過度槓桿，絕不讓房貸摧毀人生生活品質。</p>
          </div>
          <div style="background:#f0fdf4; border-left:4px solid #10b981; border-radius:4px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">金律三：租買決策必算機會成本</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">評估頭期款投資 0050 ETF 複利效果，不盲信買房必勝，以財務自由為終極目標。</p>
          </div>
          <div style="background:#fef2f2; border-left:4px solid #ef4444; border-radius:4px; padding:10px;">
            <strong style="color:#dc2626; font-size:0.82rem;">金律四：自住購屋善用滿 6 年 400 萬免稅</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">自住滿 6 年享受房地合一 400 萬免稅額，善用新青安 40 年期低利槓桿。</p>
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：第十週不動產與租買決策全景知識圖譜</h4>
          <span class="sub-tag">房產特性 ➔ 租屋維權 ➔ 房貸攤還 ➔ 政策限貸 ➔ 機會成本 ➔ 10年部署</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px;">
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.8rem;">第 1 小時 ‧ 法律與權狀層：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">不動產 4 特性 + 主建物實坪算術 + 實價登錄 2.0 門牌揭露 + 租賃專法押金 2 個月上限</span>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">第 2 小時 ‧ 房貸與金融層：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">本息均等 vs 本金均等 + 寬限期暴增陷阱 + 新青安 40 年 + 央行限貸令 + DTI 33%</span>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:8px;">
            <strong style="color:#15803d; font-size:0.8rem;">第 3 小時 ‧ 決策與生涯層：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">租買機會成本 (0050 ETF 20年932萬) + 淨租金收益 1.5% + 10年積累 200 萬頭期款 SOP</span>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業說明與第十一週【個人綜合所得稅】預告</h4>
          <span class="sub-tag">完成第十週作業 ‧ 實踐個人租屋體檢與租買試算 ‧ 邁向財務獨立</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">📝 第十週四維度作業繳交要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              線上填寫當前大學租屋體檢（押金、電費）、設定 DTI 33% 購屋目標、比較租房投資 0050 機會成本，並制定大一到 28 歲頭期款積累藍圖！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem; background:#b45309;">
                開啟第十週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">📊 第十一週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【個人綜合所得稅與節稅實務】：打工退稅算術、薪資與房租特扣額雙重避稅、手機報稅 5 分鐘 SOP！
            </p>
          </div>
        </div>
      </div>`;
      break;

    default:
      container.innerHTML = `<div style="padding:20px; text-align:center; color:#64748b;">Slide Visual #${id}</div>`;
  }
}

// ---------------------- 1 HOUR ACTIVITY: PUBLIC RATIO LAB ----------------------
function initPublicRatioLab() {
  document.querySelectorAll('.btn-preset-deed').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-deed').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.publicRatioPreset = pKey;
      loadPublicRatioPreset(pKey);
    });
  });

  ['deedTotalArea', 'deedPublicArea', 'deedBalconyArea'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculatePublicRatio);
  });

  loadPublicRatioPreset('standard_3bed');
}

function loadPublicRatioPreset(pKey) {
  const p = W10_PUBLIC_RATIO_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('deedTotalArea')) document.getElementById('deedTotalArea').value = p.totalDeed;
  if (document.getElementById('deedPublicArea')) document.getElementById('deedPublicArea').value = p.publicArea;
  if (document.getElementById('deedBalconyArea')) document.getElementById('deedBalconyArea').value = p.balconyArea;

  calculatePublicRatio(p.diagnosis);
}

function calculatePublicRatio(customDiagnosis = '') {
  const total = parseFloat(document.getElementById('deedTotalArea')?.value) || 0;
  const publicArea = parseFloat(document.getElementById('deedPublicArea')?.value) || 0;
  const balcony = parseFloat(document.getElementById('deedBalconyArea')?.value) || 0;

  const publicRatio = total > 0 ? ((publicArea / total) * 100).toFixed(1) : 0;
  const mainBuilding = Math.max(0, total - publicArea - balcony).toFixed(1);
  const mainRatio = total > 0 ? ((mainBuilding / total) * 100).toFixed(1) : 0;

  const elRatio = document.getElementById('outPublicRatio');
  const elMain = document.getElementById('outMainBuilding');
  const elMainRatio = document.getElementById('outMainRatio');
  const elDiag = document.getElementById('outPublicDiagnosis');

  if (elRatio) {
    elRatio.textContent = `${publicRatio}%`;
    elRatio.style.color = publicRatio > 35 ? '#ef4444' : (publicRatio < 20 ? '#10b981' : '#b45309');
  }
  if (elMain) elMain.textContent = `${mainBuilding} 坪`;
  if (elMainRatio) elMainRatio.textContent = `${mainRatio}%`;

  if (elDiag) {
    if (customDiagnosis) {
      elDiag.innerHTML = `<strong>💡 建物實坪分析：</strong>${customDiagnosis}`;
    } else {
      elDiag.innerHTML = `<strong>💡 建物實坪分析：</strong>權狀總坪數 <strong>${total} 坪</strong>，公設比 <strong>${publicRatio}%</strong>。扣除公設 (${publicArea} 坪) 與陽台 (${balcony} 坪) 後，室內實質供生活擺放家具之主建物僅剩 <strong>${mainBuilding} 坪</strong>（實坪率 ${mainRatio}%）！`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: MORTGAGE LAB ----------------------
function initMortgageLab() {
  document.querySelectorAll('.btn-preset-mort').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-mort').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.mortgagePreset = pKey;
      loadMortgagePreset(pKey);
    });
  });

  ['mortPrice', 'mortLtv', 'mortTenure', 'mortRate', 'mortGrace'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateMortgage);
  });

  loadMortgagePreset('first_home_30y');
}

function loadMortgagePreset(pKey) {
  const p = W10_MORTGAGE_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('mortPrice')) document.getElementById('mortPrice').value = p.price;
  if (document.getElementById('mortLtv')) document.getElementById('mortLtv').value = p.ltv;
  if (document.getElementById('mortTenure')) document.getElementById('mortTenure').value = p.tenure;
  if (document.getElementById('mortRate')) document.getElementById('mortRate').value = p.rate;
  if (document.getElementById('mortGrace')) document.getElementById('mortGrace').value = p.grace;

  calculateMortgage(p.desc);
}

function calculateMortgage(customDesc = '') {
  const price = parseFloat(document.getElementById('mortPrice')?.value) || 0;
  const ltv = parseFloat(document.getElementById('mortLtv')?.value) || 80;
  const tenure = parseInt(document.getElementById('mortTenure')?.value, 10) || 30;
  const rate = parseFloat(document.getElementById('mortRate')?.value) || 2.2;
  const grace = parseInt(document.getElementById('mortGrace')?.value, 10) || 0;

  const loanAmount = price * (ltv / 100);
  const monthlyRate = (rate / 100) / 12;
  const totalMonths = tenure * 12;
  const graceMonths = grace * 12;
  const repayMonths = totalMonths - graceMonths;

  // 1. 寬限期月利息
  const graceMonthly = Math.round(loanAmount * monthlyRate);

  // 2. 本息平均攤還 (寬限期後)
  let postGraceMonthly = 0;
  if (repayMonths > 0 && monthlyRate > 0) {
    postGraceMonthly = Math.round(
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, repayMonths))) /
      (Math.pow(1 + monthlyRate, repayMonths) - 1)
    );
  } else if (repayMonths > 0) {
    postGraceMonthly = Math.round(loanAmount / repayMonths);
  }

  // 3. 總利息 (本息攤還)
  const totalInterestEqual = Math.round((graceMonthly * graceMonths) + (postGraceMonthly * repayMonths) - loanAmount);

  // 4. 本金平均攤還 (不考慮寬限期之 30 年基準)
  const monthlyPrincipal = loanAmount / totalMonths;
  let totalInterestPrincipal = 0;
  for (let m = 0; m < totalMonths; m++) {
    const remaining = loanAmount - (m * monthlyPrincipal);
    totalInterestPrincipal += remaining * monthlyRate;
  }
  const interestSaved = Math.max(0, Math.round(totalInterestEqual - totalInterestPrincipal));

  const elMonthly = document.getElementById('outMortMonthly');
  const elGrace = document.getElementById('outMortGraceMonthly');
  const elInterest = document.getElementById('outMortTotalInterest');
  const elSaved = document.getElementById('outMortDifference');
  const elAdvice = document.getElementById('outMortAdvice');

  if (elMonthly) elMonthly.textContent = `NT$ ${postGraceMonthly.toLocaleString()} 元 / 月`;
  if (elGrace) elGrace.textContent = grace > 0 ? `NT$ ${graceMonthly.toLocaleString()} 元 / 月` : '無寬限期';
  if (elInterest) elInterest.textContent = `約 NT$ ${Math.round(totalInterestEqual / 10000).toLocaleString()} 萬元`;
  if (elSaved) elSaved.textContent = `省約 NT$ ${Math.round(interestSaved / 10000).toLocaleString()} 萬`;

  if (elAdvice) {
    if (customDesc) {
      elAdvice.innerHTML = `<strong>💡 房貸決策診斷：</strong>${customDesc}`;
    } else {
      elAdvice.innerHTML = `<strong>💡 房貸決策診斷：</strong>貸款金額 <strong>NT$ ${(loanAmount / 10000).toLocaleString()} 萬元</strong>。${grace > 0 ? `前 ${grace} 年寬限期每月繳息 <strong>${graceMonthly.toLocaleString()} 元</strong>，期滿後暴增至 <strong>${postGraceMonthly.toLocaleString()} 元</strong>！` : `30 年每月固定月繳 <strong>${postGraceMonthly.toLocaleString()} 元</strong>。`} 30 年累計總利息高達 <strong>${Math.round(totalInterestEqual / 10000).toLocaleString()} 萬元</strong>！請確保月繳金額不超過總收入 33%。`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: REAL ESTATE GAME ----------------------
function initRealEstateGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderRealEstateGameLevel();
}

function renderRealEstateGameLevel() {
  const container = document.getElementById('realEstateGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W10_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 300;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【不動產理財達人 (Real Estate Master)】最高榮譽！' : '挑戰完成！榮獲【不動產探索初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#b45309; font-size:1.3rem;">${APP_STATE.gameScore} / 400 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartRealEstateGame()" style="background:#b45309;">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W10_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge" style="background:#b45309; color:#fff;">${q.badge}</span>
        <span class="quiz-score-badge">累計得分：${APP_STATE.gameScore} / 400</span>
      </div>
      <div class="quiz-scenario">
        <strong>${q.title}</strong><br>${q.scenario}
      </div>
      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="btn-quiz-option" onclick="answerRealEstateGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="realEstateGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerRealEstateGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W10_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#realEstateGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('realEstateGameFeedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (selected.isCorrect) {
      APP_STATE.gameScore += 100;
      feedbackEl.style.background = '#f0fdf4';
      feedbackEl.style.border = '1px solid #86efac';
      feedbackEl.style.color = '#15803d';
      feedbackEl.innerHTML = `
        <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
        <div style="margin-top:10px; text-align:right;">
          <button class="btn-nav-step btn-primary-step" onclick="nextRealEstateGameLevel()" style="background:#b45309;">前進下一關 ➔</button>
        </div>
      `;
    } else {
      feedbackEl.style.background = '#fef2f2';
      feedbackEl.style.border = '1px solid #fecaca';
      feedbackEl.style.color = '#991b1b';
      feedbackEl.innerHTML = `
        <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
        <div style="margin-top:10px; text-align:right;">
          <button class="btn-nav-step btn-primary-step" onclick="nextRealEstateGameLevel()" style="background:#b45309;">前進下一關 ➔</button>
        </div>
      `;
    }
  }
};

window.nextRealEstateGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderRealEstateGameLevel();
};

window.restartRealEstateGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderRealEstateGameLevel();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Check', 'hwDim2Dti', 'hwDim3RentVsBuy', 'hwDim4SavingPlan', 'hwConclusionGrade', 'hwDecisionSummary'];
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
    dim1Check: document.getElementById('hwDim1Check')?.value || '',
    dim2Dti: document.getElementById('hwDim2Dti')?.value || '',
    dim3RentVsBuy: document.getElementById('hwDim3RentVsBuy')?.value || '',
    dim4SavingPlan: document.getElementById('hwDim4SavingPlan')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('w10_homework_draft', JSON.stringify(data));
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
    const saved = localStorage.getItem('w10_homework_draft');
    if (saved) {
      const data = JSON.parse(saved);
      if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
      if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
      if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = data.targetPlan || '';
      if (document.getElementById('hwDim1Check')) document.getElementById('hwDim1Check').value = data.dim1Check || '';
      if (document.getElementById('hwDim2Dti')) document.getElementById('hwDim2Dti').value = data.dim2Dti || '';
      if (document.getElementById('hwDim3RentVsBuy')) document.getElementById('hwDim3RentVsBuy').value = data.dim3RentVsBuy || '';
      if (document.getElementById('hwDim4SavingPlan')) document.getElementById('hwDim4SavingPlan').value = data.dim4SavingPlan || '';
      if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'A+ (全面且具備實戰避險可行性)';
      if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
    }
  } catch (e) {
    console.warn(e);
  }
}

window.loadHomeworkTemplate = function() {
  const t = W10_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = t.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = t.studentId;
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = t.targetPlan;
  if (document.getElementById('hwDim1Check')) document.getElementById('hwDim1Check').value = t.dim1Check;
  if (document.getElementById('hwDim2Dti')) document.getElementById('hwDim2Dti').value = t.dim2Dti;
  if (document.getElementById('hwDim3RentVsBuy')) document.getElementById('hwDim3RentVsBuy').value = t.dim3RentVsBuy;
  if (document.getElementById('hwDim4SavingPlan')) document.getElementById('hwDim4SavingPlan').value = t.dim4SavingPlan;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = t.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = t.decisionSummary;
  saveHomeworkToLocal();
  alert('已成功載入第十週租屋體檢與租買試算標準示範範本！');
};

window.exportHomeworkJson = function() {
  saveHomeworkToLocal();
  const saved = localStorage.getItem('w10_homework_draft') || '{}';
  const data = JSON.parse(saved);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W10_租屋體檢與租買試算報告_${data.studentName || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportHomeworkMd = function() {
  saveHomeworkToLocal();
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const sid = document.getElementById('hwStudentId')?.value || '未填寫';
  const plan = document.getElementById('hwTargetPlan')?.value || '';
  const d1 = document.getElementById('hwDim1Check')?.value || '';
  const d2 = document.getElementById('hwDim2Dti')?.value || '';
  const d3 = document.getElementById('hwDim3RentVsBuy')?.value || '';
  const d4 = document.getElementById('hwDim4SavingPlan')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第十週作業報告：個人大學租屋體檢與未來租買試算報告
- **學生姓名**：${name}
- **學生學號**：${sid}
- **規劃主題**：${plan}
- **自評等級**：${grade}
- **決策總結**：${summary}

---
### 一、個人大學租屋現況體檢與權益合約檢核 (25%)
${d1}

---
### 二、未來購屋目標設定與房貸負擔率 DTI <= 33% 壓力測試 (25%)
${d2}

---
### 三、租房將頭期款投入 0050 ETF 複利 20 年 vs 買房機會成本精算 (30%)
${d3}

---
### 四、大一到 28 歲積累 200 萬頭期款與 JCIC 信用培養 3 步驟實戰藍圖 (20%)
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

  const filtered = W10_SLIDES_DATA.filter(s => {
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
        openModal('modalPublicRatioLab');
        break;
      case '2':
        openModal('modalMortgageLab');
        break;
      case '3':
        openModal('modalRealEstateGame');
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
