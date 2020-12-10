const DESKTOP_SOCIAL_TMPL = `
<div class="social-container {{CLASS}}">
    <span class="social-outer social-start">
        <img class="social-img" src={{IMAGE}}></img><span class="social-label social-domain">{{DOMAIN}}</span>
    </span>
    <span class="social-label slash-divider">/</span>
    <span class="social-outer">
        <span class="social-label">{{HANDLE}}</span>
    </span>
</div>
`

const MOBILE_SOCIAL_TMPL = `
<div class="social-container {{CLASS}}">
    <span class="social-label">{{DOMAIN}}/{{HANDLE}}</span>
</div>
`

// TODO: decide if we want to remove this.
const USE_IMAGE_ICONS = false;

const INITIAL_LOAD_IN_DELAY_MS = 500;
const LOAD_IN_STEP_DELAY_MS = 125;

// [class name, domain, handle, link]
const SOCIALS = [
    ['instagram', 'instagram.com', 'tonyjhuang', 'http://instagram.com/tonyjhuang'],
    ['facebook', 'facebook.com', 'tonyjunhuang', 'http://facebook.com/tonyjunhuang'],
    ['linkedin', 'linkedin.com', 'in/tonyjhuang', 'http://linkedin.com/in/tonyjhuang'],
    ['github', 'github.com', 'tonyjhuang', 'http://github.com/tonyjhuang'],
]

$(init);

function init() {
    applyOpacityLoadIn($('.hero'), 0);
    renderDesktop(SOCIALS, $('.desktop-container'));
    renderMobile(SOCIALS, $('.mobile-container'));
    initSocialListeners(SOCIALS);

    if (!USE_IMAGE_ICONS) {
        $('.social-img').remove();
    }
}

function renderDesktop(socials, container) {
    for (const social of socials) {
        container.append(renderDesktopSocial(social));
    }
    applyOpacityLoadIn($(container).find('.social-container'));
}

function renderDesktopSocial(social) {
    let [clazz, domain, handle] = social;
    return DESKTOP_SOCIAL_TMPL.slice()
        .replace('{{CLASS}}', clazz)
        .replace('{{DOMAIN}}', domain)
        .replace('{{HANDLE}}', handle)
        .replace('{{IMAGE}}', `assets/${clazz}.png`);
}

function renderMobile(socials, container) {
    for (const social of socials) {
        container.append(renderMobileSocial(social));
    }
    applyOpacityLoadIn($(container).find('.social-container'));
}

function renderMobileSocial(social) {
    let [clazz, domain, handle] = social;
    return MOBILE_SOCIAL_TMPL.slice()
        .replace('{{CLASS}}', clazz)
        .replace('{{DOMAIN}}', domain)
        .replace('{{HANDLE}}', handle);

}

function initSocialListeners(socials) {
    for (const [clazz, , , link] of socials) {
        function toggleHoverClass(e) {
            $(e.target).closest('.social-container').toggleClass([
                `${clazz}-hover`,
                'grow-hover',
            ]);
        }
        $(`.${clazz} .social-label`).hover(toggleHoverClass, toggleHoverClass);
        $(`.${clazz} .social-label`).click(function() {
            window.open(link);
        });
    }
}

function applyOpacityLoadIn(elements, initialDelay) {
    let delay = initialDelay === undefined ? INITIAL_LOAD_IN_DELAY_MS : initialDelay;
    for (const e of elements) {
        setTimeout(() => $(e).addClass('opacity-load-in'), delay);
        delay += LOAD_IN_STEP_DELAY_MS;
    }
}