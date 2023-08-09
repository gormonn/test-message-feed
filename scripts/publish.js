const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.join(__dirname, 'dist'), (err) => {
    console.log(err);
});
