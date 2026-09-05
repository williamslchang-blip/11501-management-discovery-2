/**
 * 115學年度「管理探索二」第三週互動教學主程式
 * 單元名稱：利率、央行與我們的荷包 (利率、央行貨幣政策與資產價格)
 * 具備完整簡報引擎、手繪筆刷畫布、中英雙語切換、卡片總覽、
 * 1小時房貸學貸月付計算盤、2小時刷卡分期真實APR精算、3小時央行荷包挑戰遊戲與實務作業系統
 */

// ==========================================
// 全域狀態管理 (Global Application State)
// ==========================================
const APP_STATE = {
  currentSlideIndex: 0,
  lang: 'zh', // 'zh' or 'en'
  viewMode: 'deck', // 'deck' or 'grid'
  showTeacherNotes: false,
  isDrawingActive: false,
  drawingTool: 'pen', // 'pen', 'highlighter', 'eraser'
  drawingColor: '#ef4444',
  drawingWidth: 3,

  // 1小時活動 (房貸學貸月付金計算盤)
  loanState: {
    activePreset: 'student',
    amount: 400000,
    years: 8,
    baseRate: 1.65,
    rateHike: 0.25
  },

  // 2小時活動 (刷卡分期真實APR大考驗)
  instState: {
    activeCase: 0
  },

  // 3小時遊戲 (央行與荷包挑戰遊戲)
  gameCurrentLevel: 0,
  gameScore: 0,
  gameAnswered: [false, false, false, false],

  // 3小時作業 (央行新聞閱讀與個人存款計畫)
  homeworkData: {
    studentName: '',
    studentId: '',
    newsTitle: '',
    newsAnalysis: '',
    personalImpact: '',
    savingsPlan: '',
    conclusionGrade: 'Highly Defensive',
    decisionSummary: ''
  }
};

// ==========================================
// 生命週期初始化 (Lifecycle Initialization)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initSlidePresentation();
  initCanvasDrawing();
  initGridOverview();
  initLoanCalculatorActivity();
  initInstallmentAPRActivity();
  initDetectiveGame();
  initHomeworkForm();
  initKeyboardShortcuts();
  loadSavedHomework();
  populateQuickSelect();
  renderSlide();
});

// ==========================================
// 1. 簡報投影片主引擎 (Deck Presentation Engine)
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

function populateQuickSelect() {
  const select = document.getElementById('quickSlideSelect');
  if (!select) return;
  select.innerHTML = '';

  W3_SLIDES_DATA.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `Slide ${String(s.id).padStart(2, '0')}: ${s.title}`;
    select.appendChild(opt);
  });
}

function renderSlide() {
  const slide = W3_SLIDES_DATA[APP_STATE.currentSlideIndex];
  if (!slide) return;

  const isZh = APP_STATE.lang === 'zh';

  // 舞台卡片樣式切換 (hour-1, hour-2, hour-3)
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
    const list = isZh ? slide.quickTakeaways : (slide.quickTakeawaysEn || slide.quickTakeaways);
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
    guideQuestion.textContent = isZh ? slide.discussionQuestion : (slide.discussionQuestionEn || slide.discussionQuestion);
  }

  // 渲染教師講授指引 (Drawer)
  const notesCore = document.getElementById('notesCoreText');
  if (notesCore) notesCore.textContent = slide.teachingNotes;

  const notesQuestions = document.getElementById('notesQuestionsText');
  if (notesQuestions) {
    notesQuestions.textContent = isZh ? slide.discussionQuestion : (slide.discussionQuestionEn || slide.discussionQuestion);
  }

  // 進度條與頁數標籤
  const progressFill = document.getElementById('deckProgressFill');
  if (progressFill) {
    progressFill.style.width = `${((APP_STATE.currentSlideIndex + 1) / W3_SLIDES_DATA.length) * 100}%`;
  }

  const progressLabel = document.getElementById('deckProgressLabel');
  if (progressLabel) {
    progressLabel.textContent = `${APP_STATE.currentSlideIndex + 1} / ${W3_SLIDES_DATA.length}`;
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
  if (btnNext) btnNext.disabled = APP_STATE.currentSlideIndex === W3_SLIDES_DATA.length - 1;

  // 切換投影片時清空畫布
  clearDrawingCanvas(false);
}

function jumpToSlide(index) {
  if (index >= 0 && index < W3_SLIDES_DATA.length) {
    APP_STATE.currentSlideIndex = index;
    if (APP_STATE.viewMode === 'grid') {
      toggleViewMode();
    }
    renderSlide();
  }
}

