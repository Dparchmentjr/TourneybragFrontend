//Players mock data used for SearchPlayer Component

export let profiles = [

      {username: "AlexThyMan", password:"6zzzckpk1", description: "Deus Vult!",
        accountType: "Player",
        banned: {isBanned: false, daysTilUnbanned: 0},
      	gamePlays: [{gameName: "Overwatch"}, {gameName:"Heroes Of The Storm"}, {gameName:"For Honor"}, {gameName:"Super Smash Bros."}],
        location: "Miami, FL",
        wins: 3,
        losses: 2,
        tourneysPlayed: [
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-22"},
            {name: "BrawlBash", organizer: "SlyGuySean", date: "2017-02-21"},
            {name: "SmashTourney", organizer: "ItsaMauricle", date: "2017-03-22"}],
      	fans: [{name: "ItsaMauricle"}, {name: "SlyGuySean"}, name: "DanePrettyCoolMan"],
      	comments: [{author: 'DanePrettyCoolMan', content: 'Good job winning the tournament!'},
			{author: 'SlyGuySean', content: 'Good fight last tournament.'},
			{author: 'ItsaMauricle', content: 'Better luck next time ked.'}]
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
