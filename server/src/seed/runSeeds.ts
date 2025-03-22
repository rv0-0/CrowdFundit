import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const runSeeds = async () => {
  try {
    console.log('=== Starting Database Seed Process ===');
    
    // Run user seeds
    console.log('\n--- Seeding Users ---');
    const { stdout: userOutput } = await execPromise('ts-node src/seed/seedUsers.ts');
    console.log(userOutput);
    
    // Run project seeds
    console.log('\n--- Seeding Projects ---');
    const { stdout: projectOutput } = await execPromise('ts-node src/seed/seedProjects.ts');
    console.log(projectOutput);
    
    console.log('\n=== Seeding Completed Successfully ===');
  } catch (error: any) {
    console.error('Seeding failed:', error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    process.exit(1);
  }
};

runSeeds(); 