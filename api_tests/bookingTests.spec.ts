import test, { expect } from '@playwright/test';
import { readJson } from './utils';
import { createBooking, createToken, getBookingByQuery, updateBooking } from './apiHelpers';

let token: string; // shared token for tests

test('Create token', async ({ request }) => {
  const requestBody = {
    username: 'admin',
    password: 'password123'
  };

  const response = await createToken(request, requestBody);
  expect(response.ok()).toBeTruthy();

  const resBody = await response.json();
  expect(resBody).toHaveProperty('token');

  token = resBody.token; // store globally for this file
});


test('Can create booking using JSON data', async ({ request }) => {
  const requestBody = readJson('testDataCreateBooking.json');
  const respBody = await createBooking(request, requestBody);

  expect(respBody).toHaveProperty('bookingid');
});


test('Get bookings using query parameters', async ({ request }) => {
  const bookings = await getBookingByQuery(request, 'Jim', 'Hardy');

  expect(Array.isArray(bookings)).toBe(true);
  expect(bookings.length).toBeGreaterThan(0);

  for (const item of bookings) {
    expect(item).toHaveProperty('bookingid');
    expect(typeof item.bookingid).toBe('number');
  }
});


test('Update booking using booking id', async ({ request }) => {
  const createData = readJson('testDataCreateBooking.json');
  const updateData = readJson('testDataUpdateBooking.json');

  // Step 1: Create booking
  const bookingId = await createBooking(request, createData);

  // Step 2: Update the booking
  const response = await updateBooking(request, bookingId, updateData, token);
  expect(response.ok()).toBeTruthy();

  const updatedBody = await response.json();
  expect(updatedBody.firstname).toBe(updateData.firstname);
  expect(updatedBody.lastname).toBe(updateData.lastname);
});


/* import {test, expect} from '@playwright/test'
import fs from 'fs'

const BASE_URL = "https://restful-booker.herokuapp.com/booking";

test("Create booking using json data", async function( {request} ){

    // Read data from JS path;
    const jsonFilePath = 'api_tests/testDataCreateBooking.json';
    const requestData =JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    
    const response = await request.post(`${BASE_URL}/booking`,
        {
            data: requestData,
            headers: {  'Content-Type': 'application/json' },
        });

    const respBody = await response.json();

    // Assertions
    expect(response.ok()).toBeTruthy();
    expect(respBody).toHaveProperty('bookingid');
    expect(respBody).toHaveProperty('booking');
}); */
