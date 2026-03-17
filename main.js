// 1. Expanded Premium Product Data (All images verified)
const PRODUCTS = [
    { id: 1, name: "Aura Crystal", price: 199, img: "aura_hero.png" },
    { id: 2, name: "Shadow Pulse", price: 249, img: "shadow_pulse.png" },
    { id: 3, name: "Prism Vision", price: 179, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Onyx Elite", price: 299, img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Nebula Drift", price: 349, img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400" },
    { id: 6, name: "Solar Flare", price: 219, img: "solar_flare.png" },
    { id: 7, name: "Lunar Glow", price: 269, img: "lunar_glow.png" },
    { id: 8, name: "Stellar Edge", price: 399, img: "stellar_edge.png" },
    { id: 9, name: "Void Core", price: 449, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400" },
];

let cart = [];
let lastAction = null;
const GOLDEN_RULES = [
    "1. Consistency (Unified Branding)",
    "2. Shortcuts (V, G, C, H keys)",
    "3. Informative Feedback (Toasts)",
    "4. Design for Closure (Cart Flow)",
    "5. Error Handling (Async Catch)",
    "6. Permit Reversal (Ctrl+Z Undo)",
    "7. Locus of Control (Manual On/Off)",
    "8. Reduce Memory Load (Floating Cues)"
];

// 2. Lifecycle
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderProducts();
    setupNav();
    initKeyboard();
    initVoice();
    initGesture();
    initCartUI();
    initDashboard();
});

