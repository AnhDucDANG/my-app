'use client';

import { useRef, useState, useEffect } from 'react';
import { Heart, MessageSquare, Share2, Play, Volume2, VolumeX } from 'lucide-react';

interface VideoData {
  id: number;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
  commentsCount: string;
}

export default function VideoCard({ video }: { video: VideoData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(video.likesCount);

  // 🌟 Hàm xử lý Click sửa đổi: Đảm bảo kiểm tra mượt mà cả trạng thái mạng/tải video
  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Trình duyệt chặn hoặc video chưa tải xong:", err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setCurrentLikes(prev => prev - 1);
    } else {
      setIsLiked(true);
      setCurrentLikes(prev => prev + 1);
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    videoEl.addEventListener('play', onPlay);
    videoEl.addEventListener('pause', onPause);

    return () => {
      videoEl.removeEventListener('play', onPlay);
      videoEl.removeEventListener('pause', onPause);
    };
  }, []);

  return (
    <div className="video-card w-full h-screen snap-start snap-always flex items-center justify-center py-4 border-b border-zinc-900/30">
      <div className="flex h-full max-h-[88vh] gap-5 items-end relative">
        
        {/* KHUNG VIDEO 9:16 */}
        <div 
          className="h-full aspect-[9/16] bg-zinc-950 rounded-2xl overflow-hidden relative shadow-2xl border border-zinc-850 group"
          onClick={handleVideoClick} // 🌟 MẸO CHÍ MẠNG: Đưa onClick ra thẻ bọc ngoài cùng của video thay vì chỉ đặt ở thẻ <video>
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover cursor-pointer"
            loop
            muted={isMuted}
            playsInline
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* NÚT MUTE */}
          <button 
            onClick={toggleMute}
            className="absolute top-4 right-4 p-2.5 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm text-white z-20 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* ICON PLAY KHI PAUSE */}
          {!isPlaying && (
            // 🌟 ĐÃ SỬA: Đảm bảo toàn bộ cụm này và các div con đều có pointer-events-none để không cản chuột
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none z-10">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-md animate-ping absolute w-16 h-16 opacity-30 pointer-events-none" />
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-md pointer-events-none">
                <Play className="w-7 h-7 text-white fill-white pointer-events-none" />
              </div>
            </div>
          )}

          {/* TÊN TÁC GIẢ */}
          <div className="absolute bottom-5 left-5 right-5 text-white z-10 flex flex-col gap-1.5 pointer-events-none">
            <h3 className="font-bold text-lg tracking-wide">@{video.authorName}</h3>
            <p className="text-sm text-zinc-200 line-clamp-2 font-light leading-relaxed">
              {video.description}
            </p>
          </div>
        </div>

        {/* DẢI NÚT TƯƠNG TÁC BÊN PHẢI */}
        <div className="flex flex-col gap-4 items-center mb-6 z-10">
          <button onClick={handleLikeClick} className="flex flex-col items-center group/btn">
            <div className={`p-3 rounded-full transition-all duration-200 ${
              isLiked ? 'bg-red-500/10 text-red-500' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}>
              <Heart className={`w-5 h-5 transition group-hover/btn:scale-110 ${isLiked ? 'fill-red-500' : ''}`} />
            </div>
            <span className="text-xs text-zinc-400 mt-1.5 font-medium">{currentLikes.toLocaleString()}</span>
          </button>

          <button className="flex flex-col items-center group/btn">
            <div className="p-3 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full transition duration-200">
              <MessageSquare className="w-5 h-5 transition group-hover/btn:scale-110" />
            </div>
            <span className="text-xs text-zinc-400 mt-1.5 font-medium">{video.commentsCount}</span>
          </button>

          <button className="flex flex-col items-center group/btn">
            <div className="p-3 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full transition duration-200">
              <Share2 className="w-5 h-5 transition group-hover/btn:scale-110" />
            </div>
            <span className="text-xs text-zinc-400 mt-1.5 font-medium">Chia sẻ</span>
          </button>
        </div>

      </div>
    </div>
  );
}