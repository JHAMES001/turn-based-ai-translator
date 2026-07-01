// ================================================================
// MICHI — AI Voice Translator
// API key lives server-side in netlify/functions/translate.js
// ================================================================

// ----- UI Text Constants -----
const PLACEHOLDER_TEXT = 'Press mic to speak';
const LISTENING_TEXT = 'Listening...';
const TRANSLATING_TEXT = 'Translating...';

// ----- Language code to full name map -----
const LANGUAGE_NAMES = {
    // Original
    'en':  'English',
    'es':  'Spanish',
    'fr':  'French',
    'de':  'German',
    'ja':  'Japanese',
    'zh':  'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'ko':  'Korean',
    'pt':  'Portuguese',
    'pt-BR': 'Portuguese (Brazilian)',
    'it':  'Italian',
    'ru':  'Russian',
    'ar':  'Arabic',
    'hi':  'Hindi',
    'fil': 'Filipino (Tagalog)',
    // Expanded
    'bn':  'Bengali',
    'ur':  'Urdu',
    'id':  'Indonesian',
    'ms':  'Malay',
    'tr':  'Turkish',
    'vi':  'Vietnamese',
    'th':  'Thai',
    'pl':  'Polish',
    'nl':  'Dutch',
    'sv':  'Swedish',
    'no':  'Norwegian',
    'da':  'Danish',
    'fi':  'Finnish',
    'el':  'Greek',
    'he':  'Hebrew',
    'fa':  'Persian (Farsi)',
    'uk':  'Ukrainian',
    'ro':  'Romanian',
    'hu':  'Hungarian',
    'cs':  'Czech',
    'sk':  'Slovak',
    'hr':  'Croatian',
    'bg':  'Bulgarian',
    'sr':  'Serbian',
    'lt':  'Lithuanian',
    'lv':  'Latvian',
    'et':  'Estonian',
    'sw':  'Swahili',
    'am':  'Amharic',
    'yo':  'Yoruba',
    'ig':  'Igbo',
    'ha':  'Hausa',
    'zu':  'Zulu',
    'af':  'Afrikaans',
    'km':  'Khmer',
    'lo':  'Lao',
    'my':  'Burmese',
    'ne':  'Nepali',
    'si':  'Sinhala',
    'ta':  'Tamil',
    'te':  'Telugu',
    'ml':  'Malayalam',
    'kn':  'Kannada',
    'gu':  'Gujarati',
    'pa':  'Punjabi',
    'mr':  'Marathi',
    'mn':  'Mongolian',
    'ka':  'Georgian',
    'az':  'Azerbaijani',
    'kk':  'Kazakh',
    'uz':  'Uzbek',
    'hy':  'Armenian',
    'mk':  'Macedonian',
    'sq':  'Albanian',
    'bs':  'Bosnian',
    'sl':  'Slovenian',
    'ca':  'Catalan',
    'gl':  'Galician',
    'eu':  'Basque',
    'is':  'Icelandic',
    'mt':  'Maltese',
    'cy':  'Welsh',
    'ga':  'Irish',
    'lb':  'Luxembourgish',
};

function getLangName(code) {
    return LANGUAGE_NAMES[code] || code;
}