function nextSlide() {
  if (APP_STATE.currentSlideIndex < W3_SLIDES_DATA.length - 1) {
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
// 2. 視覺圖表動態渲染器 (Slide Visuals Renderer)
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
            <span style="color: #2563eb; font-weight: 700;">#Rates_And_Wallets</span>
          </div>
        </div>
      `;
      break;

    case 'skill_tree':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🗺️ 3小時核心技能樹 (Core Skills Tree)</h4>
            <span class="sub-tag">零基礎掌握利率、政策、生活借貸與債券</span>
          </div>
          <div class="skills-tree-flow">
            <div class="tree-step-card step-h1">
              <div class="step-num">01</div>
              <div class="step-body">
                <h5>第 1 小時：生活利率與借貸</h5>
                <p>學貸車貸月付金 / 利率是金錢租金 / 升息一碼 (0.25%) / 0% 分期手續費暗黑年率</p>
                <div class="step-badge">生活體感與利息本質</div>
              </div>
            </div>
            <div class="tree-step-card step-h2">
              <div class="step-num">02</div>
              <div class="step-body">
                <h5>第 2 小時：新聞時事與央行</h5>
                <p>金錢時間價值 / 美聯儲資金水龍頭 / 科技 vs 銀行股 / 信用卡 15% 循環利息噩夢</p>
                <div class="step-badge">宏觀傳導與個人防禦</div>
              </div>
            </div>
            <div class="tree-step-card step-h3">
              <div class="step-num">03</div>
              <div class="step-body">
                <h5>第 3 小時：債券解密與防禦理財</h5>
                <p>債券殖利率借條 / 價格蹺蹺板 / 經濟軟硬著陸 / 10 萬打工存款雙軌配置</p>
                <div class="step-badge">資產思維與實務落地</div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'loan_impact_comparison':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📊 央行升息 0.5% (二碼) 實質荷包衝擊對照</h4>
            <span class="sub-tag">本金規模放大效應：微小利率變動 ➔ 實質生活壓力</span>
          </div>
          <div class="loan-impact-grid">
            <div class="loan-impact-card">
              <div>
                <div class="loan-card-head">
                  <span class="loan-card-badge">🎓 大學就學貸款</span>
                  <span style="font-size:0.75rem; color:#64748b;">本金 40 萬元 / 8 年期</span>
                </div>
                <div style="font-size:0.85rem; color:#475569;">原利率 1.65% ➔ 升至 2.15%</div>
                <div class="loan-stat-big">+2,000 元/年</div>
                <p style="font-size:0.8rem; color:#64748b;">每月利息多支出約 167 元</p>
              </div>
              <div class="loan-bento-loss">
                <span>🍱</span> 相當於每年少吃 <strong>20 個排骨便當</strong>
              </div>
            </div>

            <div class="loan-impact-card highlight">
              <div>
                <div class="loan-card-head">
                  <span class="loan-card-badge" style="background:#fef3c7; color:#b45309;">🏠 家庭購屋房貸</span>
                  <span style="font-size:0.75rem; color:#64748b;">本金 1,000 萬元 / 30 年期</span>
                </div>
                <div style="font-size:0.85rem; color:#475569;">原利率 2.15% ➔ 升至 2.65%</div>
                <div class="loan-stat-big">+50,000 元/年</div>
                <p style="font-size:0.8rem; color:#64748b;">每月月付金暴增約 4,166 元</p>
              </div>
              <div class="loan-bento-loss" style="background:#fff7ed; border-color:#fdba74; color:#c2410c;">
                <span>✈️</span> 相當於直接削減 <strong>一次全家出國旅遊</strong> 預算！
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'rent_of_money_diagram':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🔑 白話核心：利率就是「金錢的使用租金」</h4>
            <span class="sub-tag">如同租車租房，金錢的借調雙方遵守對等的租金規則</span>
          </div>
          <div class="rent-money-grid">
            <div class="rent-actor-card">
              <div class="actor-icon">🚗</div>
              <h5>向銀行借錢 (你是租客)</h5>
              <p style="font-size:0.82rem; color:#64748b;">你借用銀行的資金去買房、買車或繳學費</p>
              <div class="actor-formula">付出的代價 = 借貸利息 (Interest)</div>
              <p style="font-size:0.78rem; color:#475569;">利率越高 ➔ 租金越貴 ➔ 借款人負擔加重</p>
            </div>

            <div class="rent-actor-card" style="background:#f0fdf4; border-color:#86efac;">
              <div class="actor-icon">🏦</div>
              <h5>把錢存進銀行 (你是房東)</h5>
              <p style="font-size:0.82rem; color:#64748b;">你將打工積蓄租給銀行去放款與投資</p>
              <div class="actor-formula" style="color:#059669; border-color:#86efac;">收取的租金 = 存款利息 (Return)</div>
              <p style="font-size:0.78rem; color:#475569;">利率越高 ➔ 租金越甜 ➔ 儲蓄人回報豐厚</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'basis_points_ruler':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📏 財經主播術語解碼：升降息尺標 (Basis Points)</h4>
            <span class="sub-tag">1 碼 = 0.25% = 25 bps ‧ 換算無障礙</span>
          </div>
          <div class="bps-ruler-container">
            <div class="bps-pill-row">
              <div class="bps-pill">
                <div class="bps-code">半碼</div>
                <div class="bps-pct">+0.125%</div>
                <div class="bps-desc">12.5 bps (台灣央行常見)</div>
              </div>
              <div class="bps-pill active">
                <div class="bps-code">一碼</div>
                <div class="bps-pct">+0.250%</div>
                <div class="bps-desc">25 bps (國際金融基準)</div>
              </div>
              <div class="bps-pill">
                <div class="bps-code">二碼</div>
                <div class="bps-pct">+0.500%</div>
                <div class="bps-desc">50 bps (強烈調控力道)</div>
              </div>
              <div class="bps-pill">
                <div class="bps-code">三至四碼</div>
                <div class="bps-pct">+0.75% ~ 1.0%</div>
                <div class="bps-desc">75-100 bps (抗暴力通膨)</div>
              </div>
            </div>
            <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:14px; margin-top:8px;">
              <div style="font-weight:800; color:#1e293b; font-size:0.9rem; margin-bottom:4px;">💡 實戰算術題：</div>
              <p style="font-size:0.82rem; color:#475569; line-height:1.5;">
                當新聞主播說：『美聯儲宣佈升息 2 碼，台灣央行跟進升息半碼』<br>
                ➔ 美國利率調升 <strong>0.50%</strong>，台灣基準利率調升 <strong>0.125%</strong>。你的定存利率與房貸利率將同步調高！
              </p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'high_yield_account_matrix':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🕵️ 數位帳戶「3% 高利活存」廣告條款大揭密</h4>
            <span class="sub-tag">看穿行銷宣傳標題，識破隱藏限制與任務門檻</span>
          </div>
          <table class="fine-print-table">
            <thead>
              <tr>
                <th>行銷宣傳標題</th>
                <th>背後隱藏小字條款</th>
                <th>實質影響與應對策略</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3.0% 超高利活儲</strong></td>
                <td><span class="tag-alert">僅限前 NT$ 50,000 元</span>，超額部分以一般活存 0.7% 計算</td>
                <td>存 10 萬元實質年利息僅約 1,850 元 (加權實質利率 1.85%)，切勿盲目存入大量閒置資金</td>
              </tr>
              <tr>
                <td><strong>新戶專屬尊榮禮遇</strong></td>
                <td><span class="tag-alert">優惠期僅限開戶後 3 個月</span>，到期自動恢復低利</td>
                <td>需設定手機行事曆，在優惠期滿前將預備金移轉至其他高收益帳戶</td>
              </tr>
              <tr>
                <td><strong>解鎖加碼任務</strong></td>
                <td>每月需刷簽帳卡消費 5 筆 或 設定自動扣繳公用事業費</td>
                <td>切忌為賺 100 元利息而衝動刷卡消費 500 元，本末倒置</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      break;

    case 'installment_hidden_apr':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🔍 零利率分期付款陷阱：手續費換算真實 APR</h4>
            <span class="sub-tag">iPhone 36,000 元分 12 期，手續費 1,800 元的真實代價</span>
          </div>
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-weight:800; color:#475569; font-size:0.9rem;">表面宣稱年利率：</span>
              <span style="font-size:1.3rem; font-weight:900; color:#059669;">0.0% (零利率)</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-weight:800; color:#475569; font-size:0.9rem;">名目手續費支出：</span>
              <span style="font-size:1.1rem; font-weight:800; color:#1e293b;">NT$ 1,800 元</span>
            </div>
            <hr style="border:none; border-top:1px dashed #cbd5e1; margin:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span style="font-weight:800; color:#dc2626; font-size:0.95rem;">實質年百分率 (APR)：</span>
              <span style="font-size:1.8rem; font-weight:900; color:#dc2626;">9.23%</span>
            </div>
            <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px; font-size:0.8rem; color:#991b1b;">
              ⚠️ <strong>警示結論</strong>：9.23% 是公營銀行定存利率 (1.7%) 的 <strong>5.4 倍</strong>！這不是免費分期，而是一筆偽裝成手續費的高利息貸款。
            </div>
          </div>
        </div>
      `;
      break;

    case 'savings_allocation_100k':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>💰 大學打工第一筆 10 萬元存款：聰明擺放雙軌法</h4>
            <span class="sub-tag">兼顧隨時急用的流動性與抗通膨孳息效益</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:12px; padding:16px; text-align:center;">
              <div style="font-size:2rem; margin-bottom:6px;">🛡️</div>
              <div style="font-weight:800; color:#166534; font-size:1rem;">緊急預備金 5 萬元</div>
              <div style="font-size:0.82rem; color:#475569; margin:4px 0;">數位帳戶 3% 高利活儲</div>
              <div style="font-size:1.4rem; font-weight:900; color:#059669; margin:8px 0;">+1,500 元/年</div>
              <p style="font-size:0.75rem; color:#64748b;">隨時可轉帳提領應急，同時賺取充沛活儲利息</p>
            </div>

            <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:12px; padding:16px; text-align:center;">
              <div style="font-size:2rem; margin-bottom:6px;">🔒</div>
              <div style="font-weight:800; color:#1e40af; font-size:1rem;">定存安定金 5 萬元</div>
              <div style="font-size:0.82rem; color:#475569; margin:4px 0;">1 年期定期存款 1.72%</div>
              <div style="font-size:1.4rem; font-weight:900; color:#2563eb; margin:8px 0;">+860 元/年</div>
              <p style="font-size:0.75rem; color:#64748b;">鎖定無風險利息，強迫儲蓄不手癢亂買東西</p>
            </div>
          </div>
          <div style="text-align:center; margin-top:10px; font-size:0.8rem; color:#64748b;">
            ❌ <strong>最差示範</strong>：全放一般活存 (0.7%)，一年利息僅 700 元，實質被通膨吃掉 1,600 元購買力！
          </div>
        </div>
      `;
      break;

    case 'rent_pass_through_flow':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🏠 房東漲租轉嫁機制與租客防禦指南</h4>
            <span class="sub-tag">央行升息如何傳導至租金？大一生必學的合約保護法</span>
          </div>
          <div class="skills-tree-flow">
            <div class="tree-step-card" style="border-left:5px solid #ef4444;">
              <div class="step-num">01</div>
              <div class="step-body">
                <h5>升息成本傳導鏈</h5>
                <p>央行升息 ➔ 房東每月房貸支出增加 ➔ 房東試圖在租約到期時調漲 500-1000 元房租轉嫁利息。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #f59e0b;">
              <div class="step-num">02</div>
              <div class="step-body">
                <h5>租客法定防線 (契約保障)</h5>
                <p>租約期間內房東<strong>不得片面調漲房租</strong>！若合約未到期，學生有完整法律權利拒絕漲租。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #10b981;">
              <div class="step-num">03</div>
              <div class="step-body">
                <h5>換約議價談判籌碼</h5>
                <p>主動查詢周遭實價登錄租金行情；強調按時繳租、愛惜屋況，爭取簽訂 1-2 年長約鎖定租金。</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'milestone_hour1':
      container.innerHTML = `
        <div class="visual-diagram-card milestone-card">
          <div class="milestone-badge">🎉 第一小時課程里程碑達成</div>
          <h4>實戰演練：檢測升息對你的學貸與月付金衝擊！</h4>
          <p>已掌握借貸利息租金本質、升息一碼 (0.25%) 意義、高利活存門檻與 0% 分期手續費地雷。現在請開啟專屬計算盤，試算便當錢！</p>
          <div class="milestone-actions">
            <button class="btn-launch-lab btn-h1" onclick="openModal('modalLoanCalc')">
              <span>🎯</span> 開啟「房貸學貸月付金計算盤」
            </button>
          </div>
        </div>
      `;
      break;

    case 'tvm_timeline_model':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⏳ 金錢的時間價值 (Time Value of Money)</h4>
            <span class="sub-tag">今天的 100 元永遠大於明年的 100 元！</span>
          </div>
          <div class="tvm-timeline-box">
            <div class="tvm-stage-flow">
              <div class="tvm-node">
                <div class="node-badge">📅 今天 (Year 0)</div>
                <div class="node-value">$100 元</div>
                <div class="node-sub">即時消費 / 即刻投資</div>
              </div>
              <div class="tvm-arrow-bridge">➔ 存款複利 (r = 3%) ➔</div>
              <div class="tvm-node">
                <div class="node-badge">📅 一年後 (Year 1)</div>
                <div class="node-value" style="color:#059669;">$103 元</div>
                <div class="node-sub">延後消費的利息報酬</div>
              </div>
            </div>
            <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:10px; padding:12px; font-size:0.82rem; color:#991b1b; line-height:1.5;">
              ⚠️ <strong>如果把 100 元藏在床底下放一年</strong>：<br>
              在 3% 通膨下，一年後它能買到的實質商品價值只剩下 <strong>97 元</strong>！這就是為什麼忽視利率會讓你默默變窮。
            </div>
          </div>
        </div>
      `;
      break;

    case 'housing_rate_mechanism':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🏘️ 央行「升息打房」政策傳導鏈與現實考驗</h4>
            <span class="sub-tag">媒體簡化推論 vs 真實不動產市場多維博弈</span>
          </div>
          <div class="loan-impact-grid">
            <div class="loan-impact-card">
              <div class="loan-card-head">
                <span class="loan-card-badge" style="background:#dbeafe; color:#1d4ed8;">媒體簡化邏輯</span>
              </div>
              <ul style="font-size:0.8rem; color:#475569; padding-left:18px; line-height:1.6; margin-top:8px;">
                <li>央行升息增加借貸成本</li>
                <li>購屋者房貸月付金加重</li>
                <li>買氣萎縮、建商降價拋售</li>
                <li><strong style="color:#2563eb;">結論：房價必然應聲大跌</strong></li>
              </ul>
            </div>
            <div class="loan-impact-card highlight">
              <div class="loan-card-head">
                <span class="loan-card-badge" style="background:#fef3c7; color:#b45309;">現實市場真相</span>
              </div>
              <ul style="font-size:0.8rem; color:#475569; padding-left:18px; line-height:1.6; margin-top:8px;">
                <li>台灣央行升息幅度溫和 (半碼)</li>
                <li>高資產買盤多為現金全額或低成數</li>
                <li>營造工資與建材成本居高不下</li>
                <li><strong style="color:#b45309;">結論：降溫成交量，但房價具僵固性</strong></li>
              </ul>
            </div>
          </div>
        </div>
      `;
      break;

    case 'tech_stocks_discount_rate':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📉 為什麼升息時，新聞常寫「科技股大暴跌」？</h4>
            <span class="sub-tag">折現率模型 (Discount Rate) 的抽血效應</span>
          </div>
          <div class="rent-money-grid">
            <div class="rent-actor-card">
              <div class="actor-icon">🏦</div>
              <h5>無風險替代效應</h5>
              <p style="font-size:0.8rem; color:#64748b; line-height:1.4;">
                當美國國庫券或定存能給出 <strong>5.0% 無風險利息</strong>，機構大金主何必去冒風險買本益比 40 倍的高估值科技股票？
              </p>
            </div>
            <div class="rent-actor-card" style="background:#fef2f2; border-color:#fca5a5;">
              <div class="actor-icon">💸</div>
              <h5>研發借款成本暴增</h5>
              <p style="font-size:0.8rem; color:#64748b; line-height:1.4;">
                晶圓廠建廠與 AI 伺服器研發動輒需要千億融資，利率上升使<strong>利息費用激增</strong>，直接啃蝕企業每季淨獲利。
              </p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'bank_nim_spread':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📈 為什麼升息對銀行金融股反而是超級利多？</h4>
            <span class="sub-tag">存放款淨利差 (Net Interest Margin, NIM) 擴大的魔法</span>
          </div>
          <div class="nim-spread-card">
            <div class="nim-bars-container">
              <div class="nim-bar-item">
                <div class="nim-bar-header">
                  <span>放款利率調升 (如房貸/信貸借給客戶)：</span>
                  <span style="color:#dc2626; font-weight:800;">+0.25% (全額秒調)</span>
                </div>
                <div class="nim-bar-track">
                  <div class="nim-bar-fill loan"></div>
                </div>
              </div>

              <div class="nim-bar-item">
                <div class="nim-bar-header">
                  <span>活存利率調升 (付給一般存戶的利息)：</span>
                  <span style="color:#2563eb; font-weight:800;">+0.10% (緩慢微調)</span>
                </div>
                <div class="nim-bar-track">
                  <div class="nim-bar-fill deposit"></div>
                </div>
              </div>
            </div>
            <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:10px; text-align:center; font-size:0.85rem; font-weight:700; color:#1e293b;">
              中間多出的利差 = <strong>+0.15% 淨獲利直接入袋！</strong> 帶動金融金控獲利與股利創新高。
            </div>
          </div>
        </div>
      `;
      break;

    case 'credit_card_snowball':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>❄️ 信用卡「15% 循環利息」滾雪球噩夢</h4>
            <span class="sub-tag">賬單 2 萬元只繳最低應繳金額 2,000 元的真實下場</span>
          </div>
          <div class="snowball-visual-container">
            <div class="snowball-month-row">
              <div class="month-label">第 1 個月</div>
              <div class="month-detail">欠款 18,000 元，啟動 15% 年息日日計息</div>
              <div class="month-rate">+225 元利息</div>
            </div>
            <div class="snowball-month-row">
              <div class="month-label">第 6 個月</div>
              <div class="month-detail">未還本金加上循環利息利滾利，持續膨脹</div>
              <div class="month-rate">+1,420 元利息</div>
            </div>
            <div class="snowball-month-row" style="background:#ffe4e6; border-color:#fda4af;">
              <div class="month-label">第 12 個月</div>
              <div class="month-detail">付出的利息已足夠買下一支全新智慧手錶！</div>
              <div class="month-rate">+3,050 元利息</div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'buy_vs_rent_matrix':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⚖️ 高利率時代青年居住決策：買房 vs 租房</h4>
            <span class="sub-tag">破除非買不可或非租不可的迷思，看清資金機會成本</span>
          </div>
          <div class="loan-impact-grid">
            <div class="loan-impact-card">
              <div class="loan-card-head"><span class="loan-card-badge">🏠 選擇買房</span></div>
              <p style="font-size:0.8rem; color:#475569; line-height:1.5;">
                ✔️ <strong>優勢</strong>：強迫儲蓄、擁有個人不動產產權、老後居住安定。<br>
                ❌ <strong>代價</strong>：高利率下每月利息負擔沉重，自備款剝奪青年投資與創業彈性。
              </p>
            </div>
            <div class="loan-impact-card highlight">
              <div class="loan-card-head"><span class="loan-card-badge" style="background:#fef3c7; color:#b45309;">🔑 選擇租房</span></div>
              <p style="font-size:0.8rem; color:#475569; line-height:1.5;">
                ✔️ <strong>優勢</strong>：高流動性與職涯自由度，省下的自備款可投入長期複利資產。<br>
                ❌ <strong>代價</strong>：幫房東繳房貸、面臨漲租與搬遷風險。
              </p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'risk_free_benchmark_pyramid':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🛡️ 防詐照妖鏡：無風險基準利率金字塔</h4>
            <span class="sub-tag">宣稱「月報酬 10% 零風險」在金融物理學上必為詐騙！</span>
          </div>
          <div class="skills-tree-flow">
            <div class="tree-step-card" style="border-left:5px solid #059669;">
              <div class="step-num" style="color:#059669;">1.7%</div>
              <div class="step-body">
                <h5>台灣銀行 1 年期定存基準 (無風險)</h5>
                <p>公營銀行本金保證，中央存款保險 300 萬全額保障。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #3b82f6;">
              <div class="step-num" style="color:#3b82f6;">4.5%</div>
              <div class="step-body">
                <h5>美國國庫券基準 (全球無風險資產核心)</h5>
                <p>全球主權信用最強的美國聯邦政府開出的借條年回報。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #ef4444; background:#fef2f2;">
              <div class="step-num" style="color:#ef4444;">120%+</div>
              <div class="step-body">
                <h5>宣稱「月息 10% 穩賺不賠」➔ 100% 龐氏詐騙！</h5>
                <p>連巴菲特 (年化約20%) 都做不到！吸金集團後金補前金，隨時捲款跑路。</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'three_golden_rules':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🏆 大學生個人利率理財 3 大黃金法則</h4>
            <span class="sub-tag">守住三道防線，比同齡人早十年建立財務自主權</span>
          </div>
          <div class="three-cards-grid">
            <div class="action-mini-card safe">
              <div class="card-head-title">1. 零信用卡循環</div>
              <p>每月信用卡賬單務必 100% 全額繳清，絕不動用 15% 循環利息與預借現金。</p>
            </div>
            <div class="action-mini-card safe">
              <div class="card-head-title">2. 善用高利活存</div>
              <p>將生活緊急預備金放入 2%-3% 數位活儲，讓每一塊錢隨時隨地都在孳息。</p>
            </div>
            <div class="action-mini-card safe">
              <div class="card-head-title">3. 算清分期手續費</div>
              <p>買大件 3C 或機車前，先用計算機換算真實 APR，拒當隱藏高利貸的提款機。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'milestone_hour2':
      container.innerHTML = `
        <div class="visual-diagram-card milestone-card">
          <div class="milestone-badge">🎉 第二小時課程里程碑達成</div>
          <h4>實戰演練：精算 0 利率背後的手續費真實年利率！</h4>
          <p>已掌握時間價值、央行打房真實傳導、美聯儲資金水龍頭與 15% 信用卡循環噩夢。現在請開啟專屬 APR 精算盤！</p>
          <div class="milestone-actions">
            <button class="btn-launch-lab btn-h2" onclick="openModal('modalInstallment')">
              <span>🎯</span> 開啟「分期付款真實 APR 精算盤」
            </button>
          </div>
        </div>
      `;
      break;

    case 'bond_yield_plain_card':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📜 新聞常說的「債券殖利率」到底是什麼？白話文解密</h4>
            <span class="sub-tag">債券 = 借據借條 ‧ 殖利率 = 實質年利息報酬百分比</span>
          </div>
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:18px;">
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:14px;">
              <div style="font-size:2.5rem;">📑</div>
              <div>
                <h5 style="font-size:1.05rem; font-weight:800; color:#1e293b;">政府向你借 1 萬元開出的「借據」</h5>
                <p style="font-size:0.82rem; color:#64748b;">承諾 10 年後全額歸還 10,000 元本金，且每年固定付你 400 元利息</p>
              </div>
            </div>
            <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:10px; padding:14px; text-align:center;">
              <div style="font-size:0.85rem; color:#1e40af; font-weight:700;">你的年殖利率 (Yield) 算式：</div>
              <div style="font-size:1.6rem; font-weight:900; color:#1d4ed8; margin:6px 0;">
                400 元 ÷ 10,000 元 = <strong>4.0%</strong>
              </div>
              <p style="font-size:0.78rem; color:#64748b;">殖利率越甜，代表這張政府借條每年付給你的利息回報越高！</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'bond_seesaw_animation':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🎪 利率與債券價格反向蹺蹺板效應</h4>
            <span class="sub-tag">二手拍賣市場常理：市場利率升 ➔ 舊債券價格必須跌！</span>
          </div>
          <div class="seesaw-visual-box">
            <div class="seesaw-stage">
              <div class="seesaw-pivot"></div>
              <div id="seesawBarEl" class="seesaw-bar tilted-left">
                <div class="seesaw-weight weight-left">
                  <span>📈 市場利率</span>
                  <div style="font-size:1.1rem;">5.0% 升</div>
                </div>
                <div class="seesaw-weight weight-right">
                  <span>📉 舊債價格</span>
                  <div style="font-size:1.1rem;">打折跌！</div>
                </div>
              </div>
            </div>
            <p style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              💡 <strong>為什麼舊債會跌？</strong> 當銀行新推出 5% 高利定存，你手上的 2% 舊借據沒人想買，你只能降價打折出清！
            </p>
          </div>
        </div>
      `;
      break;

    case 'landing_path_diagram':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>✈️ 新聞名詞解密：經濟「軟著陸」vs「硬著陸」</h4>
            <span class="sub-tag">央行駕駛客機降落跑道：如何踩煞車考驗總裁智慧</span>
          </div>
          <div class="flight-path-grid">
            <div class="flight-card soft">
              <div class="flight-icon">🛬</div>
              <h5 style="font-weight:800; color:#166534;">軟著陸 (Soft Landing)</h5>
              <p style="font-size:0.78rem; color:#475569; line-height:1.4; margin-top:6px;">
                通膨順利降溫回到 2%，但經濟沒有衰退，大家都有工作，企業獲利穩健，隨後重啟多頭牛市。
              </p>
              <span class="flight-status-badge">✅ 最理想結局 (股市大漲)</span>
            </div>

            <div class="flight-card hard">
              <div class="flight-icon">💥</div>
              <h5 style="font-weight:800; color:#991b1b;">硬著陸 (Hard Landing)</h5>
              <p style="font-size:0.78rem; color:#475569; line-height:1.4; margin-top:6px;">
                升息煞車踩太猛，企業借不到錢倒閉潮，失業率暴增陷入大蕭條，資產價格慘烈崩跌。
              </p>
              <span class="flight-status-badge">⚠️ 災難性迫降 (經濟衰退)</span>
            </div>
          </div>
        </div>
      `;
      break;

    case 'freshman_two_step_plan':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🌱 大一生抗通膨與利率理財兩步驟行動計畫</h4>
            <span class="sub-tag">零門檻立刻執行：不必等畢業，現在就讓企業龍頭替你工作</span>
          </div>
          <div class="skills-tree-flow">
            <div class="tree-step-card" style="border-left:5px solid #2563eb;">
              <div class="step-num" style="color:#2563eb;">步驟 1</div>
              <div class="step-body">
                <h5>存好 3~6 個月生活預備金</h5>
                <p>存放在 2%~3% 數位帳戶高利活存，維持極佳流動性，應對生病、修機車等突發支出。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #059669;">
              <div class="step-num" style="color:#059669;">步驟 2</div>
              <div class="step-body">
                <h5>每月定期定額 1,000 元買原型 ETF</h5>
                <p>從打工錢提撥 1,000~3,000 元買進 0050 或 006208，成為台灣前 50 大企業的股東！</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'three_stupid_mistakes':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>⛔ 升息時代大學生絕對不能踩的 3 個理財傻事</h4>
            <span class="sub-tag">理財第一步是學會避坑，守住本金才能享有未來的複利</span>
          </div>
          <div class="three-cards-grid">
            <div class="action-mini-card danger">
              <div class="card-head-title" style="color:#b91c1c;">1. 民間地下分期</div>
              <p>借無卡融資或當鋪買重機改車，實質年利率高達 18%-20%，吃光工讀積蓄。</p>
            </div>
            <div class="action-mini-card danger">
              <div class="card-head-title" style="color:#b91c1c;">2. 借錢歐印當沖</div>
              <p>聽信群組明牌開融資借錢當沖炒股，在利率震盪期幾天內即可讓本金徹底歸零。</p>
            </div>
            <div class="action-mini-card danger">
              <div class="card-head-title" style="color:#b91c1c;">3. 買高息垃圾幣</div>
              <p>聽信海外高息質押或不知名垃圾債券，本金被騙走跑路，求償無門。</p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'news_reading_three_steps':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📰 實務演練：看懂今日財經新聞的三個步驟</h4>
            <span class="sub-tag">建立個人財經雷達，不再被標題黨牽著走</span>
          </div>
          <div class="news-steps-flow">
            <div class="news-step-item">
              <div class="news-step-badge">1</div>
              <div class="news-step-body">
                <h5>抓主角與動作</h5>
                <p>是美聯儲降息二碼？還是台灣央行升息半碼防房市過熱？確認政策主體與幅度。</p>
              </div>
            </div>
            <div class="news-step-item">
              <div class="news-step-badge">2</div>
              <div class="news-step-body">
                <h5>思考對荷包的直接影響</h5>
                <p>定存利息變多還是變少？學貸負擔增加還是減輕？房東是否可能醞釀調漲租金？</p>
              </div>
            </div>
            <div class="news-step-item">
              <div class="news-step-badge">3</div>
              <div class="news-step-body">
                <h5>評估股市大方向走勢</h5>
                <p>降息資金變多有利科技成長股，升息資金收緊則促使高估值股票修正、銀行利差擴大。</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'human_capital_pyramid':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🧠 先理健康腦，再理口袋錢</h4>
            <span class="sub-tag">大學時期回報率最高的抗通膨資產，就是你自己！</span>
          </div>
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:18px; text-align:center;">
            <div style="font-size:2.6rem; margin-bottom:8px;">🚀</div>
            <h5 style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-bottom:6px;">人力資本 (Human Capital) 的極限複利</h5>
            <p style="font-size:0.82rem; color:#475569; line-height:1.5; max-width:440px; margin:0 auto 12px;">
              大學四年把專業技能、外語表達與批判思考練好，出社會起薪成長 <strong>20% (多 8,000 元/月)</strong>，遠勝過每天緊盯股市蠅頭小利幾百元！
            </p>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 14px; display:inline-block; font-size:0.8rem; font-weight:800; color:#166534;">
              💡 投資自己大腦的知識，是永遠不會被通膨稀釋的頂級護城河。
            </div>
          </div>
        </div>
      `;
      break;

    case 'w3_knowledge_network':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>🌐 第三週全景知識網絡圖譜</h4>
            <span class="sub-tag">串聯 30 頁核心脈絡：利率 ➔ 央行 ➔ 借貸 ➔ 個人防禦</span>
          </div>
          <div class="skills-tree-flow">
            <div class="tree-step-card" style="border-left:5px solid #2563eb;">
              <div class="step-num" style="color:#2563eb;">A</div>
              <div class="step-body">
                <h5>利率是金錢的租金</h5>
                <p>一碼為 0.25% ‧ 金錢時間價值 (TVM) ‧ 今天的錢 > 未來的錢 ‧ 延後消費獲取利息。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #7c3aed;">
              <div class="step-num" style="color:#7c3aed;">B</div>
              <div class="step-body">
                <h5>央行決策牽動全球</h5>
                <p>升息抑制通膨 / 降息開大水龍頭 ‧ 科技股折現 vs 銀行存放利差 (NIM) ‧ 債券價格蹺蹺板。</p>
              </div>
            </div>
            <div class="tree-step-card" style="border-left:5px solid #059669;">
              <div class="step-num" style="color:#059669;">C</div>
              <div class="step-body">
                <h5>個人防禦終身法則</h5>
                <p>拒絕 15% 信用卡循環 ‧ 精算 0% 分期真實 APR ‧ 5:5 配置 10 萬打工存款 ‧ 定期定額 0050。</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'homework_briefing_card':
      container.innerHTML = `
        <div class="visual-diagram-card">
          <div class="diagram-header">
            <h4>📝 本週課堂實務作業：央行新聞閱讀與個人存款計畫</h4>
            <span class="sub-tag">三大審計評分規準 (Rubrics) ‧ 線上即時完成與匯出</span>
          </div>
          <div class="hw-rubrics-grid">
            <div class="hw-rubric-card">
              <div class="r-head"><span class="r-name">D1. 央行新聞解讀</span><span class="r-weight">30%</span></div>
              <p>精準提煉政策動作幅度，解析央行打通膨或防衰退的背景動機。</p>
            </div>
            <div class="hw-rubric-card">
              <div class="r-head"><span class="r-name">D2. 學貸生活衝擊</span><span class="r-weight">30%</span></div>
              <p>量化政策對學貸、房租或生活費的具體便當錢影響。</p>
            </div>
            <div class="hw-rubric-card">
              <div class="r-head"><span class="r-name">D3. 10萬存款配置</span><span class="r-weight">40%</span></div>
              <p>提出高利活存、定存與 ETF 定期定額的雙軌配置理由。</p>
            </div>
          </div>
          <button class="btn-launch-lab btn-h3" style="width:100%; margin-top:10px; justify-content:center;" onclick="openModal('modalHomework')">
            <span>✍️</span> 立即開啟課堂作業在線填寫表單
          </button>
        </div>
      `;
      break;

    case 'course_wrapup_w4_preview':
      container.innerHTML = `
        <div class="visual-diagram-card milestone-card wrapup-card">
          <div class="milestone-badge" style="background:#dcfce7; color:#15803d;">🎉 第三週探索圓滿完成！</div>
          <h4>第四週精采單元預告：股票市場基礎與如何挑選第一支股票</h4>
          <p>什麼是股票股權？本益比 (P/E) 白話大解密、台積電護城河與大一零基礎挑選第一支好股票的實戰心法！</p>
          <div class="milestone-actions">
            <button class="btn-launch-lab btn-h1" onclick="jumpToSlide(0)">
              <span>🔄</span> 重溫第三週核心
            </button>
            <button class="btn-launch-lab btn-h3" onclick="openModal('modalDetective')">
              <span>🎮</span> 玩荷包挑戰遊戲
            </button>
          </div>
        </div>
      `;
      break;

    default:
      container.innerHTML = `<div style="padding:20px; color:#64748b;">視覺模組施工中 (${slide.visualType})</div>`;
  }
}

// ==========================================
// 3. 卡片總覽模式 (Grid Overview Mode)
// ==========================================
function initGridOverview() {
  const filterTabs = document.querySelectorAll('.tab-hour-filter');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const hour = e.target.getAttribute('data-hour');
      renderGridCards(hour);
    });
  });

  const searchInput = document.getElementById('gridSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderGridCards('all', e.target.value.trim().toLowerCase());
    });
  }
}

function renderGridCards(hourFilter = 'all', keyword = '') {
  const container = document.getElementById('gridCardsContainer');
  if (!container) return;

  container.innerHTML = '';
  const isZh = APP_STATE.lang === 'zh';

  W3_SLIDES_DATA.forEach((slide, idx) => {
    if (hourFilter !== 'all' && String(slide.hour) !== String(hourFilter)) {
      return;
    }

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
      <p class="grid-card-subtitle">${isZh ? slide.subtitle : slide.subtitleEn}</p>
      <div class="grid-card-points">
        ${(isZh ? slide.quickTakeaways : (slide.quickTakeawaysEn || slide.quickTakeaways)).slice(0, 2).map(p => `<div>• ${p}</div>`).join('')}
      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================
// 4. 手繪筆刷與螢光筆畫布 (Drawing Canvas)
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
    if (canvasEl) {
      canvasEl.classList.toggle('active', APP_STATE.isDrawingActive);
      canvasEl.classList.toggle('active-drawing', APP_STATE.isDrawingActive);
    }
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
  link.download = `W3_利率央行與我們的荷包_Slide_${APP_STATE.currentSlideIndex + 1}_註記.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ==========================================
// 5. 第 1 小時活動：升息下的房貸學貸月付金計算盤
// ==========================================
function initLoanCalculatorActivity() {
  const btnPresets = document.querySelectorAll('.loan-preset-btn');
  btnPresets.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btnPresets.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pid = e.currentTarget.getAttribute('data-preset');
      applyLoanPreset(pid);
    });
  });

  const inputs = ['loanAmountInput', 'loanYearsInput', 'loanBaseRateInput', 'loanRateHikeInput'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateLoanHike);
  });

  calculateLoanHike();
}

