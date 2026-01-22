import React, { useEffect, useRef } from 'react';

const CodingBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Code snippets to display
        const codeLines = [
            'import React from "react";',
            'const App = () => {',
            '  const [state, setState] = useState();',
            '  useEffect(() => {',
            '    fetchData();',
            '  }, []);',
            '  return <div>Hello World</div>;',
            '};',
            'export default App;',
            'function buildAwesome() {',
            '  return magic;',
            '}',
            'const data = await fetch("/api");',
            'npm run dev',
            'git commit -m "feat: amazing"',
            'async function deploy() {',
            '  await build();',
            '}',
        ];

        // Store canvas dimensions
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        class CodeLine {
            x: number;
            y: number;
            text: string;
            speed: number;
            opacity: number;
            fontSize: number;

            constructor() {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.text = codeLines[Math.floor(Math.random() * codeLines.length)];
                this.speed = 0.2 + Math.random() * 0.5;
                this.opacity = 0.1 + Math.random() * 0.2;
                this.fontSize = 12 + Math.random() * 4;
            }

            update() {
                this.y += this.speed;
                if (canvas && this.y > canvas.height + 50) {
                    this.y = -50;
                    this.x = canvas ? Math.random() * canvas.width : 0;
                    this.text = codeLines[Math.floor(Math.random() * codeLines.length)];
                }
            }

            draw() {
                if (!ctx || !canvas) return;
                const hue = (Date.now() / 100) % 360;
                ctx.font = `${this.fontSize}px "Fira Code", "Courier New", monospace`;
                ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${this.opacity})`;
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        // Create code lines
        const lines: CodeLine[] = [];
        for (let i = 0; i < 30; i++) {
            lines.push(new CodeLine());
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            lines.forEach(line => {
                line.update();
                line.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: '#030303' }}
        />
    );
};

export default CodingBackground;
