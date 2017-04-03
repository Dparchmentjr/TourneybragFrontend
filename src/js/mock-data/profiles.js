//Players mock data used for SearchPlayer Component

export let profiles = [

      {username: "AlexThyMan", password:"6zzzckpk1", description: "Deus Vult!",
        accountType: "Player",
        banned: {isBanned: false, daysTilUnbanned: 0},
        gamePlays: ["Overwatch", "Heroes Of The Storm", "For Honor", "Super Smash Bros."],
        location: "Miami, FL",
        wins: 3,
        losses: 2,
        tourneysPlayed: [
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-22"},
            {name: "BrawlBash", organizer: "SlyGuySean", date: "2017-02-21"},
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-22"}],
        fans: [{}]
    },
    {username: "DanePrettyCoolMan", password:"6zzzckpk2", description: "Let's Go CSGO!",
        accountType: "Player",
        banned: {isBanned: false, daysTilUnbanned: 0},
        gamePlays: ["CSGO", "SMITE", "For Honor", "Super Smash Bros."],
        location: "Miami, FL",
        wins: 3,
        losses: 2,
        tourneysPlayed: [
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-22"},
            {name: "BrawlBash", organizer: "SlyGuySean", date: "2017-02-21"},
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-10"},
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-8"},
            {name: "BrawlBash", organizer: "SlyGuySean", date: "2017-02-20"}],
        fans: [{}]
    }
]
