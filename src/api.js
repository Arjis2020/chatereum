const BASE_URL = `${process.env.REACT_APP_HOST}api/v1/`
const INIT = BASE_URL + 'init/'

const ROOM = BASE_URL + 'room/'
const ROOM_CREATE = ROOM + 'create/'
const ROOM_DETAILS = ROOM + 'details/'

const RATING = BASE_URL + 'rating/'


export default { INIT, ROOM, ROOM_CREATE, ROOM_DETAILS, RATING }