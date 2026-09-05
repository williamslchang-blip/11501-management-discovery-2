/**
 * 115學年度「管理探索二」第八週互動教學主程式
 * 單元名稱：期中學習成果檢核與實戰個案總複習
 */

const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh',
  viewMode: 'deck',
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen',
  drawingColor: '#4338ca',
  drawingWidth: 3,

  // 1小時活動 (W1-W7 觀念對決與迷思快問快答擂台)
  mythActiveId: 1,
  mythAnswers: {},

  // 2小時活動 (大學生 10 萬元綜合資產配置模擬器)
  portfolioState: {
    amount: 100000,
    pctSavings: 30,
    pctStock: 50,
    pctFx: 20
  },

  // 3小時遊戲 (期中會考大挑戰)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (期中學習反思與個人綜合理財報告)
  homeworkData: {
    studentName: '',
    studentId: '',
    targetTopic: '',
    dim1Myth: '',
    dim2Health: '',
    dim3Portfolio: '',
    dim4Security: '',
    conclusionGrade: 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initMythQuiz();
  initAssetSim();
  initMidtermGame();
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
  W8_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W8_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w8-primary);">✦</span><span>${t}</span></li>`).join('');
  }

  const guideQuestion = document.getElementById('slideGuideQuestion');
  if (guideQuestion) guideQuestion.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) notesQuestions.textContent = isZh ? slide.discussionQuestion : slide.discussionQuestionEn;

  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W8_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W8_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W8_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W8_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W8_SLIDES_DATA.length - 1) {
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
          <h4>🎓 期中學習成果總評：從零財金走向獨立理性決策</h4>
          <span class="sub-tag">「風險來自於你不知道自己在做什麼！」— Warren Buffett</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #c7d2fe; border-radius:10px; padding:14px; text-align:center;">
          <div style="font-size:2.4rem; margin-bottom:4px;">🎯</div>
          <h4 style="color:#4338ca; font-size:1.15rem; margin-bottom:6px;">W1 ~ W7 財金七大基石總檢閱</h4>
          <p style="font-size:0.82rem; color:#475569; line-height:1.5;">素養認知 ➔ 物價通膨 ➔ 利率央行 ➔ 股市ROE ➔ 指數ETF ➔ 數位活存 ➔ 個人外匯</p>
        </div>
      </div>`;
      break;

    case 2:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第八週 3 小時期中全景總複習與會考應試策略</h4>
          <span class="sub-tag">理論與實務個案雙軌推進 ‧ 打造通識高分與終身理財護甲</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#eef2ff; border-top:4px solid #4338ca; border-radius:8px; padding:10px;">
            <strong style="color:#4338ca; font-size:0.85rem;">第 1 小時 ‧ 基礎與個案</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">W1-W4精華、個案A (通膨防禦)、個案B (台積電評析)、5大迷思擂台。</p>
          </div>
          <div style="background:#f0f9ff; border-top:4px solid #0ea5e9; border-radius:8px; padding:10px;">
            <strong style="color:#0284c7; font-size:0.85rem;">第 2 小時 ‧ 跨單元與配置</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">W5-W7精華、個案C (10萬配置)、個案D (海外精算)、個案E (宏觀傳導)。</p>
          </div>
          <div style="background:#fffbeb; border-top:4px solid #f59e0b; border-radius:8px; padding:10px;">
            <strong style="color:#b45309; font-size:0.85rem;">第 3 小時 ‧ 會考與總評</strong>
            <p style="font-size:0.75rem; color:#475569; margin-top:4px;">4大題型心法、4大常錯陷阱、期中大挑戰小遊戲、期中反思實務作業。</p>
          </div>
        </div>
      </div>`;
      break;

    case 3:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🛡️ W1 核心：資訊爆炸時代之防偽批判思考框架</h4>
          <span class="sub-tag">破解社群演算法 FOMO 焦慮與倖存者偏差之科學防線</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#fef2f2; border-left:4px solid #ef4444; border-radius:8px; padding:10px;">
            <strong style="color:#dc2626; font-size:0.85rem;">🚨 常見心理陷阱</strong>
            <p style="font-size:0.76rem; color:#475569; margin-top:4px;"><strong>FOMO</strong>：恐懼錯失爆賺急躁追高。<br><strong>倖存者偏差</strong>：只見少年股神，忽視90%慘賠散戶。</p>
          </div>
          <div style="background:#f0fdf4; border-left:4px solid #16a34a; border-radius:8px; padding:10px;">
            <strong style="color:#16a34a; font-size:0.85rem;">✅ 理性破解法寶</strong>
            <p style="font-size:0.76rem; color:#475569; margin-top:4px;"><strong>4D Filter</strong>：查核數據真實性。<br><strong>鐵律</strong>：不懂的金融商品絕不投入一分錢！</p>
          </div>
        </div>
      </div>`;
      break;

    case 4:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📉 W2 核心：實質購買力與通膨侵蝕算術</h4>
          <span class="sub-tag">看穿貨幣幻覺 (Money Illusion) ‧ 實質利率 = 名目利率 - CPI通膨率</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:14px; text-align:center;">
          <div style="display:flex; justify-content:space-around; align-items:center; margin-bottom:8px;">
            <div>
              <span style="font-size:0.75rem; color:#64748b;">銀行定存名目年息</span>
              <div style="font-size:1.6rem; font-weight:900; color:#2563eb;">+1.8%</div>
            </div>
            <div style="font-size:1.5rem; font-weight:800; color:#64748b;">−</div>
            <div>
              <span style="font-size:0.75rem; color:#64748b;">主計總處 CPI 通膨率</span>
              <div style="font-size:1.6rem; font-weight:900; color:#dc2626;">2.6%</div>
            </div>
            <div style="font-size:1.5rem; font-weight:800; color:#64748b;">=</div>
            <div>
              <span style="font-size:0.75rem; color:#64748b;">實質年化購買力縮水</span>
              <div style="font-size:1.6rem; font-weight:900; color:#b91c1c;">-0.8%</div>
            </div>
          </div>
          <p style="font-size:0.75rem; color:#64748b;">定存 10 萬元放一年，購買力實質縮水 800 元，單靠傳統儲蓄無法對抗通膨！</p>
        </div>
      </div>`;
      break;

    case 5:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚖️ W3 核心：中央銀行利率政策與債券價格反向蹺蹺板</h4>
          <span class="sub-tag">重貼現率槓桿與存續期間 (Duration) 資本利得規律</span>
        </div>
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; text-align:center;">
            <div style="background:#fff; border-radius:8px; padding:10px;">
              <span style="font-size:1.2rem;">📈 央行升息</span>
              <p style="font-size:0.76rem; color:#dc2626; font-weight:700; margin-top:4px;">舊債券價格暴跌</p>
              <span style="font-size:0.7rem; color:#64748b;">新債息更高，舊債被拋售</span>
            </div>
            <div style="background:#fff; border-radius:8px; padding:10px;">
              <span style="font-size:1.2rem;">📉 央行降息</span>
              <p style="font-size:0.76rem; color:#16a34a; font-weight:700; margin-top:4px;">舊債券價格大漲！</p>
              <span style="font-size:0.7rem; color:#64748b;">舊高息債搶手，享資本利得</span>
            </div>
          </div>
        </div>
      </div>`;
      break;

    case 6:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📊 W4 核心：企業估值 (P/E) 與杜邦三因子 ROE 拆解</h4>
          <span class="sub-tag">買股票就是買企業所有權 ‧ 看穿公司獲利真正驅動引擎</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; text-align:center;">
            <span style="font-size:0.75rem; color:#64748b;">淨利率 (Net Margin)</span>
            <div style="font-size:1.15rem; font-weight:900; color:#1e293b; margin:4px 0;">產品技術護城河</div>
            <p style="font-size:0.7rem; color:#64748b;">如台積電毛利 > 53%</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; text-align:center;">
            <span style="font-size:0.75rem; color:#64748b;">資產週轉率 (Turnover)</span>
            <div style="font-size:1.15rem; font-weight:900; color:#1e293b; margin:4px 0;">營運周轉效率</div>
            <p style="font-size:0.7rem; color:#64748b;">如統一超商快速周轉</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; text-align:center;">
            <span style="font-size:0.75rem; color:#64748b;">權益乘數 (Leverage)</span>
            <div style="font-size:1.15rem; font-weight:900; color:#1e293b; margin:4px 0;">財務槓桿放大器</div>
            <p style="font-size:0.7rem; color:#64748b;">如金融銀行業槓桿</p>
          </div>
        </div>
      </div>`;
      break;

    case 7:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💼 實戰個案 A：大學生 15,000 元月現金流通膨防禦戰</h4>
          <span class="sub-tag">通膨 2.5% + 便當漲價 10% 環境下的大學生收支再平衡方案</span>
        </div>
        <div class="case-study-box">
          <span class="case-study-badge">個案防禦三大步驟</span>
          <div style="font-size:0.8rem; line-height:1.6; color:#334155;">
            <strong>1. 留存緊急水庫</strong>：活存保留 36,000 元 (3個月生活費) 於 2.5%~3.5% 數位高利帳戶。<br>
            <strong>2. 削減無效消費</strong>：戒除手搖飲與無感訂閱制，每月擠出 3,000 元投資預算。<br>
            <strong>3. 定期定額市值 ETF</strong>：3,000 元扣款 0050/VOO，享受台灣科技長期複利打敗通膨。
          </div>
        </div>
      </div>`;
      break;

    case 8:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏭 實戰個案 B：台積電 (2330) 護城河、P/E 與匯率敏感度</h4>
          <span class="sub-tag">掌握台灣護國神山的三面綜合評估法 (技術、估值、外匯)</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border-radius:8px; padding:10px;">
            <strong style="color:#1d4ed8; font-size:0.82rem;">📈 評價與護城河</strong>
            <p style="font-size:0.74rem; color:#475569; margin-top:4px;">毛利率常態保持 53% 以上，ROE 突破 28%。歷史本益比常態於 15~25 倍間波動，具備足夠安全邊際。</p>
          </div>
          <div style="background:#f0fdf4; border-radius:8px; padding:10px;">
            <strong style="color:#15803d; font-size:0.82rem;">💱 匯率敏感彈性</strong>
            <p style="font-size:0.74rem; color:#475569; margin-top:4px;">營收全面採美元計價，新台幣兌美元每貶值 1 元，營業利益率約增加 0.4 個百分點，獲利表現強勁！</p>
          </div>
        </div>
      </div>`;
      break;

    case 9:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🚫 前半學期常見 5 大財經觀念迷思總解密</h4>
          <span class="sub-tag">打破直覺思維謬誤 ‧ 建立科學金融決策之免疫力</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; font-size:0.78rem; line-height:1.5; color:#991b1b;">
          1. 10元低價股絕不等於便宜安全（看本益比 P/E）。<br>
          2. 升息買公債不會大賺，央行降息時債券才大漲。<br>
          3. 高股息沒填息只是左口袋換右口袋。<br>
          4. 定存名目利率扣除 CPI 通膨後實質常常為負。<br>
          5. 信用卡只要沒全額繳清，即被回溯計收 15% 循環利息！
        </div>
      </div>`;
      break;

    case 10:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第一小時總結與專屬活動預告</h4>
          <span class="sub-tag">檢驗前半學期觀念吸收 ‧ 挑戰 5 大迷思快問快答</span>
        </div>
        <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.2rem; margin-bottom:6px;">🥊</div>
          <h4 style="color:#0369a1; font-size:1.1rem; margin-bottom:6px;">W1-W7 觀念對決與迷思快問快答擂台</h4>
          <p style="font-size:0.8rem; color:#475569; margin-bottom:12px;">點擊上方導覽列按鈕開啟 Modal，挑戰 5 道真偽判斷題，檢驗自己的迷思抗體得分！</p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalMythQuiz')">立即挑戰迷思擂台</button>
        </div>
      </div>`;
      break;

    case 11:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📈 W5 核心：被動投資微笑曲線 (DCA) 與平準金新規</h4>
          <span class="sub-tag">不擇時、不預測高低點 ‧ 用長期紀律扣款克服人性貪婪與恐懼</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:12px; text-align:center;">
          <div style="display:flex; justify-content:space-around; align-items:center;">
            <div style="font-size:0.8rem; color:#475569;">下跌持續扣款<br><strong style="color:#2563eb;">多買便宜單位</strong></div>
            <div style="font-size:1.8rem; color:#10b981;">➔ 😃 ➔</div>
            <div style="font-size:0.8rem; color:#475569;">行情反彈回升<br><strong style="color:#16a34a;">微笑豐厚收割</strong></div>
          </div>
          <p style="font-size:0.75rem; color:#64748b; margin-top:8px;">金管會平準金新規：禁止動用平準金衝高帳面配息率，杜絕本金倒貼噱頭。</p>
        </div>
      </div>`;
      break;

    case 12:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💳 W6 核心：數位金融高利活存上限與信用卡 15% 黑洞</h4>
          <span class="sub-tag">算清有效 APY ‧ 堅守「永遠全額繳清帳單」之最高安全鐵律</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:#eff6ff; border-radius:8px; padding:10px;">
            <strong style="color:#1d4ed8; font-size:0.82rem;">🏦 高利活存額度上限</strong>
            <p style="font-size:0.74rem; color:#475569; margin-top:4px;">號稱 8% 往往上限僅 1 萬元，超額回歸 0.8%，綜合利率被大幅稀釋。存滿各家上限為最佳策略。</p>
          </div>
          <div style="background:#fef2f2; border-radius:8px; padding:10px;">
            <strong style="color:#dc2626; font-size:0.82rem;">⚠️ 15% 循環利息黑洞</strong>
            <p style="font-size:0.74rem; color:#475569; margin-top:4px;">只要少繳 1 元，銀行便追溯每筆消費入帳日起算最高 15% 年息，信用評分立刻被扣分！</p>
          </div>
        </div>
      </div>`;
      break;

    case 13:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💱 W7 核心：即期 vs. 現金換匯點差與雙幣卡避險</h4>
          <span class="sub-tag">拒絕臨櫃高昂現鈔點差 ‧ 海外消費堅持選當地貨幣拒絕 DCC</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:12px; text-align:center;">
          <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:10px; align-items:center;">
            <div>
              <span style="font-size:0.75rem; color:#64748b;">臨櫃現鈔點差</span>
              <div style="font-size:1.1rem; font-weight:800; color:#dc2626;">昂貴 (約2%~3%)</div>
            </div>
            <div style="font-size:1.2rem; font-weight:800; color:#64748b;">VS</div>
            <div>
              <span style="font-size:0.75rem; color:#64748b;">網銀即期+雙幣卡</span>
              <div style="font-size:1.1rem; font-weight:800; color:#16a34a;">優惠鎖匯+免點差</div>
            </div>
          </div>
          <p style="font-size:0.75rem; color:#64748b; margin-top:8px;">出國刷卡堅持選擇當地貨幣（JPY/USD），斷然拒絕 DCC 5% 暴利點差！</p>
        </div>
      </div>`;
      break;

    case 14:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>💰 跨單元個案 C：大學生 10 萬元資產配置 (30/50/20)</h4>
          <span class="sub-tag">流動性、成長性與防禦性兼備之黃金三角組合</span>
        </div>
        <div class="asset-triad-grid">
          <div class="asset-bar-card savings">
            <span style="font-size:0.75rem; font-weight:800; color:#1d4ed8;">30% 緊急活存</span>
            <div class="asset-pct">30,000</div>
            <p style="font-size:0.72rem; color:#64748b;">高利數位帳戶 (約3%)<br>防突發停工醫療支出</p>
          </div>
          <div class="asset-bar-card stock">
            <span style="font-size:0.75rem; font-weight:800; color:#15803d;">50% 核心投資</span>
            <div class="asset-pct">50,000</div>
            <p style="font-size:0.72rem; color:#64748b;">0050 / VOO 市值ETF<br>追求年化 8%~10%</p>
          </div>
          <div class="asset-bar-card fx">
            <span style="font-size:0.75rem; font-weight:800; color:#b45309;">20% 美元短債</span>
            <div class="asset-pct">20,000</div>
            <p style="font-size:0.72rem; color:#64748b;">美金定存或短期國債<br>外幣避險與未來旅遊</p>
          </div>
        </div>
      </div>`;
      break;

    case 15:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>✈️ 跨單元個案 D：海外購物與日本旅遊全套財務精算</h4>
          <span class="sub-tag">換匯 3 萬台幣實戰 ‧ 雙幣卡鎖匯 + 2.5% 回饋省錢大解密</span>
        </div>
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; line-height:1.6;">
            <div>
              <strong>1. 即期換匯省點差</strong>：相較臨櫃現鈔多換 3,171 日圓 (省 NT$ 682)。<br>
              <strong>2. 雙幣卡刷卡免手續費</strong>：海外 1.5% 交易手續費由卡片 2.5% 回饋完全覆蓋。<br>
              <strong>3. 淨賺海外回饋</strong>：倒賺 1.0% 現金回饋，兼顧省錢、安全與便利！
            </div>
            <div style="font-size:2rem;">🇯🇵</div>
          </div>
        </div>
      </div>`;
      break;

    case 16:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌐 跨單元個案 E：美台升降息宏觀傳導鏈骨牌效應</h4>
          <span class="sub-tag">從聯準會降息到台美利差收斂、新台幣走勢與房貸負擔全圖景</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:12px; font-size:0.75rem; line-height:1.6; color:#334155;">
          <strong>美聯儲宣布降息</strong> ➔ 美元指數走弱、台美利差縮小 ➔ 國際資金回流亞洲新興市場 ➔ <strong>新台幣升值</strong> ➔ 進口原油與物價壓力緩解 ➔ 外資買超台積電與權值股 ➔ 台灣央行利率政策微調 ➔ <strong>個人房貸利率維持平穩</strong>。
        </div>
      </div>`;
      break;

    case 17:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🏛️ 財經數據權威資料庫綜合查閱法 (四大官方源)</h4>
          <span class="sub-tag">告別社群農場文 ‧ 從源頭掌握第一手國家級客觀統計大數據</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
            <strong style="color:#2563eb; font-size:0.8rem;">🇹🇼 主計總處 (DGBAS)</strong>
            <p style="font-size:0.72rem; color:#64748b;">每月發布 CPI、實質薪資與 GDP 數據。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
            <strong style="color:#059669; font-size:0.8rem;">📈 台灣證交所 (TWSE)</strong>
            <p style="font-size:0.72rem; color:#64748b;">上市櫃公司財報 MOPS 與本益比統計。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
            <strong style="color:#d97706; font-size:0.8rem;">🏦 中央銀行 (CBC)</strong>
            <p style="font-size:0.72rem; color:#64748b;">基準重貼現率、每日牌告與外匯存底。</p>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
            <strong style="color:#7c3aed; font-size:0.8rem;">🛡️ 金管會 (FSC)</strong>
            <p style="font-size:0.72rem; color:#64748b;">銀行高利活存監管、防詐防洗錢條例。</p>
          </div>
        </div>
      </div>`;
      break;

    case 18:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔐 大一新鮮人全方位理財資安與防詐護甲</h4>
          <span class="sub-tag">2FA Authenticator 雙重認證 ‧ 終身奉行三不原則</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:10px; padding:12px;">
          <div style="font-size:0.8rem; line-height:1.6; color:#14532d;">
            <strong>🛡️ 資安防護鐵律</strong>：<br>
            1. 全面開啟 Google Authenticator / 生物辨識 2FA，拒用純 SMS 簡訊驗證碼。<br>
            2. <strong>三不原則</strong>：絕不點擊簡訊連結、絕不透露 OTP 密碼、絕不加入陌生 LINE 投資群組！
          </div>
        </div>
      </div>`;
      break;

    case 19:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🩺 財務健全度 4 大指標個人健康自評</h4>
          <span class="sub-tag">在跨出投資步伐前 ‧ 先確認防禦體質是否達標</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="background:#f8fafc; border-radius:8px; padding:8px; border:1px solid #cbd5e1;">
            <strong style="font-size:0.78rem;">1. 緊急預備金月數</strong>
            <div style="color:#16a34a; font-weight:800; font-size:0.85rem;">標準：3 ~ 6 個月</div>
          </div>
          <div style="background:#f8fafc; border-radius:8px; padding:8px; border:1px solid #cbd5e1;">
            <strong style="font-size:0.78rem;">2. 月儲蓄率</strong>
            <div style="color:#16a34a; font-weight:800; font-size:0.85rem;">標準：> 20% 收入</div>
          </div>
          <div style="background:#f8fafc; border-radius:8px; padding:8px; border:1px solid #cbd5e1;">
            <strong style="font-size:0.78rem;">3. 個人負債比</strong>
            <div style="color:#16a34a; font-weight:800; font-size:0.85rem;">標準：月供款 < 30%</div>
          </div>
          <div style="background:#f8fafc; border-radius:8px; padding:8px; border:1px solid #cbd5e1;">
            <strong style="font-size:0.78rem;">4. 流動性指標</strong>
            <div style="color:#16a34a; font-weight:800; font-size:0.85rem;">標準：流動資產/月支 > 3</div>
          </div>
        </div>
      </div>`;
      break;

    case 20:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🎯 第二小時總結與專屬活動預告</h4>
          <span class="sub-tag">跨單元實務演練 ‧ 啟動 10 萬元資產配置模擬器</span>
        </div>
        <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.2rem; margin-bottom:6px;">🧮</div>
          <h4 style="color:#4338ca; font-size:1.1rem; margin-bottom:6px;">大學生 10 萬元綜合資產配置模擬器</h4>
          <p style="font-size:0.8rem; color:#475569; margin-bottom:12px;">調配活存、0050 ETF 與外幣定存比例，即時計算預期報酬與極端回撤壓力！</p>
          <button class="btn-nav-step btn-primary-step" onclick="openModal('modalAssetSim')">啟動配置模擬器</button>
        </div>
      </div>`;
      break;

    case 21:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>📝 期中會考命題方向與 4 大題型解題心法</h4>
          <span class="sub-tag">通識會考破題要訣 ‧ 概念、情境、計算、簡答一把抓</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.75rem;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong>1. 觀念辨析 (30%)</strong>：名目vs實質利率、P/E回本年、除息填息。
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong>2. 生活情境 (30%)</strong>：雙幣卡海外刷卡、信用卡最低應繳循環利息。
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong>3. 精準計算 (25%)</strong>：實質利率算術、即期vs現金點差省錢試算。
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px;">
            <strong>4. 案例簡答 (15%)</strong>：台積電匯率彈性、10萬資產30/50/20規劃。
          </div>
        </div>
      </div>`;
      break;

    case 22:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 常錯陷阱 1：名目利率與實質利率通膨扣除</h4>
          <span class="sub-tag">實質利率 = 名目利率 − CPI 通膨率 ‧ 勿犯「貨幣幻覺」</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.8rem; line-height:1.6; color:#991b1b;">
          <strong>會考高頻錯題</strong>：小明定存 1.8%，CPI 2.6%。<br>
          ❌ 錯解：1.8% + 2.6% = 4.4% (誤把通膨當收益加總)<br>
          ✅ 正解：1.8% - 2.6% = -0.8% (實質本金購買力在縮水！)
        </div>
      </div>`;
      break;

    case 23:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 常錯陷阱 2：高股息 ETF 填息與平準金真相</h4>
          <span class="sub-tag">除息不等於賺到利息 ‧ 唯有股價「填息」才是真實獲利</span>
        </div>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px; font-size:0.8rem; line-height:1.6; color:#92400e;">
          <strong>會考高頻錯題</strong>：高股息 ETF 配息 1 元，除息當天股價從 20 跌至 19 元。<br>
          ❌ 錯解：現賺 1 元配息入袋好開心！<br>
          ✅ 正解：帳戶現值 19 元 + 現金 1 元 = 20 元，資產總值完全沒變！必須等股價漲回 20 元以上才算實質賺錢。
        </div>
      </div>`;
      break;

    case 24:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 常錯陷阱 3：信用卡 0% 分期與循環利息起算點</h4>
          <span class="sub-tag">喪失免息寬限期 ‧ 自各筆入帳日起算 15% 追溯年息</span>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; font-size:0.8rem; line-height:1.6; color:#991b1b;">
          <strong>會考高頻錯題</strong>：帳單 3 萬只繳最低應繳 3 千。<br>
          ❌ 錯解：剩下的 2.7 萬下個月再還，只要繳幾十塊利息。<br>
          ✅ 正解：銀行自動自每筆「消費入帳日」追溯計收最高 15% 循環利息，次月帳單利息常高達數百至上千元！
        </div>
      </div>`;
      break;

    case 25:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>⚠️ 常錯陷阱 4：美元 5% 定存賺利息賠匯差陷阱</h4>
          <span class="sub-tag">台幣升值帶來致命匯損 ‧ 務必從新台幣總報酬評估</span>
        </div>
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px; font-size:0.8rem; line-height:1.6; color:#1e40af;">
          <strong>會考高頻錯題</strong>：32.5 換美金存 5% 定存，到期時匯率降至 30.0。<br>
          ❌ 錯解：穩穩賺取 5,000 台幣定存利息。<br>
          ✅ 正解：美元資產領息 5%，但換回台幣時匯率升值 7.7%，總體倒賠約 2.7%！
        </div>
      </div>`;
      break;

    case 26:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌱 期中大審視：前 7 週個人生活習慣改變與成長量表</h4>
          <span class="sub-tag">通識學習的終極價值在於生活行為的徹底蛻變</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px; font-size:0.76rem; line-height:1.6; color:#166534;">
          <strong>7 週蛻變清單</strong>：<br>
          1. 每日自動記帳，掌握每筆自由現金流。<br>
          2. 開立高利數位帳戶，存入 3 個月緊急預備金。<br>
          3. 券商開戶完成，啟動 0050 / VOO 每月定期定額。<br>
          4. 信用卡設定全額自動扣款，徹底告別循環利息。<br>
          5. 全面啟用 Authenticator 2FA，打造資安防詐護盾。
        </div>
      </div>`;
      break;

    case 27:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🔭 後半學期 (W9-W18) 課程藍圖宏觀前瞻</h4>
          <span class="sub-tag">從個人理財防禦 ➔ 邁向房地產、科技產業與全球宏觀</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.74rem;">
          <div style="background:#f8fafc; border-radius:6px; padding:8px; border:1px solid #e2e8f0;">
            <strong style="color:#4338ca;">個人防禦與實務 (W9-W12)</strong><br>
            W9 保險風險規劃、W10 房產租買決策、W11 綜合所得稅節稅、W12 家庭資產負債表。
          </div>
          <div style="background:#f8fafc; border-radius:6px; padding:8px; border:1px solid #e2e8f0;">
            <strong style="color:#0ea5e9;">產業鏈與全球趨勢 (W13-W18)</strong><br>
            W13 台積電半導體鏈、W14 生成式 AI 產業鏈、W15 ESG綠色金融、W16 加密貨幣Web3、W17 專案發表、W18 終身宣言。
          </div>
        </div>
      </div>`;
      break;

    case 28:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>👑 期中全方位財經 7 大黃金守則總整合</h4>
          <span class="sub-tag">一輩子受用無窮的理性財務指北針</span>
        </div>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-size:0.74rem; line-height:1.55; color:#1e293b;">
          1. <strong>不懂不買</strong>：看不懂的商品絕不碰。<br>
          2. <strong>實質第一</strong>：牢記通膨扣除算術。<br>
          3. <strong>急用優先</strong>：必備 3-6 個月高利活存預備金。<br>
          4. <strong>全額繳清</strong>：拒絕 15% 信用卡循環利息。<br>
          5. <strong>長期微笑</strong>：定期定額市值型 ETF 被動投資。<br>
          6. <strong>資產分散</strong>：落實 30/50/20 黃金配置。<br>
          7. <strong>資安 2FA</strong>：杜絕詐騙與釣魚連結。
        </div>
      </div>`;
      break;

    case 29:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🗺️ 第八週全景知識體系圖與期中總結</h4>
          <span class="sub-tag">融會貫通個人理財與總體經濟的完整邏輯脈絡</span>
        </div>
        <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:10px; padding:14px; text-align:center;">
          <div style="font-size:1rem; font-weight:800; color:#4338ca; margin-bottom:6px;">全方位理性財務護城河架構</div>
          <p style="font-size:0.78rem; color:#475569; line-height:1.6;">底層：批判思維 + 2FA資安防護<br>中層：3-6個月緊急預備金 + 雙幣卡鎖匯<br>頂層：0050 市值型 ETF 被動投資 + 杜邦 ROE 企業價值洞察</p>
        </div>
      </div>`;
      break;

    case 30:
      container.innerHTML = `<div class="visual-diagram-card">
        <div class="diagram-header">
          <h4>🌟 期中學習反思與第九週預告</h4>
          <span class="sub-tag">第九週：保險基礎、風險管理與個人保障規劃</span>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:10px; padding:16px; text-align:center;">
          <div style="font-size:2.4rem; margin-bottom:6px;">🛡️</div>
          <h4 style="color:#15803d; font-size:1.15rem; margin-bottom:4px;">下週啟航：大一新鮮人人生第一張保單指南</h4>
          <p style="font-size:0.8rem; color:#475569;">拆解薩繆爾森四象限風險矩陣、機車通勤意外險、實支實付醫療險正本理賠改革，用 3,000 元打造極致個人保障！</p>
        </div>
      </div>`;
      break;

    default:
      container.innerHTML = `<div class="visual-diagram-card"><p style="text-align:center; color:#64748b;">Slide ${id} 內容載入中...</p></div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: MYTH QUIZ ----------------------
function initMythQuiz() {
  renderMythCard(0);
}

function renderMythCard(index) {
  const container = document.getElementById('mythQuizContainer');
  if (!container) return;
  const q = W8_MYTH_QUESTIONS[index];
  if (!q) return;

  container.innerHTML = `
    <div class="quiz-box">
      <div class="quiz-badge-bar">
        <span class="quiz-badge">迷思對決 0${q.id} / 05 ‧ ${q.category}</span>
        <span class="quiz-score-badge">已完成 ${Object.keys(APP_STATE.mythAnswers).length} / 5</span>
      </div>
      <div class="quiz-scenario">
        <strong>【常見迷思敘述】：</strong><br>${q.statement}
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
        <button class="btn-quiz-option" onclick="handleMythAnswer(${index}, true)">⭕ 認為正確 (True)</button>
        <button class="btn-quiz-option" onclick="handleMythAnswer(${index}, false)">❌ 認為是迷思 (False)</button>
      </div>
      <div id="mythFeedbackBox" style="display:none; padding:12px 14px; border-radius:8px; font-size:0.85rem; line-height:1.5;"></div>
      <div style="display:flex; justify-content:space-between; margin-top:14px;">
        <button class="btn-nav-step" onclick="renderMythCard(${Math.max(0, index - 1)})" ${index === 0 ? 'disabled' : ''}>上一題</button>
        <button class="btn-nav-step btn-primary-step" onclick="renderMythCard(${Math.min(W8_MYTH_QUESTIONS.length - 1, index + 1)})" ${index === W8_MYTH_QUESTIONS.length - 1 ? 'disabled' : ''}>下一題</button>
      </div>
    </div>
  `;
}

window.handleMythAnswer = function(index, userChoice) {
  const q = W8_MYTH_QUESTIONS[index];
  const fb = document.getElementById('mythFeedbackBox');
  if (!fb || !q) return;

  const isUserCorrect = (userChoice === q.isCorrect);
  APP_STATE.mythAnswers[index] = isUserCorrect;

  fb.style.display = 'block';
  if (isUserCorrect) {
    fb.style.background = '#f0fdf4';
    fb.style.border = '1px solid #86efac';
    fb.style.color = '#15803d';
    fb.innerHTML = `<strong>🎉 答對了！</strong>你具備極強的迷思抗體！<br>${q.explanation}`;
  } else {
    fb.style.background = '#fef2f2';
    fb.style.border = '1px solid #fca5a5';
    fb.style.color = '#991b1b';
    fb.innerHTML = `<strong>⚠️ 踩坑了！</strong>這是大一生最容易掉入的陷阱！<br>${q.explanation}`;
  }
};

// ---------------------- 2 HOUR ACTIVITY: 100K ASSET SIMULATOR ----------------------
function initAssetSim() {
  document.querySelectorAll('.asset-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.asset-preset-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pKey = e.currentTarget.getAttribute('data-preset');
      const p = W8_PORTFOLIO_PRESETS[pKey];
      if (p) {
        setAssetInputs(p.pctSavings, p.pctStock, p.pctFx);
        calculateAssetSim(p.desc);
      }
    });
  });

  ['simPctSavings', 'simPctStock', 'simPctFx'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      const s = parseInt(document.getElementById('simPctSavings')?.value) || 0;
      const st = parseInt(document.getElementById('simPctStock')?.value) || 0;
      const fx = parseInt(document.getElementById('simPctFx')?.value) || 0;
      APP_STATE.portfolioState = { amount: 100000, pctSavings: s, pctStock: st, pctFx: fx };
      calculateAssetSim();
    });
  });

  calculateAssetSim(W8_PORTFOLIO_PRESETS.balanced_30_50_20.desc);
}

