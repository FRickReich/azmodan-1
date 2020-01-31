const { expect } = require("chai");

const azmodan = require("./../src/app");

describe("Tester", () => {
    it("should return hello world", () => {
        const result = "Hello World!";
        expect(result).to.equal("Hello World!");
    });
});

azmodan({
    headless: true,
    nodelay: false,
    timeout: 10000,
    caseFolder: "./test/cases"
});