// ----- LANGUAGE FLAGS - FlagCDN (online, no local files needed) -----
const FLAG_CDN = 'https://flagcdn.com/w40';
const LANGUAGE_FLAGS = {
    'en':    `${FLAG_CDN}/us.png`,
    'es':    `${FLAG_CDN}/es.png`,
    'fr':    `${FLAG_CDN}/fr.png`,
    'de':    `${FLAG_CDN}/de.png`,
    'ja':    `${FLAG_CDN}/jp.png`,
    'zh':    `${FLAG_CDN}/cn.png`,
    'zh-TW': `${FLAG_CDN}/tw.png`,
    'ko':    `${FLAG_CDN}/kr.png`,
    'pt':    `${FLAG_CDN}/pt.png`,
    'pt-BR': `${FLAG_CDN}/br.png`,
    'it':    `${FLAG_CDN}/it.png`,
    'ru':    `${FLAG_CDN}/ru.png`,
    'ar':    `${FLAG_CDN}/sa.png`,
    'hi':    `${FLAG_CDN}/in.png`,
    'fil':   `${FLAG_CDN}/ph.png`,
    'bn':    `${FLAG_CDN}/bd.png`,
    'ur':    `${FLAG_CDN}/pk.png`,
    'id':    `${FLAG_CDN}/id.png`,
    'ms':    `${FLAG_CDN}/my.png`,
    'tr':    `${FLAG_CDN}/tr.png`,
    'vi':    `${FLAG_CDN}/vn.png`,
    'th':    `${FLAG_CDN}/th.png`,
    'pl':    `${FLAG_CDN}/pl.png`,
    'nl':    `${FLAG_CDN}/nl.png`,
    'sv':    `${FLAG_CDN}/se.png`,
    'no':    `${FLAG_CDN}/no.png`,
    'da':    `${FLAG_CDN}/dk.png`,
    'fi':    `${FLAG_CDN}/fi.png`,
    'el':    `${FLAG_CDN}/gr.png`,
    'he':    `${FLAG_CDN}/il.png`,
    'fa':    `${FLAG_CDN}/ir.png`,
    'uk':    `${FLAG_CDN}/ua.png`,
    'ro':    `${FLAG_CDN}/ro.png`,
    'hu':    `${FLAG_CDN}/hu.png`,
    'cs':    `${FLAG_CDN}/cz.png`,
    'sk':    `${FLAG_CDN}/sk.png`,
    'hr':    `${FLAG_CDN}/hr.png`,
    'bg':    `${FLAG_CDN}/bg.png`,
    'sr':    `${FLAG_CDN}/rs.png`,
    'lt':    `${FLAG_CDN}/lt.png`,
    'lv':    `${FLAG_CDN}/lv.png`,
    'et':    `${FLAG_CDN}/ee.png`,
    'sw':    `${FLAG_CDN}/ke.png`,
    'am':    `${FLAG_CDN}/et.png`,
    'yo':    `${FLAG_CDN}/ng.png`,
    'ig':    `${FLAG_CDN}/ng.png`,
    'ha':    `${FLAG_CDN}/ng.png`,
    'zu':    `${FLAG_CDN}/za.png`,
    'af':    `${FLAG_CDN}/za.png`,
    'km':    `${FLAG_CDN}/kh.png`,
    'lo':    `${FLAG_CDN}/la.png`,
    'my':    `${FLAG_CDN}/mm.png`,
    'ne':    `${FLAG_CDN}/np.png`,
    'si':    `${FLAG_CDN}/lk.png`,
    'ta':    `${FLAG_CDN}/in.png`,
    'te':    `${FLAG_CDN}/in.png`,
    'ml':    `${FLAG_CDN}/in.png`,
    'kn':    `${FLAG_CDN}/in.png`,
    'gu':    `${FLAG_CDN}/in.png`,
    'pa':    `${FLAG_CDN}/in.png`,
    'mr':    `${FLAG_CDN}/in.png`,
    'mn':    `${FLAG_CDN}/mn.png`,
    'ka':    `${FLAG_CDN}/ge.png`,
    'az':    `${FLAG_CDN}/az.png`,
    'kk':    `${FLAG_CDN}/kz.png`,
    'uz':    `${FLAG_CDN}/uz.png`,
    'hy':    `${FLAG_CDN}/am.png`,
    'mk':    `${FLAG_CDN}/mk.png`,
    'sq':    `${FLAG_CDN}/al.png`,
    'bs':    `${FLAG_CDN}/ba.png`,
    'sl':    `${FLAG_CDN}/si.png`,
    'ca':    `${FLAG_CDN}/es.png`,
    'gl':    `${FLAG_CDN}/es.png`,
    'eu':    `${FLAG_CDN}/es.png`,
    'is':    `${FLAG_CDN}/is.png`,
    'mt':    `${FLAG_CDN}/mt.png`,
    'cy':    `${FLAG_CDN}/gb.png`,
    'ga':    `${FLAG_CDN}/ie.png`,
    'lb':    `${FLAG_CDN}/lu.png`,
};

