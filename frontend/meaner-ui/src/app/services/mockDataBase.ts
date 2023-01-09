import { loremIpsum } from "lorem-ipsum"
import { MeanerApiService } from "./meanerApi.service";

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

function randomDateInPast(yearsAgo: number): Date {
    return new Date([Date.now(), (Date.now() - ((yearsAgo) * (31556926000)))]
        .reduce((a,b) => Math.floor(Math.random() * (b - a + 1) + a)))
}

export function generateDatabase(): MockDatabase {

    console.log("Date test");
    console.log(randomDateInPast(5));
    console.log("GENERATING THE DATABASE!....");
    var mockTweets: MockTweet[] = [];
    var mockUsers: MockUser[] = [];
    var mockProfiles: MockProfile[] = [];
    const names = ["Rylie","Norton","Coleman","Hester ","Jamir","Erickson ","Hailee","Odom ","Alexander","Sherman ","Willow","Huber ","Aidan","Shaw ","Conner","Yoder ","Quentin","Newton ","Taryn","Mcknight ","Micah","Terrell ","Kaeden","Villegas"]
    const numbers = ["1997", "1945", "1337", "69", "9000", "6969", "2022","88"]
    function generateUsername(): string {
        return uniqueName(  names[Math.floor(Math.random() * names.length)] + 
                            numbers[Math.floor(Math.random() * numbers.length)]);
    }

    function uniqueName(name: string): string {
        let iterator: number = 1;
        while(mockUsers.find(u => u.name == name)){
            name+=iterator;
            iterator++;
        }
        return name;
    }


    //GENERATE USERS
    for(var i = 0;i<5;i++){
        mockUsers = [...mockUsers, { 
            id: ""+i,
            name: generateUsername(), //uniqueName(loremIpsum({count: 1, units: "word"})),
            password: "123",
            profileId: '',
        }]
    }

    //GENERATE TWEETS FOR USERS
    for(var i =0; i<15;i++)
    {
        mockTweets = [...mockTweets, {
            id: ""+MeanerApiService.tweetIdNumerator++,
            content: loremIpsum(),
            authorId: mockUsers[Math.floor(Math.random()*mockUsers.length)].id,
            date: randomDateInPast(10),
            replies: 0,
            likes: 0,
            shares: 0,
            replyToId: null
        }] 
    }

    //GENERATE REPLIES
    let replies: MockTweet[] = [];
    mockTweets.forEach((t) => {
        for(var i =0;i<5;i++){
            replies = [...replies, {
                id: ""+MeanerApiService.tweetIdNumerator++,
                content: loremIpsum(),
                authorId: mockUsers[Math.floor(Math.random()*mockUsers.length*0.5)].id,
                date: randomDateInPast(10),
                replies: 0,
                likes: 0,
                shares: 0,
                replyToId: t.id
            }] 
        }
    })

    mockTweets = [...mockTweets,...replies];

    mockTweets = mockTweets.map((t)=>{
        return {
            ...t,
            replies: mockTweets.filter(a=>a.replyToId==t.id).length
        }
    })

    //TWO TEST HARDCODED USERS

    const testUsers = [
        {
            id: ""+mockUsers.length,
            name: 'testuser',
            password: "123",
            profileId: ''
        },
        {
            id: ""+mockUsers.length,
            name: 'mockuser',
            password: "123",
            profileId: ''
        }
    ]


     //GENERATE PROFILES FOR USERS
     mockUsers.forEach((u,i) => {
        mockProfiles = [...mockProfiles,{
            id: ""+i,
            userId: u.id,
            description: loremIpsum({count: 1}),
            dateCreated : randomDateInPast(10),
        }]

        u.profileId = ""+i
    })

    testUsers.forEach((u,i) => {
        mockProfiles = [...mockProfiles,{
            id: ""+(mockUsers.length+i),
            userId: u.id,
            description: "this is a profile for me :)",
            dateCreated : randomDateInPast(10),
        }]

        u.profileId = ""+(mockUsers.length+i)
    })

    //APPEND MOCKUSERS WITH TESTUSERS
    mockUsers = [...mockUsers, ...testUsers]


    //APPEND TWEETS WITH TESTUSER HARDCODED TWEETS

    for(var i =0; i<5;i++)
    {
        let cont1 = "";
        let cont2 = "";
        for(var j=0;j<6;j++){
            cont1+=' '+["testing","test","testowy", "tweet", ":)"][Math.floor(Math.random()*5)]
            cont2+=' '+["testing","test","testowy", "tweet", ":)"][Math.floor(Math.random()*5)]
        }
        mockTweets = [...mockTweets, {
            id: ""+MeanerApiService.tweetIdNumerator++,
            content: cont1,
            authorId: ""+mockUsers[mockUsers.length-1].id,
            date: randomDateInPast(10),
            replies: 0,
            likes: 0,
            shares: 0,
            replyToId: null
        },
        {
            id: ""+MeanerApiService.tweetIdNumerator++,
            content: cont2,
            authorId: ""+mockUsers[mockUsers.length-2].id,
            date: randomDateInPast(10),
            replies: 0,
            likes: 0,
            shares: 0,
            replyToId: null
        }
    ] 

    }

    mockTweets = mockTweets.sort((a,b)=>{return a.date.getTime() - b.date.getTime()})


    console.log(mockUsers);
    console.log(mockProfiles);

    console.log("TWEETS");
    console.log(mockTweets);

    return {
        tweets: mockTweets,
        users: mockUsers,
        profiles: mockProfiles
    }
}