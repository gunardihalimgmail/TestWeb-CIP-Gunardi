// api/database.js
import path from 'path'
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// api/database.js
let db: Database | null = null;

// const dbPath = path.join(process.cwd(), './test.db')

export async function openDatabase(): Promise<Database> {
    
    if (!db) {
        db = await open({
          filename: './test.db',
          driver: sqlite3.Database,
        });
    }
    if (db){
        return db;
    }else{
        throw new Error('Failed to open database');
    }

}
