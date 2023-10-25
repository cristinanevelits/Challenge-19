import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');

// Implement logic to add content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');

  // Create an object to store in the database
  const data = { content, timestamp: new Date() };

  // Add the data to the database
  await store.add(data);
  await transaction.done;
  console.log('Data added to IndexedDB:', data);
};

// Implement logic to get all content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');

  // Get all records from the database
  const allData = await store.getAll();
  await transaction.done;

  console.log('Data retrieved from IndexedDB:', allData);
  return allData;
};

initdb();
