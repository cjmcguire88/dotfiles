const CONTENT_TYPE = 'text/html';
const html = {
    contentType: CONTENT_TYPE,
    aliases: [
        CONTENT_TYPE,
        '.html',
        'html',
        '.htm',
        'htm',
        'noopframe',
        'noop.html',
    ],
    body: '<!DOCTYPE html>',
};

export { CONTENT_TYPE, html as default };
