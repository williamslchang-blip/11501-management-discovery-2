/**
 * 第一週 課程互動活動與實務作業資料庫
 * 包含：
 * 1. 第 1 小時：資訊飲食與 SNR 計算盤
 * 2. 第 2 小時：新聞標題框架重組大考驗
 * 3. 第 3 小時小遊戲：財經新聞真假與雜訊偵測大挑戰 (4 關卡)
 * 4. 第 3 小時課堂實務作業：4D Filter 檢驗報告模板與評分規準 (Rubric)
 */

// ==========================================
// 1. 第 1 小時活動：資訊飲食與 SNR 計算盤
// ==========================================
const SNR_ACTIVITY_DATA = {
  title: {
    zh: "🎯 第 1 小時活動：資訊飲食與 SNR 計算盤",
    en: "🎯 Hour 1 Lab: Information Diet & SNR Calculator"
  },
  subtitle: {
    zh: "親自量化個人每日資訊攝取的健康純度，診斷大腦是否處於過度雜訊中毒狀態",
    en: "Quantify your daily intellectual nutrition and diagnose noise intoxication"
  },
  formulaExpl: {
    zh: "訊號雜訊比公式：SNR = (每日閱讀真實 Signal 分鐘數) ÷ (每日瀏覽情緒 Noise 分鐘數)",
    en: "Signal-to-Noise Ratio: SNR = (Daily Signal Minutes) ÷ (Daily Noise Minutes)"
  },
  signalSources: [
    { id: "s1", name: { zh: "上市公司經審計財報 (MOPS / SEC 10-K)", en: "Audited Filings (MOPS / SEC 10-K)" }, defaultMins: 20 },
    { id: "s2", name: { zh: "中央銀行與官方總經統計 (CBC / FRED / TWSE)", en: "Central Bank & Macro Repositories (CBC / FRED)" }, defaultMins: 15 },
    { id: "s3", name: { zh: "同行審查學術論文與權威智庫深度報告", en: "Peer-Reviewed Journals & Institutional Whitepapers" }, defaultMins: 15 },
    { id: "s4", name: { zh: "法說會完整逐字稿與財務附註 (Footnotes)", en: "Full Earnings Call Transcripts & Balance Footnotes" }, defaultMins: 10 }
  ],
  noiseSources: [
    { id: "n1", name: { zh: "社群飆股推薦、LINE 炒股群組、未經證實傳言", en: "Social Tip Groups, LINE Channels & Telegram Leaks" }, defaultMins: 35 },
    { id: "n2", name: { zh: "短影音投資網紅、誇張縮圖標題黨影片", en: "TikTok/Reels Influencer Clips with Clickbait Hooks" }, defaultMins: 40 },
    { id: "n3", name: { zh: "商業流量新聞農場（崩盤警告、血洗字眼）", en: "Ad-Funded News Mills (Bloodbath, Panic Headlines)" }, defaultMins: 30 },
    { id: "n4", name: { zh: "電視投顧名嘴即時看盤激進喊單", en: "Televised Pundits Day-Trading Hype" }, defaultMins: 15 }
  ],
  diagnosticLevels: [
    {
      max: 0.49,
      badge: "⚠️ 嚴重雜訊中毒 (Severe Overload)",
      badgeEn: "⚠️ Severe Noise Overload",
      color: "#ef4444",
      desc: {
        zh: "你的資訊飲食中超過 70% 都是情緒雜訊！這會極度刺激大腦杏仁核，使你陷入控制錯覺 (Illusion of Control) 與過度交易，平均年化報酬面臨 -3.8% 的侵蝕風險。",
        en: "Over 70% of your information intake is pure emotional noise! This over-stimulates your amygdala, inducing overconfidence bias and active churn (-3.8% return drag)."
      },
      rx: {
        zh: "【即刻處方】：立即退訂 3 個最常使用驚悚標題的財經頻道；每日設定 30 分鐘「無社群財報時間」。",
        en: "Prescription: Unsubscribe from 3 sensational channels immediately. Quarantine 30 mins daily for primary SEC/MOPS filings."
      }
    },
    {
      max: 0.99,
      badge: "🟡 雜訊偏高警戒 (Elevated Noise Risk)",
      badgeEn: "🟡 Elevated Noise Risk",
      color: "#f59e0b",
      desc: {
        zh: "你雖有接觸客觀數據，但依然被大量的短線情緒新聞牽著走，容易在市場震盪時產生 FOMO 或恐慌拋售衝動。",
        en: "You read some primary data, but emotional feeds still cloud your judgment during market corrections."
      },
      rx: {
        zh: "【優化處方】：將看盤軟體的新聞推播通知關閉，改為每週固定時間檢視 FRED 總經指標與公司季度重訊。",
        en: "Prescription: Disable breaking push notifications. Schedule weekly deep-dives into FRED macro data."
      }
    },
    {
      max: 1.99,
      badge: "🟢 健康理性飲食 (Healthy Balanced Diet)",
      badgeEn: "🟢 Healthy Balanced Diet",
      color: "#10b981",
      desc: {
        zh: "非常優質！你吸收的真實數據與深度報告已超過市場情緒噪音，能保持理性的均值回歸思考與長線複利心態。",
        en: "Excellent! Your primary signal intake exceeds market noise. You maintain cognitive clarity and long-term compounding mindset."
      },
      rx: {
        zh: "【進階處方】：繼續維持！在重大新聞爆發時，試著練習 4D Filter 二次交叉驗證，提煉更高純度的洞察。",
        en: "Prescription: Keep it up! Practice the 4D Filter to pressure-test consensus narratives during market panics."
      }
    },
    {
      max: 9999,
      badge: "💎 頂級超清純度 (Elite High-SNR Thinker)",
      badgeEn: "💎 Elite High-SNR Thinker",
      color: "#6366f1",
      desc: {
        zh: "大師級的資訊防禦力！你幾乎完全以官方原始數據、同行審查報告與審計財報作為決策依據，具備極強的市場免疫力。",
        en: "Institutional-grade immunity! You rely almost exclusively on primary regulatory filings and audited balance sheets."
      },
      rx: {
        zh: "【領航處方】：可嘗試將你解讀 Raw Data 的客觀框架分享給同學，協助改善身邊朋友的財經資訊飲食！",
        en: "Prescription: Share your raw data extraction methodologies to mentor peers and upgrade their media diets!"
      }
    }
  ]
};

