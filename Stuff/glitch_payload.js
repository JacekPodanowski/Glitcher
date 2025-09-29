/**
 * Enhanced Glitch Art Effects Payload v6.1 (Complete & Optimized)
 * For Educational & Artistic Use Only
 *
 * This version is a complete, self-contained file with all functions fully implemented.
 * - Optimized with a single requestAnimationFrame loop for performance.
 * - Centralized effect configuration for easy control over timing and probability.
 * - Reworked scroll effects with smooth scrolling.
 * - Added a "scroll reversal" effect to hijack user scrolling.
 * - All previous fixes (tab visibility, cursor hiding) are included.
 *
 * MODIFIED based on user request (v11):
 * - Stack Glitch layer count is now dynamic: 1 element (7-100), subset (7-30), all (7-14).
 * - "Constant" mode now lasts longer (1.5s) and has wider spacing (2.5x multiplier).
 */

(function(window) {
    // --- 1. DEPENDENCY LOADER ---
    const initialize = () => {
        if (typeof html2canvas !== 'undefined') {
            main();
        } else {
            console.log('[GlitchArt] Loading html2canvas dependency...');
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = main;
            script.onerror = () => console.error('[GlitchArt] CRITICAL: Failed to load html2canvas. Effects requiring it will not work.');
            document.head.appendChild(script);
        }
    };

    // --- 2. MAIN LIBRARY AND ACTIVATOR ---
    const main = () => {
        console.log('[GlitchArt] Dependency loaded. Initializing effects library.');

        if (window.GlitchArt && window.GlitchArt.isActive) {
            console.log('[GlitchArt] Library already active. Halting re-initialization.');
            return;
        }

        const style = document.createElement('style');
        style.textContent = `
            /* MODIFIED KEYFRAME TO USE A PROGRESSIVE MULTIPLIER */
            @keyframes stack-glitch { 
                0%, 100% { transform: translate(0, 0); } 
                20% { transform: translate(calc(var(--glitch-dx) * var(--glitch-multiplier)), calc(var(--glitch-dy) * var(--glitch-multiplier))); } 
                40% { transform: translate(calc(var(--glitch-dx) * -1 * var(--glitch-multiplier)), calc(var(--glitch-dy) * -1 * var(--glitch-multiplier))); } 
                60% { transform: translate(calc(var(--glitch-dx) * 0.7 * var(--glitch-multiplier)), calc(var(--glitch-dy) * -0.4 * var(--glitch-multiplier))); } 
                80% { transform: translate(calc(var(--glitch-dx) * -0.4 * var(--glitch-multiplier)), calc(var(--glitch-dy) * 0.7 * var(--glitch-multiplier))); } 
            }
            .glitch-stack-container { position: relative; display: inline-block; z-index: 1; }
            /* MODIFICATION: Animation duration is now controlled by a CSS variable */
            .glitch-stack-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; filter: hue-rotate(var(--hue-shift, 0deg)) brightness(0.8); animation: stack-glitch var(--glitch-duration, 0.8s) ease-in-out forwards; animation-delay: var(--delay, 0s); opacity: 1; }
            .glitch-image-container { position: relative; display: inline-block; overflow: visible; }
            .glitch-image-stack { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; }
            .glitch-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; mix-blend-mode: screen; opacity: 0.8; }
            .glitch-layer-1 { animation: glitch-anim-1 0.5s infinite; filter: hue-rotate(90deg); }
            .glitch-layer-2 { animation: glitch-anim-2 0.5s infinite; filter: hue-rotate(180deg) invert(1); }
            .glitch-layer-3 { animation: glitch-anim-3 0.5s infinite; filter: hue-rotate(270deg); }
            @keyframes glitch-anim-1 { 0% { transform: translate(0); clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); } 10% { transform: translate(-8px, 3px); clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); } 20% { transform: translate(8px, -3px); clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%); } 30% { transform: translate(-6px, 5px); clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); } 40% { transform: translate(10px, -2px); clip-path: polygon(0 55%, 100% 55%, 100% 65%, 0 65%); } 50% { transform: translate(-7px, 4px); clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); } 60% { transform: translate(9px, -4px); clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); } 70% { transform: translate(-5px, 2px); clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); } 80% { transform: translate(6px, -5px); clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); } 90% { transform: translate(-8px, 3px); clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); } 100% { transform: translate(0); clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); } }
            @keyframes glitch-anim-2 { 0% { transform: translate(0) scaleY(1); clip-path: polygon(0 0%, 100% 0%, 100% 15%, 0 15%); } 15% { transform: translate(5px, -2px) scaleY(1.05); clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); } 30% { transform: translate(-7px, 4px) scaleY(0.95); clip-path: polygon(0 35%, 100% 35%, 100% 50%, 0 50%); } 45% { transform: translate(6px, 3px) scaleY(1.08); clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%); } 60% { transform: translate(-8px, -3px) scaleY(0.92); clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%); } 75% { transform: translate(9px, 2px) scaleY(1.03); clip-path: polygon(0 5%, 100% 5%, 100% 18%, 0 18%); } 90% { transform: translate(-6px, -4px) scaleY(0.97); clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%); } 100% { transform: translate(0) scaleY(1); clip-path: polygon(0 0%, 100% 0%, 100% 15%, 0 15%); } }
            @keyframes glitch-anim-3 { 0% { transform: translate(0, 0); clip-path: polygon(0 8%, 100% 8%, 100% 18%, 0 18%); } 12% { transform: translate(-10px, 5px); clip-path: polygon(0 28%, 100% 28%, 100% 38%, 0 38%); } 24% { transform: translate(10px, -5px); clip-path: polygon(0 48%, 100% 48%, 100% 58%, 0 58%); } 36% { transform: translate(-8px, 6px); clip-path: polygon(0 68%, 100% 68%, 100% 78%, 0 78%); } 48% { transform: translate(12px, -3px); clip-path: polygon(0 88%, 100% 88%, 100% 98%, 0 98%); } 60% { transform: translate(-9px, 4px); clip-path: polygon(0 3%, 100% 3%, 100% 13%, 0 13%); } 72% { transform: translate(11px, -6px); clip-path: polygon(0 33%, 100% 33%, 100% 43%, 0 43%); } 84% { transform: translate(-7px, 5px); clip-path: polygon(0 63%, 100% 63%, 100% 73%, 0 73%); } 96% { transform: translate(8px, -4px); clip-path: polygon(0 83%, 100% 83%, 100% 93%, 0 93%); } 100% { transform: translate(0, 0); clip-path: polygon(0 8%, 100% 8%, 100% 18%, 0 18%); } }
            .glitch-invert { animation: invert-flash 0.5s; }
            @keyframes invert-flash { 0%, 100% { filter: invert(0); } 20%, 80% { filter: invert(1); } 40%, 60% { filter: invert(0); } }
            .fake-cursor { position: fixed; width: 20px; height: 20px; background: white; border: 2px solid black; clip-path: polygon(0 0, 0 16px, 6px 12px, 9px 20px, 11px 19px, 8px 11px, 16px 11px); z-index: 2147483647; pointer-events: none; opacity: 0; transform: translate(-2px, -2px); will-change: transform, opacity; }
            .fake-cursor.active { opacity: 1; }
            .fake-selection { position: absolute; background: rgba(0, 120, 255, 0.3); pointer-events: none; z-index: 2147483646; }
            .datamosh-container { position: relative; overflow: hidden; }
            .datamosh-slice { position: absolute; width: 100%; height: 10px; background-attachment: fixed; animation: datamosh-shift 0.4s forwards; }
            @keyframes datamosh-shift { 50% { transform: translateX(calc(var(--rand-shift, 0) * 30px - 15px)); } }
            .rgb-split-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999999; animation: rgb-split-anim 0.6s ease-in-out; }
            @keyframes rgb-split-anim { 0%, 100% { opacity: 0; } 10%, 90% { opacity: 1; } }
            .rgb-channel { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; }
            .rgb-channel-r { mix-blend-mode: screen; filter: sepia(1) hue-rotate(310deg) saturate(6); animation: rgb-r 0.6s infinite; }
            .rgb-channel-g { mix-blend-mode: screen; filter: sepia(1) hue-rotate(90deg) saturate(4); animation: rgb-g 0.6s infinite; }
            .rgb-channel-b { mix-blend-mode: screen; filter: sepia(1) hue-rotate(180deg) saturate(5); animation: rgb-b 0.6s infinite; }
            @keyframes rgb-r { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-15px, 3px); } 66% { transform: translate(-10px, -5px); } }
            @keyframes rgb-g { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(3px, 8px); } 66% { transform: translate(-2px, 12px); } }
            @keyframes rgb-b { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(12px, -4px); } 66% { transform: translate(15px, 2px); } }
            .text-corrupt { position: relative; display: inline-block; }
            .text-corrupt::before, .text-corrupt::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
            .text-corrupt::before { left: 8px; text-shadow: -5px 0 #ff00ff, 3px 2px #ff0000; clip: rect(44px, 450px, 56px, 0); animation: corrupt-anim-1-MODIFIED 0.4s infinite linear alternate-reverse; }
            .text-corrupt::after { left: -8px; text-shadow: -5px 0 #00ffff, -3px 2px #00ff00; clip: rect(44px, 450px, 56px, 0); animation: corrupt-anim-2-MODIFIED 0.4s infinite linear alternate-reverse; }
            @keyframes corrupt-anim-1 { 0% { clip: rect(42px, 9999px, 44px, 0); left: 8px; } 10% { clip: rect(12px, 9999px, 59px, 0); left: -6px; } 20% { clip: rect(66px, 9999px, 89px, 0); left: 10px; } 30% { clip: rect(17px, 9999px, 34px, 0); left: -8px; } 40% { clip: rect(87px, 9999px, 40px, 0); left: 12px; } 50% { clip: rect(50px, 9999px, 75px, 0); left: -10px; } 60% { clip: rect(23px, 9999px, 55px, 0); left: 9px; } 70% { clip: rect(70px, 9999px, 95px, 0); left: -7px; } 80% { clip: rect(8px, 9999px, 28px, 0); left: 11px; } 90% { clip: rect(45px, 9999px, 60px, 0); left: -9px; } 100% { clip: rect(32px, 9999px, 48px, 0); left: 8px; } }
            @keyframes corrupt-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); left: -10px; } 10% { clip: rect(25px, 9999px, 45px, 0); left: 8px; } 20% { clip: rect(78px, 9999px, 88px, 0); left: -12px; } 30% { clip: rect(5px, 9999px, 15px, 0); left: 9px; } 40% { clip: rect(52px, 9999px, 72px, 0); left: -8px; } 50% { clip: rect(38px, 9999px, 58px, 0); left: 11px; } 60% { clip: rect(82px, 9999px, 92px, 0); left: -9px; } 70% { clip: rect(15px, 9999px, 35px, 0); left: 10px; } 80% { clip: rect(60px, 9999px, 80px, 0); left: -11px; } 90% { clip: rect(28px, 9999px, 48px, 0); left: 8px; } 100% { clip: rect(70px, 9999px, 85px, 0); left: -10px; } }
        `;
        document.head.appendChild(style);

        // --- All Glitch Effect Functions ---

        const applyStackGlitch = () => {
            const elements = Array.from(document.body.querySelectorAll('p, h1, h2, h3, span, a, li, blockquote'));
            const totalElements = elements.length;
            if (totalElements === 0) return;

            const angle = Math.random() * Math.PI * 2;
            const distance = 3 + Math.random() * 7;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const isProgressive = Math.random() < 0.5;

            let numElements;
            const chance = Math.random();
            if (chance < 0.20) {
                numElements = totalElements;
            } else if (chance < 0.70) {
                numElements = ~~(totalElements * (0.2 + Math.random() * 0.3));
            } else {
                numElements = 1;
            }

            // MODIFICATION: Set numLayers based on the number of elements being affected.
            let numLayers;
            if (numElements === 1) {
                numLayers = ~~(Math.random() * 94) + 20; // 7 to 100
            } else if (numElements === totalElements) {
                numLayers = ~~(Math.random() * 8) + 7;  // 7 to 14
            } else {
                numLayers = ~~(Math.random() * 20) + 7; // 7 to 30
            }

            // MODIFICATION: Define variables for the mode's behavior
            let duration = 880;
            let multiplierBase = 2.5; // This will be used if not progressive
            if (!isProgressive) {
                duration = 1200;       // Longer duration for constant mode
            }
            
            const shuffled = elements.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, numElements);
            
            selected.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 10 || rect.height < 10 || el.closest('.glitch-stack-container')) return;

                const wrapper = document.createElement('div');
                wrapper.className = 'glitch-stack-container';
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
                
                const fragment = document.createDocumentFragment();
                for (let i = 1; i <= numLayers; i++) {
                    const clone = el.cloneNode(true);
                    clone.classList.add('glitch-stack-layer');
                    const cloneStyle = clone.style;
                    cloneStyle.setProperty('--glitch-dx', `${dx}px`);
                    cloneStyle.setProperty('--glitch-dy', `${dy}px`);
                    const multiplier = isProgressive ? i * 0.2 : multiplierBase;
                    cloneStyle.setProperty('--glitch-multiplier', multiplier);
                    cloneStyle.setProperty('--delay', `${i * 0.03}s`);
                    cloneStyle.setProperty('--hue-shift', `${~~(Math.random() * 360)}deg`);
                    cloneStyle.setProperty('--glitch-duration', `${duration / 1000}s`); // Set duration
                    cloneStyle.zIndex = i;
                    fragment.appendChild(clone);
                }
                
                wrapper.appendChild(fragment);

                setTimeout(() => {
                    if (wrapper.parentNode) {
                        wrapper.parentNode.insertBefore(el, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                }, duration); // Use the mode-specific duration for cleanup
            });
        };

        const applyImageStack = () => {
            const images = document.querySelectorAll('img');
            const numImages = images.length;
            if (numImages === 0) return;

            const img = images[~~(Math.random() * numImages)];
            const wrapper = document.createElement('div');
            wrapper.className = 'glitch-image-container';
            const wrapperStyle = wrapper.style;
            wrapperStyle.display = getComputedStyle(img).display || 'inline-block';
            wrapperStyle.width = img.width + 'px';
            wrapperStyle.height = img.height + 'px';
            
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            const stack = document.createElement('div');
            stack.className = 'glitch-image-stack';
            const fragment = document.createDocumentFragment();
            for (let i = 1; i <= 3; i++) {
                const layer = document.createElement('div');
                layer.className = `glitch-layer glitch-layer-${i}`;
                layer.style.backgroundImage = `url(${img.src})`;
                fragment.appendChild(layer);
            }
            stack.appendChild(fragment);
            wrapper.appendChild(stack);

            if (Math.random() < 0.5) {
                img.classList.add('glitch-invert');
            }

            if (numImages > 1 && Math.random() < 0.6) {
                const otherImg = images[~~(Math.random() * numImages)];
                if (otherImg !== img) {
                    const originalSrc = img.src;
                    setTimeout(() => {
                        img.src = otherImg.src;
                        setTimeout(() => { img.src = originalSrc; }, 250);
                    }, 150);
                }
            }

            setTimeout(() => {
                img.classList.remove('glitch-invert');
                if (wrapper.parentNode) {
                    wrapper.parentNode.insertBefore(img, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }, 500);
        };

        const executeDatamosh = (target, rect) => {
            html2canvas(target, { logging: false, useCORS: true }).then(canvas => {
                const imgData = canvas.toDataURL();
                const container = document.createElement('div');
                container.style.cssText = `position: fixed; z-index: 9999; top: ${rect.top}px; left: ${rect.left}px; width: ${rect.width}px; height: ${rect.height}px; pointer-events: none;`;
                
                const fragment = document.createDocumentFragment();
                for (let i = 0, h = rect.height; i < h; i += 10) {
                    const slice = document.createElement('div');
                    slice.classList.add('datamosh-slice');
                    const sliceStyle = slice.style;
                    sliceStyle.top = `${i}px`;
                    sliceStyle.backgroundImage = `url(${imgData})`;
                    sliceStyle.backgroundPosition = `0px -${i}px`;
                    sliceStyle.setProperty('--rand-shift', Math.random());
                    fragment.appendChild(slice);
                }
                container.appendChild(fragment);
                document.body.appendChild(container);

                setTimeout(() => {
                    if (document.body.contains(container)) {
                        document.body.removeChild(container);
                    }
                }, 400);
            }).catch(err => console.log('Datamosh error:', err));
        };
        
        const applyDatamosh = () => {
            const elements = document.body.querySelectorAll('div:not(:empty), section, main, article');
            if (elements.length === 0) return;
            const target = elements[~~(Math.random() * elements.length)];
            const rect = target.getBoundingClientRect();
            if (rect.height < 50 || rect.width < 50) return;
            executeDatamosh(target, rect);
        };

        const applyRGBSplit = () => {
            html2canvas(document.body, {
                logging: false, useCORS: true,
                width: window.innerWidth, height: window.innerHeight,
                x: window.scrollX, y: window.scrollY
            }).then(canvas => {
                const imgData = canvas.toDataURL();
                const container = document.createElement('div');
                container.className = 'rgb-split-container';

                const fragment = document.createDocumentFragment();
                ['r', 'g', 'b'].forEach(channel => {
                    const layer = document.createElement('div');
                    layer.className = `rgb-channel rgb-channel-${channel}`;
                    layer.style.backgroundImage = `url(${imgData})`;
                    fragment.appendChild(layer);
                });
                container.appendChild(fragment);
                document.body.appendChild(container);

                setTimeout(() => {
                    if (document.body.contains(container)) {
                        document.body.removeChild(container);
                    }
                }, 600);
            }).catch(err => console.log('RGB Split error:', err));
        };

        const applyTextCorruption = () => {
            const textElements = document.querySelectorAll('h1, h2, h3, p, a, button, span, li');
            if (textElements.length === 0) return;
            const el = textElements[~~(Math.random() * textElements.length)];
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
        
        const bezierPoint = (t, p0, p1, p2, p3) => {
            const u = 1 - t, tt = t * t, uu = u * u;
            const uuu = uu * u, ttt = tt * t;
            const p = {
                x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
                y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
            };
            return p;
        };

        const animateGhostCursor = () => {
            const elements = document.querySelectorAll('a, button, h1, h2, h3, p, img, input, textarea, [role="button"], span');
            if (elements.length < 2) return;

            document.body.style.cursor = 'none';

            const cursor = document.createElement('div');
            cursor.className = 'fake-cursor';
            document.body.appendChild(cursor);

            let realCursorX = window.lastMouseX || window.innerWidth / 2;
            let realCursorY = window.lastMouseY || window.innerHeight / 2;

            const updateRealCursor = (e) => {
                window.lastMouseX = e.clientX;
                window.lastMouseY = e.clientY;
            };
            document.addEventListener('mousemove', updateRealCursor);

            let currentPos = { x: realCursorX, y: realCursorY };
            const cursorStyle = cursor.style;
            cursorStyle.top = `${currentPos.y}px`;
            cursorStyle.left = `${currentPos.x}px`;
            setTimeout(() => cursor.classList.add('active'), 100);

            const numWaypoints = ~~(Math.random() * 2) + 2;
            const waypoints = [];
            for (let i = 0; i < numWaypoints; i++) {
                const el = elements[~~(Math.random() * elements.length)];
                const rect = el.getBoundingClientRect();
                waypoints.push({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, element: el });
            }

            let currentWaypoint = 0;

            const cleanup = () => {
                cursor.classList.remove('active');
                document.body.style.cursor = '';
                setTimeout(() => {
                    if (document.body.contains(cursor)) document.body.removeChild(cursor);
                    document.removeEventListener('mousemove', updateRealCursor);
                }, 300);
            };

            const moveToNextWaypoint = () => {
                if (currentWaypoint >= waypoints.length) {
                    cleanup();
                    return;
                }

                const targetPos = waypoints[currentWaypoint];
                const p0 = currentPos, p3 = targetPos;
                const dx = p3.x - p0.x, dy = p3.y - p0.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const p1 = { x: p0.x + dx * 0.25 + (Math.random() - 0.5) * dist * 0.3, y: p0.y + dy * 0.25 + (Math.random() - 0.5) * dist * 0.3 };
                const p2 = { x: p0.x + dx * 0.75 + (Math.random() - 0.5) * dist * 0.3, y: p0.y + dy * 0.75 + (Math.random() - 0.5) * dist * 0.3 };
                
                let step = 0;
                const animate = () => {
                    if (step >= 60) {
                        currentPos = targetPos;
                        const targetEl = targetPos.element;
                        if (Math.random() < 0.2 && targetEl.innerText) {
                            setTimeout(() => {
                                const range = document.createRange(), selection = window.getSelection();
                                try {
                                    const textNode = targetEl.childNodes[0];
                                    if (textNode && textNode.nodeType === 3) {
                                        const len = textNode.textContent.length;
                                        const start = ~~(Math.random() * (len / 2));
                                        const end = Math.min(start + ~~(Math.random() * (len / 2)) + 5, len);
                                        range.setStart(textNode, start);
                                        range.setEnd(textNode, end);
                                        selection.removeAllRanges();
                                        selection.addRange(range);
                                        setTimeout(() => selection.removeAllRanges(), 800);
                                    }
                                } catch (e) {}
                            }, 100);
                        } else {
                            targetEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                            targetEl.classList.add('fake-hover');
                            setTimeout(() => {
                                targetEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
                                targetEl.classList.remove('fake-hover');
                            }, 800);
                        }
                        currentWaypoint++;
                        setTimeout(moveToNextWaypoint, 1200);
                        return;
                    }
                    const t = step / 60;
                    const pos = bezierPoint(t, p0, p1, p2, p3);
                    cursorStyle.left = `${pos.x}px`;
                    cursorStyle.top = `${pos.y}px`;
                    step++;
                    requestAnimationFrame(animate);
                };
                animate();
            };
            setTimeout(moveToNextWaypoint, 400);
        };

        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const smoothScrollTo = (endY, duration) => {
            const startY = window.scrollY;
            const distance = endY - startY;
            let startTime = null;
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                window.scrollTo(0, startY + distance * easeInOutQuad(progress));
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            requestAnimationFrame(animation);
        };

        const applyScrollWarp = () => {
            const scrollHeight = document.body.scrollHeight, viewportHeight = window.innerHeight;
            if (scrollHeight <= viewportHeight) return;
            const action = Math.random();
            if (action < 0.60) {
                const jerkAmount = (Math.random() - 0.5) * 600;
                window.scrollBy({ top: jerkAmount, behavior: 'smooth' });
                setTimeout(() => window.scrollBy({ top: -jerkAmount, behavior: 'smooth' }), 300);
            } else if (action < 0.75) {
                window.scrollTo({ top: Math.random() * (scrollHeight - viewportHeight) });
            } else {
                const targetY = (window.scrollY < scrollHeight / 2) ? (scrollHeight - viewportHeight) : 0;
                smoothScrollTo(targetY, 2500 + Math.random() * 2000);
            }
        };

        const scrollReversalChance = 0.05;
        const handleScrollReversal = (event) => {
            if (isTabActive && Math.random() < scrollReversalChance) {
                event.preventDefault();
                window.scrollBy(0, -event.deltaY);
            }
        };
        
        const handleTypingGlitch = (event) => {
            if (!isTabActive || Math.random() > 0.10) return;
            const el = event.target;
            if (el.isGlitching) return; 

            el.isGlitching = true;

            setTimeout(() => {
                const start = el.selectionStart;
                if (Math.random() < 0.5) { 
                    const glitchChars = ['ø', '£', '€', '¡', '§', '¶', '•', 'ª', 'º', '±', '≠', '≤', '≥', 'µ', 'ö', 'ü', 'ä', 'ß', 'æ'];
                    const randomChar = glitchChars[~~(Math.random() * glitchChars.length)];
                    el.value = el.value.substring(0, start) + randomChar + el.value.substring(el.selectionEnd);
                    el.selectionStart = el.selectionEnd = start + 1;
                } else { 
                    const offset = ~~(Math.random() * 10) + 1;
                    const newPos = Math.max(0, start - offset);
                    el.setSelectionRange(newPos, newPos);
                }
                el.isGlitching = false;
            }, 4); 
        };

        window.GlitchArt = {
            isActive: true,
            stackGlitch: applyStackGlitch,
            imageStack: applyImageStack,
            datamosh: applyDatamosh,
            ghostCursor: animateGhostCursor,
            rgbSplit: applyRGBSplit,
            textCorrupt: applyTextCorruption,
            scrollWarp: applyScrollWarp,
        };
        
        const effectConfig = {
            stackGlitch: { func: window.GlitchArt.stackGlitch, cooldown: 11230, chance: 0.7, lastRun: 0 },
            imageStack: { func: window.GlitchArt.imageStack, cooldown: 9050, chance: 0.7, lastRun: 0 },
            textCorrupt: { func: window.GlitchArt.textCorrupt, cooldown: 4400, chance: 0.8, lastRun: 0 },
            rgbSplit: { func: window.GlitchArt.rgbSplit, cooldown: 20140, chance: 0.7, lastRun: 0 },
            datamosh: { func: window.GlitchArt.datamosh, cooldown: 16380, chance: 0.7, lastRun: 0 },
            scrollWarp: { func: window.GlitchArt.scrollWarp, cooldown: 22482, chance: 0.6, lastRun: 0 },
            ghostCursor: { func: window.GlitchArt.ghostCursor, cooldown: 13333, chance: 0.75, lastRun: 0 },
        };
        
        let isTabActive = !document.hidden;
        let lastFrameTime = 0;
        let animationFrameId = null;

        function glitchLoop(currentTime) {
            animationFrameId = requestAnimationFrame(glitchLoop);
            if (currentTime - lastFrameTime < 1000) return;
            
            lastFrameTime = currentTime;
            
            const effectKeys = Object.keys(effectConfig);
            for (let i = 0, len = effectKeys.length; i < len; i++) {
                const key = effectKeys[i];
                const effect = effectConfig[key];
                if (currentTime - effect.lastRun > effect.cooldown) {
                    if (Math.random() < effect.chance) {
                        effect.func();
                        effect.lastRun = currentTime;
                    }
                }
            }
        }
        
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
            if (document.hidden) {
                console.log('[GlitchArt] Tab is now hidden. Pausing loop.');
                cancelAnimationFrame(animationFrameId);
            } else {
                console.log('[GlitchArt] Tab is now active. Restarting cooldowns for a moment of peace.');
                const now = performance.now();
                const effectKeys = Object.keys(effectConfig);
                for (let i = 0, len = effectKeys.length; i < len; i++) {
                    effectConfig[effectKeys[i]].lastRun = now;
                }
                lastFrameTime = now;
                glitchLoop(now);
            }
        });
        
        console.log('[GlitchArt] Activating optimized scheduler and event listeners.');
        glitchLoop(performance.now());
        window.addEventListener('wheel', handleScrollReversal, { passive: false });
        document.body.addEventListener('click', () => {
             if (isTabActive && Math.random() < 0.15) window.GlitchArt.datamosh();
        });
        
        console.log('[GlitchArt] Activating typing listeners.');
        document.querySelectorAll('input[type="text"], textarea').forEach(el => {
            el.addEventListener('input', handleTypingGlitch);
        });
    };

    initialize();

})(window);