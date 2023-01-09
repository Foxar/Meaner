const { loremIpsum } = require("lorem-ipsum");
const { ObjectId } = require('mongodb');
/*
export interface MockTweet {
    id: string;
    content: string;
    authorId: string;
    date: Date;
    replies: number;
    likes: number;
    shares: number;
    replyToId: string | null;
}

export interface MockUser {
    id: string;
    name: string;
    password: string;
    profileId: string;
}

export interface MockProfile {
    id: string;
    userId: string;
    description: string;
    dateCreated: Date;
}

export interface MockDatabase {
    tweets: MockTweet[];
    users: MockUser[];
    profiles: MockProfile[];
}
*/
function randomDateInPast(yearsAgo) {
    return new Date([Date.now(), (Date.now() - ((yearsAgo) * (31556926000)))]
        .reduce((a, b) => Math.floor(Math.random() * (b - a + 1) + a)));
}
function generateDatabase() {
    console.log("Date test");
    console.log(randomDateInPast(5));
    console.log("GENERATING THE DATABASE!....");
    let tweetIdNumerator = 0;
    var mockTweets = [];
    var mockUsers = [];
    var mockProfiles = [];
    const names = ["Rylie", "Norton", "Coleman", "Hester ", "Jamir", "Erickson ", "Hailee", "Odom ", "Alexander", "Sherman ", "Willow", "Huber ", "Aidan", "Shaw ", "Conner", "Yoder ", "Quentin", "Newton ", "Taryn", "Mcknight ", "Micah", "Terrell ", "Kaeden", "Villegas"];
    const numbers = ["1997", "1945", "1337", "69", "9000", "6969", "2022", "88"];
    function generateUsername() {
        return uniqueName(names[Math.floor(Math.random() * names.length)] +
            numbers[Math.floor(Math.random() * numbers.length)]);
    }
    function uniqueName(name) {
        let iterator = 1;
        while (mockUsers.find(u => u.name == name)) {
            name += iterator;
            iterator++;
        }
        return name;
    }
    //GENERATE USERS
    for (var i = 0; i < 5; i++) {
        mockUsers = [...mockUsers, {
                _id: new ObjectId(),
                name: generateUsername(),
                password: "123",
                profileId: '',
            }];
    }
    //GENERATE TWEETS FOR USERS
    for (var i = 0; i < 15; i++) {
        mockTweets = [...mockTweets, {
                _id: new ObjectId(),
                content: loremIpsum(),
                authorId: mockUsers[Math.floor(Math.random() * mockUsers.length)]._id,
                date: randomDateInPast(10),
                replies: 0,
                likes: 0,
                shares: 0,
                replyToId: null
            }];
    }
    //GENERATE REPLIES
    let replies = [];
    mockTweets.forEach((t) => {
        for (var i = 0; i < 2; i++) {
            replies = [...replies, {
                    _id: new ObjectId(),
                    content: loremIpsum(),
                    authorId: mockUsers[Math.floor(Math.random() * mockUsers.length * 0.5)]._id,
                    date: randomDateInPast(10),
                    replies: 0,
                    likes: 0,
                    shares: 0,
                    replyToId: t._id
                }];
        }
    });
    mockTweets = [...mockTweets, ...replies];
    mockTweets = mockTweets.map((t) => {
        return Object.assign(Object.assign({}, t), { replies: mockTweets.filter(a => a.replyToId == t._id).length });
    });
    //TWO TEST HARDCODED USERS
    const testUsers = [
        {
            _id: new ObjectId(),
            name: 'testuser',
            password: "123",
            profileId: ''
        },
        {
            _id: new ObjectId(),
            name: 'mockuser',
            password: "123",
            profileId: ''
        }
    ];
    //GENERATE PROFILES FOR USERS
    mockUsers.forEach((u, i) => {
        mockProfiles = [...mockProfiles, {
                _id: new ObjectId(),
                userId: u._id,
                description: loremIpsum({ count: 1 }),
                dateCreated: randomDateInPast(10),
            }];
        u.profileId = mockProfiles[mockProfiles.length-1]._id;
    });
    testUsers.forEach((u, i) => {
        mockProfiles = [...mockProfiles, {
                _id: new ObjectId(),
                userId: u._id,
                description: "this is a profile for me :)",
                dateCreated: randomDateInPast(10),
            }];
        u.profileId = mockProfiles[mockProfiles.length-1]._id;
    });
    //APPEND MOCKUSERS WITH TESTUSERS
    mockUsers = [...mockUsers, ...testUsers];
    //APPEND TWEETS WITH TESTUSER HARDCODED TWEETS
    for (var i = 0; i < 5; i++) {
        let cont1 = "";
        let cont2 = "";
        for (var j = 0; j < 6; j++) {
            cont1 += ' ' + ["testing", "test", "testowy", "tweet", ":)"][Math.floor(Math.random() * 5)];
            cont2 += ' ' + ["testing", "test", "testowy", "tweet", ":)"][Math.floor(Math.random() * 5)];
        }
        mockTweets = [...mockTweets, {
                _id: new ObjectId(),
                content: cont1,
                authorId: mockUsers[mockUsers.length - 1]._id,
                date: randomDateInPast(10),
                replies: 0,
                likes: 0,
                shares: 0,
                replyToId: null
            },
            {
                _id: new ObjectId(),
                content: cont2,
                authorId: mockUsers[mockUsers.length - 2]._id,
                date: randomDateInPast(10),
                replies: 0,
                likes: 0,
                shares: 0,
                replyToId: null
            }
        ];
    }
    mockTweets = mockTweets.sort((a, b) => { return a.date.getTime() - b.date.getTime(); });
    //console.log(mockUsers);
    //console.log(mockProfiles);
    //console.log("TWEETS");
    //console.log(mockTweets);
    return {
        tweets: mockTweets,
        users: mockUsers,
        profiles: mockProfiles
    };
}

module.exports = {generateDatabase}