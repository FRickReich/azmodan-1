"use strict";

const { expect } = require("chai");
const puppeteer = require("puppeteer");
const path = require("path");
const { getFilesInDirectory, readYamlFile } = require("./utils/filesystem");

function azmodan({
    headless = true,
    nodelay = false,
    timeout = 5000,
    caseFolder = "./test/cases"
}) {
    const caseFiles = getFilesInDirectory(path.resolve(caseFolder));

    caseFiles.forEach(caseFile => {
        const caseData = readYamlFile(path.resolve(caseFolder), caseFile);

        describe(caseData.title, () => {
            let browser;
            let page;

            before(async () => {
                browser = await puppeteer.launch({
                    headless: headless
                });

                page = await browser.newPage();
                await page.setViewport({ width: 1280, height: 800 });
            });

            after(async () => {
                await browser.close();
            });

            caseData.steps.forEach(step => {
                let description;
                if (step.description) {
                    description = step.description;
                } else {
                    if (step.type === "visit")
                        description = `should ${step.type} ${step.url}`;
                    if (step.type === "fill")
                        description = `should ${step.type} out ${step.target} with "${step.content}"`;
                    if (step.type === "click")
                        description = `should ${step.type} on ${step.target}`;
                    if (step.type === "press")
                        description = `should ${step.type} ${step.key}`;
                }

                it(description, async () => {
                    if (step.delay && nodelay === false) {
                        await page.waitFor(step.delay);
                    }

                    switch (step.type) {
                        /**
                         * Scenario: Visit a URL:c
                         */
                        case "visit":
                            const visitResult = await page.goto(step.url, {
                                waitUntil: "load",
                                timeout: 0
                            });

                            expect(visitResult._url).to.exist;
                            break;

                        /**
                         * Scenario: Fill an input field with a value:
                         */
                        case "fill":
                            await page.type(step.target, step.content);

                            const fillResult = await page.$eval(
                                step.target,
                                el => el.value
                            );

                            expect(fillResult).to.equal(step.content);
                            break;

                        /**
                         * Scenario: Click on an element:
                         */
                        case "click":
                            await page.click(step.target);
                            break;

                        /**
                         * Scenario: Press a button:
                         */
                        case "press":
                            await page.keyboard.press(step.key);
                            break;

                        /**
                         * Scenario: Compare 2 element values:
                         */
                        // case "compare":
                        //     const compareResult = "Hello World!";

                        //     expect(compareResult).to.equal("Hello World!");
                        //     break;
                    }

                    await page.waitFor(1000);
                }).timeout(timeout);
            });
        });
    });
}

module.exports = azmodan;
