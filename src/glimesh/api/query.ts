/*
function glimeshError(data:Glimesh.RootQueryType): Glimesh.RootQueryType["data"] | false | null {
    try {
        if (data.errors) {
            if (data.errors[0].message == "You must be logged in to access the api") {
                return null
            } else {
                return false
            }
        } else {
            return data.data;
        }
    } catch (e2) {
        return null;
    }
}

async function glimeshQuery(query, token): Promise<Glimesh.RootQueryType["data"] | false | null> {

    let result = await fetch("https://glimesh.tv/api/graph", {method: "POST", body: query, headers: {Authorization: `Bearer ${token}`}});
    let parsedResult = await result.json();
    console.log(parsedResult);
    if (parsedResult.errors) {
        return glimeshError(parsedResult);
    } else {
        return parsedResult["data"]
    }
}


/**
 * Returns a promise that contains the channel ID of the user we are about to join.
 * If no auth token is ready this will return null
 * @async
 * @param {string} channel The channel name
 * @returns The ID or null if unauthed or false if the channel does not exist.

async function getChannelID(channel: string): Promise<number | null | false> {
    let query = `query {channel (streamerUsername: "${channel}"){id, streamer {displayname}}}`;
    let response = await glimeshQuery(query);
    console.log(response);
    if (typeof response == "object" && response !== null) {
        channelID = response.channel.id;
        streamer = response.channel.streamer.displayname;
        return Number(response.channel.id);
    } else if (response == null) {
        return null;
    } else {
        return false;
    }
}

*/