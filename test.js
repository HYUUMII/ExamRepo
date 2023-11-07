import { Selector } from "testcafe";

fixture`Tic Tac Toe Game`
    .page("http://localhost:1234/");

test("X wins a game of Tic Tac Toe", async t => {
    // Clicks on the boxes to make X win the game
    await t
        .click(Selector("#box-0"))
        .click(Selector("#box-3"))
        .click(Selector("#box-4"))
        .click(Selector("#box-8"))
        .click(Selector("#box-1"))
        .click(Selector("#box-5"))
        .click(Selector("#box-2"));

    // Asserts that the game ends
    const winMessage = Selector(".winner").innerText;
    await t.expect(winMessage).contains("Winner is X");

    // Clicks the "Play again?" button
    await t.click(Selector(".button"));

    // Asserts that the game board resets
    const boxContent = await Selector(".box").innerText;
    await t.expect(boxContent).eql("");
});