// ==========================================
// 2. 第 2 小時活動：新聞標題框架重組大考驗
// ==========================================
const REFRAMING_ACTIVITY_DATA = {
  title: {
    zh: "🎯 第 2 小時活動：新聞標題框架重組大考驗",
    en: "🎯 Hour 2 Lab: Headline Reframing Challenge"
  },
  subtitle: {
    zh: "訓練學生剝離情緒修詞，運用 4D Filter 將聳動標題黨轉化為學術中立的客觀 Signal",
    en: "Strip rhetorical hyperbole and reconstruct clickbait into objective, academic Signal"
  },
  cases: [
    {
      id: "case1",
      tag: { zh: "半導體海外建廠", en: "Semiconductor Capex" },
      clickbait: {
        zh: "「台積電海外建廠驚爆巨虧？！美日建廠預算大暴增，毛利恐被徹底拖垮！」",
        en: "'TSMC Global Expansion Bleeds Catastrophic Cash?! US/Japan Capex Explodes, Margins Ruined!'"
      },
      emotionalTriggers: {
        zh: "「驚爆巨虧」、「預算大暴增」、「徹底拖垮」、「？！」",
        en: "'Catastrophic Cash', 'Explodes', 'Margins Ruined', '?!'"
      },
      realFacts: {
        zh: "台積電最新法說會指出：海外廠因初期供應鏈建置與學習曲線成本，海外營運稀釋整體毛利率約 2~3 個百分點，但長期維持 53% 以上毛利率目標不變，且已獲當地政府巨額補助與客戶長期簽約承諾。",
        en: "TSMC earnings call states: Overseas initial setup will dilute gross margins by 2-3 percentage points during the ramp-up phase, but long-term gross margin target of 53%+ remains intact with host government subsidies and long-term customer commitments."
      },
      promptHint: {
        zh: "【重組提示】：移除「驚爆巨虧」等主觀恐懼詞，點出「稀釋毛利 2~3%」的具體幅度與「53% 長期目標不變」的時間軸 (Duration)。",
        en: "Hint: Eliminate apocalyptic verbs; highlight exact 2-3% margin dilution and the 53%+ multi-year target."
      },
      expertModel: {
        zh: "「台積電海外建廠初期毛利預期稀釋 2-3%，長期 53% 毛利率目標與政府補助基調維持不變」",
        en: "'TSMC Guides Initial Overseas Margin Dilution of 2-3%; Reaffirms 53%+ Long-Term Target Under Subsidies'"
      }
    },
    {
      id: "case2",
      tag: { zh: "央行房市信用管制", en: "Central Bank Real Estate" },
      clickbait: {
        zh: "「央行重拳血洗！房貸族哭暈在廁所，斷頭拋售潮引爆房市全面雪崩？！」",
        en: "'Central Bank Bloodbath! Mortgage Holders In Agony As Massive Defaults Crash Housing Market?!'"
      },
      emotionalTriggers: {
        zh: "「重拳血洗」、「哭暈在廁所」、「斷頭拋售潮」、「全面雪崩」",
        en: "'Bloodbath', 'In Agony', 'Massive Defaults', 'Crash Housing Market'"
      },
      realFacts: {
        zh: "中央銀行為防範不動產貸款過度集中風險，調升存款準備率 0.25 個百分點（1碼），並實施第七波選擇性信用管制。新制首購與自住族群完全不受影響，換屋族亦提供簽署切結書一年內出售舊屋之配套。",
        en: "Central Bank raised reserve requirement ratio by 25 bps (0.25%) and implemented selective credit measures to curb excessive real estate debt concentration. First-time buyers and owner-occupiers are fully exempt; upgraders have a 1-year transition buffer."
      },
      promptHint: {
        zh: "【重組提示】：刪除「血洗」與「雪崩」，精準寫出「存準率調升 1 碼」與「首購自住不受影響」的事實查核。",
        en: "Hint: Cut 'bloodbath' and 'crash'; specify the 25 bps reserve hike and the full exemption for owner-occupiers."
      },
      expertModel: {
        zh: "「央行調升存準率 1 碼並落實房市信用管制，首購自住族群獲專案豁免確保金融穩健」",
        en: "'Central Bank Hikes Reserve Ratio 25 bps for Mortgage Prudence; Exempts First-Time Buyers'"
      }
    },
    {
      id: "case3",
      tag: { zh: "科技股估值與名人動態", en: "Tech Valuations & Buffett" },
      clickbait: {
        zh: "「美股狂瀉、VIX飆天！巴菲特狂砍持股囤積天量現金，全球金融海嘯再現？！」",
        en: "'Wall Street Plunges, VIX Goes Ballistic! Buffett Dumps Stocks for Cash Mountain, Financial Armageddon Awaits?!'"
      },
      emotionalTriggers: {
        zh: "「狂瀉」、「飆天」、「狂砍持股」、「天量現金」、「金融海嘯再現」",
        en: "'Plunges', 'Goes Ballistic', 'Dumps Stocks', 'Armageddon Awaits'"
      },
      realFacts: {
        zh: "波克夏海瑟威 (Berkshire Hathaway) 最新 13F 申報顯示其調節部分蘋果持股以應對未來企業稅率調升預期，現金部位達到歷史高位，同時旗下核心保險與能源實體業務營業利潤持續穩健成長，並非預測市場崩盤。",
        en: "Berkshire Hathaway's 13F filing shows rebalancing of Apple holdings partly due to corporate tax expectations, raising cash to record levels while operating earnings across insurance and infrastructure continue solid growth."
      },
      promptHint: {
        zh: "【重組提示】：指出這是基於 13F 申報的資產再平衡與稅務規劃，而非情緒性看空全球經濟。",
        en: "Hint: Ground the narrative in statutory 13F rebalancing and tax strategy rather than doomsday prophesies."
      },
      expertModel: {
        zh: "「波克夏基於稅務與估值考量調節部分科技持股，第三季營運利潤維持穩健成長」",
        en: "'Berkshire Rebalances Equity Exposure on Tax & Valuation Considerations; Core Operating Profit Expands'"
      }
    }
  ]
};

