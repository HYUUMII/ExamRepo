import { Selector } from "testcafe";

fixture`Tic Tac Toe Game`
    .page("http://localhost:1234/");


// First Test where O wins the game

test("O wins a game of Tic Tac Toe", async t => {
    await t
    .click(Selector("#box-1"))
    .click(Selector("#box-2"))
    .click(Selector("#box-5"))
    .click(Selector("#box-4"))
    .click(Selector("#box-7"))
    .click(Selector("#box-3"))
    .click(Selector("#box-0"))
    .click(Selector("#box-6"));
  
  // Asserts that the game ends
  const winMessage = Selector(".winner").innerText;
  await t.expect(winMessage).contains("Winner is O");
  
  // Clicks the "Play again?" button
  await t.click(Selector(".button"));
  
  // Asserts that the game board resets
  const boxContent = await Selector(".box").innerText;
  await t.expect(boxContent).eql("");
  });


// Second Test where no one wins, It's a tie

  test("No one wins, It's a tie", async t => {
    await t
    .click(Selector("#box-0"))
    .click(Selector("#box-2"))
    .click(Selector("#box-1"))
    .click(Selector("#box-3"))
    .click(Selector("#box-5"))
    .click(Selector("#box-4"))
    .click(Selector("#box-6"))
    .click(Selector("#box-7"))
    .click(Selector("#box-8"));
  
  // Asserts that the game ends
  const winMessage = Selector(".winner").innerText;
  await t.expect(winMessage).contains("It's a tie!");
  
  // Clicks the "Play again?" button
  await t.click(Selector(".button"));
  
  // Asserts that the game board resets
  const boxContent = await Selector(".box").innerText;
  await t.expect(boxContent).eql("");
  });