function setAssetInputs(s, st, fx) {
  if (document.getElementById('simPctSavings')) document.getElementById('simPctSavings').value = s;
  if (document.getElementById('simPctStock')) document.getElementById('simPctStock').value = st;
  if (document.getElementById('simPctFx')) document.getElementById('simPctFx').value = fx;
  APP_STATE.portfolioState = { amount: 100000, pctSavings: s, pctStock: st, pctFx: fx };
}

function calculateAssetSim(customDesc = '') {
  const { amount, pctSavings, pctStock, pctFx } = APP_STATE.portfolioState;
  const totalPct = pctSavings + pctStock + pctFx;

  // Assume returns: Savings 3.0%, Stock 9.0%, FX 4.5%
  // Assume historical max drawdowns: Savings 0%, Stock -25%, FX -8%
  const expectedReturn = ((pctSavings * 3.0) + (pctStock * 9.0) + (pctFx * 4.5)) / 100;
  const maxDrawdown = ((pctSavings * 0) + (pctStock * -25) + (pctFx * -8)) / 100;
  const expectedProfitTwd = Math.round(amount * (expectedReturn / 100));

  const elReturn = document.getElementById('outSimReturn');
  const elDrawdown = document.getElementById('outSimDrawdown');
  const elProfit = document.getElementById('outSimProfit');
  const elAdvice = document.getElementById('outSimAdvice');

  if (elReturn) elReturn.textContent = `${expectedReturn.toFixed(2)}%`;
  if (elDrawdown) {
    elDrawdown.textContent = `${maxDrawdown.toFixed(1)}%`;
    elDrawdown.style.color = maxDrawdown < -15 ? '#dc2626' : '#b45309';
  }
  if (elProfit) elProfit.textContent = `約 NT$ ${expectedProfitTwd.toLocaleString()} 元 / 年`;

  if (elAdvice) {
    if (totalPct !== 100) {
      elAdvice.innerHTML = `<span style="color:#dc2626; font-weight:700;">⚠️ 比例加總為 ${totalPct}%，請調整為剛好 100% 以獲取精確試算！</span>`;
    } else if (customDesc) {
      elAdvice.innerHTML = `<strong>💡 配置策略診斷：</strong>${customDesc}`;
    } else {
      elAdvice.innerHTML = `<strong>💡 配置策略診斷：</strong>此組合預期年化報酬率為 <strong>${expectedReturn.toFixed(2)}%</strong>，在遭遇全球股災之極端情境下，最大預估回撤約為 <strong>${Math.abs(maxDrawdown).toFixed(1)}%</strong>。具備良好的風險收益性！`;
    }
  }
}

