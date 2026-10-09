import React from 'react';

export const Card = ({ children, className = '', title, icon: Icon, badge, action }) => {
  return (
    <div className={`glass-panel rounded-xl p-5 border border-slate-800/80 shadow-xl transition-all duration-200 ${className}`}>
      {(title || Icon || badge || action) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Icon className="w-4 h-4" />
              </div>
            )}
            {title && <h3 className="text-base font-semibold text-slate-100 tracking-tight">{title}</h3>}
          </div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                {badge}
              </span>
            )}
            {action}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
