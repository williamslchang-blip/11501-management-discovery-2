// Week 16 Activities Data - 加密貨幣區塊鏈基礎Web3與數位資產風險
const W16_ACTIVITIES_DATA = {
  "schedule": [
    {
      "hour": "第一小時 (00:00-00:50)",
      "title": "區塊鏈、比特幣減半與 Web3 (Slide 01 - 10)",
      "summary": "區塊鏈定義、比特幣2100萬枚上限、BTC減半經濟學、以太坊智慧合約、Web3演進、冷熱錢包私鑰保管",
      "activity": "🎯 1小時活動：比特幣減半產量與冷熱錢包資安評估計算器",
      "activityTarget": "modalBtcHalvingLab"
    },
    {
      "hour": "第二小時 (00:50-01:40)",
      "title": "DeFi、穩定幣與 VASP 監管 (Slide 11 - 20)",
      "summary": "DeFi去中心化金融、NFT數位資產、USDT/USDC穩定幣、FTX倒閉危機、台灣VASP監管與比特幣現貨ETF",
      "activity": "🎯 2小時活動：DeFi 年化收益風險與數位資產 5% 避險配置試算器",
      "activityTarget": "modalCryptoAllocLab"
    },
    {
      "hour": "第三小時 (01:40-02:30)",
      "title": "防詐 SOP、數位資產配置與 4 大金律 (Slide 21 - 30)",
      "summary": "Telegram幣圈防詐、Web3三大素養、RWA資產代幣化、合法交易所KYC出入金、CoinGecko查閱與4大金律",
      "activity": "🎮 3小時小遊戲：Web3 數位資產防詐大挑戰 (4大關卡)\n📝 課堂實務作業：個人數位資產風險評估與 Web3 報告",
      "activityTarget": "modalWeb3Game"
    }
  ],
  "hour1Lab": {
    "title": "比特幣減半產量與冷熱錢包資安評估計算器",
    "description": "精算歷次比特幣減半區塊獎勵、全網每日產出枚數與年化通膨率，並評估冷熱錢包資產配置安全性",
    "presets": {
      "post_2024_halving": {
        "name": "2024 第四次減半現況 (3.125 BTC ‧ 80% 冷錢包)",
        "cycle": "4",
        "blockReward": 3.125,
        "dailyBlocks": 144,
        "btcPriceUsd": 65000,
        "coldRatio": 80,
        "use2FaHardware": true
      },
      "post_2028_halving": {
        "name": "2028 第五次減半展望 (1.5625 BTC ‧ 95% 冷錢包)",
        "cycle": "5",
        "blockReward": 1.5625,
        "dailyBlocks": 144,
        "btcPriceUsd": 120000,
        "coldRatio": 95,
        "use2FaHardware": true
      },
      "high_risk_rookie": {
        "name": "新手高危配置情境 (全放熱錢包交易所 ‧ 零冷錢包)",
        "cycle": "4",
        "blockReward": 3.125,
        "dailyBlocks": 144,
        "btcPriceUsd": 65000,
        "coldRatio": 0,
        "use2FaHardware": false
      }
    }
  },
  "hour2Lab": {
    "title": "DeFi 年化收益風險與數位資產 5% 避險配置試算器",
    "description": "以 90%-95% 核心資產配置搭配 5%-10% 衛星加密資產，並模擬極端市場回撤 (-80%) 與爆發 (+300%) 之整體衝擊",
    "presets": {
      "balanced_satellite_5": {
        "name": "穩健小資 5% 衛星配置 (核心大盤 95% + 藍籌 BTC/ETH 5%)",
        "totalCapital": 100000,
        "coreRatio": 95,
        "coreReturn": 8.0,
        "cryptoRatio": 5,
        "cryptoBtcEthRatio": 80,
        "cryptoDefiYield": 5.0,
        "extremeScenario": "-50%"
      },
      "aggressive_speculative": {
        "name": "極端投機高曝險 (核心 40% + 加密資產 60% ‧ 警示爆倉)",
        "totalCapital": 100000,
        "coreRatio": 40,
        "coreReturn": 8.0,
        "cryptoRatio": 60,
        "cryptoBtcEthRatio": 20,
        "cryptoDefiYield": 25.0,
        "extremeScenario": "-80%"
      },
      "conservative_zero_crypto": {
        "name": "零加密資產保守配置 (純傳統 0050 與定期存款 100%)",
        "totalCapital": 100000,
        "coreRatio": 100,
        "coreReturn": 7.0,
        "cryptoRatio": 0,
        "cryptoBtcEthRatio": 0,
        "cryptoDefiYield": 0.0,
        "extremeScenario": "0%"
      }
    }
  },
  "game": [
    {
      "id": 1,
      "title": "第一關：區塊鏈與比特幣底層特質考核",
      "question": "比特幣代碼中設定的總發行量上限是多少？其主要如何實現對抗法幣通膨的「數位黃金」稀缺性？",
      "options": [
        "總量無上限，每年由以太坊基金會投票決定增發率",
        "總量上限恆定為 2,100 萬枚，且每 21 萬個區塊挖礦獎勵減半一次",
        "總量上限為 1 億枚，由美國 SEC 負責監管代幣銷毀",
        "總量由各國中央銀行依據黃金儲備動態調節"
      ],
      "correct": 1,
      "explanation": "正確！比特幣白皮書嚴格將發行總量鎖定在 2,100 萬枚，且平均約每 4 年（21 萬區塊）產出獎勵減半一次，形成絕對稀缺性與抗通膨特質。"
    },
    {
      "id": 2,
      "title": "第二關：私鑰安全與冷熱錢包管理準則",
      "question": "在幣圈常聽到「Not your keys, not your coins」，關於 12 或 24 組錢包助記詞的保管，下列哪項做法是絕對安全且正確的？",
      "options": [
        "截圖拍照上傳到 Google Drive 或 iCloud 雲端硬碟方便備份",
        "用手機相機拍下後，傳送到個人 Telegram 收藏夾以便隨時查看",
        "將助記詞純手工抄寫在防水防火實體紙卡或金屬助記詞板上，離線鎖入保險箱，絕不上網",
        "遇到官方客服熱心詢問時，提供助記詞給客服協助恢復被凍結的資產"
      ],
      "correct": 2,
      "explanation": "正確！助記詞與私鑰一旦聯網（截圖、雲端、通訊軟體）即面臨木馬或後門竊取風險。唯一安全的做法是純離線物理抄寫，且絕不向任何人洩漏！"
    },
    {
      "id": 3,
      "title": "第三關：DeFi 運作與防範幣圈釣魚詐騙",
      "question": "小明在 Telegram 收到自稱「某知名交易所官方高級客服」私訊，告知其帳戶有洗錢嫌疑即將被凍結，需點擊某外部連結並輸入助記詞驗證解鎖。小明應該如何處置？",
      "options": [
        "趕緊點擊連結並輸入助記詞，以免帳戶真的被凍結",
        "將私鑰發給該客服，請客服幫忙代操轉移資產",
        "立刻封鎖該帳號並檢舉！官方人員絕不會主動私訊索取私鑰，此為典型釣魚詐騙手法",
        "先轉帳 1,000 USDT 到客服指定錢包作為解鎖保證金"
      ],
      "correct": 2,
      "explanation": "正確！官方客服或任何正規機構絕對不會主動私訊要求提供私鑰或助記詞，所有要求輸入助記詞的非官方連結百分之百為釣魚詐騙！"
    },
    {
      "id": 4,
      "title": "第四關：台灣 VASP 合規出入金與法遵原則",
      "question": "大一學生若希望將新台幣兌換為加密貨幣，最安全且具備法律保障的正規出入金 SOP 應為下列何者？",
      "options": [
        "在臉書社團私下尋找陌生網友進行現金 OTC 場外交易，可省手續費",
        "註冊完成台灣金管會洗錢防制法遵聲明之合規交易所（完成實名制 KYC），並綁定本人同名實體銀行帳戶出入金",
        "隨便下載不知名海外 APP，聽從陌生網友指示將錢匯入個人人頭帳戶",
        "在 Telegram 投資群組向群主購買未受監管的內盤籌碼代幣"
      ],
      "correct": 1,
      "explanation": "正確！使用完成金管會法遵聲明且配合銀行信託託管之合法交易所，進行實名 KYC 與本人同名帳戶轉帳，才能避免收到贓款淪為洗錢人頭戶。"
    }
  ],
  "homeworkTemplate": {
    "title": "第十六週課堂作業：個人數位資產風險評估與 Web3 報告",
    "description": "四維度全方位實務分析：區塊鏈去中心化特質 ‧ 冷熱錢包私鑰防禦 ‧ 5% 衛星配置試算 ‧ 合規出入金與防詐金律",
    "dim1": "【區塊鏈底層特質與比特幣減半分析】\n1. 區塊鏈核心技術解構：說明密碼學雜湊（Hash）、分散式帳本與共識機制（PoW/PoS）如何實現去中心化信任，消除對單一金融中介機構的依賴。\n2. 比特幣 2,100 萬枚稀缺性：剖析中本聰抗通膨的數學設計，對比各國央行量化寬鬆（QE）法幣膨脹機制。\n3. 2024 年第四次減半實務：計算區塊獎勵由 6.25 BTC 降至 3.125 BTC 對全網每日產出（約 450 枚）及年化通膨率（降至 0.85% 以下）之結構性壓抑效應。",
    "dim2": "【私鑰管理準則與歷史風控教訓反思】\n1. Not your keys, not your coins 實踐：對比冷錢包（Ledger, Trezor 離線物理隔離）與熱錢包（MetaMask 瀏覽器外掛易受釣魚攻擊）之資安架構。\n2. 助記詞黃金鐵律：制定個人助記詞物理備份 SOP（純紙卡/鋼板手工抄寫、防火防潮、嚴禁拍照上傳雲端硬碟）。\n3. 2022 FTX 破產事件教訓：剖析 SBF 挪用用戶存款至 Alameda Research 之道德風險，說明資產挪用、儲備證明（PoR）與金管會要求客戶資產信託隔離之重要性。",
    "dim3": "【5% 衛星避險配置模型與壓力測試】\n1. 投資組合架構：以 10 萬元儲蓄為例，配置 9.5 萬元於大盤指數（0050 ETF），5,000 元配置於主流藍籌加密資產（BTC 70% + ETH 30%）。\n2. 收益與風險壓力測試：\n   - 上行爆發情境：若加密資產單年上漲 200%，為整體組合額外創造 1 萬元收益（增厚整體報酬率達 10%）。\n   - 極端黑天鵝情境：若遭遇熊市崩跌 80%，最大虧損僅 4,000 元，核心 0050 ETF 正常獲利（以 7% 計為 6,650 元）輕鬆抵禦虧損，本金零風險。\n3. 拒絕合約槓桿承諾：嚴正申明絕不碰合約期貨高倍槓桿，防範穿倉清算風險。",
    "dim4": "【合規出入金 SOP 與個人 4 大防詐金律實踐】\n1. 台灣合規出入金 SOP：選擇完成金管會洗錢防制法遵聲明之合規本土交易所（如 BitoPro, MAX），完成 Level 2 身分證件 KYC，並綁定本人同名之實體銀行帳戶網銀轉帳出入金。\n2. 拒絕場外地下 OTC：說明場外私下現金交易面臨收到詐騙洗錢贓款、導致名下所有銀行帳戶淪為「警示人頭戶」凍結數年之嚴重法律後果。\n3. 個人幣圈防詐 4 大守則：(1) 不向任何人洩漏助記詞；(2) 不點擊 Telegram/Discord 私訊陌生連結；(3) 不相信保證月息 30% 假量化投資平台；(4) 嚴格堅守 5% 投資上限，落實理性數位資產管理。"
  }
};