// ---------------------- 3 HOUR ACTIVITY: MIDTERM EXAM GAME ----------------------
function initMidtermGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderMidtermGameLevel();
}

function renderMidtermGameLevel() {
  const container = document.getElementById('midtermGameContainer');
  if (!container) return;

  if (APP_STATE.gameCurrentLevel >= W8_GAME_QUESTIONS.length) {
    const passed = APP_STATE.gameScore >= 75;
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px;">
        <div style="font-size:3.5rem; margin-bottom:8px;">${passed ? '🏆' : '🥉'}</div>
        <h3 style="font-size:1.4rem; color:#1e293b; margin-bottom:6px;">
          ${passed ? '恭喜通關！榮獲【財金探索期中達人 (Midterm Master)】最高榮譽！' : '挑戰完成！榮獲【財金探索初學者】結業徽章！'}
        </h3>
        <p style="font-size:0.95rem; color:#64748b; margin-bottom:16px;">
          最終得分：<strong style="color:#4338ca; font-size:1.3rem;">${APP_STATE.gameScore} / 100 分</strong>
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartMidtermGame()">重新挑戰衝刺滿分 🔄</button>
      </div>
    `;
    return;
  }

  const q = W8_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
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
          <button class="btn-quiz-option" onclick="answerMidtermGame(${oIdx})">${opt.text}</button>
        `).join('')}
      </div>
      <div id="midtermGameFeedback" style="margin-top:14px; display:none;"></div>
    </div>
  `;
}

window.answerMidtermGame = function(optionIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const q = W8_GAME_QUESTIONS[APP_STATE.gameCurrentLevel];
  const selected = q.options[optionIndex];
  const buttons = document.querySelectorAll('#midtermGameContainer .btn-quiz-option');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (q.options[idx].isCorrect) btn.classList.add('correct');
    else if (idx === optionIndex && !selected.isCorrect) btn.classList.add('wrong');
  });

  const feedbackEl = document.getElementById('midtermGameFeedback');
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
          <button class="btn-nav-step btn-primary-step" onclick="nextMidtermGameLevel()">前進下一關 ➔</button>
        </div>
      `;
    } else {
      feedbackEl.style.background = '#fef2f2';
      feedbackEl.style.border = '1px solid #fecaca';
      feedbackEl.style.color = '#991b1b';
      feedbackEl.innerHTML = `
        <div style="font-size:0.9rem; line-height:1.5;">${selected.feedback}</div>
        <div style="margin-top:10px; text-align:right;">
          <button class="btn-nav-step btn-primary-step" onclick="nextMidtermGameLevel()">前進下一關 ➔</button>
        </div>
      `;
    }
  }
};

