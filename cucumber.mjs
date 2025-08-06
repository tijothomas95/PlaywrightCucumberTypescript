export default {
    require: [
        'src/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    paths: ['features/*.feature'],
    format: ['summary','allure-cucumberjs/reporter'],
    formatOptions: {
        resultsDir: "allure-results",
        labels: [
        {
            pattern: [/@epic:(.*)/],
            name: "epic",
        },
        {
            pattern: [/@severity:(.*)/],
            name: "severity",
        },
        ],
        links: {
        issue: {
            pattern: [/@issue:(.*)/],
            urlTemplate: "https://issues.example.com/%s",
            nameTemplate: "ISSUE %s",
        },
        tms: {
            pattern: [/@tms:(.*)/],
            urlTemplate: "https://tms.example.com/%s",
        },
        jira: {
            pattern: [/@jira:(.*)/],
            urlTemplate: (v) => `https://jira.example.com/browse/${v}`,
        },
        }
    },
    publishQuiet: true
};