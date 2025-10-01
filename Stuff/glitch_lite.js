/**
 * Enhanced Glitch Art Effects Payload v7.2 (Lite & Reusable Shrink)
 * For Educational & Artistic Use Only
 *
 * This version refines the buttonShrink effect for better feel and reusability.
 *
 * MODIFIED based on user request (v21):
 * - The buttonShrink animation is now 100ms longer (0.3s).
 * - The effect emphasizes the shrinking motion over the fade-out.
 * - The click listener is now correctly managed to ensure the effect works again if the button reappears on the same page.
 * - The random image and text corruption effects still run in the background.
 */

(function(window) {
    // --- 1. MAIN LIBRARY AND ACTIVATOR ---
    const main = () => {
        console.log('[GlitchArt Lite] Initializing effects library.');

        if (window.GlitchArt && window.GlitchArt.isActive) {
            console.log('[GlitchArt Lite] Library already active. Halting re-initialization.');
            return;
        }

        const style = document.createElement('style');
        style.textContent = `
            /* --- STYLES FOR THE REFINED buttonShrink EFFECT --- */
            .button-shrink-effect {
                /* UPDATED: Animation is now 0.3s long, with emphasis on the transform */
                transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19), opacity 0.3s ease-out;
            }
            .button-shrink-effect.glitching {
                /* The button's state during the animation: invisible and shrunk */
                transform: scale(0);
                opacity: 0;
                pointer-events: none; /* Prevents clicking it again while animating */
            }

            /* --- STYLES FOR OTHER RANDOM EFFECTS --- */
            .glitch-image-container { position: relative; display: inline-block; overflow: visible; }
            .glitch-image-stack { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; }
            .glitch-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; mix-blend-mode: screen; opacity: 0.8; }
            .glitch-layer-1 { animation: glitch-anim-1 0.5s infinite; filter: hue-rotate(90deg); }
            .glitch-layer-2 { animation: glitch-anim-2 0.5s infinite; filter: hue-rotate(180deg) invert(1); }
            .glitch-layer-3 { animation: glitch-anim-3 0.5s infinite; filter: hue-rotate(270deg); }
            @keyframes glitch-anim-1 { 0% { transform: translate(0); } 10% { transform: translate(-8px, 3px); } 20% { transform: translate(8px, -3px); } 30% { transform: translate(-6px, 5px); } 40% { transform: translate(10px, -2px); } 50% { transform: translate(-7px, 4px); } 60% { transform: translate(9px, -4px); } 70% { transform: translate(-5px, 2px); } 80% { transform: translate(6px, -5px); } 90% { transform: translate(-8px, 3px); } 100% { transform: translate(0); } }
            @keyframes glitch-anim-2 { 0% { transform: translate(0); } 15% { transform: translate(5px, -2px); } 30% { transform: translate(-7px, 4px); } 45% { transform: translate(6px, 3px); } 60% { transform: translate(-8px, -3px); } 75% { transform: translate(9px, 2px); } 90% { transform: translate(-6px, -4px); } 100% { transform: translate(0); } }
            @keyframes glitch-anim-3 { 0% { transform: translate(0, 0); } 12% { transform: translate(-10px, 5px); } 24% { transform: translate(10px, -5px); } 36% { transform: translate(-8px, 6px); } 48% { transform: translate(12px, -3px); } 60% { transform: translate(-9px, 4px); } 72% { transform: translate(11px, -6px); } 84% { transform: translate(-7px, 5px); } 96% { transform: translate(8px, -4px); } 100% { transform: translate(0, 0); } }
            .text-corrupt { position: relative; display: inline-block; }
            .text-corrupt::before, .text-corrupt::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
            .text-corrupt::before { left: 8px; text-shadow: -5px 0 #ff00ff, 3px 2px #ff0000; clip: rect(44px, 450px, 56px, 0); animation: corrupt-anim-1 0.4s infinite linear alternate-reverse; }
            .text-corrupt::after { left: -8px; text-shadow: -5px 0 #00ffff, -3px 2px #00ff00; clip: rect(44px, 450px, 56px, 0); animation: corrupt-anim-2 0.4s infinite linear alternate-reverse; }
            @keyframes corrupt-anim-1 { 0% { clip: rect(42px, 9999px, 44px, 0); } 10% { clip: rect(12px, 9999px, 59px, 0); } 20% { clip: rect(66px, 9999px, 89px, 0); } 30% { clip: rect(17px, 9999px, 34px, 0); } 40% { clip: rect(87px, 9999px, 40px, 0); } 50% { clip: rect(50px, 9999px, 75px, 0); } 60% { clip: rect(23px, 9999px, 55px, 0); } 70% { clip: rect(70px, 9999px, 95px, 0); } 80% { clip: rect(8px, 9999px, 28px, 0); } 90% { clip: rect(45px, 9999px, 60px, 0); } 100% { clip: rect(32px, 9999px, 48px, 0); } }
            @keyframes corrupt-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 10% { clip: rect(25px, 9999px, 45px, 0); } 20% { clip: rect(78px, 9999px, 88px, 0); } 30% { clip: rect(5px, 9999px, 15px, 0); } 40% { clip: rect(52px, 9999px, 72px, 0); } 50% { clip: rect(38px, 9999px, 58px, 0); } 60% { clip: rect(82px, 9999px, 92px, 0); } 70% { clip: rect(15px, 9999px, 35px, 0); } 80% { clip: rect(60px, 9999px, 80px, 0); } 90% { clip: rect(28px, 9999px, 48px, 0); } 100% { clip: rect(70px, 9999px, 85px, 0); } }
        `;
        document.head.appendChild(style);

        // --- REWRITTEN: Interactive and Reusable Button Shrink ---
        const initializeButtonShrink = () => {
            const buttons = document.querySelectorAll('button, [role="button"], .btn, .button');

            // This is the named function for our click event.
            // We use a named function so we can remove and re-add it.
            const handleShrinkClick = (event) => {
                event.preventDefault();
                const button = event.currentTarget;

                // Temporarily remove the listener to prevent an infinite loop
                button.removeEventListener('click', handleShrinkClick);

                // Start the animation
                button.classList.add('glitching');

                // After the animation finishes, trigger the original action
                setTimeout(() => {
                    button.click(); // This submits the form or follows the link

                    // After a delay, reset the button's state so it can be used again
                    setTimeout(() => {
                        button.classList.remove('glitching'); // Make it reappear
                        button.addEventListener('click', handleShrinkClick); // Re-attach the listener
                    }, 400);

                }, 350); // This delay must be slightly longer than the CSS transition (0.3s)
            };

            // Apply the effect to all found buttons
            buttons.forEach(button => {
                button.classList.add('button-shrink-effect');
                button.addEventListener('click', handleShrinkClick);
            });
        };

        // --- Other Glitch Effect Functions (Unchanged) ---
        const applyImageStack = () => {
            const images = document.querySelectorAll('img');
            if (images.length === 0) return;

            const img = images[~~(Math.random() * images.length)];
            const wrapper = document.createElement('div');
            wrapper.className = 'glitch-image-container';
            wrapper.style.display = getComputedStyle(img).display || 'inline-block';
            wrapper.style.width = `${img.width}px`;
            wrapper.style.height = `${img.height}px`;

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            const stack = document.createElement('div');
            stack.className = 'glitch-image-stack';
            for (let i = 1; i <= 3; i++) {
                const layer = document.createElement('div');
                layer.className = `glitch-layer glitch-layer-${i}`;
                layer.style.backgroundImage = `url(${img.src})`;
                stack.appendChild(layer);
            }
            wrapper.appendChild(stack);

            setTimeout(() => {
                if (wrapper.parentNode) {
                    wrapper.parentNode.insertBefore(img, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }, 500);
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
        
        // --- Activate all effects ---
        
        // Automatically set up all buttons for the on-click shrink effect.
        initializeButtonShrink();

        window.GlitchArt = {
            isActive: true,
            imageStack: applyImageStack,
            textCorrupt: applyTextCorruption,
        };

        const effectConfig = {
            imageStack: { func: window.GlitchArt.imageStack, cooldown: 9050, chance: 0.7, lastRun: 0 },
            textCorrupt: { func: window.GlitchArt.textCorrupt, cooldown: 4400, chance: 0.8, lastRun: 0 },
        };

        let isTabActive = !document.hidden;
        let lastFrameTime = 0;
        let animationFrameId = null;

        function glitchLoop(currentTime) {
            animationFrameId = requestAnimationFrame(glitchLoop);
            if (currentTime - lastFrameTime < 1000) return;

            lastFrameTime = currentTime;
            if (!isTabActive) return;

            for (const key in effectConfig) {
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
                console.log('[GlitchArt Lite] Tab is now hidden. Pausing loop.');
                cancelAnimationFrame(animationFrameId);
            } else {
                console.log('[GlitchArt Lite] Tab is now active. Restarting loop.');
                const now = performance.now();
                for (const key in effectConfig) {
                    effectConfig[key].lastRun = now;
                }
                lastFrameTime = now;
                glitchLoop(now);
            }
        });

        console.log('[GlitchArt Lite] Activating button shrink effect and optimized scheduler.');
        glitchLoop(performance.now());
    };

    main();

})(window);