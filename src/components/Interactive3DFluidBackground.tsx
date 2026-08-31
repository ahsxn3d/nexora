'use client';

import React, { useEffect, useRef } from 'react';

interface MagneticNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  isAnchor?: boolean;
}

export const Interactive3DFluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse state with smooth inertia
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovering: false,
    };

    // Responsive sizing
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isHovering = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initialize Magnetic Floating Nodes
    const NODE_COUNT = Math.min(75, Math.floor(window.innerWidth / 20));
    const nodes: MagneticNode[] = [];
    const colors = ['#C59B3F', '#8C6328', '#A67C38', '#5C4028', '#D4AF57'];

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const isAnchor = i % 6 === 0;

      nodes.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: isAnchor ? Math.random() * 2.2 + 2.5 : Math.random() * 1.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.35,
        isAnchor,
      });
    }

    const GRID_SIZE = 56; // Straight clean grid cell size

    // Main 60FPS Render Loop
    const render = () => {
      // Smooth camera interpolation towards mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const clientW = window.innerWidth;
      const clientH = window.innerHeight;

      ctx.clearRect(0, 0, clientW, clientH);

      // 1. Draw Straight Architectural Grid with Cursor Hover Spotlight
      const cols = Math.ceil(clientW / GRID_SIZE) + 1;
      const rows = Math.ceil(clientH / GRID_SIZE) + 1;

      // Base subtle ambient grid lines
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(140, 105, 65, 0.055)';

      ctx.beginPath();
      // Vertical grid lines
      for (let c = 0; c <= cols; c++) {
        const gx = c * GRID_SIZE;
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, clientH);
      }
      // Horizontal grid lines
      for (let r = 0; r <= rows; r++) {
        const gy = r * GRID_SIZE;
        ctx.moveTo(0, gy);
        ctx.lineTo(clientW, gy);
      }
      ctx.stroke();

      // Spotlight illuminated straight grid on hover
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        const spotlightRadius = 260;
        const minCol = Math.max(0, Math.floor((mouse.x - spotlightRadius) / GRID_SIZE));
        const maxCol = Math.min(cols, Math.ceil((mouse.x + spotlightRadius) / GRID_SIZE));
        const minRow = Math.max(0, Math.floor((mouse.y - spotlightRadius) / GRID_SIZE));
        const maxRow = Math.min(rows, Math.ceil((mouse.y + spotlightRadius) / GRID_SIZE));

        // Illuminated Vertical Grid Segments
        for (let c = minCol; c <= maxCol; c++) {
          const gx = c * GRID_SIZE;
          const dx = Math.abs(gx - mouse.x);
          if (dx < spotlightRadius) {
            const dyMax = Math.sqrt(spotlightRadius * spotlightRadius - dx * dx);
            const startY = Math.max(0, mouse.y - dyMax);
            const endY = Math.min(clientH, mouse.y + dyMax);

            const gridGrad = ctx.createLinearGradient(gx, startY, gx, endY);
            const intensity = (1 - dx / spotlightRadius) * 0.35;
            gridGrad.addColorStop(0, 'rgba(197, 155, 63, 0)');
            gridGrad.addColorStop(0.5, `rgba(197, 155, 63, ${intensity})`);
            gridGrad.addColorStop(1, 'rgba(197, 155, 63, 0)');

            ctx.beginPath();
            ctx.moveTo(gx, startY);
            ctx.lineTo(gx, endY);
            ctx.strokeStyle = gridGrad;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }

        // Illuminated Horizontal Grid Segments
        for (let r = minRow; r <= maxRow; r++) {
          const gy = r * GRID_SIZE;
          const dy = Math.abs(gy - mouse.y);
          if (dy < spotlightRadius) {
            const dxMax = Math.sqrt(spotlightRadius * spotlightRadius - dy * dy);
            const startX = Math.max(0, mouse.x - dxMax);
            const endX = Math.min(clientW, mouse.x + dxMax);

            const gridGrad = ctx.createLinearGradient(startX, gy, endX, gy);
            const intensity = (1 - dy / spotlightRadius) * 0.35;
            gridGrad.addColorStop(0, 'rgba(197, 155, 63, 0)');
            gridGrad.addColorStop(0.5, `rgba(197, 155, 63, ${intensity})`);
            gridGrad.addColorStop(1, 'rgba(197, 155, 63, 0)');

            ctx.beginPath();
            ctx.moveTo(startX, gy);
            ctx.lineTo(endX, gy);
            ctx.strokeStyle = gridGrad;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }

        // Soft Radial Glow on the Grid intersection under cursor
        const hoverGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );
        hoverGlow.addColorStop(0, 'rgba(235, 205, 130, 0.12)');
        hoverGlow.addColorStop(0.4, 'rgba(197, 155, 63, 0.05)');
        hoverGlow.addColorStop(1, 'rgba(197, 155, 63, 0)');
        ctx.fillStyle = hoverGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and Draw Magnetic Particles & Connected Floating Filaments
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Idle floating drift
        node.originX += node.vx;
        node.originY += node.vy;

        // Bounce gently off screen boundaries
        if (node.originX < 0 || node.originX > clientW) node.vx *= -1;
        if (node.originY < 0 || node.originY > clientH) node.vy *= -1;

        // Magnetic Attraction toward Cursor
        if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - node.originX;
          const dy = mouse.y - node.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const magneticRadius = 240;

          if (dist < magneticRadius && dist > 0) {
            // Magnetic pull force (closer = stronger pull toward cursor)
            const pullFactor = (1 - dist / magneticRadius) * 0.45;
            const targetX = node.originX + dx * pullFactor;
            const targetY = node.originY + dy * pullFactor;

            node.x += (targetX - node.x) * 0.14;
            node.y += (targetY - node.y) * 0.14;
          } else {
            // Elastic spring back to home origin
            node.x += (node.originX - node.x) * 0.08;
            node.y += (node.originY - node.y) * 0.08;
          }
        } else {
          node.x += (node.originX - node.x) * 0.08;
          node.y += (node.originY - node.y) * 0.08;
        }
      }

      // 3. Draw Connecting Geometric Lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxLinkDist = 130;

          if (dist < maxLinkDist) {
            const lineAlpha = (1 - dist / maxLinkDist) * 0.28 * Math.min(n1.alpha, n2.alpha);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(140, 99, 40, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Direct Magnetic Filaments Connecting Cursor to Closest Nodes
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const connectRadius = 180;

          if (dist < connectRadius) {
            const lineAlpha = (1 - dist / connectRadius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(197, 155, 63, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 5. Draw the Floating Nodes & Glowing Anchors
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Glow ring for anchor nodes
        if (node.isAnchor) {
          const glowGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 4.0
          );
          glowGrad.addColorStop(0, `rgba(223, 184, 108, ${node.alpha * 0.7})`);
          glowGrad.addColorStop(0.5, `rgba(197, 155, 63, ${node.alpha * 0.2})`);
          glowGrad.addColorStop(1, 'rgba(197, 155, 63, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4.0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};
