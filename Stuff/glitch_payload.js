/**
 * Glitch Art Effects Payload
 * For Educational & Artistic Use Only
 *
 * This single file contains both the glitch effect library and the
 * code that activates the effects immediately.
 */

// --- 1. LIBRARY DEFINITION ---
(function(window) {
    // Avoid re-injecting the library if it already exists
    if (window.GlitchArt) {
        return;
    }

    // --- Inject all necessary CSS styles into the page ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes vibrate-subtle {
            0% { transform: translate(0); } 25% { transform: translate(-1px, 1px); }
            50% { transform: translate(1px, -1px); } 75% { transform: translate(1px, 1px); }
            100% { transform: translate(-1px, -1px); }
        }
        .glitch-vibrate { animation: vibrate-subtle 0.2s linear; }

        .glitch-image-stack { position: relative; }
        .glitch-image-stack::before, .glitch-image-stack::after {
            content: ''; position: absolute; top: 0; left: 0;
            width: 100%; height: 100%; background: inherit;
            background-size: cover; opacity: 0.8;
        }
        .glitch-image-stack::before { clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%); transform: translateX(-5px); }
        .glitch-image-stack::after { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translateX(5px); }

        .fake-cursor {
            position: fixed; width: 24px; height: 24px;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" stroke="white" stroke-width="1.5" d="M10.13,1.94L3.28,20.84a1.85,1.85,0,0,0,3.17,2.19l3.35-3.35,2.83,4.72a1.85,1.85,0,0,0,3.17-.63L22.64,1.94a1.85,1.85,0,0,0-2.48-2.48Z"/></svg>');
            background-size: contain; z-index: 2147483647; pointer-events: none;
            transition: all 1.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s;
            opacity: 0;
        }

        .datamosh-container { position: relative; overflow: hidden; }
        .datamosh-slice {
            position: absolute; width: 100%; height: 10px;
            background-attachment: fixed;
            animation: datamosh-shift 0.4s forwards;
        }
        @keyframes datamosh-shift {
            50% { transform: translateX(calc(var(--rand-shift, 0) * 30px - 15px)); }
        }
    `;
    document.head.appendChild(style);

    // --- Define the individual glitch effect functions ---

    const applyVibration = () => {
        const elements = document.body.querySelectorAll('div, p, h1, h2, span');
        if (elements.length === 0) return;
        const el = elements[Math.floor(Math.random() * elements.length)];
        el.classList.add('glitch-vibrate');
        setTimeout(() => el.classList.remove('glitch-vibrate'), 200);
    };

    const applyImageStack = () => {
        const images = document.querySelectorAll('img');
        if (images.length === 0) return;
        const img = images[Math.floor(Math.random() * images.length)];
        const wrapper = document.createElement('div');
        wrapper.style.display = getComputedStyle(img).display;
        wrapper.style.backgroundImage = `url(${img.src})`;
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.classList.add('glitch-image-stack');
        setTimeout(() => {
            if (wrapper.parentNode) {
                wrapper.parentNode.insertBefore(img, wrapper);
                wrapper.parentNode.removeChild(wrapper);
            }
        }, 500);
    };

    const applyDatamosh = () => {
        const elements = document.body.querySelectorAll('div:not(:empty), section, main');
        if (elements.length === 0) return;
        const target = elements[Math.floor(Math.random() * elements.length)];
        const rect = target.getBoundingClientRect();
        if (rect.height < 50 || rect.width < 50) return; // Ignore small elements

        const tempCanvas = document.createElement('canvas');
        document.body.appendChild(tempCanvas);

        // Dynamically import html2canvas library from a CDN
        const script = document.createElement('script');
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
        script.onload = () => {
            html2canvas(target).then(canvas => {
                const imgData = canvas.toDataURL();
                const container = document.createElement('div');
                container.style.cssText = `position: fixed; z-index: 9999; top: ${rect.top}px; left: ${rect.left}px; width: ${rect.width}px; height: ${rect.height}px;`;
                document.body.appendChild(container);

                for (let i = 0; i < rect.height; i += 10) {
                    const slice = document.createElement('div');
                    slice.classList.add('datamosh-slice');
                    slice.style.top = `${i}px`;
                    slice.style.backgroundImage = `url(${imgData})`;
                    slice.style.backgroundPosition = `0px -${i}px`;
                    slice.style.setProperty('--rand-shift', Math.random());
                    container.appendChild(slice);
                }
                setTimeout(() => document.body.removeChild(container), 400);
            });
            document.body.removeChild(tempCanvas);
        };
        document.head.appendChild(script);
    };

    const animateGhostCursor = () => {
        const elements = document.querySelectorAll('a, button, h1, img, input');
        if (elements.length < 2) return;
        const startEl = elements[Math.floor(Math.random() * elements.length)];
        const endEl = elements[Math.floor(Math.random() * elements.length)];
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const cursor = document.createElement('div');
        cursor.className = 'fake-cursor';
        document.body.appendChild(cursor);
        cursor.style.top = `${startRect.top + startRect.height / 2}px`;
        cursor.style.left = `${startRect.left + startRect.width / 2}px`;
        setTimeout(() => {
            cursor.style.opacity = '1';
            cursor.style.top = `${endRect.top + endRect.height / 2}px`;
            cursor.style.left = `${endRect.left + endRect.width / 2}px`;
        }, 100);
        setTimeout(() => {
            cursor.style.opacity = '0';
            setTimeout(() => document.body.removeChild(cursor), 500);
        }, 2000);
    };

    // --- Expose the functions and a scheduler to the global scope ---
    window.GlitchArt = {
        vibrate: applyVibration,
        imageStack: applyImageStack,
        datamosh: applyDatamosh,
        ghostCursor: animateGhostCursor,

        run: function(config) {
            console.log('GlitchArt sequence activated.');
            config.forEach(item => {
                setInterval(item.func, item.delay);
            });
        }
    };

})(window);

// --- 2. ACTIVATOR SEQUENCE ---
// This part immediately runs the glitch effects using the library defined above.
window.GlitchArt.run([
    { func: window.GlitchArt.vibrate, delay: 4000 },
    { func: window.GlitchArt.imageStack, delay: 8000 },
    { func: window.GlitchArt.ghostCursor, delay: 7000 }
]);
document.body.addEventListener('click', function() { if (Math.random() < 0.20) window.GlitchArt.datamosh(); });
setInterval(function() { if (Math.random() < 0.05) window.GlitchArt.datamosh(); }, 5000);