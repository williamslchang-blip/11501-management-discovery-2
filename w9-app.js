/**
 * 115學年度「管理探索二」第九週互動教學主程式
 * 單元名稱：保險基礎、風險管理與個人保障規劃
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#0f766e',
  drawingWidth: 3,

  // 1小時活動 (四象限風險矩陣與應對策略檢測器)
  riskActivePreset: 'motorcycle_crash',

  // 2小時活動 (實支實付醫療險理賠與自負額精算機)
  medicalActivePreset: 'cruciate_ligament',
  medicalInputs: {
    roomCost: 15000,
    surgeryCost: 45000,
    deviceCost: 30000,
    roomLimit: 2000,
    surgeryLimit: 50000,
    deviceLimit: 100000,
    days: 3
  },

  // 3小時遊戲 (保險保障達人大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (個人風險管理矩陣與第一份保單規劃報告)
  homeworkData: {
    studentName: '',
    studentId: '',
    targetPlan: '',
    dim1Risk: '',
    dim2Triad: '',
    dim3TermMath: '',
    dim4RefusalSop: '',
    conclusionGrade: 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initRiskMatrixLab();
  initMedicalCalculator();
  initInsuranceGame();
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
  W9_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W9_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w9-primary, #0f766e);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W9_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W9_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W9_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W9_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W9_SLIDES_DATA.length - 1) {
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
          <h4>🛡️ 保險的真實本質：用微小確定成本，轉嫁無法承受的毀滅性風險</h4>
          <span class="sub-tag">「保險不是致富的工具，而是防止家庭一夕破產的財務安全氣囊」— Paul Samuelson</span>
        </div>
        <div style="background:#f0fdfa; border:2px dashed #0f766e; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🛡️</div>
          <h4 style="color:#0f766e; font-size:1.18rem; margin-bottom:8px;">保險是財務體系的最後一道防護盾牌</h4>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6; max-width:520px; margin:0 auto;">
            許多年輕人誤將保險視為「儲蓄」或「投資獲利」管道，本末倒置。<br>
            <strong>真正的保險天職：</strong>以極微小的確定保費支出，防禦發生率極低但一旦發生便足以毀滅個人與家庭的巨大財務災難！
          </p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第九週 3 小時學習架構：從法理邏輯到精算實務與個人防禦</h4>
          <span class="sub-tag">建構終身受用的理性避險護城河 ‧ 杜絕人情保單剝削</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border-top:4px solid #0f766e; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.85rem;">第 1 小時 ‧ 風險法理與矩陣</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">四象限風險矩陣、大數法則保費算術、三大基本原則（保險利益、最大誠信、損害填補）、台灣高投保率低保障現況。</p>
          </div>
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.85rem;">第 2 小時 ‧ 青年保障金三角</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">機車與打工風險、傷害失能險、實支實付醫療險（病房/手術/雜費）、2026正本理賠改革、法定強制險與學團險。</p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #f59e0b; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">第 3 小時 ‧ 精算避坑與配置</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">定期 vs 終身點差與買定期投 0050 ETF 270萬算術、拒絕人情保單SOP、雙十原則、3,000元新鮮人實戰規劃。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 經典四象限風險管理矩陣 (Risk Management Matrix)</h4>
          <span class="sub-tag">唯有【低頻率、高損失】的象限，才具備購買商業保險的經濟合理性！</span>
        </div>
        <div class="matrix-grid">
          <div class="matrix-quadrant q-avoid">
            <div class="quadrant-title">🚫 規避 / 避免 (Avoidance)</div>
            <div class="quadrant-action">策略：徹底禁止危險行為</div>
            <div class="quadrant-scenario">情境：無照飆車夜衝、涉足非法場所。保單明訂除外責任！</div>
          </div>
          <div class="matrix-quadrant q-transfer">
            <div class="quadrant-title">🛡️ 轉移 / 保險 (Transfer)</div>
            <div class="quadrant-action">策略：購買商業保險轉嫁</div>
            <div class="quadrant-scenario">情境：車禍重大失能、罹患惡性腫瘤。以小保費撬動百萬盾牌！</div>
          </div>
          <div class="matrix-quadrant q-reduce">
            <div class="quadrant-title">⚠️ 降低 / 減輕 (Reduction)</div>
            <div class="quadrant-action">策略：加強預防與安全措施</div>
            <div class="quadrant-scenario">情境：打工燙傷、騎車戴全罩安全帽、維持健康生活防慢病。</div>
          </div>
          <div class="matrix-quadrant q-retain">
            <div class="quadrant-title">💼 承擔 / 自留 (Retention)</div>
            <div class="quadrant-action">策略：以日常零用金自行吸收</div>
            <div class="quadrant-scenario">情境：掉雨傘、手機小刮傷、門診看感冒。切忌為此買保險！</div>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>➗ 大數法則與純保費數學定價模型 (Law of Large Numbers)</h4>
          <span class="sub-tag">匯聚互助群體 ‧ 消除個體不確定性 ‧ 保險精算之數學基石</span>
        </div>
        <div class="formula-card">
          <div class="formula-box">
            $$E[L] = p \times L$$
            <div style="font-size:0.75rem; color:#475569; margin-top:4px;">預期損失 (純保費) = 事故發生機率 ($p$) × 事故發生時之損失金額 ($L$)</div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
            <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
              <strong style="color:#0f766e; font-size:0.8rem;">10,000 人互助池示範：</strong>
              <p style="font-size:0.75rem; color:#64748b; margin-top:2px;">若每年有 1 人發生 1,000 萬元災難事故 ($p = 0.0001$)，每人僅需出 <strong>1,000 元</strong> 即可完全彌補受害者毀滅性打擊！</p>
            </div>
            <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:8px;">
              <strong style="color:#0284c7; font-size:0.8rem;">總保費結構拆解：</strong>
              <p style="font-size:0.75rem; color:#64748b; margin-top:2px;"><strong>毛保費 = 純保費 (理賠金準備) + 附加費用 (行政管銷、業務佣金、保險公司利潤)</strong>。儲蓄險附加費用往往高得驚人！</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 保險基本原則一：保險利益原則 (Insurable Interest)</h4>
          <span class="sub-tag">《保險法》第 14、16 條：杜絕人命賭博與道德風險 (Moral Hazard)</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">✅ 法定具備保險利益之法定關係：</strong>
            <ul style="font-size:0.75rem; color:#334155; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li>本人或其家屬 (父母、配偶、子女)</li>
              <li>生活費或教育費所仰給之人 (如撫養人)</li>
              <li>債務人 (為債權提供清償保障)</li>
              <li>為本人管理財產或利益之人</li>
            </ul>
          </div>
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.82rem;">❌ 禁止投保 (無保險利益)：</strong>
            <p style="font-size:0.75rem; color:#7f1d1d; margin-top:4px; line-height:1.5;">
              你不能為隔壁鄰居、討厭的同學或路邊陌生人投保高額人壽保險！否則被保險人之死亡將使要保人獲取暴利，勢必引發蓄意謀害之巨大道德風險！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🤝 保險基本原則二：最大誠信原則與據實說明義務</h4>
          <span class="sub-tag">《保險法》第 64 條：投保切莫隱瞞！兩年內查獲可無條件解除契約</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px; margin-bottom:8px;">
          <strong style="color:#b45309; font-size:0.85rem;">⚠️《保險法》第 64 條核心法條威力：</strong>
          <p style="font-size:0.75rem; color:#78350f; margin-top:2px;">
            訂立契約時，要保人對於保險人之書面詢問，應據實說明。如有為隱匿或遺漏，或為不實之說明，足以變更或減少保險人對於危險之估計者，保險人得<strong>解除契約</strong>；其危險發生後亦同！
          </p>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border-left:4px solid #ef4444; padding:6px 10px; border-radius:4px;">
            <strong style="color:#ef4444; font-size:0.78rem;">後果一：不賠錢 + 沒收已繳保費</strong>
            <p style="font-size:0.72rem; color:#475569;">依保險法第 25 條，保險人因第 64 條解除契約時，無須返還其已收受之保險費！</p>
          </div>
          <div style="background:#f8fafc; border-left:4px solid #f59e0b; padding:6px 10px; border-radius:4px;">
            <strong style="color:#b45309; font-size:0.78rem;">後果二：業務員口頭「不用填」無效</strong>
            <p style="font-size:0.72rem; color:#475569;">法律上告知義務係落在要保人書面簽名，業務員之口頭保證無法推翻書面不實！</p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 保險基本原則三：損害填補原則與禁止不當得利</h4>
          <span class="sub-tag">保險是彌補實質損失，絕不是拿來「靠生病住院賺錢」的生財工具！</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">損害填補原則 (Indemnity)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              財產保險與實支實付型醫療保險之給付，嚴格以被保險人實際遭受之損失為上限（花多少賠多少）。使被保險人恢復至事故發生前之經濟狀態，不得因保險事故而受有超額利益。
            </p>
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:10px;">
            <strong style="color:#be123c; font-size:0.82rem;">禁止不當得利與 2026 改革：</strong>
            <p style="font-size:0.75rem; color:#4c0519; margin-top:4px; line-height:1.5;">
              過去「雙實支、三實支」以醫療收據副本重複申請多倍理賠，產生「住院三天反賺十萬」之畸形現象，徹底破壞保險精算與醫療資源，引發金管會出手全面整頓。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🇹🇼 台灣保險奇蹟背後的殘酷真相：投保率 2.6 張，保障卻嚴重失衡！</h4>
          <span class="sub-tag">國人平均每人擁有 2.6 張保單，為何一場大病依然可能拖垮全家？</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; color:#ef4444; font-weight:800;">70%+</div>
            <strong style="font-size:0.8rem; color:#334155;">保費流向儲蓄險與還本型終身險</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">每年繳納龐大保費，資金被鎖死在年化僅 1%~2% 的儲蓄商品中，流動性極差。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; color:#f59e0b; font-weight:800;">&lt; 60 萬</div>
            <strong style="font-size:0.8rem; color:#334155;">國人平均身故壽險保額不足 60 萬元</strong>
            <p style="font-size:0.72rem; color:#64748b; margin-top:4px;">「保費繳超多、保障超薄弱」的典型買錯現象！面對重症或失能時毫無實質抵抗力。</p>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>👥 保險契約四大核心主體架構圖</h4>
          <span class="sub-tag">理清權利義務 ‧ 避開贈與稅與受益人指定爭議</span>
        </div>
        <div class="contract-parties-grid">
          <div class="party-box">
            <h5>1. 要保人 (Applicant)</h5>
            <p><strong>義務與權利：</strong>向保險公司提出申請、負擔繳交保費之法律義務；擁有變更契約、解約、指定受益人之處分權。</p>
          </div>
          <div class="party-box">
            <h5>2. 被保險人 (Insured)</h5>
            <p><strong>人身主體：</strong>其生命、身體或健康為保險標的之人。被保險人必須具備保險利益，且死亡保單須其書面同意。</p>
          </div>
          <div class="party-box">
            <h5>3. 受益人 (Beneficiary)</h5>
            <p><strong>受領權人：</strong>保險事故發生時，依契約得向保險公司請領理賠金之人。強烈建議加註「法定繼承人」防範事故同時身故。</p>
          </div>
          <div class="party-box">
            <h5>4. 保險人 (Insurer)</h5>
            <p><strong>承保機構：</strong>依《保險法》經主管機關金管會許可設立之保險股份有限公司，承擔風險並依約給付保險金。</p>
          </div>
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第一小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">風險四象限理論 ➔ 馬上切入實戰檢測器進行生活風險診斷！</span>
        </div>
        <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#0f766e; font-size:0.88rem; margin-bottom:4px;">💡 第一小時三大不可動搖核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>保險只適用於「低頻率、高損失」領域，其餘情境應採取規避、預防或自行承擔。</li>
            <li>最大誠信原則是保單效力基石，投保瞞報病史將導致契約無效且沒收保費。</li>
            <li>損害填補原則杜絕不當得利，保險是用來「轉嫁災難」而非「創造收益」。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalRiskMatrix')" style="padding:8px 18px; font-size:0.85rem;">
            點擊開啟【四象限風險矩陣檢測器】實戰演練 ➔
          </button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛵 大學青年族群兩大現實高危風險情境</h4>
          <span class="sub-tag">18-24 歲機車傷亡率居全台之冠 ‧ 打工職場隱形陷阱四伏</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fff1f2; border-top:4px solid #ef4444; border-radius:8px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.82rem;">情境一：機車通勤摔車與嚴重骨折</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              大一剛考上駕照，道路經驗不足。警政署統計青年機車死傷人數居高不下。車禍碰撞常導致十字韌帶斷裂、鎖骨骨折，自費微創手術與鈦合金耗材動輒 <strong>5 ~ 15 萬元</strong>。
            </p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #f59e0b; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">情境二：餐飲與外送打工職災受傷</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              餐廳廚房高溫油噴燙傷、切菜刀傷、搬運重物椎間盤突出；外送員風雨中趕單碰撞。除直接醫療自費支出外，更會面臨數週無法打工的<strong>工資中斷危機</strong>！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 青年保障金三角之柱一：意外傷害與失能保險 (Personal Accident)</h4>
          <span class="sub-tag">外來性、突發性、非疾病三大要件 ‧ 以極低保費撬動百萬失能護城河</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">核心保障亮點：</strong>
            <ul style="font-size:0.75rem; color:#334155; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li><strong>意外身故／失能保額 200 萬元：</strong>年保費僅約 1,200 元 (職業等級一)。</li>
              <li><strong>1 至 11 級失能給付：</strong>依失能等級比例給付 (100% ~ 5%)，保障癱瘓或斷肢之長期照護。</li>
              <li><strong>附加意外實支實付 (3~5 萬)：</strong>車禍門診換藥、急診縫合凭收據實報實銷。</li>
            </ul>
          </div>
          <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:8px; padding:10px;">
            <strong style="color:#c2410c; font-size:0.82rem;">重要法律認定與陷阱：</strong>
            <p style="font-size:0.75rem; color:#7c2d12; margin-top:4px; line-height:1.5;">
              意外險三大嚴格要件缺一不可：必須是<strong>「非由疾病所引起」</strong>、<strong>「外來的」</strong>且<strong>「突發的」</strong>！若因自身高血壓引發中風跌倒，中風屬於內發疾病，意外險身故金恐難以獲賠。
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏥 青年保障金三角之柱二：實支實付醫療險 (Reimbursement Health)</h4>
          <span class="sub-tag">三大理賠項目解析：病房差額、手術費用、醫療雜費（耗材自費核心）</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border-top:3px solid #0f766e; border-radius:6px; padding:8px;">
            <strong style="color:#0f766e; font-size:0.78rem;">1. 超等病房差額</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">入住單人房 (3,000~6,000/日) 或雙人房 (1,500~2,500/日) 之健保不給付自費差額，依投保日額限額實報實銷。</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #0284c7; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.78rem;">2. 手術費用限額</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">自費腹腔鏡、關節鏡、達文西微創手術之自費技術費，依保單手術倍數表或限額內核實給付。</p>
          </div>
          <div style="background:#f8fafc; border-top:3px solid #f59e0b; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.78rem;">3. 醫療雜費 (最關鍵!)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">佔自費醫療 <strong>65% 以上</strong>！包括自費鈦合金鋼板、人工韌帶、止血防沾黏貼片、標靶藥物等巨額材料。</p>
          </div>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ 2026 金管會實支實付醫療險重大改革解析</h4>
          <span class="sub-tag">全面落實損害填補原則 ‧ 告別副本理賠套利 ‧ 回歸正本與差額核銷</span>
        </div>
        <div class="reform-compare-grid">
          <div class="reform-box">
            <h5 style="color:#ef4444;">❌ 改革前（舊制副本理賠亂象）</h5>
            <ul>
              <li>投保 3 家實支實付醫療險，均收「醫療收據副本」。</li>
              <li>實際住院自費 5 萬元，3 家各賠 5 萬，合計領取 15 萬元。</li>
              <li>生一場小病倒賺 10 萬元，引發道德風險與詐保浪費。</li>
            </ul>
          </div>
          <div class="reform-box">
            <h5 style="color:#0f766e;">✅ 改革後（新制損害填補真義）</h5>
            <ul>
              <li>全面回歸「正本收據理賠」，理賠總額不得超過實際自費支出。</li>
              <li>第一家保險公司賠付後，開立「差額證明單」交由第二家賠付剩餘差額。</li>
              <li>杜絕不當得利，保險費率回歸合理精算，保障醫療資源永續。</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🧬 青年保障金三角之柱三：重大傷病與癌症一次金 (Critical Illness)</h4>
          <span class="sub-tag">領取重大傷病卡即一次理賠 100 萬 ‧ 應對新型自費標靶與免疫療法</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">一次給付型 vs. 傳統療程型比較：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              傳統防癌險要求「住院一天賠 2,000 元」，但現代標靶治療與門診放化療<strong>根本不需要長期住院</strong>！唯有「一次給付 100 萬」之重大傷病險，才能讓患者在確診第一時間擁有充沛現金自由選擇最佳療法。
            </p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">健保重大傷病卡連動機制：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              認定標準直接依據衛福部健保署核發之「重大傷病證明」，範圍涵蓋惡性腫瘤、自體免疫疾病、罕見疾病等 300 多項。理賠認定客觀透明，完全杜絕與保險公司的醫學認定爭端！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 年輕人身邊的法定必備防護盾牌：強制險與勞保職災</h4>
          <span class="sub-tag">法定強制險保障他人 ‧ 勞工保險提供全方位職災醫療與傷病給付</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">🛵 強制汽車責任保險 (政府法定)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              保障機車或汽車事故中<strong>「受害人」</strong>之生命與身體！身故／失能最高給付 <strong>200 萬元</strong>，傷害醫療費用限額 <strong>20 萬元</strong>。注意：單一車輛事故 (如自己騎車自摔撞樹) 駕駛人本人不賠！
            </p>
          </div>
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">👷 勞工保險與職災保險法 (打工必備)：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              打工族無論時薪或月薪，雇主均應投保。在上班途中車禍或工作場所受傷，享有<strong>免健保部分負擔、住院膳食費減免</strong>，以及第 4 天起發給<strong>投保薪資 100% 至 70% 傷病給付</strong>！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎓 大學生專屬保障：學生團體保險權益全解析</h4>
          <span class="sub-tag">每學期註冊費數百元 ‧ 享有意外門診、住院醫療與百萬身故失能保障</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">學團險核心保障內容：</strong>
            <ul style="font-size:0.75rem; color:#475569; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li><strong>身故與失能給付：</strong>最高 100 萬元。</li>
              <li><strong>意外傷害門診醫療：</strong>每次上限約 5,000 元，實報實銷。</li>
              <li><strong>疾病住院醫療：</strong>每日病房費約 1,000 元，每次住院上限約 5 萬元。</li>
              <li><strong>寒暑假期間同樣有效！</strong>畢業前享有 24 小時校內外全面防護。</li>
            </ul>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">💡 聰明請領實務指引：</strong>
            <p style="font-size:0.75rem; color:#78350f; margin-top:4px; line-height:1.5;">
              在校摔車或生病住院，申請理賠只需備妥診斷書與收據，至學校<strong>「衛生保健組」</strong>填表申請。學團險理賠極為寬鬆，是底層最強大的學生福利！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 常見理賠爭議陷阱：除外責任、既往症與疾病等待期</h4>
          <span class="sub-tag">魔鬼藏在細節裡！簽名前必須徹底看懂的三大免責條款</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:8px;">
            <strong style="color:#dc2626; font-size:0.78rem;">1. 除外責任 (絕不賠)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">被保險人故意自殺、犯罪行為、酒後駕車或無照駕駛、非治療性整形手術。保險公司依法絕對拒賠！</p>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.78rem;">2. 既往症 (投保前病史)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">《保險法》第 127 條：保險契約訂立時，已在疾病情況中者，保險人對該疾病不負給付保險金額之責。</p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.78rem;">3. 等待期 (30~90天)</strong>
            <p style="font-size:0.72rem; color:#475569; margin-top:3px;">醫療險通常設有 30 天等待期，重大傷病與癌症險多設有 90 天等待期。等待期內確診，保單自動失效並退費！</p>
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 個人保單規劃三大黃金設計準則 (Golden Tenets)</h4>
          <span class="sub-tag">先保大再保小 ‧ 先保近再保遠 ‧ 先保障後儲蓄投資</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f0fdfa; border-top:4px solid #0f766e; border-radius:6px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">原則一：先保大，再保小</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">優先防禦幾十萬的自費微創手術、百萬失能與重大傷病，而非為了幾百元感冒門診或雨傘買保險。</p>
          </div>
          <div style="background:#f0f9ff; border-top:4px solid #0284c7; border-radius:6px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">原則二：先保近，再保遠</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">著眼當下 5-10 年機車通勤、打工運動的意外與醫療危機，而非擔憂 50 年後 80 歲才發生的老年照護。</p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #f59e0b; border-radius:6px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">原則三：先保障，後儲蓄</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">把保險單純當作「保險」，把投資交給低成本指數 ETF (0050/VT)，切忌購買報酬被剝皮的還本儲蓄險！</p>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第二小時精要回顧與課堂實戰活動導引</h4>
          <span class="sub-tag">保障金三角 ➔ 立即進入【實支實付醫療險理賠精算機】實算自負額！</span>
        </div>
        <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:12px; margin-bottom:10px;">
          <h5 style="color:#0f766e; font-size:0.88rem; margin-bottom:4px;">💡 第二小時三大保障核心認知：</h5>
          <ol style="font-size:0.78rem; color:#334155; padding-left:16px; line-height:1.5;">
            <li>意外險 + 實支實付醫療險 + 重大傷病險一次金，是青年最高槓桿的「保障金三角」。</li>
            <li>2026 正本理賠改革回歸損害填補本質，醫療自費耗材雜費是決定保單防護力的關鍵。</li>
            <li>善用學校每學期學團險與政府勞保職災，串聯起多層次法定人身防護網。</li>
          </ol>
        </div>
        <div style="text-align:center;">
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalMedicalCalc')" style="padding:8px 18px; font-size:0.85rem;">
            點擊開啟【實支實付理賠與自負額精算機】實戰試算 ➔
          </button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚔️ 定期險 (Term) vs. 終身險 (Whole Life)：大一新生的數學考驗</h4>
          <span class="sub-tag">年保費相差高達 8 至 10 倍！高槓桿保障與資金流動性的殘酷取捨</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">✅ 一年期定期險方案 (高槓桿推薦)：</strong>
            <ul style="font-size:0.75rem; color:#334155; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li><strong>年保費：僅約 3,000 ~ 4,000 元</strong>。</li>
              <li><strong>保障額度：</strong>意外身故 200 萬 + 醫療雜費 15 萬 + 癌症 100 萬。</li>
              <li><strong>槓桿倍數：</strong>高達 500 ~ 1,000 倍！讓大一生用零錢買足百萬級安全盾牌。</li>
            </ul>
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:10px;">
            <strong style="color:#be123c; font-size:0.82rem;">❌ 20 年期終身險方案 (青年雷區)：</strong>
            <ul style="font-size:0.75rem; color:#4c0519; margin-top:4px; padding-left:14px; line-height:1.5;">
              <li><strong>年保費：高達 25,000 ~ 35,000 元</strong>。</li>
              <li><strong>保障額度：</strong>住院每日僅賠 1,000 元，手術限額僅數萬元。</li>
              <li><strong>致命缺點：</strong>保費壓垮打工收入，一旦付不出保費慘遭解約，本金巨額虧損！</li>
            </ul>
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 「買定期，把差額拿去投資」的 30 年 270 萬數學真相</h4>
          <span class="sub-tag">每年省下 22,000 元差額定期定額投入 0050 ETF (年化 8% 複利)</span>
        </div>
        <div class="math-compare-grid">
          <div class="math-box">
            <h5 style="color:#ef4444;">買終身醫療險 (年繳 25,000)</h5>
            <p>30 年後 (48 歲)：累積繳納 50 萬元保費。帳面享有終身每日 1,000 元住院給付。但經過 30 年通膨稀釋，1,000 元連買掛號費與便當都不夠！</p>
          </div>
          <div class="math-box">
            <h5 style="color:#0f766e;">買定期險 + 差額投 0050 ETF</h5>
            <p>每年定期險花 3,000 元，將省下來的 <strong>22,000 元</strong> 投入 0050 ETF。在 8% 複利滾動下，30 年後戶頭坐擁高達 <strong>270 萬元真金白銀</strong>！</p>
          </div>
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ 破解長輩與親戚人情保單！優雅拒絕四大金律 SOP</h4>
          <span class="sub-tag">別讓不好意思說「不」，成為日後二十年每年的財務吸血鬼！</span>
        </div>
        <div class="refusal-grid">
          <div class="refusal-card">
            <h5>第 1 律：現場絕不簽約</h5>
            <p>不論業務員說得多天花亂墜，堅守「要拿回要保書與條款回家研究 7 天」的鐵律，絕不在現場衝動簽名。</p>
          </div>
          <div class="refusal-card">
            <h5>第 2 律：三不原則嚴正拒絕</h5>
            <p>堅守「看不太懂的不買、儲蓄型保單不買、高保費低保障的終身險不買」三大防線。</p>
          </div>
          <div class="refusal-card">
            <h5>第 3 律：以已有保障為由化解</h5>
            <p>「我目前已有學校學團險與父母幫我規劃的意外險，額度非常充足，暫時沒有新增保單需求！」</p>
          </div>
          <div class="refusal-card">
            <h5>第 4 律：以資產配置計劃為盾</h5>
            <p>「目前我的打工收入正每月定期定額投入 0050 累積資本，未來幾年成家有高責任時一定找您！」</p>
          </div>
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔟 財務規劃經典「雙十原則」(The 10/10 Rule)</h4>
          <span class="sub-tag">年保費小於年收入 10% ‧ 身故與重大保障額度大於年收入 10 倍</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; color:#0f766e; font-weight:800;">&le; 10%</div>
            <strong style="font-size:0.82rem; color:#334155;">保費預算控制上限</strong>
            <p style="font-size:0.75rem; color:#64748b; margin-top:4px;">年繳保費絕對不應超過個人年收入的 10%！對月打工 15,000 元之大一生而言，年保費宜控制在 <strong>3,000 ~ 6,000 元</strong> 以內，絕不透支。</p>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-size:1.8rem; color:#0284c7; font-weight:800;">&ge; 10 倍</div>
            <strong style="font-size:0.82rem; color:#334155;">個人人身保障槓桿底線</strong>
            <p style="font-size:0.75rem; color:#64748b; margin-top:4px;">身故與完全失能保障額度至少應達到個人年收入的 10 倍（或 100~200 萬元），以確保發生極端事故時能為家庭留下一筆急難支柱。</p>
          </div>
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔍 官方透明保險資訊查驗與申訴管道平台</h4>
          <span class="sub-tag">不聽信業務員一面之詞 ‧ 善用官方資料庫查詢保單真面目</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">🏛️ 財團法人保險事業發展中心 (保發中心 TII)：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              提供全台灣合法保險商品資料庫查詢！輸入保單名稱即可下載官方核准之<strong>「保單條款原文」</strong>與<strong>「保險費率表」</strong>，所有除外責任與理賠限制一覽無遺。
            </p>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">⚖️ 財團法人金融消費評議中心 (FOI)：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              當遇到保險公司拒賠或爭議時，保戶可依《金融消費者保護法》向評議中心申請<strong>免費爭議評議</strong>。若評議結果在一定金額以下，保險公司必須強制接受！
            </p>
          </div>
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💡 大一新生 3,000 元高槓桿個人保單規劃示範方案</h4>
          <span class="sub-tag">每月僅需 250 元 ‧ 打造具備百萬防護力的青年第一張神單</span>
        </div>
        <div class="starter-policy-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:#0f766e; font-size:0.95rem;">大一新鮮人高槓桿組合 (總年繳約 NT$ 3,300 元)</strong>
            <span class="coverage-badge">月攤僅約 275 元</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.75rem;">
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
              <strong style="color:#0f766e;">1. 一年期意外身故/失能</strong>
              <p style="color:#64748b; margin-top:2px;">保額：200 萬元<br>年保費：約 1,200 元</p>
            </div>
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
              <strong style="color:#0284c7;">2. 意外實支實付醫療</strong>
              <p style="color:#64748b; margin-top:2px;">保額：5 萬元<br>年保費：約 600 元</p>
            </div>
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
              <strong style="color:#f59e0b;">3. 一年期實支實付醫療</strong>
              <p style="color:#64748b; margin-top:2px;">雜費：15 萬 / 病房 2,000<br>年保費：約 1,500 元</p>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📋 投保健康告知書填寫指南：五年病史誠實申報 SOP</h4>
          <span class="sub-tag">健保快易通 APP 一鍵查病歷 ‧ 絕不讓隱瞞病史成為理賠未爆彈</span>
        </div>
        <div class="disclosure-checklist">
          <div class="disclosure-item">
            <span class="num">1</span>
            <div class="content">
              <strong>過去 2 個月內：</strong>是否曾因任何受傷或生病接受醫師治療、診療或用藥？
            </div>
          </div>
          <div class="disclosure-item">
            <span class="num">2</span>
            <div class="content">
              <strong>過去 2 年內：</strong>是否曾接受健康檢查且有異常項目（紅字），並經醫師建議追蹤或治療？
            </div>
          </div>
          <div class="disclosure-item">
            <span class="num">3</span>
            <div class="content">
              <strong>過去 5 年內：</strong>是否曾患有癌症、高血壓、心臟病、精神疾病等重大疾病，並接受治療？
            </div>
          </div>
          <div class="disclosure-item">
            <span class="num">4</span>
            <div class="content">
              <strong>過去 5 年內：</strong>是否曾因受傷或生病住院治療超過 7 天以上？
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📜 給年輕人的四大個人保障終身守則 (Protection Commandments)</h4>
          <span class="sub-tag">銘記四條鐵律 ‧ 終身遠離保險陷阱 ‧ 讓每一分血汗錢花在刀口上</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border-left:4px solid #0f766e; border-radius:4px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">守則一：保險歸保險，投資歸投資</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">絕對不買高保費、低保障的儲蓄險或還本型醫療險。將省下的巨額保費差額，投入低成本全球指數 ETF 累積真實資產。</p>
          </div>
          <div style="background:#f0f9ff; border-left:4px solid #0284c7; border-radius:4px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">守則二：據實告知是唯一安全通道</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">健保連線時代所有就醫紀錄一清二楚。切勿聽信業務員口頭哄騙隱瞞病史，避免面臨被解約沒收保費的慘劇。</p>
          </div>
          <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:4px; padding:10px;">
            <strong style="color:#b45309; font-size:0.82rem;">守則三：定期檢視，隨責任動態調整</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">單身大一時只需以 3,000 元做好基礎意外醫療；未來成家立業背負房貸時，再動態增加定期壽險保額。</p>
          </div>
          <div style="background:#fff1f2; border-left:4px solid #ef4444; border-radius:4px; padding:10px;">
            <strong style="color:#b91c1c; font-size:0.82rem;">守則四：嚴守雙十原則，保費絕不透支</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">年保費不超過收入 10%，保障額度達年收入 10 倍以上。確保日常生活現金流健康無虞。</p>
          </div>
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏰 全景總覽：個人終身風險防禦體系架構圖 (Defense-in-Depth)</h4>
          <span class="sub-tag">法定公共安全網 ➔ 商業高槓桿金三角 ➔ 個人自體緊急預備金三層聯防</span>
        </div>
        <div style="display:grid; grid-template-rows:repeat(3, auto); gap:8px;">
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:6px; padding:8px;">
            <strong style="color:#0f766e; font-size:0.8rem;">第 1 層 ‧ 國家與學校法定防護網：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">全民健康保險 (健保) + 汽機車強制責任險 (200萬) + 學生團體保險 + 勞保職災保險</span>
          </div>
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; padding:8px;">
            <strong style="color:#0284c7; font-size:0.8rem;">第 2 層 ‧ 商業高槓桿保障金三角：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">一年期意外失能險 (200萬) + 實支實付醫療險 (雜費15萬) + 重大傷病一次金 (100萬)</span>
          </div>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px;">
            <strong style="color:#b45309; font-size:0.8rem;">第 3 層 ‧ 個人自體金融儲備：</strong>
            <span style="font-size:0.75rem; color:#475569; margin-left:6px;">6 個月緊急生活預備金 (高利活存) + 0050 ETF 長期差額投資自體醫療金 (270萬)</span>
          </div>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚀 課堂總結、作業說明與第十週【不動產與租屋財務】預告</h4>
          <span class="sub-tag">完成第九週作業 ‧ 打造專屬青年風險防禦書 ‧ 邁向獨立財金主人</span>
        </div>
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px;">
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:10px;">
            <strong style="color:#0f766e; font-size:0.82rem;">📝 第九週四維度作業繳交要求：</strong>
            <p style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.5;">
              撰寫個人風險管理矩陣、青年保障金三角缺口診斷、定期 vs 終身 30 年精算，以及拒絕人情保單 SOP。可直接使用本系統導出標準格式！
            </p>
            <div style="margin-top:6px;">
              <button class="btn-nav-step btn-primary-step" onclick="openModal('modalHomework')" style="padding:6px 14px; font-size:0.78rem;">
                開啟第九週作業填寫系統 ➔
              </button>
            </div>
          </div>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.82rem;">🏠 第十週課程精采預告：</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px; line-height:1.5;">
              【不動產與租屋實務決策】：租屋簽約避坑指南、房貸本息攤還精算、買房 vs 租房 30 年財富實證對決！
            </p>
          </div>
        </div>
      </div>`;
      break;

    default:
      container.innerHTML = `<div style="padding:20px; text-align:center; color:#64748b;">Slide Visual #${id}</div>`;
  }
}

// ---------------------- 1 HOUR ACTIVITY: RISK MATRIX LAB ----------------------
function initRiskMatrixLab() {
  document.querySelectorAll('.btn-preset-risk').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-risk').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-risk');
      APP_STATE.riskActivePreset = pKey;
      renderRiskMatrixPreset(pKey);
    });
  });

  document.getElementById('btnDiagnoseCustomRisk')?.addEventListener('click', diagnoseCustomRisk);
  renderRiskMatrixPreset(APP_STATE.riskActivePreset);
}

function renderRiskMatrixPreset(pKey) {
  const p = W9_RISK_PRESETS[pKey];
  if (!p) return;

  const titleEl = document.getElementById('riskScenarioTitle');
  const costEl = document.getElementById('riskCostEstimate');
  const stratEl = document.getElementById('riskStrategyBadge');
  const explEl = document.getElementById('riskExplanationText');

  if (titleEl) titleEl.textContent = p.name;
  if (costEl) costEl.textContent = `估計損失：${p.costEstimate}`;
  if (stratEl) stratEl.textContent = `對應策略：${p.strategy}`;
  if (explEl) explEl.innerHTML = p.explanation;

  highlightMatrixQuadrant(p.freq, p.loss);
}

function highlightMatrixQuadrant(freq, loss) {
  document.querySelectorAll('.matrix-lab-quadrant').forEach(q => q.classList.remove('active-target'));
  let targetId = '';
  if (freq === 'high' && loss === 'high') targetId = 'labQuadrantAvoid';
  else if (freq === 'low' && loss === 'high') targetId = 'labQuadrantTransfer';
  else if (freq === 'high' && loss === 'low') targetId = 'labQuadrantReduce';
  else if (freq === 'low' && loss === 'low') targetId = 'labQuadrantRetain';

  if (targetId) {
    document.getElementById(targetId)?.classList.add('active-target');
  }
}

function diagnoseCustomRisk() {
  const name = document.getElementById('customRiskName')?.value || '未指定自訂情境';
  const freq = document.getElementById('customRiskFreq')?.value || 'low';
  const loss = document.getElementById('customRiskLoss')?.value || 'high';

  let strategy = '';
  let explanation = '';

  if (freq === 'high' && loss === 'high') {
    strategy = '避免 / 規避 (Avoidance)';
    explanation = `【四象限診斷 - 高頻率、高損失】：情境「${name}」極其危險且破壞力巨大，保單條款通常將其列為除外責任。唯一理智策略為<strong>徹底杜絕危險行為</strong>！`;
  } else if (freq === 'low' && loss === 'high') {
    strategy = '轉移 / 商業保險 (Transfer)';
    explanation = `【四象限診斷 - 低頻率、高損失】：情境「${name}」發生機率低，但一旦爆發將產生災難性財務開銷。這正是<strong>商業保險的核心天職</strong>，必須以小額保費轉嫁！`;
  } else if (freq === 'high' && loss === 'low') {
    strategy = '降低 / 預防 (Reduction)';
    explanation = `【四象限診斷 - 高頻率、低損失】：情境「${name}」經常發生但損失微小。應著重於<strong>事前安全防護與預防減輕措施</strong>，而非投保。`;
  } else {
    strategy = '承擔 / 自留 (Retention)';
    explanation = `【四象限診斷 - 低頻率、低損失】：情境「${name}」損失極輕微，在個人日常零用資金可承擔範圍內。應<strong>自行承擔</strong>，無需購買保險。`;
  }

  const titleEl = document.getElementById('riskScenarioTitle');
  const costEl = document.getElementById('riskCostEstimate');
  const stratEl = document.getElementById('riskStrategyBadge');
  const explEl = document.getElementById('riskExplanationText');

  if (titleEl) titleEl.textContent = `自訂情境：${name}`;
  if (costEl) costEl.textContent = `頻率：${freq === 'high' ? '高頻率' : '低頻率'} ‧ 損失：${loss === 'high' ? '重大損失' : '輕微損失'}`;
  if (stratEl) stratEl.textContent = `應對策略：${strategy}`;
  if (explEl) explEl.innerHTML = explanation;

  highlightMatrixQuadrant(freq, loss);
}

// ---------------------- 2 HOUR ACTIVITY: MEDICAL CALCULATOR ----------------------
function initMedicalCalculator() {
  document.querySelectorAll('.btn-preset-med').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-med').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      APP_STATE.medicalActivePreset = pKey;
      loadMedicalPreset(pKey);
    });
  });

  ['medRoomCost', 'medSurgeryCost', 'medDeviceCost', 'medRoomLimit', 'medSurgeryLimit', 'medDeviceLimit', 'medDays'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateMedicalExpenses);
  });

  loadMedicalPreset('cruciate_ligament');
}

function loadMedicalPreset(pKey) {
  const p = W9_MEDICAL_PRESETS[pKey];
  if (!p) return;

  if (document.getElementById('medRoomCost')) document.getElementById('medRoomCost').value = p.roomCost;
  if (document.getElementById('medSurgeryCost')) document.getElementById('medSurgeryCost').value = p.surgeryCost;
  if (document.getElementById('medDeviceCost')) document.getElementById('medDeviceCost').value = p.deviceCost;
  if (document.getElementById('medRoomLimit')) document.getElementById('medRoomLimit').value = p.roomLimit;
  if (document.getElementById('medSurgeryLimit')) document.getElementById('medSurgeryLimit').value = p.surgeryLimit;
  if (document.getElementById('medDeviceLimit')) document.getElementById('medDeviceLimit').value = p.deviceLimit;
  if (document.getElementById('medDays')) document.getElementById('medDays').value = p.days;

  calculateMedicalExpenses(p.advice);
}

function calculateMedicalExpenses(customAdvice = '') {
  const roomCost = parseInt(document.getElementById('medRoomCost')?.value, 10) || 0;
  const surgeryCost = parseInt(document.getElementById('medSurgeryCost')?.value, 10) || 0;
  const deviceCost = parseInt(document.getElementById('medDeviceCost')?.value, 10) || 0;
  const roomLimit = parseInt(document.getElementById('medRoomLimit')?.value, 10) || 0;
  const surgeryLimit = parseInt(document.getElementById('medSurgeryLimit')?.value, 10) || 0;
  const deviceLimit = parseInt(document.getElementById('medDeviceLimit')?.value, 10) || 0;
  const days = parseInt(document.getElementById('medDays')?.value, 10) || 1;

  const totalBill = roomCost + surgeryCost + deviceCost;

  // 實支實付理賠計算
  const maxRoomPayout = roomLimit * days;
  const payoutRoom = Math.min(roomCost, maxRoomPayout);
  const payoutSurgery = Math.min(surgeryCost, surgeryLimit);
  const payoutDevice = Math.min(deviceCost, deviceLimit);

  const totalPayout = payoutRoom + payoutSurgery + payoutDevice;
  const outOfPocket = Math.max(0, totalBill - totalPayout);
  const coverageRatio = totalBill > 0 ? Math.round((totalPayout / totalBill) * 100) : 100;

  const elBill = document.getElementById('outMedTotalBill');
  const elPayout = document.getElementById('outMedTotalPayout');
  const elGap = document.getElementById('outMedOutOfPocket');
  const elRatio = document.getElementById('outMedCoverageRatio');
  const elAdvice = document.getElementById('outMedAdvice');

  if (elBill) elBill.textContent = `NT$ ${totalBill.toLocaleString()} 元`;
  if (elPayout) elPayout.textContent = `NT$ ${totalPayout.toLocaleString()} 元`;
  if (elGap) {
    elGap.textContent = `NT$ ${outOfPocket.toLocaleString()} 元`;
    elGap.style.color = outOfPocket > 20000 ? '#dc2626' : '#0f766e';
  }
  if (elRatio) elRatio.textContent = `${coverageRatio}%`;

  if (elAdvice) {
    if (customAdvice) {
      elAdvice.innerHTML = `<strong>💡 理賠精算診斷：</strong>${customAdvice}`;
    } else {
      elAdvice.innerHTML = `<strong>💡 理賠精算診斷：</strong>自費總支出 <strong>NT$ ${totalBill.toLocaleString()} 元</strong>。實支實付理賠 <strong>NT$ ${totalPayout.toLocaleString()} 元</strong>（補償率 ${coverageRatio}%）。個人需自負差額 <strong>NT$ ${outOfPocket.toLocaleString()} 元</strong>。符合 2026 金管會損害填補正本理賠原則！`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: INSURANCE GAME ----------------------
function initInsuranceGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderInsuranceGameLevel();
}

function renderInsuranceGameLevel() {
  const container = document.getElementById('insuranceGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W9_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 75;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【保險保障防禦大師 (Shield Master)】最高榮譽！' : '挑戰完成！榮獲【保險探索初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#0f766e; font-size:1.3rem;">${APP_STATE.gameScore} / 100 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartInsuranceGame()">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W9_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge">${q.badge}</span>
        <span class="quiz-score-badge">累計得分：${APP_STATE.gameScore} / 100</span>
      </div>
      <div class="quiz-scenario">
        <strong>${q.title}</strong><br>${q.scenario}
      </div>
      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="btn-quiz-option" onclick="answerInsuranceGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="insuranceGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerInsuranceGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W9_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#insuranceGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('insuranceGameFeedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (selected.isCorrect) {
      APP_STATE.gameScore += 25;
      feedbackEl.style.background = '#f0fdf4';
      feedbackEl.style.border = '1px solid #86efac';
      feedbackEl.style.color = '#15803d';
      feedbackEl.innerHTML = `
        <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
        <div style="margin-top:10px; text-align:right;">
          <button class="btn-nav-step btn-primary-step" onclick="nextInsuranceGameLevel()">前進下一關 ➔</button>
        </div>
      `;
    } else {
      feedbackEl.style.background = '#fef2f2';
      feedbackEl.style.border = '1px solid #fecaca';
      feedbackEl.style.color = '#991b1b';
      feedbackEl.innerHTML = `
        <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
        <div style="margin-top:10px; text-align:right;">
          <button class="btn-nav-step btn-primary-step" onclick="nextInsuranceGameLevel()">前進下一關 ➔</button>
        </div>
      `;
    }
  }
};

window.nextInsuranceGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderInsuranceGameLevel();
};

window.restartInsuranceGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderInsuranceGameLevel();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetPlan', 'hwDim1Risk', 'hwDim2Triad', 'hwDim3TermMath', 'hwDim4RefusalSop', 'hwConclusionGrade', 'hwDecisionSummary'];
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
    dim1Risk: document.getElementById('hwDim1Risk')?.value || '',
    dim2Triad: document.getElementById('hwDim2Triad')?.value || '',
    dim3TermMath: document.getElementById('hwDim3TermMath')?.value || '',
    dim4RefusalSop: document.getElementById('hwDim4RefusalSop')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('w9_homework_draft', JSON.stringify(data));
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
    const saved = localStorage.getItem('w9_homework_draft');
    if (saved) {
      const data = JSON.parse(saved);
      if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
      if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
      if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = data.targetPlan || '';
      if (document.getElementById('hwDim1Risk')) document.getElementById('hwDim1Risk').value = data.dim1Risk || '';
      if (document.getElementById('hwDim2Triad')) document.getElementById('hwDim2Triad').value = data.dim2Triad || '';
      if (document.getElementById('hwDim3TermMath')) document.getElementById('hwDim3TermMath').value = data.dim3TermMath || '';
      if (document.getElementById('hwDim4RefusalSop')) document.getElementById('hwDim4RefusalSop').value = data.dim4RefusalSop || '';
      if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'A+ (全面且具備實戰避險可行性)';
      if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
    }
  } catch (e) {
    console.warn(e);
  }
}

window.loadHomeworkTemplate = function() {
  const t = W9_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = t.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = t.studentId;
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = t.targetPlan;
  if (document.getElementById('hwDim1Risk')) document.getElementById('hwDim1Risk').value = t.dim1Risk;
  if (document.getElementById('hwDim2Triad')) document.getElementById('hwDim2Triad').value = t.dim2Triad;
  if (document.getElementById('hwDim3TermMath')) document.getElementById('hwDim3TermMath').value = t.dim3TermMath;
  if (document.getElementById('hwDim4RefusalSop')) document.getElementById('hwDim4RefusalSop').value = t.dim4RefusalSop;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = t.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = t.decisionSummary;
  saveHomeworkToLocal();
  alert('已成功載入第九週個人風險管理與保單規劃標準示範範本！');
};

window.exportHomeworkJson = function() {
  saveHomeworkToLocal();
  const saved = localStorage.getItem('w9_homework_draft') || '{}';
  const data = JSON.parse(saved);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W9_保險規劃與風險矩陣報告_${data.studentName || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportHomeworkMd = function() {
  saveHomeworkToLocal();
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const sid = document.getElementById('hwStudentId')?.value || '未填寫';
  const plan = document.getElementById('hwTargetPlan')?.value || '';
  const d1 = document.getElementById('hwDim1Risk')?.value || '';
  const d2 = document.getElementById('hwDim2Triad')?.value || '';
  const d3 = document.getElementById('hwDim3TermMath')?.value || '';
  const d4 = document.getElementById('hwDim4RefusalSop')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第九週作業報告：個人風險管理矩陣與第一份保單規劃報告
- **學生姓名**：${name}
- **學生學號**：${sid}
- **規劃方案**：${plan}
- **自評等級**：${grade}
- **決策總結**：${summary}

---
### 一、大一生活 2 大現實高風險場景與四象限應對策略 (25%)
${d1}

---
### 二、新鮮人高槓桿保障金三角具體配置與底層防護網串聯 (25%)
${d2}

---
### 三、定期險 vs 終身險 30 年累積保費與差額投資 0050 試算 (30%)
${d3}

---
### 四、據實告知承諾、除外責任辨識與拒絕長輩人情保單 SOP (20%)
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

  const filtered = W9_SLIDES_DATA.filter(s => {
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
        openModal('modalRiskMatrix');
        break;
      case '2':
        openModal('modalMedicalCalc');
        break;
      case '3':
        openModal('modalInsuranceGame');
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
