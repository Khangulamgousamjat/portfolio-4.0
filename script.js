/* ==========================================================================
   GULAMGOUS KHAN - CYBER & NEURAL INTERACTIVE PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNeuralCanvas();
    initTypewriter();
    initTerminal();
    initSkillsFilter();
    initProjectsFilter();
    initTreeToggle();
    initNavigation();
    initContactAndCopy();
    initScrollReveal();
});

/* ==========================================================================
   1. INTERACTIVE NEURAL CONSTELLATION CANVAS
   ========================================================================== */
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
    const connectionDistance = 140;
    const mouseConnectionDistance = 180;

    const mouse = {
        x: null,
        y: null,
        radius: mouseConnectionDistance
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1.2;
            this.color = Math.random() > 0.3 ? '#00F0FF' : '#a855f7';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Subtle mouse repulsion / attraction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 1.5;
                    this.y -= (dy / dist) * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.22})`;
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            // Connect to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[a].x - mouse.x;
                const dy = particles[a].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const opacity = 1 - (dist / mouse.radius);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.45})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

/* ==========================================================================
   2. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = [
        "FULL STACK AI/ML ENGINEER",
        "AGENTIC AI SPECIALIST",
        "BUILDING INTELLIGENT SYSTEMS",
        "MERN & GENAI ARCHITECT",
        "CSE GRADUATE // TARGET: GOOGLE SWE"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            el.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            el.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   3. INTERACTIVE CYBER TERMINAL
   ========================================================================== */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const chips = document.querySelectorAll('.term-chip');

    if (!input || !output) return;

    const commands = {
        help: `Available commands:<br>
  • <span class="term-cyan">status</span>   - View core credentials & engineering status<br>
  • <span class="term-cyan">skills</span>   - List specialized AI/ML and full-stack tech<br>
  • <span class="term-cyan">projects</span> - View featured production repositories<br>
  • <span class="term-cyan">stats</span>    - View LeetCode & contribution telemetry<br>
  • <span class="term-cyan">contact</span>  - Direct email and network links<br>
  • <span class="term-cyan">matrix</span>   - Initiate neural stream simulation<br>
  • <span class="term-cyan">whoami</span>   - Print current session authorization<br>
  • <span class="term-cyan">clear</span>    - Clear terminal buffer`,
        status: `<span class="term-bright">ENTITY</span>     : Gulamgous Khan<br>
<span class="term-bright">ROLE</span>       : Full Stack AI/ML Engineer<br>
<span class="term-bright">MISSION</span>    : Building Autonomous Multi-Agent & Scalable Web Systems<br>
<span class="term-bright">DSA STATUS</span> : 200+ Solved (Sliding Window, DP, Graph Algorithms)<br>
<span class="term-bright">CAREER GOAL</span>: Google Software Engineer`,
        skills: `<span class="term-green">[AI & GenAI]</span>     : LangChain, Multi-Agent Systems, RAG, OpenAI & Gemini APIs<br>
<span class="term-cyan">[Full Stack]</span>     : React, Next.js, Node.js, Express, FastAPI, TypeScript, MERN<br>
<span class="term-purple">[Data & Vector]</span>  : PostgreSQL, MongoDB, Redis, Pinecone, ChromaDB, FAISS<br>
<span class="term-bright">[Cloud & DevOps]</span> : Docker, AWS, GCP, GitHub Actions, Linux/Bash`,
        projects: `<span class="term-cyan">1. Pharma AI Agent</span>      - Multi-agent network automating pharmacy workflows & prescriptions<br>
<span class="term-cyan">2. Event Gous Kratos</span>    - High-concurrency enterprise event platform (Next.js, TS)<br>
<span class="term-cyan">3. Afreen Mall</span>          - Modern full-stack e-commerce solution with dynamic catalog<br>
<span class="term-cyan">4. Student Social</span>        - Academic real-time collaboration hub (Socket.io, React)<br>
<span class="term-cyan">5. Food Waste Platform</span>  - Real-time surplus food discovery connecting donors & NGOs<br>
<span class="term-cyan">6. Skill Developer</span>      - GPT-4 powered intern development & radar analytics engine`,
        stats: `<span class="term-bright">LeetCode</span>: 200+ Solved • Binary Search, Two Pointers, Trees, DP<br>
<span class="term-cyan">GitHub</span>  : @Khangulamgousamjat • Multiple AI Repositories<br>
<span class="term-green">Uptime</span>  : 100% Focused & Active Daily`,
        contact: `Email   : <a href="mailto:gousk2004@gmail.com" class="term-cyan">gousk2004@gmail.com</a><br>
