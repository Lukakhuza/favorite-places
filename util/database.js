import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const openDatabase = async () => {
  return await SQLite.openDatabaseAsync("places.db");
};

export const init = async () => {
  const db = await openDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
  // console.log("Table created successfully");
};

export const insertPlace = async (place) => {
  const db = await openDatabase();
  const result = await db.runAsync(
    "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]
  );
  // console.log("Place inserted successfully", result);
  return result.lastInsertRowId;
};

export const fetchPlaces = async () => {
  const db = await openDatabase();
  const places = await db.getAllAsync("SELECT * FROM places;");
  return places;
};

export const fetchPlaceWithId = async (id) => {
  const db = await openDatabase();
  const dbPlace = await db.getFirstAsync("SELECT * FROM places WHERE id = ?;", [
    id,
  ]);
  const place = new Place(dbPlace.title, dbPlace.imageUri, {
    lat: dbPlace.lat,
    lng: dbPlace.lng,
    address: dbPlace.address,
  });
  // console.log(place);
  return place;
};

export const deletePlace = async (id) => {
  const db = await openDatabase();
  const result = await db.runAsync("DELETE FROM places WHERE id = ?;"[id]);
  console.log("Place deleted successfully", result);
  return result.changes;
};

export const updatePlace = async (id, title, imageUri, address, lat, lng) => {
  const db = await openDatabase();
  const result = await db.runAsync(
    "UPDATE places SET title = ?, imageUri = ?, address = ?, lat = ?, lng = ? WHERE id = ?;",
    [title, imageUri, address, lat, lng, id]
  );
  // console.log("Place updated successfully", result);
  return result.changes;
};