function updateFlag(speaker, langCode) {
    const flagPath = LANGUAGE_FLAGS[langCode] || 'images/flags/us.png';
    const flagId = speaker === 1 ? 'flag1' : 'flag2';
    const flagImg = document.getElementById(flagId);
    if (flagImg) {
        flagImg.src = flagPath;
        const langName = document.getElementById(speaker === 1 ? 'lang1' : 'lang2');
        const selectedOption = langName.options[langName.selectedIndex];
        flagImg.alt = selectedOption ? selectedOption.text : '';
    }
}

// ================================================================
// DOM REFERENCES
// ================================================================
const speakBtn1        = document.getElementById('speakBtn1');
const speakBtn2        = document.getElementById('speakBtn2');
const status1          = document.getElementById('status1');
const status2          = document.getElementById('status2');
const translationText1 = document.getElementById('translationText1');
const translationText2 = document.getElementById('translationText2');
const lang1            = document.getElementById('lang1');
const lang2            = document.getElementById('lang2');

// ================================================================
// STATE MACHINE
// ================================================================
let appState = 'idle';

function setState(newState) {
    appState = newState;
    console.log(`[State] → ${newState}`);

    switch (newState) {
        case 'idle':
            setStatus(1, 'ready');
            setStatus(2, 'ready');
            break;
        case 'speaker1_speaking':
            setStatus(1, 'listening');
            setStatus(2, 'disabled');
            break;
        case 'speaker1_translating':
            setStatus(1, 'translating');
            setStatus(2, 'disabled');
            break;
        case 'speaker2_speaking':
            setStatus(1, 'disabled');
            setStatus(2, 'listening');
            break;
        case 'speaker2_translating':
            setStatus(1, 'disabled');
            setStatus(2, 'translating');
            break;
    }
}

// ================================================================
// CONVERSATION HISTORY
// ================================================================
const conversationHistory = [];
const MAX_HISTORY = 5;

function addToHistory(speaker, original, translation) {
    conversationHistory.push({ speaker, original, translation });
    if (conversationHistory.length > MAX_HISTORY) {
        conversationHistory.shift();
    }
}

function getHistoryContext() {
    if (conversationHistory.length === 0) return '';
    const last2 = conversationHistory.slice(-2);
    return last2.map(entry =>
        `Speaker ${entry.speaker}: "${entry.original}" → "${entry.translation}"`
    ).join('\n');
}

// ================================================================
// UI HELPERS
// ================================================================
function setStatus(speaker, state) {
    const statusEl = speaker === 1 ? status1 : status2;
    const btn      = speaker === 1 ? speakBtn1 : speakBtn2;

    statusEl.className = 'status-indicator';
    btn.className = 'mic-btn';

    switch (state) {
        case 'ready':
            statusEl.classList.add('status-ready');
            btn.disabled = false;
            setMicIcon(speaker, false);
            break;
        case 'listening':
            statusEl.classList.add('status-listening');
            btn.classList.add('listening');
            btn.disabled = false;
            setMicIcon(speaker, 'listening');
            break;
        case 'translating':
            statusEl.classList.add('status-translating');
            btn.classList.add('translating');
            btn.disabled = true;
            setMicIcon(speaker, false);
            break;
        case 'disabled':
            statusEl.classList.add('status-disabled');
            btn.disabled = true;
            setMicIcon(speaker, true);
            break;
    }
}

function setDisplayText(speaker, text, style = 'normal') {
    const textEl = speaker === 1 ? translationText1 : translationText2;

    textEl.style.color = '';
    textEl.className = 'translation-text';

    switch (style) {
        case 'idle':        textEl.classList.add('idle');        break;
        case 'listening':   textEl.classList.add('listening');   break;
        case 'translating': textEl.classList.add('translating'); break;
        case 'interim':     textEl.style.color = '#ffcc44';      break;
        case 'final-own':   textEl.style.color = '#88ff88';      break;
        case 'error':       textEl.style.color = '#ff4444';      break;
        case 'translated':  textEl.style.color = '#333333';      break;
        case 'empty-text':  textEl.classList.add('empty-text');  break;
    }

    textEl.textContent = text;

    if (style === 'translated' || style === 'final-own') {
        setTranslationCardState(speaker, false);
    }
}

