export default {
    require: [
        'src/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
    paths: ['features/*.feature'],
    publishQuiet: true
};