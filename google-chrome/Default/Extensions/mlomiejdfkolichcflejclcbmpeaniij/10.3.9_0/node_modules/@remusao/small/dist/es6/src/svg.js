const CONTENT_TYPE = 'image/svg+xml';
const svg = {
    contentType: CONTENT_TYPE,
    aliases: [
        CONTENT_TYPE,
        '.svg',
        'svg',
    ],
    body: 'https://raw.githubusercontent.com/mathiasbynens/small/master/svg.svg',
};

export { CONTENT_TYPE, svg as default };