function setTranslationCardState(speaker, isEmpty) {
    const card = speaker === 1
        ? document.getElementById('translation1')
        : document.getElementById('translation2');
    const textEl = speaker === 1 ? translationText1 : translationText2;

    if (isEmpty) {
        card.classList.add('empty');
        textEl.classList.add('empty-text');
        textEl.textContent = '...';
        textEl.style.color = '#999999';
        textEl.style.fontStyle = 'italic';
    } else {
        card.classList.remove('empty');
        textEl.classList.remove('empty-text');
        textEl.style.fontStyle = '';
    }
}

// MICROPHONE ICON SWAPPER
const MIC_ACTIVE   = 'images/mic-active.png';
const MIC_LISTENING = 'images/mic-listening.png';
const MIC_DISABLED  = 'images/mic-disabled.png';

function setMicIcon(speaker, state) {
    const iconId = speaker === 1 ? 'micIcon1' : 'micIcon2';
    const icon = document.getElementById(iconId);
    if (!icon) return;

    const btn = speaker === 1 ? speakBtn1 : speakBtn2;

    if (btn.disabled) {
        icon.src = MIC_DISABLED;
        return;
    }

    switch (state) {
        case 'listening':
            icon.src = MIC_LISTENING;
            break;
        default:
            icon.src = MIC_ACTIVE;
    }
}

// ================================================================
// SPEECH RECOGNITION
// ================================================================
let recognition1 = null;
let recognition2 = null;
let finalTranscript1 = '';
let finalTranscript2 = '';
let isListening1 = false;
let isListening2 = false;

function startListening(speaker) {
    if (appState !== 'idle') {
        console.warn(`[startListening] Blocked — state is "${appState}"`);
        return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition not supported. Please use Chrome on Android or Desktop.');
        return;
    }

    console.log(`[SR] Starting for Speaker ${speaker}`);

    const otherSpeaker = speaker === 1 ? 2 : 1;
    setTranslationCardState(otherSpeaker, true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = speaker === 1 ? lang1.value : lang2.value;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    if (speaker === 1) {
        recognition1 = recognition;
        finalTranscript1 = '';
        isListening1 = true;
    } else {
        recognition2 = recognition;
        finalTranscript2 = '';
        isListening2 = true;
    }

    setState(speaker === 1 ? 'speaker1_speaking' : 'speaker2_speaking');
    setDisplayText(speaker, LISTENING_TEXT, 'listening');

    recognition.onresult = (event) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const t = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalText += t;
            } else {
                interimText += t;
            }
        }

        if (finalText) {
            if (speaker === 1) finalTranscript1 = finalText;
            else finalTranscript2 = finalText;
            setDisplayText(speaker, finalText, 'final-own');
        } else if (interimText) {
            setDisplayText(speaker, interimText, 'interim');
        }
    };

    recognition.onerror = (event) => {
        console.error(`[SR] Error for Speaker ${speaker}:`, event.error);

        if (speaker === 1) isListening1 = false;
        else isListening2 = false;

        let msg = 'Error. Try again.';
        if (event.error === 'not-allowed')    msg = 'Mic permission denied. Check browser settings.';
        else if (event.error === 'no-speech') msg = 'No speech detected.';
        else if (event.error === 'network')   msg = 'Network error. Check connection.';

        setDisplayText(speaker, msg, 'error');

        setTimeout(() => {
            setDisplayText(speaker, PLACEHOLDER_TEXT, 'idle');
            const otherSpeaker = speaker === 1 ? 2 : 1;
            setTranslationCardState(otherSpeaker, false);
            setDisplayText(otherSpeaker, PLACEHOLDER_TEXT, 'idle');
            setState('idle');
        }, 2500);
    };

    recognition.onend = () => {
        console.log(`[SR] Ended for Speaker ${speaker}`);

        if (speaker === 1) isListening1 = false;
        else isListening2 = false;

        const finalText = speaker === 1 ? finalTranscript1 : finalTranscript2;

        if (finalText && finalText.trim().length > 0) {
            setState(speaker === 1 ? 'speaker1_translating' : 'speaker2_translating');
            setDisplayText(speaker, finalText, 'final-own');

            const sourceLangCode = speaker === 1 ? lang1.value : lang2.value;
            const targetLangCode = speaker === 1 ? lang2.value : lang1.value;
            translateText(finalText.trim(), sourceLangCode, targetLangCode, speaker);
        } else {
            setDisplayText(speaker, 'No speech detected', 'error');
            setTimeout(() => {
                setDisplayText(speaker, PLACEHOLDER_TEXT, 'idle');
                const otherSpeaker = speaker === 1 ? 2 : 1;
                setTranslationCardState(otherSpeaker, false);
                setDisplayText(otherSpeaker, PLACEHOLDER_TEXT, 'idle');
                setState('idle');
            }, 1500);
        }
    };

    try {
        recognition.start();
    } catch (err) {
        console.error('[SR] Failed to start:', err);
        if (speaker === 1) isListening1 = false;
        else isListening2 = false;
        setState('idle');
    }
}

