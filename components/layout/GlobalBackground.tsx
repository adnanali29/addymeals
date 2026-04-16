import React from 'react';

export const GlobalBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FFF8F0]">
        {/* Top Region */}
        <div className="absolute top-[10%] left-[5%] opacity-20 text-4xl transform -rotate-12 animate-float">🥕</div>
        <div className="absolute top-[15%] right-[10%] opacity-20 text-4xl transform rotate-45 animate-float [animation-delay:2000ms]">🍎</div>

        {/* Middle Region */}
        <div className="absolute top-[40%] left-[15%] opacity-20 text-4xl transform rotate-12 animate-float">🧀</div>
        <div className="absolute top-[50%] right-[15%] opacity-20 text-4xl transform -rotate-12 animate-float [animation-delay:4000ms]">🥦</div>
        <div className="absolute top-[30%] left-[50%] opacity-20 text-4xl transform rotate-6 animate-float [animation-delay:2000ms]">🍗</div>

        {/* Bottom Region */}
        <div className="absolute bottom-[20%] left-[10%] opacity-20 text-4xl transform rotate-45 animate-float [animation-delay:2000ms]">🍇</div>
        <div className="absolute bottom-[15%] right-[5%] opacity-20 text-4xl transform -rotate-12 animate-float">🍕</div>
        <div className="absolute bottom-[40%] right-[35%] opacity-20 text-4xl transform -rotate-6 animate-float [animation-delay:4000ms]">🌽</div>
    </div>
);
