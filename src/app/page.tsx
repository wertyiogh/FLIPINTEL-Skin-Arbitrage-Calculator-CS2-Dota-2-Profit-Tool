"use client";
import React, { useState, useEffect } from "react";
import { 
  Plus, BarChart3, Globe, Zap, 
  Layers, ChevronRight, LayoutDashboard, Target, 
  ExternalLink, Calculator, TrendingUp
} from "lucide-react";

interface TradeItem {
  id: number;
  name: string;
  source: string;
  buyPrice: number;
  steamPrice: number;
  currency: string;
}

const UI_TEXT = {
  RU: {
    title: "FLIP",
    subtitle: "Node_Active",
    desc: "Профессиональный калькулятор арбитража и расчета цен скинов",
    injection: "Параметры_Сделки",
    asset: "Название_Предмета",
    buy: "Цена_Закупа",
    target: "Продажа_Steam",
    origin: "Платформа",
    deploy: "Рассчитать_И_Сохранить",
    stream: "Поток_Сделок",
    purge: "Очистить_Логи",
    idle: "Система_Ожидает_Ввода_Данных",
    note: "Расчеты включают комиссию Steam 13%.",
    bonus: "Бонус при переходе"
  },
  EN: {
    title: "FLIP",
    subtitle: "Node_Active",
    desc: "Professional arbitrage & price calculation terminal",
    injection: "Trade_Parameters",
    asset: "Asset_Identity",
    buy: "Buy_Price",
    target: "Steam_Target",
    origin: "Origin_Platform",
    deploy: "Analyze_And_Deploy",
    stream: "Live_Profit_Stream",
    purge: "Purge_History",
    idle: "System_Idle // Awaiting_Input",
    note: "All calculations include 13% Steam fee.",
    bonus: "Partner Bonus Included"
  }
};

const CURRENCIES = {
  USD: "$",
  UAH: "₴",
  RUB: "₽",
  EUR: "€"
};

// ТВОИ РЕФЕРАЛЬНЫЕ ССЫЛКИ
const MARKET_LINKS = [
  { 
    name: "DMarket", 
    url: "https://dmarket.com?ref=Zivx7w98EQ", 
    color: "hover:text-yellow-500",
    hasBonus: true 
  },
  { 
    name: "Skinport", 
    url: "https://skinport.com/r/YOUR_ID", 
    color: "hover:text-blue-400",
    hasBonus: true 
  },
  { 
    name: "Buff163", 
    url: "https://buff.163.com", 
    color: "hover:text-red-500",
    hasBonus: false 
  },
  { 
    name: "CS.Money", 
    url: "https://cs.money", 
    color: "hover:text-cyan-400",
    hasBonus: true 
  },
  { 
    name: "Market.CSGO", 
    url: "https://market.csgo.com", 
    color: "hover:text-green-400",
    hasBonus: false 
  },
];

