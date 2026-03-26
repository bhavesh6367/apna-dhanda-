"use client";

import { useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    // ✅ FIX: scroll to top of product grid (not top of page — header stays)
    const productGrid = document.getElementById('product-grid-top');
    if (productGrid) {
      productGrid.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Extra offset for sticky header height
      setTimeout(() => {
        window.scrollBy({ top: -80, behavior: 'smooth' });
      }, 100);
    }
    onPageChange(newPage);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-10">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-4 py-2
          border border-[#2A2A2A]
          text-[#F5F0E8]
          font-mono text-sm
          disabled:opacity-30
          hover:border-[#E8FF00]
          hover:text-[#E8FF00]
          transition-all duration-200
          disabled:cursor-not-allowed
        "
      >
        ← PREV
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`
            w-10 h-10
            font-mono text-sm
            border
            transition-all duration-200
            ${page === currentPage
              ? 'bg-[#E8FF00] text-black border-[#E8FF00] font-bold'
              : 'border-[#2A2A2A] text-[#F5F0E8] hover:border-[#E8FF00] hover:text-[#E8FF00]'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2
          border border-[#2A2A2A]
          text-[#F5F0E8]
          font-mono text-sm
          disabled:opacity-30
          hover:border-[#E8FF00]
          hover:text-[#E8FF00]
          transition-all duration-200
          disabled:cursor-not-allowed
        "
      >
        NEXT →
      </button>
    </div>
  );
};
