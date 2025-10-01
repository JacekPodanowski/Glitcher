/**
 * Enhanced Glitch Art Effects Payload v6.16 (Complete & Optimized)
 * For Educational & Artistic Use Only
 *
 * This version is a complete, self-contained file with all functions fully implemented.
 * - NEW, UNIVERSAL SHADOW GLITCH:
 *   - Applies a strong, shaky, multi-colored drop-shadow to ALL elements simultaneously.
 *   - Features a high-intensity animation with large offsets for a chaotic visual effect.
 *   - Respects the page's Z-axis for proper layering.
 * - Dependency-free and includes all other recent features.
 */

(function(window) {
    // --- 1. MAIN LIBRARY AND ACTIVATOR (NO DEPENDENCIES NEEDED) ---
    const main = () => {
        console.log('[GlitchArt] Initializing dependency-free effects library.');

        if (window.GlitchArt && window.GlitchArt.isActive) {
            console.log('[GlitchArt] Library already active. Halting re-initialization.');
            return;
        }

        const style = document.createElement('style');
        style.textContent = `
            /* MODIFIED KEYFRAME TO USE A PROGRESSIVE MULTIPLIER */
            @keyframes stack-glitch { 
                0%, 100% { transform: translate(0, 0); opacity: 1; } 
                50% { transform: translate(calc(var(--glitch-dx) * var(--glitch-multiplier)), calc(var(--glitch-dy) * var(--glitch-multiplier))); opacity: 0.5; }
            }
            .glitch-stack-container { position: relative; z-index: 1; }
            .glitch-stack-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; filter: hue-rotate(var(--hue-shift, 0deg)) brightness(0.8); animation: stack-glitch var(--glitch-duration, 1.2s) ease-in-out forwards; animation-delay: var(--delay, 0s); opacity: 1; }
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
            
            /* --- NEW: Universal RGB Shadow Glitch --- */
            body.universal-shadow-glitch * {
                animation: universal-shadow-glitch-anim 0.5s ease-in-out forwards;
            }
            @keyframes universal-shadow-glitch-anim {
                0% {
                    transform: translate(0, 0);
                    filter: drop-shadow(0 0 0 red) drop-shadow(0 0 0 lime) drop-shadow(0 0 0 blue);
                }
                25% {
                    transform: translate(5px, -10px);
                    filter: drop-shadow(15px 10px 0 red) drop-shadow(-20px -5px 0 lime) drop-shadow(5px 25px 0 blue);
                }
                50% {
                    transform: translate(-10px, 8px);
                    filter: drop-shadow(-25px 20px 0 red) drop-shadow(15px -15px 0 lime) drop-shadow(-10px -5px 0 blue);
                }
                75% {
                    transform: translate(8px, -5px);
                    filter: drop-shadow(30px -10px 0 red) drop-shadow(-5px 30px 0 lime) drop-shadow(20px 15px 0 blue);
                }
                100% {
                    transform: translate(0, 0);
                    filter: drop-shadow(0 0 0 red) drop-shadow(0 0 0 lime) drop-shadow(0 0 0 blue);
                }
            }

            .text-corrupt { position: relative; display: inline-block; }
            .text-corrupt::before, .text-corrupt::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
            .text-corrupt::before { left: 8px; text-shadow: -5px 0 #ff00ff, 3px 2px #ff0000; clip: rect(44px, 450px, 56px, 0); animation: corrupt-anim-1-MODIFIED 0.4s infinite linear alternate-reverse; }
            .text-corrupt::after { left: -8px; text-shadow: -5px 0 #00ffff, -3px 2px #00ff00; clip: rect(44px, 450px, 56px, 0); animation: corrupt-anim-2-MODIFIED 0.4s infinite linear alternate-reverse; }
            @keyframes corrupt-anim-1 { 0% { clip: rect(42px, 9999px, 44px, 0); left: 8px; } 10% { clip: rect(12px, 9999px, 59px, 0); left: -6px; } 20% { clip: rect(66px, 9999px, 89px, 0); left: 10px; } 30% { clip: rect(17px, 9999px, 34px, 0); left: -8px; } 40% { clip: rect(87px, 9999px, 40px, 0); left: 12px; } 50% { clip: rect(50px, 9999px, 75px, 0); left: -10px; } 60% { clip: rect(23px, 9999px, 55px, 0); left: 9px; } 70% { clip: rect(70px, 9999px, 95px, 0); left: -7px; } 80% { clip: rect(8px, 9999px, 28px, 0); left: 11px; } 90% { clip: rect(45px, 9999px, 60px, 0); left: -9px; } 100% { clip: rect(32px, 9999px, 48px, 0); left: 8px; } }
            @keyframes corrupt-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); left: -10px; } 10% { clip: rect(25px, 9999px, 45px, 0); left: 8px; } 20% { clip: rect(78px, 9999px, 88px, 0); left: -12px; } 30% { clip: rect(5px, 9999px, 15px, 0); left: 9px; } 40% { clip: rect(52px, 9999px, 72px, 0); left: -8px; } 50% { clip: rect(38px, 9999px, 58px, 0); left: 11px; } 60% { clip: rect(82px, 9999px, 92px, 0); left: -9px; } 70% { clip: rect(15px, 9999px, 35px, 0); left: 10px; } 80% { clip: rect(60px, 9999px, 80px, 0); left: -11px; } 90% { clip: rect(28px, 9999px, 48px, 0); left: 8px; } 100% { clip: rect(70px, 9999px, 85px, 0); left: -10px; } }
            
            /* --- Button Glitch Styles (v7) --- */
            @keyframes button-collapse {
                to { transform: scale(0); opacity: 0; }
            }
            .glitch-button-active {
                position: absolute;
                z-index: 2147483647;
                box-sizing: border-box !important;
                transition: filter 0.1s;
            }
            .glitch-button-invert {
                filter: invert(1);
            }
            .glitch-button-disappear {
                animation: button-collapse 0.3s ease-in forwards;
            }
        `;
        document.head.appendChild(style);

        // --- All Glitch Effect Functions ---
        
        const glitchCharMap = {
            'a': ['@', '4', 'λ'], 'e': ['3', '€'], 'i': ['1', '!', '|'], 'o': ['0', 'ø', '°'], 'u': ['µ', 'v'],
            's': ['5', '$', '§'], 't': ['7', '+'], 'l': ['1', '|'], 'g': ['6', '9'], 'b': ['8', 'ß'], 'c': ['(', '<'],
            'z': ['2'], 'r': ['®'], 'x': ['%'], 'w': ['ω'], 'h': ['ħ'], 'k': ['κ'],
            'A': ['∀', 'Δ'], 'E': ['∃'], 'I': ['Ⅰ'], 'O': ['∅'], 'S': ['Σ'], 'T': ['⊤']
        };

        const applyTextGlitch = (element) => {
            if (!element || !element.textContent.trim()) return;

            const originalText = element.dataset.originalText || element.textContent;
            element.dataset.originalText = originalText;

            const glitchChance = 0.4;
            let glitchedText = '';
            for (const char of originalText) {
                const lowerChar = char.toLowerCase();
                if (glitchCharMap[char] || glitchCharMap[lowerChar]) {
                    if (Math.random() < glitchChance) {
                        const replacements = glitchCharMap[char] || glitchCharMap[lowerChar];
                        glitchedText += replacements[Math.floor(Math.random() * replacements.length)];
                    } else {
                        glitchedText += char;
                    }
                } else {
                    glitchedText += char;
                }
            }
            element.textContent = glitchedText;
        };
        
        const manageMovingTextGlitch = () => {
            const previous = document.querySelector('[data-is-currently-glitched="true"]');
            if (previous && previous.dataset.originalText) {
                previous.textContent = previous.dataset.originalText;
                delete previous.dataset.isCurrentlyGlitched;
                delete previous.dataset.originalText;
            }

            const elements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, span, a, li'));
            const validElements = elements.filter(el => el.textContent.trim().length > 5 && !el.closest('button, a.button, [role="button"]'));
            if (validElements.length > 0) {
                const target = validElements[Math.floor(Math.random() * validElements.length)];
                target.dataset.isCurrentlyGlitched = 'true';
                applyTextGlitch(target);
            }

            const nextInterval = Math.random() * 4000 + 1000;
            setTimeout(manageMovingTextGlitch, nextInterval);
        };

        const applyButtonGlitch = (button) => {
            if (!button || button.dataset.isGlitched === 'true') return;
            button.dataset.isGlitched = 'true';

            button.style.pointerEvents = 'none';
            setTimeout(() => {
                button.style.pointerEvents = '';
            }, 1000);

            let clickState = 0;
            const originalOnclick = button.onclick;
            const originalText = button.textContent;
            button.onclick = null;

            let originalParent = button.parentNode;
            let originalNextSibling = button.nextSibling;
            const originalStyles = {
                position: button.style.position,
                top: button.style.top,
                left: button.style.left,
                zIndex: button.style.zIndex,
                transform: button.style.transform,
                width: button.style.width,
                height: button.style.height,
                pointerEvents: button.style.pointerEvents,
            };
            
            let moveAnimationId = null;
            let teleportIntervalId = null;

            const startErraticMovement = () => {
                let baseOffsetX = 0, baseOffsetY = 0;
                const shakeAmount = 20;

                const shockRadius = 200;
                const shockAngle = Math.random() * Math.PI * 2;
                const shockDistance = Math.random() * shockRadius;
                baseOffsetX = Math.cos(shockAngle) * shockDistance;
                baseOffsetY = Math.sin(shockAngle) * shockDistance;

                const attackTeleports = 10;
                const attackDuration = 800;
                for (let i = 0; i < attackTeleports; i++) {
                    setTimeout(() => {
                        const attackRadius = 150;
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * attackRadius;
                        baseOffsetX = Math.cos(angle) * distance;
                        baseOffsetY = Math.sin(angle) * distance;
                        button.classList.toggle('glitch-button-invert', Math.random() < 0.5);
                    }, i * (attackDuration / attackTeleports));
                }

                setTimeout(() => {
                    teleportIntervalId = setInterval(() => {
                        const teleportRadius = 150;
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * teleportRadius;
                        baseOffsetX = Math.cos(angle) * distance;
                        baseOffsetY = Math.sin(angle) * distance;
                        if (Math.random() < 0.4) {
                            button.classList.add('glitch-button-invert');
                        } else {
                            button.classList.remove('glitch-button-invert');
                        }
                    }, 350);
                }, attackDuration); 

                const animate = () => {
                    const shakeX = (Math.random() - 0.5) * shakeAmount;
                    const shakeY = (Math.random() - 0.5) * shakeAmount;
                    button.style.transform = `translate(${baseOffsetX + shakeX}px, ${baseOffsetY + shakeY}px)`;
                    moveAnimationId = requestAnimationFrame(animate);
                };
                animate();
            };

            const stopErraticMovement = () => {
                cancelAnimationFrame(moveAnimationId);
                clearInterval(teleportIntervalId);
                button.style.transform = '';
                button.classList.remove('glitch-button-invert');
            };

            const performAction = (event) => {
                if (originalOnclick) {
                    originalOnclick.call(button, event);
                } else if (button.tagName === 'A' && button.href) {
                    if (button.target === '_blank') window.open(button.href);
                    else window.location.href = button.href;
                }
            };

            const transferGlitch = () => {
                const allPossibleButtons = Array.from(document.querySelectorAll('button, a.button, [role="button"]'));
                const unglitchedButtons = allPossibleButtons.filter(b => b.dataset.isGlitched !== 'true');

                if (unglitchedButtons.length > 0) {
                    const nextVictim = unglitchedButtons[Math.floor(Math.random() * unglitchedButtons.length)];
                    applyButtonGlitch(nextVictim);
                }
            };
            
            const clickHandler = (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (clickState === 0) {
                    const rect = button.getBoundingClientRect();
                    originalParent.insertBefore(document.createComment(''), button);
                    const docTop = rect.top + window.scrollY;
                    const docLeft = rect.left + window.scrollX;
                    document.body.appendChild(button);
                    button.classList.add('glitch-button-active');
                    button.style.position = 'absolute';
                    button.style.width = `${rect.width}px`;
                    button.style.height = `${rect.height}px`;
                    button.style.top = `${docTop}px`;
                    button.style.left = `${docLeft}px`;
                    applyTextGlitch(button);
                    startErraticMovement();
                    clickState = 1;
                } else if (clickState === 1) {
                    stopErraticMovement();
                    button.classList.remove('glitch-button-active');
                    button.classList.add('glitch-button-disappear');

                    const onAnimationEnd = () => {
                        performAction(event);
                        setTimeout(() => {
                            button.classList.remove('glitch-button-disappear');
                            originalParent.insertBefore(button, originalNextSibling);
                            Object.assign(button.style, originalStyles);
                            button.textContent = originalText;
                            button.removeEventListener('click', clickHandler);
                            button.onclick = originalOnclick;
                            delete button.dataset.isGlitched;
                            transferGlitch();
                        }, 1000);
                        button.removeEventListener('animationend', onAnimationEnd);
                    };
                    button.addEventListener('animationend', onAnimationEnd);
                }
            };
            
            button.addEventListener('click', clickHandler);
        };

        const applyStackGlitch = () => {
            const potentialTargets = Array.from(document.querySelectorAll('section, nav, header, footer, main, article, div'));
            const validTargets = potentialTargets.filter(el => {
                if (!el.parentNode) return false;
                const rect = el.getBoundingClientRect();
                return rect.height > 100 && rect.width > 100 && el.childElementCount > 0;
            });

            if (validTargets.length === 0) return;

            const el = validTargets[Math.floor(Math.random() * validTargets.length)];
            const numLayers = Math.floor(Math.random() * 11) + 10;
            const duration = 1200;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 4 + 3;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            if (el.closest('.glitch-stack-container')) return;

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
                cloneStyle.setProperty('--glitch-multiplier', i);
                cloneStyle.setProperty('--delay', `${i * 0.035}s`);
                cloneStyle.setProperty('--hue-shift', `${(i * 20) % 360}deg`);
                cloneStyle.setProperty('--glitch-duration', `${duration / 1000}s`);
                cloneStyle.zIndex = i;
                fragment.appendChild(clone);
            }
            wrapper.appendChild(fragment);

            setTimeout(() => {
                if (wrapper.parentNode) {
                    wrapper.parentNode.insertBefore(el, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }, duration + numLayers * 35);
        };

        const applyImageStack = () => {
            const images = document.querySelectorAll('img');
            const numImages = images.length;
            if (numImages === 0) return;

            const img = images[~~(Math.random() * numImages)];
            if (!img.parentNode) return;

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
        
        const applyUniversalShadowGlitch = () => {
            const body = document.body;
            if (body.classList.contains('universal-shadow-glitch')) return;
            
            body.classList.add('universal-shadow-glitch');
            
            setTimeout(() => {
                body.classList.remove('universal-shadow-glitch');
            }, 500); // Must match animation duration
        };

        const applyLegacyTextCorruption = () => {
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
                        if (Math.random() < 0.5 && targetEl.innerText) {
                            setTimeout(() => {
                                const range = document.createRange(), selection = window.getSelection();
                                try {
                                    const textNode = Array.from(targetEl.childNodes).find(n => n.nodeType === 3);
                                    if (textNode) {
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
            ghostCursor: animateGhostCursor,
            rgbSplit: applyUniversalShadowGlitch,
            legacyTextCorrupt: applyLegacyTextCorruption,
            scrollWarp: applyScrollWarp,
            buttonGlitch: applyButtonGlitch,
        };
        
        const effectConfig = {
            stackGlitch: { func: window.GlitchArt.stackGlitch, cooldown: 11230, chance: 0.7, lastRun: 0 },
            imageStack: { func: window.GlitchArt.imageStack, cooldown: 9050, chance: 0.7, lastRun: 0 },
            legacyTextCorrupt: { func: window.GlitchArt.legacyTextCorrupt, cooldown: 4400, chance: 0.8, lastRun: 0 },
            rgbSplit: { func: window.GlitchArt.rgbSplit, cooldown: 18000, chance: 0.8, lastRun: 0 },
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
                        try {
                           effect.func();
                           effect.lastRun = currentTime;
                        } catch (e) {
                           console.error(`[GlitchArt] Error in effect '${key}':`, e);
                        }
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
                Object.values(effectConfig).forEach(effect => effect.lastRun = now);
                lastFrameTime = now;
                glitchLoop(now);
            }
        });
        
        console.log('[GlitchArt] Activating optimized scheduler and event listeners.');
        glitchLoop(performance.now());
        
        console.log('[GlitchArt] Activating moving text glitch loop.');
        manageMovingTextGlitch();

        window.addEventListener('wheel', handleScrollReversal, { passive: false });
        
        console.log('[GlitchArt] Activating typing listeners.');
        document.querySelectorAll('input[type="text"], textarea').forEach(el => {
            el.addEventListener('input', handleTypingGlitch);
        });

        console.log('[GlitchArt] Searching for buttons to apply the initial teleport glitch...');
        const allButtons = Array.from(document.querySelectorAll('button, a.button, [role="button"]'));
        if (allButtons.length > 0) {
            const numToGlitch = Math.max(1, Math.floor(allButtons.length / 2));
            const shuffledButtons = allButtons.sort(() => 0.5 - Math.random());
            const initialVictims = shuffledButtons.slice(0, numToGlitch);
            
            console.log(`[GlitchArt] Applying initial glitch to ${numToGlitch} out of ${allButtons.length} buttons.`);
            initialVictims.forEach(button => {
                window.GlitchArt.buttonGlitch(button);
            });
        }
    };

    main();

})(window);