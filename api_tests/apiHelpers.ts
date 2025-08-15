import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export async function createToken(request: APIRequestContext, requestBody: any): Promise<any> {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: requestBody,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok()) {
    const err = await response.text();
    throw new Error(`Auth failed: ${err}`);
  }

  return response;
}

// export function readJson(filename: string): any {
//   const filePath = path.join(__dirname, filename);
//   return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
// }

export async function createBooking( request: APIRequestContext, requestBody: any,
                                    username: string = 'admin', password: string = 'password123'): Promise<any> {

  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  const response = await request.post(`${BASE_URL}/booking`, {
    data: requestBody,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuth}`, // Basic authentication
      // Authorization: `Bearer ${bearerToken}` const bearerToken = "ghp_auhuashuasuas238232hy2h3"
      // API key auth: usins query Params
    }
  });

  if (!response.ok()) {
    const err = await response.text();
    throw new Error(`Create booking failed: ${response.status()} - ${err}`);
  }

  const resBody = await response.json();
  return resBody; // return entire body (bookingid + booking info)

  //const ajv = new Ajv();
  //const validate = ajv.compile(bookingResponseSchema); // Schema validation
  //const valid = validate(body);
  //expect(valid).toBe(true);
}

export async function updateBooking(
    request: APIRequestContext, 
    bookingId: number, 
    requestBody: any, 
    token: string): Promise<any> {
  const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
    data: requestBody,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    }
  });

  return response;
}

export async function getBookingByQuery(
  request: APIRequestContext,
  firstname: string,
  lastname: string
): Promise<any[]> {
  //const params = new URLSearchParams({ firstname, lastname }).toString();
  const url = `${BASE_URL}/booking`;

  const response = await request.get(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
        "firstname": firstname,
        "lastname": lastname
    }
  });

  if (!response.ok()) {
    const text = await response.text();
    throw new Error(`Request failed with status ${response.status()}: ${text}`);
  }

  const respBody = await response.json();
  return respBody;
}
