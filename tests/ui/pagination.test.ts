import { test } from '@playwright/test';
import { BooksPage } from '../../pages/books.page';
import { fillAndPressEnter } from '../../helpers/general/locator.helper';

test('Validate Pagination Functionality', async ({ page }) => {
  const booksPage = new BooksPage(page);

  const firstPageBooks: string[] = [];

  await test.step('Navigate to a Books Page', async () => {
    await page.goto('/books');
    await booksPage.checkLogoVisibility();
  });

  await test.step('Change the Amount of Rows Visible on Single Page', async () => {
    await booksPage.tableRowOptions.selectOption('5');
    firstPageBooks.push(...await booksPage.getAllTitlesFromTable());
  });

  await test.step('Go to Next Page of Pagination', async () => {
    await booksPage.paginationNextButton.click();
  });

  await test.step('Compare List of Books Is Not the Same', async () => {
    booksPage.compareBookTitles(await booksPage.getAllTitlesFromTable(), firstPageBooks, false);
  });

  await test.step('Return to First Page of Pagination', async () => {
    await fillAndPressEnter(booksPage.jumpToPage, '1');
  });

  await test.step('Compare List of Books Is the Same', async () => {
    booksPage.compareBookTitles(await booksPage.getAllTitlesFromTable(), firstPageBooks);
  });
});

// npx playwright test pagination.test.ts --headed --project=chromium