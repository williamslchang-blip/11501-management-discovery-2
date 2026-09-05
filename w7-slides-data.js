/**
 * 115學年度「管理探索二」第七週教學資料庫
 * 單元名稱：個人外匯、匯率變動與國際貿易
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W7_SCHEDULE_TABLE = [
  {
    "hour": "第一小時 (00:00-00:50)",
    "title": "外匯基礎與牌告匯率算術",
    "slides": "Slide 01 - 10",
    "summary": "貨幣相對價格、即期 vs 現金匯率點差、銀行買賣視角、旅遊換匯 3 大管道 (臨櫃/線上結匯/外幣ATM)、雙幣信用卡鎖匯、全台 14 兆外幣存款、美元指數 (DXY) 霸權地位。",
    "activity": "🎯 專屬活動：旅遊與網購換匯點差省錢計算器（輸入換匯金額，精算即期 vs 現金牌告價差與線上結匯省下之台幣）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第二小時 (00:50-01:40)",
    "title": "匯率理論與升貶值雙刃劍",
    "slides": "Slide 11 - 20",
    "summary": "購買力平價説 (大麥克指數 PPP)、利率平價説 (IRP 美台利差)、經常帳貿易流 vs 金融帳資本流、新台幣升值與貶值贏家輸家矩陣、台灣 5,750 億外匯存底、央行柳樹理論、日圓利差交易 (Carry Trade) 與遠期避險。",
    "activity": "🎯 專屬活動：大麥克指數 (PPP) 幣值高低估檢測器（輸入各國大麥克售價與市場匯率，自動計算隱含匯率與幣值高低估幅度）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第三小時 (01:40-02:30)",
    "title": "實證比對與新鮮人外匯實戰",
    "slides": "Slide 21 - 30",
    "summary": "換匯 4 金律、美元定存 5% 賺息賠匯差陷阱、新台幣 27.5 貶至 32.5 對留學學費與 iPhone 實證計算、央行與台銀牌告查核、10% 美元短期配置、跨境網購省錢術、均值回歸、大一 4 大金律。",
    "activity": "🎮 重磅小遊戲：外匯交易達人大挑戰 (4關卡) ＋ 📝 課堂實務作業：自選外幣換匯與升貶值影響報告現場提交",
    "timeAlloc": "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W7_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "第七週課程導論：個人外匯、匯率變動與國際貿易",
    "titleEn": "W7 Slide 01: Introduction to Personal Forex, Exchange Rates & Global Trade",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 01 (Hour 1)",
    "teachingNotes": "本頁為第七週課程導論。講師可以引用諾貝爾經濟學獎得主薩繆爾森 (Paul Samuelson) 名言開場：「匯率是連繫一國經濟與世界經濟最敏感的神經網絡！」針對大一新鮮人出國旅遊換外幣（日圓、美金、韓元）、Amazon/淘寶跨境網購或關注台積電出口新聞切入。說明許多學生不明白為什麼牌告看板會有四個價格，也不明白台幣升值或貶值對自己口袋裡的錢有何實質影響。本單元將帶領大家拆解個人外匯與國際貿易，建立宏觀與微觀兼具的外匯視野。\n\n【官方數據】：中央銀行 (CBC) 外匯局 / 臺灣銀行 (Bank of Taiwan) 牌告匯率發布說明。",
    "discussionQuestion": "問學生：『同學們大學期間有沒有計畫出國旅遊或留學？大家換外幣時最擔心遇到什麼問題？』",
    "discussionQuestionEn": "Ask students: 'Do you plan to travel abroad or study overseas during college? What worries you most when exchanging foreign currencies?'",
    "quickTakeaways": [
      "理解匯率是兩種主權貨幣之間的相對價格，連繫全球經濟神經網路",
      "跨出新台幣舒適圈，看懂出國旅遊、跨境網購與出口企業之匯率關聯",
      "建立獨立看懂銀行牌告四個價格之量化換算能力與省錢習慣"
    ],
    "quickTakeawaysEn": [
      "Understand exchange rates as relative prices connecting national and global economies",
      "Step outside the TWD bubble to evaluate travel, e-commerce, and corporate trade impacts",
      "Master bank rate boards to compare cash vs spot rates and eliminate unnecessary spreads"
    ],
    "visualType": "w7_slide_01"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "第七週 3 小時學習地圖與核心技能樹",
    "titleEn": "W7 Slide 02: 3-Hour Learning Roadmap & Core Skill Tree",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 02 (Hour 1)",
    "teachingNotes": "本頁為學生構建本週 3 小時的完整學習導航地圖。第一小時解密外匯基礎、即期 vs 現金匯率點差、銀行買賣視角、旅遊換匯 3 大管道、雙幣信用卡鎖匯與美元指數 DXY 霸權；第二小時聚焦於購買力平價説 (大麥克指數 PPP)、美台利差 (IRP)、新台幣升值與貶值贏家輸家對決、央行 5,750 億美元外匯存底水庫、柳樹理論與日圓利差交易；第三小時則傳授換匯 4 金律、美元高利定存匯損風險、台幣 27.5 貶至 32.5 留學 iPhone 實證對決、10% 美元配置與均值回歸思維。\n\n【官方數據】：115學年度「管理探索二」課程計畫與學習進度規劃網要。",
    "discussionQuestion": "引導學生劃出本週最感興趣的三大外匯關鍵字（如：即期匯率、大麥克指數、日圓套利）。",
    "discussionQuestionEn": "Guide students to circle 3 core forex keywords (e.g., Spot Rate, Big Mac PPP, JPY Carry Trade).",
    "quickTakeaways": [
      "第一小時 (外匯與牌告算術)、第二小時 (匯率理論與升貶值)、第三小時 (實證與配置實戰)",
      "掌握即期換匯、大麥克指數檢測、日圓利差交易與美金定存避險技能",
      "完成課堂實務作業：自選外幣換匯與升貶值影響報告"
    ],
    "quickTakeawaysEn": [
      "Hour 1: Forex & Rate Board Math; Hour 2: Theory & FX Dynamics; Hour 3: Empirical Strategy",
      "Acquire practical tools: Spot spreads, Big Mac PPP valuation, carry trade, FX hedging",
      "Deliver the classroom report: Personal Currency Exchange & FX Impact Analysis"
    ],
    "visualType": "w7_slide_02"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "什麼是匯率？(Exchange Rate: 兩種貨幣的相對價格)",
    "titleEn": "W7 Slide 03: What Is an Exchange Rate? The Relative Price of Two Currencies",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 03 (Hour 1)",
    "teachingNotes": "詳細拆解匯率 (Exchange Rate) 的定義。匯率是兩種貨幣之間的相對比價。以美金兌新台幣 (USD/TWD = 32.5) 為例，代表買進 1 美元需要支付 32.5 元新台幣。對比新台幣升值 (Appreciation) 與貶值 (Depreciation) 的定義：USD/TWD 從 32.5 降至 30.0 代表台幣變強（升值，只需 30 元換 1 美元）；從 32.5 升至 35.0 代表台幣變弱（貶值，需 35 元換 1 美元）。澄清大一學生最容易搞混的「數字升降與貨幣強弱反向關係」。\n\n【官方數據】：中央銀行 (CBC) 外匯局每日匯率發布說明。",
    "discussionQuestion": "提問：『當 USD/TWD 數字從 32.5 變成 30.0 時，代表新台幣是升值還是貶值？（答案：升值！）』",
    "discussionQuestionEn": "Question: 'When USD/TWD drops from 32.5 to 30.0, did the TWD appreciate or depreciate? (Answer: Appreciated!)'",
    "quickTakeaways": [
      "匯率本質為兩種主權貨幣之間的交換比率 (如 1 USD = 32.5 TWD)",
      "USD/TWD 數字下降 = 新台幣升值 (買美元更便宜，台幣購買力增強)",
      "USD/TWD 數字上升 = 新台幣貶值 (買美元更昂貴，台幣購買力減弱)"
    ],
    "quickTakeawaysEn": [
      "Exchange rate measures the price of one currency in terms of another (e.g., 1 USD = 32.5 TWD)",
      "USD/TWD decline = TWD appreciation (cheaper to acquire USD; stronger domestic purchasing power)",
      "USD/TWD increase = TWD depreciation (more expensive to acquire USD; weaker domestic currency)"
    ],
    "visualType": "w7_slide_03"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "揭開銀行牌告匯率看板：即期匯率 (Spot) vs. 現金匯率 (Cash)",
    "titleEn": "W7 Slide 04: Decoding the Bank Rate Board: Spot Rates vs. Cash Rates",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 04 (Hour 1)",
    "teachingNotes": "對比銀行牌告看板上的「即期匯率 (Spot Rate)」與「現金匯率 (Cash Rate)」。即期匯率是電子外幣帳戶數字交割（在手機 App 上把台幣轉入外幣帳戶），銀行不需負擔實體現鈔的跨境空運、防彈押運、金庫保險、破損銷毀與利息資金積壓成本，因此匯率最優惠；現金匯率是去臨櫃提取或點交實體紙鈔，銀行將上述龐大現鈔管理成本加計在買賣點差中，因此現金匯率較貴。教導大一新鮮人平時先在 App 用即期匯率分批換好外幣，出國前再領現鈔。\n\n【官方數據】：臺灣銀行 (Bank of Taiwan) 牌告匯率收費標準說明。",
    "discussionQuestion": "請學生算一算：『如果在 App 用即期匯率換 10 萬日圓比去臨櫃用現金匯率便宜 200 元台幣，這 200 元可以在日本多吃什麼？』",
    "discussionQuestionEn": "Math check: 'If mobile spot exchange saves NT$200 on 100k Yen vs cash counter rates, what can you buy in Tokyo with that savings?'",
    "quickTakeaways": [
      "即期匯率 (Spot)：電子帳戶數字交割，零現鈔保管運送成本，匯率最優惠",
      "現金匯率 (Cash)：實體紙鈔現鈔點交，內含保險、押運與防偽成本，點差較大",
      "精明換匯：平時在手機 App 以即期匯率逢低買進，出國前再按需提領現鈔"
    ],
    "quickTakeawaysEn": [
      "Spot Rate: Digital book entry transfer with zero physical cash handling cost; superior pricing",
      "Cash Rate: Physical banknote transactions embedding vault insurance, logistics, and counterfeit risks",
      "Smart strategy: Accumulate foreign currency via mobile spot rates, withdrawing cash only before departure"
    ],
    "visualType": "w7_slide_04"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "買入價 (Bank Buy) vs. 賣出價 (Bank Sell) 的銀行視角點差",
    "titleEn": "W7 Slide 05: Bank Buy vs. Bank Sell: The Bank-Perspective Bid-Ask Spread",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 05 (Hour 1)",
    "teachingNotes": "解決大一新鮮人看匯率看板時最常搞混的盲點——永遠從「銀行的視角」看！銀行賣出價 (Bank Sell)：你拿新台幣向銀行買外幣（銀行賣給你），價格較貴；銀行買入價 (Bank Buy)：你拿外幣賣回給銀行換台幣（銀行向你買），價格較便宜。兩者之間的差額即為「銀行買賣點差利潤 (Bid-Ask Spread)」。結論：買了外幣若立刻賣回給同一家銀行，因為點差的存在會立刻產生虧損！因此短期內用不到的外幣切勿頻繁買賣。\n\n【官方數據】：臺灣銀行 (Bank of Taiwan) 牌告匯率買賣價標準定義。",
    "discussionQuestion": "強調：『牌告看板上的【買入】是指銀行向你買，【賣出】是指銀行賣給你，千萬不要搞錯角色！』",
    "discussionQuestionEn": "Rule: 'Bank Buy means the bank buys from you; Bank Sell means the bank sells to you—never reverse the perspective!'",
    "quickTakeaways": [
      "牌告看板名詞皆以『銀行主體視角』定價，非顧客視角",
      "本國存戶換外幣看【本行賣出價】(價格較貴)；回國剩餘外幣換回台幣看【本行買入價】(價格較便宜)",
      "買賣價差 (Spread) 為銀行的手續利潤，頻繁短線來回換匯必然被點差侵蝕本金"
    ],
    "quickTakeawaysEn": [
      "Rate board terms are quoted from the bank's commercial vantage point, not the customer's",
      "Acquiring foreign currency looks at 'Bank Sell' (higher); converting back looks at 'Bank Buy' (lower)",
      "The bid-ask spread is bank gross margin; rapid round-trip conversions guarantee spread losses"
    ],
    "visualType": "w7_slide_05"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "實戰旅遊換匯 3 大管道：臨櫃換鈔 vs. 線上結匯 vs. 外幣 ATM",
    "titleEn": "W7 Slide 06: Top 3 Practical Travel Exchange Channels: Branch, Online & Forex ATMs",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 06 (Hour 1)",
    "teachingNotes": "評比大一學生出國旅遊換外幣的 3 大實務管道：1. 銀行臨櫃換鈔：按「現金賣出價」，點差最貴且非存戶常需額外支付 100 元手續費，需配合銀行 15:30 營業時間，適合臨時急用；2. 線上結匯 (指定機場提領)：在臺灣銀行或兆豐銀行網站用「即期優惠價」預訂並於桃園機場出境櫃檯提領，免手續費且最省錢省時；3. 外幣 ATM 提領：持任一家銀行金融卡至指定外幣 ATM，24 小時隨時提領日圓或美元現鈔，享有現鈔賣出價讓分優惠，免臨櫃排隊。\n\n【官方數據】：兆豐銀行 & 臺灣銀行外匯出國結匯服務指引。",
    "discussionQuestion": "問學生：『如果你搭乘明天清晨 6 點的紅眼班機去東京，最推薦使用哪一種換匯管道提領日圓現鈔？』",
    "discussionQuestionEn": "Question: 'If taking a 6:00 AM red-eye flight to Tokyo, which channel is optimal for picking up Yen banknotes?'",
    "quickTakeaways": [
      "臨櫃換鈔最貴且需排隊，適合極少數突發緊急狀況",
      "線上結匯最推薦：享有即期減分優惠，免收手續費，可於桃機 24 小時出境櫃檯領取",
      "外幣 ATM 最方便：持金融卡 24 小時隨時提領現鈔，享點差折扣"
    ],
    "quickTakeawaysEn": [
      "Branch tellers charge the widest cash spreads plus potential $100 fees—least cost-effective",
      "Online preorder (e.g., Bank of Taiwan airport pickup) yields spot discounts and zero handling fees",
      "Forex ATMs provide 24/7 self-service cash withdrawals with modest discounts off the cash rate"
    ],
    "visualType": "w7_slide_06"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "雙幣信用卡 (Dual Currency Card) 的扣款機制與鎖匯優勢",
    "titleEn": "W7 Slide 07: Dual Currency Cards: Settlement Mechanics & FX Hedging Advantages",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 07 (Hour 1)",
    "teachingNotes": "介紹專門為旅遊與外匯愛好者量身打造的「雙幣信用卡 (Dual Currency Card)」。雙幣卡同時綁定持卡人的新台幣帳戶與指定外幣帳戶（如美元、日圓或歐元）。國內消費自動扣繳新台幣，國外消費直接從外幣帳戶扣除外幣！最大戰略優勢在於「鎖定低點匯率 (Lock-in FX Rate)」：當你發現日圓處於歷史相對低點（如 0.20~0.21）時，平時在手機 App 上用即期匯率買好日圓存放在外幣帳戶；半年後去日本旅遊刷雙幣卡，直接扣除這筆便宜日圓，完全免受出國當下匯率暴漲的風險。\n\n【官方數據】：玉山銀行與國泰世華雙幣信用卡業務公告與鎖匯說明。",
    "discussionQuestion": "提問：『如果你預計半年後要去日本畢業旅行，看到現在日圓創下歷史低點，你會怎麼利用雙幣卡超前部署？』",
    "discussionQuestionEn": "Question: 'If taking a grad trip to Japan in 6 months during historic low Yen, how do you deploy a dual currency card to lock in rates?'",
    "quickTakeaways": [
      "雙幣卡綁定台幣與外幣雙帳戶：國內扣台幣，國外消費直接扣外幣帳戶餘額",
      "核心優勢在於『低檔鎖匯』：平時逢低分批用即期價買好外幣，旅遊時免受匯率上漲風險",
      "注意：外幣帳戶需有足額外幣，若餘額不足會自動以當時不利匯率代扣台幣"
    ],
    "quickTakeawaysEn": [
      "Dual currency cards link TWD and FX accounts: domestic in TWD, foreign directly from FX balances",
      "Core advantage is rate lock-in: buy currencies during dips to insulate yourself from future spikes",
      "Caution: Maintain adequate FX balances, or the bank will convert TWD at unfavorable penalty spot rates"
    ],
    "visualType": "w7_slide_07"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "實證數據：全台外幣存款突破 14 兆新台幣",
    "titleEn": "W7 Slide 08: Empirical Data: Taiwan Foreign Currency Deposits Surpass NT$14 Trillion",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 08 (Hour 1)",
    "teachingNotes": "引述中央銀行最新官方統計，揭示全台國人與企業外幣存款總額已創下歷史新高，正式突破新台幣 14.2 兆元（佔全體銀行總存款近三成）。深入解析台灣民眾的外幣持有幣別結構：第一名為美元 (USD, 佔比超過 70%)，主因是美元身為全球儲備貨幣、高利率美金定存 (4%~5%) 誘因與海外美股/美債投資熱潮；第二名為日圓 (JPY, 佔比約 15%)，主因是台灣人熱愛赴日旅遊、日圓長期貶值引發全民逢低囤積外幣；其餘為人民幣 (CNY)、歐元 (EUR) 與澳幣 (AUD)。\n\n【官方數據】：中央銀行 (CBC) 外匯局 2026 全體金融機構外幣存款統計月報。",
    "discussionQuestion": "提問：『為什麼台灣人手裡握有高達 14 兆元的外幣？大家存美元主要是為了賺利息還是為了分散台幣風險？』",
    "discussionQuestionEn": "Question: 'Why do Taiwanese hold over NT$14T in foreign currency? Is it yield arbitrage or geopolitical diversification?'",
    "quickTakeaways": [
      "全台外幣存款突破 14.2 兆元新台幣，佔整體存款比例接近三成，創歷史新高",
      "外幣持有結構：美元霸權佔比 > 70%，日圓佔比約 15%，其餘為歐元與人民幣",
      "國人持有外幣主因：海外資產配置、美金高利定存利差、以及旅遊逢低備用"
    ],
    "quickTakeawaysEn": [
      "Taiwan FX deposits hit a historic record of NT$14.2T, comprising nearly 30% of total bank deposits",
      "Currency breakdown: USD dominance exceeds 70%, JPY accounts for ~15%, followed by EUR and CNY",
      "Primary drivers: Global portfolio allocation, US yield advantage, and travel savings buffers"
    ],
    "visualType": "w7_slide_08"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "美元指數 (DXY) 與全球貨幣的連動王者地位",
    "titleEn": "W7 Slide 09: The U.S. Dollar Index (DXY): The Anchor of Global Currencies",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 09 (Hour 1)",
    "teachingNotes": "介紹外匯市場最重要的風向標——美元指數 (U.S. Dollar Index, DXY)。DXY 創立於 1973 年，是衡量美元兌全球 6 大主要貨幣綜合強弱的加權幾何平均指數。權重組成：歐元 (EUR) 佔比最大高達 57.6%、日圓 (JPY) 佔 13.6%、英鎊 (GBP) 佔 11.9%、加幣 (CAD) 佔 9.1%、瑞典克朗 (SEK) 佔 4.2%、瑞士法郎 (CHF) 佔 3.6%。市場連動規律：當美元指數走強 (DXY > 105) 時，全球資金回流美國，非美貨幣（台幣、日圓、歐元）普遍面臨貶值壓力；當 DXY 回落，資金外溢至新興市場推升台幣升值。\n\n【官方數據】：洲際交易所 (ICE) 美元指數編算手冊與歷史走勢說明。",
    "discussionQuestion": "引導思考：『當新聞報導「美元指數突破 106 創波段新高」時，你可以合理預期新台幣兌美元會升值還是貶值？』",
    "discussionQuestionEn": "Forecasting: 'When financial news reports DXY breaking 106, should you expect the TWD to appreciate or depreciate?'",
    "quickTakeaways": [
      "美元指數 (DXY) 衡量美元對一籃子 6 大主要先進國家貨幣的綜合強弱",
      "歐元權重最高 (57.6%)，其次為日圓 (13.6%) 與英鎊 (11.9%)",
      "DXY 走強代表全球資金擁抱美元避險，非美貨幣 (包括新台幣) 面臨普遍貶值壓力"
    ],
    "quickTakeawaysEn": [
      "The U.S. Dollar Index (DXY) tracks the greenback against a basket of 6 major global currencies",
      "Heavily weighted toward the Euro (57.6%), followed by the Japanese Yen (13.6%) and British Pound (11.9%)",
      "A surging DXY signals capital retrenchment into USD assets, applying broad depreciation pressure on non-USD currencies"
    ],
    "visualType": "w7_slide_09"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "第一小時 ‧ 外匯基礎與牌告算術",
    "categoryEn": "Hour 1: Forex Basics & Exchange Rate Math",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "W7 Slide 10: Hour 1 Summary & Exclusive Activity Preview",
    "subtitle": "115學年度 第七週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 7 Module 10 (Hour 1)",
    "teachingNotes": "總結第一小時核心觀念：匯率是兩種貨幣相對價格；即期匯率因無現鈔成本比現金匯率便宜得多；看牌告看板永遠從銀行角度看；出國換匯善用線上結匯與雙幣信用卡鎖匯；掌握全台 14 兆外幣存款結構與美元指數 DXY 霸權。預告第 1 小時 Modal 實務體驗活動——「旅遊與網購換匯點差省錢計算器」，請學生輸入預計換匯金額，精算即期 vs 現金換匯能為自己省下多少台幣大餐錢。\n\n【官方數據】：115學年度「管理探索二」課程組全景圖。",
    "discussionQuestion": "指導學生點擊導覽列「🎯 1小時: 換匯點差計算」按鈕，準備進行換匯點差省錢試算演練。",
    "discussionQuestionEn": "Direct students to click 'Hr 1: Exchange Calculator' on the navbar to simulate spot vs cash rate savings.",
    "quickTakeaways": [
      "第一小時里程碑達成：掌握牌告匯率買賣點差與即期換匯省錢密碼",
      "告別臨櫃高額現金點差，善用線上結匯與雙幣卡低檔鎖匯",
      "開啟第 1 小時專屬計算器，輸入旅遊預算實戰計算能省下幾碗日本拉麵"
    ],
    "quickTakeawaysEn": [
      "Hour 1 Milestone reached: Mastered exchange rate boards and bid-ask spread mechanics",
      "Eliminated expensive counter cash spreads via online preorders and dual-currency card locking",
      "Launch the Hour 1 Exchange Calculator to quantify exact dollar savings on travel budgets"
    ],
    "visualType": "w7_slide_10"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "購買力平價説 (PPP) 與經濟學人「大麥克指數」",
    "titleEn": "W7 Slide 11: Purchasing Power Parity (PPP) & The Economist's Big Mac Index",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 11 (Hour 2)",
    "teachingNotes": "詳細講授古典國際金融基石——購買力平價説 (Purchasing Power Parity, PPP) 與英國《經濟學人》創立的趣味化「大麥克指數 (Big Mac Index)」。PPP 理論基於「單一價格法則 (Law of One Price)」：在自由貿易與無運輸成本假設下，全球完全相同的商品經匯率換算後價格應相等。算術實例：台灣麥當勞大麥克售價 75 元新台幣，美國大麥克售價 5.60 美元。`PPP 隱含均衡匯率 = 75 / 5.60 = 13.39 TWD/USD`。對比當前實際市場匯率 32.5：`(13.39 - 32.5) / 32.5 = -58.8%`！代表依大麥克實體購買力衡量，新台幣在名目匯率上被大幅低估了近六成！\n\n【官方數據】：英國《經濟學人》(The Economist) 官方 Big Mac Index 最新報告。",
    "discussionQuestion": "問學生：『如果在台灣買一個大麥克要 75 元，在美國要 5.6 美元 (約 182 元台幣)，這說明台灣的實體物價生活成本比美國便宜還是貴？』",
    "discussionQuestionEn": "Question: 'If a Big Mac costs NT$75 in Taipei but $5.60 (~NT$182) in the US, what does this say about living costs?'",
    "quickTakeaways": [
      "購買力平價説 (PPP)：長期而言各國貨幣匯率應反映實體商品的實質購買力",
      "大麥克指數公式：PPP 隱含匯率 = 本國大麥克價格 / 美國大麥克價格",
      "高低估判定：若實際匯率高於 PPP 隱含匯率，代表該國貨幣被市場實質低估"
    ],
    "quickTakeawaysEn": [
      "Purchasing Power Parity (PPP) posits that long-term exchange rates adjust to equalize purchasing power",
      "Big Mac Index formula: Implied PPP Rate = Local Big Mac Price / US Big Mac Price",
      "Valuation metric: A market rate higher than the implied PPP rate signals currency undervaluation"
    ],
    "visualType": "w7_slide_11"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "利率平價説 (IRP)：美台利差與資金跨國搬家",
    "titleEn": "W7 Slide 12: Interest Rate Parity (IRP): The US-Taiwan Yield Gap & Capital Flight",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 12 (Hour 2)",
    "teachingNotes": "剖析現代短期匯率波動的主宰理論——利率平價説 (Interest Rate Parity, IRP)。全球熱錢永遠追逐最高無風險報酬率。當美國聯準會 (Fed) 升息使美國基準利率高達 5.25%，而台灣央行因物價相對平穩僅將利率升至 2.0% 時，美台利差擴大高達 3.25 個百分點！這引發巨大的跨國資金搬家效應：外資機構、本國壽險公司與台灣散戶紛紛賣出台幣、換成美元，存入美國高利定存或大買美國國債。市場上排山倒海的「拋售台幣、搶購美元」力量，將 USD/TWD 匯率從 30.0 一路推升貶值至 32.5。\n\n【官方數據】：中央銀行 (CBC) 理監事會議美台利差與國際收支統計分析報告。",
    "discussionQuestion": "提問：『如果你手上有 100 萬存款，放在台灣銀行存定存利率 1.7%，放在美國銀行存定存利率 5.0%，你會想把錢搬去哪裡？這對新台幣匯率造成什麼影響？』",
    "discussionQuestionEn": "Question: 'If Taiwan yields 1.7% and US yields 5.0%, where does capital flow? How does this impact the TWD?'",
    "quickTakeaways": [
      "利率平價説 (IRP)：資金跨國流動取決於兩國無風險利率利差與預期匯率變動",
      "美台利差擴大 (美高台低) 時，資金賣台幣換美元，形成新台幣龐大貶值壓力",
      "現代外匯市場中，金融資本流對短期匯率的衝擊力遠大於實體進出口貿易"
    ],
    "quickTakeawaysEn": [
      "Interest Rate Parity (IRP) governs capital flows chasing risk-adjusted real interest rate differentials",
      "When US yields widen over Taiwan, capital abandons TWD for USD, sparking structural TWD depreciation",
      "In modern markets, cross-border financial capital flows dwarf trade flows in dictating short-term FX moves"
    ],
    "visualType": "w7_slide_12"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "影響匯率供需的兩大力量：進出口貿易流 vs. 跨國資本投資流",
    "titleEn": "W7 Slide 13: Twin Forces of FX Demand: Current Account Trade vs. Financial Account Capital",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 13 (Hour 2)",
    "teachingNotes": "深入對比決定外匯供需天秤的兩大水龍頭：1. 經常帳貿易流 (Current Account Trade Flows)：台灣出口導向企業（台積電、聯發科、鴻海）賺取巨額美元外匯，年底需將美元結算賣出換回新台幣以發放員工年終獎金與繳稅，這股買進台幣的力量推動新台幣升值；2. 金融帳資本流 (Financial Account Capital Flows)：國際對沖基金買賣台股、台灣散戶與壽險業大買海外債券 ETF。重點強調：全球外匯市場每日交易量高達 7.5 兆美元，其中超過 95% 屬於投機與金融資產調撥的資本流，實體貿易流僅佔不到 5%！\n\n【官方數據】：中央銀行 (CBC) 國際收支帳 (Balance of Payments) 與國際清算銀行 (BIS) 報告。",
    "discussionQuestion": "引導思考：『當外資在台股一天大賣 500 億並將資金匯出台灣時，當天新台幣是會急升還是急貶？』",
    "discussionQuestionEn": "Thought experiment: 'When foreign funds dump NT$50B of Taiwan stocks in a single day and remit out, does TWD spike or dive?'",
    "quickTakeaways": [
      "貿易流 (經常帳)：出口商賣美元買台幣 (推升升值)；進口商賣台幣買美元 (推升貶值)",
      "資本流 (金融帳)：外資熱錢進出台股與本國資金買美債，佔外匯市場 95% 以上交易量",
      "短線匯率受金融熱錢與市場情緒主導，長線匯率回歸基本面貿易競爭力"
    ],
    "quickTakeawaysEn": [
      "Trade flows (Current Account): Exporters sell USD for TWD; importers sell TWD for foreign currencies",
      "Capital flows (Financial Account): Foreign portfolio inflows and bond buying account for 95%+ of volume",
      "Short-term FX volatility is dictated by capital sentiment, while long-term trends reflect productivity"
    ],
    "visualType": "w7_slide_13"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "新台幣升值 (Appreciation) 的贏家與輸家分析",
    "titleEn": "W7 Slide 14: TWD Appreciation Dynamics: Who Wins & Who Loses?",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 14 (Hour 2)",
    "teachingNotes": "客觀深入剖析新台幣升值（如 USD/TWD 從 32.5 強勢升值至 28.0）對整體社會經濟的雙刃劍影響。新台幣升值的大贏家：1. 出國旅遊與留學的國人（換美金日圓大幅便宜，生活費負擔大減）；2. 原物料進口商與廣大民眾（進口原油、天然氣、小麥與進口車變便宜，有效壓制國內通膨）。新台幣升值的大輸家：出口製造業（機械、紡織、電子組裝廠），外銷以美元報價，換回新台幣營收大幅縮水，財報認列鉅額匯兌損失 (FX Loss)，在國際市場上的價格競爭力慘遭削弱。\n\n【官方數據】：經濟部與國家發展委員會 (NDC) 匯率變動對產業衝擊評估報告。",
    "discussionQuestion": "提問：『當新台幣強烈升值時，去日本玩的大學部同學很開心，但新竹科學園區與台中精密機械的老闆為什麼會愁眉苦臉？』",
    "discussionQuestionEn": "Question: 'When the TWD surges, college travelers rejoice, but why do tech park export executives lose sleep?'",
    "quickTakeaways": [
      "升值贏家：出國旅遊者、海外留學生、進口原物料業者、壓低國內輸入型通膨",
      "升值輸家：出口創匯企業 (營收換回台幣縮水)、國際價格競爭力下降、認列巨額匯損",
      "匯率是一把雙刃劍，升值並非絕對好，貶值亦非絕對壞，端看經濟體結構"
    ],
    "quickTakeawaysEn": [
      "Appreciation Winners: Outbound travelers, overseas students, commodity importers; tames inflation",
      "Appreciation Losers: Export-driven manufacturing (slashes margins), international price competitiveness drops",
      "Exchange rates are a double-edged sword: appreciation is neither purely beneficial nor entirely harmful"
    ],
    "visualType": "w7_slide_14"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "新台幣貶值對出口產業 (台積電) 與進口物價的影響",
    "titleEn": "W7 Slide 15: TWD Depreciation: Boosting TSMC Exports vs. Fueling Imported Inflation",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 15 (Hour 2)",
    "teachingNotes": "詳細分析新台幣貶值（如 USD/TWD 從 30.0 貶值至 33.0）的實質衝擊。對出口龍頭台積電 (TSMC) 的巨大紅利：台積電先進製程晶圓代工全球報價 100% 以美元計價。依據台積電法說會財務敏感度模型：新台幣兌美元每貶值 1 元新台幣，台積電營業利益率 (Operating Margin) 即可提升約 0.4 個百分點，換算每季額外進帳數十億元利潤！但對一般老百姓的負面代價是「輸入型通貨膨脹 (Imported Inflation)」：台灣能源 97% 仰賴進口，台幣貶值使中油進口原油、台電進口燃煤成本暴增，直接推升國內電價、加油費與民生物資價格。\n\n【官方數據】：台積電 (TSMC) 官方法人說明會財務敏感度分析與經濟部能源署月報。",
    "discussionQuestion": "問學生：『台幣貶值雖然讓台積電財報獲利大爆發，但為什麼一般老百姓在夜市買排骨便當或去加油時，會覺得荷包變扁了？』",
    "discussionQuestionEn": "Question: 'TWD depreciation boosts TSMC profit margins, but why does it pinch everyday citizens at gas stations and food stalls?'",
    "quickTakeaways": [
      "台積電晶圓代工 100% 美元計價：台幣每貶 1 元，營業利益率提升約 0.4%",
      "代價是輸入型通膨：進口原油、糧食、iPhone 價格暴漲，侵蝕民眾實質購買力",
      "貶值有利於少數出口科技巨頭財報，但由全體受薪階級承擔更高生活物價代價"
    ],
    "quickTakeawaysEn": [
      "TSMC wafer sales are 100% USD-denominated: each 1 TWD depreciation lifts operating margin by ~0.4%",
      "The tradeoff is imported inflation: imported crude oil, grains, and electronics surge in retail price",
      "Depreciation subsidizes tech export giants while imposing a purchasing power tax on everyday wage earners"
    ],
    "visualType": "w7_slide_15"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "央行外匯存底 (FX Reserves) 的功用與台灣 5,700 億美元實力",
    "titleEn": "W7 Slide 16: Central Bank FX Reserves & Taiwan's US$570 Billion Fortress",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 16 (Hour 2)",
    "teachingNotes": "介紹台灣安然挺過 1997 亞洲金融風暴、2008 全球金融海嘯與地緣政治考驗的國家級定海神針——外匯存底 (Foreign Exchange Reserves)。外匯存底是中央銀行持有的外幣資產總和（以美國高評級公債、流動外幣與黃金為主）。台灣外匯存底最新高達 5,750 億美元，穩居全球第五大至第六大！兩大核心戰略功能：1. 支付國際貿易進口清償保證（即使遭遇外部封鎖，儲備亦足以支應台灣超過 18 個月的進口需求）；2. 危機時匯率防護盾：當國際投機熱錢惡意放空台幣時，央行能動用外匯存底在市場拋售美元、買進台幣，強勢擊潰金融巨鱷。\n\n【官方數據】：中央銀行 (CBC) 外匯局 2026 最新外匯存底統計新聞稿。",
    "discussionQuestion": "提問：『台灣國際處境特殊，為什麼能靠著 5,700 億美元的外匯存底水庫在國際金融評級中獲得 AA+ 的超強信任度？』",
    "discussionQuestionEn": "Question: 'Despite geopolitical challenges, how does a $570B reserve cushion secure Taiwan's sovereign AA+ credit rating?'",
    "quickTakeaways": [
      "台灣外匯存底突破 5,750 億美元，名列全球第 5~6 大，為國家最堅固之金融防空洞",
      "保障進口支付：足以支應台灣超過 1.5 年以上的糧食、石油與軍工進口支付需求",
      "抵禦熱錢攻擊：央行擁有巨量美元銀彈阻擊外資禿鷹放空，捍衛新台幣金融穩定"
    ],
    "quickTakeawaysEn": [
      "Taiwan FX reserves exceed US$575B (ranking 5th-6th globally), forming an unassailable financial fortress",
      "Import coverage: Sufficient to fund over 18 months of essential energy, food, and industrial imports",
      "Anti-speculation arsenal: Arms the central bank with massive ammunition to squash predatory currency attacks"
    ],
    "visualType": "w7_slide_16"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "央行匯率政策：柳樹理論 (Willow Tree Policy) 與動態穩定",
    "titleEn": "W7 Slide 17: Central Bank FX Policy: The 'Willow Tree' Dynamic Stability Doctrine",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 17 (Hour 2)",
    "teachingNotes": "講述台灣中央銀行歷任總裁奉為圭臬的經典匯率戰略哲學——「柳樹理論 (Willow Tree Policy)」。台灣是小型高度開放經濟體，匯率制度採取「有管理的浮動匯率制 (Managed Float)」。央行認為匯率應當像柳樹的枝條一樣，順應國際美元強弱與全球經濟大勢「隨風自然擺動」，不硬性死盯固定匯率（否則會像僵硬的枯樹幹一樣被狂風折斷）；但當外資投機熱錢暴進暴出、導致新台幣出現異常劇烈波動時，央行會在每日尾盤進場「拉尾盤」逆風調節，撫平過度波動，維持新台幣實質匯率的動態穩定。\n\n【官方數據】：中央銀行 (CBC) 匯率政策與金融穩定專案報告。",
    "discussionQuestion": "問學生：『為什麼央行希望匯率像柔軟的柳樹枝條一樣隨風擺動，而不是像粗壯的大樹幹一樣硬碰硬死守不變？』",
    "discussionQuestionEn": "Question: 'Why does the CBC want FX rates to bend like willow branches rather than rigidly standing like stiff trunks?'",
    "quickTakeaways": [
      "有管理的浮動匯率：順應國際美元趨勢自然調節，不硬性死守固定匯率",
      "柳樹理論：平時隨風擺動吸收外部衝擊，狂風巨浪時央行逆風調節熨平波動",
      "目標在於『動態穩定』：為台灣出口商與進口企業提供穩定可預測之經貿環境"
    ],
    "quickTakeawaysEn": [
      "Managed Floating Regime: Flexible adjustment guided by market forces without rigid pegs",
      "Willow Tree Doctrine: Bends with international winds to absorb shocks; intervenes during excessive turbulence",
      "Prime objective: Dynamic stability to provide an orderly, predictable environment for international commerce"
    ],
    "visualType": "w7_slide_17"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "日圓貶值 (JPY) 狂潮：利差交易 (Carry Trade) 運作與旅遊效應",
    "titleEn": "W7 Slide 18: The JPY Plunge: Carry Trade Unwinding Mechanics & Tourism Booms",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 18 (Hour 2)",
    "teachingNotes": "解密日圓兌新台幣一度跌破 0.21 創 30 年新低的背後金融巨浪——日圓利差交易 (JPY Carry Trade)。日本央行 (BOJ) 過去 20 年長期維持零利率或負利率政策，而美國聯準會暴力升息至 5.25%。全球大型對沖基金發起套利大遷徙：借貸成本幾乎為 0% 的日圓 ➔ 在外匯市場全數拋售換成美元 ➔ 存入美國銀行或買入 5% 美債，無痛淨賺 5% 利差！全球數兆美元拋售日圓的力量導致日圓慘烈暴跌，並在台灣引發「全民赴日旅遊搶購、瘋買日本房產」的歷史性狂潮；然而一旦日本央行升息，利差交易平倉將引發全球股市劇烈震盪！\n\n【官方數據】：日本銀行 (BOJ) 與國際清算銀行 (BIS) 跨境利差交易研究統計。",
    "discussionQuestion": "提問：『當日圓兌台幣從 0.30 暴跌至 0.21 時，去日本買一雙 10,000 日圓的球鞋，換算成台幣相當於打了幾折？（答案：相當於從 3,000 元降至 2,100 元，現省 30%！）』",
    "discussionQuestionEn": "Math: 'When Yen drops from 0.30 to 0.21, a 10,000 JPY pair of sneakers drops from NT$3,000 to NT$2,100—what is the discount?'",
    "quickTakeaways": [
      "日圓利差交易 (Carry Trade)：借超低利日圓 ➔ 換美元 ➔ 買 5% 美債賺取穩定利差",
      "天量拋售日圓使日圓兌台幣跌破 0.21，引爆台灣民眾赴日旅遊購物超級性價比",
      "反向警訊：當日本升息縮減利差時，熱錢平倉買回日圓將引發全球金融市場震盪"
    ],
    "quickTakeawaysEn": [
      "JPY Carry Trade: Borrow zero-rate Yen ➔ remitted to USD ➔ buy 5% US Treasuries for risk-free yield",
      "Massive JPY shorting drove JPY/TWD below 0.21, triggering unprecedented Taiwanese tourist retail booms",
      "Macro risk: BOJ rate hikes prompt rapid carry unwind, forcing sudden asset fire-sales worldwide"
    ],
    "visualType": "w7_slide_18"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "企業外匯避險 (FX Hedging)：遠期外匯 (Forward Contract) 簡介",
    "titleEn": "W7 Slide 19: Corporate FX Hedging: An Introduction to Forward Contracts",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 19 (Hour 2)",
    "teachingNotes": "介紹出口跨國企業如何防止匯率波動吃掉微薄利潤。案例：鴻海接獲蘋果 1 億美元代工訂單，約定 6 個月後交貨收款。若當前 USD/TWD 為 32.0，但鴻海財務長擔心 6 個月後台幣突然暴升至 29.0（這將使營收憑空蒸發 3 億新台幣，利潤全賠光）。鴻海的解決之道：與銀行簽訂「遠期外匯合約 (Forward Contract)」，約定 6 個月後鴻海以固定的遠期匯率（如 31.8）將 1 億美元賣給銀行換取新台幣。不管半年後市場即期匯率如何暴跌暴漲，鴻海都以 31.8 履約，將致命的匯率波動風險完全轉移由銀行承擔！\n\n【官方數據】：台北外匯市場發展基金會與本國銀行企業外匯避險實務手冊。",
    "discussionQuestion": "引導思考：『如果一家出口企業完全不做外匯避險，這家公司本質上是在做實體製造業，還是在拿全體員工的薪水賭博外匯？』",
    "discussionQuestionEn": "Thought experiment: 'If an export firm refuses FX hedging, is it running a manufacturing business or gambling on currency moves?'",
    "quickTakeaways": [
      "遠期外匯 (Forward Contract)：約定在未來特定日期，以事先約定之匯率買賣特定金額外幣",
      "核心功能在於『消除不確定性』：鎖定未來新台幣營收成本，保護企業正常毛利率",
      "跨國企業透過遠期外匯與外匯選擇權，將無法預測的匯率風險轉移給金融機構"
    ],
    "quickTakeawaysEn": [
      "Forward Contract: A customized agreement to buy or sell foreign currency at a predetermined future rate",
      "Core purpose is risk elimination: locks in future TWD revenues to shield manufacturer operating margins",
      "Multinational corporations use forwards and options to transfer macro FX volatility to financial intermediaries"
    ],
    "visualType": "w7_slide_19"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "第二小時 ‧ 匯率理論與升貶值雙刃劍",
    "categoryEn": "Hour 2: FX Theory & The Appreciation Double Edge",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "W7 Slide 20: Hour 2 Summary & Exclusive Activity Preview",
    "subtitle": "115學年度 第七週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 7 Module 20 (Hour 2)",
    "teachingNotes": "總結第二小時核心觀念：PPP 購買力平價説衡量實體商品相對購買力；IRP 利率平價説解釋利差引發資金跨國搬家；台幣升值有利旅遊進口、貶值有利出口但加劇輸入型通膨；台灣 5,750 億外匯存底與柳樹理論維持動態穩定；遠期外匯為企業鎖住利潤。預告第 2 小時 Modal 實務體驗活動——「大麥克指數 (PPP) 幣值高低估檢測器」，引導學生輸入各國大麥克價格與市場匯率，親自診斷各國貨幣是否被低估或高估。\n\n【官方數據】：115學年度「管理探索二」課程組全景圖。",
    "discussionQuestion": "指導學生點擊導覽列「🎯 2小時: 大麥克PPP檢測」按鈕，準備進行實務檢測演練。",
    "discussionQuestionEn": "Direct students to click 'Hr 2: Big Mac PPP' on the navbar to simulate purchasing power parity valuation.",
    "quickTakeaways": [
      "第二小時里程碑達成：掌握 PPP、IRP、央行柳樹理論與升貶值雙刃劍效應",
      "理解日圓套利交易機制，以及企業運用遠期外匯合約鎖匯避險之重要性",
      "開啟第 2 小時專屬檢測器，輸入台灣與各國漢堡售價親自計算幣值高低估"
    ],
    "quickTakeawaysEn": [
      "Hour 2 Milestone reached: Mastered PPP, IRP, CBC willow policy, and currency trade-offs",
      "Deconstructed JPY carry trade mechanics and corporate forward contract hedging",
      "Launch the Hour 2 Big Mac PPP Detector to calculate real purchasing power valuations"
    ],
    "visualType": "w7_slide_20"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "大一新鮮人外匯換匯 4 大指標：即期、分批、外幣戶與拒絕 DDC",
    "titleEn": "W7 Slide 21: 4 Golden Principles of Personal Forex: Spot, Batches, FX Accounts & No DDC",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 21 (Hour 3)",
    "teachingNotes": "歸納總結大一新鮮人一生必備的個人換匯四大黃金守則：1. 優先使用即期匯率（永遠在手機 App 上用即期匯率買進外幣，省下昂貴的現金點差）；2. 分批買進平滑成本（外匯市場難以預測波段最低點，在預計出國前 3~6 個月分 3~4 批逢低買進，有效攤平持有成本）；3. 善用外幣數位帳戶（買入外幣存入數位戶賺取 2%~5% 活期定存利息，搭配雙幣卡海外刷卡）；4. 海外刷卡拒絕 DDC（境外刷卡與跨國電商一律點選當地貨幣，嚴厲拒絕新台幣結算，防禦 5% 惡劣手續費）。\n\n【官方數據】：臺灣銀行與兆豐銀行外匯理財實務指南手冊。",
    "discussionQuestion": "提問：『出國或境外網購刷卡結帳時，選新台幣結算會被加收高達 5% 的 DDC 惡劣手續費，大家記住了嗎？』",
    "discussionQuestionEn": "Retention check: 'When checking out abroad, accepting TWD triggers a 5% DDC penalty fee—has everyone memorized this rule?'",
    "quickTakeaways": [
      "原則一：優先使用 App 即期匯率買賣，徹底擺脫臨櫃現鈔高額手續費與點差",
      "原則二：出國前 3-6 個月分 3-4 批分批逢低換匯，有效平滑匯率波動風險",
      "原則三：外幣數位帳戶享高利息，原則四：國外消費堅決向 DDC 說不"
    ],
    "quickTakeawaysEn": [
      "Rule 1: Always trade via mobile spot rates to eliminate wide branch cash rate markups",
      "Rule 2: Dollar-cost average foreign currency in 3-4 tranches months before departure",
      "Rule 3: Deposit FX into digital accounts for yield; Rule 4: Strictly reject overseas DDC prompts"
    ],
    "visualType": "w7_slide_21"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "美幣定存 (USD Time Deposit) 高利 5% 的風險：賺利息賠匯差",
    "titleEn": "W7 Slide 22: The 5% USD Deposit Hazard: Earning Interest but Bleeding FX Loss",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 22 (Hour 3)",
    "teachingNotes": "深入剖析大一新鮮人最常落入的「美元高利定存誘惑」。銀行廣告大字標榜「美元定存年利率高達 5.5% 穩穩賺」，但往往對「匯率風險 (FX Risk)」輕描淡寫。算術實證：小明將 32.5 萬新台幣以 USD/TWD = 32.5 買進 10,000 美元存入一年期 5.5% 定存，滿期本利和獲得 10,550 美元（帳面看似多賺 550 美元利息）；然而一年後新台幣大幅升值，USD/TWD 降至 29.5！小明將 10,550 美元換回新台幣時僅得 `10,550 * 29.5 = 311,225 元`！總帳實質倒賠 13,775 元新台幣！這就是經典的「賺了 5.5% 美元利息，卻慘賠 9.2% 匯差，倒貼收場」！\n\n【官方數據】：中央銀行與金管會銀行局外幣定存消費風險警示案例手冊。",
    "discussionQuestion": "強調名言：『外幣理財第一鐵律——【賺了利息，千萬小心不要賠了匯差】！』",
    "discussionQuestionEn": "Core maxim: 'The supreme rule of foreign currency: Never let an interest rate gain be wiped out by an FX depreciation loss!'",
    "quickTakeaways": [
      "外幣定存需承擔雙重變數：名目利率收益 vs 匯率變動損益",
      "真實總報酬率公式：實質台幣報酬率 ≈ 外幣定存年利率 + 匯率升貶值幅度",
      "若未來預期台幣將大幅升值，盲目追逐美元高利定存極高機率慘遭反噬"
    ],
    "quickTakeawaysEn": [
      "Foreign currency deposits are subject to two variables: nominal interest rate and FX fluctuations",
      "Real TWD total return formula: Real Return ≈ Foreign Interest Rate + Currency Appreciation/Depreciation",
      "If the domestic currency appreciates significantly, high nominal foreign yields can still result in net capital losses"
    ],
    "visualType": "w7_slide_22"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "實證案例：新台幣從 27.5 貶至 32.5 對留學與 iPhone 的成本計算",
    "titleEn": "W7 Slide 23: Empirical Case: TWD 27.5 to 32.5 Shock on Overseas Tuition & iPhone Prices",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 23 (Hour 3)",
    "teachingNotes": "透過真實歷史數據，震撼展示當新台幣兌美元由歷史高點 27.5 一路貶值至 32.5（貶值幅度高達 18.2%）時，對大一學生日常生活與留學計畫的實質購買力摧毀：案例 1：美國留學學費每年 50,000 美元。在台幣 27.5 時需支付 137.5 萬新台幣；貶值至 32.5 時需支付 162.5 萬新台幣！同一所大學、同一堂課，一年學費活生生暴增 25 萬新台幣（等於每月多掏 2 萬元生活費）！案例 2：進口旗艦手機 iPhone ($1,000 美元)。在 27.5 時折合 27,500 元；貶至 32.5 時直接暴漲至 32,500 元！\n\n【官方數據】：教育部國際文教處留學統計與 Apple 台灣歷年官方定價走勢。",
    "discussionQuestion": "請學生算一算：『如果計畫大四去美國交換一年，現在台幣處於弱勢，你應該怎麼進行長線分批換匯避險？』",
    "discussionQuestionEn": "Calculation: 'If planning a study abroad program in Year 4, how should you hedge against currency depreciation today?'",
    "quickTakeaways": [
      "新台幣從 27.5 貶至 32.5，代表國人對美購買力在兩年內實質縮水超過 18%",
      "留學 5 萬美元學費年增 25 萬新台幣，千元進口手機直接貴 5,000 元台幣",
      "面對未來確定性之大額外幣支出，應提早 2~3 年分批逢低吸納，平滑匯率成本"
    ],
    "quickTakeawaysEn": [
      "TWD moving from 27.5 to 32.5 eroded Taiwanese purchasing power abroad by over 18% in two years",
      "A $50,000 tuition bill surged by NT$250,000; imported flagship smartphones increased by NT$5,000",
      "For known future FX obligations, hedge early by dollar-cost averaging into foreign currencies over multiple years"
    ],
    "visualType": "w7_slide_23"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "實證數據調取：中央銀行 (CBC) 外匯局與臺灣銀行每日牌告查閱",
    "titleEn": "W7 Slide 24: Empirical Inquiries: CBC Forex Bureau & Bank of Taiwan FX Portals",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 24 (Hour 3)",
    "teachingNotes": "手把手教導學生如何查詢最權威的第一手官方外匯數據：1. 中央銀行外匯局 (cbc.gov.tw)：查詢每日台北外匯市場主要貨幣兌新台幣收盤匯率、全體銀行外匯交易量與每月外匯存底統計；2. 臺灣銀行牌告匯率專區 (rate.bot.com.tw)：查詢 19 種外幣的即時與歷史「現金/即期買入賣出價」、歷史匯率走勢走勢圖與試算工具；3. 經濟部國際貿易署：查詢台灣進出口貿易統計與主要出超入超國家名單。\n\n【官方數據】：中央銀行 (CBC) 暨臺灣銀行 (BOT) 官方數據門戶。",
    "discussionQuestion": "現場演示臺灣銀行官方牌告匯率查詢步驟，要求學生記下查詢路徑以供課堂作業使用。",
    "discussionQuestionEn": "Demonstrate the live Bank of Taiwan FX query portal and have students bookmark the link for homework.",
    "quickTakeaways": [
      "臺灣銀行牌告匯率 (rate.bot.com.tw)：全台最具代表性之 19 種外幣即時與歷史牌告看板",
      "中央銀行外匯局 (cbc.gov.tw)：查詢新台幣名目有效匯率指數 (NEER) 與外匯存底官方月報",
      "以第一手官方歷史走勢圖替代網紅主觀預測，建立審計級理性查核習慣"
    ],
    "quickTakeawaysEn": [
      "Bank of Taiwan Portal: The benchmark dashboard for 19 foreign currency spot and cash rate histories",
      "CBC Forex Bureau: Official repository for Nominal Effective Exchange Rate (NEER) and reserves data",
      "Rely on verified historical central bank data rather than social media influencers to inform FX decisions"
    ],
    "visualType": "w7_slide_24"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "大一新鮮人外匯資產配置：10% 美元短期定存 + 旅遊外幣預備金",
    "titleEn": "W7 Slide 25: College Freshmen FX Allocation: 10% USD Reserves + Travel Sinking Fund",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 25 (Hour 3)",
    "teachingNotes": "傳授專屬大一新鮮人的穩健外匯資產配置架構：1. 10% 美元戰略儲備：利用數位帳戶外幣功能，在新台幣相對強勢 (USD/TWD < 31.0) 時分批買進美元，存放於美元高利活存或 3 個月短期定存，作為未來投資美股 ETF (如 VOO/VT) 或海外開戶之種子基金；2. 旅遊預備金 (Sinking Fund)：出國前 6 個月逢低分 3~4 批買進日圓、韓元或歐元，存入外幣帳戶並開通雙幣信用卡，既能鎖定旅遊低價預算，又完全不影響生活費現金流。\n\n【官方數據】：理財規劃師 (CFP) 青年資產配置與外幣儲備實務指引。",
    "discussionQuestion": "請學生隨堂演練：『如果你手上有 3 萬元打工存款，請按照 10% 美元 + 旅遊金策略，規劃你的外幣買進計畫。』",
    "discussionQuestionEn": "Exercise: 'If you have NT$30k in savings, formulate an allocation across 10% USD reserves and a travel fund.'",
    "quickTakeaways": [
      "新鮮人外幣配置比例以 10%~15% 為宜，專注於美元儲備與旅遊預備金",
      "10% 美元資產：逢低儲備，作為未來美股 ETF 或海外求學之長線種子資本",
      "旅遊預備金：出國前 6 個月分批買進，綁定雙幣卡實現無痛低檔鎖匯"
    ],
    "quickTakeawaysEn": [
      "College freshmen should cap FX exposure at 10%~15%, focusing on USD reserves and travel funds",
      "10% USD Reserves: Accumulated on dips as seed capital for US ETF investing or future studies",
      "Travel Sinking Fund: Purchased in tranches 6 months prior, tied to a dual currency card to lock in rates"
    ],
    "visualType": "w7_slide_25"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "跨境網購 (Amazon, Taobao) 匯率與海外刷卡手續費最佳化",
    "titleEn": "W7 Slide 26: Cross-Border E-Commerce Optimization: FX Rates & Card Fees (Amazon, Taobao)",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 26 (Hour 3)",
    "teachingNotes": "教導大一學生在 Amazon、Taobao 或 Steam 跨境網購時的省錢 3 步驟：1. 結算幣別最佳化：Amazon 請務必選美元 (USD) 或日圓 (JPY)，淘寶請選人民幣 (CNY)，絕不勾選新台幣結算，免受 4%~5% DDC 惡劣手續費剝削；2. 挑選高回饋信用卡：選擇海外回饋率 3.0%~3.5% 的信用卡，扣除 1.5% 法定手續費後，倒賺 1.5%~2.0% 現金回饋；3. 關稅法規防坑：單筆商品金額超過新台幣 2,000 元，或半年內海外包裹超過 6 次，將被財政部海關依法課徵進口關稅與 5% 營業稅！\n\n【官方數據】：財政部關務署進口包裹免稅規定與 EZ WAY 易利委作業手冊。",
    "discussionQuestion": "提醒學生：『在網購進行 EZ WAY 易利委實名認證時，要留意每半年的 6 次免稅額度，不要因小失大！』",
    "discussionQuestionEn": "Tax tip: 'Track your EZ WAY app customs declarations to keep overseas shipments under the 6-times tax-free limit!'",
    "quickTakeaways": [
      "境外電商結算幣別：一律選擇當地貨幣 (USD/JPY/CNY)，嚴厲拒絕新台幣 DDC 結算",
      "搭配海外回饋 > 2.5% 之神卡，全額覆蓋 1.5% 手續費並享額外正現金回饋",
      "留意海關法規：單筆 2,000 元以下免稅，每人每半年享有 6 次免稅額度"
    ],
    "quickTakeawaysEn": [
      "Select the merchant's native billing currency (USD/JPY/CNY); reject all TWD DDC conversions",
      "Use credit cards offering >2.5% foreign cashback to outstrip the 1.5% fee and net positive rewards",
      "Comply with customs thresholds: NT$2,000 parcel ceiling and a maximum of 6 tax-free shipments per half-year"
    ],
    "visualType": "w7_slide_26"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "避免追高殺低：外匯市場無升不貶、無貶不升的常態輪動",
    "titleEn": "W7 Slide 27: Avoiding FX FOMO: The Inevitable Mean-Reversion Cycle of Currencies",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 27 (Hour 3)",
    "teachingNotes": "點出外匯市場強烈的「均值回歸 (Mean Reversion)」本質。外幣不同於具備內生增長力的股票（優秀企業盈餘長期向上），貨幣只是交換媒介，受兩國央行利差與貿易常態拉扯。回顧過去 20 年新台幣兌美元歷史走勢：長年在 27.5 至 35.0 區間內常態震盪擺動，無永遠的強勢貨幣，亦無永遠的弱勢貨幣！警示大一學生：當 USD/TWD 飆到 33.5、社群新聞鋪天蓋地熱捧「美元定存神話」時追高買美元，往往買在週期山頂，隨後慘遭台幣強勁反彈的大幅匯損！理性外匯紀律：台幣強勢時逢低儲備，台幣弱勢時逢高結算。\n\n【官方數據】：中央銀行 20 年新台幣歷史匯率波動統計資料庫。",
    "discussionQuestion": "提醒：『外匯市場沒有永遠上漲的貨幣！切勿在新聞鋪天蓋地報導大漲時盲目追高。』",
    "discussionQuestionEn": "Warning: 'No currency rises forever! Avoid chasing foreign currencies at cyclical peaks fueled by news hype.'",
    "quickTakeaways": [
      "外匯具備強烈均值回歸性：新台幣過去 20 年在 27.5~35.0 區間內常態擺動",
      "貨幣無內生盈餘增長，切勿用『買股票死抱不放』的思維追高暴漲外幣",
      "反週期紀律：台幣強勢 (< 30) 逢低買外幣儲備；台幣弱勢 (> 33) 逢高結算獲利"
    ],
    "quickTakeawaysEn": [
      "Foreign exchange oscillates around long-term economic equilibrium (historical TWD range: 27.5~35.0)",
      "Currencies lack corporate retained earnings; avoid buy-and-hold mentalities on overbought currencies",
      "Counter-cyclical discipline: accumulate FX when TWD is strong (<30); liquidate or hedge when weak (>33)"
    ],
    "visualType": "w7_slide_27"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "大一新鮮人個人外匯理性使用 4 大金律",
    "titleEn": "W7 Slide 28: 4 Golden Rules of Rational Forex Management for College Freshmen",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 28 (Hour 3)",
    "teachingNotes": "總結大一新鮮人一生受用的個人外匯四大黃金戒律：1. 即期分批換匯（永遠使用 App 即期價分 3~4 批逢低買進，平滑點差與匯率波動）；2. 拒絕 DDC 雙幣結算（海外刷卡與境外電商結帳一律選擇當地貨幣，嚴防 5% 惡劣手續費）；3. 警惕美幣高利匯損（算清匯率風險，絕不因 5% 利息盲目承擔 10% 匯差下行風險）；4. 堅守均值回歸不追高（在新台幣相對強勢時儲備外幣，切勿在新聞熱炒暴漲時盲目追高）。\n\n【官方數據】：金融監督管理委員會與中央銀行外匯消費者保護原則。",
    "discussionQuestion": "請全體學生齊聲朗讀四大金律，將外匯理性紀律內化為個人一生直覺。",
    "discussionQuestionEn": "Recite the 4 golden rules aloud to internalize disciplined foreign exchange practices for life.",
    "quickTakeaways": [
      "金律一：即期分批換匯，App 線上預約，告別臨櫃高昂現金點差",
      "金律二：境外刷卡結帳堅決拒絕 DDC，一律選擇當地貨幣結算",
      "金律三：警惕美幣高利定存匯損，算清實質台幣總回報",
      "金律四：堅守均值回歸思維，絕不在新聞瘋狂炒作暴漲時盲目追高"
    ],
    "quickTakeawaysEn": [
      "Rule 1: Dollar-cost average via mobile spot rates, avoiding expensive bank teller cash markups",
      "Rule 2: Strictly reject overseas DDC prompts; settle exclusively in local native currencies",
      "Rule 3: Beware of FX loss traps in foreign deposits; calculate comprehensive net TWD returns",
      "Rule 4: Respect mean reversion cycles; never chase foreign currencies during media FOMO peaks"
    ],
    "visualType": "w7_slide_28"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "第七週全景知識體系圖與觀念整合",
    "titleEn": "W7 Slide 29: Week 7 Full-Landscape Knowledge Architecture & Integration",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 29 (Hour 3)",
    "teachingNotes": "以全景邏輯結構圖將第七週 30 頁純教學卡片進行整體觀念串聯：第一小時 (外匯本質 ➔ 即期vs現金點差 ➔ 銀行買賣視角 ➔ 換匯 3 管道 ➔ 雙幣卡鎖匯 ➔ DXY 霸權) ➔ 第二小時 (PPP 大麥克指數 ➔ IRP 美台利差 ➔ 貿易流 vs 資本流 ➔ 台幣升貶值雙刃劍 ➔ 台灣 5,750 億外匯存底 ➔ 柳樹理論 ➔ 遠期避險) ➔ 第三小時 (換匯 4 金律 ➔ 美金高利匯損陷阱 ➔ 台幣 27.5 貶至 32.5 實證 ➔ 10% 美元配置 ➔ 跨境網購 ➔ 均值回歸 ➔ 4 大金律)。\n\n【官方數據】：115學年度「管理探索二」課程計畫總圖表。",
    "discussionQuestion": "引導學生回顧整週學習歷程，確認每一個外匯金融節點均已融會貫通。",
    "discussionQuestionEn": "Review the full intellectual map and confirm comprehension across all 30 modular nodes.",
    "quickTakeaways": [
      "五大核心支柱：外匯基礎與點差、匯率理論 (PPP/IRP)、升貶值經濟衝擊、央行外匯存底政策、大一配置實戰",
      "破除外幣高利行銷迷思，學會以 PPP 隱含匯率與均值回歸衡量幣值相對位置",
      "建立現代數位公民必備之跨國貨幣管理能力與全球資產配置視野"
    ],
    "quickTakeawaysEn": [
      "5 Pillars: FX board spreads, PPP/IRP theories, Economic impact of FX moves, Central bank policy, Freshmen allocation",
      "Dismantle high foreign yield illusions using PPP valuations and counter-cyclical mean reversion",
      "Cultivate essential 21st-century cross-border currency management and global asset allocation literacy"
    ],
    "visualType": "w7_slide_29"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "第三小時 ‧ 實證比對與配置長城",
    "categoryEn": "Hour 3: Empirical Strategy & FX Asset Allocation",
    "title": "學習反思與第八週預告 (期中學習成果檢核與實戰複習)",
    "titleEn": "W7 Slide 30: Learning Reflections & Week 8 Preview: Midterm Review & Case Studies",
    "subtitle": "115學年度 第七週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 7 Module 30 (Hour 3)",
    "teachingNotes": "恭喜學生圓滿完成第七週個人外匯課程！指導學生點擊右上角「📝 本週課堂作業」按鈕，現場線上填寫並提交「自選外幣換匯與升貶值影響報告」。預告第八週重磅課程主題：「期中學習成果檢核與實戰個案總複習」，下週將針對前七週全套課程（W1 財經素養、W2 通膨與實質購買力、W3 利率與央行、W4 股市入門與企業估值、W5 ETF 與被動投資、W6 數位金融高利活存、W7 個人外匯與國際貿易）進行系統性總複習與期中實戰會考挑戰！\n\n【官方數據】：115學年度「管理探索二」課程進度綱要。",
    "discussionQuestion": "提醒學生於期限內完成作業提交，並全面複習前七週全套課程準備下週的期中實戰會考！",
    "discussionQuestionEn": "Remind students to submit the online assignment and review Weeks 1-7 in preparation for next week's midterm exam!",
    "quickTakeaways": [
      "全週 30 頁課程圓滿結業，全面解鎖外匯牌告、大麥克 PPP、利差交易與鎖匯配置技能",
      "立即開啟線上實務作業表單，完成自選外幣換匯分析與升貶值影響報告提交",
      "下週預告：期中學習成果檢核與實戰個案總複習（全面盤點前 7 週財金核心技能）"
    ],
    "quickTakeawaysEn": [
      "Week 7 accomplished: Mastered bank rate boards, Big Mac PPP, carry trades, and FX allocation",
      "Launch the online homework modal to submit your Currency Exchange & FX Impact Analysis report",
      "Week 8 Preview: Midterm Learning Check & Practical Case Review (comprehensive Weeks 1-7 review)"
    ],
    "visualType": "w7_slide_30"
  }
];