window.nextMidtermGameLevel = function() {
  APP_STATE.gameCurrentLevel++;
  renderMidtermGameLevel();
};

window.restartMidtermGame = function() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderMidtermGameLevel();
};

// ---------------------- 3 HOUR ACTIVITY: HOMEWORK FORM ----------------------
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwTargetTopic', 'hwDim1Myth', 'hwDim2Health', 'hwDim3Portfolio', 'hwDim4Security', 'hwConclusionGrade', 'hwDecisionSummary'];
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
    targetTopic: document.getElementById('hwTargetTopic')?.value || '',
    dim1Myth: document.getElementById('hwDim1Myth')?.value || '',
    dim2Health: document.getElementById('hwDim2Health')?.value || '',
    dim3Portfolio: document.getElementById('hwDim3Portfolio')?.value || '',
    dim4Security: document.getElementById('hwDim4Security')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'A+ (全面且具備實戰避險可行性)',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
  try {
    localStorage.setItem('w8_homework_draft', JSON.stringify(data));
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
    const saved = localStorage.getItem('w8_homework_draft');
    if (saved) {
      const data = JSON.parse(saved);
      if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
      if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
      if (document.getElementById('hwTargetTopic')) document.getElementById('hwTargetTopic').value = data.targetTopic || '';
      if (document.getElementById('hwDim1Myth')) document.getElementById('hwDim1Myth').value = data.dim1Myth || '';
      if (document.getElementById('hwDim2Health')) document.getElementById('hwDim2Health').value = data.dim2Health || '';
      if (document.getElementById('hwDim3Portfolio')) document.getElementById('hwDim3Portfolio').value = data.dim3Portfolio || '';
      if (document.getElementById('hwDim4Security')) document.getElementById('hwDim4Security').value = data.dim4Security || '';
      if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'A+ (全面且具備實戰避險可行性)';
      if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
    }
  } catch (e) {
    console.warn(e);
  }
}