function stopListening(speaker) {
    const listening = speaker === 1 ? isListening1 : isListening2;
    if (!listening) {
        console.log(`[SR] stopListening(${speaker}) skipped — not active`);
        return;
    }

    const recognition = speaker === 1 ? recognition1 : recognition2;
    if (recognition) {
        try {
            recognition.stop();
            console.log(`[SR] Stopped for Speaker ${speaker}`);
        } catch (err) {
            console.error('[SR] Error stopping:', err);
        }
    }
}

// ================================================================
// TRANSLATION — GROQ API
// ================================================================
async function translateText(text, sourceLangCode, targetLangCode, speaker) {
    const targetSpeaker = speaker === 1 ? 2 : 1;

    const sourceLangName = getLangName(sourceLangCode);
    const targetLangName = getLangName(targetLangCode);

    console.log(`[Translate] From ${sourceLangName} to ${targetLangName}: "${text}"`);

    setDisplayText(targetSpeaker, TRANSLATING_TEXT, 'translating');

    const historyContext = getHistoryContext();

    try {
        const response = await fetch('/.netlify/functions/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text,
                sourceLangName,
                targetLangName,
                historyContext
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.error || `Server error: ${response.status}`);
        }

        const translation = data.translation;

        if (!translation) {
            throw new Error('Empty translation received');
        }

        console.log(`[Translate] Result: "${translation}"`);

        addToHistory(speaker, text, translation);
        displayTranslation(translation, targetSpeaker);
        setDisplayText(speaker, PLACEHOLDER_TEXT, 'idle');
        setState('idle');

    } catch (err) {
        console.error('[Translate] Failed:', err);
        setDisplayText(targetSpeaker, 'Translation failed. Tap to retry.', 'error');
        setDisplayText(speaker, PLACEHOLDER_TEXT, 'idle');
        setState('idle');
    }
}
function displayTranslation(translation, targetSpeaker) {
    setDisplayText(targetSpeaker, translation, 'translated');
    setTranslationCardState(targetSpeaker, false);
    const speaker = targetSpeaker === 1 ? 2 : 1;
    setDisplayText(speaker, PLACEHOLDER_TEXT, 'idle');
}

// ================================================================
// BUTTON EVENT SETUP
// ================================================================
function setupButton(btn, speaker) {
    const label = `Speaker ${speaker}`;

    btn.addEventListener('mousedown', () => {
        if (appState !== 'idle') return;
        console.log(`[Btn] ${label} pressed (mouse)`);
        startListening(speaker);
    });

    btn.addEventListener('mouseup', () => {
        const activeState = speaker === 1 ? 'speaker1_speaking' : 'speaker2_speaking';
        if (appState !== activeState) return;
        console.log(`[Btn] ${label} released (mouse)`);
        stopListening(speaker);
    });

    btn.addEventListener('mouseleave', () => {
        const activeState = speaker === 1 ? 'speaker1_speaking' : 'speaker2_speaking';
        if (appState !== activeState) return;
        stopListening(speaker);
    });

    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (appState !== 'idle') return;
        console.log(`[Btn] ${label} pressed (touch)`);
        startListening(speaker);
    }, { passive: false });

    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        const activeState = speaker === 1 ? 'speaker1_speaking' : 'speaker2_speaking';
        if (appState !== activeState) return;
        console.log(`[Btn] ${label} released (touch)`);
        stopListening(speaker);
    }, { passive: false });

    btn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        const activeState = speaker === 1 ? 'speaker1_speaking' : 'speaker2_speaking';
        if (appState !== activeState) return;
        stopListening(speaker);
    }, { passive: false });
}

