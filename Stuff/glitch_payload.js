/**
 * Enhanced Glitch Art Effects Payload v3
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
        /* REPLACED: Vertical stacking glitch effect instead of vibration */
        @keyframes stack-glitch {
            0% { transform: translateY(0); opacity: 1; }
            20% { transform: translateY(5px); opacity: 0.9; }
            40% { transform: translateY(10px); opacity: 0.8; }
            60% { transform: translateY(15px); opacity: 0.7; }
            80% { transform: translateY(20px); opacity: 0.6; }
            100% { transform: translateY(25px); opacity: 0.5; }
        }

        .glitch-stack-container {
            position: relative;
            display: inline-block;
        }

        .glitch-stack-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            filter: hue-rotate(var(--hue-shift, 0deg)) brightness(0.8);
            animation: stack-glitch 0.8s ease-out forwards;
            animation-delay: var(--delay, 0s);
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
            opacity: 0;
            transform: translate(-2px, -2px);
            will-change: transform, opacity;
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

        /* RGB Split */
        .rgb-split-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
            animation: rgb-split-anim 0.6s ease-in-out;
        }

        @keyframes rgb-split-anim {
            0%, 100% { opacity: 0; }
            10%, 90% { opacity: 1; }
        }

        .rgb-channel {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }

        .rgb-channel-r {
            mix-blend-mode: screen;
            filter: sepia(1) hue-rotate(310deg) saturate(6);
            animation: rgb-r 0.6s infinite;
        }

        .rgb-channel-g {
            mix-blend-mode: screen;
            filter: sepia(1) hue-rotate(90deg) saturate(4);
            animation: rgb-g 0.6s infinite;
        }

        .rgb-channel-b {
            mix-blend-mode: screen;
            filter: sepia(1) hue-rotate(180deg) saturate(5);
            animation: rgb-b 0.6s infinite;
        }

        @keyframes rgb-r {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(-15px, 3px); }
            66% { transform: translate(-10px, -5px); }
        }

        @keyframes rgb-g {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(3px, 8px); }
            66% { transform: translate(-2px, 12px); }
        }

        @keyframes rgb-b {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(12px, -4px); }
            66% { transform: translate(15px, 2px); }
        }

        /* ENHANCED: Stronger Text Corruption */
        .text-corrupt {
            position: relative;
            display: inline-block;
        }

        .text-corrupt::before,
        .text-corrupt::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .text-corrupt::before {
            left: 6px;
            text-shadow: -4px 0 #ff00ff, 2px 2px #ff0000;
            clip: rect(44px, 450px, 56px, 0);
            animation: corrupt-anim-1 0.3s infinite linear alternate-reverse;
        }

        .text-corrupt::after {
            left: -6px;
            text-shadow: -4px 0 #00ffff, -2px 2px #00ff00;
            clip: rect(44px, 450px, 56px, 0);
            animation: corrupt-anim-2 0.3s infinite linear alternate-reverse;
        }

        @keyframes corrupt-anim-1 {
            0% { clip: rect(42px, 9999px, 44px, 0); left: 8px; }
            10% { clip: rect(12px, 9999px, 59px, 0); left: -6px; }
            20% { clip: rect(66px, 9999px, 89px, 0); left: 10px; }
            30% { clip: rect(17px, 9999px, 34px, 0); left: -8px; }
            40% { clip: rect(87px, 9999px, 40px, 0); left: 12px; }
            50% { clip: rect(50px, 9999px, 75px, 0); left: -10px; }
            60% { clip: rect(23px, 9999px, 55px, 0); left: 9px; }
            70% { clip: rect(70px, 9999px, 95px, 0); left: -7px; }
            80% { clip: rect(8px, 9999px, 28px, 0); left: 11px; }
            90% { clip: rect(45px, 9999px, 60px, 0); left: -9px; }
            100% { clip: rect(32px, 9999px, 48px, 0); left: 8px; }
        }

        @keyframes corrupt-anim-2 {
            0% { clip: rect(65px, 9999px, 100px, 0); left: -10px; }
            10% { clip: rect(25px, 9999px, 45px, 0); left: 8px; }
            20% { clip: rect(78px, 9999px, 88px, 0); left: -12px; }
            30% { clip: rect(5px, 9999px, 15px, 0); left: 9px; }
            40% { clip: rect(52px, 9999px, 72px, 0); left: -8px; }
            50% { clip: rect(38px, 9999px, 58px, 0); left: 11px; }
            60% { clip: rect(82px, 9999px, 92px, 0); left: -9px; }
            70% { clip: rect(15px, 9999px, 35px, 0); left: 10px; }
            80% { clip: rect(60px, 9999px, 80px, 0); left: -11px; }
            90% { clip: rect(28px, 9999px, 48px, 0); left: 8px; }
            100% { clip: rect(70px, 9999px, 85px, 0); left: -10px; }
        }
    `;
    document.head.appendChild(style);

    // --- Define the individual glitch effect functions ---

    // REPLACED: Stack glitch effect instead of vibration
    const applyStackGlitch = () => {
        const elements = Array.from(document.body.querySelectorAll('div, p, h1, h2, h3, span, button, a, section, article, header, nav, main, aside, footer'));
        if (elements.length === 0) return;
        
        // Random number of elements: 1-5, or sometimes ALL elements
        let numElements;
        const allElementsChance = Math.random();
        
        if (allElementsChance < 0.15) {
            // 15% chance: affect ALL elements
            numElements = elements.length;
        } else if (allElementsChance < 0.35) {
            // 20% chance: affect many elements (20-50% of all)
            numElements = Math.floor(elements.length * (0.2 + Math.random() * 0.3));
        } else {
            // 65% chance: affect 1-8 elements
            numElements = Math.floor(Math.random() * 8) + 1;
        }
        
        // Shuffle and select elements
        const shuffled = elements.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, numElements);
        
        selected.forEach(el => {
            // Skip if too small
            const rect = el.getBoundingClientRect();
            if (rect.width < 20 || rect.height < 20) return;
            
            // Number of stack layers: 3-7
            const numLayers = Math.floor(Math.random() * 5) + 3;
            
            // Clone the element multiple times
            for (let i = 1; i <= numLayers; i++) {
                const clone = el.cloneNode(true);
                clone.classList.add('glitch-stack-layer');
                clone.style.setProperty('--delay', `${i * 0.08}s`);
                clone.style.setProperty('--hue-shift', `${Math.random() * 360}deg`);
                clone.style.zIndex = parseInt(getComputedStyle(el).zIndex || 0) - i;
                
                // Insert clone right after original
                el.parentNode.insertBefore(clone, el.nextSibling);
                
                // Remove clone after animation
                setTimeout(() => {
                    if (clone.parentNode) {
                        clone.parentNode.removeChild(clone);
                    }
                }, 800 + (i * 80));
            }
        });
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

    // Bezier curve calculation for smooth cursor movement
    const bezierPoint = (t, p0, p1, p2, p3) => {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;
        
        return {
            x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
            y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
        };
    };

    // MODIFIED: Ghost cursor starts from actual cursor position
    const animateGhostCursor = () => {
        const elements = document.querySelectorAll('a, button, h1, h2, h3, p, img, input, textarea, [role="button"], span');
        if (elements.length < 2) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'fake-cursor';
        document.body.appendChild(cursor);
        
        // Store the real cursor position when effect starts
        let realCursorX = window.lastMouseX || window.innerWidth / 2;
        let realCursorY = window.lastMouseY || window.innerHeight / 2;
        
        // Track real cursor position
        const updateRealCursor = (e) => {
            window.lastMouseX = e.clientX;
            window.lastMouseY = e.clientY;
        };
        document.addEventListener('mousemove', updateRealCursor);
        
        // Start position - current cursor location
        let currentPos = {
            x: realCursorX,
            y: realCursorY
        };
        
        cursor.style.top = `${currentPos.y}px`;
        cursor.style.left = `${currentPos.x}px`;
        
        setTimeout(() => cursor.classList.add('active'), 100);
        
        // Create waypoints
        const numWaypoints = Math.floor(Math.random() * 2) + 2; // 2-3 waypoints
        const waypoints = [];
        
        for (let i = 0; i < numWaypoints; i++) {
            const el = elements[Math.floor(Math.random() * elements.length)];
            const rect = el.getBoundingClientRect();
            waypoints.push({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                element: el
            });
        }
        
        let currentWaypoint = 0;
        
        const moveToNextWaypoint = () => {
            if (currentWaypoint >= waypoints.length) {
                cursor.classList.remove('active');
                setTimeout(() => {
                    if (document.body.contains(cursor)) {
                        document.body.removeChild(cursor);
                    }
                    document.removeEventListener('mousemove', updateRealCursor);
                }, 300);
                return;
            }
            
            const targetPos = waypoints[currentWaypoint];
            
            // Create bezier curve control points for natural movement
            const p0 = currentPos;
            const p3 = targetPos;
            
            // Control points create the curve
            const dx = p3.x - p0.x;
            const dy = p3.y - p0.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const p1 = {
                x: p0.x + dx * 0.25 + (Math.random() - 0.5) * dist * 0.3,
                y: p0.y + dy * 0.25 + (Math.random() - 0.5) * dist * 0.3
            };
            
            const p2 = {
                x: p0.x + dx * 0.75 + (Math.random() - 0.5) * dist * 0.3,
                y: p0.y + dy * 0.75 + (Math.random() - 0.5) * dist * 0.3
            };
            
            // Animate along bezier curve
            const duration = 2000; // 2 seconds for each movement
            const steps = 60;
            let step = 0;
            
            const animate = () => {
                if (step >= steps) {
                    currentPos = targetPos;
                    
                    // MODIFIED: Only 20% chance to highlight text
                    if (Math.random() < 0.2 && targetPos.element.innerText) {
                        setTimeout(() => {
                            const range = document.createRange();
                            const selection = window.getSelection();
                            
                            try {
                                const textNode = targetPos.element.childNodes[0];
                                if (textNode && textNode.nodeType === 3) {
                                    const len = textNode.textContent.length;
                                    const start = Math.floor(Math.random() * (len / 2));
                                    const end = Math.min(start + Math.floor(Math.random() * (len / 2)) + 5, len);
                                    
                                    range.setStart(textNode, start);
                                    range.setEnd(textNode, end);
                                    selection.removeAllRanges();
                                    selection.addRange(range);
                                    
                                    setTimeout(() => selection.removeAllRanges(), 800);
                                }
                            } catch (e) {
                                // Ignore selection errors
                            }
                        }, 100);
                    } else {
                        // 80% chance: Trigger hover effect instead
                        const hoverEvent = new MouseEvent('mouseenter', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        targetPos.element.dispatchEvent(hoverEvent);
                        
                        // Add :hover class simulation if needed
                        targetPos.element.classList.add('fake-hover');
                        
                        setTimeout(() => {
                            const leaveEvent = new MouseEvent('mouseleave', {
                                bubbles: true,
                                cancelable: true,
                                view: window
                            });
                            targetPos.element.dispatchEvent(leaveEvent);
                            targetPos.element.classList.remove('fake-hover');
                        }, 800);
                    }
                    
                    currentWaypoint++;
                    setTimeout(moveToNextWaypoint, 1200);
                    return;
                }
                
                const t = step / steps;
                const pos = bezierPoint(t, p0, p1, p2, p3);
                
                cursor.style.left = `${pos.x}px`;
                cursor.style.top = `${pos.y}px`;
                
                step++;
                requestAnimationFrame(animate);
            };
            
            animate();
        };
        
        setTimeout(moveToNextWaypoint, 400);
    };

    // RGB Split on entire viewport
    const applyRGBSplit = () => {
        const container = document.createElement('div');
        container.className = 'rgb-split-container';
        
        // Capture current viewport
        html2canvas(document.body, {
            logging: false,
            useCORS: true,
            width: window.innerWidth,
            height: window.innerHeight,
            x: window.scrollX,
            y: window.scrollY
        }).then(canvas => {
            const imgData = canvas.toDataURL();
            
            ['r', 'g', 'b'].forEach(channel => {
                const layer = document.createElement('div');
                layer.className = `rgb-channel rgb-channel-${channel}`;
                layer.style.backgroundImage = `url(${imgData})`;
                container.appendChild(layer);
            });
            
            document.body.appendChild(container);
            
            setTimeout(() => {
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
            }, 600);
        }).catch(err => console.log('RGB Split error:', err));
    };

    // Text Corruption (already enhanced in CSS)
    const applyTextCorruption = () => {
        const textElements = document.querySelectorAll('h1, h2, h3, p, a, button, span, li');
        if (textElements.length === 0) return;
        
        const el = textElements[Math.floor(Math.random() * textElements.length)];
        if (!el.innerText || el.innerText.length < 3) return;
        
        const originalHTML = el.innerHTML;
        el.setAttribute('data-text', el.innerText);
        el.classList.add('text-corrupt');
        
        setTimeout(() => {
                    el.classList.remove('text-corrupt');
                    el.removeAttribute('data-text');
                    el.innerHTML = originalHTML;
                }, 500);
            };

    // --- Expose the functions and a scheduler to the global scope ---
    window.GlitchArt = {
        stackGlitch: applyStackGlitch,  // RENAMED from vibrate
        imageStack: applyImageStack,
        datamosh: applyDatamosh,
        ghostCursor: animateGhostCursor,
        rgbSplit: applyRGBSplit,
        textCorrupt: applyTextCorruption,

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
    { func: window.GlitchArt.stackGlitch, delay: 8000 },      // UPDATED: Stack glitch effect
    { func: window.GlitchArt.imageStack, delay: 6000 },       // Beautiful image glitch
    { func: window.GlitchArt.ghostCursor, delay: 12000 },     // Ghost cursor from real position
    { func: window.GlitchArt.rgbSplit, delay: 15000 },        // Full screen RGB split
    { func: window.GlitchArt.textCorrupt, delay: 7000 }       // Enhanced text corruption
]);

document.body.addEventListener('click', function() {
    if (Math.random() < 0.15) window.GlitchArt.datamosh();
});

setInterval(function() {
    if (Math.random() < 0.05) window.GlitchArt.datamosh();
}, 5000);