/**
 * 115學年度「管理探索二」第十一週互動教學主程式
 * 單元名稱：個人綜合所得稅、節稅規劃與報稅實務
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#4f46e5',
  drawingWidth: 3,

  // 1小時活動 (綜所稅淨額與稅率級距計算器)
  taxPreset: 'student_parttime',

  // 2小時活動 (打工族預先扣繳與退稅精算器)
  withheldPreset: 'beverage_job',

  // 3小時遊戲 (綜所稅報稅達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (個人打工所得稅體檢與退稅報告)
  homeworkData: {
    studentName: '',
    studentId: '',
    targetPlan: '',
    dim1Check: '',
    dim2Refund: '',
    dim3Deductions: '',
    dim4SecuritySop: '',
    conclusionGrade: 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initTaxBracketLab();
  initWithholdingLab();
  initTaxGame();
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
  W11_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W11_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w11-primary, #4f46e5);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W11_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W11_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W11_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W11_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W11_SLIDES_DATA.length - 1) {
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
          <h4>🏛️ 綜合所得稅本質：國家運作與個人公民財富責任</h4>
          <span class="sub-tag">「世界上唯有死亡與納稅無可避免！」— Benjamin Franklin</span>
        </div>
        <div style="background:#eef2ff; border:2px dashed #4f46e5; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">⚖️</div>
          <h4 style="color:#4f46e5; font-size:1.15rem; margin-bottom:8px;">打破「打工薪水少就不需理會報稅」的刻板迷思</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:540px; margin:0 auto;">
            許多年輕人兼職被預先扣繳 5% 稅金，卻因以為免繳稅而不去報稅，白白將數千至上萬元退稅送給國庫！<br>
            <strong>真正的租稅智慧：</strong>掌握 44.6 萬免稅門檻、善用 18 萬租金特扣，5 月手機線上申報全額退稅！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第十一週 3 小時學習地圖：從稅額算術到合法節稅與手機報稅</h4>
          <span class="sub-tag">掌握個人納稅權益 ‧ 破解扣繳憑單真相 ‧ 打造合法節稅安全網</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#eef2ff; border-top:4px solid #4f46e5; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.85rem;">第 1 小時 ‧ 所得稅公式與級距</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">憲法義務、所得總額減免除額公式、2026單身 44.6 萬免稅門檻、5 大課稅級距 (5%-40%) 與標準vs列舉扣除。</p>
          </div>
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.85rem;">第 2 小時 ‧ 打工退稅與節稅</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">預扣 5% 退稅算術、54C 憑單檢驗、租屋特別扣除額 18 萬、醫藥捐贈、扶養親屬與手機報稅 5 分鐘 SOP。</p>
          </div>
          <div style="background:#f0fdf4; border-top:4px solid #10b981; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.85rem;">第 3 小時 ‧ 綜合配置與實戰</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">雙特扣 39.8 萬盾牌、5 月報稅時間軸、海外所得最低稅、防範假退稅簡訊釣魚詐騙與打工族年納稅歸零 SOP。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 憲法第 19 條：依法律納稅義務與公共服務</h4>
          <span class="sub-tag">全民健保補助 ‧ 高等教育學費補貼 ‧ 國防救災與大眾運輸之財源支柱</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">租稅法律主義的核心精神：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              「無法律則無稅！」政府課稅之項目、稅率、免稅與處罰均必須有立法院通過之法律依據。國家透過累進稅率向高所得者徵稅，補貼弱勢群體，落實所得重分配。
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">大一學生享受的稅收公共財：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              每學期數萬元的公私立大學常態學雜費補貼、全民健康保險醫療資源、捷運台鐵學生優惠，均來自於全民綜合所得稅收之有力支持！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔢 個人綜合所得稅核心算術公式架構</h4>
          <span class="sub-tag">所得總額 &minus; 免稅額 &minus; 扣除額 = 綜合所得淨額 (Taxable Income)</span>
        </div>
        <div class="tax-pillars-grid">
          <div class="tax-pillar-box exemption">
            <h5 style="color:#4f46e5; font-size:0.85rem;">1. 個人免稅額</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#4f46e5; margin:3px 0;">NT$ 9.7 萬</div>
            <p style="font-size:0.72rem; color:#64748b;">每人基本生存維持額度（滿 70 歲長輩為 14.55 萬）</p>
          </div>
          <div class="tax-pillar-box std-deduct">
            <h5 style="color:#0284c7; font-size:0.85rem;">2. 標準扣除額</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#0284c7; margin:3px 0;">NT$ 13.1 萬</div>
            <p style="font-size:0.72rem; color:#64748b;">單身每人 13.1 萬（有配偶合併申報為 26.2 萬）</p>
          </div>
          <div class="tax-pillar-box salary-deduct">
            <h5 style="color:#15803d; font-size:0.85rem;">3. 薪資特別扣除額</h5>
            <div style="font-size:1.1rem; font-weight:800; color:#15803d; margin:3px 0;">NT$ 21.8 萬</div>
            <p style="font-size:0.72rem; color:#64748b;">受薪打工族專屬！打工薪資未達 21.8 萬按實際扣除</p>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 2026 最新綜所稅門檻：單身「年薪 44.6 萬以下零稅負」！</h4>
          <span class="sub-tag">免稅額 9.7 萬 + 標扣 13.1 萬 + 薪扣 21.8 萬 = 446,000 元完美防護盾！</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:14px; text-align:center;">
          <div style="font-size:2rem; font-weight:900; color:#15803d;">446,000 元（月平均約 37,166 元）</div>
          <p style="font-size:0.82rem; color:#334155; margin-top:6px; line-height:1.5;">
            只要大專打工族兼職全年在 44.6 萬元以內，綜合所得淨額<strong>直接歸零</strong>！<br>
            <strong>法規意義：</strong>法律保障每位剛入社會青年最基本的生活生存權益，一毛錢所得稅都不必繳納！
          </p>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📑 大一打工族稅務常識：薪資所得代號 50 與兼職所得</h4>
          <span class="sub-tag">每年 1-2 月收到「扣繳憑單」‧ 查核公司名稱、給付總額與扣繳稅額</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">薪資所得（所得格式代號 50）：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              餐廳工讀、家教時薪等受僱工作之薪資報酬。受法律保護享有最高 <strong>21.8 萬元薪資特別扣除額</strong>，大幅稀釋應納稅額！
            </p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">執行業務所得（格式代號 9A/9B）：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              接案設計、演講、稿費等自由職業者所得。雖無法使用薪資特扣額，但可扣除法定 20%-30% 必要成本費用或專屬免稅額。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 綜所稅 5 大課稅級距 (5% 至 40%) 與累進差額算術</h4>
          <span class="sub-tag">賺越多稅率越高 ‧ 累進差額算術：應納稅額 = 淨額 &times; 稅率 &minus; 累進差額</span>
        </div>
        <div class="tax-bracket-bar">
          <div class="bracket-step-item b5">
            <strong>5% 級距</strong><br>淨額 0-59 萬<br>差額: 0 元
          </div>
          <div class="bracket-step-item b12">
            <strong>12% 級距</strong><br>59-133 萬<br>差額: 41,300
          </div>
          <div class="bracket-step-item b20">
            <strong>20% 級距</strong><br>133-266 萬<br>差額: 147,700
          </div>
          <div class="bracket-step-item b30">
            <strong>30% 級距</strong><br>266-498 萬<br>差額: 413,700
          </div>
          <div class="bracket-step-item b40">
            <strong>40% 級距</strong><br>498 萬以上<br>差額: 911,700
          </div>
        </div>
        <p style="font-size:0.72rem; color:#64748b; margin-top:8px; text-align:center;">
          累進差額目的：避免跨入更高稅率時產生「多賺一塊錢反而稅金暴增」的不合理斷層現象！
        </p>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇹🇼 官方實證：全台綜合所得稅稅收與納稅戶數結構</h4>
          <span class="sub-tag">財政部統計：前 1% 高所得繳納近四成稅款 ‧ 全台近 47% 家戶綜合所得稅為 0 元！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; font-weight:900; color:#15803d;">約 47%</div>
            <strong style="font-size:0.8rem; color:#334155;">全台近半數申報戶綜合所得稅為 0 元</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">高額免稅額與扣除額有效保護中低收入家庭與在校學生，維持基本生活所需。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; font-weight:900; color:#4f46e5;">近 40%</div>
            <strong style="font-size:0.8rem; color:#334155;">全台綜所稅稅收由前 1% 頂層富人承擔</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">超額累進稅率 (40%) 發揮強烈重分配效果，維持國家公共設施運作。</p>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 標準扣除額 vs. 列舉扣除額：二擇一擇高申報算術</h4>
          <span class="sub-tag">單身標扣 13.1 萬 ‧ 若房租+醫藥+捐贈大於 13.1 萬，改採列舉扣除大省稅！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">1. 標準扣除額 (單身 13.1 萬)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              不需任何單據或發票！系統無條件自動給予 13.1 萬元扣除額。適合無租屋、醫療支出極少之單身薪資族。
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">2. 列舉扣除額 (憑收據擇優)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              包括自費醫藥費（無上限）、公益捐贈（所得20%內）、保險費（每人2.4萬上限）。<strong>若單項加總超過 13.1 萬，改用列舉報稅更划算！</strong>
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第一小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">免稅算術思維 ➔ 立即進入【綜所稅淨額計算器】實算個人應納稅額！</span>
        </div>
        <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#4f46e5; font-size:0.88rem; margin-bottom:4px;">💡 第一小時三大不可動搖核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>核心公式：所得總額 - 免稅額 (9.7萬) - 扣除額 (標扣13.1萬+薪扣21.8萬) = 所得淨額。</li>
            <li>單身 44.6 萬零稅負門檻：年收入 44.6 萬以內淨額歸零，完全不需納稅。</li>
            <li>5 大累進課稅級距：5% 至 40%，扣除累進差額精準計算實質稅負。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalTaxBracketLab')" style="padding:8px 18px; font-size:0.85rem; background:#4f46e5;">
            點擊開啟【綜所稅淨額與稅率級距計算器】實戰演練 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💸 打工新鮮族「免繳稅還能退稅」的真金白銀真相！</h4>
          <span class="sub-tag">免繳稅 &ne; 不用報稅！被預扣的 5% 稅金必須 5 月申報才能全數退還入帳！</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:1.8rem; font-weight:900; color:#15803d;">預扣稅金 10,000 元 ➔ 7/31 直撥全額退回！</div>
          <p style="font-size:0.82rem; color:#334155; margin-top:6px; line-height:1.5;">
            若兼職時被公司預扣了 5% 稅款（如 1 萬元），因年所得低於 44.6 萬應納稅額為 0 元。<br>
            <strong>五月必須線上報稅：</strong>填寫銀行帳戶，國稅局將於 <strong>7 月 31 日第一批退稅</strong>直接匯還 10,000 元現金！
          </p>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧾 扣繳憑單 (Withholding Statement) 與預扣 5% 機制</h4>
          <span class="sub-tag">雇主非惡意扣錢 ‧ 依法代扣暫繳國庫 ‧ 五月報稅多退少補之憑據</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">為什麼會被預先扣繳 5%？</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              依稅法規定，若單次兼職給付超過特定門檻（如 88,501 元）或非每月固定薪資，給付單位必須依法預扣 5% 稅款代繳國庫，防止納稅義務人逃漏稅。
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">報稅季節自動整合：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              每年 5 月登入手機報稅系統，財政部伺服器已自動抓取全台雇主申報之扣繳憑單，所有被預扣之稅金一目了然，自動計算退稅金額！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏠 合法節稅管道一：租屋族「房屋租金支出特別扣除額」18 萬！</h4>
          <span class="sub-tag">重大稅改紅利！租金改列「特別扣除額」‧ 兼享標準扣除額 13.1 萬雙重優惠！</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
          <h5 style="color:#b45309; font-size:0.88rem; margin-bottom:4px;">租屋族三大申報必備憑證：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.6;">
            <li><strong>租賃契約書影本：</strong>載明出租人與承租人姓名、租期、租金金額。</li>
            <li><strong>租金支付證明：</strong>每月轉帳匯款存摺影本、ATM 交易明細或房東簽收收據。</li>
            <li><strong>居住設籍證明：</strong>承租人或配偶、受扶養直系親屬於課稅年度辦竣戶籍登記（或切結自住無出租營業）。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏥 合法節稅管道二：醫藥及生育費列舉扣除「無上限」！</h4>
          <span class="sub-tag">公立醫院與健保特約自費醫藥費實報實銷 ‧ 扣除保險理賠金後全額列扣</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">✅ 得列舉扣除項目：</strong>
            <ul style="font-size:0.75rem; color:#334155; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li>掛號費、健保部分負擔、住院膳食差額。</li>
              <li>自費微創手術、自費標靶藥材、假牙義肢。</li>
              <li>經醫師診斷確屬醫療必要之心理諮商費用。</li>
            </ul>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.82rem;">❌ 不得扣除項目：</strong>
            <ul style="font-size:0.75rem; color:#7f1d1d; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li>非醫療必要之醫美整形、近視雷射。</li>
              <li>未經醫師處方之成藥、保健食品補品。</li>
              <li>已受商業醫療保險理賠給付之醫療費用部分！</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🤝 合法節稅管道三：公益慈善捐贈列舉扣除額 (上限 20%)</h4>
          <span class="sub-tag">對合法立案慈善機構捐款 ‧ 索取正式收據 ‧ 行善同時合法抵減所得稅負</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <strong style="color:#4f46e5; font-size:0.82rem;">捐贈扣除限額算術公式：</strong>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:4px; padding:8px; margin:6px 0; font-size:0.8rem; line-height:1.5;">
            <strong>一般公益團體捐贈扣除上限 = 綜合所得總額 &times; 20%</strong><br>
            例如年所得 60 萬元，捐給家扶中心或創世基金會最高可扣除 <strong>12 萬元</strong>！<br>
            <em>注意：若對政府機關、國防或公立學校之捐贈，全額扣除無金額限制！</em>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>👨‍👩‍👧 扶養親屬抉擇算術：父母列報扶養 vs. 大一生獨立申報</h4>
          <span class="sub-tag">比較家庭邊際稅率 (12%-20%) ‧ 讓 9.7 萬免稅額與房租特扣產生最大節稅效益！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">方案 A：由高所得父母列報扶養 (推薦)</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              父母邊際稅率若為 12%，多申報大一子女可多扣 9.7 萬免稅額 + 房租特扣，現省 <strong>22,440 元家庭稅金</strong>！子女被預扣之稅金亦可直接於家庭稅額中退回。
            </p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">方案 B：大一學生獨立申報</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              適合父母所得極低免稅、或打工收入超出 44.6 萬者。學生獨立申報享有自己的 13.1 萬標扣，但父母失去受扶養親屬免稅額。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📱 手機報稅 App：免插卡 5 分鐘線上申報完整 SOP</h4>
          <span class="sub-tag">行動自然人憑證 ‧ 戶口名簿戶號 + 健保卡卡號 ‧ 手機瀏覽器即可完成！</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px;">
          <div style="background:#fff; border-top:3px solid #4f46e5; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#4f46e5; font-size:0.75rem;">步驟 1：驗證身分</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">手機開啟 tax.nat.gov.tw，輸入身分證字號與戶口名簿戶號</p>
          </div>
          <div style="background:#fff; border-top:3px solid #0284c7; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#0284c7; font-size:0.75rem;">步驟 2：帶入資料</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">系統自動下載全年度打工薪資、扣繳憑單與免稅扣除額</p>
          </div>
          <div style="background:#fff; border-top:3px solid #f59e0b; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#b45309; font-size:0.75rem;">步驟 3：增列扣除</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">檢查填入房屋租金支出特別扣除額 (最高 18 萬元)</p>
          </div>
          <div style="background:#fff; border-top:3px solid #10b981; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#15803d; font-size:0.75rem;">步驟 4：送出退稅</strong>
            <p style="font-size:0.7rem; color:#64748b; margin-top:2px;">填寫銀行帳戶確認申報，7/31 享受第一批直撥退稅！</p>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 逃漏稅法律後果：《所得稅法》第 110 條補稅與罰鍰</h4>
          <span class="sub-tag">故意隱匿短報所得 ‧ 處所漏稅額 1 至 3 倍罰鍰 ‧ 按日加計滯納利息</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
          <strong style="color:#dc2626; font-size:0.85rem;">🚨 違法逃漏稅處罰條款嚴格警示：</strong>
          <ul style="font-size:0.78rem; color:#7f1d1d; margin-top:4px; padding-left:16px; line-height:1.5;">
            <li><strong>補繳本稅：</strong>經查獲隱瞞兼職或海外所得，一律補徵短漏所得稅款。</li>
            <li><strong>漏稅罰鍰：</strong>依情節輕重處所漏稅額 <strong>0.5 倍至 3 倍罰鍰</strong>！</li>
            <li><strong>滯納金與利息：</strong>逾期繳納每超過 3 日加徵 1% 滯納金（最高 10%），並按郵政儲金利率按日計息。</li>
            <li><strong>信用污點：</strong>留下國稅局欠稅強制執行紀錄，影響未來銀行房貸信審。</li>
          </ul>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 存股族必修：股利所得「合併計稅 8.5% 抵減」vs.「分離課稅 28%」</h4>
          <span class="sub-tag">大專存股族大推合併計稅！每領 1 萬股利多退 850 元稅金 (上限 8 萬)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">方案一：股利合併計稅 (青年首選！)</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              股利併入綜合所得，享有 <strong>8.5% 可抵減稅額</strong>（每戶上限 8 萬元）。學生邊際稅率為 0% 或 5%，抵減稅額扣完後<strong>還能倒拿退稅入袋！</strong>
            </p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">方案二：單一稅率 28% 分離課稅</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              股利不併入所得，單獨按 28% 課稅，無抵減稅額。僅適合所得淨額超過 266 萬元、適用 30%-40% 級距的超級富豪大戶！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第二小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">退稅精算思維 ➔ 立即進入【打工族退稅精算器】實算直撥退稅現金！</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#15803d; font-size:0.88rem; margin-bottom:4px;">💡 第二小時三大退稅核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>兼職被預扣 5% 稅款並非損失，五月線上報稅可全數直撥領回真金白銀。</li>
            <li>外宿租屋族善用 18 萬元房屋租金特別扣除額，備妥合約匯款單強力節稅。</li>
            <li>手機報稅 5 分鐘免插卡，健保卡加戶號搞定，申報帳戶享受 7/31 首批退稅。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalWithholdingLab')" style="padding:8px 18px; font-size:0.85rem; background:#10b981;">
            點擊開啟【打工族預先扣繳與退稅精算器】實戰試算 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 雙特扣 39.8 萬合法節稅組合盾牌：薪資扣除 + 租金扣除</h4>
          <span class="sub-tag">薪資特別扣除額 21.8 萬 + 房屋租金特別扣除額 18 萬 = 39.8 萬元超強護甲！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">加上免稅額與標扣後的防護力：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              單身租屋上班族：免稅額 (9.7萬) + 標扣 (13.1萬) + 薪扣 (21.8萬) + 房租特扣 (18萬) = <strong>年收入 62.6 萬元內完全不用繳稅！</strong>
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">青年白手起家的租稅紅利：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              月入高達 5.2 萬元的職場青年，只要是在外租屋，即可在雙特扣庇護下將所得淨額大幅壓制，大幅減輕出社會前三年的稅務重擔。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⏰ 報稅季三大關鍵時間軸與三批直撥退稅入帳時程</h4>
          <span class="sub-tag">5/1 至 5/31 申報 ‧ 首批 7/31 入帳 ‧ 二批 10/31 ‧ 三批次年 1/20</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
          <div style="background:#f0fdf4; border-top:3px solid #10b981; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#15803d; font-size:0.78rem;">第 1 批直撥退稅 (最速!)</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#10b981; margin:3px 0;">7 月 31 日</div>
            <span style="font-size:0.7rem; color:#64748b;">5/31 前網路申報者全享</span>
          </div>
          <div style="background:#fffbeb; border-top:3px solid #f59e0b; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#b45309; font-size:0.78rem;">第 2 批退稅</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#d97706; margin:3px 0;">10 月 31 日</div>
            <span style="font-size:0.7rem; color:#64748b;">5/10 前向非戶籍地書面申報</span>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #94a3b8; border-radius:6px; padding:8px; text-align:center;">
            <strong style="color:#475569; font-size:0.78rem;">第 3 批退稅</strong>
            <div style="font-size:1.1rem; font-weight:800; color:#475569; margin:3px 0;">次年 1 月 20 日</div>
            <span style="font-size:0.7rem; color:#64748b;">逾期申報及人工審核案件</span>
          </div>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌍 海外所得與個人最低稅負制 (AMT/CFC) 核心門檻</h4>
          <span class="sub-tag">美股複委託或海外投資 ‧ 100 萬申報門檻 ‧ 個人基本所得額 750 萬免稅額</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">1. 海外所得申報門檻 (100 萬)：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              一申報戶全年海外所得（美股獲利、海外基金配息）合計<strong>未達新台幣 100 萬元者，免予計入申報！</strong>一般小資存股族完全不受影響。
            </p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">2. 基本所得額免稅門檻 (750 萬)：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              就算海外所得超過 100 萬，個人基本所得額免稅扣除額高達 <strong>750 萬元</strong>！超過部分才按 20% 稅率計稅，並與綜所稅額擇高繳納。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 稅務資安防詐：防範假冒「財政部退稅通知」釣魚簡訊</h4>
          <span class="sub-tag">認明政府專屬網域 .gov.tw ‧ 國稅局絕不發簡訊附連結退稅！</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px;">
          <h5 style="color:#dc2626; font-size:0.88rem; margin-bottom:4px;">🚨 識破假退稅釣魚網站三大特徵：</h5>
          <ol style="font-size:0.78rem; color:#7f1d1d; padding-left:16px; line-height:1.6;">
            <li><strong>假網址破綻：</strong>例如 mof-gov.xyz、etax-tw.top，缺少真正的 .gov.tw 政府結尾。</li>
            <li><strong>索取敏感資訊：</strong>要求輸入信用卡卡號、CVC 安全碼或簡訊 OTP 驗證碼（政府退稅絕不透過信用卡！）。</li>
            <li><strong>製造急迫情緒：</strong>謊稱「24 小時內未領取將繳回國庫」，誘騙受害者衝動受騙。</li>
          </ol>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 實務查驗：財政部電子申報繳稅服務網 (tax.nat.gov.tw)</h4>
          <span class="sub-tag">免下載軟體 ‧ 支援手機/平板/電腦 ‧ 查驗全年度所有給付與扣繳紀錄</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
          <strong style="color:#4f46e5; font-size:0.82rem;">💡 每年 5 月登入首頁三部曲：</strong>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:4px; padding:8px; margin:6px 0; font-size:0.78rem; line-height:1.5;">
            1. 認明瀏覽器網址列為 <strong>https://tax.nat.gov.tw</strong> (鎖頭安全符號)<br>
            2. 點選「國中/高中/大學學生與青年首選」之【手機報稅】專屬通道<br>
            3. 查閱「所得扣除額資料」，確認各打工兼職單位的收入與扣繳金額無誤
          </div>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 給大一新鮮打工族個人理財稅務四大終身金律</h4>
          <span class="sub-tag">必查扣繳憑單 ‧ 免稅也要報稅退稅 ‧ 租金特扣備憑證 ‧ 認明 gov 防釣魚</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eef2ff; border-left:4px solid #4f46e5; border-radius:4px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">金律一：打工必留憑單查扣繳</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">每年 2 月向雇主索取扣繳憑單，核對給付總額與預扣稅款，杜絕權益睡著。</p>
          </div>
          <div style="background:#f0fdf4; border-left:4px solid #10b981; border-radius:4px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">金律二：免繳稅更要報稅領退稅</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">五月準時線上申報填寫退稅帳戶，7/31 第一批直撥退還預扣稅金真金白銀。</p>
          </div>
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:4px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">金律三：外宿善用 18 萬租屋特扣</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">備妥租約與匯款憑證，善用租屋特別扣除額與家庭扶養效益最大化組合。</p>
          </div>
          <div style="background:#fef2f2; border-left:4px solid #ef4444; border-radius:4px; padding:10px;">
            <strong style="color:#dc2626; font-size:0.82rem;">金律四：認明 .gov.tw 絕不點簡訊</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">政府退稅絕不傳簡訊附連結索取個資，堅持手機官方入口報稅防詐騙。</p>
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💡 月薪 3 萬打工新鮮人：年納稅額完美歸零 + 退稅 18,000 元 SOP</h4>
          <span class="sub-tag">年薪 36 萬元 ‧ 預扣 5% 共 18,000 元 ‧ 完整行動指南</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px;">
          <h5 style="color:#15803d; font-size:0.9rem; margin-bottom:6px;">實戰申報三步走：</h5>
          <p style="font-size:0.78rem; color:#334155; line-height:1.6;">
            1. <strong>檢驗門檻：</strong>年收入 36 萬 &lt; 44.6 萬免稅門檻，綜合所得淨額確定為 0 元，應納稅額 0 元。<br>
            2. <strong>直撥退稅設定：</strong>5/1 以手機報稅輸入銀行活存帳號，申報退稅金額 18,000 元。<br>
            3. <strong>資金入帳：</strong>7/31 國庫直撥 18,000 元現金入帳，全額作為 0050 ETF 儲蓄資金！
          </p>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 公民租稅素養：從理性納稅到財政民主</h4>
          <span class="sub-tag">合法節稅是權利 ‧ 誠實申報是義務 ‧ 監督政府預算是公民責任</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">合法節稅 vs. 違法逃稅：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              善用稅法給予之免稅額、特別扣除額與扶養規定，是法律賦予人民的合法正當權利；偽造單據或隱瞞收入則是違法逃漏稅，必須受到法律制裁。
            </p>
          </div>
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">監督國家財政透明：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              每一分納稅錢都轉化為社會的基礎建設與健保防護。培養財經素養，持續監督政府財政預算運用效能，是健全公民社會的基石。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：第十一週個人綜合所得稅全景知識圖譜</h4>
          <span class="sub-tag">淨額公式 ➔ 免稅門檻 ➔ 打工退稅 ➔ 房租特扣 ➔ 手機報稅 ➔ 資安防詐</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px;">
          <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:6px; padding:8px;">
            <strong style="color:#4f46e5; font-size:0.8rem;">第 1 小時 ‧ 稅額公式與級距：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">所得總額 - 免稅額 (9.7萬) - 扣除額 = 淨額 + 單身 44.6 萬免稅門檻 + 5 大累進級距</span>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">第 2 小時 ‧ 打工退稅與節稅：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">預扣 5% 7/31 退稅 + 房租特扣 18 萬 + 醫藥捐贈 + 扶養親屬抉擇 + 手機報稅 5 分鐘 SOP</span>
          </div>
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:8px;">
            <strong style="color:#15803d; font-size:0.8rem;">第 3 小時 ‧ 綜合配置與實戰：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">雙特扣 39.8 萬盾牌 + 3 批退稅時間軸 + 海外 100 萬 + 認明 .gov.tw 防詐 + 4 大金律</span>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業說明與第十二週【個人與家庭資產負債表】預告</h4>
          <span class="sub-tag">完成第十一週作業 ‧ 實踐個人打工退稅試算 ‧ 掌握財富自主</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:8px; padding:10px;">
            <strong style="color:#4f46e5; font-size:0.82rem;">📝 第十一週四維度作業繳交要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              盤點打工所得與 44.6 萬免稅門檻、精算 5% 預扣稅領回策略、列報 18 萬租金特扣與父母扶養效益，擬定手機報稅與防詐承諾！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem; background:#4f46e5;">
                開啟第十一週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">📊 第十二週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【個人與家庭資產負債表與現金流管理】：建立個人財務儀表板、先儲蓄後消費 30/50/20 黃金分配與 F.I.R.E. 4% 退休水庫！
            </p>
          </div>
        </div>
      </div>`;
      break;

    default:
      container.innerHTML = `<div style="padding:20px; text-align:center; color:#64748b;">Slide Visual #${id}</div>`;
  }
}

// ---------------------- 1 HOUR ACTIVITY: TAX BRACKET LAB ----------------------
function initTaxBracketLab() {
  document.querySelectorAll('.btn-preset-tax').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-tax').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.taxPreset = pKey;
      loadTaxPreset(pKey);
    });
  });

  ['taxSalary', 'taxOtherIncome'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateTaxBracket);
  });

  loadTaxPreset('student_parttime');
}

function loadTaxPreset(pKey) {
  const p = W11_TAX_BRACKET_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('taxSalary')) document.getElementById('taxSalary').value = p.salary;
  if (document.getElementById('taxOtherIncome')) document.getElementById('taxOtherIncome').value = p.otherIncome;

  calculateTaxBracket(p.diagnosis);
}

function calculateTaxBracket(customDiagnosis = '') {
  const salary = parseFloat(document.getElementById('taxSalary')?.value) || 0;
  const other = parseFloat(document.getElementById('taxOtherIncome')?.value) || 0;
  const totalIncome = salary + other;

  const exemption = 97000;
  const stdDeduction = 131000;
  const salaryDeduction = Math.min(salary, 218000);
  const totalDeductions = exemption + stdDeduction + salaryDeduction;

  const netIncome = Math.max(0, totalIncome - totalDeductions);

  let rate = 0;
  let diff = 0;
  if (netIncome > 4980000) { rate = 40; diff = 911700; }
  else if (netIncome > 2660000) { rate = 30; diff = 413700; }
  else if (netIncome > 1330000) { rate = 20; diff = 147700; }
  else if (netIncome > 590000) { rate = 12; diff = 41300; }
  else if (netIncome > 0) { rate = 5; diff = 0; }

  const taxPayable = Math.max(0, Math.round((netIncome * (rate / 100)) - diff));

  const elNet = document.getElementById('outTaxNetIncome');
  const elRate = document.getElementById('outTaxBracketRate');
  const elTax = document.getElementById('outTaxPayable');
  const elDiag = document.getElementById('outTaxDiagnosis');

  if (elNet) elNet.textContent = `NT$ ${netIncome.toLocaleString()} 元`;
  if (elRate) elRate.textContent = `${rate}% (差額 ${diff.toLocaleString()}元)`;
  if (elTax) {
    elTax.textContent = `NT$ ${taxPayable.toLocaleString()} 元`;
    elTax.style.color = taxPayable === 0 ? '#10b981' : '#4f46e5';
  }

  if (elDiag) {
    if (customDiagnosis) {
      elDiag.innerHTML = `<strong>💡 稅額試算診斷：</strong>${customDiagnosis}`;
    } else {
      elDiag.innerHTML = `<strong>💡 稅額試算診斷：</strong>所得總額 <strong>NT$ ${totalIncome.toLocaleString()} 元</strong>。享有免稅額與扣除額共 <strong>NT$ ${totalDeductions.toLocaleString()} 元</strong>，綜合所得淨額 <strong>NT$ ${netIncome.toLocaleString()} 元</strong>。適用 <strong>${rate}%</strong> 級距，全年應納稅額 <strong>NT$ ${taxPayable.toLocaleString()} 元</strong>。`;
    }
  }
}

// ---------------------- 2 HOUR ACTIVITY: WITHHOLDING LAB ----------------------
function initWithholdingLab() {
  document.querySelectorAll('.btn-preset-withheld').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-withheld').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.withheldPreset = pKey;
      loadWithholdingPreset(pKey);
    });
  });

  ['withheldIncome', 'withheldTaxPaid', 'withheldRent'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateWithholding);
  });

  loadWithholdingPreset('beverage_job');
}

function loadWithholdingPreset(pKey) {
  const p = W11_WITHHOLDING_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('withheldIncome')) document.getElementById('withheldIncome').value = p.income;
  if (document.getElementById('withheldTaxPaid')) document.getElementById('withheldTaxPaid').value = p.withheldAmount;
  if (document.getElementById('withheldRent')) document.getElementById('withheldRent').value = p.rentCost;

  calculateWithholding(p.desc);
}

function calculateWithholding(customDesc = '') {
  const income = parseFloat(document.getElementById('withheldIncome')?.value) || 0;
  const withheld = parseFloat(document.getElementById('withheldTaxPaid')?.value) || 0;
  const rent = parseFloat(document.getElementById('withheldRent')?.value) || 0;

  const exemption = 97000;
  const stdDeduction = 131000;
  const salaryDeduction = Math.min(income, 218000);
  const rentDeduction = Math.min(rent, 180000);

  const totalDeductions = exemption + stdDeduction + salaryDeduction + rentDeduction;
  const netIncome = Math.max(0, income - totalDeductions);

  let rate = 0;
  let diff = 0;
  if (netIncome > 4980000) { rate = 40; diff = 911700; }
  else if (netIncome > 2660000) { rate = 30; diff = 413700; }
  else if (netIncome > 1330000) { rate = 20; diff = 147700; }
  else if (netIncome > 590000) { rate = 12; diff = 41300; }
  else if (netIncome > 0) { rate = 5; diff = 0; }

  const taxDue = Math.max(0, Math.round((netIncome * (rate / 100)) - diff));
  const refundCash = Math.max(0, withheld - taxDue);
  const rentSave = Math.round(rentDeduction * 0.05);

  const elDue = document.getElementById('outWithheldDue');
  const elRefund = document.getElementById('outWithheldRefund');
  const elRentSave = document.getElementById('outWithheldRentSave');
  const elAdvice = document.getElementById('outWithheldAdvice');

  if (elDue) elDue.textContent = `NT$ ${taxDue.toLocaleString()} 元`;
  if (elRefund) {
    elRefund.textContent = `NT$ ${refundCash.toLocaleString()} 元`;
    elRefund.style.color = refundCash > 0 ? '#10b981' : '#64748b';
  }
  if (elRentSave) elRentSave.textContent = `省約 NT$ ${rentSave.toLocaleString()} 元`;

  if (elAdvice) {
    if (customDesc) {
      elAdvice.innerHTML = `<strong>💡 退稅決策建言：</strong>${customDesc}`;
    } else {
      elAdvice.innerHTML = `<strong>💡 退稅決策建言：</strong>年度兼職收入 <strong>NT$ ${income.toLocaleString()} 元</strong>，扣除額合計 <strong>${totalDeductions.toLocaleString()} 元</strong>。應納稅額 <strong>${taxDue.toLocaleString()} 元</strong>。被預扣 <strong>${withheld.toLocaleString()} 元</strong>，五月申報後將於 7/31 直撥退還 <strong>NT$ ${refundCash.toLocaleString()} 元現金</strong>！`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: TAX GAME ----------------------
function initTaxGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderTaxGameLevel();
}

function renderTaxGameLevel() {
  const container = document.getElementById('taxGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W11_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 300;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【綜所稅報稅達人 (Tax Master)】最高榮譽！' : '挑戰完成！榮獲【報稅探索初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#4f46e5; font-size:1.3rem;">${APP_STATE.gameScore} / 400 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartTaxGame()" style="background:#4f46e5;">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W11_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge" style="background:#4f46e5; color:#fff;">${q.badge}</span>
        <span class="quiz-score-badge">累計得分：${APP_STATE.gameScore} / 400</span>
      </div>
      <div class="quiz-scenario">
        <strong>${q.title}</strong><br>${q.scenario}
      </div>
      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="btn-quiz-option" onclick="answerTaxGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="taxGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerTaxGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W11_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#taxGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('taxGameFeedback');
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
          <button class="btn-nav-step btn-primary-step" onclick="nextTaxGameLevel()" style="background:#4f46e5;">前進下一關 ➔</button>
        </div>
      `;
    } else {
      feedbackEl.style.background = '#fef2f2';
      feedbackEl.style.border = '1px solid #fecaca';
      feedbackEl.style.color = '#991b1b';
      feedbackEl.innerHTML = `
        <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
        <div style="margin-top:10px; text-align:right;">
          <button class="btn-nav-step btn-primary-step" onclick="nextTaxGameLevel()" style="background:#4f46e5;">前進下一關 ➔</button>
        </div>
      `;
    }
  }
};

window.nextTaxGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderTaxGameLevel();
};

window.restartTaxGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderTaxGameLevel();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Check', 'hwDim2Refund', 'hwDim3Deductions', 'hwDim4SecuritySop', 'hwConclusionGrade', 'hwDecisionSummary'];
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
    dim2Refund: document.getElementById('hwDim2Refund')?.value || '',
    dim3Deductions: document.getElementById('hwDim3Deductions')?.value || '',
    dim4SecuritySop: document.getElementById('hwDim4SecuritySop')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('w11_homework_draft', JSON.stringify(data));
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
    const saved = localStorage.getItem('w11_homework_draft');
    if (saved) {
      const data = JSON.parse(saved);
      if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
      if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
      if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = data.targetPlan || '';
      if (document.getElementById('hwDim1Check')) document.getElementById('hwDim1Check').value = data.dim1Check || '';
      if (document.getElementById('hwDim2Refund')) document.getElementById('hwDim2Refund').value = data.dim2Refund || '';
      if (document.getElementById('hwDim3Deductions')) document.getElementById('hwDim3Deductions').value = data.dim3Deductions || '';
      if (document.getElementById('hwDim4SecuritySop')) document.getElementById('hwDim4SecuritySop').value = data.dim4SecuritySop || '';
      if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'A+ (全面且具備實戰避險可行性)';
      if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
    }
  } catch (e) {
    console.warn(e);
  }
}

window.loadHomeworkTemplate = function() {
  const t = W11_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = t.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = t.studentId;
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = t.targetPlan;
  if (document.getElementById('hwDim1Check')) document.getElementById('hwDim1Check').value = t.dim1Check;
  if (document.getElementById('hwDim2Refund')) document.getElementById('hwDim2Refund').value = t.dim2Refund;
  if (document.getElementById('hwDim3Deductions')) document.getElementById('hwDim3Deductions').value = t.dim3Deductions;
  if (document.getElementById('hwDim4SecuritySop')) document.getElementById('hwDim4SecuritySop').value = t.dim4SecuritySop;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = t.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = t.decisionSummary;
  saveHomeworkToLocal();
  alert('已成功載入第十一週打工所得稅體檢與退稅試算示範範本！');
};

window.exportHomeworkJson = function() {
  saveHomeworkToLocal();
  const saved = localStorage.getItem('w11_homework_draft') || '{}';
  const data = JSON.parse(saved);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W11_所得稅體檢與退稅報告_${data.studentName || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportHomeworkMd = function() {
  saveHomeworkToLocal();
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const sid = document.getElementById('hwStudentId')?.value || '未填寫';
  const plan = document.getElementById('hwTargetPlan')?.value || '';
  const d1 = document.getElementById('hwDim1Check')?.value || '';
  const d2 = document.getElementById('hwDim2Refund')?.value || '';
  const d3 = document.getElementById('hwDim3Deductions')?.value || '';
  const d4 = document.getElementById('hwDim4SecuritySop')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第十一週作業報告：個人打工所得稅體檢與退稅試算報告
- **學生姓名**：${name}
- **學生學號**：${sid}
- **規劃方案**：${plan}
- **自評等級**：${grade}
- **決策總結**：${summary}

---
### 一、個人打工年度收入盤點與 44.6 萬免稅門檻檢驗 (25%)
${d1}

---
### 二、打工預扣 5% 稅金精算與 7/31 第一批直撥退稅申請策略 (25%)
${d2}

---
### 三、房租特別扣除額 18 萬列報條件與被父母扶養 vs 獨立報稅算術 (30%)
${d3}

---
### 四、手機報稅 App 5 分鐘線上申報流程承諾與稅務資安防詐 SOP (20%)
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

  const filtered = W11_SLIDES_DATA.filter(s => {
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
        openModal('modalTaxBracketLab');
        break;
      case '2':
        openModal('modalWithholdingLab');
        break;
      case '3':
        openModal('modalTaxGame');
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