window.loadHomeworkTemplate = function() {
  const t = W8_HOMEWORK_TEMPLATE;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = t.studentName;
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = t.studentId;
  if (document.getElementById('hwTargetTopic')) document.getElementById('hwTargetTopic').value = t.targetTopic;
  if (document.getElementById('hwDim1Myth')) document.getElementById('hwDim1Myth').value = t.dim1Myth;
  if (document.getElementById('hwDim2Health')) document.getElementById('hwDim2Health').value = t.dim2Health;
  if (document.getElementById('hwDim3Portfolio')) document.getElementById('hwDim3Portfolio').value = t.dim3Portfolio;
  if (document.getElementById('hwDim4Security')) document.getElementById('hwDim4Security').value = t.dim4Security;
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = t.conclusionGrade;
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = t.decisionSummary;
  saveHomeworkToLocal();
  alert('已成功載入期中個人反思與理財規劃標準示範範本！');
};

window.exportHomeworkJson = function() {
  saveHomeworkToLocal();
  const saved = localStorage.getItem('w8_homework_draft') || '{}';
  const data = JSON.parse(saved);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `W8_期中理財反思報告_${data.studentName || '未命名'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportHomeworkMd = function() {
  saveHomeworkToLocal();
  const name = document.getElementById('hwStudentName')?.value || '未填寫';
  const sid = document.getElementById('hwStudentId')?.value || '未填寫';
  const topic = document.getElementById('hwTargetTopic')?.value || '';
  const d1 = document.getElementById('hwDim1Myth')?.value || '';
  const d2 = document.getElementById('hwDim2Health')?.value || '';
  const d3 = document.getElementById('hwDim3Portfolio')?.value || '';
  const d4 = document.getElementById('hwDim4Security')?.value || '';
  const grade = document.getElementById('hwConclusionGrade')?.value || '';
  const summary = document.getElementById('hwDecisionSummary')?.value || '';

  const md = `# 第八週作業報告：期中學習反思與個人綜合理財規劃
- **學生姓名**：${name}
- **學生學號**：${sid}
- **規劃主題**：${topic}
- **自評等級**：${grade}
- **決策總結**：${summary}

---
### 一、前半學期最震撼的 1 個財經迷思反思與生活習慣改變 (25%)
${d1}

---
### 二、個人財務健康度 4 大指標檢測 (25%)
${d2}

---
### 三、10 萬元資產之 30/50/20 黃金配置具體規劃與回撤壓力測試 (30%)
${d3}

---
### 四、個人 2FA 資安防護、防詐 SOP 與後半學期學習承諾 (20%)
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

  const searchInput = document.getElementById('gridSearchInput');
  searchInput?.addEventListener('input', (e) => {
    const activeHour = document.querySelector('.tab-hour-filter.active')?.getAttribute('data-hour') || 'all';
    renderGridCards(activeHour, e.target.value.trim());
  });
}

