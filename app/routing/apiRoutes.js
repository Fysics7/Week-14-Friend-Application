var friends = require("../data/friends.js");

//****************************/
// ROUTES
//****************************/

// API requests
module.exports = function (app) {
    // GET request
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // POST request
    app.post('/api/friends', function (req, res) {

        var bestMatch = {
            name: "",
            picture: "",
            friendDifference: 1000
        };

        var userInput = req.body;
        var userName = userInput.name;
        var userPicture = userInput.picture;
        var userAnswers = userInput.answers;

        var totalDifference;

        // loop through friends
        friends.forEach(function (elem, index) {
            var currentFriend = elem
            totalDifference = 0;

            for (var i = 0; i < currentFriend.answers.length; i++) {
                var currentFriendScore = currentFriend.answers[i];
                var currentUserScore = userAnswers[i];

                // calculate difference between scores
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestMatch.friendDifference) {
                // set bestMatch
                bestMatch.name = friends[index].name;
                bestMatch.picture = friends[index].picture;
                bestMatch.friendDifference = totalDifference;
            }
        })

        // push userInput to friends array
        friends.push(userInput);

        // response 
        res.json(bestMatch);
    });
};