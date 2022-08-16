// import liveServer from '@compodoc/live-server';
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';


// Turn on LiveServer on http://localhost:7000
// liveServer.start({
//     port: 7000,
//     host: 'localhost',
//     root: '',
//     open: true,
//     ignore: 'node_modules',
//     wait: 0,
// });

// Generate CSS/JS Builds
esbuild
    .build({
        logLevel: 'debug',
        metafile: true,
        entryPoints: ['app/javascript/application.js','app/assets/stylesheets/application.css'],
        outdir: 'dist',
        bundle: true,
        watch: true,
        loader: {
            ".png": "file",
            ".jpg": "file",
            ".jpeg": "file",
            ".svg": "file",
            ".gif": "file",
            ".ttf": "file",
            ".eot": "file",
            ".html": "file",
            ".woff2": "file",
            ".woff": "file",
          },
        plugins: [
            sassPlugin({
                async transform(source) {
                    const { css } = await postcss([autoprefixer]).process(
                        source, {from: undefined}
                    );
                    return css;
                },
            }),
        ],
    })
    .then(() => console.log('⚡ Styles & Scripts Compiled! ⚡ '))
    .catch(() => process.exit(1));