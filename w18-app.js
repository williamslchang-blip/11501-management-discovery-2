/**
 * 115學年度「管理探索二」第十八週互動教學主程式
 * 單元名稱：學期總結、財經探索藍圖與大一新鮮人終身宣言
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

  // 1小時活動 (百萬第一桶金試算器)
  millionPreset: 'standard_4y',

  // 2小時活動 (18週能力雷達診斷)
  radarPreset: 'balanced_all',

  // 3小時遊戲 (18週全景總大挑戰)
  gameCurrentIndex: 0,
  gameScore: 0,

  // 3小時作業 (個人大學 4 年財經探索藍圖與結業感言)
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
  initMillionBlueprintLab();
  initSemesterRadarLab();
  initGrandFinaleGame();
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
  W18_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W18_SLIDES_DATA[APP_STATE.currentSlideIndex];
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
    takeawaysList.innerHTML = list.map(t => `<li><span class="dot" style="color:var(--w18-primary, #b45309);">✦</span><span>${t}</span></li>`).join('');
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
  if (progressFill) progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W18_SLIDES_DATA.length) * 100}%`;

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W18_SLIDES_DATA.length}`;

  const quickSelect = document.getElementById('quickSlideSelect');
  if (quickSelect) quickSelect.value = String(APP_STATE.currentSlideIndex);

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  if (btnPrev) btnPrev.disabled = APP_STATE.currentSlideIndex === 0;
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W18_SLIDES_DATA.length - 1;

  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W18_SLIDES_DATA.length) {
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
  if (APP_STATE.currentSlideIndex < W18_SLIDES_DATA.length - 1) {
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
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🌟 第十八週核心導論：學期總結與終身宣言</span>
            <span class="finale-visual-tag">榮譽畢業</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>1. 18 週財經探索壯遊</h6>
              <p>從收支記帳、指數投資、房貸決策到台積電、AI、ESG、Web3 與商業發表。</p>
            </div>
            <div class="finale-box emerald">
              <h6>2. 大學四年財經藍圖</h6>
              <p>大一打底 ➔ 大二實務 ➔ 大三實習 ➔ 大四財務獨立，步步為營築夢踏實！</p>
            </div>
            <div class="finale-box ruby">
              <h6>3. 終身財經宣言誓言</h6>
              <p>以理性思辨與鋼鐵自律為誓，掌舵一生財富自主，成為正直卓越之現代公民！</p>
            </div>
          </div>
          <div class="finale-box gold" style="margin-top:10px;">
            <h6>🏆 結業榮耀致意</h6>
            <p><strong>十八週的堅持，鑄就一生的底氣：</strong>這不是學習的終點，而是你無畏風浪、奔赴璀璨未來的神聖起點！</p>
          </div>
        </div>
      `;
      break;

    case 2:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🗺️ 第十八週 3 小時學習地圖與結業大典</span>
            <span class="finale-visual-tag">結業典禮</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box" style="border-top:3px solid #b45309;">
              <h6>第一小時：大回顧與四年藍圖</h6>
              <p>18 週里程碑 ‧ 核心靈魂 ‧ 四年進階藍圖 ‧ 100 萬複利算術 ‧ 期末專案頒獎</p>
              <div style="margin-top:6px;"><span class="finale-badge badge-gold">Slide 01-10</span></div>
            </div>
            <div class="finale-box" style="border-top:3px solid #059669;">
              <h6>第二小時：公式整合與終身宣言</h6>
              <p>公式矩陣總整 ‧ 產業與資安防線 ‧ 宣讀並簽署終身宣言 ‧ 結業證書頒發</p>
              <div style="margin-top:6px;"><span class="finale-badge badge-emerald">Slide 11-20</span></div>
            </div>
            <div class="finale-box" style="border-top:3px solid #991b1b;">
              <h6>第三小時：終身學習與圓滿落幕</h6>
              <p>終身閱讀資源 ‧ 勝出 4 大心態 ‧ 導師陪伴通道 ‧ 30 年複利 SOP ‧ 珍重再見</p>
              <div style="margin-top:6px;"><span class="finale-badge badge-ruby">Slide 21-30</span></div>
            </div>
          </div>
          <div class="finale-box emerald" style="margin-top:10px;">
            <p>🎯 <strong>專屬互動活動：</strong>百萬第一桶金試算器 ➔ 18 週全景能力五角雷達診斷 ➔ 財經通識總大挑戰與終身宣言報告！</p>
          </div>
        </div>
      `;
      break;

    case 3:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📜 18 週課程大回顧：三大篇章財經壯遊</span>
            <span class="finale-visual-tag">全景脈絡</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>篇章一：個人財務與資產基石</h6>
              <p><strong>W01 - W06</strong></p>
              <p>資產負債表 ‧ 50/30/20 法則 ‧ 複利 72 法則 ‧ 0050/VT 指數投資 ‧ 退休 4% 規則</p>
            </div>
            <div class="finale-box highlight">
              <h6>篇章二：房產決策與產業護城河</h6>
              <p><strong>W07 - W12</strong></p>
              <p>租買房 30 年決策 ‧ 房貸負擔率 35% ‧ 護國神山台積電 2nm ‧ 科技供應鏈外溢</p>
            </div>
            <div class="finale-box emerald">
              <h6>篇章三：前沿科技與專案實戰</h6>
              <p><strong>W13 - W18</strong></p>
              <p>生成式 AI 企業 ROI ‧ ESG 碳費定價 ‧ Web3 冷錢包 ‧ 期末商業 Pitch ‧ 終身宣言</p>
            </div>
          </div>
          <div class="finale-box safe" style="margin-top:10px;">
            <p>🏆 <strong>完整閉環：</strong>從微觀個人存錢，到宏觀產業與科技浪潮，再到商業發表實戰，建構了牢不可破的商管核心實力！</p>
          </div>
        </div>
      `;
      break;

    case 4:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">💡 財經與管理的核心靈魂：奪回生命自主選擇權</span>
            <span class="finale-visual-tag">核心哲學</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box ruby">
              <h6>金錢的真正價值，不是炫耀與揮霍</h6>
              <p>追求帳面財富只會陷入無止盡的物質焦慮。金錢的真實價值，在於提供你對不合理體制說「不」的自由，保障家人免於突發疾病與經濟困境的苦難。</p>
            </div>
            <div class="finale-box emerald">
              <h6>管理的核心靈魂，是自律與行使主權</h6>
              <p>管理自己的現金流，就是管理自己的人生走向。懂得延遲享樂、堅守長期複利的人，才能在隨波逐流的時代中，成為真正掌握命運的主人！</p>
            </div>
          </div>
          <div class="finale-box gold" style="margin-top:10px;">
            <h6>🌟 人生終極定調</h6>
            <p>財經知識是你的盾牌，商業眼光是你的利劍。帶著這份底氣，去愛你所愛，去探索你渴望的遠方！</p>
          </div>
        </div>
      `;
      break;

    case 5:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🎓 構建大學四年財經探索藍圖：四年進階指南</span>
            <span class="finale-visual-tag">行動路徑</span>
          </div>
          <div class="finale-grid-4">
            <div class="finale-box gold">
              <h6>大一：打底期</h6>
              <p>記帳自律 ‧ 存滿 6 個月緊急預備金 ‧ 開啟 0050 月扣 3,000 元。</p>
            </div>
            <div class="finale-box highlight">
              <h6>大二：實務期</h6>
              <p>跨系商賽組隊 ‧ 考取金融基礎證照 ‧ 深入拆解企業財報與產業鏈。</p>
            </div>
            <div class="finale-box emerald">
              <h6>大三：實習期</h6>
              <p>外商與科技企業實習 ‧ 建立職場導師人脈 ‧ 磨練高價值商業技能。</p>
            </div>
            <div class="finale-box ruby">
              <h6>大四：獨立期</h6>
              <p>畢業存滿 30-50 萬 ‧ 銜接就業或研究所 ‧ 邁向人生第一桶金！</p>
            </div>
          </div>
          <div class="finale-box emerald" style="margin-top:10px;">
            <p>🎯 <strong>四年階梯：</strong>每一階段都有清晰的量化指標，拒絕渾渾噩噩度日，讓大學四年成為你人生財富爆發的黃金跳板！</p>
          </div>
        </div>
      `;
      break;

    case 6:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🧮 人生第一桶金 (100 萬) 時間複利算術：從 20 歲月存 $5,000</span>
            <span class="finale-visual-tag">複利奇蹟</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box gold">
              <h6>模擬設定：年化 8% 成長 (0050 大盤平均)</h6>
              <p><strong>每月定額：</strong>5,000 元（大一打工兼職容易達成）</p>
              <p><strong>起步年齡：</strong>20 歲開始</p>
              <p><strong>本金累積：</strong>10 年自提本金 60 萬元</p>
            </div>
            <div class="finale-box emerald">
              <h6>30 歲期滿成果：高達 92.4 萬元！</h6>
              <p>時間複利收益高達 <strong>32.4 萬元</strong>（報酬率高達 54%）！</p>
              <p>只要出社會後隨薪資增幅將月存微調至 8,000 元，<strong>28 歲即可提前破百萬！</strong></p>
            </div>
          </div>
          <div class="finale-box ruby" style="margin-top:10px;">
            <h6>⏰ 時間的殘酷差距</h6>
            <p>若推遲到 30 歲才開始存錢，要達到同樣成果，每月必須存入 12,000 元（多付 2.4 倍心力）！<strong>提早起步就是最大的財富外掛！</strong></p>
          </div>
        </div>
      `;
      break;

    case 7:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🧠 理財與行為心理學：克服 FOMO 追高殺跌與抗脆弱</span>
            <span class="finale-visual-tag">心態修煉</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box ruby">
              <h6>常見散戶三大心理陷阱</h6>
              <p><strong>1. FOMO (錯失恐懼症)：</strong>看到別人狂賺暴富便失去理智，追高接盤在山頂。</p>
              <p><strong>2. 損失厭惡 (Loss Aversion)：</strong>熊市暴跌 30% 便驚慌失措割肉在阿呆谷。</p>
              <p><strong>3. 過度自信 (Overconfidence)：</strong>誤把大牛市運氣當成個人投資神技，開高槓桿穿倉。</p>
            </div>
            <div class="finale-box emerald">
              <h6>卓越投資人「抗脆弱心態」</h6>
              <p><strong>1. 視暴跌為打折禮物：</strong>熊市是大盤優質資產的週年慶跳樓大拍賣，開心扣款。</p>
              <p><strong>2. 關閉看盤軟體：</strong>把時間投注在學業、健康與人際陪伴，享受生活。</p>
              <p><strong>3. 堅守鈍感力：</strong>對短期雜訊免疫，對長期複利充滿不可動搖的信念！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 8:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📊 實證數據：全班 18 週學習成效統計與前後知識對比</span>
            <span class="finale-visual-tag">量化蛻變</span>
          </div>
          <div class="finale-grid-4">
            <div class="finale-box gold">
              <h6>財務報表識讀</h6>
              <h5 style="font-size:1.2rem; color:#b45309; margin:4px 0;">12% ➔ 94%</h5>
              <p>由看不懂資產負債表，到精確拆解折舊與現金流。</p>
            </div>
            <div class="finale-box emerald">
              <h6>指數化投資觀念</h6>
              <h5 style="font-size:1.2rem; color:#059669; margin:4px 0;">18% ➔ 96%</h5>
              <p>徹底捨棄盲目聽明牌，確立 0050 長期定期定額信仰。</p>
            </div>
            <div class="finale-box highlight">
              <h6>科技產業護城河</h6>
              <h5 style="font-size:1.2rem; color:#2563eb; margin:4px 0;">25% ➔ 92%</h5>
              <p>掌握台積電 2nm、AI 企業 ROI 與 ESG 碳費體系。</p>
            </div>
            <div class="finale-box ruby">
              <h6>防詐資安免疫力</h6>
              <h5 style="font-size:1.2rem; color:#dc2626; margin:4px 0;">30% ➔ 100%</h5>
              <p>全班 100% 通過 165、Telegram 與冷錢包私鑰考核！</p>
            </div>
          </div>
          <div class="finale-box emerald" style="margin-top:10px;">
            <p>🌟 <strong>客觀成就：</strong>這不僅是成績單上的高分，更是每位同學未來人生中最強大、不可奪走的競爭力！</p>
          </div>
        </div>
      `;
      break;

    case 9:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🏆 頒發期末專案卓越獎項：榮耀加冕時刻</span>
            <span class="finale-visual-tag">表彰榮耀</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h5 style="font-size:1.1rem; color:#b45309; margin:0 0 6px 0;">🥇 最佳財務模型獎</h5>
              <h6>第一組：第一桶金專案</h6>
              <p>現金流預測嚴謹自洽，敏感度測試無懈可擊，充分展現商管建模之美！</p>
            </div>
            <div class="finale-box highlight">
              <h5 style="font-size:1.1rem; color:#2563eb; margin:0 0 6px 0;">🥈 最佳商業創新視覺獎</h5>
              <h6>第四組：AI 企業 ROI 部署</h6>
              <p>340% ROI 數據視覺化驚豔全場，Headline 抓人眼球，展現卓越說服力！</p>
            </div>
            <div class="finale-box ruby">
              <h5 style="font-size:1.1rem; color:#dc2626; margin:0 0 6px 0;">🥉 抗脆弱風控大獎</h5>
              <h6>第六組：Web3 5% 避險配置</h6>
              <p>非對稱配置兼顧爆發與安全，冷錢包資安防護嚴密，體現頂級風控自律！</p>
            </div>
          </div>
          <div class="finale-box emerald" style="margin-top:10px;">
            <p>👏 <strong>熱烈鼓掌：</strong>向所有六個小組致敬！全體組員在第十七週的傑出表現，共同樹立了台大商管探索的最高典範！</p>
          </div>
        </div>
      `;
      break;

    case 10:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🎯 第一小時小結與專屬活動導引</span>
            <span class="finale-visual-tag">階段檢核</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box emerald">
              <h6>1. 18 週全景壯遊</h6>
              <p>回顧個人財務、產業護城河與前沿科技實戰三大篇章的豐碩成果。</p>
            </div>
            <div class="finale-box gold">
              <h6>2. 大學四年藍圖</h6>
              <p>確立大一打底、大二實務、大三實習到大四獨立之清晰四步路徑。</p>
            </div>
            <div class="finale-box ruby">
              <h6>3. 第一桶金算術</h6>
              <p>深植月存 5,000 元、8% 複利在 30 歲破百萬的不可逆時間威力。</p>
            </div>
          </div>
          <div class="finale-box gold" style="margin-top:12px;">
            <h6>🚀 點擊下方專屬活動：大學 4 年財經藍圖與百萬第一桶金試算器</h6>
            <p>親自輸入兼職儲蓄與預期年化報酬，精算大學畢業資產與 30 年累積千萬的複利神采！</p>
          </div>
        </div>
      `;
      break;

    case 11:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📐 18 週核心理財公式總整合：四大不朽黃金金律</span>
            <span class="finale-visual-tag">公式矩陣</span>
          </div>
          <div class="finale-grid-4">
            <div class="finale-box gold">
              <h6>1. Pay Yourself First</h6>
              <p><strong>儲蓄 = 收入 - 儲蓄</strong></p>
              <p>先提撥定額儲蓄至獨立帳戶，剩餘金額才作為生活開銷。</p>
            </div>
            <div class="finale-box highlight">
              <h6>2. 複利 72 法則</h6>
              <p><strong>翻倍年數 ≈ 72 ÷ R</strong></p>
              <p>8% 年化下，資產每 9 年翻一倍；18 歲 10 萬在 54 歲變成 160 萬！</p>
            </div>
            <div class="finale-box ruby">
              <h6>3. 房貸負擔率 (DSR)</h6>
              <p><strong>月供 ÷ 月收 ≤ 35%</strong></p>
              <p>嚴守居住成本安全警戒線，絕不讓房貸壓垮生活品質與投資部位。</p>
            </div>
            <div class="finale-box emerald">
              <h6>4. 4% 退休提領法則</h6>
              <p><strong>FIRE 金額 = 年支出 × 25</strong></p>
              <p>資產達到年支出 25 倍，每年提領 4% 永不耗盡本金，達成自由！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 12:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🏭 18 週核心產業管理總整合：台積電、AI 3層鏈與 ESG 3柱</span>
            <span class="finale-visual-tag">產業視野</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>1. 半導體護國神山</h6>
              <p><strong>台積電 2nm GAA + CoWoS</strong></p>
              <p>壟斷全球 90% 先進製程，龐大資本支出帶動台灣耗材設備供應鏈千億繁榮。</p>
            </div>
            <div class="finale-box highlight">
              <h6>2. 生成式 AI 三層架構</h6>
              <p><strong>算力晶片 ➔ 基礎模型 ➔ 企業應用</strong></p>
              <p>企業透過人機協作釋放高價值工時，創造 300%+ 投資報酬率與創新轉型。</p>
            </div>
            <div class="finale-box emerald">
              <h6>3. 綠色金融 ESG 三大柱</h6>
              <p><strong>E 環境 ‧ S 社會 ‧ G 治理</strong></p>
              <p>台灣碳費每噸 300 元開徵，00878 等永續 ETF 兼具減碳效益與低波動抗震溢價。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 13:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🛡️ 18 週資安與防詐防線總整合：三大終身護身符</span>
            <span class="finale-visual-tag">資安防禦</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box ruby">
              <h6>1. 165 反詐第一反應</h6>
              <p>凡宣稱「穩賺不賠、內線明牌、飆股代操、借人頭帳戶」百分之百是詐騙！遇疑慮立即撥打 165。</p>
            </div>
            <div class="finale-box gold">
              <h6>2. Deepfake 視訊核實</h6>
              <p>AI 擬真換臉視訊要求緊急借錢轉帳，務必使用線下私密暗號二次確認，絕不輕易匯款。</p>
            </div>
            <div class="finale-box emerald">
              <h6>3. 私鑰冷錢包鐵律</h6>
              <p>「Not your keys, not your coins！」12/24 助記詞純離線紙卡手抄，永不上傳雲端，絕不洩漏！</p>
            </div>
          </div>
          <div class="finale-box safe" style="margin-top:10px;">
            <p>🔑 <strong>防禦本質：</strong>守住每一分辛苦賺來的本金，比追求短期暴利重要一萬倍！保護好資產，複利才能發揮神威！</p>
          </div>
        </div>
      `;
      break;

    case 14:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📜 大一新鮮人「終身財經宣言」宣讀與簽署儀式</span>
            <span class="finale-visual-tag">莊嚴宣誓</span>
          </div>
          <div class="finale-box gold" style="padding:16px; border:2px solid #fde047;">
            <h5 style="text-align:center; color:#92400e; font-size:1.15rem; margin:0 0 10px 0;">✨ 大一新鮮人終身財經宣言 (Freshman Manifesto) ✨</h5>
            <p style="font-size:0.85rem; line-height:1.6; color:#78350f;">
              「我謹在全班同儕與師長面前莊嚴宣誓：<br>
              我誓願以<strong>理性與科學思辨</strong>看待金錢，永遠實踐<strong>先存再花</strong>之自律；<br>
              我誓願堅守<strong>指數化被動投資</strong>，讓時間與複利成為我最堅強的後盾；<br>
              我誓願<strong>恪守資安防線</strong>，守護個人私鑰，終身遠離詐騙與高倍槓桿投機；<br>
              我誓願將財富作為<strong>實踐生命自主、守護家庭幸福、並造福社會</strong>的強大工具！」
            </p>
            <div style="text-align:right; margin-top:10px; font-weight:800; color:#b45309;">
              宣誓人簽署：大一新鮮人全體 ‧ 115 學年度
            </div>
          </div>
        </div>
      `;
      break;

    case 15:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🚀 通往財務自由 (FIRE) 的五大階段里程碑</span>
            <span class="finale-visual-tag">FIRE 階梯</span>
          </div>
          <div class="finale-grid-4">
            <div class="finale-box ruby">
              <h6>第 1 階：安全盾牌</h6>
              <p>存滿 6 個月緊急預備金，免疫突發失業失學。</p>
            </div>
            <div class="finale-box gold">
              <h6>第 2 階：無債之軀</h6>
              <p>清空高息消費貸款與卡債，阻斷利息失血黑洞。</p>
            </div>
            <div class="finale-box highlight">
              <h6>第 3 階：資產引擎</h6>
              <p>定額投資 0050+VT，被動資產突破百萬桶金。</p>
            </div>
            <div class="finale-box emerald">
              <h6>第 4 階：完全自由</h6>
              <p>被動現金流覆蓋生活開銷，達成真正 FIRE 人生！</p>
            </div>
          </div>
          <div class="finale-box emerald" style="margin-top:10px;">
            <p>🌟 <strong>自由真諦：</strong>FIRE 不是退休躺平無所事事，而是擁有「只做自己真心熱愛之事」的終極奢華選擇權！</p>
          </div>
        </div>
      `;
      break;

    case 16:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🦅 告別大學小白：從盲目跟風者進化為獨立思辨財經公民</span>
            <span class="finale-visual-tag">思維躍遷</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box ruby">
              <h6>曾經的大學小白特徵</h6>
              <p>盲從網路迷因與投機幣圈、發薪日大吃大喝月底吃泡麵、對聯準會升息與碳費毫無知覺、輕信保證獲利詐騙。</p>
            </div>
            <div class="finale-box emerald">
              <h6>今日的獨立思辨財經公民</h6>
              <p>嚴守 50/30/20 儲蓄分配、看懂財報折現現金流、冷靜看待股市牛熊週期波動、以宏觀產業視角審視全球經濟大勢！</p>
            </div>
          </div>
          <div class="finale-box gold" style="margin-top:10px;">
            <h6>✨ 成長的勳章</h6>
            <p>十八週的淬煉，已將無知與恐懼從你心中剔除，換上了一雙看清資本市場本質的銳利慧眼！</p>
          </div>
        </div>
      `;
      break;

    case 17:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🤝 感謝與感動：致 18 週堅持不懈、勇於探索的自己</span>
            <span class="finale-visual-tag">真情致意</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>致身旁的同儕夥伴</h6>
              <p>感謝每一位組員在深夜討論中的腦力激盪、互相打氣與無私分享，這段革命情感將是一生摯友！</p>
            </div>
            <div class="finale-box highlight">
              <h6>致敬業的師長教官</h6>
              <p>感謝老師與教官十八週來的嚴謹設計、悉心講評與無條件陪伴，照亮我們前行的財經之路。</p>
            </div>
            <div class="finale-box emerald">
              <h6>致堅持到底的自己</h6>
              <p>感謝那個在面對枯燥算式時未曾放棄、在台上發表時勇敢突破自己的年輕靈魂，你做得太棒了！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 18:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📜 大一新鮮人終身受用的 10 大財經黃金金律總複習</span>
            <span class="finale-visual-tag">十大守則</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box gold">
              <p><strong>1. Pay Yourself First：</strong>先存再花，儲蓄率保持 20% 以上。</p>
              <p><strong>2. 6 個月預備金：</strong>生活活存防禦底線，絕不動用。</p>
              <p><strong>3. 指數化投資：</strong>0050 與全球 VT 是散戶最穩健聖杯。</p>
              <p><strong>4. 72 法則：</strong>資產翻倍只需 9 年，越早起步越輕鬆。</p>
              <p><strong>5. 房貸負擔率：</strong>月供絕不超過月收入 35%。</p>
            </div>
            <div class="finale-box emerald">
              <p><strong>6. 優質護城河：</strong>擁抱台積電等先進科技龍頭企業。</p>
              <p><strong>7. AI 生產力賦能：</strong>善用工具釋放工時，提高個人時薪。</p>
              <p><strong>8. ESG 永續思維：</strong>挑選低碳好企業，避開碳費衝擊。</p>
              <p><strong>9. 5% 衛星配置：</strong>以極小比例參與 Web3，私鑰離線手抄。</p>
              <p><strong>10. 165 反詐免疫：</strong>保證暴利必是騙局，守護身家底線。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 19:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🎓 學習歷程數位憑證頒發：「管理探索二」結業證書</span>
            <span class="finale-visual-tag">結業證書</span>
          </div>
          <div class="finale-box gold" style="padding:16px; border:2px solid #ca8a04; text-align:center;">
            <div style="font-size:2.4rem; margin-bottom:4px;">📜</div>
            <h4 style="color:#92400e; margin:0 0 6px 0; font-size:1.2rem;">國立臺灣大學 115學年度 課程結業榮譽證書</h4>
            <p style="font-size:0.92rem; color:#78350f; margin:0 0 8px 0;">
              茲證明 大一全體同學 圓滿修畢「管理探索二」十八週全景財經通識課程，<br>
              具備個人財務、產業分析、AI應用、永續金融與商業簡報之卓越素養，特頒此證！
            </p>
            <div style="display:flex; justify-content:space-around; font-size:0.8rem; color:#b45309; margin-top:10px; border-top:1px dashed #fde047; padding-top:8px;">
              <span>授課教師：管理探索二教學團隊</span>
              <span>認證序號：NTU-MGT-115-FINALE</span>
              <span>頒發日期：2026 年 6 月</span>
            </div>
          </div>
        </div>
      `;
      break;

    case 20:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🎯 第二小時小結與專屬活動導引</span>
            <span class="finale-visual-tag">階段檢核</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box emerald">
              <h6>1. 核心公式矩陣整合</h6>
              <p>掌握先存再花、72 法則、35% 房貸率與 4% FIRE 規則之完整真理。</p>
            </div>
            <div class="finale-box gold">
              <h6>2. 終身宣言莊嚴宣誓</h6>
              <p>簽署守護自律、長期複利、拒絕詐騙與造福社會之四項神聖承諾。</p>
            </div>
            <div class="finale-box ruby">
              <h6>3. 結業數位證書獲頒</h6>
              <p>榮獲台大商管探索結業榮譽，永久載入個人終身學習歷程檔案！</p>
            </div>
          </div>
          <div class="finale-box emerald" style="margin-top:12px;">
            <h6>🚀 點擊下方專屬活動：18 週全景知識能力診斷與結業榮譽試算器</h6>
            <p>親自評核個人五大核心能力，生成專屬五角雷達圖與榮譽等第評語！</p>
          </div>
        </div>
      `;
      break;

    case 21:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📚 畢業後的終身學習指引：優質財經書籍與國際權威數據源</span>
            <span class="finale-visual-tag">終身學習</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>三本必讀經典書單</h6>
              <p><strong>1.《漫步華爾街》</strong>（墨基爾）——指數化聖經。<br><strong>2.《致富心態》</strong>（豪瑟）——行為財務心理學。<br><strong>3.《窮查理的普通常識》</strong>——蒙格多元思維模型。</p>
            </div>
            <div class="finale-box highlight">
              <h6>國際頂尖財經媒體</h6>
              <p><strong>1. Financial Times (FT)：</strong>全球宏觀深度政經剖析。<br><strong>2. Wall Street Journal (WSJ)：</strong>華爾街資本市場權威動態。<br><strong>3. Bloomberg：</strong>即時金融市場情報。</p>
            </div>
            <div class="finale-box emerald">
              <h6>權威客觀數據門戶</h6>
              <p><strong>1. FRED (聖路易央行)：</strong>全球總經指標庫。<br><strong>2. 台灣證交所 / 金管會：</strong>上市櫃企業財報揭露。<br><strong>3. Aswath Damodaran：</strong>NYU 估值教授資料庫。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 22:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🌟 大一新鮮人終身勝出四大心態：好奇、紀律、誠信與利他</span>
            <span class="finale-visual-tag">品格基石</span>
          </div>
          <div class="finale-grid-4">
            <div class="finale-box highlight">
              <h6>1. 永恆好奇心</h6>
              <p>對新科技（AI, Web3, 綠能）永遠保持孩童般的探索渴望，不故步自封。</p>
            </div>
            <div class="finale-box emerald">
              <h6>2. 鋼鐵般紀律</h6>
              <p>任憑市場風吹浪打，風雨無阻執行每月定額儲蓄，做到「知行合一」。</p>
            </div>
            <div class="finale-box gold">
              <h6>3. 堅定不移誠信</h6>
              <p>以最高道德標準要求自己，絕不涉足內線交易、詐欺洗錢與走捷徑。</p>
            </div>
            <div class="finale-box ruby">
              <h6>4. 利他共好精神</h6>
              <p>把賺取的財富化為溫暖世界的光芒，回饋社會、提攜後進，實現生命崇高價值！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 23:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🤝 校友回饋與導師陪伴：大學四年諮詢通道永不打烊</span>
            <span class="finale-visual-tag">師生情誼</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>1. 專屬諮詢通道</h6>
              <p>未來在選修高階課程、考取證照或海外交換時遇到財務困惑，隨時可聯繫授課團隊。</p>
            </div>
            <div class="finale-box highlight">
              <h6>2. 實習與求職推薦</h6>
              <p>表現優異之期末專案，授課團隊將優先推薦至外商投行、四大會計師事務所與科技龍頭實習。</p>
            </div>
            <div class="finale-box emerald">
              <h6>3. 校友傳承網絡</h6>
              <p>大三、大四時回到這個講堂，以學長姐身分向新一屆大一新鮮人分享你的財經探索傳奇！</p>
            </div>
          </div>
          <div class="finale-box safe" style="margin-top:10px;">
            <p>🏡 <strong>溫暖燈塔：</strong>這間教室永遠是你的家。無論未來飞得多高、走得多遠，這裡始終有支持你、相信你的師長在為你喝采！</p>
          </div>
        </div>
      `;
      break;

    case 24:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📋 課程滿意度調查與教案共創：感謝大家的回饋</span>
            <span class="finale-visual-tag">教案迭代</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box emerald">
              <h6>互動試算工具回饋</h6>
              <p>18 週各類計算器（房貸、AI ROI、碳費、冷錢包、第一桶金）的直覺度與實用性評鑑。</p>
            </div>
            <div class="finale-box gold">
              <h6>專案發表與評量回饋</h6>
              <p>期末商業 Pitch 競賽與同儕雙重加權評審制度之公正度與收穫度意見。</p>
            </div>
            <div class="finale-box highlight">
              <h6>新學期教案共創建議</h6>
              <p>歡迎提出希望新增的前沿科技或商管主題，讓我們攜手打造全台灣最卓越的財經通識課程！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 25:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📄 實證數據調取：下載個人 18 週學習成績單與數位報告</span>
            <span class="finale-visual-tag">歷程報告</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box gold">
              <h6>個人完整學習歷程報告內容</h6>
              <p><strong>1. 全學期出席率與課堂參與：</strong>100% 完美全勤記錄。<br><strong>2. 互動實驗室通關率：</strong>18 週所有專屬活動全數達標。<br><strong>3. 課堂實務作業：</strong>四維度實務報告完整建檔典藏。<br><strong>4. 期末專案成果：</strong>專家評審與同儕雙重加權總成績評等。</p>
            </div>
            <div class="finale-box emerald">
              <h6>官方防偽與認證效力</h6>
              <p><strong>防偽驗證碼：</strong>每份報告內嵌專屬數位 SHA-256 哈希防偽碼。<br><strong>申請必備：</strong>可用於申請大二榮譽學程、雙主修商管、國內外研究所與外商求職之旗艦證明！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 26:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">📜 大一新鮮人終身財經宣言四大誓言</span>
            <span class="finale-visual-tag">四大誓言</span>
          </div>
          <div class="finale-grid-4">
            <div class="finale-box gold">
              <h6>誓言一：自律儲蓄</h6>
              <p>先存再花，拒絕過度借貸，永遠保留 6 個月緊急預備金之自律底線！</p>
            </div>
            <div class="finale-box emerald">
              <h6>誓言二：長期複利</h6>
              <p>堅守指數化大盤定期定額，遠離盲目短線當沖與合約投機，擁抱時間！</p>
            </div>
            <div class="finale-box ruby">
              <h6>誓言三：資安防身</h6>
              <p>私鑰離線手抄，165 反詐查證，只在合法合規機構出入金，杜絕被騙！</p>
            </div>
            <div class="finale-box highlight">
              <h6>誓言四：財富利他</h6>
              <p>將財富作為實踐自我理想、守護摯愛與造福社會的工具，正直立世！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 27:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🧮 終身實踐試算實例：30 年資產複利累積與財富自由 SOP</span>
            <span class="finale-visual-tag">一生模擬</span>
          </div>
          <div class="finale-grid-2">
            <div class="finale-box gold">
              <h6>人生真實模擬路徑 (22 歲至 52 歲)</h6>
              <p><strong>22 歲大學畢業就業：</strong>每月定額 12,000 元投入 0050+VT (年化 8%)</p>
              <p><strong>35 歲 (13 年後)：</strong>累積總資產突破 <strong>362 萬元</strong>！</p>
              <p><strong>45 歲 (23 年後)：</strong>累積總資產正式突破 <strong>1,048 萬元</strong>！</p>
            </div>
            <div class="finale-box emerald">
              <h6>52 歲 (30 年期滿)：高達 2,050 萬元！</h6>
              <p>自提本金僅 432 萬元，<strong>複利增值高達 1,618 萬元</strong>！</p>
              <p>依據 4% 提領法則，每年產生 <strong>82 萬元</strong> 被動現金流（月入 6.8 萬），達成完全財務自由！</p>
            </div>
          </div>
          <div class="finale-box highlight" style="margin-top:8px;">
            <p>💡 <strong>這不是奇蹟，這是數學：</strong>只要你從今天開始恪守 18 週所學，這就是你 30 年後必定抵達的富足彼岸！</p>
          </div>
        </div>
      `;
      break;

    case 28:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">⛵ 揚帆起航：帶著探索勇氣，開創屬於你的富足精彩人生！</span>
            <span class="finale-visual-tag">啟航出發</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box gold">
              <h6>眼中有光</h6>
              <p>對未來的每一場科技變革充滿熱情，看清底層商業邏輯，不畏懼任何挑戰。</p>
            </div>
            <div class="finale-box emerald">
              <h6>心中有愛</h6>
              <p>用你的財經智慧去守護父母、家人與夥伴，成為身邊所有人最值得信賴的依靠。</p>
            </div>
            <div class="finale-box ruby">
              <h6>腳下有路</h6>
              <p>步步為營，將 18 週所學化為每日自律習慣。每一步都踩在堅實的複利土地上！</p>
            </div>
          </div>
          <div class="finale-box safe" style="margin-top:10px;">
            <p>🌅 <strong>浩瀚啟程：</strong>少年負壯氣，奮烈自有時！帶著台大「管理探索二」的祝福，勇敢去開創專屬於你的璀璨黃金時代！</p>
          </div>
        </div>
      `;
      break;

    case 29:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🗺️ 第十八週全景知識體系圖與全學期 18 週總閉環</span>
            <span class="finale-visual-tag">全景大閉環</span>
          </div>
          <div class="finale-grid-3">
            <div class="finale-box" style="border-left:4px solid #b45309;">
              <h6>第一篇：個人基石</h6>
              <p>資產負債表 ‧ 50/30/20 ‧ 預備金 ‧ 0050/VT 指數 ‧ 72 法則 ‧ 4% 退休法則</p>
            </div>
            <div class="finale-box" style="border-left:4px solid #059669;">
              <h6>第二篇：產業決策</h6>
              <p>租買房 30 年 DSR 35% ‧ 台積電 2nm 護城河 ‧ 科技供應鏈 ‧ AI 企業導入 ROI</p>
            </div>
            <div class="finale-box" style="border-left:4px solid #991b1b;">
              <h6>第三篇：前沿實戰</h6>
              <p>ESG 碳費 300 元 ‧ Web3 冷錢包 5% 避險 ‧ 10/20/30 Pitch ‧ 終身財經宣言</p>
            </div>
          </div>
          <div class="finale-box gold" style="margin-top:10px;">
            <p>👑 <strong>皇冠加冕：</strong>十八顆璀璨珍珠完滿串聯，全體大一新鮮人正式出師，榮獲財經探索最高榮譽！</p>
          </div>
        </div>
      `;
      break;

    case 30:
      container.innerHTML = `
        <div class="finale-visual-card">
          <div class="finale-visual-header">
            <span class="finale-visual-title">🎉 課程圓滿落幕：珍重再見，開啟璀璨人生新篇章！</span>
            <span class="finale-visual-tag">大圓滿</span>
          </div>
          <div class="finale-box gold" style="padding:18px; text-align:center; border:2px solid #ca8a04;">
            <div style="font-size:3rem; margin-bottom:6px;">🎓💐🥂</div>
            <h3 style="color:#92400e; margin:0 0 8px 0; font-size:1.3rem;">熱烈祝賀 115 學年度「管理探索二」圓滿結業！</h3>
            <p style="font-size:0.95rem; color:#78350f; max-width:620px; margin:0 auto 12px auto; line-height:1.6;">
              感謝每一位同學 18 週的熱情投入與專注學習！<br>
              願大家帶著自律的品格、清晰的頭腦與溫暖的心靈，昂首闊步走向世界！<br>
              <strong>鵬程萬里，前程似錦，結業快樂！珍重再見！</strong>
            </p>
            <div style="font-size:0.85rem; font-weight:800; color:#b45309;">
              國立臺灣大學 ‧ 管理探索二教學團隊 全體致謝
            </div>
          </div>
        </div>
      `;
      break;

    default:
      container.innerHTML = `<div class="finale-visual-card"><div class="finale-visual-header"><span class="finale-visual-title">Slide ${id}: ${slide.title}</span></div><p>${slide.subtitle}</p></div>`;
      break;
  }
}

// ---------------------- 1 HOUR ACTIVITY: MILLION BLUEPRINT LAB ----------------------
function initMillionBlueprintLab() {
  const lab = W18_ACTIVITIES_DATA.hour1Lab;
  if (!lab) return;

  const startAgeInput = document.getElementById('bpStartAge');
  const collegeSaveInput = document.getElementById('bpCollegeMonthlySave');
  const returnRateInput = document.getElementById('bpReturnRate');
  const workSaveInput = document.getElementById('bpWorkMonthlySave');
  const longYearsInput = document.getElementById('bpLongYears');

  function calculateBlueprint() {
    const startAge = parseInt(startAgeInput?.value || '18', 10);
    const colSave = parseFloat(collegeSaveInput?.value || '5000');
    const rRate = parseFloat(returnRateInput?.value || '8.0') / 100;
    const workSave = parseFloat(workSaveInput?.value || '10000');
    const longYears = parseInt(longYearsInput?.value || '30', 10);

    const monthlyRate = rRate / 12;

    // College 4 years (48 months)
    let collegeMonths = 48;
    let collegeTotal = 0;
    for (let m = 0; m < collegeMonths; m++) {
      collegeTotal = (collegeTotal + colSave) * (1 + monthlyRate);
    }
    const collegePrincipal = colSave * collegeMonths;

    // Work phase to reach 1 million
    let monthsToMillion = collegeMonths;
    let currentWealth = collegeTotal;
    while (currentWealth < 1000000 && monthsToMillion < 600) {
      currentWealth = (currentWealth + workSave) * (1 + monthlyRate);
      monthsToMillion++;
    }
    const ageAtMillion = (startAge + (monthsToMillion / 12)).toFixed(1);

    // 30 years long term total
    let totalLongMonths = longYears * 12;
    let longWealth = 0;
    let totalPrincipal = 0;
    for (let m = 0; m < totalLongMonths; m++) {
      let monthlyContribution = m < 48 ? colSave : workSave;
      totalPrincipal += monthlyContribution;
      longWealth = (longWealth + monthlyContribution) * (1 + monthlyRate);
    }

    // Outputs
    const outGradWealth = document.getElementById('outGradWealth');
    const outGradPrincipal = document.getElementById('outGradPrincipal');
    const outAgeAtMillion = document.getElementById('outAgeAtMillion');
    const out30YrWealth = document.getElementById('out30YrWealth');
    const outBlueprintAdvice = document.getElementById('outBlueprintAdvice');

    if (outGradWealth) outGradWealth.textContent = `NT$ ${Math.round(collegeTotal).toLocaleString()} 元`;
    if (outGradPrincipal) outGradPrincipal.textContent = `NT$ ${Math.round(collegePrincipal).toLocaleString()} 元`;
    if (outAgeAtMillion) outAgeAtMillion.textContent = `${ageAtMillion} 歲達成！`;
    if (out30YrWealth) out30YrWealth.textContent = `NT$ ${(longWealth / 10000).toFixed(1)} 萬元`;

    if (outBlueprintAdvice) {
      outBlueprintAdvice.innerHTML = `
        <strong>🏆 百萬藍圖診斷：</strong>依據你規劃的大學兼職儲蓄（月存 ${colSave} 元）與畢業出社會月存 ${workSave} 元，
        你在 <strong>${ageAtMillion} 歲</strong> 即可順利斬獲人生「第一桶金 100 萬」！
        而在 ${longYears} 年長期滾存下，複利終值將高達 <strong>${(longWealth / 10000).toFixed(1)} 萬元</strong>，
        輕鬆達成完全退休財務自由！
      `;
    }
  }

  [startAgeInput, collegeSaveInput, returnRateInput, workSaveInput, longYearsInput].forEach(el => {
    el?.addEventListener('input', calculateBlueprint);
    el?.addEventListener('change', calculateBlueprint);
  });

  // Presets
  document.querySelectorAll('.btn-preset-blueprint').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-blueprint').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pKey = e.target.getAttribute('data-preset');
      const preset = lab.presets[pKey];
      if (!preset) return;

      if (startAgeInput) startAgeInput.value = preset.startAge;
      if (collegeSaveInput) collegeSaveInput.value = preset.collegeMonthlySave;
      if (returnRateInput) returnRateInput.value = preset.annualReturnRate;
      if (workSaveInput) workSaveInput.value = preset.workMonthlySave;
      if (longYearsInput) longYearsInput.value = preset.longTermYears;

      calculateBlueprint();
    });
  });

  calculateBlueprint();
}

// ==================== HOUR 2 LAB: 18 週全景知識能力診斷與結業榮譽試算器 ====================

// ---------------------- 2 HOUR ACTIVITY: SEMESTER RADAR LAB ----------------------
function initSemesterRadarLab() {
  const lab = W18_ACTIVITIES_DATA.hour2Lab;
  if (!lab) return;

  const budgetInput = document.getElementById('dimBudget');
  const indexInput = document.getElementById('dimIndexInvest');
  const mortgageInput = document.getElementById('dimMortgage');
  const techInput = document.getElementById('dimTechFrontier');
  const pitchInput = document.getElementById('dimPitchDefense');

  function calculateRadarScore() {
    const sBudget = parseFloat(budgetInput?.value || '90');
    const sIndex = parseFloat(indexInput?.value || '90');
    const sMortgage = parseFloat(mortgageInput?.value || '90');
    const sTech = parseFloat(techInput?.value || '90');
    const sPitch = parseFloat(pitchInput?.value || '90');

    const totalAvg = (sBudget + sIndex + sMortgage + sTech + sPitch) / 5;

    let award = "特優金牌學員";
    let awardColor = "#b45309";
    if (totalAvg >= 92) { award = "🏆 特優金牌商管菁英 (Summa Cum Laude)"; awardColor = "#b45309"; }
    else if (totalAvg >= 85) { award = "🥈 卓越銀牌實戰先鋒 (Magna Cum Laude)"; awardColor = "#059669"; }
    else if (totalAvg >= 80) { award = "🥉 潛力銅牌探索新星 (Cum Laude)"; awardColor = "#0284c7"; }
    else { award = "🎗️ 順利結業合格學員"; awardColor = "#64748b"; }

    // Outputs
    const outTotalScore = document.getElementById('outRadarTotalScore');
    const outAwardTitle = document.getElementById('outRadarAwardTitle');
    const outRadarDiagnosis = document.getElementById('outRadarDiagnosis');

    if (outTotalScore) outTotalScore.textContent = `${totalAvg.toFixed(1)} 分 / 100`;
    if (outAwardTitle) {
      outAwardTitle.textContent = award;
      outAwardTitle.style.color = awardColor;
    }

    if (outRadarDiagnosis) {
      outRadarDiagnosis.innerHTML = `
        <strong>🎖️ 結業五角雷達診斷評語：</strong>你在個人記帳儲蓄 (<strong>${sBudget}分</strong>)、指數投資複利 (<strong>${sIndex}分</strong>)、
        房貸決策 (<strong>${sMortgage}分</strong>)、科技產業與ESG (<strong>${sTech}分</strong>) 及簡報防詐表達 (<strong>${sPitch}分</strong>) 均展現卓越造詣。
        全景綜合評定為 <strong>${award}</strong>！這份紮實的五芒星實力，將伴隨你開啟精彩璀璨之大學人生！
      `;
    }
  }

  [budgetInput, indexInput, mortgageInput, techInput, pitchInput].forEach(el => {
    el?.addEventListener('input', calculateRadarScore);
    el?.addEventListener('change', calculateRadarScore);
  });

  // Presets
  document.querySelectorAll('.btn-preset-radar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-preset-radar').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pKey = e.target.getAttribute('data-preset');
      const preset = lab.presets[pKey];
      if (!preset) return;

      if (budgetInput) budgetInput.value = preset.dimBudget;
      if (indexInput) indexInput.value = preset.dimIndexInvest;
      if (mortgageInput) mortgageInput.value = preset.dimMortgage;
      if (techInput) techInput.value = preset.dimTechFrontier;
      if (pitchInput) pitchInput.value = preset.dimPitchDefense;

      calculateRadarScore();
    });
  });

  calculateRadarScore();
}

// ---------------------- 3 HOUR ACTIVITY: GRAND FINALE GAME ----------------------
// ==================== HOUR 3 GAME: 18 週全景財經通識總大挑戰 ====================
let currentQuestionIndex = 0;
let userScore = 0;

function initGrandFinaleGame() {
  const container = document.getElementById('finaleGameContainer');
  if (!container) return;
  renderGameQuestion();
}

function renderGameQuestion() {
  const container = document.getElementById('finaleGameContainer');
  if (!container) return;
  const questions = W18_ACTIVITIES_DATA.game;

  if (currentQuestionIndex >= questions.length) {
    const pass = userScore >= 3;
    container.innerHTML = `
      <div style="text-align:center; padding: 24px;">
        <div style="font-size: 3.2rem; margin-bottom: 8px;">${pass ? '👑' : '🎓'}</div>
        <h3 style="color:${pass ? '#b45309' : '#059669'}; font-weight:900;">${pass ? '太震撼了！全學期 18 週總大挑戰完美通關！' : '挑戰完成！恭喜完成全學期 18 週終極洗禮'}</h3>
        <p style="font-size:1.1rem; margin:12px 0;">你的總得分：<strong style="font-size:1.5rem; color:#b45309;">${userScore} / ${questions.length}</strong> 關</p>
        <p style="color:#64748b; font-size:0.92rem; max-width:540px; margin:0 auto 20px auto;">
          ${pass ? '神乎其技！你已徹底融會 18 週全部精髓：Pay Yourself First、72 法則、台積電護城河、AI ROI、ESG 永續與冷錢包防詐鐵律！' : '請務必重溫十大人定理財金律，帶著這份扎實硬核的知識底氣，昂首闊步邁向精彩的富足人生！'}
        </p>
        <button class="btn-nav-step btn-primary-step" onclick="restartGame()" style="background:#b45309;">🔄 再次挑戰</button>
      </div>
    `;
    return;
  }

  const q = questions[currentQuestionIndex];
  container.innerHTML = `
    <div style="padding: 12px 18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #fde68a; padding-bottom:8px; margin-bottom:12px;">
        <span style="font-weight:800; color:#92400e;">關卡 ${q.id} / ${questions.length}：${q.title}</span>
        <span style="font-size:0.85rem; font-weight:700; color:#64748b;">目前累積分數: ${userScore}</span>
      </div>
      <h4 style="color:#1e293b; font-size:1.05rem; margin-bottom:14px; line-height:1.5;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:10px;" id="gameOptionsContainer">
        ${q.options.map((opt, idx) => `
          <button class="game-opt-btn" onclick="submitGameAnswer(${idx})" style="
            text-align:left; padding:12px 16px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:0.9rem; cursor:pointer; transition:all 0.2s; color:#334155; line-height:1.4;
          " onmouseover="this.style.background='#fffbeb'; this.style.borderColor='#fde68a';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1';">
            <strong>${['A', 'B', 'C', 'D'][idx]}.</strong> ${opt}
          </button>
        `).join('')}
      </div>
      <div id="gameExplanationBox" style="display:none; margin-top:14px; padding:12px; border-radius:8px; font-size:0.88rem; line-height:1.5;"></div>
      <div id="gameNextBtnRow" style="display:none; margin-top:14px; text-align:right;">
        <button class="btn-nav-step btn-primary-step" onclick="nextGameQuestion()" style="background:#b45309;">下一關 ▶</button>
      </div>
    </div>
  `;
}

function submitGameAnswer(selectedIdx) {
  const q = W18_ACTIVITIES_DATA.game[currentQuestionIndex];
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
    localStorage.setItem('W18_HOMEWORK_DATA', JSON.stringify(APP_STATE.homeworkData));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
}

function loadSavedHomework() {
  const raw = localStorage.getItem('W18_HOMEWORK_DATA');
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
  const tpl = W18_ACTIVITIES_DATA.homeworkTemplate;
  if (!tpl) return;
  if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = '林宥廷';
  if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = 'B11307116';
  if (document.getElementById('hwTargetPlan')) document.getElementById('hwTargetPlan').value = tpl.title || '個人大學 4 年財經探索藍圖與大一新鮮人終身宣言';
  if (document.getElementById('hwDim1Inventory')) document.getElementById('hwDim1Inventory').value = tpl.dim1 || '';
  if (document.getElementById('hwDim2CashFlow')) document.getElementById('hwDim2CashFlow').value = tpl.dim2 || '';
  if (document.getElementById('hwDim3ReserveDebt')) document.getElementById('hwDim3ReserveDebt').value = tpl.dim3 || '';
  if (document.getElementById('hwDim4FireRoadmap')) document.getElementById('hwDim4FireRoadmap').value = tpl.dim4 || '';
  if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = 'A+ (全面且具備實戰避險可行性)';
  if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = '經過 18 週紮實探索，我已構建起宏觀貨幣、企業財報、金融科技、個人理財與 ESG 永續的全景思維。我立志以自律儲蓄、理性投資與世代正義，成為頂天立地的理性現代財經公民！';
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

  const md = `# 115學年度「管理探索二」第十八週課堂實務作業（學期結業報告）
## 報告主題：${plan}
- **學生姓名**：${name}
- **學號**：${id}
- **自評等級**：${grade}

---

### 一、18 週財經探索學習歷程全景回顧與核心知識整合 (25%)
${dim1}

### 二、大學四年第一桶金 (100 萬) 儲蓄與複利投資執行藍圖 (25%)
${dim2}

### 三、個人五大財經能力雷達診斷自我評估與補強策略 (25%)
${dim3}

### 四、大一新鮮人終身理性財富公民獨立宣言與自律防詐承諾 (25%)
${dim4}

---
### 核心反思總結
> ${summary}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功複製第十八週結業作業 Markdown 報告至剪貼簿！');
  }).catch(() => {
    prompt('請手動複製以下 Markdown 報告：', md);
  });
};

window.exportHomeworkJson = function() {
  const data = {
    course: '管理探索二',
    week: 18,
    topic: '學期總結財經探索藍圖與大一新鮮人終身宣言',
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
  a.download = `W18_結業作業_${data.studentId || '未命名'}.json`;
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

  let filtered = W18_SLIDES_DATA.filter(s => {
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