function applyLoanPreset(presetId) {
  const preset = W3_LOAN_PRESETS.find(p => p.id === presetId);
  if (!preset) return;

  const amt = document.getElementById('loanAmountInput');
  const yrs = document.getElementById('loanYearsInput');
  const base = document.getElementById('loanBaseRateInput');
  const hike = document.getElementById('loanRateHikeInput');

  if (amt) amt.value = preset.amount;
  if (yrs) yrs.value = preset.years;
  if (base) base.value = preset.originalRate;
  if (hike) hike.value = 0.25;

  calculateLoanHike();
}

function calculateLoanHike() {
  const amount = parseFloat(document.getElementById('loanAmountInput')?.value) || 400000;
  const years = parseFloat(document.getElementById('loanYearsInput')?.value) || 8;
  const baseRatePct = parseFloat(document.getElementById('loanBaseRateInput')?.value) || 1.65;
  const hikePct = parseFloat(document.getElementById('loanRateHikeInput')?.value) || 0.25;

  const months = years * 12;
  const newRatePct = baseRatePct + hikePct;

  function getPmt(p, rAnnual, n) {
    if (rAnnual <= 0) return p / n;
    const rMonth = rAnnual / 100 / 12;
    return (p * rMonth * Math.pow(1 + rMonth, n)) / (Math.pow(1 + rMonth, n) - 1);
  }

  const oldMonthly = getPmt(amount, baseRatePct, months);
  const newMonthly = getPmt(amount, newRatePct, months);
  const monthlyDiff = newMonthly - oldMonthly;
  const annualDiff = monthlyDiff * 12;
  const bentoLoss = Math.round(annualDiff / 110);

  const elNewRate = document.getElementById('resNewRate');
  const elOldPmt = document.getElementById('resOldMonthly');
  const elNewPmt = document.getElementById('resNewMonthly');
  const elDiffPmt = document.getElementById('resMonthlyDiff');
  const elAnnualDiff = document.getElementById('resAnnualDiff');
  const elBento = document.getElementById('resBentoLoss');
  const elDiag = document.getElementById('resLoanDiagnosis');

  if (elNewRate) elNewRate.textContent = `${newRatePct.toFixed(3)}% (+${hikePct.toFixed(3)}%)`;
  if (elOldPmt) elOldPmt.textContent = `NT$ ${Math.round(oldMonthly).toLocaleString()} 元`;
  if (elNewPmt) elNewPmt.textContent = `NT$ ${Math.round(newMonthly).toLocaleString()} 元`;
  if (elDiffPmt) elDiffPmt.textContent = `+NT$ ${Math.round(monthlyDiff).toLocaleString()} 元/月`;
  if (elAnnualDiff) elAnnualDiff.textContent = `+NT$ ${Math.round(annualDiff).toLocaleString()} 元/年`;
  if (elBento) elBento.textContent = `約 ${bentoLoss} 個排骨便當 / 年`;

  if (elDiag) {
    elDiag.innerHTML = `
      💡 <strong>財務診斷處方</strong>：當基準利率上調 <strong>${hikePct.toFixed(3)}%</strong>，
      本金 <strong>${amount.toLocaleString()} 元</strong> 每年將吃掉 <strong>${Math.round(annualDiff).toLocaleString()} 元</strong> 現金流。<br>
      ${bentoLoss > 20 ? '⚠️ 每年利息負擔沉重，建議檢視非必要日常開支，或在收入寬裕時提前部分還款以減輕總利息。' : '✔️ 利息支出增幅溫和，可透過將生活備用金轉存 3% 數位活儲之利息完全補平！'}
    `;
  }
}

