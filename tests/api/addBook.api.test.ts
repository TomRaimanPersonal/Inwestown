import { test } from '@playwright/test';
import { createBasicAuthorization } from '../../helpers/api/authorization.helper';
import { addBookToProfile, booksAddedPayload, deleteBookFromProfile, isbnBookAddedToProfile, userId, verifyBookAddedSchema } from '../../api/bookStore.api';

test('Add a Book to User’s Collection via API and Verify', async ({ request }) => {
  await test.step('Add Book from Store to Profile', async () => {
    const response = await addBookToProfile(request, createBasicAuthorization(), {
      userId: userId,
      collectionOfIsbns: booksAddedPayload
    });

    verifyBookAddedSchema(response);
  });
});

test.afterAll('Cleanup of After Test', async ({request}) => {
  await deleteBookFromProfile(request, createBasicAuthorization(), {
    isbn: isbnBookAddedToProfile,
    userId: userId
  });
});

// npx playwright test addBook.api.test.ts --headed --project=chromium