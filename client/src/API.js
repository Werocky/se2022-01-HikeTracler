const APIURL = 'http://localhost:3001'

/* LOADING DATA FROM SERVER */
async function getHikes() {
    const response = await fetch(APIURL+'/getHikes');
    const hikes = await response.json();
    if (response.ok) {
      return hikes.map((r) => ({ HikeId: r.HikeId, MapId: r.MapId, start: r.start, end: r.end, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}) )
    } else {
      throw hikes; //which will contain an error if it is the case
    }
}

async function getFilteredHikes(ExpectedTime, Ascent, MapId, Length, Difficulty) {
    try
        {const response = await fetch(APIURL+'/getFilteredHikes', {
            method: 'GET',
            body: JSON.stringify({ 
                "ExpectedTime": ExpectedTime,
                "Ascent": Ascent,
                "MapId": MapId,
                "Length": Length,
                "Difficulty": Difficulty,
            }),
            headers: {
            'Content-Type': 'application/json',
        },
    });
        const hikes = await response.json();
        if (response.ok) {
        return hikes.map((r) => ({ HikeId: r.HikeId, MapId: r.MapId, start: r.start, end: r.end, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}) )
        } else {
        throw hikes; //which will contain an error if it is the case
    }} catch (ex) {
        throw ex;
    }
}

/* LOGIN FUNCTIONS */
async function logIn(credentials) {
    let response = await fetch((APIURL+'/sessions'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }
  
  async function logOut() {
    await fetch((APIURL+'/sessions/current'), { method: 'DELETE', credentials: 'include' });
  }
  
  async function getUserInfo() {
    const response = await fetch((APIURL+'/sessions/current'), {credentials: 'include'});
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo; 
    }
  }

const API = {getHikes, logIn, logOut, getUserInfo, getFilteredHikes};
export default API;