import { connectToDB } from './lib/database';
import './lib/redis';

console.log('Worker process started.');

connectToDB();

function main() {
  // Placeholder for background job processing (e.g., from a queue)
  console.log('Worker is running and checking for jobs...');
}

// Run the main function every 10 seconds
setInterval(main, 10000);