// ==========================================
// 3. 第 3 小時小遊戲：財經新聞真假與雜訊偵測大挑戰
// ==========================================
const DETECTIVE_GAME_DATA = {
  title: {
    zh: "🎮 第 3 小時小遊戲：財經新聞真假與雜訊偵測大挑戰",
    en: "🎮 Hour 3 Lab: Financial News Detective Challenge"
  },
  subtitle: {
    zh: "化身首席財經偵探，挑戰 4 大擬真新聞盲測關卡，運用 4D Filter 破除情緒陷阱！",
    en: "Step up as Chief Financial Detective: Conquer 4 real-world test cases with 4D rigor!"
  },
  badgeName: {
    zh: "🏅 首席財經偵探徽章 (Chief Financial Detective)",
    en: "🏅 Chief Financial Detective Certification"
  },
  levels: [
    {
      id: 1,
      title: { zh: "關卡 1：房貸限貸令崩盤新聞真偽辨析", en: "Level 1: The Mortgage Credit Crunch Panic" },
      headline: {
        zh: "「銀行水位拉警報！首購族貸不到款哭天搶地，房價即將崩跌 30%？！」",
        en: "'Banks Run Out of Cash! First-Time Buyers Barred from Mortgages, Home Prices to Crash 30%?!'"
      },
      sourceSnippet: {
        zh: "某論壇未具名網友貼文：『我去兩家銀行問都說排到明年，朋友也說大家都違約了，房市要完了！』隨後多家免費媒體直接引用轉發。",
        en: "Anonymous forum post: 'Two local banks told me waitlists stretch to next year, everyone is defaulting, the market is doomed!' Free portals copy-pasted instantly."
      },
      question: {
        zh: "身為理性分析師，當你運用 4D Filter 查核此新聞時，何者為最適當的驗證行動與判斷？",
        en: "Applying the 4D Filter, which action and conclusion represents the rigorous verification?"
      },
      options: [
        {
          id: "A",
          text: {
            zh: "立即相信新聞，因為論壇網友有親身經驗，房價肯定即將大崩跌。",
            en: "Believe the post immediately; firsthand anecdotal posts confirm an imminent 30% collapse."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：單一匿名個人經驗屬於倖存者偏差與極小樣本雜訊，不可作為宏觀市場結論。",
            en: "Incorrect: Anonymous anecdotal claims are tiny-sample noise riddled with survivor bias."
          }
        },
        {
          id: "B",
          text: {
            zh: "連上台灣中央銀行 (CBC) 與金管會官方網站，查閱銀行法第 72-2 條法定放款比率與首購自住配套政策。",
            en: "Navigate to CBC & FSC official portals to inspect Banking Act Section 72-2 caps and owner-occupier priority buffers."
          },
          isCorrect: true,
          rationale: {
            zh: "✅ 正確 (Data & Disclosure)：官方數據顯示銀行整體平均比率約 26.5%（法定上限 30%），且央行已明確督促銀行優先保障首購自住與已核准合約，30% 崩跌純屬標題黨誇大恐慌。",
            en: "Correct! Official filings reveal average bank exposure at 26.5% (under 30% legal cap), with statutory mandates ensuring first-time owner priority."
          }
        },
        {
          id: "C",
          text: {
            zh: "轉傳到親友 LINE 群組提醒大家快點賣房，以免資產縮水。",
            en: "Forward the panic post to family chat rooms urging them to dump real estate before it drops."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：這是在擴大雜訊傳播與群體情緒踩踏，助長雜訊交易者風險。",
            en: "Incorrect: This spreads toxic noise contagion and fuels Noise Trader Herding."
          }
        }
      ]
    },
    {
      id: 2,
      title: { zh: "關卡 2：高股息 ETF「年化 12% 穩賺不賠」解密", en: "Level 2: The '12% Guaranteed High-Dividend ETF' Trap" },
      headline: {
        zh: "「年化殖利率衝破 12%！某高股息 ETF 配息王誕生，退休族躺平爽領高息！」",
        en: "'Annualized Yield Breaches 12%! New High-Dividend ETF King Crowns Investors with Free Cash!'"
      },
      sourceSnippet: {
        zh: "財經網紅影片大推：『每個月都配這麼多，年化換算 12%，比定存好十倍，買了就不要賣！』",
        en: "Influencer video: 'Monthly payout hits record; annualized 12% crushes bank deposits by 10x, buy and never sell!'"
      },
      question: {
        zh: "根據 4D Filter 的 Data 與 Disclosure，投資人查核配息組成時應注意什麼？",
        en: "Scrutinizing Data & Disclosure, what structural reality must investors audit regarding distributions?"
      },
      options: [
        {
          id: "A",
          text: {
            zh: "12% 殖利率是企業營運實質盈餘，買越多賺越多。",
            en: "A 12% yield represents purely operational corporate earnings; maximum buying is guaranteed profit."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：大盤平均股利率僅約 3%~4%，不可能單純依靠成分股股利持續發放 12%。",
            en: "Incorrect: Broad market enterprise dividend yields hover near 3-4%; 12% pure dividend is impossible."
          }
        },
        {
          id: "B",
          text: {
            zh: "查核公開資訊觀測站 (MOPS) 配息公告中的「收益平準金」與「資本公積 (本金)」佔比，確認是否左手配給右手。",
            en: "Audit MOPS distribution notices for Capital Reserves & Equalization Funds to verify if yield is paid out of one's own principal."
          },
          isCorrect: true,
          rationale: {
            zh: "✅ 正確 (Data 數據求證)：許多超高殖利率 ETF 的配息來源中有高達 60%~80% 來自本金退還或資本利得，若未填息實質本金正在縮水，絕非保證收益！",
            en: "Correct! Up to 60-80% of super-high ETF payouts frequently stem from return of principal; without capital gain recovery, net principal is eroding."
          }
        },
        {
          id: "C",
          text: {
            zh: "只要看到 YouTuber 秀出存摺，就可以完全相信這檔 ETF 毫無風險。",
            en: "As long as the YouTuber shows their bank passbook, the ETF has zero investment risk."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：存摺截圖容易偽造，且網紅常有業配分潤 (Disclosure 偏誤)，忽視了總報酬 (Total Return) 觀念。",
            en: "Incorrect: Screenshots are easily edited and influencers carry affiliate incentives while ignoring Total Return."
          }
        }
      ]
    },
    {
      id: 3,
      title: { zh: "關卡 3：AI 假圖引發演算法交易閃崩事件", en: "Level 3: Generative AI Pentagon Hoax Flash Crash" },
      headline: {
        zh: "「突發重磅！五角大廈遭遇黑天鵝爆炸襲擊，標普 500 指數 10 分鐘暴跌千點！」",
        en: "'Breaking Shock! Black Smoke Explodes at Pentagon, S&P 500 Erases $50B in 10-Minute Bot Panic!'"
      },
      sourceSnippet: {
        zh: "社群推特出現一張白煙滾滾的五角大廈照片，藍勾勾認證帳號大量轉推，高頻量化交易演算法瞬間觸發拋售指令。",
        en: "Twitter feed displays an image of billowing smoke outside the Pentagon; verified accounts retweet, triggering high-frequency algo dump."
      },
      question: {
        zh: "在面對突發視覺震撼假新聞與極短線暴跌時，批判性財經大腦應採取何種防禦策略？",
        en: "Facing shocking synthetic visual media and lightning flash crashes, what is the critical defense strategy?"
      },
      options: [
        {
          id: "A",
          text: {
            zh: "立刻跟著高頻演算法市價殺出所有持股，防止歸零。",
            en: "Market-order dump all equity holdings alongside bots to avoid total wipeout."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：在流動性真空時市價拋售，正好賣在演算法雜訊砸出的最深針底，造成巨大滑價虧損。",
            en: "Incorrect: Selling at market during liquidity vacuums guarantees capitulation at the absolute lowest wick."
          }
        },
        {
          id: "B",
          text: {
            zh: "啟動 Duration 時間隔離原則，交叉查證美國國防部官方發言人公告與各大主流通訊社事實查核，等待均值回歸。",
            en: "Enforce Duration Quarantine: Cross-verify DoD official briefings and major wire checks; allow mean reversion to repair pricing."
          },
          isCorrect: true,
          rationale: {
            zh: "✅ 正確 (Duration & Cross-Verification)：歷史實證顯示，五角大廈隨後發布闢謠聲明，指數在 15 分鐘內完全回補均值。保持冷靜與多管道查核能避免被假新聞洗出場。",
            en: "Correct! The Pentagon quickly debunked the AI fake image, and indices fully rebounded within 15 minutes. Verification protects against bot noise."
          }
        },
        {
          id: "C",
          text: {
            zh: "相信所有帶有藍勾勾認證的推特帳號，不需要官方確認。",
            en: "Assume any paid verified blue-check account on social media speaks absolute truth without official communiques."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：現代社交平台的付費認證機制已無法代表官方權威，常被駭客或仿冒帳號濫用。",
            en: "Incorrect: Subscription badges on social networks do not equate to regulatory official status."
          }
        }
      ]
    },
    {
      id: 4,
      title: { zh: "關卡 4：半導體龍頭 CAPEX 資本支出數據比對", en: "Level 4: Semiconductor Capex Verification & Timing" },
      headline: {
        zh: "「震撼砍單！晶圓代工巨頭資本支出慘遭腰斬，半導體寒冬徹底來臨！」",
        en: "'Severe Cutback! Foundry Giant Reportedly Halves Annual Capex; Ice Age Deepens!'"
      },
      sourceSnippet: {
        zh: "某未署名外電報導：『據產業鏈匿名供應商透露，某龍頭大廠設備裝機全面暫停，今年支出大縮水。』引起散戶恐慌殺盤。",
        en: "Unattributed wire snippet: 'Anonymous equipment suppliers claim tool installation is frozen; capex slashed.' Retail panics."
      },
      question: {
        zh: "運用 4D Filter 的 Data 與 Divergence 原則，下列哪一項查證步驟最具決定性？",
        en: "Applying Data & Divergence, which investigative step definitively exposes the reality?"
      },
      options: [
        {
          id: "A",
          text: {
            zh: "直接至公開資訊觀測站 (MOPS) 查看該公司法定發布的「重大訊息澄清說明」與法說會簡報之 CAPEX 指引區間。",
            en: "Check Taiwan MOPS directly for official statutory Clarification Notices and the exact Capex guidance range in the Earnings Presentation."
          },
          isCorrect: true,
          rationale: {
            zh: "✅ 正確 (Data 權威源)：上市公司受證交法規範，若資本支出有重大變動必須合法申報重訊。法說會通常重申全年資本支出區間（如 300~320 億美元）無變動，傳言僅是單一機台進駐時程微調。",
            en: "Correct! Listed enterprises are bound by securities laws to file statutory clarifications. Real filings showed full-year Capex maintained at $30-32B."
          }
        },
        {
          id: "B",
          text: {
            zh: "看網路討論區有多少人在按讚，讚數越多表示傳言越真實。",
            en: "Check how many upvotes the Reddit/PTT post has; popular posts reflect objective empirical truth."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：按讚數反映的是演算法熱度與大眾情緒偏見，與企業資產負債表數據毫無相關。",
            en: "Incorrect: Upvotes quantify social momentum and confirmation bias, completely disconnected from corporate balance sheets."
          }
        },
        {
          id: "C",
          text: {
            zh: "立即融券放空供應鏈股票，跟隨新聞賭一把跌勢。",
            en: "Aggressively short equipment supply chain stocks to gamble on further media panic."
          },
          isCorrect: false,
          rationale: {
            zh: "❌ 錯誤：這是典型的雜訊交易者行為，面臨公司重訊澄清後股價暴漲軋空的巨大風險。",
            en: "Incorrect: Classic Noise Trading that risks brutal short squeezes once official澄清 announcements hit the tape."
          }
        }
      ]
    }
  ]
};

