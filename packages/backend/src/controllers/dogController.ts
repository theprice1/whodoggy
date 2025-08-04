// packages/backend/src/controllers/dogController.ts
import { Request, Response } from 'express';
import { db } from '../db.js'; // your PostgreSQL client

export async function getAllDogsHandler(_req: Request, res: Response) {
  try {
    const result = await db.query('SELECT * FROM dogs');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
}

export async function getDogByIdHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM dogs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dog' });
  }
}

export async function createDogHandler(req: Request, res: Response) {
  const { name, breed, age } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO dogs (name, breed, age) VALUES ($1, $2, $3) RETURNING *',
      [name, breed, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create dog' });
  }
}

export async function updateDogHandler(req: Request, res: Response) {
  const id = req.params.id;
  const { name, breed, age } = req.body;
  try {
    const result = await db.query(
      'UPDATE dogs SET name=$1, breed=$2, age=$3 WHERE id=$4 RETURNING *',
      [name, breed, age, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update dog' });
  }
}

export async function deleteDogHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM dogs WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete dog' });
  }
}