// ==========================================
// 6. 第 2 小時活動：刷卡分期真實 APR 精算
// ==========================================
function initInstallmentAPRActivity() {
  const caseBtnsContainer = document.getElementById('instCasesSelectorContainer');
  if (!caseBtnsContainer) return;

  caseBtnsContainer.innerHTML = '';
  W3_INSTALLMENT_CASES.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = `inst-case-btn ${idx === 0 ? 'active' : ''}`;
    btn.textContent = c.category;
    btn.onclick = () => selectInstallmentCase(idx);
    caseBtnsContainer.appendChild(btn);
  });

  selectInstallmentCase(0);
}

function selectInstallmentCase(index) {
  APP_STATE.instState.activeCase = index;
  const c = W3_INSTALLMENT_CASES[index];
  if (!c) return;

  document.querySelectorAll('.inst-case-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === index);
  });

  const titleEl = document.getElementById('instCaseTitle');
  const priceEl = document.getElementById('instPriceText');
  const periodsEl = document.getElementById('instPeriodsText');
  const feeEl = document.getElementById('instFeeText');
  const monthlyEl = document.getElementById('instMonthlyText');
  const aprEl = document.getElementById('instAprNumber');
  const multEl = document.getElementById('instMultipleText');
  const analysisEl = document.getElementById('instExpertAnalysis');

  if (titleEl) titleEl.textContent = c.title;
  if (priceEl) priceEl.textContent = `NT$ ${c.price.toLocaleString()} 元`;
  if (periodsEl) periodsEl.textContent = `${c.periods} 期 (標榜 0 利率)`;
  if (feeEl) feeEl.textContent = `NT$ ${c.fee.toLocaleString()} 元 (${c.feeDesc})`;
  if (monthlyEl) monthlyEl.textContent = `NT$ ${c.monthlyPay.toLocaleString()} 元`;
  if (aprEl) aprEl.textContent = `${c.realApr.toFixed(2)}%`;
  if (multEl) multEl.textContent = `定存 (1.7%) 的 ${c.depositMultiple} 倍`;
  if (analysisEl) analysisEl.innerHTML = c.expertAnalysis;
}

