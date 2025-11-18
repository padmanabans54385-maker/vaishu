import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  const colors = [
    'text-pink-400',
    'text-rose-400',
    'text-red-400',
    'text-pink-400',
    'text-rose-400',
  ];

  useEffect(() => {
    const heartCount = Math.floor(Math.random() * 6) + 10;
    const generatedHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 20,
      size: Math.random() * 16 + 14,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`heart-drift ${heart.color}`}
          style={{
            top: `${heart.top}%`,
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animation: `drift ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            strokeWidth={0}
            className='opacity-20'
          />
        </div>
      ))}
    </div>
  );
}