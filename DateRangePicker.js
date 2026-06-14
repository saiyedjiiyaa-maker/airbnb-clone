import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function isSameDay(a, b) {
  return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}
function isInRange(date, start, end) {
  if (!start || !end) return false;
  const d = date.getTime(), s = start.getTime(), e = end.getTime();
  return d > s && d < e;
}
function toDateStr(d) {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function formatDisplay(d) {
  if (!d) return "";
  return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
}

function CalendarMonth({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover, today, darkMode }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/40" : "text-obsidian/40";
  const bgHover  = darkMode ? "hover:bg-gold/20" : "hover:bg-gold/10";

  return (
    <div className="w-full">
      <p className={`font-display text-sm font-semibold text-center mb-3 ${textMain}`}>
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className={`font-body text-xs text-center py-1 ${textSub}`}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`}/>;
          const isPast = date < today;
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date, startDate, endDate || hoverDate);
          const isHover = isSameDay(date, hoverDate) && startDate && !endDate;
          const isToday = isSameDay(date, today);

          let cls = `relative h-8 flex items-center justify-center text-xs font-body cursor-pointer select-none transition-all `;
          if (isPast) {
            cls += `${textSub} cursor-not-allowed opacity-40 `;
          } else if (isStart || isEnd) {
            cls += `text-white font-semibold z-10 `;
          } else if (inRange) {
            cls += `${darkMode ? "bg-gold/15 text-ivory" : "bg-gold/10 text-obsidian"} `;
          } else if (isHover) {
            cls += `${darkMode ? "bg-gold/10 text-ivory" : "bg-gold/05 text-obsidian"} `;
          } else {
            cls += `${textMain} ${bgHover} rounded-full `;
          }

          return (
            <div key={i} className="relative flex items-center justify-center h-8">
              {/* Range background pill */}
              {(inRange) && (
                <div className={`absolute inset-y-0 inset-x-0 ${darkMode ? "bg-gold/10" : "bg-amber-50"}`}
                  style={{
                    borderRadius: isEnd ? "0 9999px 9999px 0" : "0",
                    left: isEnd ? "0" : undefined,
                  }}
                />
              )}
              {isStart && endDate && (
                <div className={`absolute inset-y-0 right-0 left-1/2 ${darkMode ? "bg-gold/10" : "bg-amber-50"}`}/>
              )}
              {isEnd && startDate && !isSameDay(startDate,endDate) && (
                <div className={`absolute inset-y-0 left-0 right-1/2 ${darkMode ? "bg-gold/10" : "bg-amber-50"}`}/>
              )}

              <button
                disabled={isPast}
                onClick={() => !isPast && onDayClick(date)}
                onMouseEnter={() => !isPast && onDayHover(date)}
                className={`relative z-10 w-8 h-8 flex items-center justify-center text-xs font-body transition-all
                  ${(isStart || isEnd) ? "rounded-full text-white font-semibold" : "rounded-full"}
                  ${isPast ? "cursor-not-allowed opacity-40 " + textSub : ""}
                  ${!isPast && !isStart && !isEnd ? `${textMain} hover:bg-gold/30 hover:rounded-full` : ""}
                  ${isStart || isEnd ? "" : ""}
                `}
                style={(isStart || isEnd) ? {background:"#FF385C"} : {}}
              >
                {date.getDate()}
                {isToday && !isStart && !isEnd && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"/>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangePicker({ checkIn, checkOut, onChange, darkMode }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState("in"); // "in" | "out"
  const [hoverDate, setHoverDate] = useState(null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef(null);

  const startDate = checkIn ? new Date(checkIn + "T00:00:00") : null;
  const endDate   = checkOut ? new Date(checkOut + "T00:00:00") : null;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); }
    else setViewMonth(m => m-1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); }
    else setViewMonth(m => m+1);
  };

  const nextViewMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextViewYear  = viewMonth === 11 ? viewYear + 1 : viewYear;

  const handleDayClick = (date) => {
    if (selecting === "in" || (startDate && date < startDate)) {
      onChange(toDateStr(date), "");
      setSelecting("out");
    } else {
      if (isSameDay(date, startDate)) return;
      onChange(checkIn, toDateStr(date));
      setSelecting("in");
      setOpen(false);
    }
  };

  const clearDates = () => { onChange("",""); setSelecting("in"); };

  const cardBg  = darkMode ? "bg-[#1a1a1a] border-gold/20" : "bg-white border-gold/20";
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/50" : "text-obsidian/50";
  const inputBg  = darkMode ? "bg-white/5 border-gold/20" : "bg-white border-gold/20";

  const nights = startDate && endDate
    ? Math.max(0, Math.round((endDate - startDate) / 86400000))
    : 0;

  return (
    <div ref={ref} className="relative">
      {/* Trigger inputs */}
      <div className="grid grid-cols-2 gap-2 mb-1">
        <button
          onClick={() => { setOpen(true); setSelecting("in"); }}
          className={`lux-input text-left text-sm transition-all ${inputBg}
            ${open && selecting==="in" ? "border-gold ring-2 ring-gold/20" : ""}
            ${textMain}`}
        >
          {startDate ? (
            <span>{formatDisplay(startDate)}</span>
          ) : (
            <span className={textSub}>Add date</span>
          )}
        </button>
        <button
          onClick={() => { setOpen(true); setSelecting("out"); }}
          className={`lux-input text-left text-sm transition-all ${inputBg}
            ${open && selecting==="out" ? "border-gold ring-2 ring-gold/20" : ""}
            ${textMain}`}
        >
          {endDate ? (
            <span>{formatDisplay(endDate)}</span>
          ) : (
            <span className={textSub}>Add date</span>
          )}
        </button>
      </div>

      {/* Nights badge */}
      {nights > 0 && (
        <div className="flex items-center justify-between mb-1 px-0.5">
          <span className={`font-body text-xs ${textSub}`}>{nights} night{nights>1?"s":""}</span>
          <button onClick={clearDates} className={`font-body text-xs ${textSub} hover:text-gold flex items-center gap-0.5`}>
            <X size={10}/> Clear
          </button>
        </div>
      )}

      {/* Calendar dropdown */}
      {open && (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[999] rounded-2xl border shadow-2xl p-5 ${cardBg}`}
          style={{width: "min(680px, 95vw)"}}>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`font-display text-sm font-semibold ${textMain}`}>
                {selecting === "in" ? "Select check-in date" : "Select check-out date"}
              </p>
              {nights > 0 && (
                <p className="font-body text-xs text-gold mt-0.5">{nights} night{nights>1?"s":""} selected</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode?"hover:bg-white/10":"hover:bg-gray-100"} transition-colors`}>
                <ChevronLeft size={16} className={textMain}/>
              </button>
              <button onClick={nextMonth}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode?"hover:bg-white/10":"hover:bg-gray-100"} transition-colors`}>
                <ChevronRight size={16} className={textMain}/>
              </button>
              <button onClick={() => setOpen(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode?"hover:bg-white/10":"hover:bg-gray-100"} transition-colors`}>
                <X size={16} className={textMain}/>
              </button>
            </div>
          </div>

          {/* Two-month grid */}
          <div className="grid grid-cols-2 gap-6"
            onMouseLeave={() => setHoverDate(null)}>
            <CalendarMonth
              year={viewYear} month={viewMonth}
              startDate={startDate} endDate={endDate}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              today={today} darkMode={darkMode}
            />
            <CalendarMonth
              year={nextViewYear} month={nextViewMonth}
              startDate={startDate} endDate={endDate}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              today={today} darkMode={darkMode}
            />
          </div>

          {/* Footer */}
          <div className={`mt-4 pt-3 border-t ${darkMode?"border-white/10":"border-gray-100"} flex items-center justify-between`}>
            <button onClick={clearDates}
              className={`font-body text-xs underline ${textSub} hover:text-gold`}>
              Clear dates
            </button>
            {startDate && endDate && (
              <button onClick={() => setOpen(false)}
                className="font-body text-xs text-white px-4 py-1.5 rounded-full"
                style={{background:"#FF385C"}}>
                Done — {nights} night{nights>1?"s":""}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