// ==========================================
// 7. 第 3 小時小遊戲：央行與荷包挑戰遊戲
// ==========================================
function initDetectiveGame() {
  APP_STATE.gameCurrentLevel = 0;
  APP_STATE.gameScore = 0;
  APP_STATE.gameAnswered = [false, false, false, false];
  renderDetectiveGameLevel();
}

function renderDetectiveGameLevel() {
  const container = document.getElementById('gameActiveScreen');
  if (!container) return;

  const currentIdx = APP_STATE.gameCurrentLevel;
  const total = W3_GAME_QUESTIONS.length;

  if (currentIdx >= total) {
    renderGameCertificate(container);
    return;
  }

  const q = W3_GAME_QUESTIONS[currentIdx];

  container.innerHTML = `
    <div class="game-progress-bar-wrap">
      <div class="game-progress-bar-fill" style="width: ${((currentIdx + 1) / total) * 100}%;"></div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-size: 0.95rem; font-weight: 800; color: #1e293b;">${q.levelTitle || q.title} (${currentIdx + 1}/${total})</span>
      <span style="font-size: 0.85rem; font-weight: 800; color: #059669; background: #ecfdf5; padding: 3px 10px; border-radius: 999px;">目前得分: ${APP_STATE.gameScore} 分</span>
    </div>

    <div class="game-card-box">
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.6;">${q.scenario}</p>
      <div class="game-options-list">
        ${q.options.map((opt, idx) => `
          <button class="game-opt-btn" onclick="checkGameAnswer(${idx})">
            <span style="font-weight:900; color:#2563eb;">[${opt.key}]</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div id="gameAuditFeedbackBox" class="game-audit-feedback"></div>
    <div style="text-align: right; margin-top: 14px;">
      <button id="btnGameNextLevel" class="btn-nav-step btn-primary-step" style="display: none;" onclick="advanceGameNextLevel()">
        ${currentIdx === total - 1 ? '🎓 查看榮譽結算' : '下一關卡 ➔'}
      </button>
    </div>
  `;
}

function checkGameAnswer(optIndex) {
  if (APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel]) return;
  APP_STATE.gameAnswered[APP_STATE.gameCurrentLevel] = true;

  const currentIdx = APP_STATE.gameCurrentLevel;
  const q = W3_GAME_QUESTIONS[currentIdx];
  const selectedOpt = q.options[optIndex];
  const optButtons = document.querySelectorAll('.game-opt-btn');
  const feedbackBox = document.getElementById('gameAuditFeedbackBox');
  const btnNext = document.getElementById('btnGameNextLevel');

  if (selectedOpt.isCorrect) {
    optButtons[optIndex]?.classList.add('correct');
    APP_STATE.gameScore += 25;
  } else {
    optButtons[optIndex]?.classList.add('wrong');
    q.options.forEach((opt, idx) => {
      if (opt.isCorrect) optButtons[idx]?.classList.add('correct');
    });
  }

  optButtons.forEach(b => b.disabled = true);

  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    feedbackBox.innerHTML = q.explanation;
  }

  if (btnNext) {
    btnNext.style.display = 'inline-block';
  }
}

function advanceGameNextLevel() {
  APP_STATE.gameCurrentLevel++;
  renderDetectiveGameLevel();
}

function renderGameCertificate(container) {
  const pass = APP_STATE.gameScore >= 75;
  container.innerHTML = `
    <div class="certificate-frame">
      <div class="cert-badge-icon">${pass ? '🏅' : '📚'}</div>
      <h3 class="cert-title">${pass ? '生活財金達人榮譽證書' : '財金素養結訓證明'}</h3>
      <p class="cert-sub">115學年度「管理探索二」第三週：利率、央行與我們的荷包</p>
      <div style="margin: 20px 0;">
        <span style="font-size:0.95rem; color:#475569;">頒發予學員：</span>
        <input type="text" id="certStudentName" class="cert-name-input" value="大一新鮮人" placeholder="請輸入您的姓名">
      </div>
      <div style="font-size:1.15rem; font-weight:800; color:#1e293b; margin-bottom:14px;">
        考核總成績：<span style="color:#059669; font-size:1.6rem;">${APP_STATE.gameScore}</span> / 100 分
      </div>
      <p style="font-size:0.85rem; color:#64748b; max-width:480px; margin:0 auto 20px; line-height:1.5;">
        ${pass ? '恭喜！您已成功掌握利率本質、升息換算、0%分期真偽辨識與美聯儲宏觀政策，具備優異的金融防禦素養！' : '您已具備良好的學習基礎，建議回顧投影片複習信用卡循環利息與分期手續費換算，持續深化理財實力！'}
      </p>
      <div style="display:flex; justify-content:center; gap:12px;">
        <button class="btn-nav-step" onclick="initDetectiveGame()">🔄 重新挑戰</button>
        <button class="btn-nav-step btn-primary-step" onclick="window.print()">🖨️ 列印 / 轉存 PDF 證書</button>
      </div>
    </div>
  `;
}

// ==========================================
// 8. 第 3 小時課堂實務作業模組 (Homework Module)
// ==========================================
function initHomeworkForm() {
  const fields = ['hwStudentName', 'hwStudentId', 'hwNewsTitle', 'hwNewsAnalysis', 'hwPersonalImpact', 'hwSavingsPlan', 'hwConclusionGrade', 'hwDecisionSummary'];
  fields.forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      syncHomeworkFromUI();
      saveHomeworkToStorage();
    });
  });

  document.getElementById('btnHwPresetCbc')?.addEventListener('click', () => applyHomeworkPreset(0));
  document.getElementById('btnHwPresetFed')?.addEventListener('click', () => applyHomeworkPreset(1));

  document.getElementById('btnExportJson')?.addEventListener('click', exportHomeworkJson);
  document.getElementById('btnExportMd')?.addEventListener('click', exportHomeworkMarkdown);
  document.getElementById('btnPrintHomework')?.addEventListener('click', () => window.print());
}

function syncHomeworkFromUI() {
  APP_STATE.homeworkData = {
    studentName: document.getElementById('hwStudentName')?.value || '',
    studentId: document.getElementById('hwStudentId')?.value || '',
    newsTitle: document.getElementById('hwNewsTitle')?.value || '',
    newsAnalysis: document.getElementById('hwNewsAnalysis')?.value || '',
    personalImpact: document.getElementById('hwPersonalImpact')?.value || '',
    savingsPlan: document.getElementById('hwSavingsPlan')?.value || '',
    conclusionGrade: document.getElementById('hwConclusionGrade')?.value || 'Highly Defensive',
    decisionSummary: document.getElementById('hwDecisionSummary')?.value || ''
  };
}

function applyHomeworkPreset(index) {
  const p = W3_HOMEWORK_PRESETS[index];
  if (!p) return;

  if (document.getElementById('hwNewsTitle')) document.getElementById('hwNewsTitle').value = p.newsTitle;
  if (document.getElementById('hwNewsAnalysis')) document.getElementById('hwNewsAnalysis').value = p.newsAnalysis;
  if (document.getElementById('hwPersonalImpact')) document.getElementById('hwPersonalImpact').value = p.personalImpact;
  if (document.getElementById('hwSavingsPlan')) document.getElementById('hwSavingsPlan').value = p.savingsPlan;

  syncHomeworkFromUI();
  saveHomeworkToStorage();

  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = `✓ 已成功套用：${p.title}`;
    setTimeout(() => { status.textContent = ''; }, 3000);
  }
}

function saveHomeworkToStorage() {
  localStorage.setItem('agy_w3_homework', JSON.stringify(APP_STATE.homeworkData));
  const status = document.getElementById('hwSaveStatus');
  if (status) {
    status.textContent = '✓ 本地自動儲存中...';
    setTimeout(() => { status.textContent = ''; }, 2000);
  }
}

function loadSavedHomework() {
  try {
    const saved = localStorage.getItem('agy_w3_homework');
    if (!saved) return;
    const data = JSON.parse(saved);
    APP_STATE.homeworkData = data;

    if (document.getElementById('hwStudentName')) document.getElementById('hwStudentName').value = data.studentName || '';
    if (document.getElementById('hwStudentId')) document.getElementById('hwStudentId').value = data.studentId || '';
    if (document.getElementById('hwNewsTitle')) document.getElementById('hwNewsTitle').value = data.newsTitle || '';
    if (document.getElementById('hwNewsAnalysis')) document.getElementById('hwNewsAnalysis').value = data.newsAnalysis || '';
    if (document.getElementById('hwPersonalImpact')) document.getElementById('hwPersonalImpact').value = data.personalImpact || '';
    if (document.getElementById('hwSavingsPlan')) document.getElementById('hwSavingsPlan').value = data.savingsPlan || '';
    if (document.getElementById('hwConclusionGrade')) document.getElementById('hwConclusionGrade').value = data.conclusionGrade || 'Highly Defensive';
    if (document.getElementById('hwDecisionSummary')) document.getElementById('hwDecisionSummary').value = data.decisionSummary || '';
  } catch (e) {
    console.warn('載入本地作業失敗:', e);
  }
}

function exportHomeworkMarkdown() {
  syncHomeworkFromUI();
  const d = APP_STATE.homeworkData;

  const md = `# 管理探索二 第三週課堂作業：央行新聞閱讀與個人 10 萬元存款計畫
- **學生姓名**：${d.studentName || '未填寫'}
- **學號**：${d.studentId || '未填寫'}
- **提交日期**：${new Date().toLocaleDateString('zh-TW')}
- **作業評級**：【${d.conclusionGrade}】

---

### 一、 央行新聞解讀與政策背景分析 (佔比 30%)
- **新聞標題**：${d.newsTitle || '(未填寫)'}
- **決策背景分析**：
${d.newsAnalysis || '(無內容)'}

---

### 二、 對學貸、房租與個人生活收支的實質衝擊 (佔比 30%)
${d.personalImpact || '(無內容)'}

---

### 三、 個人 10 萬元打工儲蓄雙軌配置計畫 (佔比 40%)
${d.savingsPlan || '(無內容)'}

---

### 四、 核心反思與行動總結
${d.decisionSummary || '(無內容)'}
`;

  navigator.clipboard.writeText(md).then(() => {
    alert('已成功將作業報告 Markdown 複製至剪貼簿！');
  }).catch(() => {
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `W3_課堂報告_${d.studentName || '學員'}_${d.studentId || Date.now()}.md`;
    link.click();
  });
}

function exportHomeworkJson() {
  syncHomeworkFromUI();
  const blob = new Blob([JSON.stringify(APP_STATE.homeworkData, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `W3_課堂報告_${Date.now()}.json`;
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
// 10. 鍵盤快捷鍵支援 (Keyboard Shortcuts)
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
