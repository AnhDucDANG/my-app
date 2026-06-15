'use client';

import { useEffect, useRef } from 'react';
import VideoCard from './components/VideoCard';
import Sidebar from './components/Sidebar';

const videos = [
    {
      id: 1,
      videoUrl: "https://www.pexels.com/vi-vn/download/video/37863867/",
      authorName: "Afham Hamsyari",
      description: "Cảnh sắc mùa thu tuyệt đẹp của làng quê và núi non",
      likesCount: 23,
      commentsCount: "123"
     
    },
    {
      id: 2,
      videoUrl:
        "https://www.pexels.com/vi-vn/download/video/37539936/",
      authorName: "Florian Delémont",
      description: "Trải nghiệm chuyến du ngoạn yên bình trên sông Seine giữa những công trình kiến ​​trúc lịch sử",
      likesCount: 45,
      commentsCount: "123"
    },
    {
      id: 3,
      videoUrl: "https://www.pexels.com/vi-vn/download/video/34782067/",
      authorName: "Sven Lachmann",
      description: "Đường phố sôi động ở Mexico với những biểu ngữ đầy màu sắc và kiến trúc mộc mạc.",
      likesCount: 56,
      commentsCount: "123"
    },
  ];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ĐIỂM CỘNG: TỰ ĐỘNG PLAY / PAUSE KHI CUỘN ĐẾN (Intersection Observer API)
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current, // Phạm vi theo dõi cuộn thuộc thẻ div cha
      rootMargin: '0px',
      threshold: 0.6, // Chỉ kích hoạt khi video chiếm từ 60% không gian màn hình trở lên
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video');
        if (!video) return;

        if (entry.isIntersecting) {
          // Tự động phát khi lọt vào tầm nhìn tầm trung
          video.play().catch(() => {
            /* Phòng trường hợp trình duyệt chặn hoàn toàn */
          });
        } else {
          // Tự động dừng và reset thời gian về 0 khi cuộn khuất tầm nhìn
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const videoElements = containerRef.current?.querySelectorAll('.video-card');
    videoElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex overflow-hidden select-none">
      
      {/* BONUS FEATURE: Thanh điều hướng Sidebar cố định bên trái trên bản Web PC */}
      <Sidebar />

      {/* CORE FEATURE: Bộ khung layout cuộn dọc chiếm toàn bộ khung hình, snap từng phần tử */}
      <section 
        ref={containerRef}
        className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </section>

    </div>
  );
}