// Implementation of Golden Rule #1
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = PRODUCTS.map((p, i) => `
        <div class="product-card" style="animation-delay: ${i * 0.1}s">
            <img src="${p.img}" class="card-img" alt="${p.name}">
            <div class="card-info">
                <h3 class="card-name">${p.name}</h3>
                <span class="card-price">$${p.price}</span>
                <button class="add-btn" onclick="addToCartById(${p.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Multi-Page Navigation Simulation
function setupNav() {
    const links = document.querySelectorAll('.nav-link');
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '#home';
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });

        const section = document.querySelector(hash);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
    });

    // Detect scroll to update nav
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });
        links.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
    });
}

// 3. Advanced Voice Control (Golden Rule #2)
let recognition;
let isVoiceActive = false;
let lastProcessedTime = 0;

function initVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const now = Date.now();
        if (now - lastProcessedTime < 800) return;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript.toLowerCase();
            if (handleVoiceCommand(transcript)) {
                lastProcessedTime = now;
                break;
            }
        }
    };

    document.getElementById('voice-trigger').onclick = toggleVoice;
}

function handleVoiceCommand(cmd) {
    let handled = true;

    // NAVIGATION
    if (cmd.includes('home')) window.location.hash = 'home';
    else if (cmd.includes('collection') || cmd.includes('shop')) window.location.hash = 'collection';
    else if (cmd.includes('tech')) window.location.hash = 'tech';
    else if (cmd.includes('contact')) window.location.hash = 'contact';

    // SCROLLING (Advanced Commands)
    else if (cmd.includes('scroll down') || cmd.includes('down')) window.scrollBy({ top: 600, behavior: 'smooth' });
    else if (cmd.includes('scroll up') || cmd.includes('up')) window.scrollBy({ top: -600, behavior: 'smooth' });
    else if (cmd.includes('bottom')) window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    else if (cmd.includes('top')) window.scrollTo({ top: 0, behavior: 'smooth' });

    // ACTIONS
    else if (cmd.includes('add')) {
        const product = getCenteredProduct() || PRODUCTS[0];
        addToCart(product);
    }
    else if (cmd.includes('close') || cmd.includes('hide')) toggleCart(false);
    else if (cmd.includes('cart') || cmd.includes('open')) toggleCart(true);
    else if (cmd.includes('undo')) undoAction();

    else handled = false;
    return handled;
}

function toggleVoice() {
    isVoiceActive = !isVoiceActive;
    const indicator = document.getElementById('voice-indicator');
    const trigger = document.getElementById('voice-trigger');

    if (isVoiceActive) {
        try {
            recognition.start();
            indicator.classList.remove('hidden');
            trigger.classList.add('active-btn');
            showFeedback("Voice Assistant Active");
        } catch (e) { isVoiceActive = false; }
    } else {
        recognition.stop();
        indicator.classList.add('hidden');
        trigger.classList.remove('active-btn');
        showFeedback("Voice Assistant Disabled");
    }
}

// 4. Advanced Gesture (MediaPipe Lite)
let hands;
let isGestureActive = false;
let lastGestureTime = 0;
let stream = null;

function initGesture() {
    hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
    });

    hands.onResults(onGestureResults);
    document.getElementById('gesture-trigger').onclick = toggleGesture;
}

async function toggleGesture() {
    isGestureActive = !isGestureActive;
    const preview = document.getElementById('gesture-preview');
    const videoElement = document.getElementById('webcam');
    const trigger = document.getElementById('gesture-trigger');

    if (isGestureActive) {
        preview.classList.remove('hidden');
        trigger.classList.add('active-btn');
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, frameRate: { max: 30 } }
            });
            videoElement.srcObject = stream;

            const pushFrame = async () => {
                if (!isGestureActive) return;
                if (videoElement.readyState >= 2) {
                    await hands.send({ image: videoElement });
                }
                requestAnimationFrame(pushFrame);
            };
            pushFrame();
            showFeedback("Gesture AI Active");
        } catch (err) { isGestureActive = false; }
    } else {
        if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
        videoElement.srcObject = null;
        preview.classList.add('hidden');
        trigger.classList.remove('active-btn');
        showFeedback("Gesture AI Disabled");
    }
}

function onGestureResults(results) {
    if (!isGestureActive || !results.multiHandLandmarks) return;
    const now = Date.now();
    const l = results.multiHandLandmarks[0];
    if (!l) return;

    const indexUp = l[8].y < l[6].y;
    const middleUp = l[12].y < l[10].y;
    const ringUp = l[16].y < l[14].y;
    const pinkyUp = l[20].y < l[18].y;
    const isThumbUp = l[4].y < l[3].y && l[4].y < l[2].y;
    const extended = [indexUp, middleUp, ringUp, pinkyUp].filter(v => v).length;

    // THUMBS UP -> ADD
    if (isThumbUp && extended === 0 && now - lastGestureTime > 2000) {
        const p = getCenteredProduct();
        if (p) { addToCart(p); showFeedback(`👍 Added: ${p.name}`); }
        lastGestureTime = now;
    }
    // PALM -> DOWN
    else if (extended >= 4 && now - lastGestureTime > 1200) {
        window.scrollBy({ top: 500, behavior: 'smooth' });
        showFeedback("🖐️ Scrolling Down");
        lastGestureTime = now;
    }
    // PEACE -> UP
    else if (indexUp && middleUp && !ringUp && !pinkyUp && now - lastGestureTime > 1200) {
        window.scrollBy({ top: -500, behavior: 'smooth' });
        showFeedback("✌️ Scrolling Up");
        lastGestureTime = now;
    }
}

function getCenteredProduct() {
    const cards = document.querySelectorAll('.product-card');
    let centerProduct = null;
    let minDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        if (distance < minDistance) {
            minDistance = distance;
            centerProduct = PRODUCTS[index];
        }
    });
    return centerProduct;
}

// 5. Core Actions
function initKeyboard() {
    window.addEventListener('keydown', (e) => {
        const k = e.key.toLowerCase();
        if (k === 'v') toggleVoice();
        if (k === 'g') toggleGesture();
        if (k === 'c') toggleCart();
        if (e.ctrlKey && k === 'z') undoAction();
    });
}

function addToCartById(id) {
    addToCart(PRODUCTS.find(p => p.id === id));
}

function addToCart(product) {
    if (!product) return;
    cart.push(product);
    lastAction = { type: 'add', item: product };
    updateCartUI();
    showFeedback(`"${product.name}" added`);
}

function undoAction() {
    if (lastAction && lastAction.type === 'add') {
        cart.pop();
        updateCartUI();
        showFeedback("Action Undone");
        lastAction = null;
    }
}

function updateCartUI() {
    document.querySelector('.cart-count').innerText = cart.length;
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
        document.getElementById('cart-total').innerText = '$0';
        return;
    }
    container.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
            <img src="${item.img}">
            <div style="flex:1">
                <div style="font-weight:700">${item.name}</div>
                <div style="color:var(--primary)">$${item.price}</div>
            </div>
            <button onclick="removeFromCart(${idx})" style="background:none; border:none; color:red; cursor:pointer; font-size:1.2rem">&times;</button>
        </div>
    `).join('');
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cart-total').innerText = `$${total}`;
}

window.removeFromCart = (idx) => {
    cart.splice(idx, 1);
    updateCartUI();
};

function toggleCart(show) {
    const d = document.getElementById('cart-drawer');
    if (show === undefined) d.classList.toggle('hidden');
    else if (show) d.classList.remove('hidden');
    else d.classList.add('hidden');
}

function showFeedback(msg) {
    const fb = document.getElementById('feedback-message');
    fb.innerText = msg; fb.classList.add('show');
    setTimeout(() => fb.classList.remove('show'), 3000);
}

function initDashboard() {
    const l = document.getElementById('rules-list');
    l.innerHTML = GOLDEN_RULES.map(r => `<li>${r}</li>`).join('');
    document.getElementById('close-dashboard').onclick = () => document.getElementById('rules-dashboard').classList.add('hidden');
}

function initCartUI() {
    document.getElementById('cart-btn').onclick = () => toggleCart(true);
    document.getElementById('close-cart').onclick = () => toggleCart(false);
}
