const path = require('path');
const merge = require('lodash.merge');
const stories = require('./stories');

const story_configs = {
    specific_story: {
        specific_property: "specific_value"
    }
};

const config = stories.map(story => {
    const common = {
        mode: 'development',
        entry: path.join(story.path, 'src', 'index.js'),
        resolve: {
            modules: [path.join(story.path, 'node_modules'), 'node_modules'],
            alias: {
                shared: path.resolve(__dirname, 'shared')
            }
        },
        output: {
            filename: 'bundle.js',
            path: story.path,
            publicPath: `/stories/${story.name}/`
        }
    };

    return merge({}, common, story_configs[story.name], story.config);
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