function renderGridCards(filterHour = 'all', searchQuery = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;

  const isZh = APP_STATE.lang === 'zh';
  const query = searchQuery.toLowerCase();

  const filtered = W8_SLIDES_DATA.filter(s => {
    const matchHour = filterHour === 'all' || String(s.hour) === filterHour;
    const matchText = !query || s.title.toLowerCase().includes(query) || s.subtitle.toLowerCase().includes(query);
    return matchHour && matchText;
  });

  container.innerHTML = filtered.map(s => `
    <div class="overview-card-item hour-${s.hour}" onclick="jumpToSlide(${s.id - 1})">
      <div class="overview-card-meta">
        <span class="badge-slide-num">#${String(s.id).padStart(2, '0')}</span>
        <span class="badge-hour">${isZh ? `第 ${s.hour} 小時` : `Hour ${s.hour}`}</span>
      </div>
      <h4 class="overview-card-title">${isZh ? s.title : s.titleEn}</h4>
      <p class="overview-card-desc">${isZh ? s.subtitle : s.subtitleEn}</p>
      <div class="overview-card-footer">
        <span>${isZh ? s.category : s.categoryEn}</span>
        <span style="color:var(--w8-primary); font-weight:700;">點擊進入 ➔</span>
      </div>
    </div>
  `).join('');
}

