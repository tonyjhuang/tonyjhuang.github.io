const SOCIAL_TMPL = `
<div class="social-container {{CLASS}}">
    <span class="social-outer social-start">
        <span class="social-label">{{DOMAIN}}</span>
    </span>
    <span class="social-label slash-divider">/</span>
    <span class="social-outer">
        <span class="social-label">{{HANDLE}}</span>
    </span>
</div>
`

// [class name, domain, handle]
const SOCIAL = [
    ['instagram', 'instagram.com', 'tonyjhuang', 'http://instagram.com/tonyjhuang'],
    ['facebook', 'facebook.com', 'tonyjunhuang', 'http://facebook.com/tonyjunhuang'],
    ['linkedin', 'linkedin.com', 'tonyjhuang', 'http://linkedin.com/in/tonyjhuang'],
    ['github', 'github.com', 'tonyjhuang', 'http://github.com/tonyjhuang'],
]

$(function() {
    init();
});

function init() {
    for (const social of SOCIAL) {
        $('.main-container').append(renderSocial(social));
        initSocial(social);
    }
}

function renderSocial(social) {
    let [clazz, domain, handle] = social;
    return SOCIAL_TMPL.slice()
        .replace('{{CLASS}}', clazz)
        .replace('{{DOMAIN}}', domain)
        .replace('{{HANDLE}}', handle);
}

function initSocial(social) {
    let [clazz, , , link] = social;

    function toggleHoverClass(e) {
        $(e.target).closest('.social-container').toggleClass(`${clazz}-hover`);
    }
    $(`.${clazz} .social-label`).hover(toggleHoverClass, toggleHoverClass);
    $(`.${clazz} .social-label`).click(function() {
        window.open(link);
    });
}