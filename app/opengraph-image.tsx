import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Maphy - AI-powered STEM Assistant';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 50%, #dbeafe 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative Background Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.1)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(236, 72, 153, 0.1)',
            filter: 'blur(60px)',
          }}
        />

        {/* Main Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
            zIndex: 1,
          }}
        >
          {/* Brain Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
              marginBottom: '30px',
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)',
            }}
          >
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>Meet </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginLeft: '20px',
              }}
            >
              Maphy
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: '#475569',
              marginBottom: '30px',
              maxWidth: '900px',
              lineHeight: '1.4',
            }}
          >
            AI-powered assistant for Mathematics, Graphing, Physics & Computer Science
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: '24px',
              fontWeight: '600',
              border: '2px solid #6ee7b7',
            }}
          >
            🎉 Open Source & Free Forever
          </div>

          {/* Floating Math Elements */}
          <div
            style={{
              position: 'absolute',
              top: '80px',
              left: '100px',
              display: 'flex',
              backgroundColor: '#ede9fe',
              padding: '16px 24px',
              borderRadius: '12px',
              border: '2px solid #c4b5fd',
              fontSize: '28px',
              fontWeight: '600',
              color: '#6b21a8',
              fontFamily: 'monospace',
            }}
          >
            ∫ f(x)dx
          </div>

          <div
            style={{
              position: 'absolute',
              top: '100px',
              right: '120px',
              display: 'flex',
              backgroundColor: '#fce7f3',
              padding: '16px 24px',
              borderRadius: '12px',
              border: '2px solid #f9a8d4',
              fontSize: '28px',
              fontWeight: '600',
              color: '#9f1239',
              fontFamily: 'monospace',
            }}
          >
            E = mc²
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '140px',
              display: 'flex',
              backgroundColor: '#dbeafe',
              padding: '16px 24px',
              borderRadius: '12px',
              border: '2px solid #93c5fd',
              fontSize: '28px',
              fontWeight: '600',
              color: '#1e3a8a',
              fontFamily: 'monospace',
            }}
          >
            O(log n)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}