// ---------------------- CANVAS DRAWING ----------------------
let canvasCtx = null;
let isPainting = false;

function initCanvasDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  const btnToggle = document.getElementById('btnToggleDrawing');
  const toolbar = document.getElementById('drawingToolbar');

  if (!canvas) return;
  canvasCtx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  btnToggle?.addEventListener('click', () => {
    APP_STATE.isDrawingActive = !APP_STATE.isDrawingActive;
    canvas.classList.toggle('active', APP_STATE.isDrawingActive);
    toolbar?.classList.toggle('hidden', !APP_STATE.isDrawingActive);
    btnToggle.classList.toggle('active', APP_STATE.isDrawingActive);
  });

  document.querySelectorAll('.btn-draw-tool').forEach(b => {
    b.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-draw-tool').forEach(btn => btn.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      APP_STATE.drawingTool = target.getAttribute('data-tool');
    });
  });

  document.querySelectorAll('.color-swatch').forEach(s => {
    s.addEventListener('click', (e) => {
      document.querySelectorAll('.color-swatch').forEach(sw => sw.classList.remove('active'));
      e.target.classList.add('active');
      APP_STATE.drawingColor = e.target.getAttribute('data-color');
    });
  });

  document.getElementById('btnClearDrawing')?.addEventListener('click', () => clearDrawingCanvas(true));
  document.getElementById('btnClearCanvas')?.addEventListener('click', () => clearDrawingCanvas(true));

  document.getElementById('btnSaveDrawing')?.addEventListener('click', () => {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `W8_課堂標註_Slide_${APP_STATE.currentSlideIndex + 1}.png`;
    a.href = canvas.toDataURL();
    a.click();
  });

  canvas.addEventListener('mousedown', startPaint);
  canvas.addEventListener('mousemove', drawPaint);
  canvas.addEventListener('mouseup', stopPaint);
  canvas.addEventListener('mouseleave', stopPaint);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startPaint({ clientX: touch.clientX, clientY: touch.clientY });
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    drawPaint({ clientX: touch.clientX, clientY: touch.clientY });
  });
  canvas.addEventListener('touchend', stopPaint);
}

