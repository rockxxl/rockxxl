const url = "https://www.actionherojs.com";

describe("www.actionherojs.com#index", () => {
    test("it renders", async () => {
        await browser.get(url);
        const title = await browser.findElement(by.tagName("h2")).getText();
        expect(title).toContain("reusable, scalable, and quick");
    });
});
