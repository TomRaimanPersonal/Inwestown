import { test } from '@playwright/test';
import { BooksPage } from '../../pages/books.page';

test('Simple Search for a Book and Validate Results', async ({ page }) => {
  const booksPage = new BooksPage(page);

  const searchPhrase = 'Git Pocket Guide';

  await test.step('Navigate to a Books Page', async () => {
    await page.goto('/books');
    await booksPage.checkLogoVisibility();
  });

  await test.step('Enter a Book Title', async () => {
    await booksPage.searchField.fill(searchPhrase);
  });

  await test.step('Assert Searched Books', async () => {
    await booksPage.validateCorrectSearchedPhraseInTitles(searchPhrase);
  });
});

test('General Search for a Books and Validate Results', async ({ page }) => {
  const booksPage = new BooksPage(page);

  const searchPhrase = 'JavaScript';

  await test.step('Navigate to a Books Page', async () => {
    await page.goto('/books');
    await booksPage.checkLogoVisibility();
  });

  await test.step('Enter a Book Title', async () => {
    await booksPage.searchField.fill(searchPhrase);
  });

  await test.step('Assert Searched Books', async () => {
    await booksPage.validateCorrectSearchedPhraseInTitles(searchPhrase);
  });
});


// npx playwright test search.test.ts --headed --project=chromium