module.exports = function ({ body }) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>⭐️🐥⭐️WELCOME DUCK APP⭐️🐥⭐️</h1></title>
        <link rel="shortcut icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToE_EWPXTocetFkjSu0qMbP74W8krkE59H8vookVaUn0ocKVud&s" type="image/x-icon">
        <link rel="stylesheet" href="/index.css">
        <link rel="shortcut icon" href="icon.png" type="image/x-icon">
    </head>
    
    <body>
        ${Header()}
        ${body}
    </body>
</html>`
}