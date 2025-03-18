import { useState } from "react";

export default function UseSwipeSlider({
  totalItems,
  itemsPerPage = 4,
  initialIndex = 0,
  threshold = 50,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > threshold) {
      nextSlide();
    } else if (swipeDistance < -threshold) {
      prevSlide();
    }
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