export default function FlipIntel() {
  const [lang, setLang] = useState<"RU" | "EN">("RU");
  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>("USD");
  const [itemName, setItemName] = useState("");
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [steamPrice, setSteamPrice] = useState<string>("");
  const [source, setSource] = useState("DMarket");
  const [history, setHistory] = useState<TradeItem[]>([]);

  const t = UI_TEXT[lang];

  useEffect(() => {
    const saved = localStorage.getItem("flip_v15_final");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addTrade = () => {
    if (!itemName.trim()) return;
    const newItem: TradeItem = { 
      id: Date.now(), 
      name: itemName.toUpperCase(), 
      source, 
      buyPrice: Number(buyPrice) || 0, 
      steamPrice: Number(steamPrice) || 0,
      currency
    };
    const updated = [newItem, ...history];
    setHistory(updated);
    localStorage.setItem("flip_v15_final", JSON.stringify(updated));
    setItemName(""); setBuyPrice(""); setSteamPrice("");
  };

  const calculateProfit = (sell: number, buy: number) => {
    const net = sell * 0.87; 
    const profit = net - buy;
    const roi = buy !== 0 ? (profit / buy) * 100 : 0;
    return { profit, roi };
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-100 font-sans p-6 lg:p-10 selection:bg-green-500 selection:text-black">
      
      {/* HEADER SECTION */}
      <header className="max-w-[1600px] mx-auto space-y-8 mb-12 border-b border-zinc-900 pb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          {/* LOGO & TITLE */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-mono text-green-500 uppercase tracking-[0.5em]">{t.subtitle}</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic uppercase text-white leading-none">
              {t.title}<span className="text-green-500 underline decoration-4 underline-offset-8">INTEL</span>
            </h1>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-4 flex items-center gap-2">
               <Calculator size={14} className="text-green-500" /> {t.desc}
            </p>
          </div>

          {/* AFFILIATE MARKET BAR (TOP) */}
          <div className="flex flex-wrap items-center gap-2 bg-zinc-900/20 p-2 rounded-2xl border border-zinc-800/50 backdrop-blur-xl">
            {MARKET_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-2 px-5 py-3 bg-black/40 border border-zinc-800 rounded-xl text-[11px] font-black uppercase tracking-tighter text-zinc-400 transition-all ${link.color} hover:border-zinc-600 hover:scale-105 active:scale-95`}
              >
                {link.name} 
                <ExternalLink size={12} className="opacity-40 group-hover:opacity-100" />
                {link.hasBonus && (
                  <span className="absolute -top-2 -right-1 bg-green-500 text-[8px] text-black px-1.5 py-0.5 rounded font-black animate-bounce shadow-lg">
                    +%
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* GLOBAL SETTINGS */}
          <div className="flex items-center gap-4 bg-zinc-900/30 p-2 rounded-2xl border border-zinc-800">
            <div className="flex bg-black/60 rounded-xl p-1">
              {["RU", "EN"].map((l) => (
                <button key={l} onClick={() => setLang(l as "RU" | "EN")} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${lang === l ? "bg-green-500 text-black shadow-lg" : "text-zinc-600 hover:text-zinc-300"}`}>{l}</button>
              ))}
            </div>
            <div className="flex bg-black/60 rounded-xl p-1">
              {Object.keys(CURRENCIES).map((c) => (
                <button key={c} onClick={() => setCurrency(c as keyof typeof CURRENCIES)} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${currency === c ? "bg-blue-600 text-white shadow-lg" : "text-zinc-600 hover:text-zinc-300"}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* INPUT PANEL */}
        <div className="lg:col-span-4">
          <div className="bg-[#0a0a0a] border-2 border-zinc-900 p-8 rounded-3xl shadow-2xl sticky top-10">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-3">
              <LayoutDashboard size={16} className="text-green-500" /> {t.injection}
            </h2>

            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] uppercase font-black text-zinc-600 ml-1 mb-2 block group-focus-within:text-green-500 transition-colors">{t.asset}</label>
                <input type="text" placeholder="AK-47 | SLATE (FT)" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full bg-black border-2 border-zinc-900 p-5 rounded-2xl text-sm focus:border-green-500 outline-none uppercase font-bold text-white transition-all placeholder:text-zinc-800 shadow-inner"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] uppercase font-black text-zinc-600 ml-1 mb-2 block">{t.buy} ({CURRENCIES[currency]})</label>
                    <input type="number" placeholder="0.00" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} className="w-full bg-black border-2 border-zinc-900 p-5 rounded-2xl text-sm font-mono focus:border-green-500 outline-none text-white transition-all"/>
                 </div>
                 <div>
                    <label className="text-[10px] uppercase font-black text-zinc-600 ml-1 mb-2 block">{t.target} ({CURRENCIES[currency]})</label>
                    <input type="number" placeholder="0.00" value={steamPrice} onChange={(e) => setSteamPrice(e.target.value)} className="w-full bg-black border-2 border-zinc-900 p-5 rounded-2xl text-sm font-mono focus:border-green-500 outline-none text-white transition-all"/>
                 </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-zinc-600 ml-1 mb-2 block">{t.origin}</label>
                <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full bg-black border-2 border-zinc-900 p-5 rounded-2xl text-xs uppercase font-black text-zinc-400 outline-none cursor-pointer hover:border-zinc-700 transition-all appearance-none">
                  {MARKET_LINKS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                  <option>Steam Market</option>
                </select>
              </div>

              <button onClick={addTrade} className="w-full bg-green-500 hover:bg-green-400 text-black font-black uppercase py-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.4)] active:scale-95 mt-4 group">
                <TrendingUp size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/> {t.deploy}
              </button>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <p className="text-[10px] leading-relaxed font-bold text-zinc-600 uppercase tracking-tighter flex items-start gap-3 italic">
                  <Zap size={14} className="text-yellow-500 mt-0.5 shrink-0" />
                  {t.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT STREAM */}
        <div className="lg:col-span-8">
          <div className="bg-[#0a0a0a] border-2 border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-black/40 backdrop-blur-md">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-3">
                <BarChart3 size={18} className="text-green-500" /> {t.stream}
              </span>
              <button onClick={() => {setHistory([]); localStorage.removeItem("flip_v15_final")}} className="text-[10px] font-black uppercase text-zinc-700 hover:text-red-500 transition-all tracking-widest">{t.purge}</button>
            </div>

            <div className="divide-y divide-zinc-900 overflow-y-auto max-h-[750px] scrollbar-hide">
              {history.length === 0 ? (
                <div className="p-40 text-center opacity-10">
                  <Layers size={60} className="mx-auto mb-6" />
                  <p className="text-xs font-mono uppercase tracking-[0.5em]">{t.idle}</p>
                </div>
              ) : (
                history.map((item) => {
                  const { profit, roi } = calculateProfit(item.steamPrice, item.buyPrice);
                  const isPositive = profit >= 0;
                  const itemSymbol = CURRENCIES[item.currency as keyof typeof CURRENCIES] || "$";
                  
                  return (
                    <div key={item.id} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-white/[0.01] transition-all group border-l-4 border-transparent hover:border-green-500">
                      <div className="flex items-center gap-8 w-full">
                        <div className={`hidden md:block w-1.5 h-16 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="text-[9px] px-2 py-1 rounded-lg bg-zinc-900 text-zinc-400 font-black uppercase border border-zinc-800 tracking-tighter">
                              {item.source}
                            </span>
                            <h3 className="font-black italic uppercase text-xl text-white group-hover:text-green-500 transition-colors tracking-tighter">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-[11px] font-mono text-zinc-600 uppercase font-bold tracking-widest">
                            In: {itemSymbol}{item.buyPrice} <span className="mx-2 text-zinc-800">|</span> Out: {itemSymbol}{item.steamPrice}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-12 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <div className={`text-3xl font-black italic tracking-tighter leading-none mb-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? '+' : ''}{profit.toFixed(2)}{itemSymbol}
                          </div>
                          <div className={`text-[11px] font-black uppercase tracking-widest ${isPositive ? 'text-green-500/40' : 'text-red-500/40'}`}>
                            ROI: {roi.toFixed(1)}%
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            const updated = history.filter(h => h.id !== item.id);
                            setHistory(updated);
                            localStorage.setItem("flip_v15_final", JSON.stringify(updated));
                          }} 
                          className="p-3 bg-zinc-900/50 rounded-xl text-zinc-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}