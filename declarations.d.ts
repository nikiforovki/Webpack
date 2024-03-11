




declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.svg' {
    const content: any;
    export default content;
}


declare function handleAdd(): void


declare module 'node-polyfill-webpack-plugin' {
    import { Plugin } from 'webpack';
    export default class NodePolyfillPlugin extends Plugin {}
}


