const CONTENT_TYPE = 'image/png';
const png = {
    contentType: `${CONTENT_TYPE};base64`,
    aliases: [
        CONTENT_TYPE,
        '.png',
        'png',
    ],
    body: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
};

export { CONTENT_TYPE, png as default };
