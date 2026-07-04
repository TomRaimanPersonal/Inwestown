import { test } from '@playwright/test';
import { getAllBooks, verifyAllBooksSchema } from '../../api/bookStore.api';

test('Verify Book List API Response Status and Schema', async ({ request }) => {
  await test.step('Get All Books from Store and Verify Schema', async () => {
    const books = await getAllBooks(request);

    verifyAllBooksSchema(books);
  });
});

// npx playwright test bookList.api.test.ts --headed --project=chromium