// ==========================================
// 4. 第 3 小時課堂實務作業：4D Filter 檢驗報告
// ==========================================
const HOMEWORK_CONFIG = {
  title: {
    zh: "📝 第 3 小時課堂實務作業：4D Filter 財經新聞檢驗報告",
    en: "📝 Hour 3 Assignment: 4D Filter Financial News Verification Report"
  },
  subtitle: {
    zh: "自選或載入本週真實財經新聞，運用 4D Filter 進行多維度深度查核並在線生成/匯出專業報告",
    en: "Select or preset a real news story; apply the 4D Filter to generate a structured audit report"
  },
  rubric: [
    { code: "D1", name: "Data 數據查核", en: "Data Audit", weight: 30, desc: { zh: "查核官方第一手審計數據 (MOPS/SEC/FRED)，指出新聞是否誇大或誤讀", en: "Verified against statutory repositories (MOPS/SEC/FRED); exposed misinterpretation" } },
    { code: "D2", name: "Disclosure 利益揭露", en: "Conflict Disclosure", weight: 20, desc: { zh: "分析作者背景、贊助業配、持股關係或點閱率獲利動機", en: "Evaluated author stakes, sponsorships, affiliations, or ad clickbait incentives" } },
    { code: "D3", name: "Divergence 多元觀點", en: "View Divergence", weight: 25, desc: { zh: "主動尋求反方權威或機構研究，打破演算法同溫層偏誤", en: "Sought institutional counter-theses to smash echo chamber biases" } },
    { code: "D4", name: "Duration 時間維度", en: "Time Horizon", weight: 25, desc: { zh: "釐清 24 小時短線情緒波動 vs 3~5 年實質自由現金流結構改變", en: "Differentiated 24h market sentiment from multi-year discounted cash flows" } }
  ],
  samplePresets: [
    {
      id: "sample1",
      title: "【經典案例 1】半導體大廠海外建廠毛利與預算報導",
      newsTitle: "外媒驚爆：台積電美日建廠預算大超支，海外成本將徹底拖垮毛利！",
      newsUrl: "https://finance-sample-example.org/tsmc-overseas-capex",
      newsDate: "2026-08-28",
      newsOutlet: "某跨國科技新聞網 (免費點閱導向)",
      dataInput: "經查核公開資訊觀測站 (MOPS) 114 年法說會簡報與逐字稿：公司指引海外建廠初期確實稀釋毛利率 2~3 個百分點，但隨規模經濟與當地政府補貼到帳，長期 53% 毛利率目標並未下修。新聞將常態初期折舊包裝為『徹底拖垮』，明顯誇大其詞。",
      disclosureInput: "該新聞網站為免費開放閱讀，頁面充斥晶片 ETF 廣告與期貨經紀商贊助 Banner。記者無財會專業認證背景，報導文末無作者個人持股或利益衝突揭露聲明。",
      divergenceInput: "外資投行（高盛、摩根士丹利）最新機構報告皆指出：海外佈局是鎖定蘋果、輝達等先進製程客戶不可或缺的地緣戰略，海外產能具備更高定價溢價能力，反方觀點認為長期具正面綜效。",
      durationInput: "海外設廠資本支出折舊為 5~10 年的長期攤銷，新聞聚焦的短線建廠預算波動僅為數季的過渡期現象，並未改變企業技術領先優勢與未來 3 年自由現金流充沛的本質。",
      conclusion: "Mixed", // Signal, Mixed, Noise
      decisionText: "此報導屬於包裝了微量真實數據 (2-3% 稀釋) 的高度情緒雜訊 (Noise)。投資決策應忽略短線標題煽動，維持依據企業長期產能利用率與法定財報季報進行長期追蹤。"
    },
    {
      id: "sample2",
      title: "【經典案例 2】高股息 ETF 宣稱 12% 穩賺不賠新聞",
      newsTitle: "月月爽領 12%！高股息新霸主誕生，存股族狂讚：打敗定存十倍穩賺！",
      newsUrl: "https://investment-sample.org/etf-high-yield-hype",
      newsDate: "2026-08-15",
      newsOutlet: "某財經流量自媒體與短影音頻道",
      dataInput: "至證券交易所 (TWSE) 與基金官網下載配息明細表發現：該 ETF 最近兩次配息中，收益平準金佔比 58%，已實現資本公積佔 27%，真正來自成分股股利所得僅 15%。若股價未填息，投資人實質上是『拿自己的本金配給自己』。",
      disclosureInput: "該影片下方附有券商開戶連結與專屬推薦碼，創作者每引導一名觀眾開戶下單即可獲得分潤獎金，存在極度嚴重的商業利益衝突，因此刻意避談平準金與淨值下跌風險。",
      divergenceInput: "晨星 (Morningstar) 與學術界多篇研究指出：高股息 ETF 長期總報酬 (Total Return) 常態性落後市值型指數（如標普500或台灣加權），且頻繁高配息會產生摩擦成本與額外二代健保補充保費。",
      durationInput: "12% 年化僅為截取特定單月份超額配息年化後的宣傳噱頭，無法在 3~5 年以上的時間跨度內持續，長期看重的是扣除配息後的整體資產淨值成長。",
      conclusion: "Noise",
      decisionText: "屬於典型的劣質檸檬雜訊 (Noise)。不應因高殖利率數字而重押，若追求長期資產增長，應以低管理費之大盤指數型市值 ETF 為核心配置。"
    }
  ]
};