LinkedIn: <a href="https://linkedin.com/in/gulamgous" target="_blank" class="term-cyan">linkedin.com/in/gulamgous</a><br>
GitHub  : <a href="https://github.com/Khangulamgousamjat" target="_blank" class="term-cyan">github.com/Khangulamgousamjat</a><br>
LeetCode: <a href="https://leetcode.com/u/khangulamgous/" target="_blank" class="term-cyan">leetcode.com/u/khangulamgous/</a>`,
        whoami: `<span class="term-green">guest@neural-core</span> : Authorization Level = EXPLORER // WELCOME`,
        sudo: `<span class="term-dim">Permission denied: Gulamgous is root administrator.</span>`,
        matrix: `<span class="term-green">01000111 01010101 01001100 01000001 01001101 01000111 01001111 01010101 01010011<br>
[NEURAL STREAM INITIALIZED] // AI INFERENCE ACTIVE // KERNEL READY</span>`
    };

    function executeCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        if (!cleanCmd) return;

        if (cleanCmd === 'clear') {
            output.innerHTML = '';
            appendPrompt();
            return;
        }

        // Insert command echo
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="term-green">guest@neural-core:~$</span> <span class="term-cyan">${escapeHtml(cleanCmd)}</span>`;

        // Prompt container insertion point
        const promptLine = output.querySelector('.interactive-prompt');
        output.insertBefore(line, promptLine);

        // Result insertion
        const resLine = document.createElement('div');
        resLine.className = 'terminal-line output';

        if (commands[cleanCmd]) {
            resLine.innerHTML = commands[cleanCmd];
        } else {
            resLine.innerHTML = `<span class="term-dim">command not found: "${escapeHtml(cleanCmd)}". Type <span class="term-cyan">help</span> for commands.</span>`;
        }

        output.insertBefore(resLine, promptLine);
        output.scrollTop = output.scrollHeight;
        setTimeout(() => {
            output.scrollTop = output.scrollHeight;
            if (promptLine) promptLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 40);
    }

    function appendPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'terminal-line interactive-prompt';
        prompt.innerHTML = `<span class="term-green">guest@neural-core:~$</span>
        <input type="text" id="terminal-input" placeholder="type 'help', 'skills', 'projects'..." autocomplete="off" spellcheck="false">`;
        output.appendChild(prompt);

        const newInput = prompt.querySelector('#terminal-input');
        attachInputEvents(newInput);
        newInput.focus();
    }

    function attachInputEvents(inputEl) {
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = inputEl.value;
                inputEl.value = '';
                executeCommand(val);
            }
        });
    }

    attachInputEvents(input);

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            const activeInput = output.querySelector('#terminal-input');
            if (activeInput) activeInput.value = '';
            executeCommand(cmd);
        });
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   4. SKILLS & TECH MATRIX FILTER
   ========================================================================== */
function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('.skills-filter-container .filter-btn');
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');

    if (!filterBtns.length || !skillCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 30);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   5. PROJECTS FILTER
   ========================================================================== */
function initProjectsFilter() {
    const pFilterBtns = document.querySelectorAll('.project-filter-bar .proj-filter');
    const projectCards = document.querySelectorAll('.project-container .project-box');

    if (!pFilterBtns.length || !projectCards.length) return;

    pFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-pfilter');

            projectCards.forEach(card => {
                const pCategory = card.getAttribute('data-pcategory');

                if (filter === 'all' || pCategory === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.35s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 30);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   6. ARCHITECTURE TREE TOGGLE
   ========================================================================== */
function initTreeToggle() {
    const toggleBtn = document.getElementById('toggle-tree-btn');
    const treeContent = document.getElementById('arch-tree-content');

    if (!toggleBtn || !treeContent) return;

    toggleBtn.addEventListener('click', () => {
        const isCollapsed = treeContent.classList.toggle('collapsed');
        toggleBtn.innerHTML = isCollapsed 
            ? `<i class='bx bx-chevron-right'></i> Expand Tree`
            : `<i class='bx bx-chevron-down'></i> Toggle Tree`;
    });
}

/* ==========================================================================
   7. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('#navbar');
    const header = document.querySelector('#header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuIcon && navbar) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });

    // Scroll listener for sticky header and scrollspy
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky header
        if (header) {
            header.classList.toggle('sticky', scrollY > 80);
        }

        // Active link scrollspy
        sections.forEach(sec => {
            const top = scrollY;
            const offset = sec.offsetTop - 180;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const match = document.querySelector(`header nav a[href*='${id}']`);
                    if (match) match.classList.add('active');
                });
            }
        });
    });
}

/* ==========================================================================
   8. CONTACT FORM & COPY TO CLIPBOARD
   ========================================================================== */
function initContactAndCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const emailToCopy = "gousk2004@gmail.com";

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                showToast(`✓ Copied "${emailToCopy}" to clipboard!`);
            }).catch(() => {
                showToast(`Email: ${emailToCopy}`);
            });
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Transmit';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Encrypting & Transmitting...</span>`;
            }

            // Simulate fast transmission
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
                form.reset();
                if (feedback) {
                    feedback.className = 'form-feedback success';
                    feedback.textContent = `✓ Transmission Acknowledged! Response will be routed to your email within 12 hours.`;
                    setTimeout(() => { feedback.textContent = ''; }, 6000);
                }
                showToast(`✓ Transmission successfully dispatched!`);
            }, 1200);
        });
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3800);
}

/* ==========================================================================
   9. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
    if (typeof ScrollReveal === 'undefined') return;

    const sr = ScrollReveal({
        distance: '40px',
        duration: 900,
        delay: 150,
        reset: false, // Cleaner professional feel without repetitive jumping
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });

    sr.reveal('.hero-content', { origin: 'left' });
    sr.reveal('.hero-terminal-wrapper', { origin: 'right', delay: 250 });
    sr.reveal('.section-header', { origin: 'top' });
    sr.reveal('.about-card-neural', { origin: 'left', delay: 200 });
    sr.reveal('.about-content', { origin: 'right', delay: 250 });
    sr.reveal('.skills-filter-container', { origin: 'top', delay: 100 });
    sr.reveal('.skill-card', { interval: 40, origin: 'bottom' });
    sr.reveal('.arch-tree-container', { origin: 'bottom', delay: 300 });
    sr.reveal('.project-box', { interval: 80, origin: 'bottom' });
    sr.reveal('.cyber-panel', { interval: 150, origin: 'bottom' });
    sr.reveal('.dsa-stat-card, .dsa-topics-card', { origin: 'top', delay: 100 });
    sr.reveal('.stat-img-card', { interval: 100, origin: 'bottom' });
    sr.reveal('.github-streak-wrap, .github-graph-wrap', { origin: 'bottom', delay: 200 });
    sr.reveal('.contact-sidebar', { origin: 'left', delay: 150 });
    sr.reveal('.contact-form-card', { origin: 'right', delay: 200 });
}