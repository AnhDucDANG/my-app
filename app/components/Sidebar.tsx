'use client';

import { Home, Compass, User, Bookmark, Flame } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-full border-r border-zinc-850 p-4 flex flex-col gap-2 shrink-0 bg-black text-zinc-400">
      {/* Logo ứng dụng */}
      <div className="flex items-center gap-2 px-3 py-4 mb-4">
        <Flame className="w-8 h-8 text-red-500 fill-red-500" />
        <span className="text-xl font-bold text-white tracking-wide">VideoScroll</span>
      </div>

      {/* Danh sách Menu */}
      <div className="flex items-center gap-4 p-3 bg-zinc-900 rounded-xl cursor-pointer text-white font-semibold transition">
        <Home className="w-5 h-5 text-red-500" /> <span>Dành cho bạn</span>
      </div>
      <div className="flex items-center gap-4 p-3 hover:bg-zinc-900/60 hover:text-white rounded-xl cursor-pointer transition">
        <Compass className="w-5 h-5" /> <span>Khám phá</span>
      </div>
      <div className="flex items-center gap-4 p-3 hover:bg-zinc-900/60 hover:text-white rounded-xl cursor-pointer transition">
        <User className="w-5 h-5" /> <span>Hồ sơ cá nhân</span>
      </div>
      <div className="flex items-center gap-4 p-3 hover:bg-zinc-900/60 hover:text-white rounded-xl cursor-pointer transition">
        <Bookmark className="w-5 h-5" /> <span>Đã lưu</span>
      </div>
    </aside>
  );
}