setupButton(speakBtn1, 1);
setupButton(speakBtn2, 2);

// ================================================================
// KEYBOARD SHORTCUTS — Q = Speaker 1, P = Speaker 2
// ================================================================
let keyPressed_Q = false;
let keyPressed_P = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'q' || e.key === 'Q') {
        if (keyPressed_Q || appState !== 'idle') return;
        keyPressed_Q = true;
        e.preventDefault();
        console.log('[Keys] Q down → Speaker 1');
        startListening(1);
    }
    if (e.key === 'p' || e.key === 'P') {
        if (keyPressed_P || appState !== 'idle') return;
        keyPressed_P = true;
        e.preventDefault();
        console.log('[Keys] P down → Speaker 2');
        startListening(2);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'q' || e.key === 'Q') {
        keyPressed_Q = false;
        e.preventDefault();
        if (appState === 'speaker1_speaking') stopListening(1);
    }
    if (e.key === 'p' || e.key === 'P') {
        keyPressed_P = false;
        e.preventDefault();
        if (appState === 'speaker2_speaking') stopListening(2);
    }
});

// ================================================================
// LANGUAGE CHANGE
// ================================================================
lang1.addEventListener('change', () => {
    console.log(`[Lang] Speaker 1 → ${lang1.value} (${getLangName(lang1.value)})`);
    updateFlag(1, lang1.value);
    conversationHistory.length = 0;
    if (appState === 'idle') setDisplayText(1, PLACEHOLDER_TEXT, 'idle');
});

lang2.addEventListener('change', () => {
    console.log(`[Lang] Speaker 2 → ${lang2.value} (${getLangName(lang2.value)})`);
    updateFlag(2, lang2.value);
    conversationHistory.length = 0;
    if (appState === 'idle') setDisplayText(2, PLACEHOLDER_TEXT, 'idle');
});

// ================================================================
// INIT
// ================================================================
setState('idle');
setDisplayText(1, PLACEHOLDER_TEXT, 'idle');
setDisplayText(2, PLACEHOLDER_TEXT, 'idle');
updateFlag(1, lang1.value);
updateFlag(2, lang2.value);

console.log('[Init] MICHI ready');
console.log('[Init] Translation requests will be routed through Netlify Function');

// ================================================================
// CUSTOM DROPDOWN
// ================================================================
function initDropdown(dropdownId, buttonId, menuId, langSelectId) {
    const dropdown = document.getElementById(dropdownId);
    const button   = document.getElementById(buttonId);
    const menu     = document.getElementById(menuId);
    const langSelect = document.getElementById(langSelectId);

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        button.querySelector('.arrow').classList.toggle('open', isOpen);
    });

    menu.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        const value = li.dataset.value;
        const flag  = li.dataset.flag;
        const text  = li.textContent.trim();

        const flagImg  = button.querySelector('.flag-image');
        const textSpan = button.querySelector('.selected-text');
        flagImg.src  = flag;
        flagImg.alt  = text;
        textSpan.textContent = text;

        langSelect.value = value;

        menu.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        li.classList.add('active');

        menu.classList.remove('open');
        button.querySelector('.arrow').classList.remove('open');

        langSelect.dispatchEvent(new Event('change'));

        if (typeof updateFlag === 'function') {
            const speaker = langSelectId === 'lang1' ? 1 : 2;
            updateFlag(speaker, value);
        }
    });

    document.addEventListener('click', () => {
        menu.classList.remove('open');
        button.querySelector('.arrow').classList.remove('open');
    });
}

initDropdown('dropdown1', 'dropdownBtn1', 'dropdownMenu1', 'lang1');
initDropdown('dropdown2', 'dropdownBtn2', 'dropdownMenu2', 'lang2');