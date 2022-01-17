const randomizer = require('randomatic')
var toonavatar = require('cartoon-avatar')

function generateRoomCode() {
    return randomizer('A0', 6)
}

function generateAvatarUrl(){
    return toonavatar.generate_avatar()
}

export { generateRoomCode, generateAvatarUrl }