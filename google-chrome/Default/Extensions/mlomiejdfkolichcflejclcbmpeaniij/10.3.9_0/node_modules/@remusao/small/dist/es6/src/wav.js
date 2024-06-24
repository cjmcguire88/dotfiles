const CONTENT_TYPE = 'audio/wav';
const wav = {
    contentType: `${CONTENT_TYPE};base64`,
    aliases: [
        CONTENT_TYPE,
        '.wav',
        'wav',
    ],
    body: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
};

export { CONTENT_TYPE, wav as default };
