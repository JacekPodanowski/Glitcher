/**
 * Enhanced Glitch Art Effects Payload
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
        @keyframes vibrate-intense {
            0% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-3px, 2px) rotate(-1deg); }
            20% { transform: translate(3px, -2px) rotate(1deg); }
            30% { transform: translate(-2px, -3px) rotate(-0.5deg); }
            40% { transform: translate(2px, 3px) rotate(0.5deg); }
            50% { transform: translate(-3px, -2px) rotate(-1deg); }
            60% { transform: translate(3px, 2px) rotate(1deg); }
            70% { transform: translate(-2px, 3px) rotate(-0.5deg); }
            80% { transform: translate(2px, -3px) rotate(0.5deg); }
            90% { transform: translate(-3px, 2px) rotate(-1deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        .glitch-vibrate { 
            animation: vibrate-intense 0.3s linear;
            position: relative;
            z-index: 10;
        }

        .glitch-image-container {
            position: relative;
            display: inline-block;
            overflow: visible;
        }

        .glitch-image-stack {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
        }

        .glitch-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            mix-blend-mode: screen;
            opacity: 0.8;
        }

        .glitch-layer-1 {
            animation: glitch-anim-1 0.5s infinite;
            filter: hue-rotate(90deg);
        }

        .glitch-layer-2 {
            animation: glitch-anim-2 0.5s infinite;
            filter: hue-rotate(180deg) invert(1);
        }

        .glitch-layer-3 {
            animation: glitch-anim-3 0.5s infinite;
            filter: hue-rotate(270deg);
        }

        @keyframes glitch-anim-1 {
            0% { transform: translate(0); clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); }
            10% { transform: translate(-8px, 3px); clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
            20% { transform: translate(8px, -3px); clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%); }
            30% { transform: translate(-6px, 5px); clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); }
            40% { transform: translate(10px, -2px); clip-path: polygon(0 55%, 100% 55%, 100% 65%, 0 65%); }
            50% { transform: translate(-7px, 4px); clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); }
            60% { transform: translate(9px, -4px); clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); }
            70% { transform: translate(-5px, 2px); clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); }
            80% { transform: translate(6px, -5px); clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); }
            90% { transform: translate(-8px, 3px); clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); }
            100% { transform: translate(0); clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); }
        }

        @keyframes glitch-anim-2 {
            0% { transform: translate(0) scaleY(1); clip-path: polygon(0 0%, 100% 0%, 100% 15%, 0 15%); }
            15% { transform: translate(5px, -2px) scaleY(1.05); clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); }
            30% { transform: translate(-7px, 4px) scaleY(0.95); clip-path: polygon(0 35%, 100% 35%, 100% 50%, 0 50%); }
            45% { transform: translate(6px, 3px) scaleY(1.08); clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%); }
            60% { transform: translate(-8px, -3px) scaleY(0.92); clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%); }
            75% { transform: translate(9px, 2px) scaleY(1.03); clip-path: polygon(0 5%, 100% 5%, 100% 18%, 0 18%); }
            90% { transform: translate(-6px, -4px) scaleY(0.97); clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%); }
            100% { transform: translate(0) scaleY(1); clip-path: polygon(0 0%, 100% 0%, 100% 15%, 0 15%); }
        }

        @keyframes glitch-anim-3 {
            0% { transform: translate(0, 0); clip-path: polygon(0 8%, 100% 8%, 100% 18%, 0 18%); }
            12% { transform: translate(-10px, 5px); clip-path: polygon(0 28%, 100% 28%, 100% 38%, 0 38%); }
            24% { transform: translate(10px, -5px); clip-path: polygon(0 48%, 100% 48%, 100% 58%, 0 58%); }
            36% { transform: translate(-8px, 6px); clip-path: polygon(0 68%, 100% 68%, 100% 78%, 0 78%); }
            48% { transform: translate(12px, -3px); clip-path: polygon(0 88%, 100% 88%, 100% 98%, 0 98%); }
            60% { transform: translate(-9px, 4px); clip-path: polygon(0 3%, 100% 3%, 100% 13%, 0 13%); }
            72% { transform: translate(11px, -6px); clip-path: polygon(0 33%, 100% 33%, 100% 43%, 0 43%); }
            84% { transform: translate(-7px, 5px); clip-path: polygon(0 63%, 100% 63%, 100% 73%, 0 73%); }
            96% { transform: translate(8px, -4px); clip-path: polygon(0 83%, 100% 83%, 100% 93%, 0 93%); }
            100% { transform: translate(0, 0); clip-path: polygon(0 8%, 100% 8%, 100% 18%, 0 18%); }
        }

        .glitch-invert {
            animation: invert-flash 0.5s;
        }

        @keyframes invert-flash {
            0%, 100% { filter: invert(0); }
            20%, 80% { filter: invert(1); }
            40%, 60% { filter: invert(0); }
        }

        .fake-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: white;
            border: 2px solid black;
            clip-path: polygon(0 0, 0 16px, 6px 12px, 9px 20px, 11px 19px, 8px 11px, 16px 11px);
            z-index: 2147483647;
            pointer-events: none;
            transition: all 0.15s ease-out;
            opacity: 0;
            transform: translate(-2px, -2px);
        }

        .fake-cursor.active {
            opacity: 1;
        }

        .fake-selection {
            position: absolute;
            background: rgba(0, 120, 255, 0.3);
            pointer-events: none;
            z-index: 2147483646;
        }

        .datamosh-container {
            position: relative;
            overflow: hidden;
        }

        .datamosh-slice {
            position: absolute;
            width: 100%;
            height: 10px;
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
        const elements = document.body.querySelectorAll('div, p, h1, h2, h3, span, button, a, section, article');
        if (elements.length === 0) return;
        
        // Pick 1-3 random elements
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            const el = elements[Math.floor(Math.random() * elements.length)];
            el.classList.add('glitch-vibrate');
            setTimeout(() => el.classList.remove('glitch-vibrate'), 300);
        }
    };

    const applyImageStack = () => {
        const images = document.querySelectorAll('img');
        if (images.length === 0) return;
        const img = images[Math.floor(Math.random() * images.length)];
        
        // Create wrapper container
        const wrapper = document.createElement('div');
        wrapper.className = 'glitch-image-container';
        wrapper.style.display = getComputedStyle(img).display || 'inline-block';
        wrapper.style.width = img.width + 'px';
        wrapper.style.height = img.height + 'px';
        
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // Create glitch stack
        const stack = document.createElement('div');
        stack.className = 'glitch-image-stack';
        
        // Add 3 glitch layers
        for (let i = 1; i <= 3; i++) {
            const layer = document.createElement('div');
            layer.className = `glitch-layer glitch-layer-${i}`;
            layer.style.backgroundImage = `url(${img.src})`;
            stack.appendChild(layer);
        }
        
        wrapper.appendChild(stack);
        
        // Also apply color inversion randomly
        if (Math.random() < 0.5) {
            img.classList.add('glitch-invert');
        }
        
        // Image swap effect
        if (images.length > 1 && Math.random() < 0.6) {
            const otherImg = images[Math.floor(Math.random() * images.length)];
            if (otherImg !== img) {
                const originalSrc = img.src;
                setTimeout(() => {
                    img.src = otherImg.src;
                    setTimeout(() => {
                        img.src = originalSrc;
                    }, 250);
                }, 150);
            }
        }
        
        // Clean up after 500ms
        setTimeout(() => {
            img.classList.remove('glitch-invert');
            if (wrapper.parentNode) {
                wrapper.parentNode.insertBefore(img, wrapper);
                wrapper.parentNode.removeChild(wrapper);
            }
        }, 500);
    };

    const applyDatamosh = () => {
        const elements = document.body.querySelectorAll('div:not(:empty), section, main, article');
        if (elements.length === 0) return;
        const target = elements[Math.floor(Math.random() * elements.length)];
        const rect = target.getBoundingClientRect();
        if (rect.height < 50 || rect.width < 50) return;

        // Check if html2canvas is already loaded
        if (typeof html2canvas === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = () => executeDatamosh(target, rect);
            document.head.appendChild(script);
        } else {
            executeDatamosh(target, rect);
        }
    };

    const executeDatamosh = (target, rect) => {
        html2canvas(target, { logging: false, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL();
            const container = document.createElement('div');
            container.style.cssText = `position: fixed; z-index: 9999; top: ${rect.top}px; left: ${rect.left}px; width: ${rect.width}px; height: ${rect.height}px; pointer-events: none;`;
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
            
            setTimeout(() => {
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
            }, 400);
        }).catch(err => console.log('Datamosh error:', err));
    };

    const animateGhostCursor = () => {
        const elements = document.querySelectorAll('a, button, h1, h2, h3, p, img, input, textarea, [role="button"]');
        if (elements.length < 2) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'fake-cursor';
        document.body.appendChild(cursor);
        
        // Start position - random element
        const startEl = elements[Math.floor(Math.random() * elements.length)];
        const startRect = startEl.getBoundingClientRect();
        cursor.style.top = `${startRect.top + startRect.height / 2}px`;
        cursor.style.left = `${startRect.left + startRect.width / 2}px`;
        
        setTimeout(() => cursor.classList.add('active'), 50);
        
        // Create a natural path with 2-4 waypoints
        const waypoints = [];
        const numWaypoints = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < numWaypoints; i++) {
            const el = elements[Math.floor(Math.random() * elements.length)];
            const rect = el.getBoundingClientRect();
            waypoints.push({
                x: rect.left + rect.width / 2 + (Math.random() * 20 - 10),
                y: rect.top + rect.height / 2 + (Math.random() * 20 - 10),
                element: el
            });
        }
        
        let currentWaypoint = 0;
        const moveToNextWaypoint = () => {
            if (currentWaypoint >= waypoints.length) {
                // Fade out and remove
                cursor.classList.remove('active');
                setTimeout(() => {
                    if (document.body.contains(cursor)) {
                        document.body.removeChild(cursor);
                    }
                }, 200);
                return;
            }
            
            const wp = waypoints[currentWaypoint];
            cursor.style.top = `${wp.y}px`;
            cursor.style.left = `${wp.x}px`;
            
            // Highlight text effect
            if (wp.element.innerText && Math.random() < 0.5) {
                setTimeout(() => {
                    const range = document.createRange();
                    const selection = window.getSelection();
                    
                    try {
                        const textNode = wp.element.childNodes[0];
                        if (textNode && textNode.nodeType === 3) {
                            const len = textNode.textContent.length;
                            const start = Math.floor(Math.random() * (len / 2));
                            const end = Math.min(start + Math.floor(Math.random() * (len / 2)) + 5, len);
                            
                            range.setStart(textNode, start);
                            range.setEnd(textNode, end);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            
                            setTimeout(() => selection.removeAllRanges(), 400);
                        }
                    } catch (e) {
                        // Ignore selection errors
                    }
                }, 200);
            }
            
            currentWaypoint++;
            setTimeout(moveToNextWaypoint, 800 + Math.random() * 600);
        };
        
        setTimeout(moveToNextWaypoint, 300);
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
    { func: window.GlitchArt.vibrate, delay: 3000 },
    { func: window.GlitchArt.imageStack, delay: 5000 },
    { func: window.GlitchArt.ghostCursor, delay: 8000 }
]);

document.body.addEventListener('click', function() { 
    if (Math.random() < 0.20) window.GlitchArt.datamosh(); 
});

setInterval(function() { 
    if (Math.random() < 0.05) window.GlitchArt.datamosh(); 
}, 5000);