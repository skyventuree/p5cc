const VERSION = 1;
let language = "en";

function initLanguage() {
    console.info("[i18n::initLanguage] Initializing language settings...");
    const langCookie = document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
    if (langCookie) {
        language = langCookie;
    } else {
        language = navigator.language.split('-')[0];
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = `lang=${language};expires=${date.toUTCString()};path=/`;
    }
}

async function loadLanguage() {
    try {
        console.info(`[i18n::loadLanguage] Loading language file for ${language}...`);
        const response = await fetch(`./languages/${language}.json`);
        
        if (!response.ok) {
            throw new Error(`[i18n::loadLanguage] Language file for ${language} not found`);
        }
        
        const langData = await response.json();
        
        if (langData.meta.version != VERSION) {
            console.warn(`[i18n::loadLanguage] Language file version mismatch: expected ${VERSION}, got ${langData.meta.version}`);
        }

        // フォントファミリーを設定
        if (langData.meta.font) {
            document.documentElement.style.setProperty('--font-family', langData.meta.font);
            document.body.style.fontFamily = langData.meta.font;
        }

        // data-i18n属性を持つ要素の翻訳
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = key.split('.').reduce((obj, i) => obj[i], langData);
            
            if (translation) {
                const hasHtmlTags = /<[a-z][\s\S]*>/i.test(translation);
                element.innerHTML = hasHtmlTags ? translation : translation;
            }
        });

        // 特別な処理が必要な要素の翻訳マッピング
        const translations = {
            // セレクトボックスのオプション
            select: {
                "#text-align": {
                    "left": langData.alignments.options.left,
                    "center": langData.alignments.options.center,
                    "right": langData.alignments.options.right
                }
            },
            // チェックボックスのラベル
            checkbox: {
                "showWatermark": langData.editor.show_watermark,
                "show-logo": langData.advanced.options.show_logo
            },
            // ボタン
            button: {
                "#refresh > span": langData.preview.refresh,
                ".action-btn:last-child": langData.editor.download
            },
            // ラベル
            label: {
                "text-align": langData.alignments.options.text_align,
                "text-top": langData.alignments.options.shift_from_top,
                "font-family": langData.font.options.family,
                "font-size": langData.font.options.size,
                "stroke-width": langData.decorations.options.width,
                "logo-size": langData.advanced.options.logo_size,
                "offset": langData.advanced.options.logo_offset,
                "delay-rate": langData.advanced.options.delay_desc
            }
        };

        // セレクトボックスの翻訳
        for (const [selectId, options] of Object.entries(translations.select)) {
            const select = document.querySelector(selectId);
            if (select) {
                for (const [value, text] of Object.entries(options)) {
                    const option = select.querySelector(`option[value='${value}']`);
                    if (option) option.textContent = text;
                }
            }
        }

        // チェックボックスの翻訳
        for (const [id, text] of Object.entries(translations.checkbox)) {
            const label = document.querySelector(`#${id}`).parentElement;
            if (label) {
                const span = label.querySelector('.checkmark');
                if (span?.nextSibling) span.nextSibling.textContent = text;
            }
        }

        // ボタンの翻訳
        for (const [selector, text] of Object.entries(translations.button)) {
            const button = document.querySelector(selector);
            if (button) button.textContent = text;
        }

        // ラベルの翻訳
        for (const [id, text] of Object.entries(translations.label)) {
            const label = document.querySelector(`label[for='${id}']`);
            if (label) label.textContent = text;
        }

    } catch (error) {
        console.error("[i18n::loadLanguage] Failed to load language file:", error);
        if (language !== "en") {
            language = "en";
            loadLanguage();
        }
    }
}

initLanguage();
loadLanguage();

