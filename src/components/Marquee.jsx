import React from 'react'

const Marquee = () => {
  return (
    <>
      <div className="overflow-hidden bg-gradient-to-r from-[#0B192C] to-gray-400 to-teal-300 text-white font-bold py-2 w-full">
        <div className="marquee">
          <div className="marquee-content">
            <span>leadership</span>
            <span>studying</span>
            <span>motivation</span>
            <span>tutoring</span>
            <span>self-study</span>
            <span>progress</span>
            <span>together</span>
            <span>community</span>
            <span>social-events</span>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(5%);
            }
            to {
              transform: translateX(-38%);
            }
          }

          .marquee {
            display: flex;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
            width: 100%;
          }

          .marquee-content {
            display: flex;
            gap: 10rem; 
            min-width: 200%;
            animation: marquee 9s linear infinite;
          }

          .marquee-content::after {
            content: attr(data-text);
            display: flex;
            gap: 9rem;
          }
        `}
      </style>
    </>
  )
}

export default Marquee
