import { useState, useRef } from "react";

export default function UseSwipeSlider({
  totalItems,
  itemsPerPage = 4,
  initialIndex = 0,
  threshold = 50,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const isSwiping = useRef(false); // 스와이프 중인지 추적

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleTouchStart = (e) => {
    // 후원하기 버튼 클릭은 스와이프 처리하지 않음
    if (e.target.closest("#btn-donation") || e.target.closest("button")) {
      return;
    }

    isSwiping.current = true;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    // 후원하기 버튼 클릭은 스와이프 처리하지 않음
    if (!isSwiping.current) return;

    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > threshold) {
      nextSlide();
    } else if (swipeDistance < -threshold) {
      prevSlide();
    }

    isSwiping.current = false;
  };

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    swipeHandlers,
    canGoNext: currentIndex + itemsPerPage < totalItems,
    canGoPrev: currentIndex > 0,
  };
}