function resizeCanvas() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startPaint(e) {
  if (!APP_STATE.isDrawingActive) return;
  isPainting = true;
  canvasCtx.beginPath();
  canvasCtx.moveTo(e.clientX, e.clientY);
}

function drawPaint(e) {
  if (!isPainting || !APP_STATE.isDrawingActive) return;
  if (APP_STATE.drawingTool === 'eraser') {
    canvasCtx.strokeStyle = '#ffffff';
    canvasCtx.lineWidth = 20;
    canvasCtx.globalAlpha = 1.0;
  } else if (APP_STATE.drawingTool === 'highlighter') {
    canvasCtx.strokeStyle = APP_STATE.drawingColor;
    canvasCtx.lineWidth = 14;
    canvasCtx.globalAlpha = 0.35;
  } else {
    canvasCtx.strokeStyle = APP_STATE.drawingColor;
    canvasCtx.lineWidth = 3;
    canvasCtx.globalAlpha = 1.0;
  }
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';
  canvasCtx.lineTo(e.clientX, e.clientY);
  canvasCtx.stroke();
}

function stopPaint() {
  isPainting = false;
  if (canvasCtx) canvasCtx.beginPath();
}

function clearDrawingCanvas(animate = true) {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas || !canvasCtx) return;
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------------------- KEYBOARD SHORTCUTS ----------------------
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

// ---------------------- MODAL UTILITIES ----------------------
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
